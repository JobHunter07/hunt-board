import { z } from 'zod';

/**
 * Priority levels for job targets
 */
export const PrioritySchema = z.enum(['low', 'medium', 'high']);
export type Priority = z.infer<typeof PrioritySchema>;

/**
 * Predefined column IDs matching the 9 hunting-oriented columns
 */
export const ColumnIdSchema = z.enum([
  'targets-identified',
  'intel-gathering',
  'warm-up-phase',
  'outreach-initiated',
  'follow-up-required',
  'conversation-started',
  'interview-pipeline',
  'stalled-cold',
  'offer-success',
]);
export type ColumnId = z.infer<typeof ColumnIdSchema>;

/**
 * Outreach types for tracking contact methods
 */
export const OutreachTypeSchema = z.enum([
  'dm',
  'email',
  'referral-request',
  'recruiter-contact',
  'application-submitted',
  'cold-call',
  'networking-event',
]);
export type OutreachType = z.infer<typeof OutreachTypeSchema>;

/**
 * Warm-up action types for relationship building
 */
export const WarmUpActionTypeSchema = z.enum([
  'follow-linkedin',
  'engage-post',
  'comment',
  'join-community',
  'attend-event',
  'read-content',
  'share-content',
]);
export type WarmUpActionType = z.infer<typeof WarmUpActionTypeSchema>;

/**
 * State reason for closed/stalled targets
 */
export const StateReasonSchema = z
  .enum([
    'hired-elsewhere',
    'role-frozen',
    'no-response',
    'not-interested',
    'offer-accepted',
    'offer-declined',
    'company-not-fit',
    'timeline-mismatch',
  ])
  .optional();
export type StateReason = z.infer<typeof StateReasonSchema>;

/**
 * Interview pipeline stages
 */
export const InterviewStageSchema = z.enum([
  'screening',
  'technical',
  'team-interview',
  'hiring-manager',
  'final-round',
  'offer-pending',
]);
export type InterviewStage = z.infer<typeof InterviewStageSchema>;
