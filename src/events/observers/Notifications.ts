
export class Notifications {

    public static observers: Array<any> = [];

    public static emailSubscriber(observer: any) {
        Notifications.observers.push(observer);
    }

    public static messageSubscriber(observer: any) {
        Notifications.observers.push(observer);
    }

    public static pushNotificationSubscriber(observer: any) {
        Notifications.observers.push(observer);
    }

    public static smsSubscriber(observer: Promise<any>) {
        Notifications.observers.push(observer);
    }

    public static async fire() {
        for (const observer of Notifications.observers) {
            await observer;
        }
        Notifications.observers = [];
    }
}
