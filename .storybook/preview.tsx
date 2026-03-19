import type { Preview } from '@storybook/react-vite';
// @ts-expect-error css side-effect import
import '../src/tailwind.css';

const preview: Preview = {
  parameters: {
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
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ]
      },
      dynamicTitle: true,
    },
    businessUnit: {
      description: 'Business Unit',
      toolbar: {
        title: 'Business Unit',
        icon: 'component',
        items: [
          { value: 'none', title: 'None' },
          { value: 'unit-a', title: 'Unit A' },
          { value: 'unit-b', title: 'Unit B' },
          { value: 'unit-c', title: 'Unit C' },
        ]
      },
      dynamicTitle: true,
    },
  },
  initialGlobals: {
    theme: 'light',
    businessUnit: 'none',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const businessUnit = context.globals.businessUnit;
      return (
        <div className={theme === 'dark' ? 'dark' : ''} {...(businessUnit !== 'none' && { 'data-business-unit': businessUnit })}>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </div>
      )
    },
  ],
};

export default preview;
