<!--
================================================================================
CONSTITUTION SYNC IMPACT REPORT
Version: 0.1.0 → 0.2.0
Date: 2026-02-19
================================================================================

VERSION CHANGE:
  Old: 0.1.0 (Pre-Release)
  New: 0.2.0 (Pre-Release)
  Bump Rationale: Added Section XII - Dependency Management & Version Currency requirements

MODIFIED SECTIONS (v0.2.0):
  - NEW Section XII: Dependency Management & Version Currency
    * Major dependencies must use latest stable versions
    * Dependencies must be upgraded within 30 days of major releases
    * Security patches applied immediately
    * User stories required for major version upgrades
    * Dependency audit required monthly

IMPACT ASSESSMENT (v0.2.0):
  - BREAKING: No
  - REQUIRES ACTION: Yes
    * Immediate audit of all dependencies for latest versions
    * Create user stories for outdated major dependencies
    * Establish monthly dependency review process
  - TEMPLATES AFFECTED:
    * spec-template.md: Add dependency version verification section
    * tasks-template.md: Add dependency upgrade tasks category

PREVIOUS CHANGES (v0.1.0 - 2026-02-19):
  Old: 0.0.1 (Pre-Release)
  New: 0.1.0 (Pre-Release)
  Bump Rationale: Added Acceptance Testing & Playwright Screenshot Documentation requirements to Section VII

MODIFIED SECTIONS (v0.1.0):
  - Section VII: Testing Requirements
    * Added "Acceptance Testing & Documentation" subsection
    * Mandatory Playwright screenshot documentation for all E2E tests
    * User story testing must include visual proof of acceptance criteria
    * Test evidence storage and linking requirements
    * Enhanced rationale to include visual evidence for stakeholders

IMPACT ASSESSMENT (v0.1.0):
  - BREAKING: No
  - REQUIRES ACTION: Yes
    * All future E2E tests must capture and store screenshots
    * Existing acceptance test documentation should be updated with screenshot evidence
    * PR templates should include screenshot evidence checklist
  - TEMPLATES AFFECTED:
    * tasks-template.md: Add screenshot capture tasks for E2E tests
    * spec-template.md: Add acceptance test documentation section requirement

PREVIOUS CHANGES (v0.0.1 - 2026-02-18):
  Old: Template placeholders
  New: 0.0.1 (Pre-Release)
  Bump Rationale: Initial formalized constitution for Hunt Board NPM Library

MODIFIED PRINCIPLES:
  - All template placeholders replaced with concrete governance principles

ADDED SECTIONS:
  1. I. Spec-Driven Design (NON-NEGOTIABLE)
  2. II. Component-First Architecture (React + Material UI)
  3. III. Screaming Architecture & Vertical Slice Architecture
  4. IV. Data Configuration Management
  5. V. Storybook-Driven Component Development
  6. VI. Development Workflow (Spec-Driven)
  7. VII. Testing Requirements
  8. VIII. Guiding Philosophy
  9. IX. Governance
  10. X. Runtime Guidance
  11. XI. NPM Library Requirements (Hunt Board Module)

REMOVED SECTIONS:
  - Generic template placeholders ([PROJECT_NAME], [PRINCIPLE_X_NAME], etc.)

TEMPLATES REQUIRING UPDATES:
  ⚠ .specify/templates/plan-template.md
     - Constitution Check section should reference specific principles:
       * Spec-Driven Design (Section I)
       * Component architecture levels check (Section II)
       * Vertical slice architecture (Section III)
       * Storybook requirements (Section V)
     - Project Structure should emphasize vertical slicing
     - Technical Context should include: React version, Material UI version,
       Storybook version, component architecture level

  ⚠ .specify/templates/spec-template.md
     - Add mandatory section: "Component Architecture" for UI features
       * Level (Atom/Organism/Page)
       * Material UI components used
       * Responsive behavior requirements
     - Add mandatory section: "Storybook Story Requirements"
       * Required stories (default, edge cases, states)
       * Accessibility requirements (a11y addon)
       * Interactive controls needed
     - Add mandatory section: "Accessibility Requirements" (referenced in Section I)

  ⚠ .specify/templates/tasks-template.md
     - Add standard task category: "Storybook Stories"
       * Story creation task for each component
       * A11y test tasks
       * Interaction test tasks
     - Emphasize 80% coverage minimum from Section VII
     - Include Material UI implementation tasks
     - Organize by vertical slices (align with Section III)
     - Add task category: "Acceptance Test Documentation" (NEW in v0.1.0)
       * Playwright screenshot capture tasks
       * Screenshot evidence linking tasks
       * Acceptance criteria validation tasks

FOLLOW-UP TODOS:
  1. Update plan-template.md with Hunt Board-specific constitution checks
  2. Update spec-template.md with Storybook and accessibility sections
  3. Update tasks-template.md with Storybook story tasks as standard
  4. Create quick reference guide for three-level atomic design constraint
  5. Update spec-template.md to include "Acceptance Test Documentation" section (NEW in v0.1.0)
  6. Update tasks-template.md to include Playwright screenshot tasks (NEW in v0.1.0)
  7. Create PR template checklist for screenshot evidence (NEW in v0.1.0)

FILES FLAGGED FOR MANUAL FOLLOW-UP:
  - All three template files require updates to align with constitution
  - Updates should be made before next feature specification
  - spec-template.md: Add acceptance test documentation requirements (v0.1.0)
  - tasks-template.md: Add screenshot capture and evidence tasks (v0.1.0)

VALIDATION STATUS:
  ✅ No unexplained bracket tokens remaining
  ✅ Version line matches report (0.1.0)
  ✅ Dates in ISO format (YYYY-MM-DD)
  ✅ Principles are declarative and testable
  ✅ Pre-release versioning policy defined in Section IX

================================================================================
-->

# JobHunter07 — Hunt Board NPM Library
## Engineering Constitution
**Version:** 0.2.0
**Status:** Pre-Release
**Ratified:** 2026-02-12
**Last Amended:** 2026-02-19

This constitution governs all engineering work for the Hunt Board NPM Library and any related modules.
It supersedes all other conventions, defaults, or framework opinions.
All contributors — human or AI — must comply.

---

# I. Spec-Driven Design (NON-NEGOTIABLE)

**Nothing is coded until it is fully specified, reviewed, and approved.**

### Requirements
- Every feature MUST have a specification before implementation begins.
- Specifications define:
  - Purpose and scope
  - Inputs, outputs, and state transitions
  - User interactions and UX flows
  - Error conditions and recovery behavior
  - Accessibility requirements
  - Storybook requirements
- Specs must be small, clear, testable, and atomic.
- No pull request is accepted without referencing its approved specification.

**Rationale:** Prevents rework, ensures alignment, enables parallel work, and creates living documentation.

---

# II. Component-First Architecture (React + Material UI)

Every UI element is a component, built bottom-up using **Atomic Design with exactly three levels**:

### Allowed Levels
- **Atoms** — Buttons, inputs, labels, icons, typography, layout primitives
- **Organisms** — Cards, forms, lists, navigation bars, composite UI
- **Pages** — Full screens composed of organisms and atoms

### Rules
- No Molecules. No exceptions.
- Every component MUST have:
  - A specification
  - A Storybook story
  - Responsive behavior by default
  - Material UI styling and theming
- Components must be reusable, composable, predictable, and consistent.

**Rationale:** Simplicity through constraint. Three levels prevent over-engineering while maintaining composability.

---

# III. Screaming Architecture & Vertical Slice Architecture

The folder layout must make use-cases obvious at a glance.

### Rules
- Features are organized by **vertical slices**, not technical layers.
- Each slice contains:
  - UI components
  - Server actions (if applicable)
  - Validation
  - Data access
  - Tests
  - Storybook stories
  - Documentation
- Vertical slices are self-contained and independently deployable.
- No cross-slice coupling except through explicitly defined interfaces.
- Shared utilities live in `/src/lib` and must be stable, documented, and versioned.

**Rationale:** Makes intent obvious, reduces coupling, and enables modular NPM packaging.

---

# IV. Data Configuration Management

All data schemas, validation, and types must come from a **single source of truth**.

### Rules
- All domain models defined in schema files (Zod preferred).
- Types are generated from schemas — never hand-written.
- All data access goes through typed, validated interfaces.
- API contracts must be strongly typed (tRPC or Zod).
- Database schema migrations must be versioned and reversible.

**Rationale:** Prevents drift between frontend, backend, and database. Enables safe refactoring.

---

# V. Storybook-Driven Component Development

Every component MUST have a Storybook story.

### Story Requirements
- Stories live in `src/stories`
- File name matches the component (`Button.stories.tsx`)
- Use CSF3 with autodocs
- Include:
  - Default state
  - Edge cases (empty, loading, error, disabled, max content)
  - Accessibility checks (`@storybook/addon-a11y`)
  - Interactive controls for props
  - Interaction tests where applicable
- Stories use relative imports from the component directory.

**Rationale:** Storybook is living documentation, visual testing, and an isolated development environment.

---

# VI. Development Workflow (Spec-Driven)

### Workflow
1. Feature request → Specification created
2. Specification reviewed and approved
3. Specification decomposed into atomic tasks
4. Tasks implemented in order, each referencing the spec
5. Implementation reviewed against specification
6. Tests validate behavior matches spec
7. Storybook stories document component per spec
8. Feature deployed

### Task Atomicity
- Every task is independently deliverable, testable, and traceable to a spec.
- Each task = one story point. If larger, decompose further.
- Tasks must have clear acceptance criteria derived from the spec.

---

# VII. Testing Requirements

### Testing Pyramid
- **Unit Tests:** Utility functions, validation logic, pure functions
- **Integration Tests:** Server actions, API routes, database interactions
- **Component Tests:** React Testing Library
- **Visual Regression Tests:** Storybook + Chromatic/Percy
- **Accessibility Tests:** axe in Storybook
- **End-to-End Tests:** Critical flows (auth, billing, job tracking)

### Coverage Standards
- Minimum **80%** coverage for logic (excluding types/config)
- **100%** coverage for security-critical paths (auth, billing, data access)

### Acceptance Testing & Documentation
- **User Story Testing:** Every user story MUST have corresponding acceptance tests.
- **Playwright Screenshot Documentation:** All E2E and critical integration tests MUST include:
  - Screenshots of successful test execution
  - Screenshots of key user interaction states
  - Screenshots of error handling and edge cases
  - Visual proof that acceptance criteria are met
- **Test Evidence Storage:** Screenshots stored in test artifacts and linked in:
  - Acceptance test documentation
  - Feature specification test results section
  - Pull request descriptions
- **Acceptance Criteria Validation:** Every acceptance criterion must be verifiable through:
  - Automated test results
  - Visual screenshot evidence
  - Both combined in acceptance test documentation

**Rationale:** Confidence in changes. Fast feedback loops. Living documentation through tests. Visual evidence provides non-technical stakeholders proof of completion.

---

# VIII. Guiding Philosophy

- **Security first:** Trust no input. Validate everything. Least privilege always.
- **Predictability over cleverness:** Code should be obvious.
- **Simplicity over complexity:** Choose boring solutions.
- **Explicitness over magic:** Avoid implicit behavior.
- **Human-centered design:** Accessibility is not optional.
- **Spec before code:** Thinking precedes typing.
- **Vertical slices over horizontal layers:** Organize by feature.
- **Quality over speed:** Fast code that breaks is slow code.

---

# IX. Governance

### Amendment Process
- Proposed changes require written justification.
- Amendments require team review and approval.
- Breaking changes require a migration plan and timeline.
- Versioning:
  - **Pre-Release (0.x.x)**
    - `0.0.x` = PATCH (clarifications, typos, non-semantic refinements)
    - `0.x.0` = MINOR (new principles, material expansions)
    - No MAJOR versions during pre-release
  - **Production Release (1.0.0)**
  - **Post-Production (1.x.x+)**
    - MAJOR = backward-incompatible principle changes
    - MINOR = new principle/section
    - PATCH = wording improvements

### Compliance
- All PRs MUST verify constitution compliance.
- Code reviews include constitution adherence checks.
- Any deviation MUST be explicitly justified in the PR description.

---

# X. Runtime Guidance

- Use `.specify/memory/constitution.md` for development decisions.
- Use `.github/agents/` for agent-specific workflows.
- Use `.specify/templates/` for spec, task, and plan structures.

---

# XI. NPM Library Requirements (Hunt Board Module)

### Packaging Rules
- Library must be fully tree-shakable.
- Exports must be explicit — no default exports.
- Types must be bundled with the package.
- Components must be framework-agnostic where possible (React-only is acceptable).
- No environment-specific logic inside the library.
- No authentication or security logic — handled by `app.jobhunter07.com`.
- Library must be consumable by:
  - app.jobhunter07.com
  - external developers
  - future JobHunter07 modules

### Distribution
- Versioning follows semantic versioning.
- Every release must include:
  - Changelog
  - Release notes
  - Migration notes (if applicable)

### Independence
- The Hunt Board must be fully functional as a standalone module.
- app.jobhunter07.com acts as the **glue**, not the source of truth.

---

# XII. Dependency Management & Version Currency

**All dependencies MUST be kept current to ensure security, performance, and compatibility.**

### Version Requirements
- **Major Dependencies** (React, Material UI, Storybook, Testing Frameworks):
  - MUST use latest stable version at project initialization
  - MUST be upgraded within 30 days of new major version release
  - Upgrades require a user story specification before implementation
- **Minor/Patch Updates**:
  - Applied during regular maintenance windows
  - Security patches applied immediately (within 48 hours)
- **Deprecated Dependencies**:
  - No deprecated packages permitted
  - If a dependency is deprecated, migration plan required within 14 days

### Upgrade Process
- **For Major Version Upgrades** (e.g., Storybook 7 → 10):
  1. Create user story specification documenting:
     - Current version and target version
     - Breaking changes and migration requirements
     - Impact assessment on existing code
     - Rollback plan
     - Testing strategy
  2. Specification reviewed and approved
  3. Upgrade implemented per specification
  4. All tests (unit, integration, E2E) pass
  5. Storybook stories verified
  6. Acceptance test screenshots captured
  7. Documentation updated

### Dependency Audits
- **Monthly Audit Required**:
  - Check all dependencies for available updates
  - Review security advisories
  - Prioritize and schedule upgrades
- **Tools**:
  - `npm outdated` for version checks
  - `npm audit` for security vulnerabilities
  - Dependabot or similar for automated alerts

### Rationale
- **Security**: Latest versions contain critical security patches
- **Performance**: New versions often include performance improvements
- **Compatibility**: Staying current prevents accumulation of breaking changes
- **Support**: Latest versions receive active maintenance and community support
- **Features**: Access to new capabilities and improvements

---

**This constitution is binding.
All contributors must comply.**
