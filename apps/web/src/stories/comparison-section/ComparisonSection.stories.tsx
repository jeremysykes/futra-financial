import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ComparisonSection } from './ComparisonSection';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/ComparisonSection',
  component: ComparisonSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof ComparisonSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'plan' },
  play: async ({ canvasElement }) => {
    // Verify the comparison section renders with content
    expect(canvasElement.querySelector('section, div')).toBeInTheDocument();
  },
};
