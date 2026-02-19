// src/features/kanban-board/validation/outreachRecord.schema.ts
import { z } from 'zod';
import { OutreachTypeSchema } from './enums';

/**
 * Record of outreach attempt to company/hiring manager
 */
export const OutreachRecordSchema = z.object({
  /** Outreach unique ID (UUID) */
  id: z.string().uuid(),
  
  /** Type of outreach */
  type: OutreachTypeSchema,
  
  /** Date outreach was sent */
  sentDate: z.string().datetime(),
  
  /** Person contacted (optional) */
  contactPerson: z.string().max(100).optional(),
  
  /** Message template used (optional) */
  messageTemplate: z.string().max(50).optional(),
  
  /** Whether a referral was involved - required, defaults to false */
  hasReferral: z.boolean(),
  
  /** Referrer name (if hasReferral = true) */
  referrerName: z.string().max(100).optional(),
  
  /** Response received? - required, defaults to false */
  responseReceived: z.boolean(),
  
  /** Response date (if responseReceived = true) */
  responseDate: z.string().datetime().optional(),
  
  /** Notes about outreach/response */
  notes: z.string().max(1000).optional()
});

export type OutreachRecord = z.infer<typeof OutreachRecordSchema>;
