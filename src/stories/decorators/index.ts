// index.ts
//
// Barrel export for all Storybook decorators.
// This is the only import path — stories must import from here.
//
// Every decorator in the design system is defined, documented,
// and exported from this directory. No outliers.

export { withThemeContext } from './withThemeContext.tsx';
export { withStoryDisplay } from './withStoryDisplay.tsx';
export type { StoryDisplayOptions } from './withStoryDisplay.tsx';
