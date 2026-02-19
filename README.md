# Hunt Board - Job Hunting Kanban Board

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-5.15-blue.svg)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A Trello-style Kanban board designed specifically for **job hunting**, not passive job searching. Visualize the full hunting lifecycle: identifying targets, gathering intel, building relationships, tracking signals, and executing outreach.

## 🎯 Features

### ✅ Implemented (v0.1.0 - MVP)

- **9 Hunting-Oriented Columns**:
  1. 🎯 Targets Identified
  2. 🔍 Intel Gathering
  3. 🧭 Warm-Up Phase
  4. 📨 Outreach Initiated
  5. ⏳ Follow-Up Required
  6. 🗣️ Conversation Started
  7. 📝 Interview Pipeline
  8. 🦌 Stalled / Cold
  9. 🏆 Offer / Success

- **Material Design 3 Compliance**: Deep red theme (#B71C1C), 8px spacing grid, responsive layout
- **Type-Safe Data Model**: Zod schemas for all entities with automatic TypeScript type inference
- **LocalStorage Persistence**: All data saved locally with 500ms debounced writes
- **Drag-and-Drop**: Move targets between columns with @dnd-kit (WCAG AA keyboard support)
- **Tree-Shakable NPM Library**: ESM module with explicit named exports only

### 🚧 In Progress

- **Storybook Stories**: Component documentation with a11y checks (T033-T039)
- **Create/Edit Modals**: Add and edit job targets with React Hook Form + Zod validation (User Story 2)
- **Detailed Card Views**: Tabbed modal for warm-up actions, outreach history, follow-ups (User Story 3)
- **Search & Filters**: Filter by priority, tags, follow-up status (User Story 4)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the Hunt Board. 

### Build

```bash
npm run build
```

Output: `dist/index.js` (tree-shakable ESM module)

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
npm run format
```

### Storybook (Coming Soon)

```bash
npm run storybook
```

## 📦 NPM Library Usage

This project is structured as an NPM library (`@jobhunter07/hunt-board`) with explicit named exports:

```typescript
import {
  KanbanBoardPage,
  useBoardState,
  JobTarget,
  createJobTarget,
  huntBoardTheme
} from '@jobhunter07/hunt-board';
```

All exports are tree-shakable. See [src/index.ts](src/index.ts) for the complete export list.

## 🏗️ Architecture

### Tech Stack

- **React 18.2**: Functional components with hooks
- **TypeScript 5.3**: Strict mode enabled
- **Material UI 5.15**: Component library with deep red theme
- **Zod 3.22**: Schema-first validation and type generation
- **@dnd-kit/core 6.1**: Modern drag-and-drop library
- **Vite 5.1**: Build tool and dev server
- **Vitest 1.3**: Testing framework (80% coverage target)
- **Storybook 7.6**: Component documentation with CSF3

### Project Structure

```
hunt-board/
├── src/
│   ├── features/kanban-board/        # Vertical slice architecture
│   │   ├── components/
│   │   │   ├── atoms/                # Atomic components
│   │   │   │   ├── PriorityIndicator.tsx
│   │   │   │   ├── TagChip.tsx
│   │   │   │   ├── ColumnHeader.tsx
│   │   │   │   └── AddButton.tsx
│   │   │   ├── organisms/            # Composite components
│   │   │   │   ├── KanbanColumn.tsx
│   │   │   │   └── JobTargetCard.tsx
│   │   │   └── pages/                # Page-level components
│   │   │       └── KanbanBoardPage.tsx
│   │   ├── hooks/                    # State management hooks
│   │   │   ├── useBoardState.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useDragAndDrop.ts
│   │   ├── validation/               # Zod schemas (SSOT)
│   │   │   ├── enums.ts
│   │   │   ├── tag.schema.ts
│   │   │   ├── followUp.schema.ts
│   │   │   ├── outreachRecord.schema.ts
│   │   │   ├── warmUpAction.schema.ts
│   │   │   ├── column.schema.ts
│   │   │   ├── jobTarget.schema.ts
│   │   │   ├── boardState.schema.ts
│   │   │   ├── userPreferences.schema.ts
│   │   │   └── utils.ts
│   │   ├── types/                    # Inferred types (no hand-written types)
│   │   │   └── index.ts
│   │   ├── utils/                    # Feature utilities
│   │   │   └── storage.ts
│   │   └── index.ts                  # Feature exports
│   ├── lib/                          # Shared utilities
│   │   └── theme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.ts                      # NPM library entry point
├── specs/001-kanban-board/           # Feature specifications
│   ├── spec.md
│   ├── plan.md
│   ├── tasks.md
│   ├── research.md
│   ├── data-model.md
│   └── quickstart.md
├── tests/                            # Test setup
│   └── setup.ts
├── .storybook/                       # Storybook configuration
│   ├── main.ts
│   └── preview.tsx
└── package.json
```

### Constitutional Principles

This project follows the **Hunt Board Engineering Constitution** ([.specify/memory/constitution.md](.specify/memory/constitution.md)):

1. **Spec-Driven Design**: Every feature requires an approved specification before implementation
2. **Component Architecture**: Three levels only (Atoms → Organisms → Pages), NO Molecules
3. **Vertical Slice Architecture**: Organize by feature, not technical layers
4. **Data Configuration**: All types generated from Zod schemas (never hand-written)
5. **Storybook Requirements**: Every component MUST have stories (Default, Loading, Error, Disabled, Empty, Max Content)
6. **Testing Standards**: 80% minimum coverage, 100% for security-critical paths
7. **NPM Library Requirements**: Tree-shakable exports, no default exports, types bundled

## 📊 Data Model

All data models are defined as Zod schemas in [src/features/kanban-board/validation/](src/features/kanban-board/validation/). TypeScript types are automatically inferred using `z.infer<typeof Schema>`.

### Core Entities

- **JobTarget**: Main entity representing a job opportunity card
- **Column**: Kanban column configuration (9 hunting-oriented columns)
- **Tag**: Categorization tag for job targets
- **WarmUpAction**: Relationship-building action before outreach
- **OutreachRecord**: Record of outreach attempt
- **FollowUp**: Scheduled follow-up action
- **BoardState**: Complete board state (for localStorage persistence)
- **UserPreferences**: UI state preferences

See [specs/001-kanban-board/data-model.md](specs/001-kanban-board/data-model.md) for the complete data model specification.

## 🎨 Design System

### Theme

- **Primary**: Deep Red (#B71C1C)
- **Secondary**: Slate (#546E7A)
- **Background**: Light Grey (#F5F5F5)
- **Spacing**: 8px grid
- **Border Radius**: 8px
- **Typography**: Roboto font family

### Component Breakdown

- **Atoms**: PriorityIndicator, TagChip, ColumnHeader, AddButton
- **Organisms**: KanbanColumn, JobTargetCard
- **Pages**: KanbanBoardPage

## 📝 Development Workflow

1. **Specify**: Create feature specification in `specs/[###-feature-name]/spec.md`
2. **Plan**: Create implementation plan in `specs/[###-feature-name]/plan.md`
3. **Tasks**: Decompose into atomic tasks in `specs/[###-feature-name]/tasks.md`
4. **Implement**: Build per specification (Setup → Foundation → User Stories)
5. **Storybook**: Create stories for all components
6. **Test**: Write tests (80% coverage minimum)
7. **Review**: Code review against specification and constitution
8. **Deploy**: Feature deployed as atomic unit

## 📚 Documentation

- **Feature Specification**: [specs/001-kanban-board/spec.md](specs/001-kanban-board/spec.md)
- **Implementation Plan**: [specs/001-kanban-board/plan.md](specs/001-kanban-board/plan.md)
- **Task Breakdown**: [specs/001-kanban-board/tasks.md](specs/001-kanban-board/tasks.md)
- **Research Decisions**: [specs/001-kanban-board/research.md](specs/001-kanban-board/research.md)
- **Data Model**: [specs/001-kanban-board/data-model.md](specs/001-kanban-board/data-model.md)
- **Quick Start Guide**: [specs/001-kanban-board/quickstart.md](specs/001-kanban-board/quickstart.md)

## 🤝 Contributing

This project uses a strict specification-driven workflow:

1. All features require an approved specification before coding
2. Follow the Engineering Constitution ([.specify/memory/constitution.md](.specify/memory/constitution.md))
3. Use `/speckit.specify` to create feature specifications
4. Use `/speckit.plan` to create implementation plans
5. Use `/speckit.tasks` to decompose plans into atomic tasks
6. Implement features following tasks.md sequentially

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built with the **Speckit** specification-driven development framework.

---

**The Hunt Board** - This is the difference between **searching** and **hunting**.
