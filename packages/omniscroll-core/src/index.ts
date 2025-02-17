#!/usr/bin/env mode

import BuildSite from "./build";
import DevServer from "./dev";

const args = process.argv.slice(2);

if (args[0] === "build") {
    BuildSite("docs", "dist");
} else if (args[0] === "dev") {
    DevServer();
} else {
    console.log("Usage: omniscroll [build | dev]");
}
