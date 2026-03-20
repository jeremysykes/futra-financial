import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlanPage } from '../../components/plan/PlanPage';

const meta = {
  title: 'Pages/Futra Plan',
  component: PlanPage,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    businessUnit: 'plan',
  },
} satisfies Meta<typeof PlanPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
