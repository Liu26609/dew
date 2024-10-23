import message from "../../../trigger/message";
export default class {
    constructor(cls: message, ...data: any[]);
    start(cls: message, ...data: any[]): Promise<void>;
    rename(cls: message, idx: number, rename: string): Promise<void>;
    takeOff(cls: message, idx: number): Promise<void>;
    look(cls: message, idx: number): Promise<void>;
    list(cls: message): Promise<void>;
}
