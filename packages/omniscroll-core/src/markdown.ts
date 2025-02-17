// # Parses Markdown/MDX files

import matter from "gray-matter";
import fs from "fs-extra";

export default function ParseMarkdown(filePath: string) {
  const markdownContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(markdownContent);

  return { frontmatter: data, content };
}
