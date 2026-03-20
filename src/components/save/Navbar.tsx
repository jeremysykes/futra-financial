import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['How It Works', 'Features', 'Goals'];

  return (
    <nav
      className={`fixed top-9 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-sans font-medium text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-sm hover:bg-primary-hover transition-colors cursor-pointer">
            Start Saving
          </button>
        </div>
        <button
          className="md:hidden text-foreground cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-surface absolute top-[64px] left-0 right-0 border-b border-border">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="block py-3 font-sans font-medium text-base text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="mt-3 w-full px-5 py-3 rounded-lg bg-primary text-primary-foreground font-sans font-medium cursor-pointer">
            Start Saving
          </button>
        </div>
      )}
    </nav>
  );
}
