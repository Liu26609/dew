import { IClassMessage, IImageMessage, IMessage, MessageClassName, MessageType } from "../face";
import class_battleLog from "./AnalysisClass/class_battleLog";
import class_skillDetail from "./AnalysisClass/class_skillDetail";

/**
 * 1.文件为服务器客户端共享
 */
export class AnalysisMsg {
    constructor() {
        
    }
    parse(data:IMessage) {
        let msg = '';
        let _haveTitle = false;
        for(const item of data.line){
            switch(item.type){
                case MessageType.title:
                    _haveTitle = true;
                    msg += `┄━═${item.content}═━┄\n`;
                    break;
                case MessageType.line:
                    msg += `${item.content}\n`;
                    break;
                case MessageType.class:
                    msg += this.parseClass(item);
                    break;
                case MessageType.image:
                   this.parseImg(item);
                    break;
            }
        }
        if(_haveTitle){
            msg += '┄━════════━┄'
        }
        console.log(msg);
        return msg;
    }
    private parseClass(item:IClassMessage):string{
        switch(item.className){
            case MessageClassName.战斗日志:
                return this.class_battleLog(item);
            case MessageClassName.技能详情:
                return this.class_skillDetail(item);
            default:
                return `class:${item.className}\n`;
        }
    }
    private class_battleLog(data:IClassMessage):string{
        return class_battleLog.analysis(data);
    }
    private class_skillDetail(data:IClassMessage):string{
        return class_skillDetail.analysis(data);
    }
    private parseImg(item:IImageMessage){
        console.log('处理图片',item);
    }
}