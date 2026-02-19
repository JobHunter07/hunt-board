# Tasks: Header Edits — Hunt Board

**Feature**: 003-header-edits
**Branch**: `003-header-edits`
**Created**: 2026-02-19

---

## Phase 1: Setup

- [X] T001 — Create `plan.md` with tech stack, architecture, and file change summary
- [X] T002 — Create `tasks.md` (this file) with full task breakdown

---

## Phase 2: Core — Source Code Changes

- [X] T003 — **FilterButton badge color fix**: Change `Badge color="primary"` to `color="default"` with tan badge sx so the count is never red. File: `src/features/kanban-board/components/atoms/FilterButton.tsx`

- [X] T004 — **SearchFilterBar mobile layout**: Import `useTheme`/`useMediaQuery`; derive `isMobile`; pass `compact={!isMobile}` to SearchField; change controls Box `flexDirection` to `{ xs: 'column-reverse', sm: 'row-reverse' }` and `alignItems` to `{ xs: 'stretch', sm: 'center' }` and `width` to `{ xs: '100%', sm: 'auto' }`. File: `src/features/kanban-board/components/organisms/SearchFilterBar.tsx`

- [X] T005 — **KanbanBoardPage mobile header**: Change header Box sx to use `flexDirection: { xs: 'column', sm: 'row' }`, `alignItems: { xs: 'flex-start', sm: 'center' }`, `justifyContent: { xs: 'flex-start', sm: 'space-between' }`, `gap: { xs: 1, sm: 2 }`. File: `src/features/kanban-board/components/pages/KanbanBoardPage.tsx`

- [X] T006 — **KanbanBoardPage mobile columns**: Change columns container Box sx to use `flexDirection: { xs: 'column', sm: 'row' }`, `overflowX: { xs: 'hidden', sm: 'auto' }`. File: `src/features/kanban-board/components/pages/KanbanBoardPage.tsx`

---

## Phase 3: Stories

- [X] T007 — **SearchField stories — add Compact + CompactFocused + MaxContent**: Add three new story exports to `src/stories/atoms/SearchField.stories.tsx` per spec Storybook requirements. Also add `compact` argType.

- [X] T008 — **SearchFilterBar stories — add WithAddTargetHandler**: Add `WithAddTargetHandler` story (as required by spec) to `src/stories/organisms/SearchFilterBar.stories.tsx`.

- [X] T009 — **Verify KanbanBoardPage stories**: Confirm `MobileView` (375px) and `TabletView` (768px) stories exist in `src/stories/pages/KanbanBoardPage.stories.tsx`; add `Mobile` and `Tablet` story aliases if needed by spec names.

---

## Phase 4: Polish & Validation

- [X] T010 — **TypeScript check**: Run `npm run typecheck` and fix any errors introduced.

- [X] T011 — **Commit all changes**: `git add -A && git commit -m "feat(003): implement mobile-first responsive layout and fix badge color"`

---

## Execution Notes

- T003–T006 can be executed in parallel (different files)
- T007–T009 depend on T004 being complete (stories import components)
- T010 must run after all code changes
- T011 is the final step
