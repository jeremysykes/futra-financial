import type { Meta, StoryObj } from '@storybook/react-vite';
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
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SaveFooterContent = () => (
  <>
    <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
      <Logo unitName="save" mode="dark" className="text-[#F7F5F0]" />
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
    children: <SaveFooterContent />,
  },
  globals: { businessUnit: 'save' },
};

export const Simple: Story = {
  args: {
    layout: 'simple',
    children: (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo unitName="spend" mode="dark" className="text-[#FFFFFF]" />
        <span className="font-sans text-xs text-[#9A9A90]">
          &copy; 2026 Futra Financial, Inc. All rights reserved.
        </span>
      </div>
    ),
  },
  globals: { businessUnit: 'spend' },
};
