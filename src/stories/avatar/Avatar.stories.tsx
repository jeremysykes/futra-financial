import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    alt: 'Alex',
  },
};

export const WithInitials: Story = {
  args: {
    alt: 'Jordan',
    initials: 'JS',
  },
};

export const FallbackInitial: Story = {
  args: {
    alt: 'Morgan',
  },
};

export const AccentRing: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    alt: 'Alex',
    ring: 'accent',
  },
};

export const PrimaryRing: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    alt: 'Jordan',
    ring: 'primary',
  },
};

export const Small: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    alt: 'Alex',
    size: 'sm',
    ring: 'accent',
  },
};

export const Large: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    alt: 'Alex',
    size: 'lg',
    ring: 'accent',
  },
};

export const AllSizes: StoryObj<typeof Avatar> = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 3, gap: '1.5rem' })],
  render: () => (
    <>
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Alex"
        size="sm"
        ring="accent"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Alex"
        size="md"
        ring="accent"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Alex"
        size="lg"
        ring="accent"
      />
    </>
  ),
};

export const AllRings: StoryObj<typeof Avatar> = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 3, gap: '1.5rem' })],
  render: () => (
    <>
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Alex"
        ring="none"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Alex"
        ring="accent"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face"
        alt="Alex"
        ring="primary"
      />
    </>
  ),
};
