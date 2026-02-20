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
        gap: 0.5,
        mb: 2,
        pb: 1,
        pr: '80px', // reserve space for absolute window controls (+ − □ ×)
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
          fontSize: { xs: '0.8rem', sm: '0.85rem' },
          color: 'text.primary',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.25,
          flex: 1,
          minWidth: 0,
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
          minWidth: '24px',
          height: '18px',
          fontSize: '0.7rem',
          flexShrink: 0,
        }}
      />
    </Box>
  );
}
