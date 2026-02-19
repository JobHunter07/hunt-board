# Feature Specification: Header Edits � Hunt Board

**Feature Branch**: `003-header-edits`
**Created**: 2026-02-19
**Status**: Draft
**Input**: User description: "Header Edits to the Hunt Board � single-row layout, search expands left-only, tan Add Target button, no red accent colors."

---

## Three-Phase Development Methodology

**CONSTITUTIONAL REQUIREMENT (Section VI)**: This specification feeds into a three-phase development workflow:

1. **Phase 1: SDD (Spec-Driven Design)** ? **You are here**
   Define WHAT to build and WHY. This document is the output.

2. **Phase 2: ATDD (Acceptance Test-Driven Design)**
   Write acceptance tests based on scenarios below. Tests must FAIL before implementation.

3. **Phase 3: TDD (Test-Driven Development)**
   Write unit tests and implement to make all tests pass.

**Critical**: Acceptance scenarios below must be written in executable Given/When/Then format for ATDD phase.

**Test Data Rule (Section VII)**: ATDD integration/E2E tests MUST use `@faker-js/faker` generated data and include boundary/extreme scenarios.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 � Single-Row Header with Controls on Far Right (Priority: P1)

A user opens the Hunt Board and immediately sees one uncluttered header row: the "Hunt Board" title on the far left and the search field, filter button, and Add Target button tightly grouped on the far right. No second row exists. This matches the reference navigation bar layout (JobHunter07 | The Hunt Board | � | Search | Filter | + Add Target).

**Why this priority**: The two-row layout wastes vertical space and disorients users who expect a standard single-row app header. Fixing this is the foundational layout change all other stories depend on.

**Independent Test**: Load the board. Verify the DOM contains exactly one header row element and that the title and all three controls share the same vertical baseline.

**Acceptance Criteria** (for ATDD Phase):

1. **Given** the Hunt Board page is loaded, **When** the user views the header, **Then** the title "Hunt Board" and the Search field, Filter button, and Add Target button all appear on the same horizontal row with no second row below.
2. **Given** the header is rendered, **When** inspected at 1280px viewport width, **Then** the Search field is to the left of the Filter button, the Filter button is to the left of the Add Target button, and all three are right-aligned against the viewport edge.
3. **Given** a viewport of 375px (mobile), **When** the header renders, **Then** the controls remain on the same row as the title without wrapping onto a second line.
4. **Given** a Faker-generated board with 120 targets and long company names, **When** the header renders, **Then** the single-row layout holds and no overflow wrapping occurs.

---

### User Story 2 � Search Field Expands Left-Only Without Shifting Layout (Priority: P1)

A user clicks into the search field. The field widens smoothly from its compact resting width, but the Filter button and Add Target button do not move � only the left edge of the search field extends outward into available space. The right edge of the search control cluster stays pinned.

**Why this priority**: The previous behavior caused the entire right-side cluster to shift left when search expanded, which was visually jarring and made the header feel broken.

**Independent Test**: Click the search field. Observe that the Filter button and Add Target button remain at the same pixel position before and after expansion.

**Acceptance Criteria** (for ATDD Phase):

1. **Given** the header is rendered in resting state with Search at 160px width, **When** the user clicks into the Search field, **Then** the Search field width transitions to 300px and the right edges of the Filter button and Add Target button do not change position.
2. **Given** the Search field is expanded (focused), **When** the user clicks outside the Search field, **Then** the Search field smoothly shrinks back to its compact resting width (160px).
3. **Given** the user types a Faker-generated company name (up to 60 characters) into the Search field while it is expanded, **When** the field is at full width, **Then** the text is fully visible and the layout does not shift.
4. **Given** a Faker boundary dataset with an empty search string, **When** the Search field loses focus, **Then** it returns to compact state with no residual visual artifacts.

---

### User Story 3 � Add Target Button Color and Hover State (Priority: P2)

The Add Target button in the header uses a warm tan/brown color (`#c68645`) matching the reference design. On hover, the button darkens to a deeper brown (`#8b5e34`). The button never appears red.

**Why this priority**: Consistency with the reference UI (the nav bar screenshot) is required to present a professional, branded appearance. The red MUI theme default was explicitly unacceptable.

**Independent Test**: Hover the Add Target button. Verify the background color is tan at rest and brown on hover with no red at any state.

**Acceptance Criteria** (for ATDD Phase):

1. **Given** the header is rendered, **When** the user inspects the Add Target button at rest, **Then** its background color is `#c68645` (warm tan) and its label text is white.
2. **Given** the header is rendered, **When** the user hovers the Add Target button, **Then** its background transitions to `#8b5e34` (dark brown).
3. **Given** any interactive state (rest, hover, focus, active), **When** the button is inspected, **Then** no red color (`#B71C1C` or similar) is present on the button.

---

### User Story 4 � No Red Accent Colors in Header Controls (Priority: P2)

None of the header controls � Search field focus ring, Filter button active state, or any hover/focused state � display red. The theme primary color (`#B71C1C`) is suppressed for all header interactive states.

**Why this priority**: The application's primary red theme color is appropriate for destructive actions deep in the UI, but its presence in the top-level header controls clashes with the clean, professional reference design.

**Independent Test**: Tab through all header controls and activate each one. Confirm no red color appears.

**Acceptance Criteria** (for ATDD Phase):

1. **Given** the Search field is in resting state, **When** the user clicks into it (focused), **Then** the focus ring/border color is a neutral grey (not red).
2. **Given** the Filter button has zero active filters, **When** the user hovers it, **Then** the icon and background use neutral grey tones, not red.
3. **Given** the Filter button has one or more active filters, **When** rendered, **Then** the active-state accent color matches the tan/brown palette (`#c68645`), not red.
4. **Given** a Faker-generated extreme dataset that triggers many active filters, **When** the Filter badge renders a count, **Then** the badge color is not red.

---

### User Story 5 — Mobile Header Reflows Vertically Without Hamburger Menu (Priority: P1)

On a mobile device (viewport width below 600px), the header does not collapse into a hamburger menu or hide controls behind a drawer. Instead, all header controls stack vertically in a readable, usable order: board title at the top, then the full-width search field directly beneath it, then the filter button, then the Add Target button. The Kanban columns appear below these stacked controls.

**Why this priority**: The Hunt Board is used on mobile between meetings and in transit. Hiding controls behind a hamburger menu adds friction at the exact moment a hunter needs quick access. Vertical stacking keeps all controls immediately accessible without any extra taps.

**Independent Test**: Load the board at 375px viewport width. Verify all four header elements are visible and stacked vertically without any hamburger icon or hidden drawer.

**Acceptance Criteria** (for ATDD Phase):

1. **Given** the Hunt Board is viewed at 375px viewport width, **When** the page renders, **Then** the board title, Search field, Filter button, and Add Target button each appear on separate lines stacked vertically in that order, with no hamburger menu icon present.
2. **Given** the mobile header is rendered, **When** the user taps the Search field, **Then** the search field expands to full width (100%) within the mobile layout and the other controls remain visible below.
3. **Given** the mobile header is rendered at 375px, **When** the user taps the Filter button, **Then** the filter menu opens correctly and the remaining header controls remain accessible after the menu closes.
4. **Given** the mobile header is rendered at 375px, **When** the user taps Add Target, **Then** the Add Target modal opens correctly.
5. **Given** a Faker-generated board with 120 targets and long company names at 375px viewport, **When** the header renders, **Then** all four header controls are fully tappable with no content clipped or horizontally overflowing.

---

### Edge Cases

- What happens when the board title is very long (e.g., custom branding)? Title should truncate with ellipsis rather than push controls off-screen.
- What happens at a viewport narrower than 600px? The controls must not overflow or wrap into a second row.
- What happens when the Add Target button is clicked while the Search field is expanded? The modal opens normally; the Search field returns to compact on blur.
- What happens when Faker-generated data results in zero targets? The header renders correctly with "Showing 0 of 0 targets" and no layout changes.
- What happens with very long search terms (100+ characters)? The Search field at maximum expanded width clips overflow text rather than overflowing the layout.

### ATDD Test Data Profile *(mandatory)*

- **Generator Library**: `@faker-js/faker` (required)
- **Seed Strategy**: Fixed numeric seed per test case (e.g., `setFakerSeed(20260319)`) for reproducibility in CI; random seed optional locally
- **Normal Dataset**: 5�20 targets with typical company names (1�30 chars), standard roles, mixed columns
- **Boundary Dataset**: Empty board (0 targets); single target; company name of exactly 1 character; company name of exactly 60 characters; search query matching 0 results; search query matching all results
- **Extreme Dataset**: 120 targets across all 9 columns; company names of 80+ characters; search query of 100 characters; all 9 filter criteria active simultaneously
- **Coverage Mapping**:
  - Normal dataset ? User Stories 1, 2, 3, 4 (AC-1 for each)
  - Boundary dataset ? User Story 2 (AC-4), User Story 4 (AC-4)
  - Extreme dataset ? User Story 1 (AC-4), User Story 2 (AC-3)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The header row MUST contain exactly one horizontal row with the board title on the left and the Search field, Filter button, and Add Target button on the right.
- **FR-002**: The Search field MUST render in a compact state (approximately 160px wide) at rest and expand to approximately 300px when focused.
- **FR-003**: When the Search field expands or collapses, the Filter button and Add Target button MUST remain stationary � only the left edge of the Search field moves.
- **FR-004**: The Add Target button MUST have a warm tan background (`#c68645`) at rest and a darker brown (`#8b5e34`) on hover.
- **FR-005**: No red color derived from the MUI primary theme token MUST be visible on any header interactive element in any state (rest, hover, focus, active).
- **FR-006**: The Filter button MUST display its active-filter accent color in the tan/brown palette, not red.
- **FR-007**: Clicking Add Target in the header MUST open the Add Target modal defaulting to the "Targets Identified" column.
- **FR-008**: The Search field MUST retain its existing debounced filtering functionality after the layout change.
- **FR-009**: The Filter button MUST retain its existing filter menu behavior after the layout change.
- **FR-010**: The header layout MUST not introduce a second row at any supported viewport width.
- **FR-011**: On viewports narrower than 600px, the header MUST stack vertically in this order: (1) Board title, (2) Search field at full width, (3) Filter button, (4) Add Target button. No hamburger menu or navigation drawer is permitted.
- **FR-012**: On viewports narrower than 600px, the Search field MUST render at 100% column width (not compact) and MUST NOT have the left-expansion animation. The compact expand-left behavior is desktop-only.
- **FR-013**: On viewports narrower than 600px, the Kanban columns MUST be vertically stacked and individually scrollable rather than displayed in a horizontal row requiring horizontal scroll.

### Assumptions

- The "Hunt Board" title text is fixed and does not change dynamically.
- The header does not need a separate "Showing X of Y targets" count row; this count is considered secondary UI and may be removed or relocated elsewhere.
- Dark mode support is not required for this feature.

---

## Component Architecture *(mandatory for UI features)*

### Component Hierarchy

#### Atoms

- **SearchField**
  - **Material UI Base**: `TextField`, `InputAdornment`, `IconButton`, `Box`
  - **Key Props**: `value`, `onChange`, `compact` (boolean), `placeholder`, `debounceMs`, `disabled`
  - **Responsive**: At `compact=true`, renders at 160px resting width and 300px focused width; at `compact=false`, renders full-width for use inside column headers or forms
  - **Behavior**: Right-anchored expansion � outer container is fixed max-width, inner TextField transitions width; focus/blur tracked via React state

- **FilterButton**
  - **Material UI Base**: `IconButton`, `Badge`
  - **Key Props**: `onClick`, `activeFilterCount`, `disabled`
  - **Responsive**: Fixed icon button size on all viewports
  - **Behavior**: When `activeFilterCount > 0`, icon color uses tan palette (`#c68645`); never uses theme primary red

#### Organisms

- **SearchFilterBar**
  - **Composition**: `SearchField` atom, `FilterButton` atom, MUI `Button`, MUI `Menu` with filter checkboxes
  - **Key Props**: `searchQuery`, `onSearchChange`, `selectedPriorities`, `onPrioritiesChange`, `selectedTags`, `onTagsChange`, `hasFollowUp`, `onFollowUpChange`, `availableTags`, `activeFilterCount`, `onClearAll`, `onAddTarget`
  - **Responsive** (mobile <600px): Renders as a vertical column — Search full-width, then Filter button, then Add Target button each on their own row.
  - **Responsive** (desktop ≥600px): Single horizontal row using `flex-direction: row-reverse` so controls are right-anchored; controls group does not wrap.
  - **State Management**: Local state for filter menu anchor element; all filter/search state owned by parent via props
  - **Removed**: No longer renders its own outer wrapper `Box` with `mb: 3` � layout positioning delegated to the Page

#### Pages

- **KanbanBoardPage**
  - **Header Layout** (desktop ≥600px): Single `Box` with `display: flex`, `justifyContent: space-between`, `alignItems: center` containing the title `Typography` (left) and `SearchFilterBar` (right)
  - **Header Layout** (mobile <600px): `Box` with `display: flex`, `flexDirection: column`, `alignItems: stretch` — title full-width, then `SearchFilterBar` renders its controls vertically below.
  - **Column Layout** (mobile <600px): Columns stack vertically rather than horizontally; each column occupies 100% viewport width.
  - **Composition**: Header row ? `DndContext` ? Kanban columns ? Modals
  - **Data Flow**: Filter/search state managed in this component via `useCardFilters` hook; passed down to `SearchFilterBar` and `KanbanColumn` components

### Material UI Theming

- **Theme Tokens Used**: `background.default` (page background), `background.paper` (card/column backgrounds), `text.secondary` (secondary labels), `action.hover` (button hover backgrounds)
- **Custom Styling**: Add Target button uses explicit hex values (`#c68645`, `#8b5e34`) to override theme primary red; Search field focus border overrides `& .MuiOutlinedInput-root.Mui-focused` border color
- **Dark Mode Support**: No

---

## Accessibility Requirements *(mandatory)*

### WCAG Compliance Level
- **Target**: AA

### Keyboard Navigation
- **TAB-001**: All header interactive elements (Search field, Filter button, Add Target button) must be reachable via Tab key in left-to-right order
- **TAB-002**: The Search field must be activatable via Enter or Space when focused
- **TAB-003**: Focus indicator must be visible on all header interactive elements
- **TAB-004**: Filter menu must be closeable with Escape key

### Screen Reader Support
- **SR-001**: Add Target button must have visible label text "Add Target"
- **SR-002**: Filter button must have `aria-label` describing its state (e.g., "Filters (2 active)")
- **SR-003**: Search field must have `placeholder` text readable by screen readers

### Visual Accessibility
- **VISUAL-001**: Add Target button text ("+ Add Target") must meet 4.5:1 contrast ratio against its `#c68645` background
- **VISUAL-002**: No information conveyed by color alone � the Filter badge count conveys active filter count numerically, not only by color
- **VISUAL-003**: Focus indicators on all header controls must meet 3:1 contrast ratio against the background

### Motor Accessibility
- **MOTOR-001**: All header interactive elements (Search, Filter, Add Target) must have a minimum touch target of 44�44px
- **MOTOR-002**: Search expansion on focus must not require any pointer precision � keyboard tabbing into the field also triggers expansion

---

## Storybook Story Requirements *(mandatory for UI features)*

### SearchField Stories

**File**: `src/stories/atoms/SearchField.stories.tsx`

**Required Stories**:
1. **Default**: `compact=false`, empty value
2. **Compact**: `compact=true`, resting state (160px width)
3. **CompactFocused**: `compact=true`, focused state (300px width) � use `play` function to focus
4. **WithValue**: `compact=true`, pre-populated value showing clear button
5. **Disabled**: `disabled=true`
6. **MaxContent**: value of 100 characters to test overflow clipping

**Interactive Controls**:
- `compact`: boolean toggle
- `value`: text input
- `placeholder`: text input
- `disabled`: boolean toggle

**Accessibility Tests**:
- [ ] Color contrast of focus border vs background (must not be red)
- [ ] ARIA label on clear button
- [ ] Keyboard focusable

**Interaction Tests**:
- **Interaction-001**: Focus field ? width transitions from 160px to 300px
- **Interaction-002**: Blur field ? width returns to 160px
- **Interaction-003**: Type value ? clear button appears; click clear ? value resets

### FilterButton Stories

**File**: `src/stories/atoms/FilterButton.stories.tsx`

**Required Stories**:
1. **Default**: `activeFilterCount=0`
2. **ActiveFilters**: `activeFilterCount=3` � icon accent in tan palette
3. **Disabled**: `disabled=true`

**Accessibility Tests**:
- [ ] `aria-label` reflects active filter count
- [ ] No red color in any state

### SearchFilterBar Stories

**File**: `src/stories/organisms/SearchFilterBar.stories.tsx`

**Required Stories**:
1. **Default**: empty search, no active filters
2. **WithActiveFilters**: `activeFilterCount=2`, `selectedPriorities=['high']`
3. **WithSearchValue**: `searchQuery='Acme Corp'`
4. **WithAddTargetHandler**: `onAddTarget` wired to storybook action
5. **MobileViewport**: same as Default, rendered at 375px viewport width to verify vertical stack layout
6. **TabletViewport**: same as Default, rendered at 768px viewport width

**Interaction Tests**:
- **Interaction-001**: Click Filter button → filter menu opens
- **Interaction-002**: Click Add Target → action logged
- **Interaction-003**: Focus Search → field widens; blur → field shrinks
- **Interaction-004** (mobile): At 375px, verify no hamburger icon; verify vertical stack order (Search → Filter → Add Target)

### KanbanBoardPage Stories

**File**: `src/stories/pages/KanbanBoardPage.stories.tsx`

**Required Stories**:
1. **Desktop**: full board at 1280px
2. **Mobile**: board at 375px — header stacked vertically, columns stacked vertically
3. **Tablet**: board at 768px

**Accessibility Tests**:
- [ ] No hamburger menu icon rendered at 375px
- [ ] All header controls reachable via Tab on mobile viewport
- [ ] Columns tappable and scrollable on mobile

### Visual Regression Testing
- **Viewports**: Desktop (1920px), Tablet (768px), Mobile (375px)
- **Themes**: Light mode only

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users see a single header row � no second row for search/filter controls at any supported viewport width
- **SC-002**: Clicking into the Search field causes it to expand without any other element on the page changing position
- **SC-003**: No red color (`#B71C1C` or any red-family hex in the `#B7` range) appears in any header interactive element at any interaction state
- **SC-004**: The Add Target button background is visually warm tan at rest and darkens to brown on hover, matching the reference design screenshot
- **SC-005**: All three header controls (Search, Filter, Add Target) remain fully functional after the layout refactor � filtering, searching, and modal opening all work correctly- **SC-006**: On a 375px viewport, the board title, Search field (full width), Filter button, and Add Target button are all visible and stacked vertically without a hamburger menu. All four controls are fully tappable (minimum 44×44px touch targets) and no content overflows horizontally.