const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const srcDir = 'lib';
const distDir = 'lib';

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function compressFiles(dir, baseDir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(baseDir, filePath);
        const distPath = path.join(distDir, relativePath);

        if (fs.lstatSync(filePath).isDirectory()) {
            compressFiles(filePath, baseDir);
        } else if (filePath.endsWith('.js')) {
            const result = UglifyJS.minify(fs.readFileSync(filePath, 'utf8'));
            if (result.error) {
                console.error(`Error compressing ${filePath}:`, result.error);
            } else {
                ensureDirectoryExistence(distPath);
                fs.writeFileSync(distPath, result.code, 'utf8');
                console.log(`Compressed ${filePath} to ${distPath}`);
            }
        } else if (filePath.endsWith('.d.ts')) {
            fs.unlinkSync(filePath);
            console.log(`Deleted ${filePath}`);
        }
    });
}

compressFiles(srcDir, srcDir);