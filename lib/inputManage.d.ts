import message from "./trigger/message";
declare class inputManage {
    wait_inputskipMap: Map<string, boolean>;
    messageMap: Map<string, message>;
    constructor();
    init(): void;
    skip(id: string, jude: boolean): void;
    get_msg(id: string): message;
    input_msg(cls: message): void;
}
declare const _default: inputManage;
export default _default;
