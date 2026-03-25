import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { DashboardPreview } from './DashboardPreview';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/DashboardPreview',
  component: DashboardPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Dashboard size variant controlling text scale',
      control: { type: 'inline-radio' },
      options: ['default', 'compact'],
      table: { category: 'Layout' },
    },
    className: {
      description: 'Additional CSS classes for the dashboard container',
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay({ maxWidth: 500 })],
} satisfies Meta<typeof DashboardPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
  },
  globals: { businessUnit: 'plan' },
  play: async ({ canvasElement }) => {
    // Verify the dashboard renders its container
    expect(canvasElement.querySelector('[class*="rounded"]')).toBeInTheDocument();
  },
};
