import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

function getPath(relativePath: string): string {
  return path.join(process.cwd(), relativePath);
}

const POSTS_DIRECTORY = getPath("markdown/posts");
const ABOUT_ME_PAGE = getPath("markdown/about-me.md");

function arePreviewPostsAllowed() {
  return process.env.BLOG_ALLOW_PREVIEW === "true";
}

export async function getAboutMePage() {
  const fileContents = fs.readFileSync(ABOUT_ME_PAGE, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
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

export function getSortedPostsData() {
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
    .filter(({ preview }) => arePreviewPostsAllowed() || !preview);

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
  return getSortedPostsData().map(({ id }) => {
    params: {
      id;
    }
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...parseHeader(matterResult.data),
  };
}
