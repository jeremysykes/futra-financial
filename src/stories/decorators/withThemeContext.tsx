// withThemeContext.tsx
//
// Global Storybook decorator: theme and business unit switching.
// Reads `theme` and `businessUnit` globals from the Storybook toolbar,
// applies the `.dark` class, `data-business-unit` attribute, and
// `bg-background text-foreground` base classes.
//
// Registered as a global decorator in .storybook/preview.tsx.
// This is the outermost decorator — all other decorators nest inside it.

import type { ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';

export const withThemeContext: DecoratorFunction<ReactRenderer> = (
  Story,
  context,
) => {
  const theme = context.globals.theme;
  const businessUnit = context.globals.businessUnit;
  return (
    <div
      className={`${theme === 'dark' ? 'dark' : ''} bg-background text-foreground`}
      data-business-unit={businessUnit}
    >
      <Story />
    </div>
  );
};
