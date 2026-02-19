import type { Meta, StoryObj } from '@storybook/react';
import { AddTargetModal } from '@/features/kanban-board/components/organisms/AddTargetModal';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import { Button } from '@mui/material';

/**
 * AddTargetModal allows users to create new job hunt targets with validation.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 * 
 * **User Story 2 Features**:
 * - React Hook Form with Zod validation
 * - Responsive: Full-screen mobile, max-width 600px desktop
 * - Tag input with Chip display
 * - Pre-filled column selection
 */
const meta: Meta<typeof AddTargetModal> = {
  title: 'Organisms/AddTargetModal',
  component: AddTargetModal,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Modal open state',
    },
    onClose: {
      action: 'closed',
      description: 'Close handler',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Form submit handler',
    },
    defaultColumnId: {
      control: 'select',
      options: [
        'targets-identified',
        'intel-gathering',
        'warm-up-phase',
        'outreach-initiated',
        'follow-up-required',
        'conversation-started',
        'interview-pipeline',
        'stalled-cold',
        'offer-success',
      ],
      description: 'Default column for new target',
    },
  },
  args: {
    onClose: action('closed'),
    onSubmit: action('submitted'),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddTargetModal>;

/**
 * Default modal with empty form.
 */
export const Default: Story = {
  args: {
    open: true,
    defaultColumnId: 'targets-identified',
  },
};

/**
 * Modal pre-filled with Intel Gathering column.
 */
export const PrefilledColumn: Story = {
  args: {
    open: true,
    defaultColumnId: 'intel-gathering',
  },
};

/**
 * Modal pre-filled with Follow-Up Required column.
 */
export const FollowUpColumn: Story = {
  args: {
    open: true,
    defaultColumnId: 'follow-up-required',
  },
};

/**
 * Mobile view (full-screen).
 */
export const MobileView: Story = {
  args: {
    open: true,
    defaultColumnId: 'targets-identified',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet view.
 */
export const TabletView: Story = {
  args: {
    open: true,
    defaultColumnId: 'targets-identified',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Desktop view (max-width 600px).
 */
export const DesktopView: Story = {
  args: {
    open: true,
    defaultColumnId: 'targets-identified',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/**
 * Closed modal (not visible).
 */
export const Closed: Story = {
  args: {
    open: false,
    defaultColumnId: 'targets-identified',
  },
};

/**
 * Interactive demo with open/close toggle.
 */
export const InteractiveDemo: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => { setOpen(true); }}>
          Open Add Target Modal
        </Button>
        <AddTargetModal
          {...args}
          open={open}
          onClose={() => {
            setOpen(false);
            action('closed')();
          }}
          onSubmit={(data) => {
            action('submitted')(data);
            setOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    defaultColumnId: 'targets-identified',
  },
};

/**
 * Form validation test (submit empty to see required errors).
 * 
 * **Validation Rules**:
 * - Company: Required (1-100 characters)
 * - Role: Optional (max 100 characters)
 * - Reason: Optional (max 500 characters)
 * - Source: Optional (max 200 characters)
 * - Priority: Required (low/medium/high)
 * - Column: Required (one of 9 columns)
 */
export const ValidationTest: Story = {
  args: {
    open: true,
    defaultColumnId: 'targets-identified',
  },
  parameters: {
    docs: {
      description: {
        story: 'Click "Create Target" with empty company field to see validation error.',
      },
    },
  },
};

/**
 * Accessibility test scenario.
 * 
 * **WCAG AA Requirements**:
 * - Keyboard navigation: Tab through all form fields
 * - Screen reader: ARIA labels on all inputs
 * - Focus trap: Focus stays within modal
 * - Escape key: Closes modal
 * - Color contrast: 4.5:1 minimum
 */
export const AccessibilityTest: Story = {
  args: {
    open: true,
    defaultColumnId: 'targets-identified',
  },
};
