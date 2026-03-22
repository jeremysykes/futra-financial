import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreditPage } from './CreditPage';

const meta = {
  title: 'Pages/Futra Credit',
  component: CreditPage,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    businessUnit: 'credit',
  },
} satisfies Meta<typeof CreditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
