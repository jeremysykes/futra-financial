import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const NAV_LINKS = ['How It Works', 'Features', 'Pricing'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-9 left-0 right-0 z-50 h-16 transition-colors ${
        scrolled ? 'bg-surface/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
      <Logo />

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link}
          </a>
        ))}
        <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-[10px] hover:bg-primary-hover transition-colors">
          Get Started Together
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[64px] left-0 right-0 bg-surface border-b border-border p-6 flex flex-col gap-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-[10px] hover:bg-primary-hover transition-colors w-full">
            Get Started Together
          </button>
        </div>
      )}
      </div>
    </nav>
  );
}
