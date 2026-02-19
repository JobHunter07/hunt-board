// src/features/kanban-board/validation/jobTarget.schema.ts
import { z } from 'zod';
import { PrioritySchema, ColumnIdSchema, StateReasonSchema, InterviewStageSchema, type ColumnId } from './enums';
import { FollowUpSchema } from './followUp.schema';
import { OutreachRecordSchema } from './outreachRecord.schema';
import { WarmUpActionSchema } from './warmUpAction.schema';

/**
 * Core job target entity (Kanban card)
 */
export const JobTargetSchema = z.object({
  /** Unique job target ID (prefixed: jt_) */
  id: z.string().regex(/^jt_[a-zA-Z0-9]+$/, 'ID must start with jt_'),
  
  /** Company name (required) */
  company: z.string().min(1).max(100),
  
  /** Role title (optional for early-stage targets) */
  role: z.string().max(100).optional(),
  
  /** Why this is a target */
  targetReason: z.string().max(500).optional(),
  
  /** Source of the lead (e.g., "LinkedIn post", "Referral from Jane") */
  source: z.string().max(200).optional(),
  
  /** Current column ID */
  columnId: ColumnIdSchema,
  
  /** Priority level (required, defaults to 'medium' in createJobTarget) */
  priority: PrioritySchema,
  
  /** Tags (array of tag IDs) - required, defaults to [] in createJobTarget */
  tags: z.array(z.string()),
  
  /** Warm-up score (0-100) - required, defaults to 0 in createJobTarget */
  warmUpScore: z.number().int().min(0).max(100),
  
  /** Warm-up actions taken - required, defaults to [] in createJobTarget */
  warmUpActions: z.array(WarmUpActionSchema),
  
  /** Outreach attempts - required, defaults to [] in createJobTarget */
  outreachRecords: z.array(OutreachRecordSchema),
  
  /** Scheduled follow-ups - required, defaults to [] in createJobTarget */
  followUps: z.array(FollowUpSchema),
  
  /** Next follow-up date (denormalized for quick access) */
  nextFollowUpDate: z.string().datetime().optional(),
  
  /** Interview stage (if in interview pipeline) */
  interviewStage: InterviewStageSchema.optional(),
  
  /** Interview dates and feedback */
  interviewNotes: z.string().max(2000).optional(),
  
  /** Key people identified (hiring manager, team members) - required, defaults to [] in createJobTarget */
  keyPeople: z.array(z.object({
    name: z.string().max(100),
    role: z.string().max(100).optional(),
    linkedInUrl: z.string().url().optional(),
    notes: z.string().max(500).optional()
  })),
  
  /** General notes */
  notes: z.string().max(5000).optional(),
  
  /** Signals (profile views, post likes, etc.) - required, defaults to [] in createJobTarget */
  signals: z.array(z.object({
    type: z.enum(['profile-view', 'post-like', 'connection-accept', 'message', 'other']),
    date: z.string().datetime(),
    description: z.string().max(200).optional()
  })),
  
  /** State reason (for stalled/closed targets) */
  stateReason: StateReasonSchema.optional(),
  
  /** Attachments (file URLs or base64) - required, defaults to [] in createJobTarget */
  attachments: z.array(z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
    type: z.enum(['image', 'pdf', 'url']),
    url: z.string().max(500),
    uploadedAt: z.string().datetime()
  })),
  
  /** Creation timestamp */
  createdAt: z.string().datetime(),
  
  /** Last update timestamp */
  updatedAt: z.string().datetime(),
  
  /** Archived status - required, defaults to false in createJobTarget */
  archived: z.boolean()
});

export type JobTarget = z.infer<typeof JobTargetSchema>;

/**
 * Validation helper: Create new job target with defaults
 */
export const createJobTarget = (company: string, columnId: ColumnId = 'targets-identified'): JobTarget => {
  const now = new Date().toISOString();
  const id = `jt_${String(Date.now())}_${Math.random().toString(36).substring(2, 9)}`;
  
  return JobTargetSchema.parse({
    id,
    company,
    columnId,
    priority: 'medium',
    tags: [],
    warmUpScore: 0,
    warmUpActions: [],
    outreachRecords: [],
    followUps: [],
    keyPeople: [],
    signals: [],
    attachments: [],
    createdAt: now,
    updatedAt: now,
    archived: false
  });
};
