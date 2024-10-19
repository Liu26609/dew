import { ApiCall } from "tsrpc";
import { ReqGetBodySysCfg, ResGetBodySysCfg } from "../../../shared/master/common/PtlGetBodySysCfg";
import xlsxToJson from "../../../model/xlsxToJson";

export default async function (call: ApiCall<ReqGetBodySysCfg, ResGetBodySysCfg>) {
    let key = call.req.key;
    let cfg = xlsxToJson.cfg.get('sys_体系');
    if (cfg && cfg.has(key)) {
        call.succ({
            cfg: cfg.get(key)
        });
        return;
    }
    else {
        call.error('体系配置不存在');
    }
}