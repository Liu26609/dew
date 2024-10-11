import { CodeTemplate, TsrpcConfig } from 'tsrpc-cli';
const serverArry = ["master"];
const tsrpcConf: TsrpcConfig = {
    // Generate ServiceProto
    proto: [],
    // Sync shared code
    sync: [
        {
            from: 'src/shared',
            to: '../src/shared',
            type: 'copy'     // Change this to 'copy' if your environment not support symlink
        },
    ],
    // Dev server
    dev: {
        autoProto: true,        // Auto regenerate proto
        autoSync: true,         // Auto sync when file changed
        autoApi: true,          // Auto create API when ServiceProto updated
        watch: 'src',           // Restart dev server when these files changed
        entry: 'src/index.ts',  // Dev server command: node -r ts-node/register {entry}
    },
    // Build config
    build: {
        autoProto: true,        // Auto generate proto before build
        autoSync: true,         // Auto sync before build
        autoApi: true,          // Auto generate API before build
        outDir: 'dist',         // Clean this dir before build
    }
}

for (let index = 0; index < serverArry.length; index++) {
    const server_name = serverArry[index];
    tsrpcConf.proto?.push(
        {
            ptlDir: `src/shared/${server_name}`, // Protocol dir
            output: `src/shared/${server_name}/serviceProto.ts`, // Path for generated ServiceProto
            apiDir: `src/${server_name}/api`,   // API dir
            docDir: `docs/${server_name}`,     // API documents dir
            ptlTemplate: CodeTemplate.getExtendedPtl(`./src/shared/protocols/${server_name}_base.ts`),
            msgTemplate: CodeTemplate.getExtendedMsg(),
        }
    )
}
export default tsrpcConf;