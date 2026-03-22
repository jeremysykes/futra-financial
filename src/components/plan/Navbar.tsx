import { PlanLinks } from '../../mocks/plan.mock';
import { Navbar as SharedNavbar } from '../../stories/navbar/Navbar';

export function Navbar() {
  return (
    <SharedNavbar unitName="plan" links={PlanLinks} ctaText="Start Planning" />
  );
}
