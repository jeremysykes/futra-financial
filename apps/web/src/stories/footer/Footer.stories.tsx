import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Footer } from './Footer';
import { Logo } from '../logo/Logo';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: ['columns', 'simple'],
      table: { category: 'Layout' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SaveFooterContent = () => (
  <>
    <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
      <Logo unitName="save" variant="dark" className="text-[#F7F5F0]" />
      <div className="grid grid-cols-3 gap-8 md:gap-16">
        {[
          { title: 'Product', links: ['Features', 'Goals', 'Round-Ups'] },
          { title: 'Company', links: ['About', 'Careers', 'Press'] },
          { title: 'Legal', links: ['Privacy', 'Terms'] },
        ].map((col) => (
          <div key={col.title}>
            <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#9A9A90]">
              {col.title}
            </span>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="block mb-3 font-sans text-sm text-[#9A9A90] transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="pt-8 border-t border-[rgba(154,154,144,0.2)]">
      <span className="font-sans text-xs text-[#9A9A90]">
        &copy; 2026 Futra Financial. All rights reserved.
      </span>
    </div>
  </>
);

export const Columns: Story = {
  args: {
    layout: 'columns',
    children: <SaveFooterContent />,
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify footer links render
    expect(canvas.getByText('Product')).toBeInTheDocument();
    expect(canvas.getByText('Company')).toBeInTheDocument();
    expect(canvas.getByText('Legal')).toBeInTheDocument();
    expect(canvas.getByText(/All rights reserved/)).toBeInTheDocument();

    // Verify footer links are clickable
    const links = canvas.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(8);
  },
};

export const Simple: Story = {
  args: {
    layout: 'simple',
    children: (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo unitName="spend" variant="dark" className="text-[#FFFFFF]" />
        <span className="font-sans text-xs text-[#9A9A90]">
          &copy; 2026 Futra Financial, Inc. All rights reserved.
        </span>
      </div>
    ),
  },
  globals: { businessUnit: 'spend' },
};
