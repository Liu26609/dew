export interface UserInfo {
    id: string;
    name?: string;
    isBot?: boolean;
}

export interface ClientInfo {
    id: string;
    platform: string;
    name: string;
}
export interface Message{
    msgId: string;
    userId: string;
    private: boolean;
    content: string;
    guildId?: string;
}

export enum ClientAction{
    none = 'none',
    image = 'image',
    text = 'text'
}