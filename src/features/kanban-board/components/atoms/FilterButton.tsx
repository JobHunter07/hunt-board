// src/features/kanban-board/components/atoms/FilterButton.tsx
import { IconButton, Badge } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export type FilterButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  activeFilterCount: number;
  disabled?: boolean;
};

/**
 * FilterButton atom - Button to open filter menu
 * 
 * **Constitutional Compliance (Section II)**:
 * - Atom-level component
 * - Material UI only
 * - Shows badge with active filter count
 */
export const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  activeFilterCount,
  disabled = false,
}) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={`Filters${activeFilterCount > 0 ? ` (${String(activeFilterCount)} active)` : ''}`}
      color={activeFilterCount > 0 ? 'primary' : 'default'}
      sx={{
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Badge badgeContent={activeFilterCount} color="primary">
        <FilterListIcon />
      </Badge>
    </IconButton>
  );
};
