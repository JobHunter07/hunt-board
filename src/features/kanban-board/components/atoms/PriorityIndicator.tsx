import { Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import type { Priority } from '@/features/kanban-board/types';

export type PriorityIndicatorProps = {
  priority: Priority;
  size?: 'small' | 'medium' | 'large';
}

const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#F44336',
  medium: '#FF9800',
  low: '#9E9E9E'
};

export function PriorityIndicator({ priority, size = 'small' }: PriorityIndicatorProps) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label={`Priority: ${priority}`}
      role="img"
    >
      <CircleIcon
        sx={{ color: PRIORITY_COLORS[priority] }}
        fontSize={size}
      />
    </Box>
  );
}
