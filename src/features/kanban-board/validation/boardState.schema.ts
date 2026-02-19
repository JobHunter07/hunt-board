// src/features/kanban-board/validation/boardState.schema.ts
import { z } from 'zod';
import { JobTargetSchema } from './jobTarget.schema';
import { ColumnSchema } from './column.schema';
import { TagSchema } from './tag.schema';

/**
 * Complete board state (for localStorage persistence)
 */
export const BoardStateSchema = z.object({
  /** Schema version for future migrations */
  schemaVersion: z.string().default('v1.0.0'),
  
  /** All job targets */
  jobTargets: z.array(JobTargetSchema).default([]),
  
  /** Column configurations (defaults to 9 hunting columns) */
  columns: z.array(ColumnSchema),
  
  /** Available tags */
  tags: z.array(TagSchema).default([]),
  
  /** Last updated timestamp */
  lastUpdated: z.string().datetime()
});

export type BoardState = z.infer<typeof BoardStateSchema>;
