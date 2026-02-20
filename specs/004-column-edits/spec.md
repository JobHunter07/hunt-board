# Spec 004 — Column Edits (Reverse Spec)

**Feature**: Kanban Column UI Redesign — Window Controls, Minimize/Maximize, Flex Layout  
**Branch**: `004-column-edits`  
**Status**: IMPLEMENTED — Reverse Spec  
**Type**: Reverse Spec (documenting features already built)

---

## 1. Purpose

Replace the dashed "Add Target" button at the bottom of each column with a Windows OS–style window control strip at the top-right of each column. Improve column layout to fill horizontal space proportionally rather than with fixed widths.

---

## 2. Scope

### In Scope
- `ColumnHeader` atom: remove Add button, count badge styling, single-line ellipsis title, horizontal padding for controls
- `KanbanColumn` organism: window controls group (Add, Minimize, Maximize, Close), minimize/maximize column states, flex-based responsive sizing, close (hide) functionality
- `KanbanBoardPage` page: `hiddenColumnIds` state for closed columns, `storageKey` prop for localStorage isolation, "Showing X of Y targets" status element
- `useBoardState` hook: optional `storageKey` parameter + `BOARD_STORAGE_KEY` constant export
- Storybook: `PopulatedBoard` story with 25-card JSON seed and isolated `hunt-board:storybook:board-state` key

### Out of Scope
- Card detail modal redesign (→ Spec 005)
- Column reordering
- Persistent minimize/maximize state (state is session-only)

---

## 3. Component Architecture

**Three levels (no Molecules):**

```
Atom:     ColumnHeader
Organism: KanbanColumn
Page:     KanbanBoardPage
```

---

## 4. ColumnHeader Atom

### Props
```typescript
export type ColumnHeaderProps = {
  title: string;
  count: number;
  color?: string;
};
```

### Behaviour
- Title rendered as single line: `whiteSpace: 'nowrap'`, `overflow: 'hidden'`, `textOverflow: 'ellipsis'`
- Bottom border colored using the `color` prop
- Count badge (`Chip`): `height: 18px`, `fontSize: 0.7rem`, `backgroundColor: color ?? '#E0E0E0'`, white text
- `pr: '80px'` on outer container to prevent title from overlapping window controls

### No Add Button
The Add button was removed from `ColumnHeader`. It now lives in `KanbanColumn`'s window controls group.

---

## 5. KanbanColumn Organism

### Props
```typescript
interface KanbanColumnProps {
  column: KanbanColumnType;
  jobTargets: JobTarget[];
  onAddTarget: () => void;
  onCardClick?: (target: JobTarget) => void;
  onEditTarget: (id: string) => void;
  onDeleteTarget: (id: string) => void;
  onClose?: () => void;
}
```

### Window Controls
Four `IconButton` components, absolutely positioned (`top: 4, right: 4`), grouped horizontally:

| Button | Icon | Tooltip | Action |
|--------|------|---------|--------|
| Add | `AddCircleOutlineIcon` | "Add new target" | `onAddTarget()` |
| Minimize | `RemoveIcon` | "Minimize column" | `setMinimized(true/false)` toggle |
| Maximize | `CropSquareIcon` | "Maximize column" | `setMaximized(true/false)` toggle |
| Close | `CloseIcon` | "Close column" | `onClose?.()` |

- All buttons: `size="small"`, `sx={{ padding: '2px' }}`
- Wrapped in `MUI Tooltip` with `title` and `arrow`
- `aria-label` matches tooltip text (lowercase)

### Flex Sizing
```typescript
flex: minimized ? '0 0 28px' : maximized ? '2 1 500px' : '1 1 250px'
minWidth: minimized ? '28px' : { sm: maximized ? '500px' : '250px' }
```

### Minimize State
- Column narrows to 28px strip
- `ColumnHeader` and cards are hidden (`{!minimized && ...}`)
- Only Minimize toggle (−) and Close (×) remain visible
- Icon buttons stack vertically in minimized strip

### Maximize State
- Column expands to `flex: '2 1 500px'`
- Other columns continue to share remaining space proportionally

### Layout
- `Paper` component with `position: 'relative'`, `display: 'flex'`, `flexDirection: 'column'`
- `mt: '18px'` wrapper around `ColumnHeader` to accommodate controls overlay
- Cards area: `sx={{ flex: 1, overflowY: 'auto', p: 1 }}`

---

## 6. KanbanBoardPage Page

### Props
```typescript
export interface KanbanBoardPageProps {
  storageKey?: string;
}
```

### hiddenColumnIds
- `const [hiddenColumnIds, setHiddenColumnIds] = useState<string[]>([])`
- Columns included in this list are filtered out of the rendered list
- `handleCloseColumn(columnId)` appends to this array

### Status Element
```tsx
<Box
  role="status"
  aria-live="polite"
  sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}
>
  Showing {filteredCards.length} of {(boardState.jobTargets ?? []).length} targets
</Box>
```
- Placed between the header Box and the DndContext
- Reflects live filtered count vs total count

### Board Container
```tsx
<Box
  role="region"
  aria-label="Kanban board columns"
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    gap: 2,
    overflowX: { xs: 'hidden', sm: 'auto' },
  }}
>
```

---

## 7. useBoardState Hook

### Changes
- Accepts optional `storageKey: string = BOARD_STORAGE_KEY`
- Exports `BOARD_STORAGE_KEY = 'hunt-board:board-state'` constant

```typescript
export const BOARD_STORAGE_KEY = 'hunt-board:board-state';
export function useBoardState(storageKey: string = BOARD_STORAGE_KEY) { ... }
```

---

## 8. Storybook — PopulatedBoard Story

### Storage Key Isolation
```typescript
const STORYBOOK_STORAGE_KEY = 'hunt-board:storybook:board-state';
```
Live app uses `hunt-board:board-state`; Storybook uses its own key to avoid conflicts.

### Seed Data
File: `src/stories/data/populated-board.json`  
25 job targets distributed across 9 columns:

| Column | Count |
|--------|-------|
| targets-identified | 3 |
| intel-gathering | 3 |
| warm-up-phase | 3 |
| outreach-initiated | 3 |
| follow-up-required | 3 |
| conversation-started | 3 |
| interview-pipeline | 3 |
| stalled-cold | 2 |
| offer-success | 2 |

All card fields used at least once: `warmUpActions`, `outreachRecords`, `followUps`, `keyPeople`, `signals`, `attachments`, `interviewStage`, `stateReason`, `targetReason`, `source`, `notes`, `nextFollowUpDate`, `priority` levels (low/medium/high).

### Story Loader
```typescript
export const PopulatedBoard: Story = {
  args: { storageKey: STORYBOOK_STORAGE_KEY },
  loaders: [
    async () => {
      localStorage.setItem(STORYBOOK_STORAGE_KEY, JSON.stringify(seedData));
      return {};
    },
  ],
};
```

---

## 9. UX Flows

### Flow 1: Add Target from Column
1. User clicks `+` (Add) control on a column
2. `AddTargetModal` opens pre-set to that column
3. User fills form, submits → card appears in correct column

### Flow 2: Minimize Column
1. User clicks `−` control
2. Column collapses to 28px strip; other columns expand proportionally
3. User clicks `−` again → column restores

### Flow 3: Maximize Column
1. User clicks `□` control
2. Column expands to `flex: '2 1 500px'`
3. User clicks `□` again → column restores

### Flow 4: Close Column
1. User clicks `×` control
2. Column is hidden (added to `hiddenColumnIds`)
3. Column is gone for the session (no current way to restore in this spec)

---

## 10. Accessibility

- All window control buttons have `aria-label` (matches tooltip text)
- MUI `Tooltip` provides a11y hints
- Status element uses `role="status"` and `aria-live="polite"` for screen reader announcements
- Column region: `role="region"` + `aria-label="Kanban board columns"`

---

## 11. Responsive Behaviour

| Breakpoint | Column layout | Overflow |
|---|---|---|
| xs (<600px) | `flexDirection: column`, full width | hidden |
| sm+ (≥600px) | `flexDirection: row`, flex wrap none | `overflowX: auto` |

---

## 12. Test Requirements

### Integration Tests (updated)
- **Button accessor**: All tests referencing the Add Target flow use `screen.getByRole('button', { name: '+ Add Target' })` (SearchFilterBar button)
- **Status text**: Test loading 120 cards asserts `screen.getByText('Showing 120 of 120 targets')` — requires `role="status"` element in KanbanBoardPage

### Unit Tests
- `ColumnHeader`: renders title, count, uses color prop
- `KanbanColumn`: renders window controls, minimize toggles width, close calls onClose

### Storybook a11y
- No violation in `Default`, `Minimized`, `Maximized`, `PopulatedBoard` stories

---

## 13. Files Changed

| File | Change Type |
|------|------------|
| `src/features/kanban-board/components/atoms/ColumnHeader.tsx` | Modified |
| `src/features/kanban-board/components/atoms/ColumnHeader.stories.tsx` | Modified |
| `src/features/kanban-board/components/organisms/KanbanColumn.tsx` | Modified |
| `src/features/kanban-board/components/organisms/KanbanColumn.stories.tsx` | Modified |
| `src/features/kanban-board/components/pages/KanbanBoardPage.tsx` | Modified |
| `src/features/kanban-board/components/pages/KanbanBoardPage.stories.tsx` | Modified |
| `src/features/kanban-board/hooks/useBoardState.ts` | Modified |
| `src/stories/data/populated-board.json` | Created |
| `tests/integration/kanban-board.integration.test.tsx` | Updated (test fixes) |
