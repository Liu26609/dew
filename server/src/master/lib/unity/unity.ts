import { battle } from "../battle/battle";
import common from "../common";
import { body_base } from "./base/body_base";

export class unity extends body_base {
    constructor(data) {
        super()
        this.init(data)
    }
    private init(data: any) {
        this._reload(data);
    }
}