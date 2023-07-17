import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-white text-lg font-bold">Thomas Hanson</span>
          </Link>
          <div className="flex items-center space-x-4">
            <NavItem href="/about">About</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <NavItem href="/projects">Projects</NavItem>
            <NavItem href="/uses">Uses</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

const NavItem = ({ href, children }: NavItemProps) => {
  return (
    <Link href={href} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      {children}
    </Link>
  );
};

export default Navbar;
