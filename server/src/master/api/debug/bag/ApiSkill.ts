import { ApiCall } from "tsrpc";
import { ReqSkill, ResSkill } from "../../../../shared/master/debug/bag/PtlSkill";
import { player } from "../../../lib/unity/player";
import { Item_Type } from "../../../../shared/shareFace";

export default async function (call: ApiCall<ReqSkill, ResSkill>) {
   let p = call.req._player as player;
   p.addItem({name:call.req.name,type:Item_Type.技能书,data:{name:call.req.name,data:{from:'背包'}}})
   call.succ({})
}