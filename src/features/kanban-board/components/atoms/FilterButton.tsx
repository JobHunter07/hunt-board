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
      sx={{
        color: activeFilterCount > 0 ? '#c68645' : 'action.active',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Badge
        badgeContent={activeFilterCount}
        color="default"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: activeFilterCount > 0 ? '#c68645' : 'transparent',
            color: activeFilterCount > 0 ? '#fff' : 'transparent',
            fontSize: '0.65rem',
            minWidth: '16px',
            height: '16px',
            padding: '0 4px',
          },
        }}
      >
        <FilterListIcon />
      </Badge>
    </IconButton>
  );
};
