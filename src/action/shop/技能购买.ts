import server from "../../server";
import message from "../../trigger/message";

export default class {
    constructor(cls: message){
        this.start(cls);
    }

    async start(cls: message){
        let req = await server.api('shop/skill/Buy',{},cls)
        if(!req) return;
        
        cls.send_v1('🎉 恭喜获得新技能!')
    }
}