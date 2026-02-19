// src/features/kanban-board/validation/followUp.schema.ts
import { z } from 'zod';

/**
 * Scheduled follow-up action for a job target
 */
export const FollowUpSchema = z.object({
  /** Follow-up unique ID (UUID) */
  id: z.string().uuid(),
  
  /** Scheduled follow-up date (ISO 8601) */
  scheduledDate: z.string().datetime(),
  
  /** Follow-up action description */
  action: z.string().min(1).max(500),
  
  /** Completion status - required, defaults to false */
  completed: z.boolean(),
  
  /** Completion timestamp (if completed) */
  completedAt: z.string().datetime().optional(),
  
  /** Notes after completing follow-up */
  notes: z.string().max(1000).optional()
});

export type FollowUp = z.infer<typeof FollowUpSchema>;
