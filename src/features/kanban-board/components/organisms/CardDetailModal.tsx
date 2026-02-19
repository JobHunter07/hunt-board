// src/features/kanban-board/components/organisms/CardDetailModal.tsx

/**
 * CardDetailModal organism - Detailed view and editing for job targets
 * 
 * **Accessibility Features (T071)**:
 * - Focus trap: Material UI Dialog automatically traps focus within the modal
 * - Focus is returned to triggering element when modal closes
 * - Keyboard navigation: Tab cycles through form fields and tabs
 * - Escape key closes modal
 * - Screen reader support: Dialog has proper ARIA labels, tabs are accessible
 * - Tab panel navigation: Arrow keys move between tabs
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tabs,
  Tab,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { JobTarget } from '../../validation/jobTarget.schema';
import type { ColumnId } from '../../validation/enums';
import { DEFAULT_COLUMNS } from '../../validation/column.schema';

/**
 * Props for CardDetailModal organism
 * 
 * **Constitutional Requirement (Section V)**: All components need Storybook stories
 */
export type CardDetailModalProps = {
  /** Whether modal is open */
  open: boolean;
  /** Job target to edit (if null, shows empty state) */
  jobTarget: JobTarget | null;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when user saves changes */
  onSave: (updatedTarget: Partial<JobTarget>) => void;
  /** Callback when user deletes card */
  onDelete: () => void;
}

/**
 * Form data schema for card details (subset of JobTarget for editing)
 */
const CardDetailFormSchema = z.object({
  company: z.string().min(1, 'Company is required').max(100),
  role: z.string().max(100).optional(),
  targetReason: z.string().max(500).optional(),
  source: z.string().max(200).optional(),
  columnId: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  notes: z.string().max(5000).optional(),
  interviewNotes: z.string().max(2000).optional(),
});

type CardDetailFormData = z.infer<typeof CardDetailFormSchema>;

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`card-detail-tabpanel-${String(index)}`}
      aria-labelledby={`card-detail-tab-${String(index)}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

/**
 * CardDetailModal - Comprehensive modal for viewing and editing all job target details
 * 
 * **Constitutional Compliance (Section II)**:
 * - Organism-level component (complex, multiple atoms/molecules)
 * - Material UI components only
 * - Responsive behavior (full-screen mobile, max-width 800px desktop)
 * - Zod validation with React Hook Form
 * 
 * **User Story 3 - Feature Requirements**:
 * - 6 tabs: Core Info, Warm-Up, Outreach, Follow-Up, Signals, Attachments
 * - Edit all card details with validation
 * - Delete card with confirmation
 * - Persist changes to localStorage
 * 
 * **Accessibility (WCAG AA)**:
 * - Focus trap within modal
 * - Keyboard navigation between tabs (Arrow keys)
 * - ARIA labels on all interactive elements
 * - Screen reader announcements for save/delete actions
 */
export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  open,
  jobTarget,
  onClose,
  onSave,
  onDelete,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tags, setTags] = useState<string[]>(jobTarget?.tags ?? []);
  const [tagInput, setTagInput] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CardDetailFormData>({
    resolver: zodResolver(CardDetailFormSchema),
    defaultValues: jobTarget
      ? {
          company: jobTarget.company,
          role: jobTarget.role ?? '',
          targetReason: jobTarget.targetReason ?? '',
          source: jobTarget.source ?? '',
          columnId: jobTarget.columnId,
          priority: jobTarget.priority,
          notes: jobTarget.notes ?? '',
          interviewNotes: jobTarget.interviewNotes ?? '',
        }
      : {
          company: '',
          role: '',
          targetReason: '',
          source: '',
          columnId: 'targets-identified' as ColumnId,
          priority: 'medium' as const,
          notes: '',
          interviewNotes: '',
        },
  });

  const handleClose = () => {
    reset();
    setActiveTab(0);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleFormSubmit = (data: CardDetailFormData) => {
    onSave({
      ...data,
      columnId: data.columnId as ColumnId,
      tags,
      updatedAt: new Date().toISOString(),
    });
    handleClose();
  };

  const handleDeleteConfirm = () => {
    onDelete();
    handleClose();
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

  if (!jobTarget) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 2,
          height: fullScreen ? '100%' : 'auto',
          maxHeight: fullScreen ? '100%' : '90vh',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
        Edit Target Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Card detail tabs"
        sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
      >
        <Tab label="Core Info" id="card-detail-tab-0" aria-controls="card-detail-tabpanel-0" />
        <Tab label="Warm-Up" id="card-detail-tab-1" aria-controls="card-detail-tabpanel-1" />
        <Tab label="Outreach" id="card-detail-tab-2" aria-controls="card-detail-tabpanel-2" />
        <Tab label="Follow-Up" id="card-detail-tab-3" aria-controls="card-detail-tabpanel-3" />
        <Tab label="Signals" id="card-detail-tab-4" aria-controls="card-detail-tabpanel-4" />
        <Tab label="Attachments" id="card-detail-tab-5" aria-controls="card-detail-tabpanel-5" />
      </Tabs>

      <form
        onSubmit={(e) => {
          void handleSubmit(handleFormSubmit)(e);
        }}
      >
        <DialogContent dividers sx={{ minHeight: 400 }}>
          {/* Tab 0: Core Info */}
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company"
                    required
                    fullWidth
                    autoFocus
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  />
                )}
              />

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
                  />
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select {...field} labelId="priority-label" label="Priority">
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="columnId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="column-label">Column</InputLabel>
                    <Select {...field} labelId="column-label" label="Column">
                      {DEFAULT_COLUMNS.map((col: { id: ColumnId; title: string }) => (
                        <MenuItem key={col.id} value={col.id}>
                          {col.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Tags
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => { handleDeleteTag(tag); }}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
                <TextField
                  value={tagInput}
                  onChange={(e) => { setTagInput(e.target.value); }}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add tag (press Enter)"
                  size="small"
                  fullWidth
                />
              </Box>

              <Controller
                name="targetReason"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Why this is a target"
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.targetReason}
                    helperText={errors.targetReason?.message}
                  />
                )}
              />

              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Source"
                    fullWidth
                    placeholder="e.g., LinkedIn post, Referral from Jane"
                    error={!!errors.source}
                    helperText={errors.source?.message}
                  />
                )}
              />

              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="General Notes"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />
                )}
              />
            </Stack>
          </TabPanel>

          {/* Tab 1: Warm-Up */}
          <TabPanel value={activeTab} index={1}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Warm-Up Score: {jobTarget.warmUpScore}/100
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Track your relationship-building activities before applying
                </Typography>
              </Box>

              <Divider />

              {jobTarget.warmUpActions.length === 0 ? (
                <Alert severity="info">No warm-up actions yet. Start building relationships!</Alert>
              ) : (
                <List>
                  {jobTarget.warmUpActions.map((action, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={action.type}
                        secondary={new Date(action.actionDate).toLocaleDateString()}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Button startIcon={<AddIcon />} variant="outlined" fullWidth>
                Add Warm-Up Action
              </Button>
            </Stack>
          </TabPanel>

          {/* Tab 2: Outreach */}
          <TabPanel value={activeTab} index={2}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Track all outreach attempts and responses
              </Typography>

              {jobTarget.outreachRecords.length === 0 ? (
                <Alert severity="info">No outreach attempts yet</Alert>
              ) : (
                <List>
                  {jobTarget.outreachRecords.map((record, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={record.type}
                        secondary={`${new Date(record.sentDate).toLocaleDateString()} - ${
                          record.contactPerson ?? 'Unknown recipient'
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Button startIcon={<AddIcon />} variant="outlined" fullWidth>
                Add Outreach Record
              </Button>
            </Stack>
          </TabPanel>

          {/* Tab 3: Follow-Up */}
          <TabPanel value={activeTab} index={3}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Schedule and track follow-up actions
              </Typography>

              {jobTarget.followUps.length === 0 ? (
                <Alert severity="info">No follow-ups scheduled</Alert>
              ) : (
                <List>
                  {jobTarget.followUps.map((followUp, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={followUp.action}
                        secondary={`Due: ${new Date(followUp.scheduledDate).toLocaleDateString()}${
                          followUp.completed ? ' (Completed)' : ''
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Button startIcon={<AddIcon />} variant="outlined" fullWidth>
                Add Follow-Up
              </Button>
            </Stack>
          </TabPanel>

          {/* Tab 4: Signals */}
          <TabPanel value={activeTab} index={4}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Track engagement signals (profile views, likes, messages)
              </Typography>

              {jobTarget.signals.length === 0 ? (
                <Alert severity="info">No signals recorded yet</Alert>
              ) : (
                <List>
                  {jobTarget.signals.map((signal, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={signal.type}
                        secondary={`${new Date(signal.date).toLocaleDateString()}${
                          signal.description ? ` - ${signal.description}` : ''
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Button startIcon={<AddIcon />} variant="outlined" fullWidth>
                Add Signal
              </Button>
            </Stack>
          </TabPanel>

          {/* Tab 5: Attachments */}
          <TabPanel value={activeTab} index={5}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Attach resumes, cover letters, or other relevant files
              </Typography>

              {jobTarget.attachments.length === 0 ? (
                <Alert severity="info">No attachments yet</Alert>
              ) : (
                <List>
                  {jobTarget.attachments.map((attachment) => (
                    <ListItem key={attachment.id}>
                      <ListItemText
                        primary={attachment.name}
                        secondary={`${attachment.type} - ${new Date(
                          attachment.uploadedAt
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              <Button startIcon={<AddIcon />} variant="outlined" fullWidth>
                Upload Attachment
              </Button>
            </Stack>
          </TabPanel>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
          <Button
            onClick={() => { setShowDeleteConfirm(true); }}
            color="error"
            startIcon={<DeleteIcon />}
            variant="outlined"
          >
            Delete
          </Button>
          <Box>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={!isDirty}>
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      </form>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => { setShowDeleteConfirm(false); }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Target?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{jobTarget.company}&quot;? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShowDeleteConfirm(false); }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
