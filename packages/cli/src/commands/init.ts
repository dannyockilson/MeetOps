import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";

const opts = {
    mode: '0755',
};

const template = `
module.exports = {
    
}
`;

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

const writeFile = (path, template) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, template, (err) => {
            if (err) return reject(err);
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
    return writeFile(
        path.join(baseDir, "meetops.config.js"),
        template,
    );
};