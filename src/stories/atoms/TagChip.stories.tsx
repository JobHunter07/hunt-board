import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagChip } from '@/features/kanban-board/components/atoms/TagChip';
import { action } from 'storybook/actions';

/**
 * TagChip displays a tag with optional delete functionality.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 */
const meta: Meta<typeof TagChip> = {
  title: 'Atoms/TagChip',
  component: TagChip,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Tag label text',
    },
    color: {
      control: 'color',
      description: 'Tag background color (default: #9E9E9E)',
    },
    onDelete: {
      action: 'deleted',
      description: 'Optional delete handler',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    onDelete: action('deleted'),
  },
};

export default meta;
type Story = StoryObj<typeof TagChip>;

/**
 * Default tag chip with standard styling.
 */
export const Default: Story = {
  args: {
    label: 'Frontend',
    color: '#1976D2',
    disabled: false,
  },
};

/**
 * Tag with delete button enabled.
 */
export const WithDelete: Story = {
  args: {
    label: 'React',
    color: '#61DAFB',
  },
};

/**
 * Tag without delete button (read-only).
 */
export const WithoutDelete: Story = {
  args: {
    label: 'TypeScript',
    color: '#3178C6',
  },
};

/**
 * Disabled tag (cannot be deleted).
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    color: '#9E9E9E',
    disabled: true,
  },
};

/**
 * Tag with very long text to test truncation.
 */
export const LongText: Story = {
  args: {
    label: 'Very Long Tag Name That Should Truncate Properly In The UI',
    color: '#F44336',
  },
};

/**
 * Tag with default grey color.
 */
export const DefaultColor: Story = {
  args: {
    label: 'Untagged',
  },
};

/**
 * Multiple tags with different colors for comparison.
 * Tests visual consistency and accessibility.
 */
export const MultipleColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <TagChip label="Frontend" color="#1976D2" />
      <TagChip label="Backend" color="#388E3C" />
      <TagChip label="Full Stack" color="#7B1FA2" />
      <TagChip label="Remote" color="#F57C00" />
      <TagChip label="High Salary" color="#C62828" />
      <TagChip label="Startup" color="#00796B" />
    </div>
  ),
};

/**
 * Empty state (minimal content).
 */
export const Empty: Story = {
  args: {
    label: '',
    color: '#9E9E9E',
  },
};

/**
 * Maximum content test (long text + delete button).
 */
export const MaxContent: Story = {
  args: {
    label: 'Maximum Content Tag With Very Long Label Text That Tests Truncation And Delete Button Together',
    color: '#E91E63',
  },
};
