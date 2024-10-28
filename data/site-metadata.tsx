const siteMetadata = {
  title: "Thomas Hanson | Software Engineer",
  author: "Thomas Hanson",
  headerTitle: "TailwindBlog",
  description: "A blog created with Next.js and Tailwind.css",
  language: "en-us",
  theme: "system",
  siteUrl: "https://tailwind-nextjs-starter-blog.vercel.app",
  siteRepo: "https://github.com/timlrx/tailwind-nextjs-starter-blog",
  siteLogo: "/static/images/logo.png",
  socialBanner: "/static/images/twitter-card.png",
  mastodon: "https://mastodon.social/@mastodonuser",
  email: "contact@thanson.dev",
  github: "https://github.com/ThomasHanson",
  x: "https://twitter.com/x",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "https://www.linkedin.com",
  threads: "https://www.threads.net",
  instagram: "https://www.instagram.com",
  locale: "en-US",
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: "buttondown",
  },
  comments: {
    provider: "giscus",
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname",
      reactions: "1",
      metadata: "0",
      theme: "light",
      darkTheme: "transparent_dark",
      lang: "en",
    },
  },
  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: "search.json",
    },
  },
};

export default siteMetadata; // Ensure you have a default export
