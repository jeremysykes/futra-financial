import { TogetherLinks } from '../../mocks/together.mock';
import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

export function Navbar() {
  return (
    <SharedNavbar unitName="together" links={TogetherLinks} ctaText="Get Started" />
  );
}
