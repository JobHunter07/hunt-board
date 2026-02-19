# Research & Technology Decisions

**Feature**: Kanban Board Interface  
**Branch**: `001-kanban-board`  
**Date**: 2026-02-18  
**Status**: Complete

This document resolves all technical unknowns identified during planning. All decisions are binding for implementation.

---

## 1. Drag-and-Drop Library Selection

### Decision: **@dnd-kit/core 6.x**

### Rationale:
- **Modern architecture**: Built with React 18+ hooks, better TypeScript support
- **Performance**: Virtual DOM-friendly, optimized for 60fps drag operations
- **Accessibility**: Built-in WCAG AA keyboard navigation support (Section V requirement)
- **Tree-shakable**: Modular architecture aligns with NPM library requirements (Section XI)
- **Bundle size**: ~15KB gzipped (vs react-beautiful-dnd ~30KB)
- **Active maintenance**: Released 2023, actively developed
- **Material UI compatibility**: Works seamlessly with MUI components

### Alternatives Considered:
- **react-beautiful-dnd**: 
  - Rejected: Deprecated (no longer maintained), larger bundle, hooks support limited
  - Last release: 2021, multiple open security issues
- **react-dnd**: 
  - Rejected: HTML5 drag-drop API limitations, accessibility concerns, heavier bundle

### Implementation Pattern:
```typescript
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Keyboard + pointer support for accessibility
const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
);
```

### References:
- [@dnd-kit Documentation](https://docs.dndkit.com/)
- [Performance Benchmarks](https://docs.dndkit.com/introduction/performance)

---

## 2. LocalStorage Data Architecture

### Decision: **Normalized schema with Zod validation + structured key naming**

### Rationale:
- **Data integrity**: Zod schemas validate on read/write (Section IV requirement)
- **Performance**: Normalized structure reduces redundancy for 100+ cards
- **Versioning**: Schema version field enables future migrations
- **Type safety**: Zod inference generates TypeScript types automatically
- **Error recovery**: Invalid data flagged rather than crashing app

### Data Structure:
```typescript
// localStorage keys (namespace: 'hunt-board:')
'hunt-board:schema-version' → string (e.g., 'v1.0.0')
'hunt-board:job-targets'    → JSON array of JobTarget entities
'hunt-board:columns'        → JSON array of Column metadata
'hunt-board:tags'           → JSON array of Tag definitions
'hunt-board:user-prefs'     → User preferences (filter state, UI settings)

// Example storage format
{
  id: 'jt_001',
  company: 'Acme Corp',
  role: 'Senior Engineer',
  columnId: 'intel-gathering',
  tags: ['high-priority', 'referral-ready'],
  priority: 'high',
  createdAt: '2026-02-18T10:00:00Z',
  updatedAt: '2026-02-18T15:30:00Z',
  warmUpScore: 65,
  // ... nested objects per Zod schema
}
```

### Storage Limits:
- **Browser quota**: ~5-10MB per origin (sufficient for 1000+ cards)
- **Target capacity**: 100 cards × ~2KB per card = ~200KB (2% of quota)
- **Safety margin**: 300+ cards before performance concerns

### Error Handling:
- Quota exceeded → Notify user, offer export/archive
- Invalid JSON → Fallback to empty state, log error to console
- Schema mismatch → Attempt auto-migration, fallback to manual review

### Best Practices:
1. **Debounce writes**: 500ms debounce on card updates
2. **Atomic writes**: Validate full data structure before writing
3. **Backup on change**: Store previous state for 'undo' capability
4. **Compression**: Not needed for v1 (only 200KB target)

### References:
- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Zod: Schema Validation](https://zod.dev/)

---

## 3. Material UI DatePicker Solution

### Decision: **MUI X Date Pickers (@mui/x-date-pickers) with date-fns adapter**

### Rationale:
- **Official MUI component**: Matches Material Design 3 specification
- **Theme integration**: Inherits Material UI theme automatically (deep red primary)
- **Accessibility**: Built-in WCAG AA keyboard navigation and ARIA support
- **Localization**: Supports internationalization (future requirement)
- **Tree-shakable**: Import only DatePicker component
- **Bundle size**: ~45KB gzipped with date-fns adapter

### Alternatives Considered:
- **react-datepicker**: 
  - Rejected: Requires custom Material UI styling, accessibility gaps
- **Day.js + custom picker**: 
  - Rejected: Unnecessary maintenance burden, accessibility not guaranteed
- **HTML5 `<input type="date">`**: 
  - Rejected: Inconsistent browser UX, limited customization

### Implementation Pattern:
```typescript
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Next Follow-Up"
    value={followUpDate}
    onChange={(newValue) => setFollowUpDate(newValue)}
    slotProps={{
      textField: { size: 'small', fullWidth: true }
    }}
  />
</LocalizationProvider>
```

### Dependencies:
```json
{
  "@mui/x-date-pickers": "^6.19.0",
  "date-fns": "^2.30.0"
}
```

### References:
- [MUI X Date Pickers](https://mui.com/x/react-date-pickers/)
- [date-fns Documentation](https://date-fns.org/)

---

## 4. Browser Compatibility Strategy

### Decision: **Evergreen browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)**

### Rationale:
- **Modern APIs required**: localStorage, ES2020, CSS Grid, Flexbox
- **React 18 requirement**: Concurrent rendering requires modern browsers
- **Material UI 5 requirement**: Uses CSS custom properties, modern Flexbox
- **Market share**: Covers 95%+ of job hunters (target audience)
- **Simplicity**: No polyfills needed, smaller bundle

### Feature Detection:
```typescript
// Detect localStorage support
const hasLocalStorage = (() => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
})();

if (!hasLocalStorage) {
  // Show error: "Browser not supported. Please use Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+."
}
```

### Testing Matrix:
| Browser        | Min Version | Test Priority |
|----------------|-------------|---------------|
| Chrome         | 90          | P0 (primary)  |
| Firefox        | 88          | P1            |
| Safari (macOS) | 14          | P1            |
| Edge           | 90          | P2            |
| Mobile Safari  | 14          | P2            |
| Mobile Chrome  | 90          | P2            |

### Polyfills: **None required** (modern browsers only)

### References:
- [Can I Use: localStorage](https://caniuse.com/namevalue-storage)
- [React 18 Browser Support](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis)

---

## 5. Tree-Shaking Optimization for Material UI

### Decision: **Named imports with Babel plugin (babel-plugin-import)**

### Rationale:
- **Bundle size reduction**: Import only used components (~60% reduction)
- **Constitutional requirement**: Tree-shakable exports (Section XI)
- **Developer experience**: No manual path imports needed
- **Build performance**: Faster compilation with selective imports

### Implementation:
```javascript
// .babelrc or babel.config.js
{
  "plugins": [
    [
      "babel-plugin-import",
      {
        "libraryName": "@mui/material",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "core"
    ],
    [
      "babel-plugin-import",
      {
        "libraryName": "@mui/icons-material",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "icons"
    ]
  ]
}
```

### Import Pattern:
```typescript
// Preferred (auto tree-shaken)
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { DragIndicator, Delete, Edit } from '@mui/icons-material';

// Avoid (imports entire library)
import * as MUI from '@mui/material'; // ❌
```

### Bundle Size Targets:
- **Material UI core**: ~80KB gzipped (vs 300KB full library)
- **Material UI icons**: ~15KB gzipped (vs 150KB full icon set)
- **Total MUI**: ~95KB (within 500KB total budget)

### Verification:
```bash
# Analyze bundle composition
npm run build -- --stats
npx webpack-bundle-analyzer dist/stats.json
```

### References:
- [MUI: Minimizing Bundle Size](https://mui.com/material-ui/guides/minimizing-bundle-size/)
- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

---

## 6. Performance Optimization for Drag Operations

### Decision: **Lazy rendering + useCallback + useMemo + React.memo**

### Rationale:
- **60fps target**: <16ms per drag operation required
- **100+ cards**: Prevent unnecessary re-renders during drag
- **React 18 concurrency**: Leverage automatic batching and transitions
- **@dnd-kit optimization**: Library already optimized, hooks provide memoization

### Optimization Patterns:

#### 1. **Memoize Card Components**
```typescript
export const JobTargetCard = React.memo(({ card, onEdit, onDelete }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if card data changed
  return prevProps.card.id === nextProps.card.id &&
         prevProps.card.updatedAt === nextProps.card.updatedAt;
});
```

#### 2. **Callback Memoization**
```typescript
const handleDragEnd = useCallback((event) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;
  
  // Update state with minimal re-renders
  setBoardState((prevState) => {
    const oldColumn = prevState.columns.find(/* ... */);
    const newColumn = prevState.columns.find(/* ... */);
    return moveCard(prevState, active.id, oldColumn.id, newColumn.id);
  });
}, [setBoardState]);
```

#### 3. **Virtual Scrolling (Phase 2 - if needed)**
```typescript
// Only if 100+ cards causing performance issues (not in v1)
import { FixedSizeList } from 'react-window';
```

#### 4. **Debounce LocalStorage Writes**
```typescript
const debouncedSave = useMemo(
  () => debounce((state) => {
    localStorage.setItem('hunt-board:job-targets', JSON.stringify(state));
  }, 500),
  []
);
```

### Performance Monitoring:
```typescript
// React DevTools Profiler
import { Profiler } from 'react';

<Profiler id="KanbanBoard" onRender={(id, phase, actualDuration) => {
  if (actualDuration > 16) {
    console.warn(`Slow render: ${id} took ${actualDuration}ms`);
  }
}}>
  <KanbanBoardPage />
</Profiler>
```

### Performance Budget:
| Operation           | Target  | Critical |
|---------------------|---------|----------|
| Drag start          | <8ms    | <16ms    |
| Drag move (per px)  | <8ms    | <16ms    |
| Drag end (drop)     | <50ms   | <100ms   |
| Search filter       | <150ms  | <200ms   |
| Card modal open     | <100ms  | <150ms   |

### References:
- [React Performance Optimization](https://react.dev/learn/render-and-commit#optimizing-performance)
- [@dnd-kit: Performance](https://docs.dndkit.com/introduction/performance)

---

## 7. Icon Strategy (Material UI Icons)

### Decision: **Material Icons with selective imports**

### Rationale:
- **Consistency**: Matches Material Design 3 specification
- **Accessibility**: SVG icons with proper ARIA labels
- **Tree-shakable**: Import only needed icons (~1KB per icon)
- **No emojis**: Constitutional requirement (copilot-instructions.md)

### Icon Mapping:
| UI Element          | Material Icon Component     | Usage               |
|---------------------|-----------------------------|---------------------|
| Priority High       | `<PriorityHigh />`          | Red circle dot      |
| Priority Medium     | `<Remove />`                | Orange dash         |
| Priority Low        | `<KeyboardArrowDown />`     | Grey arrow down     |
| Drag Handle         | `<DragIndicator />`         | Card drag handle    |
| Add Card            | `<Add />`                   | Column add button   |
| Search              | `<Search />`                | Search field icon   |
| Filter              | `<FilterList />`            | Filter button       |
| Edit                | `<Edit />`                  | Card edit action    |
| Delete              | `<Delete />`                | Card delete action  |
| Visibility          | `<Visibility />`            | "Profile viewed"    |
| ThumbUp             | `<ThumbUp />`               | "Post liked"        |
| Message             | `<Message />`               | "DM received"       |
| DateRange           | `<DateRange />`             | Follow-up date icon |

### Import Pattern:
```typescript
import {
  PriorityHigh,
  Remove,
  KeyboardArrowDown,
  DragIndicator,
  Add,
  Search,
  FilterList,
  Edit,
  Delete,
  Visibility,
  ThumbUp,
  Message,
  DateRange
} from '@mui/icons-material';
```

### Bundle Impact:
- **Icons used**: ~15 icons × 1KB = ~15KB gzipped
- **Total icon bundle**: <20KB (within 500KB budget)

### References:
- [Material Icons Official](https://mui.com/material-ui/material-icons/)

---

## Summary of Technology Stack (Final)

| Category              | Technology                     | Version  | Justification                        |
|-----------------------|--------------------------------|----------|--------------------------------------|
| **Language**          | TypeScript                     | 5.x      | Type safety, Zod integration         |
| **Framework**         | React                          | 18.2     | Concurrent rendering, hooks          |
| **UI Library**        | Material UI                    | 5.14+    | Material Design 3, theme integration |
| **Drag & Drop**       | @dnd-kit/core                  | 6.x      | Performance, accessibility, modern   |
| **Date Picker**       | @mui/x-date-pickers            | 6.19+    | Official MUI, WCAG AA                |
| **Date Utility**      | date-fns                       | 2.30+    | Lightweight, tree-shakable           |
| **Validation**        | Zod                            | 3.22+    | Type inference, runtime validation   |
| **Form Management**   | React Hook Form                | 7.x      | Performance, Zod integration         |
| **State Management**  | React useState/useReducer      | built-in | No external state library needed     |
| **Storage**           | localStorage                   | native   | Offline-first, no backend required   |
| **Testing (Unit)**    | Vitest                         | latest   | Fast, Vite integration               |
| **Testing (Component)**| React Testing Library          | latest   | User-centric, accessibility-focused  |
| **Testing (Visual)**  | Chromatic                      | latest   | Storybook integration, CI/CD ready   |
| **Testing (A11y)**    | @storybook/addon-a11y          | latest   | Automated WCAG checks                |
| **Storybook**         | Storybook                      | 7.6+     | CSF3, autodocs, a11y testing         |
| **Build**             | Vite                           | latest   | Fast builds, tree-shaking            |
| **Icons**             | @mui/icons-material            | 5.14+    | Material Design, selective imports   |

---

## Unresolved Questions (None)

All technical decisions have been finalized. Ready to proceed to Phase 1 (Data Modeling).

---

**Next Phase**: Phase 1 - Data Model & Contracts (`data-model.md`)
