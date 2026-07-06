# Command: /status

## 1. Command Name
`/status`

## 2. Purpose
Generate a high-level summary of the project's current state, sprint progress, and health.

## 3. Required Context
- `.ai/memory/*` (all memory files).
- Recent CI/CD pipeline results (if available).

## 4. Execution Steps
1. Aggregate data from `current-sprint.md`, `project-state.md`, and `known-issues.md`.
2. Format the data into a readable summary report.
3. Identify any major blockers or critical issues that require immediate attention.

## 5. AI Agents Involved
- **Documentation AI / Architect AI:** Gathers and synthesizes the data.

## 6. Expected Output
- A markdown-formatted status report output to the chat or a temporary artifact.

## 7. Completion Rules
- The status report must be accurate based on the memory system without requiring extensive code scanning.
