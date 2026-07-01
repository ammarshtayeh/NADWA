import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Menu, X, Tv } from 'lucide-react';
import { usePresenter } from '../context/PresenterContext';

export const Navbar: React.FC = () => {
  const { presenterMode, setPresenterMode } = usePresenter();
  const { navigation } = siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-slate-950/85 border-b border-emerald-950/40 backdrop-blur-md shadow-lg' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="font-bold text-lg md:text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-slate-100 to-red-400 bg-clip-text text-transparent">
                {navigation.logoText}
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navigation.links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => 
                  `px-3.5 py-2 rounded-md text-sm font-semibold transition-all border-b-2 ${
                    isActive 
                      ? 'text-emerald-400 border-emerald-500/80 pb-1' 
                      : 'text-slate-300 border-transparent hover:text-emerald-400 hover:border-emerald-500/20'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Presenter Mode Toggle Button */}
            <button
              onClick={() => setPresenterMode(!presenterMode)}
              className={`mr-4 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                presenterMode 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-350 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>{presenterMode ? 'إنهاء وضع العارض' : 'وضع العارض 🖥️'}</span>
            </button>
          </div>



          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">افتح القائمة الرئيسية</span>
              {isOpen ? <X className="h-6 w-6 text-red-500" /> : <Menu className="h-6 w-6 text-emerald-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-slate-950/98 transition-transform duration-355 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 border-t border-slate-900">
          {/* Mobile Presenter Mode Button */}
          <div className="pb-3 border-b border-slate-900 mb-2">
            <button
              onClick={() => {
                setPresenterMode(!presenterMode);
                setIsOpen(false);
              }}
              className={`w-full text-center px-4 py-2.5 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                presenterMode 
                  ? 'bg-red-500/15 border-red-500/30 text-red-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>{presenterMode ? 'إنهاء وضع العارض 🖥️' : 'وضع العارض للمحاضر 🖥️'}</span>
            </button>
          </div>
          {navigation.links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-base font-bold transition-all ${
                  isActive 
                    ? 'text-emerald-450 bg-emerald-950/20 border-r-4 border-emerald-500' 
                    : 'text-slate-350 hover:text-emerald-400 hover:bg-slate-900/50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
