import type { Project } from "contentlayer/generated";
import { allProjects } from "contentlayer/generated";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useMDXComponent } from 'next-contentlayer/hooks';
import Page from "~/components/Page";
import { useTheme } from 'next-themes';

type Props = {
  project: Project;
};

export default function ProjectPage({ project }: Props) {
  
  const { theme } = useTheme();
  const MDXComponent = useMDXComponent(project.body.code);

  return (
    <Page
      title={project.title}
      description={project.summary}
    >
      <div className="container mx-auto mt-16 max-w-[920px] py-12 px-4">
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex items-center text-base">
          </div>
          <h1 className="mb-3 font-mono text-4xl font-semibold">
            {project.title}
          </h1>
          <div className="h-8" />
        </div>
        <article className={`prose ${theme === 'dark' ? 'prose-invert' : ''}`}>
          <MDXComponent />
        </article>
      </div>
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allProjects.map((project) => ({
    params: { slug: project.slug },
  }));

  return Promise.resolve({
    paths,
    fallback: false,
  });
};

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;
  const slug = params?.slug as string;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project with slug ${slug} not found`);
  }

  return {
    props: {
      project,
    },
  };
};