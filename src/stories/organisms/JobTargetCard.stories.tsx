import type { Meta, StoryObj } from '@storybook/react';
import { JobTargetCard } from '@/features/kanban-board/components/organisms/JobTargetCard';
import { createJobTarget } from '@/features/kanban-board/validation/jobTarget.schema';
import { action } from '@storybook/addon-actions';
import type { JobTarget } from '@/features/kanban-board/types';

/**
 * JobTargetCard displays a draggable job target with company, role, priority, tags, and actions.
 * 
 * **Constitutional Requirements (Section V)**:
 * - ✅ Stories include Default, Edge cases, Accessibility checks
 * - ✅ CSF3 format with autodocs
 * - ✅ Interactive controls for all props
 * - ✅ @storybook/addon-a11y checks enabled
 */
const meta: Meta<typeof JobTargetCard> = {
  title: 'Organisms/JobTargetCard',
  component: JobTargetCard,
  tags: ['autodocs'],
  argTypes: {
    jobTarget: {
      description: 'Job target entity',
    },
    onEdit: {
      action: 'edited',
      description: 'Edit card handler',
    },
    onDelete: {
      action: 'deleted',
      description: 'Delete card handler',
    },
  },
  args: {
    onEdit: action('edited'),
    onDelete: action('deleted'),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px', padding: '16px', backgroundColor: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof JobTargetCard>;

/**
 * Default card with company, role, medium priority, and tags.
 */
export const Default: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('Acme Corp'),
      role: 'Senior Frontend Engineer',
      priority: 'medium',
      tags: ['remote', 'react', 'typescript'],
      warmUpScore: 45,
    },
  },
};

/**
 * High priority card with warm-up score.
 */
export const HighPriority: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('TechStart Inc'),
      role: 'Lead Developer',
      priority: 'high',
      tags: ['startup', 'equity', 'remote'],
      warmUpScore: 75,
    },
  },
};

/**
 * Low priority card.
 */
export const LowPriority: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('Enterprise Solutions LLC'),
      role: 'Software Engineer',
      priority: 'low',
      tags: ['on-site', 'full-time'],
      warmUpScore: 20,
    },
  },
};

/**
 * Card without role (early-stage target).
 */
export const EmptyRole: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('Stealth Startup'),
      role: undefined,
      priority: 'medium',
      tags: ['startup'],
      warmUpScore: 10,
    },
  },
};

/**
 * Card with many tags (shows max 3 + overflow).
 */
export const ManyTags: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('MegaCorp Global'),
      role: 'Full Stack Engineer',
      priority: 'high',
      tags: ['remote', 'react', 'typescript', 'nodejs', 'aws', 'kubernetes'],
      warmUpScore: 60,
    },
  },
};

/**
 * Card with no tags.
 */
export const NoTags: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('Local Company'),
      role: 'Developer',
      priority: 'medium',
      tags: [],
      warmUpScore: 0,
    },
  },
};

/**
 * Card with zero warm-up score (no warm-up chip displayed).
 */
export const NoWarmUpScore: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('Cold Target LLC'),
      role: 'Backend Developer',
      priority: 'low',
      tags: ['python', 'django'],
      warmUpScore: 0,
    },
  },
};

/**
 * Card with maximum content (long company name, role, many tags).
 */
export const MaxContent: Story = {
  args: {
    jobTarget: {
      ...createJobTarget('Very Long Company Name That Should Wrap Properly In The Card Layout'),
      role: 'Principal Software Engineering Manager - Full Stack Development',
      priority: 'high',
      tags: ['remote', 'react', 'typescript', 'nodejs', 'aws', 'kubernetes', 'docker', 'ci/cd'],
      warmUpScore: 95,
    },
  },
};

/**
 * Empty state (minimal data - company only).
 */
export const Empty: Story = {
  args: {
    jobTarget: createJobTarget('Company'),
  },
};

/**
 * Multiple cards in a column (visual comparison).
 */
export const MultipleCards: Story = {
  render: () => {
    const targets: JobTarget[] = [
      {
        ...createJobTarget('Acme Corp'),
        role: 'Senior Frontend Engineer',
        priority: 'high',
        tags: ['remote', 'react'],
        warmUpScore: 80,
      },
      {
        ...createJobTarget('TechStart Inc'),
        role: 'Full Stack Developer',
        priority: 'medium',
        tags: ['startup', 'equity'],
        warmUpScore: 50,
      },
      {
        ...createJobTarget('Enterprise LLC'),
        priority: 'low',
        tags: [],
        warmUpScore: 0,
      },
    ];

    return (
      <div style={{ maxWidth: '320px', padding: '16px', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {targets.map((target) => (
          <JobTargetCard
            key={target.id}
            jobTarget={target}
            onEdit={action('edited')}
            onDelete={action('deleted')}
          />
        ))}
      </div>
    );
  },
};
