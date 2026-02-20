import { memo } from 'react';
import { Card, CardContent, Typography, Box, Stack, IconButton, Chip, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { PriorityIndicator } from '../atoms/PriorityIndicator';
import { TagChip } from '../atoms/TagChip';
import type { JobTarget } from '@/features/kanban-board/types';

export type JobTargetCardProps = {
  jobTarget: JobTarget;
  onClick?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Custom comparison function for React.memo
 * Only re-render if card ID or updatedAt timestamp changes
 * 
 * **Performance Optimization (T064)**:
 * - Prevents unnecessary re-renders when other cards update
 * - Compares only essential props: jobTarget.id and jobTarget.updatedAt
 * - Callback props (onClick, onEdit, onDelete) should be memoized in parent
 */
function arePropsEqual(prevProps: JobTargetCardProps, nextProps: JobTargetCardProps): boolean {
  return (
    prevProps.jobTarget.id === nextProps.jobTarget.id &&
    prevProps.jobTarget.updatedAt === nextProps.jobTarget.updatedAt
  );
}

const JobTargetCardComponent = ({ jobTarget, onClick, onEdit, onDelete }: JobTargetCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: jobTarget.id
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : onClick ? 'pointer' : 'grab'
  };

  const handleCardClick = () => {
    // Only trigger onClick if not dragging and handler exists
    if (onClick && !isDragging) {
      onClick();
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleCardClick}
      elevation={2}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        {/* Company and Role */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5, fontSize: '0.85rem' }}>
            {jobTarget.company}
          </Typography>
          {jobTarget.role && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              {jobTarget.role}
            </Typography>
          )}
        </Box>

        {/* Priority and Warm-Up Score */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <PriorityIndicator priority={jobTarget.priority} />
          {jobTarget.warmUpScore > 0 && (
            <Chip
              label={`${String(jobTarget.warmUpScore)}%`}
              size="small"
              sx={{
                backgroundColor: '#FF9800',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: '20px'
              }}
            />
          )}
        </Stack>

        {/* Tags */}
        {jobTarget.tags.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mb: 1 }}>
            {jobTarget.tags.slice(0, 3).map((tagId) => (
              <TagChip key={tagId} label={tagId} />
            ))}
            {jobTarget.tags.length > 3 && (
              <Chip label={`+${String(jobTarget.tags.length - 3)}`} size="small" />
            )}
          </Stack>
        )}

        {/* Action Buttons */}
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Tooltip title="Edit target" placement="top" arrow>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              sx={{ color: 'primary.main' }}
              aria-label="Edit target"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete target" placement="top" arrow>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              sx={{ color: 'error.main' }}
              aria-label="Delete target"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * JobTargetCard with React.memo optimization
 * 
 * **Constitutional Compliance (Section II)**:
 * - Organism-level component
 * - Material UI only
 * - Draggable via @dnd-kit
 * - Memoized for performance
 */
export const JobTargetCard = memo(JobTargetCardComponent, arePropsEqual);
