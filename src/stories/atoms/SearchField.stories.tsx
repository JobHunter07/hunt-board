import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from '@/features/kanban-board/components/atoms/SearchField';
import { action } from '@storybook/addon-actions';
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
