import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Compare', href: '#compare' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  return <SharedNavbar unitName="plan" links={links} ctaText="Start Planning" />;
}
