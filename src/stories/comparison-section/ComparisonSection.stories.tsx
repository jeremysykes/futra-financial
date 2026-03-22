import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComparisonSection } from './ComparisonSection';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/ComparisonSection',
  component: ComparisonSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof ComparisonSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'plan' },
};
