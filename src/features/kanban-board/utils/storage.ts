// src/features/kanban-board/utils/storage.ts
import { BoardStateSchema, type BoardState } from '../validation/boardState.schema';
import { UserPreferencesSchema, type UserPreferences } from '../validation/userPreferences.schema';
import { DEFAULT_COLUMNS } from '../validation/column.schema';

const STORAGE_KEYS = {
  BOARD_STATE: 'hunt-board:board-state',
  USER_PREFS: 'hunt-board:user-prefs'
} as const;

/**
 * Load board state from localStorage with Zod validation
 */
export function loadBoardState(): BoardState {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BOARD_STATE);
    if (!stored) {
      // Return default state
      return BoardStateSchema.parse({
        schemaVersion: 'v1.0.0',
        jobTargets: [],
        columns: DEFAULT_COLUMNS,
        tags: [],
        lastUpdated: new Date().toISOString()
      });
    }
    
    const parsed = JSON.parse(stored) as unknown;
    return BoardStateSchema.parse(parsed); // Zod validation
  } catch (error) {
    console.error('[Storage] Failed to load board state:', error);
    // Fallback to empty state
    return BoardStateSchema.parse({
      schemaVersion: 'v1.0.0',
      jobTargets: [],
      columns: DEFAULT_COLUMNS,
      tags: [],
      lastUpdated: new Date().toISOString()
    });
  }
}

/**
 * Save board state to localStorage with Zod validation
 */
export function saveBoardState(state: BoardState): void {
  try {
    const validated = BoardStateSchema.parse(state); // Validate before saving
    const serialized = JSON.stringify(validated);
    localStorage.setItem(STORAGE_KEYS.BOARD_STATE, serialized);
  } catch (error) {
    console.error('[Storage] Failed to save board state:', error);
    throw new Error('Failed to save board state');
  }
}

/**
 * Load user preferences from localStorage
 */
export function loadUserPreferences(): UserPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFS);
    if (!stored) {
      return UserPreferencesSchema.parse({});
    }
    
    const parsed = JSON.parse(stored) as unknown;
    return UserPreferencesSchema.parse(parsed);
  } catch (error) {
    console.error('[Storage] Failed to load user preferences:', error);
    return UserPreferencesSchema.parse({});
  }
}

/**
 * Save user preferences to localStorage
 */
export function saveUserPreferences(prefs: UserPreferences): void {
  try {
    const validated = UserPreferencesSchema.parse(prefs);
    const serialized = JSON.stringify(validated);
    localStorage.setItem(STORAGE_KEYS.USER_PREFS, serialized);
  } catch (error) {
    console.error('[Storage] Failed to save user preferences:', error);
  }
}
