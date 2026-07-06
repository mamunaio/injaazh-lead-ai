# Command: /docs

## 1. Command Name
`/docs [target or global]`

## 2. Purpose
Generate, update, or audit project documentation based on the current codebase and decisions.

## 3. Required Context
- `PROJECT.md`, `ARCHITECTURE.md`, `DECISIONS.md`.
- Source code (for API/inline docs).
- `.ai/memory/completed-tasks.md`.

## 4. Execution Steps
1. Scan the target codebase for undocumented APIs or modules.
2. Update README files, API specs (e.g., Swagger/OpenAPI), and internal architecture docs.
3. Ensure `.ai/memory/decisions.md` is synced with `DECISIONS.md`.

## 5. AI Agents Involved
- **Documentation AI:** Writes and formats the documentation.

## 6. Expected Output
- Updated markdown files in the `/docs` directory or inline code comments.

## 7. Completion Rules
- Documentation must be clear, concise, and accurately reflect the current state of the source code.
