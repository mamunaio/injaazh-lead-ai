# Command: /next

## 1. Command Name
`/next`

## 2. Purpose
Automatically identify, prioritize, and initiate the next most important task for the project.

## 3. Required Context
- `.ai/memory/current-sprint.md`
- `.ai/memory/known-issues.md`
- `.ai/memory/current-context.md`
- `TASK.md`

## 4. Execution Steps
1. Parse `current-sprint.md` to find pending high-priority tasks.
2. If the sprint is empty, check `known-issues.md` or `TASK.md` for the next logical item.
3. Update `.ai/memory/current-context.md` with the new active task.
4. Delegate the task to the appropriate AI Agent (e.g., Backend Engineer AI for API tasks).

## 5. AI Agents Involved
- **Architect AI:** Evaluates priority and sets context.
- **Relevant Domain AI:** (Assigned based on task type).

## 6. Expected Output
- Updated `current-context.md`.
- Initiation of the task (e.g., scaffolding files or running an analysis).

## 7. Completion Rules
- The command finishes when a clear next step is defined, logged in memory, and work begins.
