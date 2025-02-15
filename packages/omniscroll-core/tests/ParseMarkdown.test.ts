import { afterEach, describe, expect, it, vi } from "vitest";
import ParseMarkdown from "../src/markdown";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Parse Markdown Function Tests", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should be called once", () => {
        const mockMarkdownPath = path.resolve(__dirname, "../__mocks__/TestMarkdown.md");
        const mockMarkdownContent = fs.readFileSync(mockMarkdownPath, "utf-8");

        const parseMarkdownSpy = vi.spyOn(fs, "readFileSync").mockReturnValue(mockMarkdownContent);

        ParseMarkdown(mockMarkdownPath);

        expect(parseMarkdownSpy).toHaveBeenCalledTimes(1);
    });

    it("should parse Markdown correctly", () => {
        const mockMarkdownPath = path.resolve(__dirname, "../__mocks__/TestMarkdown.md");
        const mockMarkdownContent = fs.readFileSync(mockMarkdownPath, "utf-8");

        vi.spyOn(fs, "readFileSync").mockReturnValue(mockMarkdownContent);

        const result = ParseMarkdown(mockMarkdownPath);

        expect(result.frontmatter).toEqual({
            title: "Hello World",
            description: "This is a test"
        })
        expect(result.content.trim()).toBe("# Welcome to Omniscroll");
    });
});
