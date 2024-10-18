import common from "../common";
import word from "../word";
import { body_base } from "./base/body_base";

export class player  extends body_base{
    id: string = common.v4();
    private _mapid:string|undefined  = undefined;
    constructor(data) {
        super();
        this.init(data)
    }
    get_mapid(){
        return this._mapid;
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