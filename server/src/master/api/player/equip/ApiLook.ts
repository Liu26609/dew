import { ApiCall } from "tsrpc";
import { ReqLook, ResLook } from "../../../../shared/master/player/equip/PtlLook";
import { player } from "../../../lib/unity/player";

export default async function (call: ApiCall<ReqLook, ResLook>) {
   let p = call.req._player as player;
   let eq = p.equips[call.req.idx - 1];
   if(!eq){
         call.error('装备查看 - 装备不存在');
         return;
   }
   let cfg = eq.get_info();
   call.succ({
      name:eq.name,
      sys:cfg.sys as string,
      att:eq.attList
   })
}