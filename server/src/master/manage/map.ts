import common from "../lib/common";

export default class game_map{
    name:string = '主神空间';
    id:string = common.v4();
    private _players:Map<string,any> = new Map();
    constructor(data:any){
        for (const key in data) {
           this[key] = data[key];
        }
    }
    get_playerCont(){
        return this._players.size;
    }
    active(id:string){
        this._players.set(id,Date.now());
    }
    get_info(id:string){
        
    }
}