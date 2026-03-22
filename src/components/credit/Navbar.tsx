import { CreditLinks } from '../../mocks/credit.mock';
import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

export function Navbar() {
  return (
    <SharedNavbar
      unitName="credit"
      links={CreditLinks}
      ctaText="Check Your Score"
    />
  );
}
