import { Box, Typography } from '@mui/material';
import { useState, useMemo, useCallback } from 'react';
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

/**
 * KanbanBoardPage - Main Hunt Board interface
 * 
 * **Performance Optimizations (T066)**:
 * - All event handlers wrapped in useCallback
 * - Prevents unnecessary re-renders of child components
 * - Stable function references across renders
 */
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

  const handleAddTarget = useCallback((columnId: ColumnId) => {
    setSelectedColumnId(columnId);
    setModalOpen(true);
  }, []);

  const handleModalSubmit = useCallback((data: AddTargetFormData) => {
    addJobTarget(data.company, data.columnId);
    setModalOpen(false);
  }, [addJobTarget]);

  const handleCardClick = useCallback((target: JobTarget) => {
    setSelectedTarget(target);
    setDetailModalOpen(true);
  }, []);

  const handleEditTarget = useCallback((targetId: string) => {
    const target = (boardState.jobTargets ?? []).find(t => t.id === targetId);
    if (target) {
      handleCardClick(target);
    }
  }, [boardState.jobTargets, handleCardClick]);

  const handleSaveTarget = useCallback((updates: Partial<JobTarget>) => {
    if (selectedTarget) {
      updateJobTarget(selectedTarget.id, updates);
      setDetailModalOpen(false);
      setSelectedTarget(null);
    }
  }, [selectedTarget, updateJobTarget]);

  const handleDeleteTarget = useCallback((targetId: string) => {
    if (confirm('Delete this job target?')) {
      deleteJobTarget(targetId);
    }
  }, [deleteJobTarget]);

  const handleDeleteFromModal = useCallback(() => {
    if (selectedTarget) {
      deleteJobTarget(selectedTarget.id);
      setDetailModalOpen(false);
      setSelectedTarget(null);
    }
  }, [selectedTarget, deleteJobTarget]);

  const handleDragEnd = useCallback((targetId: string, newColumnId: ColumnId) => {
    moveJobTarget(targetId, newColumnId);
  }, [moveJobTarget]);

  const { sensors, handleDragEnd: onDragEnd } = useDragAndDrop({
    onDragEnd: handleDragEnd
  });

  // Get filtered targets by column (memoized)
  const getFilteredTargetsByColumn = useCallback((columnId: ColumnId) => {
    return filteredCards.filter((target) => target.columnId === columnId);
  }, [filteredCards]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      {/*
       * Mobile-first header (Constitution Section XIII):
       * xs (<600px): column layout — title then SearchFilterBar with controls stacked vertically
       * sm+ (≥600px): single row — title left, SearchFilterBar right-aligned
       */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          mb: 3,
          gap: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Hunt Board
        </Typography>
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
          onAddTarget={() => { handleAddTarget('targets-identified'); }}
        />
      </Box>

      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <Box
          role="region"
          aria-label="Kanban board columns"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            overflowX: { xs: 'hidden', sm: 'auto' },
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
            },
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
