import { CFG } from "../..";
import common from "../../lib/common";
import server from "../../server";
import { SKILL_rang, SKILL_target } from "../../shared/master/face/FACE_SKILL";
import { Item_Type, SKILL_type } from "../../shared/master/shareFace";
import temp_text from "../../temp/temp_text";
import message from "../../trigger/message"
const path = require('path');
export default class {
    constructor(cls: message) {

       this.start(cls)
    }
    async start(cls: message) {
        cls.send_v1(`开始创造技能:
类型:主动技能
目标:敌方
范围:单体`)
       let req =  await server.api('player/skill/Create', {
            type: SKILL_type.主动技能,
            target: SKILL_target.敌方,
            rang_type: SKILL_rang.单体
        }, cls)
        cls.send_v1(`技能生成完成啦`);
        temp_text.prop_look({ type: Item_Type.技能书, temp: req }, cls)
    }
}