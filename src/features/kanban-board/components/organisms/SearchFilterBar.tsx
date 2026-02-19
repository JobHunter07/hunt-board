// src/features/kanban-board/components/organisms/SearchFilterBar.tsx
import {
  Box,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
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
  /** Optional handler invoked when user clicks Add Target in header */
  onAddTarget?: () => void;
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
  onAddTarget,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <>
      {/*
       * Layout strategy using a single DOM order that works for both breakpoints:
       * DOM order:  [Add Target Button][FilterButton][SearchField]
       *
       * sm+ (row-reverse):     Search | Filter | Add Target  ← right-aligned, expands left
       * xs  (column-reverse):  Search (top) → Filter → Add Target (bottom)  ← full-width stack
       *
       * On mobile, compact=false so SearchField fills full width.
       * On desktop, compact=true so SearchField collapses to 160px and expands to 300px on focus.
       */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row-reverse' },
          alignItems: { xs: 'stretch', sm: 'center' },
          width: { xs: '100%', sm: 'auto' },
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={onAddTarget}
          sx={{
            backgroundColor: '#c68645',
            color: 'common.white',
            '&:hover': {
              backgroundColor: '#8b5e34',
            },
            textTransform: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          + Add Target
        </Button>
        <FilterButton
          onClick={handleFilterClick}
          activeFilterCount={activeFilterCount}
        />
        <SearchField value={searchQuery} onChange={onSearchChange} compact={!isMobile} />
      </Box>

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
    </>
  );
};
