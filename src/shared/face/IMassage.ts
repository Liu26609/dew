export interface UserInfo {
    id: string;
    name?: string;
    avatar?: string;
    isBot?: boolean;
}

export interface ClientInfo {
    id: string;
    platform: string;
    name: string;
    avatar?: string;
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