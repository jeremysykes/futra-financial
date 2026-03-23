// src/stories/foundation/token-grid/useResolvedTokens.ts

import { useEffect, useRef, useState } from 'react';
import type { BusinessUnit } from './parseCssSource';
import { BUSINESS_UNITS } from './parseCssSource';
import type { TokenInfo } from './tokenDiscovery';
import { discoverTokens } from './tokenDiscovery';

export type ResolvedTokens = Record<
  string, // CSS variable name
  Record<BusinessUnit, { light: string; dark: string }>
>;

export type UseResolvedTokensResult = {
  tokens: TokenInfo[];
  resolved: ResolvedTokens;
  loading: boolean;
};

export function useResolvedTokens(): UseResolvedTokensResult {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [resolved, setResolved] = useState<ResolvedTokens>({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Discover tokens from stylesheets
    const discoveredTokens = discoverTokens();
    setTokens(discoveredTokens);

    if (discoveredTokens.length === 0) {
      setLoading(false);
      return;
    }

    // 2. Create hidden resolver container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';
    container.style.width = '0';
    container.style.height = '0';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    containerRef.current = container;

    // 3. Create 10 resolver divs: 5 BUs × 2 modes
    const resolverMap: Record<string, HTMLElement> = {};

    for (const bu of BUSINESS_UNITS) {
      for (const mode of ['light', 'dark'] as const) {
        const key = `${bu}-${mode}`;

        // Outer wrapper — applies .dark class for dark mode
        const wrapper = document.createElement('div');
        if (mode === 'dark') {
          wrapper.classList.add('dark');
        }

        // Inner div — carries the data-business-unit attribute
        const inner = document.createElement('div');
        inner.setAttribute('data-business-unit', bu);

        // Also add .dark to inner for compound selectors like [data-business-unit].dark
        if (mode === 'dark') {
          inner.classList.add('dark');
        }

        wrapper.appendChild(inner);
        container.appendChild(wrapper);
        resolverMap[key] = inner;
      }
    }

    // 4. Wait one frame for styles to apply, then resolve
    requestAnimationFrame(() => {
      const result: ResolvedTokens = {};

      for (const token of discoveredTokens) {
        result[token.cssVar] = {} as Record<BusinessUnit, { light: string; dark: string }>;

        for (const bu of BUSINESS_UNITS) {
          const lightEl = resolverMap[`${bu}-light`];
          const darkEl = resolverMap[`${bu}-dark`];

          const lightVal = getComputedStyle(lightEl)
            .getPropertyValue(token.cssVar)
            .trim() || '—';
          const darkVal = getComputedStyle(darkEl)
            .getPropertyValue(token.cssVar)
            .trim() || '—';

          result[token.cssVar][bu] = { light: lightVal, dark: darkVal };
        }
      }

      // 5. Store results and clean up
      setResolved(result);
      setLoading(false);
      container.remove();
      containerRef.current = null;
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.remove();
      }
    };
  }, []);

  return { tokens, resolved, loading };
}
