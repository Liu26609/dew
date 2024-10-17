import message from "../../trigger/message";
export default class {
    constructor(cls: message);
    zip(cls: message): Promise<void>;
    zip_cilent(cls: message): Promise<void>;
    zip_server(cls: message): Promise<void>;
    start(cls: message): Promise<void>;
}
