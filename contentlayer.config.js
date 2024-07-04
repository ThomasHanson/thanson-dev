import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    summary: {
      type: "string",
      description: "The summary of the post",
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    lastMod: {
      type: "date",
      description: "The last modified date of the post",
    },
    draft: {
      type: "boolean",
      description: "Indicates if the post is a draft",
      defaultValue: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The list of associated tags for the post",
    },
    coverImage: {
      type: "string",
      description: "The cover image of the post",
    },
    ogImage: {
      type: "string",
      description: "The og cover image of the post",
    },
  },
  computedFields,
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the project",
      required: true,
    },
    summary: {
      type: "string",
      description: "The summary of the project",
    },
    date: {
      type: "date",
      description: "The date of the project",
      required: true,
    },
    demoLink: {
      type: "string",
      description: "The link for the live demo of the project",
    },
    githubLink: {
      type: "string",
      description: "The link for the GitHub repo of the project",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The list of associated tags for the project",
    },
    coverImage: {
      type: "string",
      description: "The cover image of the project",
    },
    ogImage: {
      type: "string",
      description: "The og cover image of the project",
    },
  },
  computedFields,
}));

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "one-dark-pro",
};

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
