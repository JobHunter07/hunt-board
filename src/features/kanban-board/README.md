# Kanban Board Feature

**Version**: 1.0.0  
**Status**: Production Ready  
**Constitutional Compliance**: ✓ Sections I-VII, XI

## Overview

The Kanban Board feature provides a professional, hunting-oriented job tracking interface with 9 specialized columns, drag-and-drop card movement, search/filter capabilities, and comprehensive accessibility support.

## Quick Start

```tsx
import { KanbanBoardPage } from '@/features/kanban-board';
import { ThemeProvider } from '@mui/material/styles';
import { huntBoardTheme } from '@/lib/theme';

function App() {
  return (
    <ThemeProvider theme={huntBoardTheme}>
      <KanbanBoardPage />
    </ThemeProvider>
  );
}
```

## Features

### Core Functionality

- **9 Hunting-Oriented Columns**: Targets Identified → Intel Gathering → Warm-Up Phase → Outreach Initiated → Follow-Up Required → Conversation Started → Interview Pipeline → Stalled/Cold → Offer/Success
- **Drag-and-Drop**: Move cards between columns with mouse or keyboard
- **Search & Filter**: Filter by company name, priority, tags, follow-up status
- **Card Details**: 6-tab modal for editing all target information
- **Persistence**: Auto-save to localStorage with 500ms debounce
- **Responsive**: Mobile (375px), Tablet (768px), Desktop (1920px+) support

### Accessibility (WCAG AA Compliant)

- ✓ Keyboard navigation (Tab, Arrow keys, Space, Enter)
- ✓ Screen reader support (ARIA labels, landmarks, live regions)
- ✓ Focus trap in modals
- ✓ 4.5:1 contrast ratios verified
- ✓ Touch targets 44x44px minimum
- ✓ Consistent focus indicators

### Performance Optimizations

- ✓ React.memo on JobTargetCard and KanbanColumn
- ✓ useCallback for all event handlers
- ✓ useMemo for expensive computations
- ✓ Debounced localStorage writes (500ms)
- ✓ Drag operations: <16ms (60fps)

## Architecture

### Component Hierarchy (Constitutional Section II)

```
Pages (1)
  └─ KanbanBoardPage

Organisms (5)
  ├─ KanbanColumn
  ├─ JobTargetCard
  ├─ AddTargetModal
  ├─ CardDetailModal
  └─ SearchFilterBar

Atoms (6)
  ├─ PriorityIndicator
  ├─ TagChip
  ├─ ColumnHeader
  ├─ AddButton
  ├─ SearchField
  └─ FilterButton
```

### Vertical Slice Structure (Constitutional Section III)

```
src/features/kanban-board/
├── components/
│   ├── atoms/          # 6 components
│   ├── organisms/      # 5 components
│   └── pages/          # 1 component
├── hooks/
│   ├── useBoardState.ts       # Board state management
│   ├── useLocalStorage.ts     # Persistent storage
│   ├── useDragAndDrop.ts      # Drag-and-drop logic
│   └── useCardFilters.ts      # Search/filter logic
├── validation/
│   ├── enums.ts               # Priority, ColumnId, etc.
│   ├── tag.schema.ts
│   ├── followUp.schema.ts
│   ├── outreachRecord.schema.ts
│   ├── warmUpAction.schema.ts
│   ├── column.schema.ts
│   ├── jobTarget.schema.ts
│   ├── boardState.schema.ts
│   └── userPreferences.schema.ts
├── types/
│   └── index.ts               # Generated from Zod schemas
├── utils/
│   └── storage.ts             # localStorage helpers
└── index.ts                    # Feature exports
```

## Data Models (Constitutional Section IV)

All models defined in Zod schemas, types generated via `z.infer`:

### JobTarget

```typescript
{
  id: string;
  company: string;              // Required
  role?: string;
  columnId: ColumnId;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  notes: string;
  source: string;
  reason: string;
  warmUpScore: number;          // 0-100
  warmUpActions: WarmUpAction[];
  outreachRecords: OutreachRecord[];
  followUps: FollowUp[];
  nextFollowUpDate?: string;
  stateReason?: string;
  interviewStage?: InterviewStage;
  createdAt: string;
  updatedAt: string;
}
```

### Column

```typescript
{
  id: ColumnId;
  title: string;
  color?: string;
}
```

### BoardState

```typescript
{
  schemaVersion: string;
  jobTargets: JobTarget[];
  columns: Column[];
  tags: Tag[];
  lastUpdated: string;
}
```

## Hooks API

### useBoardState

```typescript
const {
  boardState,           // Current board state
  addJobTarget,         // (company, columnId) => targetId
  updateJobTarget,      // (targetId, updates) => void
  deleteJobTarget,      // (targetId) => void
  moveJobTarget,        // (targetId, newColumnId) => void
  getTargetsByColumn    // (columnId) => JobTarget[]
} = useBoardState();
```

### useCardFilters

```typescript
const {
  searchQuery,
  selectedPriorities,
  selectedTags,
  hasFollowUp,
  setSearchQuery,
  setSelectedPriorities,
  setSelectedTags,
  setHasFollowUp,
  filteredCards,        // Filtered JobTarget[]
  activeFilterCount,    // Number of active filters
  clearAllFilters       // () => void
} = useCardFilters(allCards);
```

### useDragAndDrop

```typescript
const {
  sensors,              // DnD sensors (pointer + keyboard)
  handleDragEnd         // DragEndEvent handler
} = useDragAndDrop({
  onDragEnd: (targetId, newColumnId) => {
    // Handle card move
  }
});
```

## Component Props

### KanbanBoardPage

No props - self-contained page component.

### KanbanColumn

```typescript
{
  column: Column;
  jobTargets: JobTarget[];
  onAddTarget: () => void;
  onCardClick?: (target: JobTarget) => void;
  onEditTarget: (targetId: string) => void;
  onDeleteTarget: (targetId: string) => void;
}
```

### JobTargetCard

```typescript
{
  jobTarget: JobTarget;
  onClick?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
```

### AddTargetModal

```typescript
{
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddTargetFormData) => void;
  defaultColumnId: ColumnId;
}
```

### CardDetailModal

```typescript
{
  open: boolean;
  jobTarget: JobTarget | null;
  onClose: () => void;
  onSave: (updates: Partial<JobTarget>) => void;
  onDelete: () => void;
}
```

### SearchFilterBar

```typescript
{
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPriorities: Priority[];
  onPrioritiesChange: (priorities: Priority[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  hasFollowUp: boolean;
  onFollowUpChange: (value: boolean) => void;
  availableTags: string[];
  activeFilterCount: number;
  onClearAll: () => void;
}
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev          # Vite dev server
npm run storybook    # Storybook component explorer
```

### Testing

```bash
npm test             # Vitest unit tests
npm run test:ui      # Vitest UI
npm run test:coverage # Coverage report
```

### Type Checking

```bash
npm run typecheck    # TypeScript type checking
```

### Linting

```bash
npm run lint         # ESLint
npm run format       # Prettier
```

### Building

```bash
npm run build        # Production build
npm run build-storybook # Storybook static build
```

## Storybook Stories (Constitutional Section V)

Every component has comprehensive stories:

- **Default**: Standard usage
- **Empty**: No data state
- **Loading**: Loading state (if applicable)
- **Error**: Error state (if applicable)
- **Disabled**: Disabled state
- **Max Content**: Stress test with maximum data

### Running Stories

```bash
npm run storybook
```

Navigate to `http://localhost:6006`

### Accessibility Testing

All stories include `@storybook/addon-a11y` checks:

1. Open any story
2. Check "Accessibility" tab in panel
3. Review violations (0 expected)
4. Test keyboard navigation
5. Test screen reader announcements

## localStorage Schema

### Key: `hunt-board:board-state`

```json
{
  "schemaVersion": "v1.0.0",
  "jobTargets": [...],
  "columns": [...],
  "tags": [...],
  "lastUpdated": "2026-02-18T12:00:00.000Z"
}
```

### Key: `hunt-board:user-preferences`

```json
{
  "schemaVersion": "v1.0.0",
  "searchQuery": "",
  "selectedPriorities": [],
  "selectedTags": [],
  "hasFollowUp": false,
  "lastUpdated": "2026-02-18T12:00:00.000Z"
}
```

Data is validated with Zod on load. Invalid data falls back to default state.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Targets

- Initial load: <2s on 3G
- Card drag: <16ms (60fps)
- Search filter: <200ms
- Supports 100+ cards without virtual scrolling

## Known Limitations

- V1 uses localStorage only (no backend sync)
- No multi-user collaboration
- No undo/redo
- No card archiving (only delete)
- No attachment uploads (UI only)

## Future Enhancements (Post-V1)

- Backend API integration
- Real-time collaboration
- Rich text editor for notes
- File attachments
- Export to PDF/CSV
- Analytics dashboard
- Mobile app (React Native)

## Support

- **Storybook**: `npm run storybook` - Component documentation
- **Spec**: See `/specs/001-kanban-board/spec.md`
- **Plan**: See `/specs/001-kanban-board/plan.md`
- **Tasks**: See `/specs/001-kanban-board/tasks.md`

## License

See LICENSE file in repository root.

## Constitutional Compliance Checklist

- ✓ Section I: Spec-driven design (spec.md approved)
- ✓ Section II: Component-first architecture (Atoms/Organisms/Pages only, no Molecules)
- ✓ Section III: Vertical slice architecture (single feature slice)
- ✓ Section IV: Data configuration (Zod schemas, generated types)
- ✓ Section V: Storybook-driven development (all components have stories)
- ✓ Section VII: Testing requirements (80%+ coverage target)
- ✓ Section XI: NPM library requirements (tree-shakable, explicit exports, types bundled)

---

**Last Updated**: 2026-02-18  
**Feature Branch**: `001-kanban-board`
