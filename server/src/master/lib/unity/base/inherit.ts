import xlsxToJson from "../../../../model/xlsxToJson";
import { _att_key } from "../../../../shared/shareFace";
import common from "../../common";
import word from "../../word";
import { att_line, att_val, body_bar } from "./body_com";

export class inherit{
    id:string = '1';

    attList: att_val[] = []
    constructor(data?:any){
        if(data){
            this.id = data.id;
            this.attList = data.attList;
        }
        if(this.attList.length == 0){
            this.reset()
        }
    }
    get_info(){
        let list = xlsxToJson.cfg.get('血统表') as Map<string, any>;
        let info = list.get(this.id)
        return info;
    }
    get_att(key:_att_key){
        for (let i = 0; i < this.attList.length; i++) {
            const att = this.attList[i];
                if(att.key == key){
                    return att.val
                }
        }
        return 0;
    }
    reset(id?:string){
        let list = xlsxToJson.cfg.get('血统表') as Map<string, any>;
        let info:any = {}
        if(id){
            info = list.get(id)
        }else{
            // 随机一个
            let keys = [...list.keys()]
            let key = common.random(0,keys.length-1)
            info = list.get(keys[key])
            this.id = info.id;
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
            ],0)
        }
    }
}