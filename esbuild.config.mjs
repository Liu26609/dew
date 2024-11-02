import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy';
const options = {
    entryPoints: ['./src/**/*.ts'], // 使用通配符指定多个入口点
    bundle: true,
    outdir: 'lib',
    outbase: './src', // 保留目录结构
    minify: true,
    minifySyntax: true,
    platform: 'node',
    packages: 'external',
    plugins: [
        copy({
            // 复制静态文件并保留目录结构
            assets: {
                from: ['./src/**/*.html', './src/**/*.css', './src/**/*.ttf'],
                to: ['./'],
                keepStructure: true, // 保留目录结构
            },
        }),
    ],
};

await esbuild.build(options);