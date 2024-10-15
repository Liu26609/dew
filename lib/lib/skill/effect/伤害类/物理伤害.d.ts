import { unity } from "../../../unity/unity";
import { SKILL } from "../../SKILL";
import { effect } from "../effect_base";
declare class e extends effect {
    constructor(keys: any, data: any);
    active(sk: SKILL, use: unity, tag: unity, cont?: number): void;
}
export default e;
