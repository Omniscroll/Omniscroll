import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs-extra";
import path from "path";
import BuildSite from "../src/build";
import * as RouterModule from "../src/router";
import * as MarkdownModule from "../src/markdown";

vi.mock("fs-extra");

describe("BuildSite function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate static HTML files from markdown", () => {
    const mockBaseDir = "/mockBase";
    const mockOutDir = "/mockOut";

    vi.spyOn(RouterModule, "default").mockReturnValue([
      { path: "a", file: path.posix.join(mockBaseDir, "a.md") },
      { path: "b", file: path.posix.join(mockBaseDir, "b.mdx") },
    ]);

    vi.spyOn(MarkdownModule, "default").mockImplementation((file) => ({
      frontmatter: { title: `Title for ${file}` },
      content: `Content for ${file}`,
    }));

    const fsMock = vi.spyOn(fs, "outputFileSync");

    BuildSite(mockBaseDir, mockOutDir);

    // Convert expected output paths to POSIX format before comparing
    expect(fsMock).toHaveBeenCalledWith(
      path.posix.join(mockOutDir, "a.html"),
      `<h1>Title for /mockBase/a.md</h1>\nContent for /mockBase/a.md`,
    );

    expect(fsMock).toHaveBeenCalledWith(
      path.posix.join(mockOutDir, "b.html"),
      `<h1>Title for /mockBase/b.mdx</h1>\nContent for /mockBase/b.mdx`,
    );

    expect(fsMock).toHaveBeenCalledTimes(2);
  });
});
