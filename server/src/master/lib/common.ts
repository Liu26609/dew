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
}
export default new common()