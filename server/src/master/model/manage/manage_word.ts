import app, { xlsxCfgNames } from "../../../app";
import { baseBody } from "../../../model/fight/body/baseBody";
import { player } from "../../../model/fight/body/player";
import { logger } from "../../../model/server/logger";
import cell from "../../../model/word/cell";
import word, { wordCfg } from "../../../model/word/word";

class manage_word {
    private wordMap: Map<string, word> = new Map();
    constructor() {

    }
    getWord(id: string) {
        if (!this.wordMap.has(id)) {
            let cfg = app.getWordCfg(id) as wordCfg;
            this.register(cfg);
        }

        return this.wordMap.get(id) as word;
    }
    offWord(id: string) {
        let w = this.wordMap.get(id);
        if (!w) {
            debugger;
            return;
        }
        this.wordMap.delete(id);
        w.destroy();
    }
    /**
     * 根据玩家等级 匹配一个地图id
     * @param body 
     * @returns 
     */
    mateWord_id(body: player) {
        let cfgArry = [...(app.xlsxCfgMap.get(xlsxCfgNames.地图配置) as Map<string, any>).values()];
        let mateArry: any[] = [];
        for (let index = 0; index < cfgArry.length; index++) {
            const map_item = cfgArry[index];
            if (!map_item.open) {
                continue;
            }
                mateArry.push(map_item);
        }
        if (mateArry.length == 0) {
            logger.debug('未匹配到地图');
            return '1';
        }
        let find = app.random(0, mateArry.length - 1);
        return mateArry[find].id;
    }
    register(cfg: wordCfg) {
        let _word = this.wordMap.get(cfg.id);
        if (!_word) {
            _word = new word(cfg);
            console.log(`世界[${_word.name}]已开启`)
            this.wordMap.set(cfg.id, _word);
        }
        return _word;
    }
    /**
     * 世界传送
     * @param body 
     * @param toId 
     * @returns 
     */
    async transfer(body: player, toId: string) {
        let res = {
            jude: true,
            msg: ''
        }
        if (body.get_battle()) {
            res.jude = false;
            res.msg = '🔀传送失败:战斗中无法传送'
            return res;
        }

        if(body._position){
            let nowWord = body.getPosition()?.getWord()
            if (nowWord && nowWord.id == toId) {
                res.jude = false;
                res.msg = '🔀传送失败:你已处于当前世界'
                return res;
            }
            nowWord?.outPlayer(body);
        }

        body.setPosition(new cell(-1, -1));

        let _word = this.getWord(toId);
        await _word.joinPlayer(body);

        res.msg = `🔀传送成功，[${_word.name}]...`;
        return res;
    }
}
export default new manage_word();