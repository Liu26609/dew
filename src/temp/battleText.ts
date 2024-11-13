import APP from "../APP";
import actionCfg from "../cfg/actionCfg";
import emojiCfg from "../cfg/emojiCfg";

class battleText {
    constructor() {

    }
    /**
     * 获得战斗数据文本
     */
    getData(data: any) {
        // 战斗数据模块
        let dataLog_A = data
        let dataLog = ''
        let dataUnityMap = new Map();
        for (const key in dataLog_A) {
            const data = dataLog_A[key];
            let val = 0;
            for (const name in data) {
                val += data[name];
                let unityData = dataUnityMap.get(name) || {};
                if (!unityData[key]) {
                    unityData[key] = data[name]
                } else {
                    unityData[key] += data[name]
                }
                dataUnityMap.set(name, unityData)
            }
            dataLog += `│▌总${key}${APP.numberToChinese(val)}`;
        }
        dataLog += '\n';
        let allSize = dataUnityMap.size;
        dataUnityMap.forEach((unity, name) => {
            dataLog += `${name}`
            for (const key in unity) {
                dataLog += `│▌${key}${APP.numberToChinese(unity[key])}`
            }
            // 如果是最后一个，不换行
            allSize -= 1;
            if (allSize != 0) {
                dataLog += '\n'
            }
        });
        // 战斗数据模块
        return dataLog
    }
    /**
     * 获取技能统计
     */
    getSkLog(data: any) {
        let A = data;
        let text = '';
        for (const userName in A) {
            let line = `${userName}`
            const element = A[userName];
            for (const skName in element) {
                line += `│▌${skName}`
                let effArry = element[skName];
                for (let i = 0; i < effArry.length; i++) {
                    const effItem = effArry[i];
                    line += `${APP.getIcon(effItem.key)}${APP.numberToChinese(effItem.val)}`;
                }
            }
            text += line;
            // 如果不是最后一个，换行
            if (userName !== Object.keys(A)[Object.keys(A).length - 1]) {
                text += '\n';
            }
        }
        return text;
    }

    /**
     * 获取击杀日志
     */
    getKillLog(data: any) {
        let killLog = data;
        if (killLog.length == 0) {
            return ''
        }
        let temp = ``
        for (let index = 0; index < killLog.length; index++) {
            const element = killLog[index];
            temp += `${element.round}>${element.use}🗡️${element.tag}`
            // 如果index不是最后一个
            if (index != killLog.length - 1) {
                temp += '\n'
            }
        }
        return temp;
    }
    /**
     * 获取战利品日志
     */
    getGiftLog(data: any) {
        let gifts = data;
        let temp = ''
        for (let index = 0; index < gifts.length; index++) {
            const element = gifts[index];
            temp += `${element.icon}${element.name}x${element.cont}`
        }
        return temp;
    }
}
export default new battleText()