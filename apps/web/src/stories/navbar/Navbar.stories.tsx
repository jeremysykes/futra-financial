import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { Navbar } from './Navbar';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { iframeHeight: 100 },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    unitName: {
      control: { type: 'select' },
      options: ['spend', 'save', 'credit', 'plan', 'together'],
      table: { category: 'Content' },
    },
    links: {
      control: { type: 'object' },
      table: { category: 'Content' },
    },
    ctaText: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay({ containFixed: true, height: 100 })],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = {
  args: {
    unitName: 'spend',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#security' },
      { label: 'Pricing', href: '#pricing' },
    ],
    ctaText: 'Get Started',
  },
  globals: { businessUnit: 'spend' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify navigation links render
    expect(canvas.getAllByText('Features')).not.toHaveLength(0);
    expect(canvas.getAllByText('Security')).not.toHaveLength(0);
    expect(canvas.getAllByText('Pricing')).not.toHaveLength(0);

    // Verify CTA button renders
    expect(canvas.getAllByText('Get Started')).not.toHaveLength(0);

    // Verify mobile menu toggle exists
    const menuToggle = canvas.getByLabelText('Open menu');
    expect(menuToggle).toBeInTheDocument();

    // Click to open mobile menu
    await userEvent.click(menuToggle);
    const closeButton = canvas.getByLabelText('Close menu');
    expect(closeButton).toBeInTheDocument();

    // Close mobile menu
    await userEvent.click(closeButton);
    expect(canvas.getByLabelText('Open menu')).toBeInTheDocument();
  },
};

export const Save: Story = {
  args: {
    unitName: 'save',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Goals', href: '#goals' },
    ],
    ctaText: 'Start Saving',
  },
  globals: { businessUnit: 'save' },
};

export const Credit: Story = {
  args: {
    unitName: 'credit',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' },
    ],
    ctaText: 'Check Your Score',
  },
  globals: { businessUnit: 'credit' },
};

export const Plan: Story = {
  args: {
    unitName: 'plan',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Compare', href: '#compare' },
      { label: 'Pricing', href: '#pricing' },
    ],
    ctaText: 'Start Planning',
  },
  globals: { businessUnit: 'plan' },
};

export const Together: Story = {
  args: {
    unitName: 'together',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    ctaText: 'Get Started',
  },
  globals: { businessUnit: 'together' },
};
