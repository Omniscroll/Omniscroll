//  # Builds static files

import ParseMarkdown from "./markdown";
import GetRoutes from "./router";
import fs from "fs-extra"

export default function BuildSite(baseDir: string, outDir: string) {
    const routes = GetRoutes(baseDir)

    routes.forEach(({ path, file }) => {
        const { frontmatter, content } = ParseMarkdown(file)
        const outPath = `${outDir}/${path}.html`

        fs.outputFileSync(outPath, `<h1>${frontmatter}</h1>\n${content}`)

        console.log("Build Complete")
    })
}