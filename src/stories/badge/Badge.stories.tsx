import type { Meta, StoryObj } from '@storybook/react-vite';
import { Target, Star, Zap } from 'lucide-react';
import { Badge } from './Badge';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Target size={24} className="text-accent" />,
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    children: <Star size={24} className="text-accent" />,
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    children: <Zap size={24} className="text-accent" />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: <Target size={18} className="text-accent" />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: <Target size={28} className="text-accent" />,
  },
};

export const TextContent: Story = {
  args: {
    content: 'text',
    shape: 'circle',
    size: 'lg',
    children: <span className="text-accent text-xl">01</span>,
  },
};

export const ImageContent: Story = {
  args: {
    content: 'image',
    shape: 'circle',
    size: 'lg',
    children: (
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ),
  },
};

export const WithBorder: Story = {
  args: {
    shape: 'circle',
    className: 'border border-border bg-surface',
    children: <Target size={24} className="text-accent" />,
  },
};

export const AllShapes: Story = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 3, gap: '1.5rem' })],
  render: () => (
    <>
      <Badge shape="square"><Target size={24} className="text-accent" /></Badge>
      <Badge shape="rounded"><Target size={24} className="text-accent" /></Badge>
      <Badge shape="circle"><Target size={24} className="text-accent" /></Badge>
    </>
  ),
};

export const AllSizes: Story = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 3, gap: '1.5rem' })],
  render: () => (
    <>
      <Badge size="sm"><Target size={18} className="text-accent" /></Badge>
      <Badge size="md"><Target size={24} className="text-accent" /></Badge>
      <Badge size="lg"><Target size={28} className="text-accent" /></Badge>
    </>
  ),
};
