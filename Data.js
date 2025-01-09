import {makeAutoObservable,makeObservable} from "mobx";

class Data{
    constructor() {
        makeAutoObservable(this)
    }
    ADDRESS_SITE="http://79.174.91.102:3000"
    ADDRESS_SERVER="http://79.174.91.102:5000"
    Auth_Address="http://79.174.91.102:6500"
    WS_ADDRESS_SERVER="ws://79.174.91.102:5000"
}

export default new Data()
