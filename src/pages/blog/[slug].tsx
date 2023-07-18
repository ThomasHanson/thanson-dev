import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import type { GetStaticPaths, GetStaticProps } from "next";
import Page from "~/components/Page";

type Props = {
  post: Post;
};

export default function PostPage({ post }: Props) {
  return (
    <Page>
      <div className="flex min-h-screen flex-col items-center">
        <header>
          <h1 className="pb-10 text-7xl text-white">Test</h1>
        </header>
        <article className="prose">
        </article>
      </div>
    </Page>
  );
}

const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = async (context) => {
  console.log("Hey")
  const { params } = context;
  const slug = params?.slug as string;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }

  return {
    props: {
      post
    },
  };
};