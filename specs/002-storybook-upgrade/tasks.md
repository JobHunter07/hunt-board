# Tasks: Storybook Upgrade (7.6.23 → 10.2.8)

**Feature ID:** 002  
**Feature Name:** Storybook Major Version Upgrade  
**Specification:** `specs/002-storybook-upgrade/spec.md`  
**Plan:** `specs/002-storybook-upgrade/plan.md`  
**Status:** Ready for Implementation  
**Created:** 2026-02-19

---

## Task Overview

**Total Tasks**: 18  
**Estimated Time**: ~3 hours  
**Dependencies**: Linear sequence (most tasks depend on previous completion)

---

## Phase 1: Preparation (Tasks 001-004)

### T001: Capture Baseline Metrics
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: None  
**Files**: None (documentation only)

**Actions**:
1. Run `npm run storybook` and verify all 12 stories work
2. Capture startup time
3. Run `npm run build-storybook` and capture build time
4. Document current bundle size (storybook-static folder)
5. Run `npm test` and verify all tests pass
6. Run `npm run test:e2e` and verify all 15 tests pass
7. Document results in scratch notes

**Acceptance Criteria**:
- All stories render in Storybook v7
- Build completes successfully
- All tests pass
- Baseline metrics documented

---

### T002: Capture Baseline Screenshots
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T001  
**Files**: Create `specs/002-storybook-upgrade/screenshots/baseline/`

**Actions**:
1. Create screenshots directory
2. Open Storybook at http://localhost:6009 (or current port)
3. Capture screenshot of Storybook UI showing story list
4. Capture screenshot of 1 atom story (any)
5. Capture screenshot of 1 organism story (any)
6. Capture screenshot of 1 page story (KanbanBoardPage)
7. Capture screenshot of a11y addon panel
8. Save as:
   - `baseline-storybook-ui.png`
   - `baseline-atom-story.png`
   - `baseline-organism-story.png`
   - `baseline-page-story.png`
   - `baseline-a11y-addon.png`

**Acceptance Criteria**:
- 5 baseline screenshots captured
- Screenshots stored in baseline directory
- Screenshots show Storybook v7 working

---

### T003: Create Git Backup
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: T001, T002  
**Files**: None (git operations)

**Actions**:
1. Commit any uncommitted changes
2. Create backup branch: `git checkout -b backup/pre-storybook-10-upgrade`
3. Push backup branch: `git push origin backup/pre-storybook-10-upgrade`
4. Create tag: `git tag storybook-v7-baseline`
5. Push tag: `git push origin storybook-v7-baseline`
6. Return to main branch: `git checkout main`

**Acceptance Criteria**:
- Backup branch created and pushed
- Tag created and pushed
- Working on main branch

---

### T004: Review Current Configuration
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: None  
**Files**: Read `.storybook/main.ts`, `.storybook/preview.tsx`

**Actions**:
1. Read `.storybook/main.ts` and document configuration
2. Read `.storybook/preview.tsx` and document setup
3. List all Storybook-related packages in package.json
4. Document current configuration for comparison after upgrade

**Acceptance Criteria**:
- Current configuration documented
- All Storybook packages listed

---

## Phase 2: Package Upgrade (Tasks 005-007)

### T005: Run Storybook Upgrade Command
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T003 (backup must exist)  
**Files**: `package.json`, `package-lock.json`

**Actions**:
1. Run: `npx storybook@latest upgrade`
2. Review package.json changes
3. Verify all @storybook packages are version 10.2.8
4. Check for any warnings or errors
5. Commit changes: `git commit -m "chore: upgrade Storybook to 10.2.8"`

**Acceptance Criteria**:
- Command completes successfully
- package.json shows Storybook 10.2.8
- Changes committed to git

---

### T006: Install @storybook/test Package
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: T005  
**Files**: `package.json`, `package-lock.json`

**Actions**:
1. Run: `npm install -D @storybook/test@^10.2.8`
2. Verify installation successful
3. Commit changes: `git commit -m "chore: add @storybook/test package"`

**Acceptance Criteria**:
- @storybook/test installed at version 10.2.8
- package.json and package-lock.json updated
- Changes committed

---

### T007: Remove Deprecated @storybook/testing-library
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: T006  
**Files**: `package.json`, `package-lock.json`

**Actions**:
1. Run: `npm uninstall @storybook/testing-library`
2. Verify package removed from package.json
3. Commit changes: `git commit -m "chore: remove deprecated @storybook/testing-library"`

**Acceptance Criteria**:
- @storybook/testing-library removed from package.json
- Package no longer in node_modules
- Changes committed

---

## Phase 3: Automigration (Tasks 008-009)

### T008: Run Storybook Automigrate
**Status**: [ ] Not Started  
**Estimated Time**: 15 minutes  
**Dependencies**: T007  
**Files**: `.storybook/main.ts`, potentially other config files

**Actions**:
1. Run: `npx storybook@latest automigrate`
2. Review each proposed migration
3. Accept recommended migrations (typically all)
4. Document which migrations were applied
5. Review changes to `.storybook/main.ts`
6. Verify configuration still valid

**Acceptance Criteria**:
- Automigrate completes successfully
- All migrations applied
- Configuration files valid
- No errors reported

---

### T009: Commit Automigration Changes
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: T008  
**Files**: Configuration files modified by automigrate

**Actions**:
1. Review all changes made by automigrate
2. Run: `git add .storybook/`
3. Commit: `git commit -m "chore: apply Storybook 10 automigration changes"`

**Acceptance Criteria**:
- All automigration changes committed
- Clear commit message documenting migration

---

## Phase 4: Code Updates (Tasks 010-011)

### T010: Update Testing Library Imports in Stories
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T009  
**Files**: `src/stories/pages/KanbanBoardPage.stories.tsx`

**Actions**:
1. Search for `@storybook/testing-library` imports:
   ```bash
   grep -r "@storybook/testing-library" src/
   ```
2. Update imports in KanbanBoardPage.stories.tsx:
   - OLD: `import { userEvent, within } from '@storybook/testing-library';`
   - NEW: `import { userEvent, within } from '@storybook/test';`
3. Check if any other files use testing-library imports
4. Update all found instances

**Acceptance Criteria**:
- All `@storybook/testing-library` imports replaced with `@storybook/test`
- No remaining references to old package
- Files still compile

---

### T011: Commit Import Updates
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: T010  
**Files**: Story files with updated imports

**Actions**:
1. Run: `git add src/stories/`
2. Commit: `git commit -m "refactor: update testing library imports to @storybook/test"`

**Acceptance Criteria**:
- Import changes committed
- Clear commit message

---

## Phase 5: Verification (Tasks 012-016)

### T012: Verify TypeScript Compilation
**Status**: [ ] Not Started  
**Estimated Time**: 5 minutes  
**Dependencies**: T011  
**Files**: None (validation only)

**Actions**:
1. Run: `npm run typecheck`
2. Verify no TypeScript errors
3. If errors exist, fix them
4. Document any type-related changes needed

**Acceptance Criteria**:
- `npm run typecheck` passes with no errors
- All type definitions compatible with Storybook 10

---

### T013: Verify Storybook Dev Server
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T012  
**Files**: None (validation only)

**Actions**:
1. Run: `npm run storybook`
2. Verify server starts without errors
3. Open browser to Storybook URL
4. Verify all 12 stories visible in sidebar
5. Click through each story and verify rendering:
   - Atoms: AddButton, ColumnHeader, FilterButton, PriorityIndicator, SearchField, TagChip
   - Organisms: AddTargetModal, CardDetailModal, JobTargetCard, KanbanColumn, SearchFilterBar
   - Pages: KanbanBoardPage
6. Verify a11y addon panel shows checks
7. Test interactive controls on a few stories
8. Check console for errors (ignore unrelated warnings)
9. Document startup time

**Acceptance Criteria**:
- Storybook starts successfully
- All 12 stories render correctly
- a11y addon functional
- Interactive controls work
- No critical errors in console

---

### T014: Verify Storybook Static Build
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T013  
**Files**: None (validation only)

**Actions**:
1. Run: `npm run build-storybook`
2. Verify build completes successfully
3. Document build time
4. Open `storybook-static/index.html` in browser
5. Verify static site loads
6. Click through 3-4 stories to verify functionality
7. Document bundle size (storybook-static folder size)

**Acceptance Criteria**:
- Build completes without errors
- Static site functional
- Build time acceptable (< 30s)
- Bundle size documented

---

### T015: Verify Unit and E2E Tests
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T014  
**Files**: None (validation only)

**Actions**:
1. Run: `npm test`
2. Verify all unit tests pass (Storybook upgrade should not affect Vitest)
3. Run: `npm run test:e2e`
4. Verify all 15 Playwright tests pass
5. Document any test failures and investigate

**Acceptance Criteria**:
- All unit tests pass
- All 15 E2E tests pass
- No test regressions introduced by upgrade

---

### T016: Verify Interactive Stories (Play Functions)
**Status**: [ ] Not Started  
**Estimated Time**: 10 minutes  
**Dependencies**: T013  
**Files**: None (validation only)

**Actions**:
1. Open Storybook
2. Navigate to KanbanBoardPage story with play function
3. Watch play function execute automatically
4. Verify no errors in console
5. Verify interactions work correctly
6. Test manually interacting with the story after play function

**Acceptance Criteria**:
- Play function executes without errors
- @storybook/test imports work correctly
- User interactions function as expected

---

## Phase 6: Documentation (Tasks 017-018)

### T017: Capture Post-Upgrade Screenshots
**Status**: [ ] Not Started  
**Estimated Time**: 15 minutes  
**Dependencies**: T013, T014, T015, T016  
**Files**: Create `specs/002-storybook-upgrade/screenshots/`

**Actions**:
1. Start Storybook: `npm run storybook`
2. Capture screenshots (use Playwright or manual):
   - `dev-server-running.png` - Storybook UI with all stories
   - `all-stories-rendering.png` - Canvas showing story rendered
   - `a11y-addon-working.png` - a11y addon panel with checks
   - `interactive-story-working.png` - KanbanBoardPage story after play function
3. Capture terminal screenshots:
   - `build-success.png` - Terminal showing `npm run build-storybook` success
   - `e2e-tests-passing.png` - Terminal showing all Playwright tests passing
4. Save all screenshots to `specs/002-storybook-upgrade/screenshots/`

**Acceptance Criteria**:
- 6 screenshots captured
- Screenshots show Storybook 10 working correctly
- Screenshots clearly visible and high quality
- Constitutional requirement (Section VII) satisfied

---

### T018: Update Documentation
**Status**: [ ] Not Started  
**Estimated Time**: 20 minutes  
**Dependencies**: T017  
**Files**: `README.md`, `src/features/kanban-board/README.md`, `specs/002-storybook-upgrade/spec.md`

**Actions**:
1. Update root README.md:
   - Update Storybook version if mentioned
   - Verify commands still correct
2. Update src/features/kanban-board/README.md:
   - Update Storybook version reference
   - Update any changed commands
3. Update specs/002-storybook-upgrade/spec.md:
   - Add "Test Results" section
   - Link all screenshots
   - Document actual vs. expected outcomes
   - Document performance improvements
   - Mark all acceptance criteria complete
   - Change status to "Complete"
4. Commit all documentation: `git commit -m "docs: update for Storybook 10 upgrade"`

**Acceptance Criteria**:
- All documentation updated
- Screenshots linked in spec
- Test results documented
- Specification marked complete

---

## Task Summary

### By Phase
- **Phase 1: Preparation** - 4 tasks (30 min)
- **Phase 2: Package Upgrade** - 3 tasks (20 min)
- **Phase 3: Automigration** - 2 tasks (20 min)
- **Phase 4: Code Updates** - 2 tasks (15 min)
- **Phase 5: Verification** - 5 tasks (45 min)
- **Phase 6: Documentation** - 2 tasks (35 min)

**Total**: 18 tasks, ~2 hours 45 minutes

### Critical Path
T001 → T002 → T003 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T017 → T018

### Parallel Opportunities
- T001 and T004 can run in parallel (both read-only)
- T013, T014, T015, T016 can run in any order after T012

---

## Rollback Procedure

If any task fails and cannot be resolved:

1. **Stop immediately**
2. **Document the failure** in spec.md
3. **Execute rollback**:
   ```bash
   git checkout backup/pre-storybook-10-upgrade
   npm install
   npm run storybook
   ```
4. **Verify rollback successful** (all stories work)
5. **Investigate root cause**
6. **Update specification** with findings
7. **Retry upgrade** after fixes

---

## Success Validation

After completing all tasks, verify:
- [ ] All 18 tasks marked complete
- [ ] All acceptance criteria met
- [ ] All screenshots captured and linked
- [ ] All documentation updated
- [ ] Storybook 10.2.8 running without errors
- [ ] All tests passing
- [ ] Performance metrics acceptable
- [ ] Constitution Section XII compliance verified

---

## Approval

**Tasks Status**: Ready for Execution  
**Prerequisites**: Specification and plan approved  

**Ready to Start**: Pending approval

---

## Task Execution Status

**Started**: _Not Started_  
**Completed**: 0 / 18  
**Progress**: 0%

---

**Tasks will be marked [X] as they are completed during implementation.**
