import { Paper, Stack, memo } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { ColumnHeader } from '../atoms/ColumnHeader';
import { AddButton } from '../atoms/AddButton';
import type { Column, JobTarget } from '@/features/kanban-board/types';
import { JobTargetCard, type JobTargetCardProps } from './JobTargetCard';

export type KanbanColumnProps = {
  column: Column;
  jobTargets: JobTarget[];
  onAddTarget: () => void;
  onCardClick?: (target: JobTarget) => void;
  onEditTarget: (targetId: string) => void;
  onDeleteTarget: (targetId: string) => void;
}

/**
 * Custom comparison function for React.memo
 * Only re-render if column data or jobTargets change
 * 
 * **Performance Optimization (T065)**:
 * - Prevents re-renders when other columns update
 * - Checks column.id and jobTargets array reference
 * - Deep equality check on jobTarget IDs and updatedAt timestamps
 * - Callback props should be memoized in parent
 */
function arePropsEqual(prevProps: KanbanColumnProps, nextProps: KanbanColumnProps): boolean {
  // Column ID changed?
  if (prevProps.column.id !== nextProps.column.id) {
    return false;
  }

  // Number of targets changed?
  if (prevProps.jobTargets.length !== nextProps.jobTargets.length) {
    return false;
  }

  // Check if any target changed (by ID or updatedAt)
  for (let i = 0; i < prevProps.jobTargets.length; i++) {
    const prevTarget = prevProps.jobTargets[i];
    const nextTarget = nextProps.jobTargets[i];
    
    if (!prevTarget || !nextTarget) {
      return false;
    }

    if (
      prevTarget.id !== nextTarget.id ||
      prevTarget.updatedAt !== nextTarget.updatedAt
    ) {
      return false;
    }
  }

  return true;
}

const KanbanColumnComponent = ({
  column,
  jobTargets,
  onAddTarget,
  onCardClick,
  onEditTarget,
  onDeleteTarget
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  return (
    <Paper
      elevation={1}
      role="region"
      aria-label={`${column.title} column`}
      sx={{
        width: { xs: '100%', sm: '280px', md: '320px' },
        minWidth: { xs: '100%', sm: '280px', md: '320px' },
        maxWidth: { xs: '100%', sm: '280px', md: '320px' },
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        maxHeight: 'calc(100vh - 120px)'
      }}
    >
      <ColumnHeader title={column.title} count={jobTargets.length} color={column.color} />
      
      <Stack
        ref={setNodeRef}
        role="list"
        aria-label={`Job targets in ${column.title}`}
        spacing={2}
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          mb: 2,
          minHeight: '100px',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px'
          }
        }}
      >
        {jobTargets.map((target) => {
          const cardProps: JobTargetCardProps = {
            jobTarget: target,
            onEdit: () => { onEditTarget(target.id); },
            onDelete: () => { onDeleteTarget(target.id); },
          };
          
          if (onCardClick) {
            cardProps.onClick = () => { onCardClick(target); };
          }
          
          return (
            <div key={target.id} role=\"listitem\">\n              <JobTargetCard {...cardProps} />\n            </div>\n          );
        })}
      </Stack>
      
      <AddButton onClick={onAddTarget} />
    </Paper>
  );
};

/**
 * KanbanColumn with React.memo optimization
 * 
 * **Constitutional Compliance (Section II)**:
 * - Organism-level component
 * - Material UI only
 * - Droppable area via @dnd-kit
 * - Memoized for performance
 */
export const KanbanColumn = memo(KanbanColumnComponent, arePropsEqual);
