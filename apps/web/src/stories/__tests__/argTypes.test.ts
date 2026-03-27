import { describe, it, expect } from 'vitest';

// Story meta imports (default exports)
import AccordionMeta, * as AccordionStories from '../accordion/Accordion.stories';
import AccordionItemMeta, * as AccordionItemStories from '../accordion-item/AccordionItem.stories';
import AvatarMeta, * as AvatarStories from '../avatar/Avatar.stories';
import BadgeMeta, * as BadgeStories from '../badge/Badge.stories';
import ButtonMeta, * as ButtonStories from '../button/Button.stories';
import CardMeta, * as CardStories from '../card/Card.stories';
import ComparisonSectionMeta from '../comparison-section/ComparisonSection.stories';
import CTASectionMeta, * as CTASectionStories from '../cta-section/CTASection.stories';
import DashboardPreviewMeta, * as DashboardPreviewStories from '../dashboard-preview/DashboardPreview.stories';
import FAQSectionMeta, * as FAQSectionStories from '../faq-section/FAQSection.stories';
import FeatureDeepDiveMeta, * as FeatureDeepDiveStories from '../feature-deep-dive/FeatureDeepDive.stories';
import FeatureSectionMeta, * as FeatureSectionStories from '../feature-section/FeatureSection.stories';
import FocalImageMeta, * as FocalImageStories from '../focal-image/FocalImage.stories';
import FooterMeta, * as FooterStories from '../footer/Footer.stories';
import HeroSectionMeta, * as HeroSectionStories from '../hero-section/HeroSection.stories';
import HowItWorksMeta, * as HowItWorksStories from '../how-it-works/HowItWorks.stories';
import LogoMeta, * as LogoStories from '../logo/Logo.stories';
import NavbarMeta, * as NavbarStories from '../navbar/Navbar.stories';
import NavLinkMeta, * as NavLinkStories from '../nav-link/NavLink.stories';
import PhoneMockupMeta from '../phone-mockup/PhoneMockup.stories';
import ProcessStepsMeta, * as ProcessStepsStories from '../process-steps/ProcessSteps.stories';
import ProgressCardMeta, * as ProgressCardStories from '../progress-card/ProgressCard.stories';
import ScoreDisplayMeta, * as ScoreDisplayStories from '../score-display/ScoreDisplay.stories';
import SplitDisplayMeta, * as SplitDisplayStories from '../split-display/SplitDisplay.stories';
import StatItemMeta, * as StatItemStories from '../stat-item/StatItem.stories';
import StatsRowMeta, * as StatsRowStories from '../stats-row/StatsRow.stories';
import TestimonialSectionMeta, * as TestimonialSectionStories from '../testimonial-section/TestimonialSection.stories';
import TrustSectionMeta, * as TrustSectionStories from '../trust-section/TrustSection.stories';

const VALID_CATEGORIES = ['Appearance', 'Layout', 'Content', 'Behavior'];

interface ArgTypeConfig {
  description?: string;
  control?: string | { type?: string };
  options?: unknown[];
  table?: { disable?: boolean; category?: string };
}

interface StoryMeta {
  argTypes?: Record<string, ArgTypeConfig>;
  args?: Record<string, unknown>;
}

interface Story {
  args?: Record<string, unknown>;
}

interface StoryModule {
  default?: unknown;
  __esModule?: boolean;
  [key: string]: unknown;
}

interface ComponentEntry {
  name: string;
  meta: StoryMeta;
  firstStory: Story | undefined;
  variantKeys: string[];
  jsxProps: string[];
}

function getFirstStory(stories: StoryModule): Story | undefined {
  const storyKeys = Object.keys(stories).filter(
    (k) => k !== 'default' && k !== '__esModule',
  );
  return storyKeys.length > 0 ? (stories[storyKeys[0]] as Story) : undefined;
}

const components: ComponentEntry[] = [
  {
    name: 'Accordion',
    meta: AccordionMeta,
    firstStory: getFirstStory(AccordionStories),
    variantKeys: ['spacing'],
    jsxProps: [],
  },
  {
    name: 'AccordionItem',
    meta: AccordionItemMeta,
    firstStory: getFirstStory(AccordionItemStories),
    variantKeys: [],
    jsxProps: ['trigger', 'children'],
  },
  {
    name: 'Avatar',
    meta: AvatarMeta,
    firstStory: getFirstStory(AvatarStories),
    variantKeys: ['size', 'ring'],
    jsxProps: [],
  },
  {
    name: 'Badge',
    meta: BadgeMeta,
    firstStory: getFirstStory(BadgeStories),
    variantKeys: ['shape', 'size', 'content'],
    jsxProps: ['children'],
  },
  {
    name: 'Button',
    meta: ButtonMeta,
    firstStory: getFirstStory(ButtonStories),
    variantKeys: ['variant', 'size'],
    jsxProps: ['children'],
  },
  {
    name: 'Card',
    meta: CardMeta,
    firstStory: getFirstStory(CardStories),
    variantKeys: ['variant', 'interactive'],
    jsxProps: ['children'],
  },
  {
    name: 'ComparisonSection',
    meta: ComparisonSectionMeta,
    firstStory: undefined,
    variantKeys: [],
    jsxProps: [],
  },
  {
    name: 'CTASection',
    meta: CTASectionMeta,
    firstStory: getFirstStory(CTASectionStories),
    variantKeys: ['background', 'alignment'],
    jsxProps: ['children'],
  },
  {
    name: 'DashboardPreview',
    meta: DashboardPreviewMeta,
    firstStory: getFirstStory(DashboardPreviewStories),
    variantKeys: ['size'],
    jsxProps: [],
  },
  {
    name: 'FAQSection',
    meta: FAQSectionMeta,
    firstStory: getFirstStory(FAQSectionStories),
    variantKeys: ['padding'],
    jsxProps: [],
  },
  {
    name: 'FeatureDeepDive',
    meta: FeatureDeepDiveMeta,
    firstStory: getFirstStory(FeatureDeepDiveStories),
    variantKeys: ['padding'],
    jsxProps: [],
  },
  {
    name: 'FeatureSection',
    meta: FeatureSectionMeta,
    firstStory: getFirstStory(FeatureSectionStories),
    variantKeys: ['background', 'padding'],
    jsxProps: ['children'],
  },
  {
    name: 'FocalImage',
    meta: FocalImageMeta,
    firstStory: getFirstStory(FocalImageStories),
    variantKeys: [],
    jsxProps: [],
  },
  {
    name: 'Footer',
    meta: FooterMeta,
    firstStory: getFirstStory(FooterStories),
    variantKeys: ['layout'],
    jsxProps: ['children'],
  },
  {
    name: 'HeroSection',
    meta: HeroSectionMeta,
    firstStory: getFirstStory(HeroSectionStories),
    variantKeys: ['layout', 'size'],
    jsxProps: ['actions', 'children'],
  },
  {
    name: 'HowItWorks',
    meta: HowItWorksMeta,
    firstStory: getFirstStory(HowItWorksStories),
    variantKeys: ['background', 'padding'],
    jsxProps: ['children'],
  },
  {
    name: 'Logo',
    meta: LogoMeta,
    firstStory: getFirstStory(LogoStories),
    variantKeys: ['variant'],
    jsxProps: [],
  },
  {
    name: 'Navbar',
    meta: NavbarMeta,
    firstStory: getFirstStory(NavbarStories),
    variantKeys: [],
    jsxProps: [],
  },
  {
    name: 'NavLink',
    meta: NavLinkMeta,
    firstStory: getFirstStory(NavLinkStories),
    variantKeys: ['size'],
    jsxProps: ['children'],
  },
  {
    name: 'PhoneMockup',
    meta: PhoneMockupMeta,
    firstStory: undefined,
    variantKeys: [],
    jsxProps: [],
  },
  {
    name: 'ProcessSteps',
    meta: ProcessStepsMeta,
    firstStory: getFirstStory(ProcessStepsStories),
    variantKeys: ['size', 'connector', 'badgeShape'],
    jsxProps: ['steps'],
  },
  {
    name: 'ProgressCard',
    meta: ProgressCardMeta,
    firstStory: getFirstStory(ProgressCardStories),
    variantKeys: ['size'],
    jsxProps: [],
  },
  {
    name: 'ScoreDisplay',
    meta: ScoreDisplayMeta,
    firstStory: getFirstStory(ScoreDisplayStories),
    variantKeys: [],
    jsxProps: [],
  },
  {
    name: 'SplitDisplay',
    meta: SplitDisplayMeta,
    firstStory: getFirstStory(SplitDisplayStories),
    variantKeys: ['size'],
    jsxProps: ['splits'],
  },
  {
    name: 'StatItem',
    meta: StatItemMeta,
    firstStory: getFirstStory(StatItemStories),
    variantKeys: ['valueColor'],
    jsxProps: [],
  },
  {
    name: 'StatsRow',
    meta: StatsRowMeta,
    firstStory: getFirstStory(StatsRowStories),
    variantKeys: ['columns', 'background'],
    jsxProps: ['children'],
  },
  {
    name: 'TestimonialSection',
    meta: TestimonialSectionMeta,
    firstStory: getFirstStory(TestimonialSectionStories),
    variantKeys: ['columns'],
    jsxProps: ['children'],
  },
  {
    name: 'TrustSection',
    meta: TrustSectionMeta,
    firstStory: getFirstStory(TrustSectionStories),
    variantKeys: ['background', 'padding'],
    jsxProps: ['children'],
  },
];

function getArgTypes(meta: StoryMeta): Record<string, ArgTypeConfig> {
  return meta.argTypes ?? {};
}

function getVisibleArgTypes(meta: StoryMeta): [string, ArgTypeConfig][] {
  const argTypes = getArgTypes(meta);
  return Object.entries(argTypes).filter(
    ([, config]) => !config?.table?.disable,
  );
}

function getControlType(config: ArgTypeConfig): string | undefined {
  if (typeof config.control === 'string') return config.control;
  if (typeof config.control === 'object') return config.control?.type;
  return undefined;
}

describe.each(components)('$name argTypes', (entry) => {
  const { meta, variantKeys, jsxProps } = entry;
  const argTypes = getArgTypes(meta);

  it('has argTypes defined', () => {
    expect(argTypes).toBeDefined();
    expect(typeof argTypes).toBe('object');
  });

  it('every visible argType has a valid category', () => {
    const visible = getVisibleArgTypes(meta);
    const invalid = visible.filter(
      ([, config]) => !config?.table?.category || !VALID_CATEGORIES.includes(config.table.category),
    );
    expect(
      invalid.map(([name]) => `${name}: ${invalid.find(([n]) => n === name)?.[1]?.table?.category ?? 'none'}`),
      `categories must be one of: ${VALID_CATEGORIES.join(', ')}`,
    ).toEqual([]);
  });

  it('every visible argType has a control type', () => {
    const visible = getVisibleArgTypes(meta);
    const missing = visible.filter(
      ([, config]) => !getControlType(config),
    );
    expect(
      missing.map(([name]) => name),
      'argTypes missing control type',
    ).toEqual([]);
  });

  it('inline-radio and select controls have options', () => {
    const visible = getVisibleArgTypes(meta);
    const needsOptions = visible.filter(([, config]) => {
      const controlType = getControlType(config);
      return controlType === 'inline-radio' || controlType === 'select';
    });
    const missing = needsOptions.filter(
      ([, config]) => !Array.isArray(config.options) || config.options.length === 0,
    );
    expect(
      missing.map(([name]) => name),
      'radio/select controls missing options',
    ).toEqual([]);
  });

  if (variantKeys.length > 0) {
    it('CVA variant keys are covered by argTypes', () => {
      const argTypeKeys = Object.keys(argTypes);
      const missing = variantKeys.filter((key) => !argTypeKeys.includes(key));
      expect(
        missing,
        'CVA variants not in argTypes',
      ).toEqual([]);
    });
  }

  if (entry.firstStory) {
    it('first story has default args for radio/select controls', () => {
      const visible = getVisibleArgTypes(meta);
      const selectableProps = visible
        .filter(([, config]) => {
          const controlType = getControlType(config);
          return controlType === 'inline-radio' || controlType === 'select';
        })
        .map(([name]) => name);

      if (selectableProps.length === 0) return;

      const storyArgs = entry.firstStory?.args ?? {};
      const metaArgs = meta.args ?? {};
      const mergedArgs = { ...metaArgs, ...storyArgs };

      const missing = selectableProps.filter(
        (prop) => mergedArgs[prop] === undefined,
      );
      expect(
        missing,
        'radio/select controls without default value in first story',
      ).toEqual([]);
    });
  }

  if (jsxProps.length > 0) {
    it('JSX props are hidden from controls', () => {
      const notHidden = jsxProps.filter((prop) => {
        const config = argTypes[prop];
        return !config?.table?.disable;
      });
      expect(
        notHidden,
        'JSX props should have table.disable: true',
      ).toEqual([]);
    });
  }
});
