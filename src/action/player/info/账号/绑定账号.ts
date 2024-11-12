import server from "../../../../server";
import { Item_Type } from "../../../../shared/master/shareFace";
import temp_text, { temp_card } from "../../../../temp/temp_text";
import message from "../../../../trigger/message";

export default class {
    constructor(cls: message, ...data) {
        console.log('绑定信息', data)
        this.start(cls, ...data)
    }

    async start(cls: message, ...data) {
        let card = new temp_card();
        card.set_title('账号绑定')
        card.line(`警告:你正在获取绑定他人角色账号的验证码,请确保在没有他人的频道获取!`)
        card.set_title_line('绑定流程')
        card.add(`1.[绑定账号]获取绑定验证码`)
        card.add(`2.[绑定验证]完成绑定账号`)
        card.line(`绑定后当前账号的角色将永久丢失！多个平台将共享一个角色数据`)
        card.set_title_line('操作选择', '🏧')
        card.add(`【继续】         【取消】`)
        cls.send_v2(card)
        let input = await cls.wait_nextInput();
        if(input != '继续'){
            cls.send_v1('已取消获取绑定验证码')
            return;
        }
        let bindCode = await server.api('bind/Add', {}, cls)
        cls.send_v1('请及时切换到需要绑定的角色账号上输入以下验证码\n复制以下完整内容即可\n↓↓↓↓↓↓↓↓↓',1)
        cls.send_v1(`${bindCode.code}`,2)
    }

}