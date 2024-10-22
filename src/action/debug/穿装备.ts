import { CFG } from "../..";
import common from "../../lib/common";
import server from "../../server";
import message from "../../trigger/message"
const path = require('path');
export default class {
    constructor(cls: message) {
       
        server.api('debug/Upequip',{},cls)
    }
}