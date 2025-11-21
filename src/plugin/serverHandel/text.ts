import { AnalysisMsg } from "../../shared/bot/analysisMsg"
import { MsgMessage } from "../../shared/bot/MsgMessage"
import handel_base from "./handel_base"

export default class handelr_text extends handel_base {
    constructor(data: any) {
        super(data)
    }
    async start(data: MsgMessage) {
       let content =  new AnalysisMsg().parse(data);
        await this.send(data, content)
    }
}


