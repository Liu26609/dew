"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const tsrpc_1 = require("tsrpc");
const child_process_1 = require("child_process");
function default_1(call) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Change directory to C:\Users\admin\Desktop\Gamecoca_Web_Client
            process.chdir('C:\\Users\\admin\\Desktop\\Gamecoca_Web_Client');
            // Execute the build command
            (0, child_process_1.exec)('npm run build:dev', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    call.error('Build failed', { error: error.message });
                    return;
                }
                console.log(`打包完成: ${stdout}`);
                // Command execution completed
            });
        }
        catch (err) {
            console.error(`chdir error: ${err}`);
            call.error({ message: '打包失败', type: tsrpc_1.TsrpcErrorType.ApiError });
        }
        call.succ({});
    });
}
