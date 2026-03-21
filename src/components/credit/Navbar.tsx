import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  return <SharedNavbar unitName="credit" links={links} ctaText="Check Your Score" />;
}
