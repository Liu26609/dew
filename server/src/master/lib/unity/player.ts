import { battle } from "../battle/battle";
import common from "../common";
import word from "../word";
import { body_base } from "./base/body_base";

export class player  extends body_base{
    id: string = common.v4();
    private _mapid:string|undefined  = undefined;
    private _battleCall:Function|undefined = undefined;
    constructor(data) {
        super();
        this.init(data)
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
        this._reload(data);
    }
    active(){
        let id = this.get_mapid();
        let map = word.getMap(id);
        map.active(this.id);
        
    }
}