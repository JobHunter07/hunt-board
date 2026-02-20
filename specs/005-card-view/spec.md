# Spec 005 — Card View Mode

**Feature**: Card Detail Modal — View Mode (Read-Only) with Edit Toggle  
**Branch**: `005-card-view` (to be created)  
**Status**: SPECIFICATION — Awaiting Implementation  
**Type**: Forward Spec

---

## 1. Purpose

The current `CardDetailModal` opens directly in edit mode (form fields), even when the user simply wants to read the card's data. This creates friction — accidental edits, cluttered empty fields, and no quick-read experience.

This spec adds a **View Mode** as the default state of the modal. View Mode renders all card data in a clean, read-only format. An **Edit** button transitions to the existing Edit Mode. A **Cancel** in Edit Mode returns to View Mode without saving.

---

## 2. Problem Statement

**Current behaviour**: Clicking a Kanban card opens the modal in edit mode with empty `TextField` inputs (even when fields are populated — the form shows the current values as editable inputs immediately).

**Desired behaviour**: Clicking a card opens the modal in **view mode** — a read-only layout that displays all populated fields clearly. No form inputs are rendered in view mode.

---

## 3. Scope

### In Scope
- `CardDetailModal` organism: new `mode: 'view' | 'edit'` local state (default `'view'`)
- View Mode layout: tabbed read-only display of all card fields
- Edit Mode: existing form (no change to form logic or validation)
- Mode toggle: "Edit" button in view mode footer → enters edit mode; "Cancel" in edit mode footer → returns to view mode without saving
- View mode shows only populated fields (omits empty/null fields to reduce noise)
- View mode tab: non-empty tab count badges (e.g., "Warm-Up (3 actions)")

### Out of Scope
- New fields or data model changes
- Inline editing (click-to-edit in view mode)
- Attachment file preview
- Interview pipeline sub-stage UI (beyond displaying the current stage as text)

---

## 4. Component Architecture

**Level**: Organism (no change)  
**File**: `src/features/kanban-board/components/organisms/CardDetailModal.tsx`

No new components needed. The `mode` state drives conditional rendering within the existing modal.

---

## 5. View Mode Layout

### 5.1 Modal Header

```
[Company Name]                     [Close ×]
[Role / Column badge / Priority badge]
```

- Company: `Typography variant="h6"`
- Role: `Typography variant="subtitle1" color="text.secondary"`
- Column: `Chip size="small"` using column color
- Priority: `Chip size="small" color={priority === 'high' ? 'error' : priority === 'medium' ? 'warning' : 'default'}`

### 5.2 Tabs (View Mode)

Six tabs, same labels as Edit Mode:

| Tab | Label | Shown if |
|-----|-------|----------|
| 0 | Core Info | Always |
| 1 | Warm-Up | `warmUpScore > 0` or `warmUpActions.length > 0` |
| 2 | Outreach | `outreachRecords.length > 0` |
| 3 | Follow-Up | `followUps.length > 0` or `nextFollowUpDate` exists |
| 4 | Signals | `signals.length > 0` |
| 5 | Attachments | `attachments.length > 0` |

- Tab label includes count badge when applicable: `"Warm-Up (3)"`, `"Outreach (2)"`
- Empty tabs are still shown but content says "Nothing recorded yet."

### 5.3 Tab 0 — Core Info (View)

| Field | Display |
|-------|---------|
| Company | `Typography variant="h6"` (already in header) |
| Role | Label + value in `<Stack>` |
| Priority | Chip (high=red, medium=orange, low=grey) |
| Column | Chip with column color |
| Tags | Row of `<Chip size="small">` components |
| Target Reason | Label + body text |
| Source | Label + body text |
| Notes | Label + body text, `whiteSpace: 'pre-wrap'` |

Layout pattern for each field:
```tsx
<Box sx={{ mb: 2 }}>
  <Typography variant="caption" color="text.secondary" display="block">
    FIELD LABEL
  </Typography>
  <Typography variant="body2">
    {value}
  </Typography>
</Box>
```

Fields with no value are omitted from view mode.

### 5.4 Tab 1 — Warm-Up (View)

- Warm-Up Score: horizontal progress bar (`LinearProgress`) with numeric label (e.g., "72 / 100")
- Key People: `List` of name + role + LinkedIn URL (if present)
- Warm-Up Actions: `List` with action text + date (if present)
- Warm intro possibilities: label + value

### 5.5 Tab 2 — Outreach (View)

Each `outreachRecord` as a `Card` inside the tab:
- Outreach type (`Chip`)
- Date sent
- Message template used (collapsed by default, expand on click)
- Referral involved (Yes/No Badge)

If no outreach records: "No outreach recorded yet."

### 5.6 Tab 3 — Follow-Up (View)

- Next follow-up date: if past → shown with `WarningIcon` + red text; if future → normal
- `followUps` list: each item with date, type, notes

If no follow-ups: "No follow-ups recorded yet."

### 5.7 Tab 4 — Signals (View)

Each `signal`:
- Icon based on `signal.type` (`Visibility` = profile view, `ThumbUp` = like, `Message` = message, `PersonAdd` = connection)
- Signal type label
- Date
- Notes (if any)

If no signals: "No signals recorded yet."

### 5.8 Tab 5 — Attachments (View)

Each `attachment`:
- File name
- Type badge (`Chip`)
- URL if present (external link icon)
- Notes

If no attachments: "No attachments recorded yet."

---

## 6. Mode Toggle

### View Mode Footer
```
[Delete]                      [Edit]
```
- Delete: `Button color="error" variant="outlined"` → opens existing delete confirm flow
- Edit: `Button variant="contained"` → sets `mode = 'edit'`, resets form with current values

### Edit Mode Footer
```
[Delete]    [Cancel]    [Save Changes]
```
- Cancel: `Button variant="outlined"` → sets `mode = 'view'`, does NOT save changes
- Save Changes: `Button variant="contained" type="submit"` → saves, returns to view mode
- Delete: same as in view mode

### Mode State
```typescript
const [mode, setMode] = useState<'view' | 'edit'>('view');
```

When modal opens (`open` changes from false → true): always reset to `mode = 'view'`.

---

## 7. Dialog Title Changes

| Mode | Title |
|------|-------|
| View | Company name (e.g., "Stripe") |
| Edit | "Edit — Stripe" |

---

## 8. UX Flows

### Flow 1: View Card Details
1. User clicks on a card in the board
2. Modal opens in View Mode
3. User sees all populated data across tabs
4. User closes modal — no changes made

### Flow 2: Edit Card Details
1. User clicks on a card → View Mode
2. User clicks "Edit" button
3. Modal transitions to Edit Mode (form inputs populated)
4. User modifies fields, clicks "Save Changes"
5. Changes persisted; modal returns to View Mode showing updated values

### Flow 3: Cancel Edit
1. User is in Edit Mode
2. User clicks "Cancel"
3. Modal returns to View Mode with original values (changes discarded)

### Flow 4: Delete from View Mode
1. User is in View Mode
2. User clicks "Delete"
3. Existing delete confirmation dialog shown
4. On confirm: card deleted, modal closes

---

## 9. Empty State Handling

- If a tab has no data: show centered `Typography variant="body2" color="text.secondary"` message: "Nothing recorded yet."
- Core Info always has company (required field) — never empty
- View Mode omits individual field rows when the value is null/undefined/empty string

---

## 10. Accessibility (WCAG AA)

- Mode toggle announced via `aria-live="polite"` when mode changes: "Switched to edit mode" / "Switched to view mode"
- In View Mode, interactive elements limited to tabs, Close, Edit, Delete (reduces cognitive load)
- All links open in new tab with `target="_blank" rel="noopener noreferrer"` + `aria-label` indicating external link
- Tab navigation keyboard accessible (existing behaviour retained)
- Delete confirm: focus trap in confirm dialog

---

## 11. Storybook Requirements

File: `src/features/kanban-board/components/organisms/CardDetailModal.stories.tsx`

Required stories:
| Story | State |
|-------|-------|
| `ViewModeFull` | View mode, fully populated card (all tabs have data) |
| `ViewModeCore` | View mode, only Core Info populated (all other tabs show empty state) |
| `EditMode` | Edit mode, form populated |
| `EmptyState` | `jobTarget = null` (renders null — story shows empty shell) |
| `ViewModeHighPriority` | High priority card in view mode |
| `MobileView` | `parameters: { viewport: { defaultViewport: 'mobile1' } }` |

All stories use the `PopulatedBoard` seed data (`src/stories/data/populated-board.json`) for realistic field values.

---

## 12. Test Requirements

### Unit Tests
- `CardDetailModal.view.test.tsx`:
  - Opens in view mode by default
  - Shows all populated fields
  - Does not render `TextField` inputs in view mode
  - "Edit" button switches to edit mode
  - "Cancel" button in edit mode returns to view mode without mutation
  - "Save" submits and returns to view mode

### Integration Tests
- Clicking a card on the board opens the modal in view mode
- Modal title matches company name in view mode

### Accessibility Tests
- Storybook a11y: no violations in any story
- ARIA live region announces mode changes

---

## 13. Implementation Notes

### Form Reset Strategy
When transitioning view → edit:
```typescript
reset({
  company: jobTarget.company,
  role: jobTarget.role ?? '',
  // ... all fields
});
setMode('edit');
```
When transitioning edit → view (cancel):
```typescript
reset(); // discard unsaved form state
setMode('view');
```

### Modal re-open reset
```typescript
useEffect(() => {
  if (open) {
    setMode('view');
    setActiveTab(0);
    setShowDeleteConfirm(false);
  }
}, [open]);
```

---

## 14. Files to Change

| File | Change |
|------|--------|
| `src/features/kanban-board/components/organisms/CardDetailModal.tsx` | Add view mode, mode toggle logic |
| `src/features/kanban-board/components/organisms/CardDetailModal.stories.tsx` | Add ViewModeFull, ViewModeCore, MobileView stories |
| `tests/unit/CardDetailModal.view.test.tsx` | New — unit tests for view mode |

---

## 15. Non-Goals

- No redesign of the Edit form (forms stay as-is)
- No inline editing in view mode
- No attachment file preview (file names + links only)
- No animation between view ↔ edit modes (beyond MUI default transitions)
