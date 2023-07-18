import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <nav className="m-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">Thomas Hanson</span>
          </Link>

          <div className="flex items-center space-x-4">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/projects">Projects</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <NavItem href="/uses">Uses</NavItem>
          </div>

          <div>
            <Switch
              checked={theme === 'dark'}
              onChange={() => toggleTheme()}
              className={`${
                theme === 'dark' ? 'bg-green-600' : 'bg-gray-600'
              } relative inline-flex flex-shrink-0 h-6 w-12 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                aria-hidden="true"
                className={`${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                } pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
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
    <Link
      href={href}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
};

export default Navbar;
