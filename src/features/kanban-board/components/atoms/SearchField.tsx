// src/features/kanban-board/components/atoms/SearchField.tsx
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
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
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => { clearTimeout(timer); };
  }, [localValue, debounceMs, onChange]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <TextField
      value={localValue}
      onChange={(e) => { setLocalValue(e.target.value); }}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
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
        maxWidth: { xs: '100%', sm: '400px' },
      }}
    />
  );
};
