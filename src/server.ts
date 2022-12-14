import {Handler} from "./handler";
Handler.startServer()
    .then(() => console.log('server is running'))
    .catch((err) => console.log(err));
