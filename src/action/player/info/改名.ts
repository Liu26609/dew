import server from "../../../server";
import message from "../../../trigger/message"



export default class {
    constructor(cls: message) {
        this.init(cls);
    }

    async init(cls: message) {
        await cls.addLine(`请${cls.At()}输入需修改的用户名(30s内输入)`);

        cls.send();
        cls.clear();
        let name = await cls.wait_nextInput(30)
        if(!name){
            cls.addLine(`等待输入用户名超时`);
            cls.send();
            return;
        }
        await server.api('player/info/SetName',{new:name},cls)
    }
}