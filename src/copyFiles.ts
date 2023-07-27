import fs from 'fs';
import path from 'path';

function copyFile(source: string, target: string) {
    fs.copyFileSync(source, target);
}

function copyFolderRecursive(source: string, target: string) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        const stat = fs.lstatSync(sourcePath);
        if (stat.isDirectory()) {
            copyFolderRecursive(sourcePath, targetPath);
        } else {
            copyFile(sourcePath, targetPath);
        }
    });
}

// Copy assets folder to the dist folder during build
const assetsSource = 'src/songs';
const assetsTarget = 'dist/songs';
copyFolderRecursive(assetsSource, assetsTarget);

console.log('Assets copied successfully.');