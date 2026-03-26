import type { Meta, StoryObj } from '@storybook/react-vite';
import { TogetherPage } from './TogetherPage';

const meta = {
  title: 'Pages/Futra Together',
  component: TogetherPage,
  parameters: { layout: 'fullscreen' },
  globals: { businessUnit: 'together' },
} satisfies Meta<typeof TogetherPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
