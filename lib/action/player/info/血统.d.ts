import message from "../../../trigger/message";
export default class {
    constructor(cls: message, ...data: any[]);
    start(cls: message, ...data: any[]): Promise<void>;
    reset(cls: message): Promise<void>;
    look(cls: message): Promise<void>;
}
