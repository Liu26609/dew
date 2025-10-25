import { IClassMessage, IImageMessage, IMessage, MessageType } from "../face";

/**解析消息格式 */
export class AnalysisMsg {
    constructor() {
        
    }
    parse(data:IMessage) {
        let msg = '';
        for(const item of data.line){
            switch(item.type){
                case MessageType.title:
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
        console.log('解析消息\n',msg);
        return msg;
    }
    private parseClass(item:IClassMessage){
        console.log('处理类数据',item);
        return 'class\n';
    }
    private parseImg(item:IImageMessage){
        console.log('处理图片',item);
    }
}