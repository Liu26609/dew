import server from "../../../server";
export default class {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        await cls.addLine(`请${cls.At()}输入需修改的用户名(30s内输入)`);
        cls.send();
        cls.clear();
        let name = await cls.wait_nextInput(30);
        if (!name) {
            cls.addLine(`等待输入用户名超时`);
            cls.send();
            return;
        }
        await server.api('player/info/SetName', { new: name }, cls);
        cls.addLine(`已修改用户名为：${name}`);
        cls.send();
    }
}
