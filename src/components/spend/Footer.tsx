import { Logo } from '../../stories/logo/Logo';

const columns = [
  { title: 'Product', links: ['Features', 'Security', 'Pricing'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

export function Footer() {
  return (
    <footer className="bg-[#0F0F12] border-t border-[rgba(255,255,255,0.08)] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-12">
          <Logo unitName="spend" mode="dark" className="text-[#FFFFFF]" />
          <div className="flex flex-wrap gap-12 md:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <p
                  className="text-[12px] uppercase tracking-[0.08em] text-[#8B8B9A] mb-4 font-sans font-medium"
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[14px] text-[#8B8B9A] hover:text-[#FFFFFF] transition-colors font-sans font-normal"
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
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
          <p
            className="text-[12px] text-[#8B8B9A] font-sans font-normal"
          >
            &copy; 2026 Futra Financial, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
