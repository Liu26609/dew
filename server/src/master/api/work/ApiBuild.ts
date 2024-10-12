import { ApiCall, TsrpcErrorType } from "tsrpc";
import { ReqBuild, ResBuild } from "../../../shared/master/work/PtlBuild";
import { exec } from 'child_process';

export default async function (call: ApiCall<ReqBuild, ResBuild>) {
    try {
        // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
        process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');

        // Execute the build command
        exec('npm run build:dev', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                call.error('Build failed', { error: error.message });
                return;
            }

            console.log(`打包完成: ${stdout}`);

            // Command execution completed
        });
    } catch (err) {
        console.error(`chdir error: ${err}`);
        call.error({ message: '打包失败', type: TsrpcErrorType.ApiError });

    }
    call.succ({});
}