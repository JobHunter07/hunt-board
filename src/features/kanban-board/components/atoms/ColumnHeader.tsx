import { Box, Typography, Chip } from '@mui/material';

export type ColumnHeaderProps = {
  title: string;
  count: number;
  color?: string | undefined;
}

export function ColumnHeader({ title, count, color }: ColumnHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        mb: 2,
        pb: 1,
        borderBottom: color ? `3px solid ${color}` : '3px solid #E0E0E0'
      }}
      role="heading"
      aria-level={2}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.1rem' },
          color: 'text.primary'
        }}
      >
        {title}
      </Typography>
      <Chip
        label={count}
        size="small"
        aria-label={`${String(count)} targets in this column`}
        sx={{
          backgroundColor: color ?? '#E0E0E0',
          color: '#FFFFFF',
          fontWeight: 600,
          minWidth: '28px'
        }}
      />
    </Box>
  );
}
