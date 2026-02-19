// src/features/kanban-board/components/organisms/SearchFilterBar.tsx
import {
  Box,
  Stack,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { SearchField } from '../atoms/SearchField';
import { FilterButton } from '../atoms/FilterButton';
import type { Priority } from '../../types';

export type SearchFilterBarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPriorities: Priority[];
  onPrioritiesChange: (priorities: Priority[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  hasFollowUp: boolean;
  onFollowUpChange: (value: boolean) => void;
  availableTags: string[];
  activeFilterCount: number;
  onClearAll: () => void;
};

/**
 * SearchFilterBar organism - Combined search and filter controls
 * 
 * **Constitutional Compliance (Section II)**:
 * - Organism-level component
 * - Material UI only
 * - Responsive layout (stacked mobile, horizontal desktop)
 * 
 * **User Story 4 Requirements**:
 * - Search field with debounce
 * - Filter button with badge
 * - Filter menu with checkboxes for Priorities, Tags, Follow-Up
 * - Clear all button
 */
export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedPriorities,
  onPrioritiesChange,
  selectedTags,
  onTagsChange,
  hasFollowUp,
  onFollowUpChange,
  availableTags,
  activeFilterCount,
  onClearAll,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityToggle = (priority: Priority) => {
    if (selectedPriorities.includes(priority)) {
      onPrioritiesChange(selectedPriorities.filter((p) => p !== priority));
    } else {
      onPrioritiesChange([...selectedPriorities, priority]);
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <SearchField value={searchQuery} onChange={onSearchChange} />
        <FilterButton
          onClick={handleFilterClick}
          activeFilterCount={activeFilterCount}
        />
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleFilterClose}
        PaperProps={{
          sx: { minWidth: 250, maxWidth: 350 },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Priorities
          </Typography>
          <FormGroup>
            {(['low', 'medium', 'high'] as const).map((priority) => (
              <FormControlLabel
                key={priority}
                control={
                  <Checkbox
                    checked={selectedPriorities.includes(priority)}
                    onChange={() => { handlePriorityToggle(priority); }}
                    size="small"
                  />
                }
                label={priority.charAt(0).toUpperCase() + priority.slice(1)}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider />

        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Tags
          </Typography>
          {availableTags.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No tags available
            </Typography>
          ) : (
            <FormGroup>
              {availableTags.slice(0, 5).map((tag) => (
                <FormControlLabel
                  key={tag}
                  control={
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onChange={() => { handleTagToggle(tag); }}
                      size="small"
                    />
                  }
                  label={tag}
                />
              ))}
            </FormGroup>
          )}
        </Box>

        <Divider />

        <Box sx={{ px: 2, py: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasFollowUp}
                  onChange={(e) => { onFollowUpChange(e.target.checked); }}
                  size="small"
                />
              }
              label="Has Follow-Up"
            />
          </FormGroup>
        </Box>

        <Divider />

        <MenuItem onClick={() => { onClearAll(); handleFilterClose(); }}>
          <Button fullWidth variant="outlined" size="small">
            Clear All Filters
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};
