import { ApiCall } from "tsrpc";
import { ReqSetName, ResSetName } from "../../../../shared/master/player/info/PtlSetName";
import transaction from "../../../lib/transaction";

export default async function (call: ApiCall<ReqSetName, ResSetName>) {
   let p = call.req._player;

   transaction.create(p,'角色改名为xxx',[{name:'金币',cont:0}])
   .then(()=>{
      console.log('改名成功')
      p.name = call.req.new;
   })
   call.succ({});
}