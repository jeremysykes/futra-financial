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
      className={`fixed top-9 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 transition-colors duration-300 ${
        scrolled ? 'bg-[#1A1A1F]/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <Logo className="text-white" />
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-[#8B8B9A] text-[14px] hover:text-[#6C6FE4] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {l}
          </a>
        ))}
      </div>
      <a
        href="#cta"
        className="hidden md:inline-flex items-center px-4 py-2 bg-[#6C6FE4] text-white text-[14px] rounded-lg hover:bg-[#5B5ED0] transition-colors"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
      >
        Get Started
      </a>
      <button
        className="md:hidden text-white"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {mobileOpen && (
        <div className="absolute top-[64px] left-0 right-0 bg-[#1A1A1F] border-t border-white/10 flex flex-col p-6 gap-4 md:hidden">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[#8B8B9A] text-[16px] hover:text-[#6C6FE4]"
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#6C6FE4] text-white rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
