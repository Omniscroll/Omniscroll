//  # Generates routes dynamically
import { glob } from "glob";

export default function GetRoutes(baseDir: string) {
    return glob.sync(`${baseDir}/**/*.{mdx, md}`).map((file) => {
        const route = file
            .replace(baseDir, "")
            .replace(/\\/g, "")
            .replace(/\.(md|mdx)$/, "");
        return { path: route, file };
    });
}
