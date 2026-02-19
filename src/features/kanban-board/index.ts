/**
 * Kanban Board Feature - Public Exports
 * 
 * Explicit named exports only (Section XI: No default exports)
 */

// Components - Atoms
export { PriorityIndicator } from './components/atoms/PriorityIndicator';
export type { PriorityIndicatorProps } from './components/atoms/PriorityIndicator';

export { TagChip } from './components/atoms/TagChip';
export type { TagChipProps } from './components/atoms/TagChip';

export { ColumnHeader } from './components/atoms/ColumnHeader';
export type { ColumnHeaderProps } from './components/atoms/ColumnHeader';

export { AddButton } from './components/atoms/AddButton';
export type { AddButtonProps } from './components/atoms/AddButton';

export { SearchField } from './components/atoms/SearchField';
export type { SearchFieldProps } from './components/atoms/SearchField';

export { FilterButton } from './components/atoms/FilterButton';
export type { FilterButtonProps } from './components/atoms/FilterButton';

// Components - Organisms
export { KanbanColumn } from './components/organisms/KanbanColumn';
export type { KanbanColumnProps } from './components/organisms/KanbanColumn';

export { JobTargetCard } from './components/organisms/JobTargetCard';
export type { JobTargetCardProps } from './components/organisms/JobTargetCard';

export { AddTargetModal } from './components/organisms/AddTargetModal';
export type { AddTargetModalProps, AddTargetFormData } from './components/organisms/AddTargetModal';

export { CardDetailModal } from './components/organisms/CardDetailModal';
export type { CardDetailModalProps } from './components/organisms/CardDetailModal';

export { SearchFilterBar } from './components/organisms/SearchFilterBar';
export type { SearchFilterBarProps } from './components/organisms/SearchFilterBar';

// Components - Pages
export { KanbanBoardPage } from './components/pages/KanbanBoardPage';

// Hooks
export { useLocalStorage } from './hooks/useLocalStorage';
export { useBoardState } from './hooks/useBoardState';
export { useDragAndDrop } from './hooks/useDragAndDrop';
export { useCardFilters } from './hooks/useCardFilters';

// Types (re-exported from types/index.ts)
export type {
  Priority,
  ColumnId,
  OutreachType,
  WarmUpActionType,
  StateReason,
  InterviewStage,
  Tag,
  FollowUp,
  OutreachRecord,
  WarmUpAction,
  Column,
  JobTarget,
  BoardState,
  UserPreferences
} from './types';

// Schemas
export {
  PrioritySchema,
  ColumnIdSchema,
  OutreachTypeSchema,
  WarmUpActionTypeSchema,
  StateReasonSchema,
  InterviewStageSchema
} from './validation/enums';

export { TagSchema, createTag } from './validation/tag.schema';
export { FollowUpSchema } from './validation/followUp.schema';
export { OutreachRecordSchema } from './validation/outreachRecord.schema';
export { WarmUpActionSchema } from './validation/warmUpAction.schema';
export { ColumnSchema, DEFAULT_COLUMNS } from './validation/column.schema';
export { JobTargetSchema, createJobTarget } from './validation/jobTarget.schema';
export { BoardStateSchema } from './validation/boardState.schema';
export { UserPreferencesSchema } from './validation/userPreferences.schema';

// Validation utilities
export { validateData, safeValidateData, extractZodErrors } from './validation/utils';

// Storage utilities
export {
  loadBoardState,
  saveBoardState,
  loadUserPreferences,
  saveUserPreferences
} from './utils/storage';
