import { Logo } from '../../stories/logo/Logo';

const COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'Splits', 'Shared Goals'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms'],
  },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#1C1A18' }} className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Logo unitName="together" mode="dark" className="text-[#FFF9F5]" />
            <p className="text-sm mt-4 leading-relaxed" style={{ color: '#9E8E84' }}>
              Shared finances,
              <br />
              without the friction.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="font-sans font-semibold text-xs uppercase tracking-wider mb-4"
                style={{ color: '#9E8E84' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors text-[#9E8E84] hover:text-[#C4B8AE]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 text-xs text-center"
          style={{ borderTop: '1px solid rgba(158,142,132,0.2)', color: '#9E8E84' }}
        >
          &copy; 2026 Futra Together. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
