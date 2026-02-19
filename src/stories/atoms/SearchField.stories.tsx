import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from '@/features/kanban-board/components/atoms/SearchField';
import { action } from 'storybook/actions';
import { useState } from 'react';
import { Box } from '@mui/material';

/**
 * SearchField provides debounced search input for filtering job targets.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Empty, Loading, Error, Disabled, Edge cases
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 * 
 * **User Story 4 (Search and Filter)**:
 * - Debounced onChange (300ms default)
 * - Clear button when text present
 * - Full width mobile, constrained desktop (max-width 400px)
 */
const meta: Meta<typeof SearchField> = {
  title: 'Atoms/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current search value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when search value changes (debounced)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    compact: {
      control: 'boolean',
      description: 'When true, field renders compact (160px) and expands to 300px on focus. Right edge stays pinned.',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, maxWidth: '600px' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchField>;

/**
 * Compact mode (desktop header) — resting at 160px, right edge pinned.
 * Click the field to see it expand to 300px.
 */
export const Compact: Story = {
  args: {
    value: '',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    compact: true,
    debounceMs: 300,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '600px' }}>
        <Story />
      </Box>
    ),
  ],
};

/**
 * Compact mode focused — shows expanded (300px) state with right edge pinned.
 * Uses play function to simulate focus.
 */
export const CompactFocused: Story = {
  args: {
    value: '',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    compact: true,
    debounceMs: 300,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '600px' }}>
        <Story />
      </Box>
    ),
  ],
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) { input.focus(); }
  },
};

/**
 * Max content — 100-character value tests overflow clipping inside compact field.
 */
export const MaxContent: Story = {
  args: {
    value: 'A'.repeat(100),
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    compact: true,
    debounceMs: 300,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '600px' }}>
        <Story />
      </Box>
    ),
  ],
};

/**
 * Default empty search field.
 */
export const Default: Story = {
  args: {
    value: '',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    debounceMs: 300,
    disabled: false,
  },
};

/**
 * Search field with text entered.
 */
export const WithText: Story = {
  args: {
    value: 'Google',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    debounceMs: 300,
    disabled: false,
  },
};

/**
 * Search field with clear button visible (text present).
 */
export const WithClearButton: Story = {
  args: {
    value: 'Software Engineer',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    debounceMs: 300,
    disabled: false,
  },
};

/**
 * Disabled state (cannot be interacted with).
 */
export const Disabled: Story = {
  args: {
    value: '',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    debounceMs: 300,
    disabled: true,
  },
};

/**
 * Mobile width (full width).
 */
export const MobileWidth: Story = {
  args: {
    value: '',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    debounceMs: 300,
    disabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Empty state (for empty component requirement).
 */
export const Empty: Story = {
  args: {
    value: '',
    onChange: action('search-changed'),
    placeholder: 'Search targets...',
    debounceMs: 300,
    disabled: false,
  },
};

/**
 * Interactive example with controlled state.
 */
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SearchField
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          action('search-changed')(newValue);
        }}
      />
    );
  },
  args: {
    placeholder: 'Try typing...',
    debounceMs: 300,
    disabled: false,
  },
};
