import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FeatureDeepDive } from './FeatureDeepDive';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/FeatureDeepDive',
  component: FeatureDeepDive,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'inline-radio',
      options: ['default', 'compact'],
      table: { category: 'Layout' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof FeatureDeepDive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'default',
  },
  globals: { businessUnit: 'plan' },
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelector('section, div')).toBeInTheDocument();
  },
};
