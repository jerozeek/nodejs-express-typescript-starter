import sinon from "sinon";
import {ISettingsRepository} from "../../repository/interface";

export class SettingsServiceMock {

    public static services: ISettingsRepository = {
        get: sinon.stub(),
        set: sinon.stub(),
        generate: sinon.stub()
    }

}
