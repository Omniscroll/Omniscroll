//  # Generates routes dynamically
import { glob } from "glob";
import path from "path";
import fs from "fs-extra";
import matter from "gray-matter";

export default function GetRoutes(baseDir: string) {
    return glob.sync(`${baseDir}/**/*.{mdx, md}`).map((file) => {
        const relativePath = path.relative(baseDir, file);
        let route = relativePath
            .replace(/\\/g, "/")
            .replace(/\.(md|mdx)$/, "")
            .replace(/index$/, ""); // compile index file to be root page "/"

        const fileContent = fs.readFileSync(file, "utf-8");
        const { data } = matter(fileContent);

        if (data.slug) {
            route = data.slug.startsWith("/") ? data.slug : `/${data.slug}`;
        } else {
            route = `/${data.slug}`;
        }

        return { path: `/${route}`, file };
    });
}
