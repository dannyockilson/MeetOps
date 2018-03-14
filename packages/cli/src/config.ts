import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";

const configPath = path.join(process.cwd(), "meetops.config.js");
const template = `module.exports = `;

const writeFile = (path, template) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, template, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
};

export const getConfig = (defaults: any = {}) => {
    try {
        return Object.assign(
            {},
            defaults,
            require(configPath),
        );
    } catch (err) {
        console.warn(
            chalk.yellow(`An error occurred when reading from ${configPath}`),
        );
        console.log(err);
        console.warn(
            chalk.yellow(`Commands will continue using defaults`),
        );
        return Object.assign(
            {},
            defaults,
        );
    }
}

export const setConfig = (object: any = {}, baseDir = process.cwd()) => {
    return writeFile(
        path.join(baseDir, "meetops.config.js"),
        template + JSON.stringify(object),
    );
}