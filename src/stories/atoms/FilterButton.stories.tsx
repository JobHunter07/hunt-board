import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterButton } from '@/features/kanban-board/components/atoms/FilterButton';
import { action } from 'storybook/actions';
import { Box } from '@mui/material';

/**
 * FilterButton triggers the filter menu for job targets.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Inactive, Active, Disabled, Edge cases
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 * 
 * **User Story 4 (Search and Filter)**:
 * - Badge showing active filter count
 * - Primary color when filters active
 * - Accessible label with filter count
 */
const meta: Meta<typeof FilterButton> = {
  title: 'Atoms/FilterButton',
  component: FilterButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Click handler to open filter menu',
    },
    activeFilterCount: {
      control: 'number',
      description: 'Number of active filters (shows in badge)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    onClick: action('filter-clicked'),
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

/**
 * Default inactive state (no filters active).
 */
export const Default: Story = {
  args: {
    activeFilterCount: 0,
    disabled: false,
  },
};

/**
 * Inactive state (same as default, zero filters).
 */
export const Inactive: Story = {
  args: {
    activeFilterCount: 0,
    disabled: false,
  },
};

/**
 * Active with 0 filters (edge case, should look inactive).
 */
export const ActiveWithZeroFilters: Story = {
  args: {
    activeFilterCount: 0,
    disabled: false,
  },
};

/**
 * Active with 3 filters (badge visible).
 */
export const ActiveWithThreeFilters: Story = {
  args: {
    activeFilterCount: 3,
    disabled: false,
  },
};

/**
 * Active with 1 filter.
 */
export const ActiveWithOneFilter: Story = {
  args: {
    activeFilterCount: 1,
    disabled: false,
  },
};

/**
 * Active with many filters (tests badge with larger numbers).
 */
export const ActiveWithManyFilters: Story = {
  args: {
    activeFilterCount: 12,
    disabled: false,
  },
};

/**
 * Disabled state (cannot be clicked).
 */
export const Disabled: Story = {
  args: {
    activeFilterCount: 0,
    disabled: true,
  },
};

/**
 * Disabled with active filters (edge case).
 */
export const DisabledWithActiveFilters: Story = {
  args: {
    activeFilterCount: 5,
    disabled: true,
  },
};

/**
 * Mobile size (same component, just viewport change).
 */
export const MobileSize: Story = {
  args: {
    activeFilterCount: 2,
    disabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Hover state (manual interaction required).
 */
export const HoverState: Story = {
  args: {
    activeFilterCount: 1,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover over the button to see hover state styling.',
      },
    },
  },
};
