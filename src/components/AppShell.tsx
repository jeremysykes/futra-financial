import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { SpendPage } from '../stories/spend/SpendPage';
import { SavePage } from '../stories/save/SavePage';
import { CreditPage } from '../stories/credit/CreditPage';
import { PlanPage } from '../stories/plan/PlanPage';
import { TogetherPage } from '../stories/together/TogetherPage';
import { DemoSwitcher } from './DemoSwitcher';

const UNIT_DEFAULTS: Record<string, 'light' | 'dark'> = {
  spend: 'dark',
  save: 'light',
  credit: 'light',
  plan: 'dark',
  together: 'light',
};

function getUnitFromPath(pathname: string): string {
  const segment = pathname.split('/')[1];
  return segment && segment in UNIT_DEFAULTS ? segment : 'spend';
}

function getStoredTheme(unit: string): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(`futra-theme-${unit}`);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable
  }
  return UNIT_DEFAULTS[unit] ?? 'dark';
}

export function AppShell() {
  const location = useLocation();
  const unit = getUnitFromPath(location.pathname);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    getStoredTheme(unit),
  );

  // Sync <html> attributes whenever unit or theme changes
  useEffect(() => {
    setTheme(getStoredTheme(unit));
  }, [unit]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-business-unit', unit);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [unit, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(`futra-theme-${unit}`, next);
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, [unit]);

  return (
    <>
      <DemoSwitcher unit={unit} theme={theme} onToggleTheme={toggleTheme} />
      <div style={{ '--nav-top': '36px' } as React.CSSProperties}>
        <Routes>
          <Route path="/spend" element={<SpendPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/credit" element={<CreditPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/together" element={<TogetherPage />} />
          <Route path="/" element={<Navigate to="/spend" replace />} />
        </Routes>
      </div>
    </>
  );
}
