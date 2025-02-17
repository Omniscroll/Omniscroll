import ParseMarkdown from "./markdown";
import GetRoutes from "./router";
import fs from "fs-extra";
import path from "path";

const htmlTemplate = (title: string, content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <h1>${title}</h1>
    <div>${content}</div>
</body>
</html>
`;

export default function BuildSite(baseDir: string, outDir: string) {
    const routes = GetRoutes(baseDir);
    routes.forEach(({ path: routePath, file }) => {
        const { frontmatter, content } = ParseMarkdown(file);
        const outPath = path.posix.join(outDir, `${routePath}.html`);
        fs.outputFileSync(outPath, htmlTemplate(frontmatter.title, content));
        console.log("Build Complete:", outPath);
    });
}
