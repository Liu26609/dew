import handel_base from "./handel_base"

export default class handelr_text extends handel_base  {
    constructor(data: any) {
        super(data)
    }
    async start(data: any) {
        if(data.info.type == 'text'){
            await this.send(data, data.data)
        }else{
            console.log('未知类型的文本消息')
        }
    }
}


