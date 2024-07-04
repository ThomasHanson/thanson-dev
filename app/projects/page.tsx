"use client";

import { allProjects } from "@/.contentlayer/generated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLayout } from "@/app/context/layout-context";
import { useEffect } from "react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { GiArrowCursor } from "react-icons/gi";

export default function Projects() {
  const { setIsFullWidth } = useLayout();
  useEffect(() => {
    setIsFullWidth(true);
    return () => setIsFullWidth(false);
  }, [setIsFullWidth]);

  const sortedProjects = allProjects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* <div className="my-4 flex justify-center max-w-7xl mx-auto">
      <Input
          placeholder="Search by title, summary, or tags"
          className="p-4 rounded-md w-full"
          value={searchText}
          onChange={handleSearch}
        />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProjects.map((project) => (
          <article key={project._id} className="flex">
            <Card className="flex flex-col h-full">
              <a href={project.slug} className="flex flex-col h-full">
                {project.coverImage && (
                  <CardImage
                    src={project.coverImage}
                    alt={`Cover image for ${project.title} project`}
                    className="rounded-t-lg"
                  />
                )}
                <CardHeader className="flex-1">
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} className="mr-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <CardTitle>{project.title}</CardTitle>
                  {project.summary && (
                    <CardDescription>{project.summary}</CardDescription>
                  )}
                </CardHeader>

                {(project.demoLink || project.githubLink) && (
                  <CardFooter className="flex flex-col gap-2">
                    {project.demoLink && (
                      <ButtonLink
                        variant="default"
                        href={project.demoLink}
                        className="flex w-full justify-center items-center"
                      >
                        <GiArrowCursor className="mr-2" />
                        Live Demo
                      </ButtonLink>
                    )}
                    {project.githubLink && (
                      <ButtonLink
                        variant="secondary"
                        href={project.githubLink}
                        className="flex w-full justify-center items-center"
                      >
                        <FaGithub className="mr-2" />
                        View on GitHub
                      </ButtonLink>
                    )}
                  </CardFooter>
                )}
              </a>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}

interface ButtonLinkProps {
  href: string;
  variant: any;
  className?: string;
  children: React.ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  variant,
  className,
  children,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Button variant={variant} className="flex w-full">
        {children}
      </Button>
    </a>
  );
};
