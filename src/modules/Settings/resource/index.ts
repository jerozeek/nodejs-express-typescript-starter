import {ISettings} from "../repository/interface";

export class SettingsResource {

   private data: any;

    constructor(private settings: ISettings) {
       this.set(settings);
    }

    private set(settings: ISettings) {
       this.data = {
          paystack: {
             publicKey: settings.paystack.test_public_key,
          },
          maintenance_mode: settings.maintenance_mode,
          sendGrid: settings.sendGrid,
          otpExpiry: settings.otpExpiry,
          expo_access_token: settings.expo_access_token,
          force_account_verification: settings.force_account_verification
       }
    }

   public all() {
      return this.data;
   }

}
