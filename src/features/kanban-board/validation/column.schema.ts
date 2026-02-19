// src/features/kanban-board/validation/column.schema.ts
import { z } from 'zod';
import { ColumnIdSchema } from './enums';

/**
 * Kanban column configuration
 * Defines the 9 hunting-oriented columns
 */
export const ColumnSchema = z.object({
  /** Column unique ID (from ColumnIdSchema enum) */
  id: ColumnIdSchema,
  
  /** Display title */
  title: z.string().min(1).max(50),
  
  /** Column description (help text) */
  description: z.string().max(200),
  
  /** Display order (0-8 for 9 columns) */
  order: z.number().int().min(0).max(8),
  
  /** Material UI icon name (optional) */
  iconName: z.string().optional(),
  
  /** Column color (for header accent) */
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional()
});

export type Column = z.infer<typeof ColumnSchema>;

/**
 * Default column definitions (9 hunting-oriented columns)
 */
export const DEFAULT_COLUMNS: Column[] = [
  {
    id: 'targets-identified',
    title: 'Targets Identified',
    description: 'Jobs, companies, or teams that look interesting but need research',
    order: 0,
    color: '#9E9E9E'
  },
  {
    id: 'intel-gathering',
    title: 'Intel Gathering',
    description: 'Research phase before any outreach',
    order: 1,
    color: '#2196F3'
  },
  {
    id: 'warm-up-phase',
    title: 'Warm-Up Phase',
    description: 'Building relationships before outreach',
    order: 2,
    color: '#FF9800'
  },
  {
    id: 'outreach-initiated',
    title: 'Outreach Initiated',
    description: 'First contact made',
    order: 3,
    color: '#4CAF50'
  },
  {
    id: 'follow-up-required',
    title: 'Follow-Up Required',
    description: 'Cards needing follow-up action',
    order: 4,
    color: '#F44336'
  },
  {
    id: 'conversation-started',
    title: 'Conversation Started',
    description: 'Active engagement with company',
    order: 5,
    color: '#9C27B0'
  },
  {
    id: 'interview-pipeline',
    title: 'Interview Pipeline',
    description: 'Formal interview process',
    order: 6,
    color: '#3F51B5'
  },
  {
    id: 'stalled-cold',
    title: 'Stalled / Cold',
    description: 'Trail went cold',
    order: 7,
    color: '#607D8B'
  },
  {
    id: 'offer-success',
    title: 'Offer / Success',
    description: 'Offers received or strong leads',
    order: 8,
    color: '#4CAF50'
  }
];
