import server from "../../server";
import message from "../../trigger/message";

export default class {
    constructor(cls:message){
       server.api('debug/Pvp',{},cls)
    }
}