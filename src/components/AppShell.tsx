import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { SpendPage } from './spend/SpendPage';
import { SavePage } from './save/SavePage';
import { CreditPage } from './credit/CreditPage';
import { PlanPage } from './plan/PlanPage';
import { DemoSwitcher } from './DemoSwitcher';

const UNIT_DEFAULTS: Record<string, 'light' | 'dark'> = {
  spend: 'dark',
  save: 'light',
  credit: 'light',
  plan: 'dark',
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme(unit));

  useEffect(() => {
    setTheme(getStoredTheme(unit));
  }, [unit]);

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
      <div
        className={`${theme === 'dark' ? 'dark' : ''}`}
        data-business-unit={unit}
      >
        <Routes>
          <Route path="/spend" element={<SpendPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/credit" element={<CreditPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/" element={<Navigate to="/spend" replace />} />
        </Routes>
      </div>
    </>
  );
}
