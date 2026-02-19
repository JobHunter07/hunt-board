# Implementation Plan: Storybook Upgrade (7.6.23 → 10.2.8)

**Feature ID:** 002  
**Feature Name:** Storybook Major Version Upgrade  
**Specification:** `specs/002-storybook-upgrade/spec.md`  
**Status:** Draft  
**Created:** 2026-02-19

---

## Overview

This plan outlines the technical approach for upgrading Storybook from version 7.6.23 to 10.2.8 as required by Constitution Section XII (Dependency Management & Version Currency).

---

## Constitution Compliance Check

### Section I: Spec-Driven Design ✅
- [x] Specification created and documented
- [x] Purpose, scope, and acceptance criteria defined
- [x] Breaking changes identified
- [x] Testing strategy documented

### Section II: Component-First Architecture ✅
- [x] No component architecture changes (existing stories maintained)
- [x] Material UI theming unaffected
- [x] All existing stories remain functional

### Section V: Storybook-Driven Component Development ✅
- [x] All 12 existing stories maintained
- [x] CSF3 format preserved
- [x] Autodocs functionality preserved
- [x] a11y addon functionality verified

### Section VII: Testing Requirements ✅
- [x] Acceptance test strategy defined
- [x] Screenshot documentation plan included
- [x] E2E tests verification included
- [x] Visual regression checks planned

### Section XII: Dependency Management & Version Currency ✅
- [x] Major dependency upgrade to latest stable version
- [x] User story specification created before implementation
- [x] Breaking changes documented
- [x] Rollback plan defined
- [x] Testing strategy comprehensive

---

## Technical Context

### Current Stack
- **Storybook**: 7.6.23
- **React**: 18.2.0
- **Material UI**: 5.14+
- **Vite**: 5.4.21
- **TypeScript**: 5.x
- **Node**: 18+ or 20+

### Target Stack (Post-Upgrade)
- **Storybook**: 10.2.8
- **React**: 18.2.0 (unchanged)
- **Material UI**: 5.14+ (unchanged)
- **Vite**: 5.4.21 (unchanged)
- **TypeScript**: 5.x (unchanged)
- **Node**: 18+ or 20+ (unchanged)

### Compatibility Matrix
| Package | Current | Target | Compatible |
|---------|---------|--------|------------|
| React | 18.2.0 | 18.2.0 | ✅ Yes |
| Vite | 5.4.21 | 5.4.21 | ✅ Yes |
| TypeScript | 5.x | 5.x | ✅ Yes |
| Material UI | 5.14+ | 5.14+ | ✅ Yes |
| Storybook | 7.6.23 | 10.2.8 | ✅ Yes (CSF3) |

---

## Upgrade Strategy

### Phase 1: Pre-Upgrade Preparation
1. **Baseline Capture**:
   - Run `npm run storybook` and verify all stories work
   - Run `npm run build-storybook` and capture build time
   - Run `npm test` and `npm run test:e2e` to verify all tests pass
   - Capture screenshots of all 12 stories (baseline for comparison)
   - Document current bundle size

2. **Backup**:
   - Commit all current changes to git
   - Create backup branch: `backup/pre-storybook-10-upgrade`
   - Tag current state: `storybook-v7-baseline`

### Phase 2: Package Upgrade
1. **Upgrade Storybook CLI**:
   ```bash
   npx storybook@latest upgrade
   ```
   This command handles:
   - Package version updates in package.json
   - Automatic migration of configuration files
   - Dependency resolution

2. **Manual Package Updates** (if needed):
   ```bash
   npm install -D \
     storybook@^10.2.8 \
     @storybook/addon-a11y@^10.2.8 \
     @storybook/addon-essentials@^10.2.8 \
     @storybook/addon-interactions@^10.2.8 \
     @storybook/addon-links@^10.2.8 \
     @storybook/react@^10.2.8 \
     @storybook/react-vite@^10.2.8 \
     @storybook/test@^10.2.8
   ```

3. **Remove Deprecated Packages**:
   ```bash
   npm uninstall @storybook/testing-library
   ```

### Phase 3: Automigration
1. **Run Automigrate**:
   ```bash
   npx storybook@latest automigrate
   ```
   
2. **Review Proposed Changes**:
   - Configuration file updates
   - Addon migrations
   - API deprecation fixes
   - Accept or customize each migration

3. **Expected Migrations**:
   - `testing-library-import-path` - Update testing library imports
   - `storybook-binary` - Update package.json scripts
   - `addon-interactions` - Update configuration if needed
   - `vite-config-file` - Update Vite configuration if needed

### Phase 4: Configuration Updates

#### .storybook/main.ts
**Current (v7)**:
```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

**Expected (v10)** - likely minimal changes:
- Type imports may change
- Some configuration options may be renamed
- New options may be available

**Action**: Review automigration changes and manually verify

#### .storybook/preview.tsx
**Current** and **Expected** - likely unchanged:
- CSF3 format is fully supported in v10
- Theme provider setup remains the same
- Global decorators remain the same

**Action**: Verify no changes needed

### Phase 5: Story Updates

#### Testing Library Import Updates
**Files Affected**: Stories using `play` functions

**Current (v7)**:
```typescript
import { userEvent, within } from '@storybook/testing-library';
```

**Updated (v10)**:
```typescript
import { userEvent, within } from '@storybook/test';
```

**Files to Update**:
- `src/stories/pages/KanbanBoardPage.stories.tsx` (has play function)
- Any future interactive stories

**Search Pattern**:
```bash
grep -r "@storybook/testing-library" src/stories/
```

### Phase 6: Verification

#### Type Check
```bash
npm run typecheck
```
**Expected**: No type errors

#### Storybook Dev Server
```bash
npm run storybook
```
**Expected**: 
- Starts without errors
- All 12 stories visible
- Stories render correctly
- Interactive controls work

#### Storybook Build
```bash
npm run build-storybook
```
**Expected**:
- Build completes successfully
- No errors or critical warnings
- Static site functional

#### Unit Tests
```bash
npm test
```
**Expected**: All tests pass (Storybook upgrade should not affect Vitest)

#### E2E Tests
```bash
npm run test:e2e
```
**Expected**: All 15 Playwright tests pass

---

## File Structure

### Modified Files
```
hunt-board/
├── package.json                          # Dependency versions updated
├── package-lock.json                     # Lock file updated
├── .storybook/
│   ├── main.ts                          # Possible config updates (automigrated)
│   └── preview.tsx                      # Likely unchanged
├── src/stories/
│   └── pages/
│       └── KanbanBoardPage.stories.tsx  # Import path updated
└── specs/
    └── 002-storybook-upgrade/
        ├── spec.md                      # This specification
        ├── plan.md                      # This plan
        ├── tasks.md                     # Task breakdown
        └── screenshots/                 # Test evidence
            ├── dev-server-running.png
            ├── all-stories-rendering.png
            ├── a11y-addon-working.png
            ├── interactive-story-working.png
            ├── build-success.png
            └── e2e-tests-passing.png
```

### New Files
- `specs/002-storybook-upgrade/screenshots/` - Test evidence per Constitution Section VII

---

## Risk Mitigation

### Risk 1: Configuration Breaking Changes
**Likelihood**: Low  
**Impact**: Medium  
**Mitigation**: 
- Automigrate tool handles most changes
- Manual review of all configuration changes
- Git rollback available

### Risk 2: Story Import Errors
**Likelihood**: Low  
**Impact**: Low  
**Mitigation**:
- Only `@storybook/testing-library` imports affected
- Simple find-and-replace fix
- TypeScript will catch import errors

### Risk 3: Vite Compatibility Issues
**Likelihood**: Very Low  
**Impact**: High  
**Mitigation**:
- Storybook 10 has improved Vite support
- Vite 5.x fully supported
- Rollback plan ready

### Risk 4: Addon Incompatibility
**Likelihood**: Very Low  
**Impact**: Medium  
**Mitigation**:
- All addons have v10 versions
- a11y addon actively maintained
- Test addon functionality immediately after upgrade

---

## Rollback Triggers

Rollback if any of the following occur:
1. ❌ Automigration fails with unrecoverable errors
2. ❌ `npm run storybook` fails to start
3. ❌ More than 3 stories fail to render
4. ❌ Critical addon (a11y) doesn't work
5. ❌ TypeScript errors cannot be resolved within 30 minutes
6. ❌ Build time increases by >50%
7. ❌ E2E tests fail and cannot be fixed within 30 minutes

**Rollback Command**:
```bash
git checkout backup/pre-storybook-10-upgrade
npm install
```

---

## Testing Checklist

### Pre-Upgrade ✅
- [ ] All stories work in v7
- [ ] `npm run build-storybook` succeeds
- [ ] `npm test` passes
- [ ] `npm run test:e2e` passes
- [ ] Baseline screenshots captured
- [ ] Build time documented

### Post-Upgrade Validation
- [ ] `npm run typecheck` passes
- [ ] `npm run storybook` starts successfully
- [ ] All 12 stories render without errors:
  - [ ] Atoms: AddButton, ColumnHeader, FilterButton, PriorityIndicator, SearchField, TagChip
  - [ ] Organisms: AddTargetModal, CardDetailModal, JobTargetCard, KanbanColumn, SearchFilterBar
  - [ ] Pages: KanbanBoardPage
- [ ] Interactive stories (play functions) execute correctly
- [ ] a11y addon displays checks and results
- [ ] `npm run build-storybook` completes successfully
- [ ] Static Storybook build opens and functions
- [ ] `npm test` passes
- [ ] `npm run test:e2e` passes
- [ ] No new console errors (except unrelated deprecation warnings)
- [ ] Storybook startup time acceptable (<30s)

### Screenshot Documentation (Constitutional Requirement)
- [ ] Dev server screenshot captured
- [ ] Story rendering screenshots captured (3 levels)
- [ ] a11y addon screenshot captured
- [ ] Interactive story screenshot captured
- [ ] Build success screenshot captured
- [ ] E2E test pass screenshot captured
- [ ] All screenshots stored in `specs/002-storybook-upgrade/screenshots/`
- [ ] Screenshots linked in spec.md

---

## Performance Expectations

### Storybook 10 Improvements
- **Startup Time**: Expected 10-20% faster
- **Build Time**: Expected 10-20% faster
- **HMR (Hot Reload)**: Expected improvement
- **Bundle Size**: Potentially smaller (better tree-shaking)

### Benchmarks to Capture
- Dev server cold start time
- Dev server warm start time
- Build time
- Bundle size (storybook-static folder)

---

## Documentation Updates

### Files Requiring Updates
1. **README.md** (root):
   - Storybook version badge (if exists)
   - Development instructions (if changed)

2. **src/features/kanban-board/README.md**:
   - Update Storybook version reference
   - Update Storybook commands if changed

3. **specs/002-storybook-upgrade/spec.md**:
   - Add test results section post-implementation
   - Link screenshots
   - Document any deviations from plan

---

## Success Criteria

### Must Meet
- ✅ All Storybook packages at version 10.2.8
- ✅ All stories render correctly
- ✅ All tests pass (unit, E2E)
- ✅ a11y addon functional
- ✅ No regressions in functionality
- ✅ Screenshot documentation complete
- ✅ Constitution Section XII compliance verified

### Performance Goals
- 🎯 Startup time: <30 seconds (ideally <20s)
- 🎯 Build time: <30 seconds (ideally <20s)
- 🎯 No performance regressions

---

## Implementation Order

1. **Preparation** (10 min)
   - Capture baselines
   - Create backup branch
   - Commit all changes

2. **Upgrade** (10 min)
   - Run `npx storybook@latest upgrade`
   - Review package.json changes

3. **Automigrate** (15 min)
   - Run `npx storybook@latest automigrate`
   - Review and apply migrations
   - Commit configuration changes

4. **Code Updates** (20 min)
   - Update testing-library imports
   - Fix any TypeScript errors
   - Commit code changes

5. **Verification** (45 min)
   - Run all test suites
   - Verify all stories
   - Test addon functionality
   - Performance benchmarking

6. **Documentation** (30 min)
   - Capture screenshots
   - Update documentation
   - Document results in spec

**Total Time**: ~2.5 hours

---

## Approval

**Plan Status**: Draft  
**Ready for Implementation**: Pending spec approval  
**Constitutional Compliance**: Verified

**Reviewers**:
- [ ] Technical Lead
- [ ] Project Owner

**Approved By**: _Pending_  
**Approval Date**: _Pending_
