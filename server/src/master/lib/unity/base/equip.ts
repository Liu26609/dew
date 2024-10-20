import xlsxToJson from "../../../../model/xlsxToJson";
import { _att_key } from "../../../../shared/shareFace";
import common from "../../common";
import word from "../../word";
import { att_val } from "./body_com";

export default class equip {
    // 装备模板ID
    id: string = '1';
    // 生成时的唯一ID
    uuid: string = common.v4();
    // 装备名称 - 涉及改名 单独记录
    name: string = '未命名装备';
    // 装备属性
    attList: att_val[] = []
    constructor(data?: any) {
        if (data) {
            this.id = data.id || this.id;
            this.name = data.name || this.name;
            this.attList = data.attList || [];
        }

    }
    /**
     * 重置属性
     */
    reset() {
        /**
         * 读取装备配置
         * 根据配置随机出一个装备范围
         */
        let list = xlsxToJson.cfg.get('装备模板表') as Map<string, any>;
        let info: any = list.get(this.id)
        this.attList = word.att_import_cfg(info, [
            _att_key.生命值,
            _att_key.生命恢复,
            _att_key.魔法值,
            _att_key.魔法恢复,
            _att_key.物理攻击,
            _att_key.魔法攻击,
            _att_key.物理防御,
            _att_key.魔法防御,
            _att_key.技能急速,
            _att_key.物理暴击率,
            _att_key.魔法暴击率
        ], 0)
    }
    get_att(key: _att_key) {
        for (let i = 0; i < this.attList.length; i++) {
            const att = this.attList[i];
            if (att.key == key) {
                return att.val
            }
        }
        return 0;
    }
}