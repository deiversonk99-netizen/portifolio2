import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Apps', href: '#apps' },
    { name: 'Experiência', href: '#experience' },
    { name: 'Contato', href: '#contact' },
  ];

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-light dark:glass-dark shadow-lg py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-2xl text-blue-900 dark:text-white cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Zap size={24} fill="currentColor" />
          </div>
          <span>Developer app</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`font-medium transition-colors relative group ${scrolled
                      ? 'text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <a href="#contact" className="bg-blue-900 dark:bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-800 dark:hover:bg-blue-500 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-900/20">
            Falar com especialista
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            {isDarkMode ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <button
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-6 md:hidden flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-800 dark:text-gray-200 py-2 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="mt-2 bg-blue-500 text-white w-full py-3 rounded-lg font-bold text-center">
            Começar Agora
          </a>
        </div>
      )}
    </nav>
  );
};