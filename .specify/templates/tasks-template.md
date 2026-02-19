---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Coverage**: CONSTITUTIONAL REQUIREMENT (Section VII) - Minimum 80% coverage for logic, 100% for security-critical paths.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

**CONSTITUTIONAL REQUIREMENT (Section III)**: Organize by VERTICAL SLICES, not horizontal layers.

- **Hunt Board NPM Library**: `src/features/[feature-name]/components/`, `src/stories/`, `tests/`
  - Components in: `atoms/`, `organisms/`, `pages/` (NO Molecules per Section II)
  - Vertical slice contains: components, actions, validation, types
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/features/`, `frontend/src/features/`
- **Mobile**: `api/src/features/`, `ios/src/` or `android/src/`
- Paths shown below assume Hunt Board structure - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan (vertical slices)
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting and formatting tools
- [ ] T004 [P] Setup Material UI theme configuration (if UI feature)
- [ ] T005 [P] Setup Storybook with CSF3 and autodocs (if UI feature)
- [ ] T006 [P] Configure accessibility testing (@storybook/addon-a11y)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T007 Setup database schema and migrations framework (if data)
- [ ] T008 [P] Setup Zod schemas infrastructure (Section IV: single source of truth)
- [ ] T009 [P] Configure type generation from schemas (Section IV)
- [ ] T010 [P] Setup API routing and middleware structure (if API)
- [ ] T011 Create base models/entities that all stories depend on
- [ ] T012 Configure error handling and logging infrastructure
- [ ] T013 Setup environment configuration management
- [ ] T014 [P] Create shared Material UI components in src/lib (if applicable)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**
> **CONSTITUTIONAL REQUIREMENT (Section VII)**: 80% coverage minimum, 100% for security paths

- [ ] T015 [P] [US1] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T016 [P] [US1] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T017 [P] [US1] Component test for [Component] in tests/unit/[Component].test.tsx (if UI)

### Implementation for User Story 1

- [ ] T018 [P] [US1] Create Zod schema for [Entity1] in src/features/[feature]/validation/[entity1].schema.ts
- [ ] T019 [P] [US1] Generate types from [Entity1] schema (Section IV: types from schemas)
- [ ] T020 [US1] Create [Entity1] data access in src/features/[feature]/data/[entity1].ts
- [ ] T021 [US1] Implement [Service] in src/features/[feature]/actions/[service].ts
- [ ] T022 [US1] Create [Atom] component in src/features/[feature]/components/atoms/[Atom].tsx (if UI)
- [ ] T023 [US1] Create [Organism] component in src/features/[feature]/components/organisms/[Organism].tsx (if UI)
- [ ] T024 [US1] Create [Page] component in src/features/[feature]/components/pages/[Page].tsx (if UI)
- [ ] T025 [US1] Add validation and error handling
- [ ] T026 [US1] Add logging for user story 1 operations

### Storybook Stories for User Story 1 (MANDATORY for UI - Section V) 📖

> **CONSTITUTIONAL REQUIREMENT (Section V)**: Every component MUST have a Storybook story

- [ ] T027 [P] [US1] Create [Atom].stories.tsx with default/empty/disabled/max states in src/stories/
- [ ] T028 [P] [US1] Add a11y checks to [Atom] story (@storybook/addon-a11y)
- [ ] T029 [P] [US1] Add interactive controls to [Atom] story
- [ ] T030 [P] [US1] Create [Organism].stories.tsx with all required states in src/stories/
- [ ] T031 [P] [US1] Add a11y checks to [Organism] story
- [ ] T032 [P] [US1] Add interaction tests to [Organism] story (if applicable)
- [ ] T033 [P] [US1] Create [Page].stories.tsx with all required states in src/stories/
- [ ] T034 [P] [US1] Add a11y checks to [Page] story
- [ ] T035 [P] [US1] Setup visual regression tests for [Page] (Chromatic/Percy)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

> **CONSTITUTIONAL REQUIREMENT (Section VII)**: 80% coverage minimum, 100% for security paths

- [ ] T036 [P] [US2] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T037 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T038 [P] [US2] Component test for [Component] in tests/unit/[Component].test.tsx (if UI)

### Implementation for User Story 2

- [ ] T039 [P] [US2] Create Zod schema for [Entity] in src/features/[feature]/validation/[entity].schema.ts
- [ ] T040 [P] [US2] Generate types from schema
- [ ] T041 [US2] Implement [Service] in src/features/[feature]/actions/[service].ts
- [ ] T042 [US2] Create [Component] in src/features/[feature]/components/[level]/[Component].tsx (if UI)
- [ ] T043 [US2] Integrate with User Story 1 components (if needed)

### Storybook Stories for User Story 2 (if UI) 📖

- [ ] T044 [P] [US2] Create [Component].stories.tsx with all required states
- [ ] T045 [P] [US2] Add a11y checks and interactive controls
- [ ] T046 [P] [US2] Add interaction/visual regression tests

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

> **CONSTITUTIONAL REQUIREMENT (Section VII)**: 80% coverage minimum, 100% for security paths

- [ ] T047 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T048 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T049 [P] [US3] Component test for [Component] in tests/unit/[Component].test.tsx (if UI)

### Implementation for User Story 3

- [ ] T050 [P] [US3] Create Zod schema for [Entity] in src/features/[feature]/validation/[entity].schema.ts
- [ ] T051 [P] [US3] Generate types from schema
- [ ] T052 [US3] Implement [Service] in src/features/[feature]/actions/[service].ts
- [ ] T053 [US3] Create [Component] in src/features/[feature]/components/[level]/[Component].tsx (if UI)

### Storybook Stories for User Story 3 (if UI) 📖

- [ ] T054 [P] [US3] Create [Component].stories.tsx with all required states
- [ ] T055 [P] [US3] Add a11y checks and interactive controls
- [ ] T056 [P] [US3] Add interaction/visual regression tests

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests to reach 80% coverage (Section VII)
- [ ] TXXX Verify 100% coverage for security-critical paths (Section VII)
- [ ] TXXX Security hardening
- [ ] TXXX [P] Final a11y audit across all components (Section V)
- [ ] TXXX [P] Visual regression test baseline updates
- [ ] TXXX Verify tree-shakability (Section XI: NPM Library Requirements)
- [ ] TXXX Verify explicit exports, no defaults (Section XI)
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
