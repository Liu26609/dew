import ET, { ET_K } from "../lib/ET";

/**
 * 多平台消息处理中间件
 */
export default class message {
    platform:any;
    temp:any[] = [];
    session:any;
    constructor(ctx:any) {
        this.session = ctx;
        ET.fire(ET_K.input_message,this)
    }
    addLine(str:string){
        this.temp.push({type:'text',data:str})
    }
    getContent(){
        return this.session.content
    }
    send(){
        let str = '';
        for (let index = 0; index < this.temp.length; index++) {
            const element = this.temp[index];
            str += element.data + '\n'
        }
        this.session.send(str)
    }
}