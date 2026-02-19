import { Chip } from '@mui/material';

export type TagChipProps = {
  label: string;
  color?: string;
  onDelete?: (event: unknown) => void;
  disabled?: boolean;
}

export function TagChip({ label, color = '#9E9E9E', onDelete, disabled = false }: TagChipProps) {
  const chipProps = {
    label,
    size: 'small' as const,
    disabled,
    sx: {
      backgroundColor: color,
      color: '#FFFFFF',
      fontWeight: 500,
      borderRadius: 1,
      '& .MuiChip-deleteIcon': {
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.9)'
        }
      }
    },
    ...(onDelete ? { onDelete } : {})
  };

  return <Chip {...chipProps} />;
}
