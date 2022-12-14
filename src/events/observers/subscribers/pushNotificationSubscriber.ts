import {sendPushNotificationToMany, sendPushNotificationToOne} from "../../providers/expoNotifications";

export const PushNotificationSubscriber = (token: string | [], message: string) => {
    if (typeof token === 'string') {
        return sendPushNotificationToOne(token, message)
    }
    else
    {
        return sendPushNotificationToMany(token, message)
    }
}
