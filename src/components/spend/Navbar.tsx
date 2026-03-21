import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  return <SharedNavbar unitName="spend" links={links} ctaText="Get Started" />;
}
