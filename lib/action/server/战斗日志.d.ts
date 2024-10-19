import message from '../../trigger/message';
import { MsgAction } from '../../shared/master/MsgAction';
export default class {
    constructor(cls: message, data: MsgAction);
    start(cls: message, data: MsgAction): Promise<void>;
}
