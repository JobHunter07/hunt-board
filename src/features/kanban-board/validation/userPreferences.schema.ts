// src/features/kanban-board/validation/userPreferences.schema.ts
import { z } from 'zod';

/**
 * User preferences for board UI state
 */
export const UserPreferencesSchema = z.object({
  /** Active search query */
  searchQuery: z.string().max(200).default(''),
  
  /** Active filters */
  filters: z.object({
    priorities: z.array(z.enum(['low', 'medium', 'high'])).default([]),
    tags: z.array(z.string()).default([]),
    columns: z.array(z.string()).default([]), // Empty = all columns
    hasFollowUp: z.boolean().optional()
  }).default({}),
  
  /** Sort order */
  sortBy: z.enum(['created', 'updated', 'priority', 'company']).default('updated'),
  
  /** Sort direction */
  sortDirection: z.enum(['asc', 'desc']).default('desc'),
  
  /** Collapsed columns (array of column IDs) */
  collapsedColumns: z.array(z.string()).default([])
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
