// src/features/kanban-board/validation/tag.schema.ts
import { z } from 'zod';

/**
 * Tag for categorizing job targets
 */
export const TagSchema = z.object({
  /** Unique tag ID (UUID) */
  id: z.string().uuid(),
  
  /** Display label */
  label: z.string().min(1).max(30),
  
  /** Tag color (hex) */
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/)
});

export type Tag = z.infer<typeof TagSchema>;

/**
 * Validation helper: Create new tag with defaults
 */
export const createTag = (label: string, color = '#9E9E9E'): Tag => {
  return TagSchema.parse({
    id: crypto.randomUUID(),
    label,
    color
  });
};
