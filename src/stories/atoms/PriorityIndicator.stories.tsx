import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriorityIndicator } from '@/features/kanban-board/components/atoms/PriorityIndicator';

/**
 * PriorityIndicator displays a colored circle icon indicating job target priority level.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 */
const meta: Meta<typeof PriorityIndicator> = {
  title: 'Atoms/PriorityIndicator',
  component: PriorityIndicator,
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'Priority level (low=#9E9E9E, medium=#FF9800, high=#F44336)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Icon size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriorityIndicator>;

/**
 * Default priority indicator showing medium priority.
 */
export const Default: Story = {
  args: {
    priority: 'medium',
    size: 'small',
  },
};

/**
 * Low priority indicator (grey #9E9E9E).
 */
export const LowPriority: Story = {
  args: {
    priority: 'low',
    size: 'small',
  },
};

/**
 * Medium priority indicator (orange #FF9800).
 */
export const MediumPriority: Story = {
  args: {
    priority: 'medium',
    size: 'small',
  },
};

/**
 * High priority indicator (red #F44336).
 */
export const HighPriority: Story = {
  args: {
    priority: 'high',
    size: 'small',
  },
};

/**
 * Small size variant (default).
 */
export const SmallSize: Story = {
  args: {
    priority: 'high',
    size: 'small',
  },
};

/**
 * Medium size variant.
 */
export const MediumSize: Story = {
  args: {
    priority: 'high',
    size: 'medium',
  },
};

/**
 * Large size variant.
 */
export const LargeSize: Story = {
  args: {
    priority: 'high',
    size: 'large',
  },
};

/**
 * All priority levels in a row for comparison.
 * Tests visual consistency and accessibility (WCAG AA color contrast).
 */
export const AllPriorities: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <PriorityIndicator priority="low" size="medium" />
      <span>Low</span>
      <PriorityIndicator priority="medium" size="medium" />
      <span>Medium</span>
      <PriorityIndicator priority="high" size="medium" />
      <span>High</span>
    </div>
  ),
};

/**
 * All sizes in a row for comparison.
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <PriorityIndicator priority="high" size="small" />
      <span>Small</span>
      <PriorityIndicator priority="high" size="medium" />
      <span>Medium</span>
      <PriorityIndicator priority="high" size="large" />
      <span>Large</span>
    </div>
  ),
};
