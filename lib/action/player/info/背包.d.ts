import message from "../../../trigger/message";
export default class {
    constructor(cls: message, ...data: any[]);
    start(cls: message, ...data: any[]): Promise<void>;
    use(cls: message, idx: number, num?: number): Promise<void>;
    list(cls: message): Promise<void>;
    look(cls: message, idx: number): Promise<void>;
}
