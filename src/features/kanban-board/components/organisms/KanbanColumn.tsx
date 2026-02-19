import { Paper, Stack } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { ColumnHeader } from '../atoms/ColumnHeader';
import { AddButton } from '../atoms/AddButton';
import type { Column, JobTarget } from '@/features/kanban-board/types';
import { JobTargetCard } from './JobTargetCard';

export type KanbanColumnProps = {
  column: Column;
  jobTargets: JobTarget[];
  onAddTarget: () => void;
  onEditTarget: (targetId: string) => void;
  onDeleteTarget: (targetId: string) => void;
}

export function KanbanColumn({
  column,
  jobTargets,
  onAddTarget,
  onEditTarget,
  onDeleteTarget
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  return (
    <Paper
      elevation={1}
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
        {jobTargets.map((target) => (
          <JobTargetCard
            key={target.id}
            jobTarget={target}
            onEdit={() => { onEditTarget(target.id); }}
            onDelete={() => { onDeleteTarget(target.id); }}
          />
        ))}
      </Stack>
      
      <AddButton onClick={onAddTarget} />
    </Paper>
  );
}
