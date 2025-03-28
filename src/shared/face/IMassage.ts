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
    private: boolean;
    content: string;
    guildId?: string;
}