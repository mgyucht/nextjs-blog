import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root } from "mdast";

const remarkFigureCaption: Plugin<[], Root> = () => (tree) => {
  visit(tree, "paragraph", (node, index, parent) => {
    if (!parent || index == null) return;
    const nonWhitespace = node.children.filter(
      (c) => !(c.type === "text" && (c as any).value.trim() === "")
    );
    const images = nonWhitespace.filter((c) => c.type === "image") as any[];
    if (images.length === 0 || images.length !== nonWhitespace.length) return;
    const html = images
      .map((img) =>
        img.alt
          ? `<figure><img src="${img.url}" alt="${img.alt}"><figcaption>${img.alt}</figcaption></figure>`
          : `<figure><img src="${img.url}"></figure>`
      )
      .join("\n");
    (parent.children as any[])[index] = { type: "html", value: html };
  });
};

function getPath(relativePath: string): string {
  return path.join(process.cwd(), relativePath);
}

const POSTS_DIRECTORY = getPath("markdown/posts");
const ABOUT_ME_PAGE = getPath("markdown/about-me.md");

export async function getAboutMePage() {
  const fileContents = fs.readFileSync(ABOUT_ME_PAGE, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkFigureCaption)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    contentHtml,
  };
}

type PostHeader = {
  date: string;
  title: string;
  preview: boolean;
};

function parseHeader(data: any): PostHeader {
  return {
    date: data.date,
    title: data.title,
    preview: data.preview === "true",
  };
}

export function getSortedPostsData(allowPreview = false) {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPostsData = fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        id,
        ...parseHeader(matterResult.data),
      };
    })
    .filter(({ preview }) => allowPreview || !preview);

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  return getSortedPostsData(true).map(({ id }) => {
    return {
      params: {
        id,
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkFigureCaption)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...parseHeader(matterResult.data),
  };
}
