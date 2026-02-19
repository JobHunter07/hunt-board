// src/features/kanban-board/types/index.ts

/**
 * All TypeScript types are inferred from Zod schemas.
 * NEVER hand-write types (constitutional requirement: Section IV).
 * 
 * This file re-exports all inferred types for convenience.
 */

export type {
  Priority,
  ColumnId,
  OutreachType,
  WarmUpActionType,
  StateReason,
  InterviewStage
} from '../validation/enums';

export type { Tag } from '../validation/tag.schema';
export type { FollowUp } from '../validation/followUp.schema';
export type { OutreachRecord } from '../validation/outreachRecord.schema';
export type { WarmUpAction } from '../validation/warmUpAction.schema';
export type { Column } from '../validation/column.schema';
export type { JobTarget } from '../validation/jobTarget.schema';
export type { BoardState } from '../validation/boardState.schema';
export type { UserPreferences } from '../validation/userPreferences.schema';
