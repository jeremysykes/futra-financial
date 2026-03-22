import { SaveLinks } from '../../mocks/save.mock';
import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

export function Navbar() {
  return (
    <SharedNavbar unitName="save" links={SaveLinks} ctaText="Start Saving" />
  );
}
