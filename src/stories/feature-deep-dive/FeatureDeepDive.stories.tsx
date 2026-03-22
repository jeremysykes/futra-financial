import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureDeepDive } from './FeatureDeepDive';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/FeatureDeepDive',
  component: FeatureDeepDive,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof FeatureDeepDive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'plan' },
};
