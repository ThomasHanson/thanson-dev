import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'The summary of the post',
      required: true,
    },
    date: {
      type: 'string',
      description: 'The date of the post',
      required: true,
    },
    lastMod: {
      type: 'date',
      description: 'The last modified date of the post',
      required: false,
    },
    draft: {
      type: 'boolean',
      description: 'Indicates if the post is a draft',
      required: false,
      defaultValue: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    coverImage: {
      type: 'string',
      description: 'The cover image of the post',
      required: false,
    },
    ogImage: {
      type: 'string',
      description: 'The og cover image of the post',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const parts = post._raw.flattenedPath.split("/");
        return parts[parts.length - 1];
      },
    },
    url: {
      type: "string",
      resolve: (post) => {
        const parts = post._raw.flattenedPath.split("/");
        const slug = parts[parts.length - 1];
        return `/blog/${slug}`;
      },
    }
  },
}));

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `**/projects/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the project',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'The summary of the project',
      required: true,
    },
    date: {
      type: 'string',
      description: 'The date of the project',
      required: true,
    },
    demoLink: {
      type: 'string',
      description: 'The link for the live demo of the project',
      required: false,
    },
    githubLink: {
      type: 'string',
      description: 'The link for the GitHub repo of the project',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    coverImage: {
      type: 'string',
      description: 'The cover image of the project',
      required: false,
    },
    ogImage: {
      type: 'string',
      description: 'The og cover image of the project',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const parts = post._raw.flattenedPath.split("/");
        return parts[parts.length - 1];
      },
    },
    url: {
      type: "string",
      resolve: (post) => {
        const parts = post._raw.flattenedPath.split("/");
        const slug = parts[parts.length - 1];
        return `/projects/${slug}`;
      },
    }
  },
}));

const prettyCodeOptions = {
  theme: 'material-theme-palenight',

  onVisitLine(node: { children: string | unknown[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },

  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className.push('highlighted');
  },

  onVisitHighlightedWord(node: { properties: { className: string[] } }) {
    node.properties.className = ['highlighted', 'word'];
  },
};

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
});