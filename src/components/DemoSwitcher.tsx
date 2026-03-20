import { Link } from 'react-router';
import { Sun, Moon, BookOpen } from 'lucide-react';

const UNITS = [
  { id: 'spend', label: 'Spend' },
  { id: 'save', label: 'Save' },
  { id: 'credit', label: 'Credit' },
];

const STORYBOOK_STORY_PATHS: Record<string, string> = {
  spend: '/story/pages-futra-spend--default',
  save: '/story/pages-futra-save--default',
  credit: '/story/pages-futra-credit--default',
};

function getStorybookUrl(unit: string, theme: string): string {
  const storyPath = STORYBOOK_STORY_PATHS[unit] ?? STORYBOOK_STORY_PATHS.spend;
  return `http://localhost:6006/?path=${storyPath}&globals=theme:${theme};businessUnit:${unit}`;
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
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-between px-4 lg:px-6"
      style={{ backgroundColor: '#6C6FE4' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-white text-[11px] font-bold tracking-[0.05em] hidden sm:inline"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          FUTRA DEMO
        </span>
        <div className="flex gap-1">
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
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
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
