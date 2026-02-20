import { useCallback } from 'react';
import { BoardStateSchema, type BoardState } from '../validation/boardState.schema';
import { DEFAULT_COLUMNS } from '../validation/column.schema';
import { createJobTarget } from '../validation/jobTarget.schema';
import type { ColumnId } from '../types';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_BOARD_STATE: BoardState = {
  schemaVersion: 'v1.0.0',
  jobTargets: [],
  columns: DEFAULT_COLUMNS,
  tags: [],
  lastUpdated: new Date().toISOString()
};

export const BOARD_STORAGE_KEY = 'hunt-board:board-state';

export function useBoardState(storageKey: string = BOARD_STORAGE_KEY) {
  const [boardState, setBoardState] = useLocalStorage(
    storageKey,
    DEFAULT_BOARD_STATE,
    BoardStateSchema
  );

  const addJobTarget = useCallback((company: string, columnId: ColumnId) => {
    const newTarget = createJobTarget(company, columnId);
    setBoardState((prev) => ({
      ...prev,
      jobTargets: [...(prev.jobTargets ?? []), newTarget],
      lastUpdated: new Date().toISOString()
    }));
    return newTarget.id;
  }, [setBoardState]);

  const updateJobTarget = useCallback((targetId: string, updates: Partial<BoardState['jobTargets'][0]>) => {
    setBoardState((prev) => ({
      ...prev,
      jobTargets: (prev.jobTargets ?? []).map((target) =>
        target.id === targetId
          ? { ...target, ...updates, updatedAt: new Date().toISOString() }
          : target
      ),
      lastUpdated: new Date().toISOString()
    }));
  }, [setBoardState]);

  const deleteJobTarget = useCallback((targetId: string) => {
    setBoardState((prev) => ({
      ...prev,
      jobTargets: (prev.jobTargets ?? []).filter((target) => target.id !== targetId),
      lastUpdated: new Date().toISOString()
    }));
  }, [setBoardState]);

  const moveJobTarget = useCallback((targetId: string, newColumnId: ColumnId) => {
    setBoardState((prev) => ({
      ...prev,
      jobTargets: (prev.jobTargets ?? []).map((target) =>
        target.id === targetId
          ? { ...target, columnId: newColumnId, updatedAt: new Date().toISOString() }
          : target
      ),
      lastUpdated: new Date().toISOString()
    }));
  }, [setBoardState]);

  const getTargetsByColumn = useCallback((columnId: ColumnId) => {
    return (boardState.jobTargets ?? []).filter((target) => target.columnId === columnId);
  }, [boardState.jobTargets]);

  return {
    boardState,
    addJobTarget,
    updateJobTarget,
    deleteJobTarget,
    moveJobTarget,
    getTargetsByColumn
  };
}
