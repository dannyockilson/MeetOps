import * as commander from "commander";
import { createConfigFile, createFolderStructure } from "./commands/init";
import { getConfig, setConfig } from "./config";
import { cloneRepo, copyFunctionFolder, removeClonedDir } from "./commands/use";

const program = commander;

console.log("Hitting my function bin");

program
    .version("0.1.0", "-v, --version")
    .description("A CLI tool to help build out your own MeetOps tools");

program.command("init")
    .description("Initialise MeetOps project")
    .action(() => {
        console.log("Running project initialisation...");
        createFolderStructure().then(() => {
            console.log("Setup folder structure");
        });
        createConfigFile().then(() => {
            console.log("Created config file");
        });
    });

program.command("use <func>")
    .description("Pull in functions from git repo")
    .action((func) => {
        let config = getConfig();
        // clone down repo
        console.log("use", func);
        cloneRepo(config.git).then(() => {
            console.log("Finished cloning");
            // copy function you want
            copyFunctionFolder(func).then(() => {
                console.log("Finished copying function file");
                // cleanup
                removeClonedDir().then(() => {
                    console.log("Finished cleanup");
                });
            });
        });
    });

program.command("deploy").action(() => {
    let config = getConfig();
    // TODO: maybe...
    console.log("deploy");
});

program.command("set <key> <value>")
    .description("Save a configuration option to the meetops.config.js")
    .action((key, value) => {
        let config = getConfig();
        console.log(`set "${key}" config option to "${value}"`);
        config[key] = value;
        console.log(config);
        setConfig(config);
    });

program.parse(process.argv);