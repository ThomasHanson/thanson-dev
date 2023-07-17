import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/articles/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: true,
    },
    date: {
      type: 'string',
      description: 'The date of the post',
      required: true,
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
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath,
    },
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
    excerpt: {
      type: 'string',
      description: 'The excerpt of the project',
      required: true,
    },
    date: {
      type: 'string',
      description: 'The date of the project',
      required: true,
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
    url: {
      type: 'string',
      resolve: (project) => `/projects/${project._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (project) => project._raw.flattenedPath,
    },
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
  contentDirPath: 'content',
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