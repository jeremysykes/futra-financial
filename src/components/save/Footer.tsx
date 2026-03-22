import { SaveFooter } from '../../mocks/save.mock';
import { Logo } from '../../stories/logo/Logo';

export function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-[#1C1C1A]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo unitName="save" mode="dark" className="text-[#F7F5F0]" />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {SaveFooter.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#9A9A90]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#9A9A90] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(154,154,144,0.2)]">
          <span className="font-sans text-xs text-[#9A9A90]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
