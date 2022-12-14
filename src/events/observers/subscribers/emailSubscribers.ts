import {EmailProvider} from "../../providers/emailNotifications";


export const emailSubscriber = (to: string[] | string, subject: string, template: string, data: any) => {
    return EmailProvider.send(to, subject, template, data);
}
