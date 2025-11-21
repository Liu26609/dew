/** 消息类名枚举 */
export enum MessageClassName{
    战斗日志,
    技能详情
}
export enum MessageHandleType{
    text = 'text',
    image = 'image',
}
/** 消息类型枚举 */
export enum MessageType{
    title,
    line,
    class,
    image,
}

/** 标题消息项 */
export interface ITitleMessage {
    type: MessageType.title;
    content: string;
}

/** 文本行消息项 */
export interface ILineMessage {
    type: MessageType.line;
    content: string;
}

/** 类数据消息项 */
export interface IClassMessage {
    type: MessageType.class;
    className: MessageClassName;
    content: any;
}

/** 图片消息项 */
export interface IImageMessage {
    type: MessageType.image;
    renderType: string;
    content: string;
}

/** 消息项联合类型 */
export type IMessageItem = ITitleMessage | ILineMessage | IClassMessage | IImageMessage;

/** 完整消息结构 */
export interface IMessage {
    handleType: MessageHandleType;
    /** 消息项列表 */
    line: IMessageItem[];
}