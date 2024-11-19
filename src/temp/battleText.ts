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
    getData_md(data: any) {
        // 战斗数据模块
        let dataLog_A = data
        let dataLog = ''
        let dataUnityMap = new Map();
        let totalDamage = 0;
        let totalTaken = 0;
        let totalRes = 0;
        // 首先计算总伤害和总承伤
        for (const key in dataLog_A) {
            const data = dataLog_A[key];
            for (const name in data) {
                let unityData = dataUnityMap.get(name) || {};
                if (!unityData[key]) {
                    unityData[key] = data[name]
                } else {
                    unityData[key] += data[name]
                }
                dataUnityMap.set(name, unityData)
                
                if (key === '伤害') totalDamage += data[name];
                if (key === '承伤') totalTaken += data[name];
                if (key === '治疗') totalRes += data[name];
            }
        }

        // 输出总数据
        dataLog += `📊 总体数据\n`;
        dataLog += `🗡️总伤害: ${APP.numberToChinese(totalDamage)}\n`;
        dataLog += `💖总治疗: ${APP.numberToChinese(totalRes)}\n`;
        dataLog += `🛡️总承伤: ${APP.numberToChinese(totalTaken)}\n\n`;

        // 为每个角色生成进度条
        dataUnityMap.forEach((unity, name) => {
            dataLog += `<a href="https://qm.qq.com/q/VEua3umPus">${name}</a>\n\n`;
            
            // 伤害进度条 (10格)
            if (unity['伤害']) {
                const damagePercent = Math.floor((unity['伤害'] / totalDamage) * 10);
                const damageBar = '🟦'.repeat(damagePercent) + '⬜'.repeat(10 - damagePercent);
                dataLog += `🗡️伤害: ${damageBar} ${APP.numberToChinese(unity['伤害'])} (${Math.floor((unity['伤害'] / totalDamage) * 100)}%)\n\n`;
            }
            
            // 承伤进度条 (10格)
            if (unity['承伤']) {
                const takenPercent = Math.floor((unity['承伤'] / totalTaken) * 10);
                const takenBar = '🟥'.repeat(takenPercent) + '⬜'.repeat(10 - takenPercent);
                dataLog += `🛡️承伤: ${takenBar} ${APP.numberToChinese(unity['承伤'])} (${Math.floor((unity['承伤'] / totalTaken) * 100)}%)\n\n`;
            }
             // 承伤进度条 (10格)
             if (unity['治疗']) {
                const takenPercent = Math.floor((unity['治疗'] / totalTaken) * 10);
                const takenBar = '🟥'.repeat(takenPercent) + '⬜'.repeat(10 - takenPercent);
                dataLog += `💖治疗: ${takenBar} ${APP.numberToChinese(unity['治疗'])} (${Math.floor((unity['治疗'] / totalTaken) * 100)}%)\n\n`;
            }
            dataLog += '\n';
        });

        return dataLog;
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
    getSkLog_md(data: any) {
        let A = data;
        let text = '';
        for (const userName in A) {
            // 分离表情符号和名字
            const matches = userName.match(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2B05}]|[\u200d])+/gu);
            const emoji = matches ? matches[0] : '';
            const name = userName.replace(emoji, '');
            
            let line = `${emoji}<a href="https://qm.qq.com/q/VEua3umPus">${name}</a>`
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
                text += '\n\n';
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