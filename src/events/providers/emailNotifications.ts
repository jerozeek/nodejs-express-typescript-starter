import dotEnv from "dotenv";
import sgMail from '@sendgrid/mail';
import {APP_NAME} from "../../config/constants";
dotEnv.config();

type argProps = {
    template: string,
    data: any,
}

export class EmailProvider {

    public static send(to: string[] | string, subject: string, template: string, data: any)
    {
        return EmailProvider.sendMailWithSendgrid(to, subject, template, data);
    }

    private static temp = (...arg: argProps[]) => require(`../../emails/template/${arg[0].template}`)(arg[0].data);

    private static async sendMailWithSendgrid(to: string[] | string, subject: string, template: string, data: any){
        try {
            const api = process.env.SENDGRID_API_KEY || '';
            sgMail.setApiKey(api);

            const msg = {
                to,
                from: {
                    name: APP_NAME,
                    email: process.env.FROM_MAIL || 'no-reply@maaji.ng',
                },
                subject,
                html: EmailProvider.temp({template, data}),
            };

            await (async () => {
                try {
                    return sgMail.send(msg);
                    //console.log(result);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
        catch (e) {
            return e;
        }
    }
}
