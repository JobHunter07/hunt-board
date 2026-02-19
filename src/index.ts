/**
 * @jobhunter07/hunt-board
 * 
 * NPM library entry point
 * Tree-shakable ESM exports only
 */

// Export all types
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
} from './features/kanban-board/types';

// Export schemas for validation
export {
  PrioritySchema,
  ColumnIdSchema,
  OutreachTypeSchema,
  WarmUpActionTypeSchema,
  StateReasonSchema,
  InterviewStageSchema
} from './features/kanban-board/validation/enums';

export { TagSchema, createTag } from './features/kanban-board/validation/tag.schema';
export { FollowUpSchema } from './features/kanban-board/validation/followUp.schema';
export { OutreachRecordSchema } from './features/kanban-board/validation/outreachRecord.schema';
export { WarmUpActionSchema } from './features/kanban-board/validation/warmUpAction.schema';
export { ColumnSchema, DEFAULT_COLUMNS } from './features/kanban-board/validation/column.schema';
export { JobTargetSchema, createJobTarget } from './features/kanban-board/validation/jobTarget.schema';
export { BoardStateSchema } from './features/kanban-board/validation/boardState.schema';
export { UserPreferencesSchema } from './features/kanban-board/validation/userPreferences.schema';

// Export validation utilities
export { validateData, safeValidateData, extractZodErrors } from './features/kanban-board/validation/utils';

// Export storage utilities
export {
  loadBoardState,
  saveBoardState,
  loadUserPreferences,
  saveUserPreferences
} from './features/kanban-board/utils/storage';

// Export Material UI theme
export { huntBoardTheme } from './lib/theme';

// Export all Kanban Board feature exports
export * from './features/kanban-board';
