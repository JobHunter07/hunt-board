import { memo, useState } from 'react';
import { Paper, Stack, Box, Tooltip } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import CloseIcon from '@mui/icons-material/Close';
import { ColumnHeader } from '../atoms/ColumnHeader';
import type { Column, JobTarget } from '@/features/kanban-board/types';
import { JobTargetCard, type JobTargetCardProps } from './JobTargetCard';

export type KanbanColumnProps = {
  column: Column;
  jobTargets: JobTarget[];
  onAddTarget: () => void;
  onCardClick?: (target: JobTarget) => void;
  onEditTarget: (targetId: string) => void;
  onDeleteTarget: (targetId: string) => void;
  onClose?: () => void;
}

/**
 * Custom comparison function for React.memo
 * Only re-render if column data or jobTargets change
 * 
 * **Performance Optimization (T065)**:
 * - Prevents re-renders when other columns update
 * - Checks column.id and jobTargets array reference
 * - Deep equality check on jobTarget IDs and updatedAt timestamps
 * - Callback props should be memoized in parent
 */
function arePropsEqual(prevProps: KanbanColumnProps, nextProps: KanbanColumnProps): boolean {
  // Column ID changed?
  if (prevProps.column.id !== nextProps.column.id) {
    return false;
  }

  // Number of targets changed?
  if (prevProps.jobTargets.length !== nextProps.jobTargets.length) {
    return false;
  }

  // Check if any target changed (by ID or updatedAt)
  for (let i = 0; i < prevProps.jobTargets.length; i++) {
    const prevTarget = prevProps.jobTargets[i];
    const nextTarget = nextProps.jobTargets[i];
    
    if (!prevTarget || !nextTarget) {
      return false;
    }

    if (
      prevTarget.id !== nextTarget.id ||
      prevTarget.updatedAt !== nextTarget.updatedAt
    ) {
      return false;
    }
  }

  return true;
}

const KanbanColumnComponent = ({
  column,
  jobTargets,
  onAddTarget,
  onCardClick,
  onEditTarget,
  onDeleteTarget,
  onClose,
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const handleMinimize = () => {
    setMinimized((prev) => !prev);
    if (maximized) setMaximized(false);
  };

  const handleMaximize = () => {
    setMaximized((prev) => !prev);
    if (minimized) setMinimized(false);
  };

  return (
    <Paper
      elevation={1}
      role="region"
      aria-label={`${column.title} column`}
      sx={{
        position: 'relative',
        flex: minimized ? '0 0 28px' : maximized ? '2 1 500px' : '1 1 250px',
        minWidth: minimized ? '28px' : maximized ? { xs: '100%', sm: '500px' } : { xs: '100%', sm: '250px' },
        maxWidth: minimized ? '28px' : maximized ? { xs: '100%', sm: '700px' } : undefined,
        width: minimized ? '28px' : { xs: '100%', sm: 'auto' },
        p: minimized ? '4px 0' : 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        maxHeight: maximized ? 'calc(100vh - 80px)' : 'calc(100vh - 120px)',
        transition: 'flex 0.2s, min-width 0.2s, max-width 0.2s, width 0.2s',
        alignSelf: 'flex-start',
      }}
    >
      {/* Windows-style controls — stacked vertically when minimized, horizontal otherwise */}
      <Box
        sx={{
          position: minimized ? 'static' : 'absolute',
          top: minimized ? undefined : 4,
          right: minimized ? undefined : 4,
          display: 'flex',
          flexDirection: minimized ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: minimized ? 'flex-start' : undefined,
          gap: '1px',
          zIndex: 1,
          pt: minimized ? '4px' : 0,
        }}
      >
        {([
          ...(!minimized ? [{
            icon: <AddIcon sx={{ fontSize: '0.75rem' }} />,
            onClick: onAddTarget,
            label: 'Add new Target',
            hoverBg: 'rgba(0,0,0,0.12)',
            hoverColor: 'text.primary',
          }] : []),
          {
            icon: <RemoveIcon sx={{ fontSize: '0.75rem' }} />,
            onClick: handleMinimize,
            label: minimized ? 'Restore column' : 'Minimize column',
            hoverBg: 'rgba(0,0,0,0.12)',
            hoverColor: 'text.primary',
          },
          ...(!minimized ? [{
            icon: maximized
              ? <FilterNoneIcon sx={{ fontSize: '0.65rem' }} />
              : <CropSquareIcon sx={{ fontSize: '0.75rem' }} />,
            onClick: handleMaximize,
            label: maximized ? 'Restore column size' : 'Maximize column',
            hoverBg: 'rgba(0,0,0,0.12)',
            hoverColor: 'text.primary',
          }] : []),
          {
            icon: <CloseIcon sx={{ fontSize: '0.75rem' }} />,
            onClick: onClose,
            label: 'Close column (resets on refresh)',
            hoverBg: '#C42B1C',
            hoverColor: '#FFFFFF',
          },
        ] as const).map(({ icon, onClick, label, hoverBg, hoverColor }) => (
          <Tooltip key={label} title={label} placement="top" arrow>
            <Box
              component="button"
              onClick={onClick}
              aria-label={label}
              sx={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'text.secondary',
                borderRadius: '3px',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                transition: 'background 0.12s, color 0.12s',
                '&:hover': { backgroundColor: hoverBg, color: hoverColor },
              }}
            >
              {icon}
            </Box>
          </Tooltip>
        ))}
      </Box>

      {!minimized && (
        <>
        <Box sx={{ mt: '18px' }}>
          <ColumnHeader
            title={column.title}
            count={jobTargets.length}
            color={column.color}
          />
        </Box>
      
        <Stack
          ref={setNodeRef}
          role="list"
          aria-label={`Job targets in ${column.title}`}
          spacing={1}
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            mb: 0,
            minHeight: '81px',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px'
            }
          }}
        >
        {jobTargets.map((target) => {
          const cardProps: JobTargetCardProps = {
            jobTarget: target,
            onEdit: () => { onEditTarget(target.id); },
            onDelete: () => { onDeleteTarget(target.id); },
          };
          
          if (onCardClick) {
            cardProps.onClick = () => { onCardClick(target); };
          }
          
          return (
            <div key={target.id} role="listitem">
              <JobTargetCard {...cardProps} />
            </div>
          );
        })}
      </Stack>
        </>
      )}
    </Paper>
  );
};

/**
 * KanbanColumn with React.memo optimization
 * 
 * **Constitutional Compliance (Section II)**:
 * - Organism-level component
 * - Material UI only
 * - Droppable area via @dnd-kit
 * - Memoized for performance
 */
export const KanbanColumn = memo(KanbanColumnComponent, arePropsEqual);
