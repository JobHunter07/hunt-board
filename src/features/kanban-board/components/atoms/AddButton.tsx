import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export type AddButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'icon-only' | 'text-icon';
}

export function AddButton({ onClick, disabled = false, variant = 'text-icon' }: AddButtonProps) {
  const isIconOnly = variant === 'icon-only';

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outlined"
      startIcon={<AddIcon />}
      fullWidth
      sx={{
        borderStyle: 'dashed',
        borderWidth: 2,
        py: 1,
        color: 'primary.main',
        borderColor: 'primary.main',
        '&:hover': {
          borderColor: 'primary.dark',
          backgroundColor: 'rgba(183, 28, 28, 0.04)'
        },
        '&.Mui-disabled': {
          borderColor: 'action.disabled',
          color: 'action.disabled'
        },
        ...(isIconOnly && {
          minWidth: 'auto',
          px: 1.5,
          '& .MuiButton-startIcon': {
            margin: 0
          }
        })
      }}
    >
      {!isIconOnly && 'Add Target'}
    </Button>
  );
}
