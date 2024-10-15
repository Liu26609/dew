import common from "../common";
import { body_base } from "./base/body_base";

export class player  extends body_base{
    id: string = common.v4();
    name: string = '新玩家';
    constructor() {
        super();
    }
}