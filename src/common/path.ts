import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

export class NapCatPathWrapper {
    binaryPath: string;
    logsPath: string;
    configPath: string;
    cachePath: string;
    staticPath: string;

    constructor(mainPath: string = dirname(fileURLToPath(import.meta.url))) {
        this.binaryPath = mainPath;
        let writePath: string;
        if (os.platform() === 'darwin') {
            writePath = path.join(os.homedir(), 'Library', 'Application Support', 'QQ', 'NapCat');
        } else {
            writePath = this.binaryPath;
        }
        this.logsPath = path.join(writePath, 'logs');
        this.configPath = path.join(writePath, 'config');
        this.cachePath = path.join(writePath, 'cache');
        //这个必然和本体一起
        this.staticPath = path.join(dirname(fileURLToPath(import.meta.url)), 'static');
        if (!fs.existsSync(this.logsPath)) {
            fs.mkdirSync(this.logsPath, { recursive: true });
        }
        if (!fs.existsSync(this.configPath)) {
            fs.mkdirSync(this.configPath, { recursive: true });
        }
        if (!fs.existsSync(this.cachePath)) {
            fs.mkdirSync(this.cachePath, { recursive: true });
        }
    }
}
