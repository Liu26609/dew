"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tsrpc_cli_1 = require("tsrpc-cli");
const serverArry = ["master", "server_mail"];
const tsrpcConf = {
    // Generate ServiceProto
    proto: [],
    // Sync shared code
    sync: [
        {
            from: 'src/shared',
            to: '../bot_-readme/src/shared',
            type: 'copy' // Change this to 'copy' if your environment not support symlink
        },
    ],
    // Dev server
    dev: {
        autoProto: true,
        autoSync: true,
        autoApi: true,
        watch: 'src',
        entry: 'src/index.ts', // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,
        autoSync: true,
        autoApi: true,
        outDir: 'dist', // Clean this dir before build
    }
};
for (let index = 0; index < serverArry.length; index++) {
    const server_name = serverArry[index];
    (_a = tsrpcConf.proto) === null || _a === void 0 ? void 0 : _a.push({
        ptlDir: `src/shared/${server_name}`,
        output: `src/shared/${server_name}/serviceProto.ts`,
        apiDir: `src/${server_name}/api`,
        docDir: `docs/${server_name}`,
        ptlTemplate: tsrpc_cli_1.CodeTemplate.getExtendedPtl(`./src/shared/protocols/${server_name}_base.ts`),
        msgTemplate: tsrpc_cli_1.CodeTemplate.getExtendedMsg(),
    });
}
exports.default = tsrpcConf;
