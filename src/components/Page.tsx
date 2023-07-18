import siteDetails from '../../data/siteDetails';
import Navbar from './Navbar';

interface PageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Page({ children, title = siteDetails.title, description = siteDetails.description }: PageProps) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {children}
    </div>
  );
}
