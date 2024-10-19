import server from "../../../server";
import message from "../../../trigger/message";




export default class {
    constructor(cls: message,data:number) {
        console.log('开始历练',data)
        this.start(cls);
    }

    async start(cls: message) {
       await server.api('player/map/Start',{name:''},cls)
    }
   
}
