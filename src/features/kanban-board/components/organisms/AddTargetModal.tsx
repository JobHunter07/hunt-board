import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Chip,
  Box,
  FormHelperText,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { PrioritySchema, ColumnIdSchema } from '../../validation/enums';
import type { ColumnId } from '../../types';
import { DEFAULT_COLUMNS } from '../../validation/column.schema';

/**
 * Form data schema for creating a new job target
 * 
 * **Accessibility Features (T071)**:
 * - Focus trap: Material UI Dialog automatically traps focus within the modal
 * - Focus is returned to triggering element when modal closes
 * - Keyboard navigation: Tab cycles through form fields
 * - Escape key closes modal
 * - Screen reader support: Dialog has proper ARIA labels and landmarks
 */
 */
const AddTargetFormSchema = z.object({
  company: z.string().min(1, 'Company name is required').max(100, 'Company name too long'),
  role: z.string().max(100, 'Role too long').optional(),
  targetReason: z.string().max(500, 'Reason too long').optional(),
  source: z.string().max(200, 'Source too long').optional(),
  columnId: ColumnIdSchema,
  priority: PrioritySchema,
});

export type AddTargetFormData = z.infer<typeof AddTargetFormSchema>;

export type AddTargetModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddTargetFormData) => void;
  defaultColumnId?: ColumnId;
}

export function AddTargetModal({
  open,
  onClose,
  onSubmit,
  defaultColumnId = 'targets-identified',
}: AddTargetModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTargetFormData>({
    resolver: zodResolver(AddTargetFormSchema),
    defaultValues: {
      company: '',
      role: '',
      targetReason: '',
      source: '',
      columnId: defaultColumnId,
      priority: 'medium',
    },
  });

  const handleClose = () => {
    reset();
    setTags([]);
    setTagInput('');
    onClose();
  };

  const handleFormSubmit = (data: AddTargetFormData) => {
    onSubmit(data);
    handleClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        Add New Target
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ ml: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form
        onSubmit={(e) => {
          void handleSubmit(handleFormSubmit)(e);
        }}
      >
        <DialogContent dividers>
          <Stack spacing={3}>
            {/* Company (required) */}
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company"
                  required
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  autoFocus={!fullScreen}
                />
              )}
            />

            {/* Role (optional) */}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Role"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  placeholder="e.g., Senior Frontend Engineer"
                />
              )}
            />

            {/* Priority */}
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.priority}>
                  <InputLabel>Priority</InputLabel>
                  <Select {...field} label="Priority">
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  {errors.priority && (
                    <FormHelperText>{errors.priority.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Column */}
            <Controller
              name="columnId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.columnId}>
                  <InputLabel>Column</InputLabel>
                  <Select {...field} label="Column">
                    {DEFAULT_COLUMNS.map((column) => (
                      <MenuItem key={column.id} value={column.id}>
                        {column.title}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.columnId && (
                    <FormHelperText>{errors.columnId.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* Tags */}
            <Box>
              <TextField
                label="Tags"
                fullWidth
                value={tagInput}
                onChange={(e) => { setTagInput(e.target.value); }}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Press Enter to add tag"
                helperText="Add tags to categorize this target (e.g., remote, react, startup)"
              />
              {tags.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 1.5 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => { handleDeleteTag(tag); }}
                      size="small"
                      color="primary"
                    />
                  ))}
                </Stack>
              )}
            </Box>

            {/* Reason */}
            <Controller
              name="targetReason"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Why is this a target?"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.targetReason}
                  helperText={errors.targetReason?.message}
                  placeholder="e.g., Great culture, competitive salary, remote-first"
                />
              )}
            />

            {/* Source */}
            <Controller
              name="source"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Source"
                  fullWidth
                  error={!!errors.source}
                  helperText={errors.source?.message}
                  placeholder="e.g., LinkedIn post, Referral from Jane, Company website"
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Target'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
