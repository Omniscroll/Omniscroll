import BuildSite from "./build";
import liveServer from "live-server";

export default function DevServer() {
    console.log("Starting development server...");
    BuildSite("docs", "dist");

    liveServer.start({
        root: "dist",
        file: "index.html",
        wait: 500,
    });
}
