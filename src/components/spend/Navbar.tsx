import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Features', 'Security', 'Pricing'];

  return (
    <nav
      className={`fixed top-[var(--nav-top,0px)] left-0 right-0 z-50 h-16 transition-colors duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
      <Logo className="text-foreground" />
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-muted-foreground text-[14px] hover:text-accent transition-colors font-sans font-medium"
          >
            {l}
          </a>
        ))}
      </div>
      <a
        href="#cta"
        className="hidden md:inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-[14px] rounded-lg hover:bg-primary-hover transition-colors font-sans font-medium"
      >
        Get Started
      </a>
      <button
        className="md:hidden text-foreground"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {mobileOpen && (
        <div className="absolute top-[64px] left-0 right-0 bg-surface border-t border-border flex flex-col p-6 gap-4 md:hidden">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-muted-foreground text-[16px] hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
      </div>
    </nav>
  );
}
