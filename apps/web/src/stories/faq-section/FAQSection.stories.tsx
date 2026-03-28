import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { FAQSection } from './FAQSection';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/FAQSection',
  component: FAQSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'inline-radio',
      options: ['default', 'compact'],
      table: { category: 'Layout' },
    },
    eyebrow: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    heading: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    items: {
      control: { type: 'object' },
      table: { category: 'Content' },
    },
    backgroundImage: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    backgroundOpacity: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    sectionId: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof FAQSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'default',
    eyebrow: 'FAQ',
    heading: 'Common questions',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-CREDIT-03.png`,
    items: [
      {
        question: 'Is checking my score really free?',
        answer:
          'Yes, completely free. We never charge for credit score access. Our service is funded through personalized recommendations, not hidden fees.',
      },
      {
        question: 'Will this affect my credit score?',
        answer:
          'No. We use a soft inquiry to check your score, which has zero impact on your credit. You can check as often as you like without any effect.',
      },
      {
        question: 'How often is my score updated?',
        answer:
          'Your credit score is updated weekly. We pull the latest data every seven days so you always have a current picture of where you stand.',
      },
      {
        question: 'What credit bureau do you use?',
        answer:
          'We partner with TransUnion to provide your VantageScore 3.0 credit score. This is one of the most widely used scoring models by lenders.',
      },
      {
        question: 'How does the debt payoff planner work?',
        answer:
          'Enter your debts and we create a personalized payoff plan using either the avalanche or snowball method. We show you exactly how much interest you will save and when you will be debt-free.',
      },
    ],
  },
  globals: { businessUnit: 'credit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify heading and eyebrow
    expect(canvas.getByText('Common questions')).toBeInTheDocument();
    expect(canvas.getByText('FAQ')).toBeInTheDocument();

    // Verify all FAQ triggers render
    const triggers = canvas.getAllByRole('button');
    expect(triggers.length).toBeGreaterThanOrEqual(5);

    // Click first FAQ to expand
    const firstTrigger = canvas.getByText('Is checking my score really free?');
    await userEvent.click(firstTrigger);

    // Verify answer is visible
    expect(canvas.getByText(/completely free/i)).toBeInTheDocument();

    // Click second FAQ — first should collapse
    const secondTrigger = canvas.getByText('Will this affect my credit score?');
    await userEvent.click(secondTrigger);
    expect(canvas.getByText(/soft inquiry/i)).toBeInTheDocument();
  },
};

export const WithoutImage: Story = {
  args: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'How do I get started?',
        answer: 'Sign up for free and connect your accounts.',
      },
      {
        question: 'Is my data secure?',
        answer:
          'Yes, we use bank-level encryption to protect your information.',
      },
    ],
  },
  globals: { businessUnit: 'save' },
};
