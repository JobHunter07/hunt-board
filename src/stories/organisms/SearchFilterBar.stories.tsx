import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchFilterBar } from '@/features/kanban-board/components/organisms/SearchFilterBar';
import { action } from 'storybook/actions';
import { useState } from 'react';
import { Box } from '@mui/material';
import type { Priority } from '@/features/kanban-board/types';

/**
 * SearchFilterBar provides search and filter controls for job targets.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, No filters, Active filters, Menu open, Edge cases
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 * 
 * **User Story 4 (Search and Filter)**:
 * - Search field with debounce
 * - Filter button with active filter count badge
 * - Filter menu with Priority/Tags/Follow-Up checkboxes
 * - Clear all filters button
 * - Responsive: stacked mobile, horizontal desktop
 */
const meta: Meta<typeof SearchFilterBar> = {
  title: 'Organisms/SearchFilterBar',
  component: SearchFilterBar,
  tags: ['autodocs'],
  argTypes: {
    searchQuery: {
      control: 'text',
      description: 'Current search query',
    },
    onSearchChange: {
      action: 'search-changed',
      description: 'Callback when search changes',
    },
    selectedPriorities: {
      control: 'object',
      description: 'Array of selected priority filters',
    },
    onPrioritiesChange: {
      action: 'priorities-changed',
      description: 'Callback when priority filters change',
    },
    selectedTags: {
      control: 'object',
      description: 'Array of selected tag filters',
    },
    onTagsChange: {
      action: 'tags-changed',
      description: 'Callback when tag filters change',
    },
    hasFollowUp: {
      control: 'boolean',
      description: 'Follow-up filter toggle',
    },
    onFollowUpChange: {
      action: 'follow-up-changed',
      description: 'Callback when follow-up filter changes',
    },
    availableTags: {
      control: 'object',
      description: 'Array of available tags to filter by',
    },
    activeFilterCount: {
      control: 'number',
      description: 'Total number of active filters',
    },
    onClearAll: {
      action: 'clear-all',
      description: 'Callback to clear all filters',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, maxWidth: '800px' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchFilterBar>;

/**
 * WithAddTargetHandler — Add Target button wired to a storybook action.
 * Click the button to see the action logged in the Actions panel.
 */
export const WithAddTargetHandler: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: [] as Priority[],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: [],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent', 'referral-ready'],
    activeFilterCount: 0,
    onClearAll: action('clear-all'),
    onAddTarget: action('add-target-clicked'),
  },
};

/**
 * Default state with no filters active.
 */
export const Default: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: [],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: [],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent', 'referral-ready', 'stealth-role', 'high-priority'],
    activeFilterCount: 0,
    onClearAll: action('clear-all'),
  },
};

/**
 * No filters active (same as default).
 */
export const NoFiltersActive: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: [],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: [],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent'],
    activeFilterCount: 0,
    onClearAll: action('clear-all'),
  },
};

/**
 * Search active with query.
 */
export const SearchActive: Story = {
  args: {
    searchQuery: 'Google',
    onSearchChange: action('search-changed'),
    selectedPriorities: [],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: [],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent', 'referral-ready'],
    activeFilterCount: 0,
    onClearAll: action('clear-all'),
  },
};

/**
 * Filters active (priorities, tags, follow-up).
 */
export const FiltersActive: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: ['high', 'medium'] as Priority[],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: ['remote', 'urgent'],
    onTagsChange: action('tags-changed'),
    hasFollowUp: true,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent', 'referral-ready', 'stealth-role', 'high-priority'],
    activeFilterCount: 5,
    onClearAll: action('clear-all'),
  },
};

/**
 * Menu open (manual interaction required).
 * Note: Click the filter button to see the menu.
 */
export const MenuOpen: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: ['high'] as Priority[],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: ['remote'],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent', 'referral-ready'],
    activeFilterCount: 2,
    onClearAll: action('clear-all'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the filter button to open the menu with filter options.',
      },
    },
  },
};

/**
 * Mobile layout (stacked).
 */
export const MobileLayout: Story = {
  args: {
    searchQuery: 'Software',
    onSearchChange: action('search-changed'),
    selectedPriorities: ['high'] as Priority[],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: ['remote'],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent'],
    activeFilterCount: 2,
    onClearAll: action('clear-all'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Desktop layout (horizontal).
 */
export const DesktopLayout: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: [] as Priority[],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: [],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: ['remote', 'urgent', 'referral-ready', 'stealth-role'],
    activeFilterCount: 0,
    onClearAll: action('clear-all'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/**
 * No tags available (edge case).
 */
export const NoTagsAvailable: Story = {
  args: {
    searchQuery: '',
    onSearchChange: action('search-changed'),
    selectedPriorities: [] as Priority[],
    onPrioritiesChange: action('priorities-changed'),
    selectedTags: [],
    onTagsChange: action('tags-changed'),
    hasFollowUp: false,
    onFollowUpChange: action('follow-up-changed'),
    availableTags: [],
    activeFilterCount: 0,
    onClearAll: action('clear-all'),
  },
};

/**
 * Interactive example with full state management.
 */
export const Interactive: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [hasFollowUp, setHasFollowUp] = useState(false);

    const activeFilterCount =
      selectedPriorities.length + selectedTags.length + (hasFollowUp ? 1 : 0);

    const handleClearAll = () => {
      setSearchQuery('');
      setSelectedPriorities([]);
      setSelectedTags([]);
      setHasFollowUp(false);
      action('clear-all')();
    };

    return (
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          action('search-changed')(value);
        }}
        selectedPriorities={selectedPriorities}
        onPrioritiesChange={(priorities) => {
          setSelectedPriorities(priorities);
          action('priorities-changed')(priorities);
        }}
        selectedTags={selectedTags}
        onTagsChange={(tags) => {
          setSelectedTags(tags);
          action('tags-changed')(tags);
        }}
        hasFollowUp={hasFollowUp}
        onFollowUpChange={(value) => {
          setHasFollowUp(value);
          action('follow-up-changed')(value);
        }}
        availableTags={['remote', 'urgent', 'referral-ready', 'stealth-role', 'high-priority']}
        activeFilterCount={activeFilterCount}
        onClearAll={handleClearAll}
      />
    );
  },
};
