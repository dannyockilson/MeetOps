import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";

const configPath = path.join(process.cwd(), "meetops.config.js");

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
};