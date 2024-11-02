import esbuild from 'esbuild'
import { copy } from 'esbuild-plugin-copy';
const options = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outdir: 'lib',
    minify: true,
    minifySyntax: true,
    platform: 'node',
    packages: 'external',
    plugins: [
        copy({
            // 复制静态文件
            assets: {
                from: ['./src/**/*.html', './src/**/*.css', './src/**/*.ttf'],
                to: ['./lib'],
            },
        }),
    ],
};

await esbuild.build(options);