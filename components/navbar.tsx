"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [theme] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="m-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold">Thomas Hanson</span>
        </Link>
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            aria-label="Hamburger icon for navigation bar"
            className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 ${
              theme === "dark" ? "text-white" : ""
            }`}
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>
        </div>
        <div
          className={`hidden md:flex md:items-center md:space-x-4 ${isMenuOpen ? "block" : "hidden"}`}
        >
          <NavItem href="/" closeMenu={closeMenu}>Home</NavItem>
          <NavItem href="/about" closeMenu={closeMenu}>About</NavItem>
          <NavItem href="/posts" closeMenu={closeMenu}>Posts</NavItem>
          <NavItem href="/projects" closeMenu={closeMenu}>Projects</NavItem>
          <NavItem href="/contact" closeMenu={closeMenu}>Contact</NavItem>
          <NavItem href="/uses" closeMenu={closeMenu}>Uses</NavItem>
        </div>
        <div
          className={`hidden md:flex md:items-center md:space-x-4 ${isMenuOpen ? "block" : "hidden"}`}
        >
          <ThemeSwitcher />
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <NavItem href="/" closeMenu={closeMenu}>Home</NavItem>
          <NavItem href="/about" closeMenu={closeMenu}>About</NavItem>
          <NavItem href="/posts" closeMenu={closeMenu}>Posts</NavItem>
          <NavItem href="/projects" closeMenu={closeMenu}>Projects</NavItem>
          <NavItem href="/contact" closeMenu={closeMenu}>Contact</NavItem>
          <NavItem href="/uses" closeMenu={closeMenu}>Uses</NavItem>
        </div>
      )}
    </nav>
  );
};

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  closeMenu: () => void;
};

const NavItem = ({ href, children, closeMenu }: NavItemProps) => {
  return (
    <Link
      href={href}
      className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"
      onClick={closeMenu}
    >
      {children}
    </Link>
  );
};

export default Navbar;
