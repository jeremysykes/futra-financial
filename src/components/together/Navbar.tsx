import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  return <SharedNavbar unitName="together" links={links} ctaText="Get Started" />;
}
