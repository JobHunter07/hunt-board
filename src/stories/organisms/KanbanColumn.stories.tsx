import type { Meta, StoryObj } from '@storybook/react-vite';
import { KanbanColumn } from '@/features/kanban-board/components/organisms/KanbanColumn';
import { createJobTarget } from '@/features/kanban-board/validation/jobTarget.schema';
import { action } from 'storybook/actions';
import type { Column, JobTarget } from '@/features/kanban-board/types';

/**
 * KanbanColumn displays a vertical column with header, cards, and add button.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 */
const meta: Meta<typeof KanbanColumn> = {
  title: 'Organisms/KanbanColumn',
  component: KanbanColumn,
  tags: ['autodocs'],
  argTypes: {
    column: {
      description: 'Column configuration',
    },
    jobTargets: {
      description: 'Array of job targets in this column',
    },
    onAddTarget: {
      action: 'add-target',
      description: 'Add target handler',
    },
    onEditTarget: {
      action: 'edit-target',
      description: 'Edit target handler',
    },
    onDeleteTarget: {
      action: 'delete-target',
      description: 'Delete target handler',
    },
  },
  args: {
    onAddTarget: action('add-target'),
    onEditTarget: action('edit-target'),
    onDeleteTarget: action('delete-target'),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '16px', backgroundColor: '#f5f5f5', minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

const defaultColumn: Column = {
  id: 'targets-identified',
  title: 'Targets Identified',
  color: '#B71C1C',
  description: 'Jobs, companies, or teams that look interesting but need research',
  order: 0,
};

const createSampleTargets = (count: number): JobTarget[] => {
  const companies = ['Acme Corp', 'TechStart Inc', 'Enterprise LLC', 'Startup XYZ', 'MegaCorp Global'];
  const roles = ['Senior Engineer', 'Full Stack Developer', 'Backend Engineer', 'Frontend Developer', 'DevOps Engineer'];
  const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  const tags = [['remote', 'react'], ['startup', 'equity'], ['python', 'django'], ['aws', 'kubernetes'], ['typescript']];

  return Array.from({ length: count }, (_, i) => ({
    ...createJobTarget(companies[i % companies.length] ?? 'Company'),
    role: roles[i % roles.length],
    priority: priorities[i % priorities.length] ?? 'medium',
    tags: tags[i % tags.length] ?? [],
    warmUpScore: Math.floor(Math.random() * 100),
  }));
};

/**
 * Default column with 3 cards.
 */
export const Default: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(3),
  },
};

/**
 * Empty column (no cards).
 */
export const Empty: Story = {
  args: {
    column: defaultColumn,
    jobTargets: [],
  },
};

/**
 * Column with 1 card.
 */
export const OneCard: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(1),
  },
};

/**
 * Column with 5 cards.
 */
export const FiveCards: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(5),
  },
};

/**
 * Column with 20+ cards (tests scrolling).
 */
export const ManyCards: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(25),
  },
};

/**
 * Responsive: Mobile width (375px).
 */
export const MobileWidth: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Responsive: Tablet width (768px).
 */
export const TabletWidth: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Responsive: Desktop width (1920px).
 */
export const DesktopWidth: Story = {
  args: {
    column: defaultColumn,
    jobTargets: createSampleTargets(3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/**
 * All 9 columns side by side (full board preview).
 */
export const AllColumns: Story = {
  render: () => {
    const columns: Column[] = [
      { id: 'targets-identified', title: 'Targets Identified', color: '#B71C1C', order: 0, description: '' },
      { id: 'intel-gathering', title: 'Intel Gathering', color: '#C62828', order: 1, description: '' },
      { id: 'warm-up-phase', title: 'Warm-Up Phase', color: '#7B1FA2', order: 2, description: '' },
      { id: 'outreach-initiated', title: 'Outreach Initiated', color: '#1976D2', order: 3, description: '' },
      { id: 'follow-up-required', title: 'Follow-Up Required', color: '#F57C00', order: 4, description: '' },
      { id: 'conversation-started', title: 'Conversation Started', color: '#388E3C', order: 5, description: '' },
      { id: 'interview-pipeline', title: 'Interview Pipeline', color: '#0288D1', order: 6, description: '' },
      { id: 'stalled-cold', title: 'Stalled / Cold', color: '#757575', order: 7, description: '' },
      { id: 'offer-success', title: 'Offer / Success', color: '#2E7D32', order: 8, description: '' },
    ];

    return (
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '16px' }}>
        {columns.map((column, i) => (
          <KanbanColumn
            key={column.id}
            column={column}
            jobTargets={createSampleTargets(i % 3 + 1)}
            onAddTarget={action('add-target')}
            onEditTarget={action('edit-target')}
            onDeleteTarget={action('delete-target')}
          />
        ))}
      </div>
    );
  },
};
