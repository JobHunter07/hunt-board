# Project Rules — Permanent Memory

## Rule 1: Spec First — Always (NO Exceptions)

**Even for POC, prototyping, quick experiments, or exploratory work — a spec is required before any code is written.**

This is a permanent, non-negotiable rule for this project.

### What this means

- No `// temp` code, no "let me just try something", no "I'll spec it later"
- Every feature, change, fix, or experiment needs at minimum a brief spec entry in `/specs/[###-feature-name]/spec.md`
- If the change is tiny (1–3 lines), at minimum add an entry in the relevant spec's changelog/notes section
- POC work gets its own spec-lite: purpose, scope, outcomes — then code

### Why

The constitution (Section I) requires this. But more practically:
- Reverse-speccing after the fact is expensive and error-prone
- Tests written against un-specced code drift from intent
- The team loses the "why" for every decision

### Workflow reminder

```
1. /speckit.specify [feature description]  → creates spec
2. /speckit.plan                            → creates plan
3. /speckit.tasks                           → creates tasks
4. implement per spec
5. /speckit.implement                       → executes tasks
```

If you are in agent mode and a user asks to "just try something" or "prototype X", 
**STOP and create a spec entry first**. Then proceed.
