import { unity } from "../../unity/unity";
import { SKILL } from "../SKILL";
export declare class effect {
    data: any;
    tag: string[];
    constructor(tag: string[], data: any);
    /**
     * 效果生效
     */
    active(sk: SKILL, use: unity, tag: unity, cont?: number): void;
    get_val(use: unity): any;
}
