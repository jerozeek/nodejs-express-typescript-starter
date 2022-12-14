import express, {Application, Request, Response, NextFunction} from "express";
import {Server} from "http";
import { mongoose} from '@typegoose/typegoose';
import fileUploader from "express-fileupload";
import register from './register';
import createHttpError from "http-errors";
import { config } from "dotenv";
import cors from "cors";
import {logger} from "./events/Logger";
import { MongoMemoryServer } from 'mongodb-memory-server';
import {allowedCors} from "./config/allowedCors";
import {errorHandler} from "./helpers/errorHandler";

config();

let mongo: MongoMemoryServer;

export class Handler {

    static app: Application = express();

    static server: Server = Handler.app.listen(process.env.PORT, () => console.log('server is connected to port: '+ process.env.PORT));

    static async startServer() {

        let uri = process.env.ENVIROMENT === 'development'
            ? process.env.DB_CONNECTION_DEVELOPMENT || ''
            : process.env.DB_CONNECTION_PRODUCTION || '';

        if (process.env.NODE_ENV === 'test') {
            mongo   = await MongoMemoryServer.create();
            uri     = mongo.getUri();
        }

        //make the connection!!!
        await mongoose.connect(uri);

        await Handler.server;

        //connect to cloudinary

        Handler.app.use(express.json());

        // custom middleware logger
        Handler.app.use(logger);

        //allow file upload
        Handler.app.use(fileUploader({
            useTempFiles: true,
        }));

        //use cors
        Handler.app.use(cors(allowedCors));

        //routes
        register(Handler.app);

        //error handler
        Handler.app.use((req: Request, res: Response, next: NextFunction) => {
            next(createHttpError(404));
        });

        //error handler
        Handler.app.use(errorHandler)

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose default connection is disconnected due to application termination');
                process.exit(0);
            });
        });
    }

    static async closeServer() {
        await Handler.server.close();
        await mongoose.disconnect();
    }

    static async dropMongoDB() {
        if (process.env.NODE_ENV === 'test'){
            if (mongo) {
                await mongoose.connection.dropDatabase()
                await mongoose.connection.close()
                await mongo.stop();
            }
        }
    }

    static async dropCollections() {
        if (process.env.NODE_ENV === 'test') {
            if (mongo) {
                const collections = await mongoose.connection.db.collections();
                for(let collection of collections) {
                    await mongoose.connection.db.dropCollection(collection.collectionName)
                }
            }
        }
    }

}
