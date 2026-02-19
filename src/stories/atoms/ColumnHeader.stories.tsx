import type { Meta, StoryObj } from '@storybook/react';
import { ColumnHeader } from '@/features/kanban-board/components/atoms/ColumnHeader';

/**
 * ColumnHeader displays a column title with a count badge.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 */
const meta: Meta<typeof ColumnHeader> = {
  title: 'Atoms/ColumnHeader',
  component: ColumnHeader,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Column title text',
    },
    count: {
      control: 'number',
      description: 'Number of cards in column',
    },
    color: {
      control: 'color',
      description: 'Optional accent color for border and badge (default: #E0E0E0)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColumnHeader>;

/**
 * Default column header with medium count.
 */
export const Default: Story = {
  args: {
    title: 'Targets Identified',
    count: 5,
    color: '#B71C1C',
  },
};

/**
 * Column with zero count (empty state).
 */
export const ZeroCount: Story = {
  args: {
    title: 'Stalled / Cold',
    count: 0,
    color: '#757575',
  },
};

/**
 * Column with low count (1 card).
 */
export const LowCount: Story = {
  args: {
    title: 'Offer / Success',
    count: 1,
    color: '#2E7D32',
  },
};

/**
 * Column with high count (20+ cards).
 */
export const HighCount: Story = {
  args: {
    title: 'Follow-Up Required',
    count: 23,
    color: '#F57C00',
  },
};

/**
 * Column with very long title to test wrapping.
 */
export const LongTitle: Story = {
  args: {
    title: 'Very Long Column Title That Should Wrap Or Truncate Properly',
    count: 12,
    color: '#1976D2',
  },
};

/**
 * Column without custom color (uses default grey).
 */
export const DefaultColor: Story = {
  args: {
    title: 'Intel Gathering',
    count: 8,
    color: undefined,
  },
};

/**
 * Mobile size (responsive font size test).
 */
export const MobileSize: Story = {
  args: {
    title: 'Warm-Up Phase',
    count: 3,
    color: '#7B1FA2',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Desktop size (responsive font size test).
 */
export const DesktopSize: Story = {
  args: {
    title: 'Interview Pipeline',
    count: 7,
    color: '#0288D1',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/**
 * All column headers from the Hunt Board.
 * Tests visual consistency across all 9 columns.
 */
export const AllColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <ColumnHeader title="Targets Identified" count={12} color="#B71C1C" />
      <ColumnHeader title="Intel Gathering" count={8} color="#C62828" />
      <ColumnHeader title="Warm-Up Phase" count={6} color="#7B1FA2" />
      <ColumnHeader title="Outreach Initiated" count={10} color="#1976D2" />
      <ColumnHeader title="Follow-Up Required" count={15} color="#F57C00" />
      <ColumnHeader title="Conversation Started" count={5} color="#388E3C" />
      <ColumnHeader title="Interview Pipeline" count={9} color="#0288D1" />
      <ColumnHeader title="Stalled / Cold" count={3} color="#757575" />
      <ColumnHeader title="Offer / Success" count={2} color="#2E7D32" />
    </div>
  ),
};
