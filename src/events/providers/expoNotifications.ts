import {Expo, ExpoPushMessage} from 'expo-server-sdk';

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export const sendPushNotificationToOne = async (token: string, text: string):Promise<any> => {
    let message: ExpoPushMessage[] = [];

    if (!Expo.isExpoPushToken(token)) {
        return 'Push token is not a valid Expo push token';
    }
    message.push({
        to: token,
        sound: 'default',
        body: text,
        data: { withSome: 'data' },
    })
    return expo.sendPushNotificationsAsync(message);
}

export const sendPushNotificationToMany = async (tokens: string[], text: string): Promise<void> => {

    let messages : ExpoPushMessage[] = [];

    for (let pushToken of tokens)
    {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }
        messages.push({
            to: pushToken,
            sound: 'default',
            body: text,
            data: { withSome: 'data' },
        })
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    await (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();
}
