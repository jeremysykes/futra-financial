import { useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Logo } from '../logo/Logo';
import { NavLink } from '../nav-link/NavLink';
import { Button } from '../button/Button';

const navbarVariants = cva(
  'fixed top-[var(--nav-top,0px)] left-0 right-0 z-50 h-16 transition-colors duration-300 border-b',
  {
    variants: {
      scrolled: {
        true: 'bg-surface/95 backdrop-blur-sm border-border',
        false: 'bg-transparent border-transparent',
      },
    },
    defaultVariants: {
      scrolled: false,
    },
  },
);

const mobileMenuVariants = cva(
  'md:hidden px-6 py-4 absolute top-[64px] left-0 right-0 flex flex-col gap-4',
  {
    variants: {
      state: {
        open: 'bg-surface border-b border-border',
      },
    },
    defaultVariants: {
      state: 'open',
    },
  },
);

export interface NavbarProps extends VariantProps<typeof navbarVariants> {
  /** Business unit name used for the logo */
  unitName: string;
  /** Navigation link items displayed in the navbar */
  links: { label: string; href: string }[];
  /** Label text for the call-to-action button */
  ctaText: string;
  /** Additional CSS classes for the nav element */
  className?: string;
}

/**
 * Responsive navigation bar with logo, links, CTA, and mobile menu.
 *
 * Fixed to the top of the viewport. Transitions from transparent to
 * a blurred surface background on scroll. Includes a hamburger menu
 * for mobile viewports.
 */
const Navbar = ({ unitName, links, ctaText, className }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(navbarVariants({ scrolled }), className)}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 h-full flex items-center justify-between">
        <Logo unitName={unitName} />

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm" asChild>
            <a href="#cta">{ctaText}</a>
          </Button>
        </div>

        <button
          ref={toggleRef}
          className="md:hidden text-foreground cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={cn(mobileMenuVariants())}>
          {links.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              size="base"
              className="min-h-[44px] flex items-center"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button size="sm" asChild className="w-full">
            <a href="#cta" onClick={() => setMobileOpen(false)}>
              {ctaText}
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

Navbar.displayName = 'Navbar';

export { Navbar };
