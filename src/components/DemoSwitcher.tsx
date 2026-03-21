import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Sun, Moon, BookOpen, ChevronDown } from 'lucide-react';

const UNITS = [
  { id: 'spend', label: 'Spend' },
  { id: 'save', label: 'Save' },
  { id: 'credit', label: 'Credit' },
  { id: 'plan', label: 'Plan' },
  { id: 'together', label: 'Together' },
];

const STORYBOOK_STORY_PATHS: Record<string, string> = {
  spend: '/story/pages-futra-spend--default',
  save: '/story/pages-futra-save--default',
  credit: '/story/pages-futra-credit--default',
  plan: '/story/pages-futra-plan--default',
  together: '/story/pages-futra-together--default',
};

function getStorybookUrl(unit: string, theme: string): string {
  const storyPath = STORYBOOK_STORY_PATHS[unit] ?? STORYBOOK_STORY_PATHS.spend;
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${basePath}/storybook/?path=${storyPath}&globals=theme:${theme};businessUnit:${unit}`;
}

export function DemoSwitcher({
  unit,
  theme,
  onToggleTheme,
}: {
  unit: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeLabel = UNITS.find((u) => u.id === unit)?.label ?? 'Spend';

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-between px-4 lg:px-6 bg-primary"
    >
      <div className="flex items-center gap-3">
        <span
          className="text-white text-[11px] font-bold tracking-[0.05em] hidden sm:inline"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          FUTRA DEMO
        </span>

        {/* Desktop: pill row */}
        <div className="hidden sm:flex gap-1">
          {UNITS.map((u) => (
            <Link
              key={u.id}
              to={`/${u.id}`}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                unit === u.id
                  ? 'bg-white/25 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {u.label}
            </Link>
          ))}
        </div>

        {/* Mobile: dropdown */}
        <div className="relative sm:hidden" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/25 text-white text-[12px] font-semibold cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {activeLabel}
            <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 py-1 min-w-[120px] rounded-lg bg-primary shadow-lg ring-1 ring-white/10">
              {UNITS.map((u) => (
                <Link
                  key={u.id}
                  to={`/${u.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-1.5 text-[12px] font-semibold transition-colors ${
                    unit === u.id
                      ? 'bg-white/25 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {u.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <a
          href={getStorybookUrl(unit, theme)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open in Storybook"
        >
          <BookOpen size={14} />
        </a>
      </div>
    </div>
  );
}
