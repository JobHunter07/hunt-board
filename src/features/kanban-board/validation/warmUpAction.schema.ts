// src/features/kanban-board/validation/warmUpAction.schema.ts
import { z } from 'zod';
import { WarmUpActionTypeSchema } from './enums';

/**
 * Warm-up action taken before outreach (relationship building)
 */
export const WarmUpActionSchema = z.object({
  /** Action unique ID (UUID) */
  id: z.string().uuid(),
  
  /** Type of warm-up action */
  type: WarmUpActionTypeSchema,
  
  /** Date action was taken */
  actionDate: z.string().datetime(),
  
  /** Person targeted by action (e.g., hiring manager) */
  targetPerson: z.string().max(100).optional(),
  
  /** Description of action taken */
  description: z.string().max(500),
  
  /** Impact score (0-100) for warm-up score calculation - required, defaults to 10 */
  impactScore: z.number().int().min(0).max(100)
});

export type WarmUpAction = z.infer<typeof WarmUpActionSchema>;
