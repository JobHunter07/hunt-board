# Implementation Plan: Header Edits — Hunt Board

**Feature**: 003-header-edits
**Branch**: `003-header-edits`
**Plan Version**: 1.0
**Created**: 2026-02-19

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (functional components) |
| UI Library | Material UI v5 (MUI) |
| Language | TypeScript 5.3 (strict) |
| Build | Vite 5 |
| Styling | MUI `sx` prop / `useTheme` / `useMediaQuery` |
| Testing | Vitest + @testing-library/react |
| Stories | Storybook v10 (CSF3 with autodocs) |
| Lint | ESLint with TypeScript rules |

---

## Vertical Slice

```
src/features/kanban-board/
  components/
    atoms/
      SearchField.tsx         ← compact prop + responsive full-width on mobile
      FilterButton.tsx        ← badge color fix (remove red primary)
    organisms/
      SearchFilterBar.tsx     ← mobile-first: column-reverse xs, row-reverse sm+
    pages/
      KanbanBoardPage.tsx     ← mobile: header column layout, columns vertical stack

src/stories/
  atoms/
    SearchField.stories.tsx   ← add Compact + CompactFocused + MaxContent stories
  organisms/
    SearchFilterBar.stories.tsx ← add WithAddTargetHandler story
  pages/
    KanbanBoardPage.stories.tsx ← Mobile + Tablet stories already exist (verify)

specs/003-header-edits/
  plan.md                     ← this file
  tasks.md                    ← task breakdown
```

---

## Architecture

### Responsive Breakpoint Strategy (Constitution Section XIII)
- Design at **xs (375px)** first, enhance upward with `theme.breakpoints.up('sm')` (600px+)
- All responsive overrides use **`min-width`** breakpoints only (MUI default `up()` behavior)
- No hamburger menus — header reflows gracefully into vertical stack

### Mobile First Layout Rules
| Element | xs (< 600px) | sm+ (≥ 600px) |
|---------|-------------|--------------|
| Header Box | `flexDirection: column` | `flexDirection: row` |
| Header alignment | `alignItems: flex-start` | `alignItems: center` |
| SearchFilterBar | `flexDirection: column-reverse` | `flexDirection: row-reverse` |
| SearchField `compact` | `false` (full-width) | `true` (160→300px expand) |
| Kanban columns | `flexDirection: column` | `flexDirection: row` |
| Column overflow | `overflowX: hidden` | `overflowX: auto` |

### `column-reverse` Visual Order
DOM order in SearchFilterBar: `[Add Target Button][FilterButton][SearchField]`

| `flexDirection` | Visual render order |
|---------------- |---------------------|
| `row-reverse` (sm+) | Search → Filter → Add Target (right-aligned) |
| `column-reverse` (xs) | Search (top) → Filter → Add Target (bottom) |

This single DOM order satisfies both mobile and desktop requirements without conditional rendering.

---

## File Change Summary

### `FilterButton.tsx`
- Change Badge `color="primary"` → `color="default"` with explicit tan `sx` background
- Keeps badge count visible without red

### `SearchFilterBar.tsx`
- Import `useTheme`, `useMediaQuery` from MUI
- Pass `compact={!isMobile}` to `SearchField`
- Change controls Box: `flexDirection: { xs: 'column-reverse', sm: 'row-reverse' }`, `alignItems: { xs: 'stretch', sm: 'center' }`, `width: { xs: '100%', sm: 'auto' }`

### `KanbanBoardPage.tsx`
- Header Box: `flexDirection: { xs: 'column', sm: 'row' }`, `alignItems: { xs: 'flex-start', sm: 'center' }`, `justifyContent: { xs: 'flex-start', sm: 'space-between' }`, `gap: { xs: 1, sm: 2 }`
- Columns Box: `flexDirection: { xs: 'column', sm: 'row' }`, `overflowX: { xs: 'hidden', sm: 'auto' }`

### Stories
- `SearchField.stories.tsx`: Add `Compact`, `CompactFocused`, `MaxContent` stories
- `SearchFilterBar.stories.tsx`: Add `WithAddTargetHandler` story; verify mobile viewport story renders column-reverse layout
- `KanbanBoardPage.stories.tsx`: Verify `MobileView` and `TabletView` exist (already present)

---

## Constitution Compliance

- [x] Section I (Spec-Driven): Spec approved before implementation
- [x] Section II (Component Architecture): Atoms → Organisms → Pages, no Molecules
- [x] Section III (Vertical Slice): Feature organized in `features/kanban-board/`
- [x] Section V (Storybook): All modified components have stories
- [x] Section XIII (Mobile First & Offline First): xs-first responsive sx, no hamburger, localStorage already in place via `useBoardState`

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| `column-reverse` visual order feels inverted on mobile | Tested: DOM order [Add][Filter][Search] with column-reverse renders correctly as Search→Filter→Add |
| FilterButton badge MUI `color="default"` may be invisible | Add explicit `badgeContent` sx with background color `#c68645` |
| Kanban columns stacking vertically on mobile makes long scroll | Each column already collapses when empty; this is by design |
| TypeScript strict mode errors | Run `npm run typecheck` after every change |

---

**Constitutional approval**: This plan complies with all sections of `.specify/memory/constitution.md` v0.5.0+
