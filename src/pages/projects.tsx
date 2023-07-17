import Link from "next/link";
import { allProjects } from "../../.contentlayer/generated";

interface Project {
  slug: string;
  date: string;
  title: string;
}

interface ProjectProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectProps) {
  return (
    <section>
      <ul>
        {projects.map(({ slug, date, title }) => (
          <li key={slug}>
            <Link href={`/projects/${slug}`}>
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
  
  const projects = allProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { props: { projects } };
}
