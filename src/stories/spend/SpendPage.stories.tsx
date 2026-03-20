import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpendPage } from '../../components/spend/SpendPage';

const meta = {
  title: 'Pages/Futra Spend',
  component: SpendPage,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    businessUnit: 'spend',
  },
} satisfies Meta<typeof SpendPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
