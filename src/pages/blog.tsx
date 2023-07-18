import Link from "next/link";
import Page from "~/components/Page";
import { allPosts } from "../../.contentlayer/generated";

interface Post {
  slug: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];

}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Page>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {posts.map(({ slug, title, summary, tags }) => (
            <div key={slug} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <div>
                  {tags && tags.length > 0 && tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="font-bold text-xl mt-2 mb-2">
                  <Link href={`/${slug}`}>
                    {title}
                  </Link>
                </div>
                <p className="text-base">
                  {summary}
                </p>
                <br />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

// Statically fetch all posts
export async function getStaticProps() {
  
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { props: { posts } };
}
