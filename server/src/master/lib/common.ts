const { v4: uuidv4 } = require('uuid');
class common {
    constructor(){

    }
    v4(){
        const uuid = uuidv4();
        return uuid;
    }
    // 延时函数
     sleep(ms: number) {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }
    // 生成指定范围的随机数
    random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // 引入指定类
    importClass(path: string,agm?){
        const effectModule = require(`${path}`);
        const EffectClass = effectModule.default;
        return new EffectClass(...agm);
    }
    sanitizeObject(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        if (obj.save && typeof (obj.save) == 'function') {
            try {
                return obj.save();
            } catch (error) {
                debugger
            }
        }
        const sanitizedObj = Array.isArray(obj) ? [] : {};

        for (const prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                if (typeof (obj[prop]) == 'function') {
                    continue;
                }
                if (!prop.startsWith('_')) {
                    sanitizedObj[prop] = this.sanitizeObject(obj[prop]);
                }
            }
        }

        return sanitizedObj;
    }
}
export default new common()