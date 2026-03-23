import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardPreview } from './DashboardPreview';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/DashboardPreview',
  component: DashboardPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay({ maxWidth: 500 })],
} satisfies Meta<typeof DashboardPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'plan' },
};
