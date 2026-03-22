import { SpendLinks } from '../../mocks/spend.mock';
import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

export function Navbar() {
  return (
    <SharedNavbar unitName="spend" links={SpendLinks} ctaText="Get Started" />
  );
}
