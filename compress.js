const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const srcDir = 'lib';
const distFile = 'lib/index.js';

function getAllFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else if (filePath.endsWith('.js')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function mergeAndCompressFiles(files) {
    let combinedCode = '';
    files.forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf8');
        combinedCode += fileContent + '\n';
    });

    const result = UglifyJS.minify(combinedCode);
    if (result.error) {
        console.error('Error compressing files:', result.error);
    } else {
        fs.writeFileSync(distFile, result.code, 'utf8');
        console.log(`Compressed files into ${distFile}`);
    }
}

const files = getAllFiles(srcDir);
mergeAndCompressFiles(files);