import { battle } from "../battle/battle";
import common from "../common";
import word from "../word";
import { body_base } from "./base/body_base";

export class player  extends body_base{
    private _mapid:string|undefined  = undefined;
    private _battleCall:Function|undefined = undefined;
    // 玩家最后活跃时间
    lastActiveTime:number = Date.now();
    constructor(data) {
        super();
        this.init(data)
    }
    set_mapid(id:string){
        this.getMap().leave(this.id);
        this._mapid = id;
    }
    get_mapid(){
        return this._mapid;
    }
    getMap(){
        return  word.getMap(this._mapid);
    }

    set_battleCall(call:any){
        this._battleCall = call;
    }
    get_battleCall(){
        if(this._battleCall){
           return this._battleCall(this) as battle;
        }
        return undefined;
    }
    private init(data: any) {
        this.lastActiveTime = data.lastActiveTime || Date.now();
        this._reload(data);
    }
    onLine(){
        // 计算离线时间
        let offTime = Math.floor((Date.now() - this.lastActiveTime) / 1000);
        console.log('玩家上线,离线时间',offTime,'秒');
        this.lastActiveTime = Date.now();
    }
    active(){
        super.active();
        this.lastActiveTime = Date.now();
        let id = this.get_mapid();
        let map = word.getMap(id);
        map.active(this.id);
        
    }
}