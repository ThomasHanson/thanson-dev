import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState } from 'react';
import { BsList } from 'react-icons/bs';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="m-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">Thomas Hanson</span>
          </Link>

          {/* Hamburger menu */}
          <div className="md:hidden">
            <button
              type="button"
              className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
                theme === 'dark' && 'text-white'
              }`}
              onClick={toggleMenu}
            >
              <BsList className={`h-6 w-6 ${theme === 'dark' && 'text-white'}`} />
            </button>
          </div>

          {/* Nav items */}
          <div className={`hidden md:flex md:items-center md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/projects">Projects</NavItem>
            <NavItem href="/contact">Contact</NavItem>
            <NavItem href="/uses">Uses</NavItem>
          </div>

          {/* Toggle switch */}
          <div className="flex items-center space-x-4">
            <div className="md:flex md:items-center md:space-x-4'}">
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className={`${
                  theme === 'dark' ? 'bg-green-600' : 'bg-gray-600'
                } relative inline-flex flex-shrink-0 h-5 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
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
      </div>

      {/* Responsive menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/blog">Blog</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/contact">Contact</NavItem>
          <NavItem href="/uses">Uses</NavItem>
        </div>
      )}
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
      className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
    >
      {children}
    </Link>
  );
};

export default Navbar;
