import Head from 'next/head';
import { useRouter } from 'next/router';
import siteDetails from '../../data/siteDetails';

interface GlobalDetailsProps {
  title: string;
  description: string;
  ogType: string;
  ogImage: string | { url: string }[];
  //twImage: string;
  canonicalUrl?: string;
}

const GlobalDetails = ({
  title,
  description,
  ogType,
  ogImage,
  //twImage,
  canonicalUrl,
}: GlobalDetailsProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${siteDetails.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteDetails.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteDetails.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {
        //<meta name="twitter:image" content={twImage} />
      }
      <link
        rel="canonical"
        href={canonicalUrl ? canonicalUrl : `${siteDetails.siteUrl}${router.asPath}`}
      />
    </Head>
  );
};

interface PageDetailsProps {
  title: string;
  description: string;
}

export const PageDetails = ({ title, description }: PageDetailsProps) => {
  const ogImageUrl = siteDetails.siteUrl + siteDetails.socialBanner;
  const twImageUrl = siteDetails.siteUrl + siteDetails.socialBanner;
  return (
    <GlobalDetails
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      //twImage={twImageUrl}
    />
  );
};

interface TagDetailsProps {
  title: string;
  description: string;
}

export const TagDetails = ({ title, description }: TagDetailsProps) => {
  const ogImageUrl = siteDetails.siteUrl + siteDetails.socialBanner;
  const twImageUrl = siteDetails.siteUrl + siteDetails.socialBanner;
  const router = useRouter();
  return (
    <>
      <GlobalDetails
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        //twImage={twImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteDetails.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  );
};

interface BlogDetailsProps {
  authorDetails: { name: string }[] | null;
  title: string;
  summary: string;
  date: string;
  lastmod?: string;
  url: string;
  images?: string | string[];
  canonicalUrl?: string;
}

export const BlogDetails = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  canonicalUrl,
}: BlogDetailsProps) => {
  const router = useRouter();
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  let imagesArr =
    images.length === 0
      ? [siteDetails.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images;

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: img.includes('http') ? img : siteDetails.siteUrl + img,
    };
  });

  let authorList;
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      };
    });
  } else {
    authorList = {
      '@type': 'Person',
      name: siteDetails.author,
    };
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteDetails.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteDetails.siteUrl}${siteDetails.siteLogo}`,
      },
    },
    description: summary,
  };

  //const twImageUrl = featuredImages[0].url;

  return (
    <>
      <GlobalDetails
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        //twImage={twImageUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
