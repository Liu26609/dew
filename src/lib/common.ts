import path from "path";
import fs from "fs";
import { quality } from "../shared/master/face_master";

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
    cover_quality(q: quality): string {
      let qualityName = quality[q];
      // 处理前缀带下划线的情况
      if (qualityName.startsWith('_')) {
          return  qualityName.substring(1) + '-';
      }
      // 处理后缀带_p的情况
      if (qualityName.endsWith('_p')) {
          return qualityName.substring(0, qualityName.length - 2) + '+';
      }
      return qualityName;
  }
    getFiles(dir: string): string[] {
        let results: string[] = [];
        let list = fs.readdirSync(dir);

        list.forEach((file)=> {
          file = path.resolve(dir, file);
          let stat = fs.statSync(file);
          if (stat && stat.isDirectory()) {
            results = results.concat(this.getFiles(file));
          } else {
            results.push(file);
          }
        });
        return results;
      }
}
export default new common()