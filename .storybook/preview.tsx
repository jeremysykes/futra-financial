import type { Preview } from '@storybook/react-vite';
// @ts-expect-error css side-effect import
import '../src/tailwind.css';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Light or dark mode',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
      dynamicTitle: true,
    },
    businessUnit: {
      description: 'Business Unit',
      toolbar: {
        title: 'Business Unit',
        icon: 'component',
        items: [
          { value: 'spend', title: 'Futra Spend' },
          { value: 'save', title: 'Futra Save' },
          { value: 'credit', title: 'Futra Credit' },
          { value: 'plan', title: 'Futra Plan' },
          { value: 'together', title: 'Futra Together' },
        ],
      },
      dynamicTitle: true,
    },
  },
  initialGlobals: {
    theme: 'dark',
    businessUnit: 'spend',
  },
  decorators: [
    (Story, context) => {
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
    },
  ],
};

export default preview;
