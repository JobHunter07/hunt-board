// src/features/kanban-board/hooks/useCardFilters.ts
import { useState, useMemo } from 'react';
import type { JobTarget, Priority } from '../types';

export type CardFilters = {
  searchQuery: string;
  selectedPriorities: Priority[];
  selectedTags: string[];
  hasFollowUp: boolean;
};

export const useCardFilters = (allCards: JobTarget[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasFollowUp, setHasFollowUp] = useState(false);

  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      // Search filter (company or role)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCompany = card.company.toLowerCase().includes(query);
        const matchesRole = card.role?.toLowerCase().includes(query);
        if (!matchesCompany && !matchesRole) {
          return false;
        }
      }

      // Priority filter
      if (selectedPriorities.length > 0) {
        if (!selectedPriorities.includes(card.priority)) {
          return false;
        }
      }

      // Tag filter
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some((tag) => card.tags.includes(tag));
        if (!hasSelectedTag) {
          return false;
        }
      }

      // Follow-up filter
      if (hasFollowUp) {
        if (!card.nextFollowUpDate || card.followUps.length === 0) {
          return false;
        }
      }

      return true;
    });
  }, [allCards, searchQuery, selectedPriorities, selectedTags, hasFollowUp]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedPriorities.length > 0) count++;
    if (selectedTags.length > 0) count++;
    if (hasFollowUp) count++;
    return count;
  }, [searchQuery, selectedPriorities, selectedTags, hasFollowUp]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedPriorities([]);
    setSelectedTags([]);
    setHasFollowUp(false);
  };

  return {
    // Filter state
    searchQuery,
    selectedPriorities,
    selectedTags,
    hasFollowUp,
    // State setters
    setSearchQuery,
    setSelectedPriorities,
    setSelectedTags,
    setHasFollowUp,
    // Computed
    filteredCards,
    activeFilterCount,
    clearAllFilters,
  };
};
