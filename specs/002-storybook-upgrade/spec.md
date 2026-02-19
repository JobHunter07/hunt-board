# Specification: Storybook Upgrade (7.6.23 → 10.2.8)

**Feature ID:** 002  
**Feature Name:** Storybook Major Version Upgrade  
**Status:** Draft  
**Created:** 2026-02-19  
**Author:** System  
**Constitutional Compliance:** Section XII - Dependency Management & Version Currency

---

## Purpose

Upgrade Storybook from version 7.6.23 to 10.2.8 (latest stable) to comply with Constitution Section XII requirements for dependency version currency.

### Rationale
- **Security**: Access to latest security patches and fixes
- **Performance**: Storybook 10 includes significant performance improvements
- **Features**: New capabilities including improved Vite integration, better autodocs
- **Support**: Version 7.x approaching end of active support
- **Constitutional Requirement**: Major dependencies must use latest stable versions

---

## Scope

### In Scope
- Upgrade `@storybook/*` packages from 7.6.23 to 10.2.8
- Update Storybook configuration files for v10 compatibility
- Verify all existing stories continue to work
- Update documentation to reflect new version
- Validate all addons (a11y, interactions, essentials) work correctly
- Ensure Playwright tests continue to pass

### Out of Scope
- Adding new Storybook features or stories (separate user story)
- Changing story structure or organization
- Modifying component implementations
- Upgrading other unrelated dependencies

---

## Current State

### Installed Versions
```json
{
  "@storybook/addon-a11y": "^7.6.23",
  "@storybook/addon-essentials": "^7.6.23",
  "@storybook/addon-interactions": "^7.6.23",
  "@storybook/addon-links": "^7.6.23",
  "@storybook/react": "^7.6.23",
  "@storybook/react-vite": "^7.6.23",
  "@storybook/testing-library": "^0.2.2"
}
```

### Configuration Files
- `.storybook/main.ts` - Uses Storybook 7.x API
- `.storybook/preview.tsx` - CSF3 format
- `package.json` - Scripts for `storybook` and `build-storybook`

### Existing Stories
- 12 component stories (atoms, organisms, pages)
- All stories use CSF3 format with autodocs
- Accessibility addon (@storybook/addon-a11y) integrated
- Interactive controls configured

---

## Target State

### Target Versions
```json
{
  "@storybook/addon-a11y": "^10.2.8",
  "@storybook/addon-essentials": "^10.2.8",
  "@storybook/addon-interactions": "^10.2.8",
  "@storybook/addon-links": "^10.2.8",
  "@storybook/react": "^10.2.8",
  "@storybook/react-vite": "^10.2.8",
  "@storybook/test": "^10.2.8"
}
```

### Breaking Changes (7.x → 10.x)

#### 1. Testing Library Changes
- `@storybook/testing-library` deprecated
- Replaced by `@storybook/test` (includes testing-library functionality)
- Update imports in interactive stories

#### 2. Configuration API Changes
- `.storybook/main.ts`: Some options renamed/restructured
- TypeScript types updated: `StorybookConfig` interface changes
- Addon registration may have new format

#### 3. Vite Integration
- `@storybook/react-vite` may have new Vite configuration options
- Better ESM support
- Improved HMR (Hot Module Replacement)

#### 4. Autodocs Changes
- Enhanced autodocs generation
- May require story metadata updates
- Better TypeScript inference

---

## Migration Requirements

### 1. Package Updates
```bash
npm install -D \
  storybook@latest \
  @storybook/addon-a11y@latest \
  @storybook/addon-essentials@latest \
  @storybook/addon-interactions@latest \
  @storybook/addon-links@latest \
  @storybook/react@latest \
  @storybook/react-vite@latest \
  @storybook/test@latest
```

### 2. Configuration Migration
- Run Storybook automigration: `npx storybook@latest automigrate`
- Review and apply suggested changes
- Manually verify `.storybook/main.ts` configuration
- Update TypeScript types if necessary

### 3. Story Updates
- Replace `@storybook/testing-library` imports with `@storybook/test`
- Example:
  ```typescript
  // OLD (v7)
  import { userEvent, within } from '@storybook/testing-library';
  
  // NEW (v10)
  import { userEvent, within } from '@storybook/test';
  ```
- Verify all stories render correctly
- Check interactive stories (play functions) work

### 4. Script Updates
- Verify `package.json` scripts still work:
  - `npm run storybook` (dev server)
  - `npm run build-storybook` (static build)

---

## Impact Assessment

### Files Affected
- `package.json` - Dependency versions
- `package-lock.json` - Lock file updates
- `.storybook/main.ts` - Possible configuration changes
- `.storybook/preview.tsx` - Possible API changes
- `src/stories/**/*.stories.tsx` - Import updates for interactive stories
- **Estimated Files**: ~15-20 files

### Risk Level: **MEDIUM**
- **High Compatibility**: CSF3 format supported in both versions
- **Automated Migration**: Storybook provides automigration tools
- **Breaking Changes**: Limited to specific APIs (testing-library imports)
- **Rollback**: Simple (revert package.json and reinstall)

### Testing Impact
- **Unit Tests**: No impact (Vitest unaffected)
- **Component Tests**: No impact (React Testing Library separate)
- **E2E Tests**: No impact (Playwright unaffected)
- **Storybook Stories**: Require verification
- **Visual Regression**: Storybook build must succeed

---

## Rollback Plan

### If Upgrade Fails
1. **Git Revert**:
   ```bash
   git checkout package.json package-lock.json
   npm install
   ```

2. **Verify Rollback**:
   ```bash
   npm run storybook
   npm run build-storybook
   ```

3. **Document Issues**:
   - Capture error messages
   - Note which stories/features failed
   - Create follow-up tasks for resolution

### Recovery Time: **< 5 minutes**

---

## Testing Strategy

### Pre-Upgrade Validation
1. ✅ Verify all stories work in Storybook 7.6.23
2. ✅ Capture screenshots of all stories (baseline)
3. ✅ Verify `npm run build-storybook` succeeds
4. ✅ Verify Playwright tests pass

### Post-Upgrade Validation
1. **Storybook Dev Server**:
   - `npm run storybook` starts without errors
   - All 12 stories render correctly
   - Accessibility addon works
   - Interactive controls functional

2. **Storybook Build**:
   - `npm run build-storybook` completes successfully
   - Static build opens and displays stories
   - No console errors

3. **Story Verification** (All 12 Stories):
   - Atoms: AddButton, ColumnHeader, FilterButton, PriorityIndicator, SearchField, TagChip
   - Organisms: AddTargetModal, CardDetailModal, JobTargetCard, KanbanColumn, SearchFilterBar
   - Pages: KanbanBoardPage

4. **Accessibility Verification**:
   - a11y addon displays checks
   - No new accessibility violations
   - WCAG AA compliance maintained

5. **Interactive Stories**:
   - Play functions execute without errors
   - `@storybook/test` imports work correctly
   - User interactions work as expected

6. **Playwright Tests**:
   - `npm run test:e2e` passes
   - All 15 E2E tests succeed
   - Screenshots captured (constitutional requirement)

7. **TypeScript Compilation**:
   - `npm run typecheck` passes
   - No type errors introduced

---

## Acceptance Criteria

### Must Have
- [ ] All Storybook packages upgraded to 10.2.8
- [ ] `npx storybook@latest automigrate` completed successfully
- [ ] `.storybook/main.ts` configuration valid for v10
- [ ] All 12 stories render without errors
- [ ] `npm run storybook` starts on port successfully
- [ ] `npm run build-storybook` completes without errors
- [ ] a11y addon functional and showing checks
- [ ] Interactive stories work (play functions execute)
- [ ] `@storybook/testing-library` replaced with `@storybook/test`
- [ ] `npm run typecheck` passes
- [ ] `npm run test:e2e` passes
- [ ] Playwright screenshots captured showing stories working
- [ ] No new console errors or warnings (excluding deprecation notices for unrelated packages)

### Should Have
- [ ] Storybook startup time improvement documented
- [ ] Build time comparison (v7 vs v10) documented
- [ ] Migration notes added to project documentation

### Nice to Have
- [ ] Explore new Storybook 10 features for future use
- [ ] Document any new capabilities available

---

## Acceptance Test Documentation

Per Constitution Section VII (Acceptance Testing & Documentation), the following must be provided:

### Required Screenshots (Playwright)
1. **Storybook Dev Server Running**:
   - Screenshot of Storybook UI showing all stories loaded
   - URL: `http://localhost:6009` (or assigned port)

2. **Story Rendering Verification**:
   - Screenshot of each component level (Atom, Organism, Page)
   - At least 3 representative stories shown

3. **Accessibility Addon**:
   - Screenshot showing a11y addon panel with checks passing
   - WCAG AA compliance indicators visible

4. **Interactive Story Execution**:
   - Screenshot of KanbanBoardPage "Search and Filter" story
   - Play function executed successfully

5. **Build Success**:
   - Terminal screenshot showing `npm run build-storybook` completion
   - No errors in output

6. **E2E Test Pass**:
   - Terminal screenshot showing all Playwright tests passing
   - Test summary showing 15/15 tests succeeded

### Screenshot Storage
- Location: `specs/002-storybook-upgrade/screenshots/`
- Format: PNG
- Naming: `{test-category}-{description}.png`
- Linked in: This specification's "Test Results" section (post-implementation)

---

## Dependencies

### Prerequisite User Stories
- None (standalone upgrade)

### Blocks
- None

### Related
- Spec 001: Kanban Board (existing stories must continue working)
- Constitution Section XII: Dependency Management requirements

---

## Documentation Updates

### Files to Update
1. **README.md** (root):
   - Update Storybook version in overview
   - Update "View Storybook" instructions if changed

2. **src/features/kanban-board/README.md**:
   - Update Storybook version reference
   - Update story development instructions if API changed

3. **package.json**:
   - Update scripts if necessary
   - Document any new Storybook-related scripts

---

## Timeline Estimate

- **Research & Planning**: 30 minutes (this spec)
- **Package Upgrade**: 10 minutes
- **Automigration**: 15 minutes
- **Configuration Updates**: 20 minutes
- **Story Import Updates**: 20 minutes
- **Testing & Verification**: 45 minutes
- **Screenshot Documentation**: 30 minutes
- **Documentation Updates**: 20 minutes

**Total Estimated Time**: ~3 hours

---

## Success Metrics

- ✅ Zero breaking changes for end users (stories work identically)
- ✅ All tests pass (unit, integration, E2E)
- ✅ Storybook build time improvement (expected: 10-20% faster)
- ✅ No new accessibility violations
- ✅ Developer experience maintained or improved

---

## Notes

- Storybook 10 is a major version jump (7 → 10, skipping 8 and 9)
- Storybook team provides excellent automigration tools
- Most CSF3 stories should work without modification
- Primary change is testing-library import location
- This upgrade unblocks future Storybook 10+ features

---

## Approval

**Specification Status**: Draft  
**Ready for Review**: Yes  
**Constitutional Compliance**: Verified (Section I, VI, XII)

**Reviewers**:
- [ ] Technical Lead
- [ ] Project Owner

**Approved By**: _Pending_  
**Approval Date**: _Pending_

---

## References

- [Storybook 10.0 Release Notes](https://storybook.js.org/blog/storybook-10-0/)
- [Storybook Migration Guide](https://storybook.js.org/docs/react/migration-guide)
- [Storybook Automigrate Tool](https://storybook.js.org/docs/react/configure/upgrading)
- Constitution Section XII: Dependency Management & Version Currency
