import message from "../../../trigger/message";
export default class {
    constructor(cls: message, ...data: any[]);
    start(cls: message, ...data: any[]): Promise<void>;
    rename(cls: message, idx: number, name: string): Promise<void>;
    rm(cls: message, idx: number): Promise<void>;
    look_index(cls: message, idx: number): Promise<void>;
    look(cls: message): Promise<void>;
}
