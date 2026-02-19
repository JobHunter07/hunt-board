// src/features/kanban-board/components/atoms/SearchField.tsx
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect, useCallback } from 'react';

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
  /** When true the field renders compact and expands on focus */
  compact?: boolean;
};

/**
 * SearchField atom - Debounced search input
 * 
 * **Constitutional Compliance (Section II)**:
 * - Atom-level component
 * - Material UI only
 * - Responsive behavior
 * 
 * **User Story 4 Requirements**:
 * - Debounced onChange (300ms default)
 * - Clear button
 * - Full width mobile, constrained desktop
 */
export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Search targets...',
  debounceMs = 300,
  disabled = false,
  compact = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => { clearTimeout(timer); };
  }, [localValue, debounceMs, onChange]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  // Neutral grey used for focus ring so it never turns red
  const FOCUS_COLOR = 'rgba(0, 0, 0, 0.38)';

  return (
    /*
     * Outer Box is always the MAX expanded width so it never shifts the layout.
     * justify-content: flex-end anchors the right edge; only the left edge moves
     * as the inner TextField widens on focus.
     */
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: compact ? '300px' : '100%',
      flexShrink: 0,
    }}>
      <TextField
        value={localValue}
        onChange={(e) => { setLocalValue(e.target.value); }}
        onFocus={() => { setFocused(true); }}
        onBlur={() => { setFocused(false); }}
        placeholder={placeholder}
        disabled={disabled}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
            </InputAdornment>
          ),
          endAdornment: localValue ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} aria-label="Clear search">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          width: compact ? (focused ? '300px' : '160px') : '100%',
          transition: 'width 200ms ease',
          /* Override red primary focus color throughout */
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: FOCUS_COLOR,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: FOCUS_COLOR,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: FOCUS_COLOR,
          },
        }}
      />
    </Box>
  );
};
