import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import { setConfig } from "../config";

const opts = {
    mode: '0755',
};

const mkdir = (path, opts) => {
    return new Promise((resolve, reject) => {
        mkdirp(path, opts, (err, made) => {
            if (err) {
                return reject(err);
            }
            if (made) {
                return resolve(made);
            }
            return resolve();
        });
    });
};

export const createFolderStructure = (baseDir = process.cwd()) => {
    return mkdir("functions", opts).then(() => {
        return mkdir("events", opts);
    });
};

export const createConfigFile = (baseDir = process.cwd()) => {
    return setConfig();
};