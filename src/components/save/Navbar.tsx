import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Goals', href: '#goals' },
];

export function Navbar() {
  return <SharedNavbar unitName="save" links={links} ctaText="Start Saving" />;
}
