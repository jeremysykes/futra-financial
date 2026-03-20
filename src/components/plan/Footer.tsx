import { Logo } from './Logo';

const columns = [
  { title: 'Product', links: ['Features', 'Projections', 'Budgets', 'Net Worth'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
];

export function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-[#0C1017]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo dark />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#A0AEC0]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#64748B] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(160,174,192,0.1)]">
          <span className="font-sans text-xs text-[#64748B]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
