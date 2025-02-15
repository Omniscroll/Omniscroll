import { afterEach, describe, it, vi, expect } from "vitest";
import { fileURLToPath } from "url";
import path from "path";
import GetRoutes from "../src/router";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Generate Routes from Markdown files", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should generate correct URLs", () => {
        const mockMarkdownFolder = path.resolve(__dirname, "../__mocks__/MarkdownFolder");

        // Return all files in the mocked folder
        vi.spyOn(glob, "sync").mockReturnValue([
            `${mockMarkdownFolder}/a.md`,
            `${mockMarkdownFolder}/b.mdx`,
            `${mockMarkdownFolder}/subfolder/c.md`,
        ]);

        const routes = GetRoutes(mockMarkdownFolder);

        expect(routes).toEqual([
            { path: "/a", file: path.posix.normalize(`${mockMarkdownFolder}/a.md`) },
            { path: "/b", file: path.posix.normalize(`${mockMarkdownFolder}/b.mdx`) },
            { path: "/subfolder/c", file: path.posix.normalize(`${mockMarkdownFolder}/subfolder/c.md`) },
        ]);
    });

    it("should return an empty array if no markdown files are found", () => {
        const emptyFolder = path.resolve(__dirname, "../__mocks__/EmptyFolder");

        vi.spyOn(glob, "sync").mockReturnValue([]);

        const routes = GetRoutes(emptyFolder);

        expect(routes).toEqual([]);
    });

    it("should handle nested directories correctly", () => {
        const nestedFolder = path.resolve(__dirname, "../__mocks__/NestedFolder");

        vi.spyOn(glob, "sync").mockReturnValue([
            `${nestedFolder}/nested/a.md`,
            `${nestedFolder}/nested/b.mdx`,
            `${nestedFolder}/nested/subfolder/c.md`,
        ]);

        const routes = GetRoutes(nestedFolder);

        expect(routes).toEqual([
            { path: "/nested/a", file: path.posix.normalize(`${nestedFolder}/nested/a.md`) },
            { path: "/nested/b", file: path.posix.normalize(`${nestedFolder}/nested/b.mdx`) },
            { path: "/nested/subfolder/c", file: path.posix.normalize(`${nestedFolder}/nested/subfolder/c.md`) },
        ]);
    });
});
