import { MsgMessage } from "../../shared/protocols/MsgMessage";
import puppeteer from "../puppeteer";
import handel_base from "./handel_base";

export default class handelr_image extends handel_base {
    constructor(data: MsgMessage) {
        super(data)

    }
    start(data: MsgMessage) {
        let renderName = data.info.render;
        puppeteer.render(renderName, data.data || {}).then((e) => {
            this.send(data, e)
        })
    }
}
