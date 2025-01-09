import {makeAutoObservable,makeObservable} from "mobx";

class Data{
    constructor() {
        makeAutoObservable(this)
    }
    ADDRESS_SITE="http://localhost:3000"
    ADDRESS_SERVER="http://localhost:5000"
    Auth_Address="http://localhost:6500"
    WS_ADDRESS_SERVER="ws://localhost:5000"
}

export default new Data()