
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <span className="font-semibold text-bio-darkGreen text-lg">
            Bio<span className="text-bio-green">Portfolio</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium hover:text-bio-green transition-colors ${
                isActive ? 'text-bio-green' : 'text-foreground'
              }`
            }
          >
            {t('home')}
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `font-medium hover:text-bio-green transition-colors ${
                isActive ? 'text-bio-green' : 'text-foreground'
              }`
            }
          >
            {t('projects')}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-medium hover:text-bio-green transition-colors ${
                isActive ? 'text-bio-green' : 'text-foreground'
              }`
            }
          >
            {t('about')}
          </NavLink>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-1 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-border"
        >
          <div className="container py-4 flex flex-col space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-bio-green/10 text-bio-green'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              {t('home')}
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-bio-green/10 text-bio-green'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              {t('projects')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-bio-green/10 text-bio-green'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              {t('about')}
            </NavLink>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
