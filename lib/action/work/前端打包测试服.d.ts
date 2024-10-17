import message from "../../trigger/message";
export default class {
    constructor(cls: message);
    zip(cls: message): Promise<void>;
    start(cls: message): Promise<void>;
}
