import siteDetails from '../../data/siteDetails';
import Navbar from './Navbar';
import { PageDetails } from './SiteDetails';

interface PageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Page({ children, title = siteDetails.title, description = siteDetails.description }: PageProps) {
  return (
    <div>
      <PageDetails
        title={title}
        description={description}
      />
      <header>
        <Navbar />
      </header>
      {children}
    </div>
  );
}
