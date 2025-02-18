export enum quality{
    _D = 1,
    D,
    D_p,
    _C,
    C,
    C_p,
    _B,
    B,
    B_p,
    _A,
    A,
    A_p,
    _S,
    S,
    S_p,
    _SS,
    SS,
    SS_p,
    _SSS,
    SSS,
    SSS_p,
    _SR,
    SR,
    SR_p,
    _SSR,
    SSR,
    SSR_p,
    _SSSR,
    SSSR,
    SSSR_p,
}
export interface followData {
    id: string;
    uuid: string;
    name: string;
    fight: number;
    quality: quality;
    collect: number[];
}