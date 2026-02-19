import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { KanbanColumn } from '../organisms/KanbanColumn';
import { useBoardState } from '../../hooks/useBoardState';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import type { ColumnId } from '../../types';

export function KanbanBoardPage() {
  const { boardState, addJobTarget, deleteJobTarget, moveJobTarget, getTargetsByColumn } = useBoardState();
  const [, setEditingTargetId] = useState<string | null>(null);

  const handleAddTarget = (columnId: ColumnId) => {
    const company = prompt('Enter company name:');
    if (company) {
      addJobTarget(company, columnId);
    }
  };

  const handleEditTarget = (targetId: string) => {
    setEditingTargetId(targetId);
    // TODO: Open edit modal
    // eslint-disable-next-line no-console
    console.log('Edit target:', targetId);
  };

  const handleDeleteTarget = (targetId: string) => {
    if (confirm('Delete this job target?')) {
      deleteJobTarget(targetId);
    }
  };

  const handleDragEnd = (targetId: string, newColumnId: ColumnId) => {
    moveJobTarget(targetId, newColumnId);
  };

  const { sensors, handleDragEnd: onDragEnd } = useDragAndDrop({
    onDragEnd: handleDragEnd
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Hunt Board
      </Typography>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '5px'
            }
          }}
        >
          {boardState.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              jobTargets={getTargetsByColumn(column.id)}
              onAddTarget={() => { handleAddTarget(column.id); }}
              onEditTarget={handleEditTarget}
              onDeleteTarget={handleDeleteTarget}
            />
          ))}
        </Box>
      </DndContext>
    </Box>
  );
}
