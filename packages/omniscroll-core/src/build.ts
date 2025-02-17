import ParseMarkdown from "./markdown";
import GetRoutes from "./router";
import fs from "fs-extra";
import path from "path";

export default function BuildSite(baseDir: string, outDir: string) {
  const routes = GetRoutes(baseDir);

  routes.forEach(({ path: routePath, file }) => {
    const { frontmatter, content } = ParseMarkdown(file);

    const outPath = path.posix.join(outDir, `${routePath}.html`);

    fs.outputFileSync(outPath, `<h1>${frontmatter.title}</h1>\n${content}`);

    console.log("Build Complete:", outPath);
  });
}
