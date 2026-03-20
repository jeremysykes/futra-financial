import type { Meta, StoryObj } from '@storybook/react-vite';
import { SavePage } from '../../components/save/SavePage';

const meta = {
  title: 'Pages/Futra Save',
  component: SavePage,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    businessUnit: 'save',
  },
} satisfies Meta<typeof SavePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
