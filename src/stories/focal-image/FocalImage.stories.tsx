import type { Meta, StoryObj } from '@storybook/react-vite';
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
} satisfies Meta<typeof FocalImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 55,
    focusY: 38,
    className: 'w-full max-h-[200px] rounded-xl',
  },
  globals: { businessUnit: 'spend' },
};

export const FocusOnChip: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 32,
    focusY: 35,
    className: 'w-full max-h-[200px] rounded-xl',
  },
  globals: { businessUnit: 'spend' },
};

export const FocusOnDebit: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 75,
    focusY: 40,
    className: 'w-full max-h-[200px] rounded-xl',
  },
  globals: { businessUnit: 'spend' },
};

export const TallContainer: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 55,
    focusY: 38,
    className: 'w-full max-h-[400px] rounded-xl',
  },
  globals: { businessUnit: 'spend' },
};

export const NarrowContainer: Story = {
  args: {
    src: `${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`,
    alt: 'Contactless payment',
    focusX: 55,
    focusY: 38,
    className: 'w-[300px] h-[300px] rounded-xl',
  },
  globals: { businessUnit: 'spend' },
};
