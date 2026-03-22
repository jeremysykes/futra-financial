// withStoryDisplay.tsx
//
// Single decorator for all component display presentation in Storybook.
// Handles padding, token-derived background, layout modes (single/grid),
// fixed-position containment, and max-width constraints.
//
// All visual properties derive from Tailwind CSS variable tokens.
// No hardcoded hex values. No rounded corners.
//
// Usage:
//   withStoryDisplay()                                     — standard padded display
//   withStoryDisplay({ maxWidth: 300 })                    — constrained width
//   withStoryDisplay({ containFixed: true, height: 100 })  — fixed-position containment
//   withStoryDisplay({ layout: 'grid', columns: 3 })       — variant grid

import type { ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';

export type StoryDisplayOptions = {
  /** Constrains the component's max width in pixels. */
  maxWidth?: number;

  /** Enables fixed-position containment (e.g., Navbar). */
  containFixed?: boolean;

  /** Height of the containment area in pixels. Only applies when containFixed is true. */
  height?: number;

  /** Switches to grid layout for variant showcases. Defaults to 'single'. */
  layout?: 'single' | 'grid';

  /** Number of grid columns. Only applies when layout is 'grid'. */
  columns?: number;

  /** Grid gap. Only applies when layout is 'grid'. Defaults to '1rem'. */
  gap?: string;
};

export function withStoryDisplay(
  options: StoryDisplayOptions = {},
): DecoratorFunction<ReactRenderer> {
  const {
    maxWidth,
    containFixed = false,
    height,
    layout = 'single',
    columns,
    gap = '1rem',
  } = options;

  return (Story) => {
    const style: React.CSSProperties = {};

    if (maxWidth) {
      style.maxWidth = `${maxWidth}px`;
    }

    if (containFixed) {
      style.position = 'relative';
      style.overflow = 'hidden';
      style.transform = 'translateZ(0)';
      if (height) {
        style.height = `${height}px`;
      }
    }

    if (layout === 'grid') {
      style.display = 'grid';
      style.gridTemplateColumns = columns ? `repeat(${columns}, 1fr)` : undefined;
      style.gap = gap;
    }

    return (
      <div className="bg-background p-8" style={style}>
        <Story />
      </div>
    );
  };
}
