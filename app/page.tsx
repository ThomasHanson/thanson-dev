import { Metadata } from "next";
import siteMetadata from "@/data/site-metadata"
import Home from "@/components/home";

// Create the metadata object for Next.js
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: "software engineer, full stack, web development", // Add relevant keywords
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.headerTitle,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Social Banner",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
    site: "@yourTwitterHandle", // Replace with your Twitter handle
    creator: siteMetadata.author,
  },
  // Add any additional metadata settings as necessary
};

export default function Page() {
  return (
    <main>
      <Home />
    </main>
  );
}
