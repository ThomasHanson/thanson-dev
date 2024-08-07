import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";

interface ProjectProps {
  params: {
    slug: string[];
  };
}

async function getProjectFromParams(params: ProjectProps["params"]) {
  const slug = params?.slug?.join("/");
  const project = allProjects.find((project) => project.slugAsParams === slug);

  if (!project) {
    null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export async function generateStaticParams(): Promise<
  ProjectProps["params"][]
> {
  return allProjects.map((project) => ({
    slug: project.slugAsParams.split("/"),
  }));
}

export default async function ProjectPage({ params }: ProjectProps) {
  const project = await getProjectFromParams(params);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{project.title}</h1>
      <hr className="my-4" />
      <Mdx code={project.body.code} />
    </article>
  );
}
