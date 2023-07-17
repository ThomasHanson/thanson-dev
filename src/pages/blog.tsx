import Link from "next/link";
import { allPosts } from "../../.contentlayer/generated";

interface Post {
  slug: string;
  date: string;
  title: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <section>
      <ul>
        {posts.map(({ slug, date, title }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              {title}
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Statically fetch all posts
export async function getStaticProps() {
  
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { props: { posts } };
}
