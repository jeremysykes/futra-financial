/**
 * Reads design token CSS custom properties for use in Recharts
 * components, which require resolved color values rather than
 * CSS variable references.
 */
export function useChartColors() {
  const style =
    typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement)
      : null;
  const get = (name: string, fallback: string) =>
    style?.getPropertyValue(name).trim() || fallback;
  return {
    accent: get('--color-accent', '#6C6FE4'),
    positive: get('--color-positive', '#2ABFA3'),
    caution: get('--color-caution', '#E8A838'),
    mutedFg: get('--color-muted-foreground', '#64748B'),
  };
}
