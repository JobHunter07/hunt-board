# GitHub Copilot — Project Instructions  
## Hunt Board UI (React + Material Design)

You are assisting in building **The Hunt Board**, a Kanban-style job hunting dashboard.  

Create a Trello-style Kanban board with drag-and-drop columns designed specifically for **job hunting**, not passive job searching.  
The board should visualize the *full hunting lifecycle*: identifying targets, gathering intel, building relationships, tracking signals, and executing outreach.

## Columns (Hunting-Oriented)

### 1. 🎯 Targets Identified
Jobs, companies, or teams that look interesting but need research.
**Fields:**
- Company
- Role (if known)
- Why it's a target
- Source (referral, rumor, news, LinkedIn post)

---

### 2. 🔍 Intel Gathering
Research phase before any outreach.
**Tasks include:**
- Identify hiring manager
- Map team members
- Check LinkedIn activity
- Look for stealth openings
- Analyze company signals (funding, layoffs, growth)

**Fields:**
- Key people
- Notes
- Warm intro possibilities
- Risk signals / green flags

---

### 3. 🧭 Warm-Up Phase
Before applying or messaging, you "warm up" the target.
**Examples:**
- Follow hiring manager on LinkedIn
- Engage with their posts
- Comment on team updates
- Join their Slack/Discord if public
- Attend their webinar or event

**Fields:**
- People followed
- Engagement actions taken
- Warm-up score (0–100)

---

### 4. 📨 Outreach Initiated
You've made first contact.
**Examples:**
- Sent DM
- Sent intro email
- Asked for referral
- Reached out to recruiter
- Submitted a crafted application (not generic)

**Fields:**
- Outreach type
- Date sent
- Message template used
- Referral involved (Y/N)

---

### 5. ⏳ Follow-Up Required
This is the **critical hunter column**.
Every card here needs action.
**Examples:**
- Follow-up DM
- Follow-up email
- Check if role posted yet
- Re-engage with hiring manager content

**Fields:**
- Last contact date
- Next follow-up date
- Follow-up script

---

### 6. 🗣️ Conversation Started
Any sign of life.
**Examples:**
- Recruiter replied
- Hiring manager responded
- Someone viewed your profile
- Someone liked your comment
- Someone accepted your connection

**Fields:**
- Who responded
- Conversation notes
- Next step

---

### 7. 📝 Interview Pipeline
Once the hunt becomes formal.
**Stages inside card:**
- Screening
- Technical
- Team interview
- Final
- Offer pending

**Fields:**
- Interview dates
- Prep checklist
- Feedback notes

---

### 8. 🦌 Stalled / Cold
The trail went cold.
**Examples:**
- No response after 2 follow-ups
- Role frozen
- Hiring manager ghosted
- Recruiter vanished

**Fields:**
- Last activity
- Attempts made
- Decision: retry later or archive

---

### 9. 🏆 Offer / Success
You landed something — or got a strong lead.
**Examples:**
- Offer received
- Referral secured
- Hiring manager wants to talk again soon

**Fields:**
- Offer details
- Compensation notes
- Decision status

---

## Card-Level Features (Important)
Each card should support:
- Notes
- Attachments (screenshots, PDFs)
- Tags (e.g., "high priority", "stealth role", "referral-ready")
- Priority level
- Reminder dates
- Auto-move to "Follow-Up Required" when next follow-up date hits

---

## Optional Enhancements
- Color-coded companies by industry
- Auto-detect LinkedIn profile URLs
- Quick-add buttons: "Add Follow-Up", "Add Outreach", "Add Intel"
- Analytics: number of targets, warm-ups, follow-ups, active conversations

---

## Purpose of the Hunt Board
This board is not about tracking applications.  
It's about tracking **momentum** — the lifeblood of job hunting.

It visualizes:
- Who you're hunting
- What intel you've gathered
- Who you've warmed up
- Who owes you a reply
- Where the trail is hot or cold
- Where to focus your next move

This is the difference between **searching** and **hunting**.

---

# 🔧 Tech Requirements
- React (functional components only)
- Material UI (MUI v5)
- Material Design 3 spacing, elevation, and typography
- No emojis in UI elements
- Use Material UI Cards for all Kanban items
- Use Material UI Grid or Box for layout
- Use Material UI Dialog for modals
- Use Material UI Icons instead of emojis
- Use Material UI theme overrides for consistent styling

---

# 🎨 Design System Rules
- Use Material Design elevation levels (1–3) for cards
- Use Material Design spacing (8px grid)
- Use Material Design color roles:
  - Primary: deep red (#B71C1C or similar)
  - Secondary: slate/neutral
  - Background: light grey
- Rounded corners: 8px
- Typography:
  - Company name: `Typography variant="subtitle1"`
  - Role: `Typography variant="body2"`
  - Tags: `Chip` components
- No custom CSS unless absolutely necessary — prefer MUI `sx` props

---

# 📦 Component Requirements

## 1. Kanban Board Layout
Create a responsive horizontal scrollable board using:
- `<Box display="flex" gap={2} overflow="auto">`
- Each column is a `<Paper>` or `<Card>` with:
  - Title (`Typography variant="h6"`)
  - Count badge (`Chip`)
  - Add button (`Button` with `AddIcon`)
  - Vertical stack of cards (`Stack spacing={2}`)

Columns (in order):
1. Targets Identified  
2. Intel Gathering  
3. Warm-Up Phase  
4. Outreach Initiated  
5. Follow-Up Required  
6. Conversation Started  
7. Interview Pipeline  
8. Stalled / Cold  
9. Offer / Success  

---

## 2. Card Component (Material Design Card)
Each card must be a `<Card elevation={2}>` with:
- Company name (subtitle1)
- Role (body2)
- Priority indicator (colored dot using `<CircleIcon fontSize="small" />`)
- Tags (`Chip` components)
- Next follow-up date (if present)
- Warm-Up Score (small badge using `<Chip size="small" />`)
- Signals (Material Icons: `Visibility`, `ThumbUp`, `Message`, etc.)

Card interactions:
- Click → opens detail modal
- Drag & drop enabled (react-beautiful-dnd or similar)
- Hover → show quick actions (`IconButton` for edit/delete)

---

## 3. Card Detail Modal (Material UI Dialog)
Use `<Dialog>` with:
- Title section
- Tabs or sections for:
  - Core Info
  - Warm-Up
  - Outreach
  - Follow-Up
  - Signals
  - Attachments
- Use Material UI form components:
  - `<TextField>`
  - `<Select>`
  - `<DatePicker>`
  - `<Chip>`
  - `<Stack>`
  - `<Divider>`

Footer:
- Save button (`Button variant="contained"`)
- Delete button (`Button color="error"`)

---

## 4. Add Target Modal
Fields:
- Company (required)
- Role
- Why it's a target
- Source (Select)
- Tags (Chip input)
- Priority (Select)
- Notes

Use Material UI form layout:
- `<Stack spacing={2}>`

---

## 5. Search & Filter Bar
At the top of the board:
- `<TextField>` with search icon
- Filter button (`IconButton` with `FilterListIcon`)
- Filters use `<Menu>` or `<Popover>`

---

# 🧭 Interaction Rules
- Smooth drag & drop between columns
- Material Design ripple effects on buttons
- Material Design hover states
- Material Design elevation changes on drag

---

# 🧩 What NOT to generate
- No emojis in UI
- No Tailwind
- No custom CSS frameworks
- No inline SVGs unless wrapped in MUI Icon components
- No non-MUI components for layout or cards

---

# 🎯 Goal
Produce a **professional**, **Material Design–compliant**, **React + MUI** Hunt Board UI that looks like a real enterprise tool — not a hobby project.

---

# 🏛️ Constitutional Compliance

All development must follow the Hunt Board Engineering Constitution (`.specify/memory/constitution.md`):

## Spec-Driven Design (Section I)
- Every feature requires an approved specification before implementation
- Use `/speckit.specify` to create feature specifications
- No coding without specification, review, and approval
- All specs must include: purpose, scope, UX flows, error handling, accessibility, and Storybook requirements

## Component Architecture (Section II)
- **Three levels only**: Atoms → Organisms → Pages
- **NO Molecules permitted**
- Every component requires:
  - Specification
  - Storybook story
  - Responsive behavior by default
  - Material UI styling and theming

## Vertical Slice Architecture (Section III)
- Organize by use-case/feature, not technical layers
- Each slice contains: UI components, actions, validation, data access, tests, stories, docs
- Structure: `src/features/[feature-name]/components/{atoms,organisms,pages}/`
- Shared utilities in `/src/lib` must be stable, documented, versioned

## Data Configuration (Section IV)
- All domain models defined in Zod schema files
- Types generated from schemas (never hand-written)
- Single source of truth for data contracts

## Storybook Requirements (Section V)
- Every component MUST have a Storybook story in `src/stories/`
- Use CSF3 with autodocs
- Required stories: Default, Loading, Error, Disabled, Empty, Max Content
- Include `@storybook/addon-a11y` checks
- Interactive controls for all props

## Testing Standards (Section VII)
- Minimum 80% coverage for logic
- 100% coverage for security-critical paths
- Test pyramid: Unit → Integration → Component → Visual Regression → A11y → E2E
- Use React Testing Library for component tests

## NPM Library Requirements (Section XI)
- Tree-shakable exports
- Explicit exports only (no default exports)
- Types bundled with package
- No environment-specific logic
- No authentication/security logic (delegated to app.jobhunter07.com)

---

# 📝 Development Workflow

1. **Specify**: Use `/speckit.specify [feature description]` to create specification
2. **Review**: Specification reviewed and approved
3. **Plan**: Use `/speckit.plan` to create implementation plan
4. **Tasks**: Use `/speckit.tasks` to decompose into atomic tasks
5. **Implement**: Build per specification with tests first
6. **Storybook**: Create stories for all components
7. **Review**: Code review against specification and constitution
8. **Deploy**: Feature deployed as atomic unit

---

# 🎨 Material UI Theme Configuration

```typescript
// Expected theme structure (Section II requirement)
const theme = createTheme({
  palette: {
    primary: {
      main: '#B71C1C', // Deep red
    },
    secondary: {
      main: '#546E7A', // Slate
    },
    background: {
      default: '#F5F5F5', // Light grey
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // 8px grid
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

---

# ✅ Pre-Implementation Checklist

Before writing ANY code:
- [ ] Feature has approved specification in `/specs/[###-feature-name]/spec.md`?
- [ ] Specification includes component architecture (Atom/Organism/Page levels)?
- [ ] Specification includes accessibility requirements (WCAG AA)?
- [ ] Specification includes Storybook story requirements?
- [ ] Implementation plan exists in `/specs/[###-feature-name]/plan.md`?
- [ ] Constitution checks passed (see plan.md)?
- [ ] Vertical slice structure defined?
- [ ] Zod schemas defined for all data?
- [ ] Test strategy defined (80% coverage minimum)?

---

**This document guides GitHub Copilot code generation.  
All suggestions must comply with the Engineering Constitution.**
