import server from '../../server';
export default class {
    constructor(cls, data) {
        this.step(cls, data);
    }
    async step(cls, data) {
        cls.addLine('未注册,请注册，输入用户名');
        cls.send();
        let input = await cls.wait_nextInput();
        if (!input) {
            cls.addLine('等待输入超时');
            cls.send();
            return;
        }
        server.api('player/info/SetName', { new: input }, cls);
    }
}
