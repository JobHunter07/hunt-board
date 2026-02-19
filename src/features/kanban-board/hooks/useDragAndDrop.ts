import { DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useCallback } from 'react';
import type { ColumnId } from '../types';

export type UseDragAndDropOptions = {
  onDragEnd: (targetId: string, newColumnId: ColumnId) => void;
}

export function useDragAndDrop({ onDragEnd }: UseDragAndDropOptions) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Require 8px of movement before drag starts
      }
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const targetId = active.id as string;
    const newColumnId = over.id as ColumnId;

    onDragEnd(targetId, newColumnId);
  }, [onDragEnd]);

  return {
    sensors,
    handleDragEnd
  };
}
