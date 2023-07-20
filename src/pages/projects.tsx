import { allProjects } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsEye, BsGithub, BsLink } from "react-icons/bs";
import Page from "~/components/Page";

interface Project {
  slug: string;
  date: string;
  title: string;
  summary: string;
  coverImage: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

interface ProjectProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectProps) {
  return (
    <Page>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(({ slug, title, summary, coverImage, tags, demoLink, githubLink }) => (
            <div key={slug} className="border border-gray-300 rounded-lg overflow-hidden flex flex-col h-full">
              <div className="h-full">
                {
                  coverImage &&
                  <Image 
                    src={coverImage}
                    className="w-full h-full object-cover"
                    alt={`Cover image for ${title}`}
                  />
                }
              </div>
              <div className="px-6 py-4 flex flex-col justify-between h-full">
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
                  <Link href={`/projects/${slug}`}>
                    {title}
                  </Link>
                </div>
                <p className="text-base">
                  {summary}
                </p>
                <br />
                <div className="mt-auto"> {/* mt-auto will push content to the bottom */}
                  {demoLink && (
                    <Link 
                      href={demoLink}
                      className="px-6 py-2 flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mb-2"
                    >
                      <BsEye className="mr-2" />
                      See Live Demo
                    </Link>
                  )}
                  {githubLink && (
                    <Link
                      href={githubLink}
                      className="px-6 py-2 flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    >
                      <BsGithub className="mr-2" />
                      View on GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

// Statically fetch all projects
export function getStaticProps() {
  const projects = allProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return { props: { projects } };
}
