import server from "../../../server";
export default class {
    constructor(cls) {
        this.init(cls);
    }
    async init(cls) {
        let res = await server.api('player/map/Search', {}, cls);
        console.log(res);
        switch (res.type) {
            case 'monster':
                // 发现怪物
                this.search_monster(cls, res.data);
                break;
            default:
                break;
        }
    }
    search_monster(cls, data) {
        let temp = `╞════🔵发现敌人═━┄\n`;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            temp += `🔵${element.name}`;
            // 最后一行不要\n
            if (i == data.length - 1) {
                temp += '\n';
            }
            else {
                temp += `\n`;
            }
        }
        temp += `[战斗]开始快速战斗\n`;
        temp += `[探索]继续探索\n`;
        cls.addLine(temp);
        cls.send();
    }
}
