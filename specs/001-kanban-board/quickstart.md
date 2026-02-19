# Quickstart Guide: Kanban Board Development

**Feature**: Kanban Board Interface  
**Branch**: `001-kanban-board`  
**Date**: 2026-02-18  
**Audience**: Developers implementing the Kanban board feature

This guide provides step-by-step instructions for setting up the development environment and implementing the Kanban board feature.

---

## Prerequisites

- **Node.js**: 18.x or 20.x (LTS recommended)
- **npm**: 9.x or later
- **Git**: 2.40+ (for branch management)
- **Editor**: VS Code recommended (for Copilot integration)
- **Browser**: Chrome 90+ (primary), Firefox 88+, Safari 14+ (testing)

---

## 1. Environment Setup

### Clone and Switch to Feature Branch

```bash
# If starting fresh
git clone <repository-url>
cd hunt-board

# Switch to Kanban board feature branch
git checkout 001-kanban-board

# Verify branch
git branch --show-current
# Expected output: 001-kanban-board
```

### Install Dependencies

```bash
# Install all dependencies
npm install

# Expected dependencies (from research.md):
# - react@18.2.0
# - @mui/material@5.14+
# - @mui/x-date-pickers@6.19+
# - @dnd-kit/core@6.x
# - @dnd-kit/sortable@8.x
# - zod@3.22+
# - react-hook-form@7.x
# - date-fns@2.30+
```

### Verify Installation

```bash
# Check TypeScript compilation
npm run typecheck

# Check linting
npm run lint

# Run tests (should pass with no tests initially)
npm test
```

---

## 2. Material UI Theme Setup

### Create Theme Configuration

**File**: `src/lib/theme.ts`

```typescript
import { createTheme } from '@mui/material/styles';

/**
 * Hunt Board Material UI theme
 * Constitutional requirement: Material Design 3 compliance
 */
export const huntBoardTheme = createTheme({
  palette: {
    primary: {
      main: '#B71C1C', // Deep red (per copilot-instructions.md)
      light: '#E57373',
      dark: '#7F0000',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#546E7A', // Slate
      light: '#819CA9',
      dark: '#29434E',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F5F5F5', // Light grey
      paper: '#FFFFFF'
    },
    error: {
      main: '#D32F2F'
    },
    warning: {
      main: '#F57C00'
    },
    success: {
      main: '#388E3C'
    },
    info: {
      main: '#1976D2'
    }
  },
  shape: {
    borderRadius: 8 // Material Design 3 rounded corners
  },
  spacing: 8, // 8px grid (Material Design standard)
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600
    },
    subtitle1: {
      fontWeight: 500
    },
    body2: {
      fontSize: '0.875rem'
    }
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 2
      },
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' // Disable ALL CAPS
        }
      }
    }
  }
});
```

### Wrap App with Theme Provider

**File**: `src/App.tsx` (or `src/main.tsx`)

```typescript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { huntBoardTheme } from './lib/theme';

function App() {
  return (
    <ThemeProvider theme={huntBoardTheme}>
      <CssBaseline />
      {/* App content */}
    </ThemeProvider>
  );
}

export default App;
```

---

## 3. Zod Schemas Setup

### Create Validation Directory

```bash
mkdir -p src/features/kanban-board/validation
```

### Implement Schemas (Reference: data-model.md)

Create the following files in order:

1. **`enums.ts`**: Priority, ColumnId, OutreachType, etc.
2. **`tag.schema.ts`**: Tag entity
3. **`followUp.schema.ts`**: FollowUp entity
4. **`outreachRecord.schema.ts`**: OutreachRecord entity
5. **`warmUpAction.schema.ts`**: WarmUpAction entity
6. **`column.schema.ts`**: Column entity with DEFAULT_COLUMNS
7. **`jobTarget.schema.ts`**: JobTarget entity (main)
8. **`boardState.schema.ts`**: BoardState aggregate
9. **`userPreferences.schema.ts`**: UserPreferences entity
10. **`utils.ts`**: Validation utilities

> **IMPORTANT**: Copy schemas EXACTLY from `data-model.md`. Any modifications require constitutional review.

### Export Types

**File**: `src/features/kanban-board/types/index.ts`

```typescript
export type {
  Priority,
  ColumnId,
  OutreachType,
  WarmUpActionType,
  StateReason,
  InterviewStage
} from '../validation/enums';

export type { Tag } from '../validation/tag.schema';
export type { FollowUp } from '../validation/followUp.schema';
export type { OutreachRecord } from '../validation/outreachRecord.schema';
export type { WarmUpAction } from '../validation/warmUpAction.schema';
export type { Column } from '../validation/column.schema';
export type { JobTarget } from '../validation/jobTarget.schema';
export type { BoardState } from '../validation/boardState.schema';
export type { UserPreferences } from '../validation/userPreferences.schema';
```

### Verify Schemas

```bash
# TypeScript should compile without errors
npm run typecheck

# Test schema validation (create a test file)
npm test src/features/kanban-board/validation
```

---

## 4. LocalStorage Utilities

**File**: `src/features/kanban-board/utils/storage.ts`

Copy implementation from `data-model.md` section 12 (LocalStorage Integration).

**Test localStorage**:

```typescript
// Manual test in browser console
import { loadBoardState, saveBoardState } from './utils/storage';

const state = loadBoardState(); // Should return default state
console.log(state);

saveBoardState(state); // Should save to localStorage
```

---

## 5. Storybook Setup

### Install Storybook

```bash
npx storybook@latest init
```

### Configure Storybook for Material UI

**File**: `.storybook/preview.tsx`

```typescript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { huntBoardTheme } from '../src/lib/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={huntBoardTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

### Add Accessibility Addon

```bash
npm install @storybook/addon-a11y --save-dev
```

**File**: `.storybook/main.ts`

```typescript
export default {
  addons: [
    '@storybook/addon-a11y', // REQUIRED for constitutional compliance
    '@storybook/addon-essentials',
  ],
};
```

### Run Storybook

```bash
npm run storybook
```

Expected: Opens `http://localhost:6006` with Storybook UI.

---

## 6. Component Development Workflow

### Step 1: Create Atom Component

**Example**: `PriorityIndicator.tsx`

**File**: `src/features/kanban-board/components/atoms/PriorityIndicator.tsx`

```typescript
import React from 'react';
import { Box } from '@mui/material';
import { Priority } from '../../types';

export interface PriorityIndicatorProps {
  priority: Priority;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({ priority }) => {
  const colorMap = {
    low: '#9E9E9E',
    medium: '#FF9800',
    high: '#F44336'
  };

  return (
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: colorMap[priority],
        display: 'inline-block'
      }}
      role="img"
      aria-label={`${priority} priority`}
    />
  );
};
```

### Step 2: Create Storybook Story

**File**: `src/stories/atoms/PriorityIndicator.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { PriorityIndicator } from '../../features/kanban-board/components/atoms/PriorityIndicator';

const meta: Meta<typeof PriorityIndicator> = {
  title: 'Atoms/PriorityIndicator',
  component: PriorityIndicator,
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: ['low', 'medium', 'high']
    }
  }
};

export default meta;
type Story = StoryObj<typeof PriorityIndicator>;

export const Low: Story = {
  args: {
    priority: 'low'
  }
};

export const Medium: Story = {
  args: {
    priority: 'medium'
  }
};

export const High: Story = {
  args: {
    priority: 'high'
  }
};
```

### Step 3: Write Component Tests

**File**: `tests/component/atoms/PriorityIndicator.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PriorityIndicator } from '../../../src/features/kanban-board/components/atoms/PriorityIndicator';

describe('PriorityIndicator', () => {
  it('renders low priority with grey color', () => {
    render(<PriorityIndicator priority="low" />);
    const indicator = screen.getByRole('img', { name: /low priority/i });
    expect(indicator).toBeInTheDocument();
  });

  it('renders medium priority with orange color', () => {
    render(<PriorityIndicator priority="medium" />);
    const indicator = screen.getByRole('img', { name: /medium priority/i });
    expect(indicator).toBeInTheDocument();
  });

  it('renders high priority with red color', () => {
    render(<PriorityIndicator priority="high" />);
    const indicator = screen.getByRole('img', { name: /high priority/i });
    expect(indicator).toBeInTheDocument();
  });
});
```

### Step 4: Run Tests

```bash
npm test
```

### Step 5: Verify Accessibility

```bash
npm run storybook

# Navigate to PriorityIndicator story
# Check "Accessibility" panel in Storybook UI
# Verify 0 violations (WCAG AA compliance)
```

---

## 7. Development Commands

```bash
# Start development server
npm run dev

# Run Storybook
npm run storybook

# Run tests (watch mode)
npm test

# Run tests (coverage)
npm run test:coverage

# TypeScript type checking
npm run typecheck

# Lint code
npm run lint

# Build for production
npm run build

# Build Storybook (static)
npm run build-storybook
```

---

## 8. Git Workflow

```bash
# Create feature sub-branch (optional)
git checkout -b 001-kanban-board/priority-indicator

# Stage changes
git add src/features/kanban-board/components/atoms/PriorityIndicator.tsx
git add src/stories/atoms/PriorityIndicator.stories.tsx
git add tests/component/atoms/PriorityIndicator.test.tsx

# Commit with descriptive message
git commit -m "feat(kanban): add PriorityIndicator atom component

- Implements priority visual indicator (low/medium/high)
- Includes Storybook story with 3 variants
- Adds component tests with 3 scenarios
- WCAG AA compliant (aria-label)

Refs: #001 (Kanban board feature)"

# Push to remote
git push origin 001-kanban-board/priority-indicator
```

---

## 9. Component Implementation Order

Follow this sequence (constitutional requirement: tasks align with user stories):

### Phase 1: Atoms (User Story P1)
1. `PriorityIndicator`
2. `TagChip`
3. `ColumnHeader`
4. `AddButton`

### Phase 2: Organisms (User Story P1)
5. `KanbanColumn`
6. `JobTargetCard`

### Phase 3: Page (User Story P1)
7. `KanbanBoardPage`

### Phase 4: Search/Filter (User Story P4)
8. `SearchField`
9. `FilterButton`
10. `SearchFilterBar`

### Phase 5: Modals (User Stories P2, P3)
11. `AddTargetModal`
12. `CardDetailModal`

---

## 10. Debugging Tips

### LocalStorage Issues

```javascript
// Clear localStorage (browser console)
localStorage.removeItem('hunt-board:board-state');

// View board state (browser console)
JSON.parse(localStorage.getItem('hunt-board:board-state'));

// Check quota usage
navigator.storage.estimate().then(estimate => {
  console.log(`Used: ${estimate.usage} bytes`);
  console.log(`Quota: ${estimate.quota} bytes`);
});
```

### Zod Validation Errors

```typescript
// Enable detailed error logging
import { extractZodErrors } from '../validation/utils';

try {
  const data = JobTargetSchema.parse(invalidData);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Validation failed:', extractZodErrors(error));
  }
}
```

### Storybook Hot Reload

```bash
# If Storybook doesn't detect changes:
# 1. Stop Storybook (Ctrl+C)
# 2. Clear Storybook cache
npx storybook@latest clear-cache

# 3. Restart Storybook
npm run storybook
```

---

## 11. Constitutional Compliance Checklist

Before marking a component complete:

- [ ] Component uses ONLY Material UI styling (no custom CSS)
- [ ] Component has Storybook story with 6 required states: Default, Loading, Error, Disabled, Empty, Max Content
- [ ] Component has accessibility checks (0 violations in Storybook a11y panel)
- [ ] Component has unit/component tests (≥80% coverage)
- [ ] Component uses Zod-inferred types (not hand-written interfaces)
- [ ] Component follows 3-level atomic design (Atom/Organism/Page)
- [ ] Component is exported using named exports (no default exports)
- [ ] Component is keyboard navigable (WCAG AA)
- [ ] Component has proper ARIA labels/roles

---

## 12. Next Steps

1. **Read the specification**: `specs/001-kanban-board/spec.md`
2. **Review data model**: `specs/001-kanban-board/data-model.md`
3. **Check tasks list**: `specs/001-kanban-board/tasks.md` (after `/speckit.tasks` runs)
4. **Start with atoms**: Implement `PriorityIndicator` first (simplest component)
5. **Write tests first**: Follow TDD approach for complex logic
6. **Use Storybook**: Develop components in isolation before integrating

---

## 13. Support & Resources

- **Constitution**: `.specify/memory/constitution.md`
- **Specification**: `specs/001-kanban-board/spec.md`
- **Data Model**: `specs/001-kanban-board/data-model.md`
- **Research Decisions**: `specs/001-kanban-board/research.md`
- **Material UI Docs**: https://mui.com/material-ui/
- **Zod Docs**: https://zod.dev/
- **@dnd-kit Docs**: https://docs.dndkit.com/
- **Storybook Docs**: https://storybook.js.org/docs/react/

---

**Ready to start development!** Begin with `PriorityIndicator` atom component and follow the constitutional workflow: specify → implement → story → test → review.
