import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";

const configPath = path.join(process.cwd(), "meetops.config.json");

const writeFile = (path, template) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, template, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
};

export const buildConfigObject = (key, value, config = {}) => {
    let keys = key.split('.');
    let current = keys.shift();
    if (keys.length > 0) {
        config[current] = typeof config[current] == 'object' ? config[current] : {};
        config[current] = buildConfigObject(
            keys.join('.'),
            value,
            config[current]
        );
    } else {
        config[current] = value;
    }
    return config;
}

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

export const setConfig = (object: any = {}) => {
    return writeFile(
        configPath,
        JSON.stringify(object),
    );
}