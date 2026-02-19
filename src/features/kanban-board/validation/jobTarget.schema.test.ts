import { describe, it, expect } from 'vitest';
import { JobTargetSchema, createJobTarget } from './jobTarget.schema';
import type { ColumnId } from './enums';

/**
 * Unit Tests for JobTarget Schema
 * 
 * **Constitutional Compliance (Section VII)**:
 * - Tests written to ensure schema validation catches invalid data
 * - Helper function (createJobTarget) validated to produce schema-compliant data
 * - Edge cases tested (boundary values, special characters, invalid IDs)
 * 
 * **Bug Prevention**:
 * - This test suite would have caught the ID regex validation bug (jt_timestamp_random)
 * - Validates that createJobTarget produces IDs matching the schema pattern
 */

describe('JobTargetSchema', () => {
  describe('ID validation', () => {
    it('should accept valid ID with jt_ prefix and alphanumeric+underscores', () => {
      const validId = 'jt_1708360800000_abc123';
      const result = JobTargetSchema.safeParse({
        id: validId,
        company: 'Test Company',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 0,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(true);
    });

    it('should reject ID without jt_ prefix', () => {
      const result = JobTargetSchema.safeParse({
        id: '1708360800000_abc123',
        company: 'Test Company',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 0,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('ID must start with jt_');
      }
    });

    it('should reject ID with special characters other than underscore', () => {
      const result = JobTargetSchema.safeParse({
        id: 'jt_test-company@123',
        company: 'Test Company',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 0,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(false);
    });
  });

  describe('required fields validation', () => {
    it('should require company name', () => {
      const result = JobTargetSchema.safeParse({
        id: 'jt_123',
        company: '',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 0,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('company');
      }
    });

    it('should reject company name exceeding 100 characters', () => {
      const longName = 'A'.repeat(101);
      const result = JobTargetSchema.safeParse({
        id: 'jt_123',
        company: longName,
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 0,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(false);
    });
  });

  describe('warmUpScore validation', () => {
    it('should accept warmUpScore within 0-100 range', () => {
      const result = JobTargetSchema.safeParse({
        id: 'jt_123',
        company: 'Test Company',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 50,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(true);
    });

    it('should reject warmUpScore below 0', () => {
      const result = JobTargetSchema.safeParse({
        id: 'jt_123',
        company: 'Test Company',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: -1,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(false);
    });

    it('should reject warmUpScore above 100', () => {
      const result = JobTargetSchema.safeParse({
        id: 'jt_123',
        company: 'Test Company',
        columnId: 'targets-identified',
        priority: 'medium',
        tags: [],
        warmUpScore: 101,
        warmUpActions: [],
        outreachRecords: [],
        followUps: [],
        keyPeople: [],
        signals: [],
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
      });
      
      expect(result.success).toBe(false);
    });
  });
});

describe('createJobTarget', () => {
  describe('ID generation', () => {
    it('should generate valid ID matching schema pattern', () => {
      const target = createJobTarget('Test Company');
      
      // Validate against schema
      const result = JobTargetSchema.safeParse(target);
      expect(result.success).toBe(true);
      
      // Validate ID format explicitly
      expect(target.id).toMatch(/^jt_[a-zA-Z0-9_]+$/);
      expect(target.id).toMatch(/^jt_\d+_[a-z0-9]+$/);
    });

    it('should generate unique IDs for different calls', () => {
      const target1 = createJobTarget('Company 1');
      const target2 = createJobTarget('Company 2');
      
      expect(target1.id).not.toBe(target2.id);
    });
  });

  describe('default values', () => {
    it('should set default columnId to targets-identified', () => {
      const target = createJobTarget('Test Company');
      expect(target.columnId).toBe('targets-identified');
    });

    it('should accept custom columnId', () => {
      const target = createJobTarget('Test Company', 'intel-gathering');
      expect(target.columnId).toBe('intel-gathering');
    });

    it('should set default priority to medium', () => {
      const target = createJobTarget('Test Company');
      expect(target.priority).toBe('medium');
    });

    it('should initialize empty arrays for collections', () => {
      const target = createJobTarget('Test Company');
      expect(target.tags).toEqual([]);
      expect(target.warmUpActions).toEqual([]);
      expect(target.outreachRecords).toEqual([]);
      expect(target.followUps).toEqual([]);
      expect(target.keyPeople).toEqual([]);
      expect(target.signals).toEqual([]);
      expect(target.attachments).toEqual([]);
    });

    it('should set warmUpScore to 0', () => {
      const target = createJobTarget('Test Company');
      expect(target.warmUpScore).toBe(0);
    });

    it('should set archived to false', () => {
      const target = createJobTarget('Test Company');
      expect(target.archived).toBe(false);
    });
  });

  describe('timestamps', () => {
    it('should set createdAt and updatedAt to current time', () => {
      const before = new Date().toISOString();
      const target = createJobTarget('Test Company');
      const after = new Date().toISOString();
      
      expect(target.createdAt).toBeDefined();
      expect(target.updatedAt).toBeDefined();
      expect(target.createdAt).toBe(target.updatedAt);
      expect(target.createdAt >= before).toBe(true);
      expect(target.createdAt <= after).toBe(true);
    });

    it('should generate valid ISO 8601 timestamps', () => {
      const target = createJobTarget('Test Company');
      
      // Should be parseable as date
      expect(() => new Date(target.createdAt)).not.toThrow();
      expect(() => new Date(target.updatedAt)).not.toThrow();
      
      // Should match ISO format
      expect(target.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
    });
  });

  describe('schema compliance', () => {
    it('should produce data that passes schema validation', () => {
      const columnIds: ColumnId[] = [
        'targets-identified',
        'intel-gathering',
        'warm-up-phase',
        'outreach-initiated',
        'follow-up-required',
        'conversation-started',
        'interview-pipeline',
        'stalled-cold',
        'offer-success'
      ];

      columnIds.forEach(columnId => {
        const target = createJobTarget(`Company for ${columnId}`, columnId);
        const result = JobTargetSchema.safeParse(target);
        
        expect(result.success).toBe(true);
      });
    });

    it('should handle special characters in company name', () => {
      const specialNames = [
        'Company & Associates',
        "O'Brien Corp",
        'Company (Subsidiary)',
        'Company - Division A',
        'Company, Inc.',
      ];

      specialNames.forEach(name => {
        const target = createJobTarget(name);
        const result = JobTargetSchema.safeParse(target);
        
        expect(result.success).toBe(true);
        expect(target.company).toBe(name);
      });
    });
  });
});
