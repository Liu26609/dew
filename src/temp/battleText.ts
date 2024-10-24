import APP from "../APP";

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
        dataLog += `╞═══🔵战斗数据═━┄\n`
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
        dataUnityMap.forEach((unity, name) => {
            dataLog += `🐍${name}`
            for (const key in unity) {
                dataLog += `│▌${key}${APP.numberToChinese(unity[key])}`
            }
            dataLog += '\n'
        });
        // 战斗数据模块
        return dataLog
    }
    /**
     * 获取技能统计
     */
    getSkLog(data:any){
        let A = data;
        let text = '';
        for (const userName in A) {
            let line = `🐍${userName}`
            const element = A[userName];
            for (const skName in element) {
                line += `│▌${skName}`
                let effArry = element[skName];
                for (let i = 0; i < effArry.length; i++) {
                    const effItem = effArry[i];
                    line += `🗡${APP.numberToChinese(effItem.val)}`;
                }
            }
            text += line + '\n'
        }
        return text;
    }
    /**
     * 获取击杀日志
     */
    getKillLog(data:any){
        let killLog =data;
        if(killLog.length == 0){
            return ''
        }
        let temp = `╞═══🔵击杀统计═━┄\n`
        for (let index = 0; index < killLog.length; index++) {
            const element = killLog[index];
            temp += `${element.round}->🐍${element.use}击杀🐍${element.tag}\n`
        } 
        return temp;
    }
}
export default new battleText()