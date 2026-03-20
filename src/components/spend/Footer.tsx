import { Logo } from './Logo';

const columns = [
  { title: 'Product', links: ['Features', 'Security', 'Pricing'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-12">
          <Logo className="text-foreground" />
          <div className="flex flex-wrap gap-12 md:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <p
                  className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground mb-4 font-sans font-medium"
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[14px] text-muted-foreground hover:text-foreground transition-colors font-sans font-normal"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border pt-6">
          <p
            className="text-[12px] text-muted-foreground font-sans font-normal"
          >
            &copy; 2026 Futra Financial, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
