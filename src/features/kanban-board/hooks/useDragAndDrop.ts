import { DragEndEvent, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useCallback } from 'react';
import type { ColumnId } from '../types';

export type UseDragAndDropOptions = {
  onDragEnd: (targetId: string, newColumnId: ColumnId) => void;
}

/**
 * useDragAndDrop hook - Manages drag-and-drop state and keyboard navigation
 * 
 * **Accessibility Enhancement (T070)**:
 * - Adds keyboard sensor for drag-and-drop via Arrow keys + Space/Enter
 * - Meets WCAG AA keyboard navigation requirements (TAB-002)
 * - Users can navigate columns with Arrow keys and activate drag with Space/Enter
 */
export function useDragAndDrop({ onDragEnd }: UseDragAndDropOptions) {
  const sensors = useSensors(
    // Mouse/touch drag support
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Require 8px of movement before drag starts
      }
    }),
    // Keyboard drag support (Arrow keys + Space/Enter)
    useSensor(KeyboardSensor)
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
