#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs-extra";

const [command, ...args] = process.argv.slice(2);

const initProject = (name: string) => {
    fs.copySync("path/to/default-template", name);
    console.log(`Project ${name} initialized successfully!`);
};

switch (command) {
    case "init":
        initProject(args[0]);
        break;
    default:
        console.log("Usage: omniscroll-cli [init <project-name>]");
}
