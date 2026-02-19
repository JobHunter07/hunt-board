import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddButton } from '@/features/kanban-board/components/atoms/AddButton';
import { action } from 'storybook/actions';

/**
 * AddButton triggers creation of new job target cards.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 */
const meta: Meta<typeof AddButton> = {
  title: 'Atoms/AddButton',
  component: AddButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Click handler for add action',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    variant: {
      control: 'select',
      options: ['icon-only', 'text-icon'],
      description: 'Button variant (icon-only for mobile, text-icon for desktop)',
    },
  },
  args: {
    onClick: action('clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof AddButton>;

/**
 * Default button with text and icon.
 */
export const Default: Story = {
  args: {
    disabled: false,
    variant: 'text-icon',
  },
};

/**
 * Icon-only variant (mobile/compact mode).
 */
export const IconOnly: Story = {
  args: {
    disabled: false,
    variant: 'icon-only',
  },
};

/**
 * Text + Icon variant (desktop mode).
 */
export const TextIcon: Story = {
  args: {
    disabled: false,
    variant: 'text-icon',
  },
};

/**
 * Disabled state (cannot be clicked).
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'text-icon',
  },
};

/**
 * Disabled icon-only variant.
 */
export const DisabledIconOnly: Story = {
  args: {
    disabled: true,
    variant: 'icon-only',
  },
};

/**
 * Hover state (interactive demo).
 * Tests hover styling with deep red theme color.
 */
export const HoverState: Story = {
  args: {
    disabled: false,
    variant: 'text-icon',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Mobile layout (icon-only in narrow container).
 */
export const MobileLayout: Story = {
  args: {
    disabled: false,
    variant: 'icon-only',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Desktop layout (text-icon in full width).
 */
export const DesktopLayout: Story = {
  args: {
    disabled: false,
    variant: 'text-icon',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/**
 * All variants side by side for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <AddButton onClick={action('clicked')} variant="text-icon" />
      <AddButton onClick={action('clicked')} variant="icon-only" />
      <AddButton onClick={action('clicked')} variant="text-icon" disabled />
      <AddButton onClick={action('clicked')} variant="icon-only" disabled />
    </div>
  ),
};
