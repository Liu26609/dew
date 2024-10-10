import ET, { ET_K } from "../lib/ET";

/**
 * 多平台消息处理中间件
 */
export default class message {
    platform:string;
    temp:any[] = [];
    session:any;
    constructor(ctx:any,p?:string) {
        this.session = ctx;
        this.platform = p || '未知平台';

        setTimeout(() => {ET.fire(ET_K.input_message,this)}, 0);
        
    }

    addLine(str:string){
        this.temp.push({type:'text',data:str})
    }
    get_name(){
        return this.session.author.username
    }
    get_userId(){
        return this.session.userId
    }
    get_content(){
        return this.session.content
    }
    // 判断是否为私信
    jude_private(){
        return !!this.session.guildId
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