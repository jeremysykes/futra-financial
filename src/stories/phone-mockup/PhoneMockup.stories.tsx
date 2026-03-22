import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneMockup } from './PhoneMockup';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/PhoneMockup',
  component: PhoneMockup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof PhoneMockup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'spend' },
};
