# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., TypeScript 5.x, Python 3.11, Swift 5.9 or NEEDS CLARIFICATION]  
**React Version**: [e.g., React 18.x or NEEDS CLARIFICATION - Hunt Board NPM Library]  
**Material UI Version**: [e.g., MUI 5.x or NEEDS CLARIFICATION - Hunt Board NPM Library]  
**Storybook Version**: [e.g., Storybook 7.x or NEEDS CLARIFICATION - Hunt Board NPM Library]  
**Primary Dependencies**: [e.g., Zod (validation), tRPC, FastAPI, UIKit or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., Vitest, Jest, React Testing Library, pytest or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Browser (modern), Node.js, Linux server, iOS 15+ or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Component Architecture**: [if UI feature: Atom/Organism/Page levels used or N/A]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Reference**: `.specify/memory/constitution.md`

### Section I: Spec-Driven Design
- [ ] Feature has approved specification before implementation?
- [ ] Specification defines: purpose, scope, inputs/outputs, UX flows, error handling?
- [ ] Specification includes accessibility requirements?
- [ ] Specification includes Storybook requirements (if UI feature)?

### Section II: Component-First Architecture (if UI feature)
- [ ] Components use ONLY Atom/Organism/Page levels (NO Molecules)?
- [ ] Each component has specification?
- [ ] Each component will have Storybook story?
- [ ] Components use Material UI styling and theming?
- [ ] Responsive behavior defined by default?

### Section III: Vertical Slice Architecture
- [ ] Feature organized by use-case/vertical slice (not technical layers)?
- [ ] Slice is self-contained (UI + actions + validation + data + tests)?
- [ ] No cross-slice coupling except through explicit interfaces?
- [ ] Shared utilities properly documented and versioned in `/src/lib`?

### Section IV: Data Configuration Management
- [ ] Domain models defined in schema files (Zod preferred)?
- [ ] Types generated from schemas (not hand-written)?
- [ ] Data access goes through typed, validated interfaces?

### Section V: Storybook-Driven Development (if UI feature)
- [ ] Every component will have Storybook story in `src/stories`?
- [ ] Stories include: default, edge cases, accessibility checks?
- [ ] Stories use CSF3 with autodocs?

### Section VI: Development Workflow
- [ ] Feature decomposed into atomic tasks?
- [ ] Each task traceable to specification?
- [ ] Clear acceptance criteria for each task?

### Section VII: Testing Requirements
- [ ] Testing strategy defined (unit/integration/component/visual/a11y/e2e)?
- [ ] Minimum 80% coverage planned for logic?
- [ ] 100% coverage planned for security-critical paths?

### Section XI: NPM Library Requirements (Hunt Board)
- [ ] Feature is tree-shakable?
- [ ] Exports are explicit (no default exports)?
- [ ] Types bundled with package?
- [ ] No environment-specific logic?
- [ ] No authentication/security logic (delegated to app.jobhunter07.com)?

**Violations Requiring Justification**: [List any constitutional violations with justification, or "None"]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
  
  CONSTITUTIONAL REQUIREMENT (Section III): Organize by VERTICAL SLICES (use-case),
  not horizontal layers. Each slice should contain UI, actions, validation, data,
  tests, stories, and docs.
-->

```text
# [REMOVE IF UNUSED] Option 1: Hunt Board NPM Library (VERTICAL SLICES)
src/
├── features/                    # Vertical slices by use-case
│   └── [feature-name]/          # Self-contained feature slice
│       ├── components/          # Atoms, Organisms, Pages (NO Molecules)
│       │   ├── atoms/
│       │   ├── organisms/
│       │   └── pages/
│       ├── actions/             # Server actions (if applicable)
│       ├── validation/          # Zod schemas
│       ├── types/               # Generated from schemas
│       └── index.ts             # Explicit exports (no defaults)
├── lib/                         # Shared utilities (stable, versioned)
├── stories/                     # Storybook stories (CSF3, autodocs)
│   └── [ComponentName].stories.tsx
└── types/                       # Global type definitions

tests/
├── contract/                    # API contract tests
├── integration/                 # Feature integration tests
├── unit/                        # Pure function tests
└── visual/                      # Visual regression (Chromatic/Percy)

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── features/                # Vertical slices
│   │   └── [feature-name]/
│   │       ├── models/          # Zod schemas
│   │       ├── services/
│   │       ├── api/
│   │       └── validation/
│   └── lib/
└── tests/

frontend/
├── src/
│   ├── features/                # Vertical slices
│   │   └── [feature-name]/
│   │       ├── components/      # Atoms/Organisms/Pages
│   │       ├── actions/
│   │       └── validation/
│   ├── lib/
│   └── stories/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
