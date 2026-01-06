'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Sun, Moon, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Dropdown State
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { openModal, openLoginModal } = useModal();
  const { session, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Daftar Harga', path: '/pricelist' },
    { name: 'Tentang', path: '/about' },
  ];

  // Check if current page is one that usually starts transparent (Home or Models)
  const isHomePage = pathname === '/';
  const isModelPage = pathname?.startsWith('/model/');
  const isTransparentPage = isHomePage || isModelPage;

  // Navbar should be solid background if scrolled, mobile menu open, or not on a transparent-header page
  const showSolidNav = isScrolled || mobileMenuOpen || !isTransparentPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Check initial theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  const handleProfileClick = () => {
    if (session) {
      setProfileDropdownOpen(!profileDropdownOpen);
    } else {
      openLoginModal();
    }
  };

  const handleLogout = async () => {
    await signOut();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };

  // Color Logic
  const textColorClass = 'text-slate-900 dark:text-white';
  const logoColorClass = 'text-slate-900 dark:text-white';
  const borderColorClass = 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${showSolidNav
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className={`text-2xl font-display font-bold tracking-tighter transition-colors ${logoColorClass}`}>
              BYD <span className="text-teal-500">Jakarta</span>
            </div>
          </Link>

          {/* Desktop Nav & Actions */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-bold uppercase tracking-widest hover:text-teal-500 transition-colors ${showSolidNav ? 'text-slate-900 dark:text-gray-200' : textColorClass
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 pl-4 border-l border-gray-200/20">
              {/* Dark Mode Switcher */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${showSolidNav
                  ? 'hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white'
                  : `${textColorClass} hover:bg-black/5 dark:hover:bg-white/10`
                  }`}
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Profile Icon / Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleProfileClick}
                  className={`p-2 rounded-full transition-colors flex items-center gap-2 ${showSolidNav
                    ? 'hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white'
                    : `${textColorClass} hover:bg-black/5 dark:hover:bg-white/10`
                    } ${session ? 'pl-3 pr-2 bg-gray-100/50 dark:bg-slate-800/50' : ''}`}
                  aria-label="User Account"
                >
                  {session ? (
                    <>
                      <span className="text-xs font-bold hidden lg:block max-w-[100px] truncate">
                        {session.user.email?.split('@')[0]}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-[10px] text-white font-bold">
                        {session.user.email?.charAt(0).toUpperCase()}
                      </div>
                    </>
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && session && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 overflow-hidden animate-fade-in origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    </div>

                    <div className="py-1 border-t border-gray-100 dark:border-slate-700">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <button
                onClick={() => openModal()}
                className={`text-sm font-bold uppercase tracking-widest px-6 py-2 border transition-all ${borderColorClass}`}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1 ${logoColorClass}`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              className={`z-50 transition-colors ${logoColorClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-slate-900 z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-2xl font-display font-bold text-slate-900 dark:text-white border-b dark:border-slate-800 pb-4"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
            {session ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                    {session.user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user.email}</p>
                    <p className="text-xs text-teal-500">Administrator</p>
                  </div>
                </div>

                <Link
                  href="/admin"
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Admin Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-600 font-bold"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div
                className="flex items-center gap-4 py-4 cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Admin Login</span>
              </div>
            )}
          </div>

          <button
            onClick={() => openModal()}
            className="mt-4 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 font-bold uppercase tracking-widest"
          >
            Get Offer
          </button>
        </div>
      </div>
    </>
  );
};
