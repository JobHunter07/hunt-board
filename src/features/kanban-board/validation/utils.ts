// src/features/kanban-board/validation/utils.ts
import { z } from 'zod';

/**
 * Validate and parse data with Zod schema
 * Throws ZodError if validation fails
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safe validation (returns result object)
 */
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Extract error messages from ZodError
 */
export function extractZodErrors(error: z.ZodError): string[] {
  return error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
}
