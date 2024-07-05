import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Mdx } from "@/components/mdx-components";
import { Metadata } from "next";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const project = await getPostFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* <NextSeo
        title={post.title}
        description={post.summary || undefined}
        canonical={post.slug}
        openGraph={{
          type: "article",
          article: {
            publishedTime: post.date,
            ...(post.lastMod && { modifiedTime: post.lastMod }),
            authors: ["https://www.thanson.dev/about"],
            ...(post.tags && { tags: post.tags }),
          },
          url: "https://www.thanson.dev/posts",
          images: post.coverImage
            ? [
                {
                  url: post.coverImage,
                  width: 850,
                  height: 650,
                  alt: "Cover image",
                },
              ]
            : [],
          site_name: "Thomas Hanson",
        }}
      /> */}

      <article className="py-6 prose dark:prose-invert">
        <h1 className="mb-2">{post.title}</h1>
        <hr className="my-4" />
        <Mdx code={post.body.code} />
      </article>
    </>
  );
}
