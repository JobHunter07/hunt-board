import { Box, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import { DndContext } from '@dnd-kit/core';
import { KanbanColumn } from '../organisms/KanbanColumn';
import { AddTargetModal, type AddTargetFormData } from '../organisms/AddTargetModal';
import { CardDetailModal } from '../organisms/CardDetailModal';
import { SearchFilterBar } from '../organisms/SearchFilterBar';
import { useBoardState } from '../../hooks/useBoardState';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useCardFilters } from '../../hooks/useCardFilters';
import type { ColumnId } from '../../types';
import type { JobTarget } from '../../types';

export function KanbanBoardPage() {
  const { boardState, addJobTarget, updateJobTarget, deleteJobTarget, moveJobTarget } = useBoardState();
  const [selectedTarget, setSelectedTarget] = useState<JobTarget | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<ColumnId>('targets-identified');

  // Filter hook
  const {
    searchQuery,
    setSearchQuery,
    selectedPriorities,
    setSelectedPriorities,
    selectedTags,
    setSelectedTags,
    hasFollowUp,
    setHasFollowUp,
    filteredCards,
    activeFilterCount,
    clearAllFilters,
  } = useCardFilters(boardState.jobTargets ?? []);

  // Get available tags from all cards
  const availableTags = useMemo(() => {
    const allTags = new Set<string>();
    (boardState.jobTargets ?? []).forEach((card) => {
      card.tags.forEach((tag) => { allTags.add(tag); });
    });
    return Array.from(allTags).sort();
  }, [boardState.jobTargets]);

  const handleAddTarget = (columnId: ColumnId) => {
    setSelectedColumnId(columnId);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: AddTargetFormData) => {
    addJobTarget(data.company, data.columnId);
    setModalOpen(false);
  };

  const handleCardClick = (target: JobTarget) => {
    setSelectedTarget(target);
    setDetailModalOpen(true);
  };

  const handleEditTarget = (targetId: string) => {
    const target = (boardState.jobTargets ?? []).find(t => t.id === targetId);
    if (target) {
      handleCardClick(target);
    }
  };

  const handleSaveTarget = (updates: Partial<JobTarget>) => {
    if (selectedTarget) {
      updateJobTarget(selectedTarget.id, updates);
      setDetailModalOpen(false);
      setSelectedTarget(null);
    }
  };

  const handleDeleteTarget = (targetId: string) => {
    if (confirm('Delete this job target?')) {
      deleteJobTarget(targetId);
    }
  };

  const handleDeleteFromModal = () => {
    if (selectedTarget) {
      deleteJobTarget(selectedTarget.id);
      setDetailModalOpen(false);
      setSelectedTarget(null);
    }
  };

  const handleDragEnd = (targetId: string, newColumnId: ColumnId) => {
    moveJobTarget(targetId, newColumnId);
  };

  const { sensors, handleDragEnd: onDragEnd } = useDragAndDrop({
    onDragEnd: handleDragEnd
  });

  // Get filtered targets by column
  const getFilteredTargetsByColumn = (columnId: ColumnId) => {
    return filteredCards.filter((target) => target.columnId === columnId);
  };

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

      {/* Search and Filter Bar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPriorities={selectedPriorities}
        onPrioritiesChange={setSelectedPriorities}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        hasFollowUp={hasFollowUp}
        onFollowUpChange={setHasFollowUp}
        availableTags={availableTags}
        activeFilterCount={activeFilterCount}
        onClearAll={clearAllFilters}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredCards.length} of {(boardState.jobTargets ?? []).length} targets
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
              jobTargets={getFilteredTargetsByColumn(column.id)}
              onAddTarget={() => { handleAddTarget(column.id); }}
              onCardClick={handleCardClick}
              onEditTarget={handleEditTarget}
              onDeleteTarget={handleDeleteTarget}
            />
          ))}
        </Box>
      </DndContext>

      <AddTargetModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); }}
        onSubmit={handleModalSubmit}
        defaultColumnId={selectedColumnId}
      />

      <CardDetailModal
        open={detailModalOpen}
        jobTarget={selectedTarget}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedTarget(null);
        }}
        onSave={handleSaveTarget}
        onDelete={handleDeleteFromModal}
      />
    </Box>
  );
}
