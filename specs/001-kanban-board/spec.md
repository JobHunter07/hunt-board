# Feature Specification: Kanban Board Interface

**Feature Branch**: `001-kanban-board`  
**Created**: 2026-02-18  
**Status**: Draft  
**Input**: User description: "Create Kanban board interface with 9 hunting-oriented columns for job hunting workflow visualization"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Kanban Board Layout (Priority: P1)

As a job hunter, I want to see a Kanban board with 9 hunting-oriented columns so I can visualize my entire job hunting pipeline at a glance.

**Why this priority**: Core visualization is the foundation of the entire application. Without the board display, no other features function. This is the absolute minimum viable product.

**Independent Test**: Load the application and verify all 9 columns are visible with proper labels. Demonstrates value by providing immediate visual organization of job hunting stages.

**Acceptance Scenarios**:

1. **Given** I open the Hunt Board application, **When** the page loads, **Then** I see 9 columns displayed horizontally in this order: Targets Identified, Intel Gathering, Warm-Up Phase, Outreach Initiated, Follow-Up Required, Conversation Started, Interview Pipeline, Stalled/Cold, Offer/Success
2. **Given** I view the board on desktop, **When** I look at the layout, **Then** the board scrolls horizontally if columns exceed viewport width
3. **Given** I view the board on mobile, **When** I look at the layout, **Then** columns stack or scroll appropriately for small screens
4. **Given** I view any column, **When** I look at the header, **Then** I see the column title with proper Material UI typography and a count badge showing number of cards

---

### User Story 2 - Create and Move Job Hunt Targets (Priority: P2)

As a job hunter, I want to create new job target cards and move them between columns via drag-and-drop so I can track progression through my hunting workflow.

**Why this priority**: Data entry and movement are essential for making the board functional. This enables the core workflow of tracking job hunt momentum.

**Independent Test**: Create a new target card in any column and drag it to another column. Demonstrates value by allowing users to track job opportunities through their hunting lifecycle.

**Acceptance Scenarios**:

1. **Given** I am viewing a column, **When** I click the Add button, **Then** a modal opens with a form to create a new target card
2. **Given** I am creating a new target, **When** I fill in Company name and submit, **Then** a new card appears in the selected column
3. **Given** I have a card in one column, **When** I drag it to another column, **Then** the card moves smoothly with Material Design elevation changes
4. **Given** I drag a card, **When** I drop it in a new column, **Then** the card persists in that column and the column count badges update
5. **Given** I drag a card, **When** I release it outside a drop zone, **Then** the card returns to its original position

---

### User Story 3 - View and Edit Card Details (Priority: P3)

As a job hunter, I want to click on a card to view and edit detailed information about a job target so I can track all relevant data like warm-up actions, outreach history, and follow-up dates.

**Why this priority**: Detailed tracking enables strategic hunting. This transforms the board from simple visualization to actionable intelligence.

**Independent Test**: Click any card to open detail modal, edit fields, save changes, and verify persistence. Demonstrates value by providing deep data management capabilities.

**Acceptance Scenarios**:

1. **Given** I see a card on the board, **When** I click it, **Then** a Material UI Dialog opens with tabbed sections for Core Info, Warm-Up, Outreach, Follow-Up, Signals, and Attachments
2. **Given** I am viewing card details, **When** I edit the Company field and click Save, **Then** the changes persist and the card on the board updates
3. **Given** I am viewing card details, **When** I click the Delete button, **Then** a confirmation dialog appears
4. **Given** I confirm deletion, **When** the action completes, **Then** the card is removed from the board and the modal closes
5. **Given** I am editing a card, **When** I press Escape or click outside the modal, **Then** the modal closes without saving changes

---

### User Story 4 - Search and Filter Cards (Priority: P4)

As a job hunter, I want to search for specific companies or filter cards by tags and priority so I can quickly find relevant targets among many cards.

**Why this priority**: Search and filter enhance productivity as the board grows. Lower priority because the board remains functional without it for small datasets.

**Independent Test**: Type a company name in search bar and verify only matching cards display. Demonstrates value by providing quick access to specific targets.

**Acceptance Scenarios**:

1. **Given** I see the search bar above the board, **When** I type a company name, **Then** only cards matching that company are visible
2. **Given** I have applied a search filter, **When** I clear the search field, **Then** all cards become visible again
3. **Given** I click the filter button, **When** the menu opens, **Then** I see filter options for Priority levels and Tags
4. **Given** I select a priority filter, **When** the filter applies, **Then** only cards with that priority are visible across all columns
5. **Given** multiple filters are active, **When** I view the board, **Then** only cards matching ALL filter criteria display

---

### Edge Cases

- What happens when a column has zero cards? Column displays with empty state message.
- What happens when a card has no company name? Validation prevents card creation without required field.
- What happens when dragging fails due to network error? Card returns to original position with error notification.
- What happens when a card has 20+ tags? Tags wrap to multiple lines or scroll within card.
- What happens when board has 100+ cards? Performance optimization needed; virtual scrolling may be required.
- What happens when user tries to create duplicate company in same column? System allows it (same company can be in multiple stages or have multiple roles).
- What happens when user is offline? Changes queue locally and sync when connection restores (future enhancement).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display 9 columns in fixed order: Targets Identified, Intel Gathering, Warm-Up Phase, Outreach Initiated, Follow-Up Required, Conversation Started, Interview Pipeline, Stalled/Cold, Offer/Success
- **FR-002**: System MUST render each column with title, card count badge, and add button using Material UI components
- **FR-003**: System MUST support horizontal scrolling when columns exceed viewport width
- **FR-004**: System MUST enable drag-and-drop of cards between columns with visual feedback
- **FR-005**: System MUST display card count for each column that updates in real-time as cards move
- **FR-006**: System MUST validate required fields (Company name) before allowing card creation
- **FR-007**: System MUST open card detail modal on card click with tabbed sections
- **FR-008**: System MUST persist card data changes when Save button clicked in detail modal
- **FR-009**: System MUST confirm deletion before removing cards
- **FR-010**: System MUST filter cards in real-time as user types in search field
- **FR-011**: System MUST support multiple simultaneous filters (priority AND tags)
- **FR-012**: System MUST use Material UI elevation levels (1-3) for visual hierarchy
- **FR-013**: System MUST use 8px spacing grid throughout interface
- **FR-014**: System MUST support responsive layouts for mobile (375px), tablet (768px), and desktop (1920px)
- **FR-015**: System MUST use deep red (#B71C1C) as primary color per design system
- **FR-016**: System MUST display Material UI icons instead of emoji for all interface elements
- **FR-017**: System MUST close modals on Escape key press
- **FR-018**: System MUST show visual hover states on all interactive elements
- **FR-019**: System MUST display priority indicator on each card using colored CircleIcon
- **FR-020**: System MUST support adding tags as Chip components on cards

### Key Entities

- **JobTarget**: Represents a company/role being pursued. Attributes: company (required), role, targetReason, source, tags (array), priority (High/Medium/Low), status (column), dateAdded, notes
- **Column**: Represents one stage of hunt workflow. Attributes: id, title, order (1-9), cardCount, cards (array of JobTarget IDs)
- **Tag**: Reusable label for categorization. Attributes: name, color
- **WarmUpAction**: Track engagement activities. Attributes: targetId, actionType, date, notes
- **OutreachRecord**: Track contact attempts. Attributes: targetId, outreachType, dateSent, template, referralInvolved, response
- **FollowUp**: Scheduled next action. Attributes: targetId, lastContactDate, nextFollowUpDate, script

## Component Architecture *(mandatory for UI features)*

### Component Hierarchy

#### Atoms

- **PriorityIndicator**: Visual dot showing card priority level
  - **Material UI Base**: CircleIcon
  - **Key Props**: priority (High/Medium/Low), size (small/medium)
  - **Responsive**: Same size across all viewports

- **TagChip**: Individual tag display
  - **Material UI Base**: Chip
  - **Key Props**: label (string), color (string), onDelete (optional)
  - **Responsive**: Text truncates on mobile, full display on desktop

- **ColumnHeader**: Title and badge for column
  - **Material UI Base**: Typography (h6), Chip (count badge)
  - **Key Props**: title (string), count (number)
  - **Responsive**: Font size adjusts for mobile (smaller), desktop (subtitle1)

- **AddButton**: Button to create new cards
  - **Material UI Base**: Button with AddIcon
  - **Key Props**: onClick (function), variant (contained/outlined)
  - **Responsive**: Icon-only on mobile, text+icon on tablet/desktop

- **SearchField**: Search input with icon
  - **Material UI Base**: TextField with InputAdornment (SearchIcon)
  - **Key Props**: value (string), onChange (function), placeholder (string)
  - **Responsive**: Full width on mobile, constrained width on desktop

- **FilterButton**: Button to open filter menu
  - **Material UI Base**: IconButton with FilterListIcon
  - **Key Props**: onClick (function), active (boolean)
  - **Responsive**: Same size across viewports

#### Organisms

- **JobTargetCard**: Individual job target card in column
  - **Composition**: Typography (company, role), PriorityIndicator, TagChip (multiple), Chip (warm-up score), IconButton (edit/delete)
  - **Key Props**: target (JobTarget object), onCardClick (function), onDelete (function)
  - **Responsive**: Desktop: full layout with all metadata. Mobile: condensed layout, fewer visible tags
  - **State Management**: Local state for hover effects, drag state

- **KanbanColumn**: Single column containing cards
  - **Composition**: Paper/Card container, ColumnHeader, AddButton, Stack of JobTargetCards
  - **Key Props**: column (Column object), cards (array), onCardDrop (function), onAddClick (function)
  - **Responsive**: Desktop: fixed width 320px. Tablet: 280px. Mobile: full width minus padding
  - **State Management**: Local state for drag-over highlighting

- **CardDetailModal**: Full card details editor
  - **Composition**: Dialog, Tabs (Core Info, Warm-Up, Outreach, Follow-Up, Signals, Attachments), TextField (multiple), Select, DatePicker, TagChip, Stack, Divider, Button (Save/Delete)
  - **Key Props**: open (boolean), target (JobTarget), onClose (function), onSave (function), onDelete (function)
  - **Responsive**: Desktop: max-width 800px, full modal. Mobile: full-screen modal
  - **State Management**: Local state for form fields, active tab

- **AddTargetModal**: Create new target form
  - **Composition**: Dialog, Stack of TextFields and Selects, TagChip input, Button (Create/Cancel)
  - **Key Props**: open (boolean), initialColumn (string), onClose (function), onCreate (function)
  - **Responsive**: Desktop: max-width 600px. Mobile: full-screen
  - **State Management**: Local state for form validation, field values

- **SearchFilterBar**: Top-level search and filter controls
  - **Composition**: Box container, SearchField, FilterButton, Menu/Popover (filter options)
  - **Key Props**: onSearch (function), onFilterChange (function), activeFilters (object)
  - **Responsive**: Desktop: horizontal layout. Mobile: stacked or collapsed
  - **State Management**: Local state for filter menu open/closed

#### Pages

- **KanbanBoardPage**: Main application page
  - **Composition**: AppBar (optional), SearchFilterBar, Box (horizontal scroll container), multiple KanbanColumns
  - **Layout**: Flexbox horizontal scroll container with 9 KanbanColumns in fixed order
  - **Responsive**: Desktop: horizontal scroll with all columns visible. Tablet: horizontal scroll, smaller columns. Mobile: single-column view or minimal horizontal scroll
  - **Data Flow**: Receives board state (columns + cards) from parent/context → Passes card data to KanbanColumns → Handles drag-drop events → Updates board state → Triggers re-render

### Material UI Theming
- **Theme Tokens Used**: primary.main (#B71C1C), secondary.main (#546E7A), background.default (#F5F5F5), spacing(1-4), typography.h6, typography.subtitle1, typography.body2, shape.borderRadius (8px)
- **Custom Styling**: Drag-over column highlighting via sx prop (border change), card elevation change on drag (elevation 2 → 8)
- **Dark Mode Support**: No (v1 scope is light mode only)

## Accessibility Requirements *(mandatory)*

### WCAG Compliance Level
- **Target**: AA (required)

### Keyboard Navigation
- **TAB-001**: All interactive elements (cards, buttons, search field, filter button) must be reachable via Tab key in logical order
- **TAB-002**: Draggable cards must support keyboard-based movement using Arrow keys + Space/Enter to pick/drop
- **TAB-003**: Modals (CardDetailModal, AddTargetModal) must be closable with Escape key
- **TAB-004**: Focus must be trapped within modals when open (Tab cycles through modal elements only)
- **TAB-005**: Focus must return to trigger element when modal closes
- **TAB-006**: Column Add buttons must be keyboard-activatable with Enter or Space
- **TAB-007**: Search field must be clearable via keyboard (Escape or dedicated clear button)
- **TAB-008**: Filter menu must be navigable with Arrow keys and closable with Escape

### Screen Reader Support
- **SR-001**: All buttons must have aria-label or visible text (Add buttons: "Add target to [Column Name]")
- **SR-002**: Cards must announce: "Job target: [Company], [Role], Priority: [Level], Column: [Name]"
- **SR-003**: Drag operations must announce: "Picked up [Company], use arrow keys to move, Space to drop"
- **SR-004**: Drop operations must announce: "[Company] moved to [Column Name]"
- **SR-005**: Column count badges must use aria-label: "[Number] targets in this column"
- **SR-006**: Search results must announce: "Showing [X] of [Y] targets" via aria-live="polite"
- **SR-007**: Form validation errors must be announced immediately via aria-live="assertive"
- **SR-008**: Loading states must use aria-live="polite" and aria-busy="true"
- **SR-009**: Empty columns must announce: "No targets in [Column Name], press Add button to create"

### Visual Accessibility
- **VISUAL-001**: All text must meet 4.5:1 contrast ratio minimum (company names, roles, labels)
- **VISUAL-002**: Priority indicator colors must not be the sole means of conveying priority (include text label or pattern)
- **VISUAL-003**: Drag-drop active state must show visual indicator beyond color (border thickness change)
- **VISUAL-004**: Focus indicators must have 3:1 contrast ratio with background
- **VISUAL-005**: Link and button text must meet 4.5:1 contrast ratio with backgrounds
- **VISUAL-006**: Disabled state must be distinguishable from enabled (reduced opacity + cursor change)

### Motor Accessibility
- **MOTOR-001**: All interactive elements (buttons, cards, tags) must be minimum 44x44px touch target
- **MOTOR-002**: Drag-drop must support alternative keyboard interaction (no time limit)
- **MOTOR-003**: No double-click or long-press required for any action
- **MOTOR-004**: Sufficient spacing between adjacent interactive elements (minimum 8px per Material Design)

### Cognitive Accessibility
- **COG-001**: Error messages must be specific and actionable ("Company name is required" not "Invalid input")
- **COG-002**: Column order and labels must remain consistent (no reordering)
- **COG-003**: Confirmation dialog required before destructive actions (delete card)
- **COG-004**: Visual feedback for all user actions (ripple effect, state changes)
- **COG-005**: Search and filter clear actions visible and accessible

## Storybook Story Requirements *(mandatory for UI features)*

### Stories per Component

#### PriorityIndicator Stories

**File**: `src/stories/PriorityIndicator.stories.tsx`

**Required Stories**:
1. **Default**: High priority (red CircleIcon)
2. **Medium Priority**: Medium priority (orange CircleIcon)
3. **Low Priority**: Low priority (green CircleIcon)
4. **Small Size**: Small variant
5. **Medium Size**: Medium variant
6. **Disabled**: Disabled state (greyed out)

**Interactive Controls**:
- **priority**: select (High/Medium/Low)
- **size**: select (small/medium)
- **disabled**: boolean

**Accessibility Tests** (using @storybook/addon-a11y):
- [ ] Color contrast validation for icon colors
- [ ] ARIA labels present for priority level
- [ ] Information not conveyed by color alone

---

#### TagChip Stories

**File**: `src/stories/TagChip.stories.tsx`

**Required Stories**:
1. **Default**: Standard tag chip
2. **Empty**: No label (for testing)
3. **Long Text**: Tag with very long name ("This is an extremely long tag name that should truncate")
4. **Deletable**: With delete icon
5. **Disabled**: Disabled state
6. **Max Content**: Multiple chips together (overflow test)

**Interactive Controls**:
- **label**: text
- **color**: text (hex color)
- **onDelete**: boolean (shows delete icon)

**Accessibility Tests**:
- [ ] Delete button has aria-label
- [ ] Keyboard accessible delete (Enter/Space)
- [ ] Color contrast for text

**Interaction Tests**:
- **Interaction-001**: Click delete icon → Chip removed

---

#### JobTargetCard Stories

**File**: `src/stories/JobTargetCard.stories.tsx`

**Required Stories**:
1. **Default**: Card with company, role, priority, tags
2. **Empty Role**: Card with only company name
3. **Loading**: Loading skeleton or state
4. **Error**: Error state (failed to load)
5. **Disabled**: Non-interactive state
6. **Max Content**: Card with 10+ tags, long company name, warm-up score, multiple signals
7. **Hover State**: Show edit/delete buttons on hover
8. **Dragging State**: Elevated shadow while dragging

**Interactive Controls**:
- **company**: text
- **role**: text
- **priority**: select
- **tags**: array of strings
- **warmUpScore**: number (0-100)
- **showActions**: boolean (hover state)

**Accessibility Tests**:
- [ ] Card has proper aria-label with full context
- [ ] Edit/delete buttons keyboard accessible
- [ ] Focus management correct

**Interaction Tests**:
- **Interaction-001**: Click card → Detail modal opens
- **Interaction-002**: Click delete button → Confirmation dialog

---

#### KanbanColumn Stories

**File**: `src/stories/KanbanColumn.stories.tsx`

**Required Stories**:
1. **Default**: Column with 3 cards
2. **Empty**: Column with no cards (empty state message)
3. **Loading**: Loading state while fetching cards
4. **Error**: Error loading column data
5. **Max Content**: Column with 20+ cards (scroll test)
6. **Drag Over**: Column with drag-over highlight

**Interactive Controls**:
- **title**: text
- **cardCount**: number
- **cards**: array of card objects
- **dragOver**: boolean (highlight state)

**Accessibility Tests**:
- [ ] Column has proper heading role
- [ ] Add button has descriptive aria-label
- [ ] Keyboard navigation through cards

**Interaction Tests**:
- **Interaction-001**: Click Add button → Add target modal opens
- **Interaction-002**: Drag card into column → Visual feedback

---

#### CardDetailModal Stories

**File**: `src/stories/CardDetailModal.stories.tsx`

**Required Stories**:
1. **Default**: Modal with all tabs, populated data
2. **Empty**: Modal with minimal data (new card)
3. **Loading**: Loading state for card data
4. **Error**: Error state (failed to save/load)
5. **Validation Error**: Form with validation errors shown
6. **Max Content**: All fields filled with maximum data

**Interactive Controls**:
- **open**: boolean
- **target**: object (job target data)
- **activeTab**: select (Core/WarmUp/Outreach/FollowUp/Signals/Attachments)

**Accessibility Tests**:
- [ ] Focus trapped in modal
- [ ] Escape key closes modal
- [ ] Tab order logical
- [ ] Form errors announced to screen readers

**Interaction Tests**:
- **Interaction-001**: Click Save → Modal closes, data persists
- **Interaction-002**: Click Delete → Confirmation dialog
- **Interaction-003**: Press Escape → Modal closes
- **Interaction-004**: Click outside modal → Modal closes

---

#### KanbanBoardPage Stories

**File**: `src/stories/KanbanBoardPage.stories.tsx`

**Required Stories**:
1. **Default**: Full board with cards distributed across columns
2. **Empty**: Board with all empty columns
3. **Loading**: Loading state for entire board
4. **Error**: Error loading board data
5. **Max Content**: Board with 100+ cards across columns
6. **Mobile View**: Board rendered at 375px width
7. **Tablet View**: Board rendered at 768px width
8. **Desktop View**: Board rendered at 1920px width

**Interactive Controls**:
- **columns**: array of column objects with cards
- **loading**: boolean
- **error**: string (error message)

**Accessibility Tests**:
- [ ] Landmark regions properly defined
- [ ] Keyboard navigation through entire board
- [ ] Screen reader announces board structure

**Interaction Tests**:
- **Interaction-001**: Drag card between columns → Card moves, counts update
- **Interaction-002**: Search for company → Cards filter in real-time
- **Interaction-003**: Apply filter → Only matching cards visible

---

### Visual Regression Testing
- **Tool**: Chromatic
- **Viewports**: Mobile (375px), Tablet (768px), Desktop (1920px)
- **Themes**: Light mode only (v1 scope)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view all 9 columns with proper labels and structure within 1 second of page load
- **SC-002**: Users can create a new job target card and see it appear in the selected column within 2 seconds
- **SC-003**: Users can drag and drop a card between columns with visual feedback, completing the action in under 3 seconds
- **SC-004**: Users can search for a company and see filtered results update in real-time (under 200ms response)
- **SC-005**: 100% of interactive elements meet WCAG AA accessibility standards (4.5:1 contrast, keyboard accessible, screen reader compatible)
- **SC-006**: Board remains responsive and functional with up to 100 cards displayed across columns
- **SC-007**: All 6 major components (atoms and organisms) have complete Storybook stories with accessibility checks passing
- **SC-008**: Mobile users can successfully create, view, and move cards on 375px viewport
- **SC-009**: Zero console errors or warnings in browser dev tools during normal usage
- **SC-010**: Users can complete the primary workflow (add target → move through columns → view details → delete) without training or documentation
