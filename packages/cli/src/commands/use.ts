import * as git from 'nodegit';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

export interface IUseCommandOptions {
    mode: string;
}

export const defaultOptions: IUseCommandOptions = {
    mode: 'https'
}

export interface IRepo {
    https: string;
    ssh: string;
}

const repo: IRepo = {
    https: 'https://github.com/dannywilson/MeetOps.git',
    ssh: 'git@github.com:dannywilson/MeetOps.git'
}

const funcPath: string = path.join(process.cwd(), 'functions');
const clonePath: string = path.join(process.cwd(), 'tmp');

const cloneOpts = {
    fetchOpts: {
        callbacks: {
            certificateCheck: function () { return 1; }
        }
    }
}

export const cloneRepo = (opts = defaultOptions) => {
    return new Promise((resolve, reject) => {
        if (!repo[opts.mode]) {
            console.error(
                chalk.red(`No repo available using mode ${opts.mode}`)
            );
            return reject();
        }
        return git.Clone(
            repo[opts.mode],
            clonePath,
            cloneOpts
        ).catch((err) => {
            return reject(err);
        }).then((repo) => {
            // TODO: exit
            return resolve(repo);
        });
    });
}

export const copyFunctionFolder = (func: string) => {
    let funcFolder = path.join(clonePath, 'functions', func);
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(funcFolder)) {
            console.error(
                chalk.red(`No function with name ${func} found in cloned repo`)
            );
            return reject();
        }

        return fs.rename(
            funcFolder,
            path.join(funcPath, func),
            (err) => {
                if (err) return reject(err);
                return resolve();
            }
        );

    });
}

export const removeClonedDir = (path = clonePath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    removeClonedDir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    });
}