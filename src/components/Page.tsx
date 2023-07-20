import siteDetails from '../../data/siteDetails';
import Navbar from './Navbar';
import { NextSeo } from 'next-seo';

interface PageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Page({
    children,
    title = siteDetails.title,
    description = siteDetails.description 
  }: PageProps) {
  return (
    <div>
      <header>
        <NextSeo 
          title={title}
          description={description}
        />
        <Navbar />
      </header>
      {children}
    </div>
  );
}
