import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FocalImage } from './FocalImage';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/FocalImage',
  component: FocalImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay({ maxWidth: 800 })],
  argTypes: {
    src: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    alt: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    focusX: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      table: { category: 'Layout' },
    },
    focusY: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      table: { category: 'Layout' },
    },
    className: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof FocalImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 55,
    focusY: 38,
  },
  render: (args) => (
    <div className="w-[700px] h-[200px] rounded-xl overflow-hidden">
      <FocalImage {...args} className="w-full h-full" />
    </div>
  ),
  globals: { businessUnit: 'spend' },
  play: async ({ canvasElement }) => {
    const img = canvasElement.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Contactless payment');
  },
};

export const FocusOnChip: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 32,
    focusY: 35,
  },
  render: (args) => (
    <div className="w-[700px] h-[200px] rounded-xl overflow-hidden">
      <FocalImage {...args} className="w-full h-full" />
    </div>
  ),
  globals: { businessUnit: 'spend' },
};

export const FocusOnDebit: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 75,
    focusY: 40,
  },
  render: (args) => (
    <div className="w-[700px] h-[200px] rounded-xl overflow-hidden">
      <FocalImage {...args} className="w-full h-full" />
    </div>
  ),
  globals: { businessUnit: 'spend' },
};

export const WideContainer: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 55,
    focusY: 38,
  },
  render: (args) => (
    <div className="w-[700px] h-[140px] rounded-xl overflow-hidden">
      <FocalImage {...args} className="w-full h-full" />
    </div>
  ),
  globals: { businessUnit: 'spend' },
};

export const NarrowContainer: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 55,
    focusY: 38,
  },
  render: (args) => (
    <div className="w-[300px] h-[300px] rounded-xl overflow-hidden">
      <FocalImage {...args} className="w-full h-full" />
    </div>
  ),
  globals: { businessUnit: 'spend' },
};
