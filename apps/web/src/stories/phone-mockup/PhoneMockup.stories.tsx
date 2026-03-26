import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { PhoneMockup } from './PhoneMockup';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/PhoneMockup',
  component: PhoneMockup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof PhoneMockup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'spend' },
  play: async ({ canvasElement }) => {
    // Verify the phone mockup renders its container
    expect(canvasElement.querySelector('[class*="rounded"]')).toBeInTheDocument();
  },
};
