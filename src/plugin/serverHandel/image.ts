import { MsgMessage } from "../../shared/bot/MsgMessage";
import puppeteer from "../puppeteer";
import handel_base from "./handel_base";

export default class handelr_image extends handel_base {
    constructor(data: MsgMessage) {
        super(data)

    }
    async start(data: MsgMessage) {
        // let renderName = data.info.render;
        // puppeteer.render(renderName, data.data || {}).then(async (e) => {
        //     await this.send(data, e)
        // })
    }
}
