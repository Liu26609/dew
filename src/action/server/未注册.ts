import message from '../../trigger/message';
import { MsgAction } from '../../shared/master/MsgAction';
import server from '../../server';
export default class {
    constructor(cls: message,data:MsgAction) {
        this.step(cls,data)
    }
    async step(cls: message,data:MsgAction){
        cls.addLine('达尔文进化岛V6 - 测试版 欢迎体验')
        cls.send()
        // let input = await cls.wait_nextInput()
        // if(!input){
        //     cls.addLine('等待输入超时')
        //     cls.send()
        //     return
        // }
        // server.api('player/info/SetName',{new:input},cls)
    }
}