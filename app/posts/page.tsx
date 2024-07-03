"use client";

import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "@/components/ui/card"
import { useLayout } from "@/app/context/layout-context"
import { useEffect } from "react"
import React from "react"
import { Badge } from "@/components/ui/badge";

export default function Posts() {
  const { setIsFullWidth } = useLayout()

  useEffect(() => {
    setIsFullWidth(true)
    return () => setIsFullWidth(false)
  }, [setIsFullWidth])

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPosts.map((post) => (
          <article key={post._id}>
            <Card>
              <a href={post.slug}>
                {post.coverImage &&
                  <CardImage
                    src={post.coverImage}
                    alt={`Cover image for ${post.title} post`}
                    className="rounded-t-lg"
                  />
                }
                <CardHeader>
                  {post.tags && post.tags.length > 0 &&
                    <div className="mb-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} className="mr-1">{tag}</Badge>
                      ))}
                    </div>
                  }
                  <CardTitle>
                    <Link href={post.slug}>{post.title}</Link>
                  </CardTitle>
                  {post.summary &&
                    <CardDescription>{post.summary}</CardDescription>
                  }
                </CardHeader>
              </a>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}
