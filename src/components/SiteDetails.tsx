import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

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

  <NextSeo 
    title={title}
    description={description}
  />

  const router = useRouter();
  return (
    <Head>
      
    </Head>
  );
};
