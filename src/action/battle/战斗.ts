import server from "../../server";
import message from "../../trigger/message";



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        let res = await server.api('battle/Battle', {}, cls)
        console.log(res)

    }
}
