# Command: /feature

## 1. Command Name
`/feature [name]`

## 2. Purpose
Kick off the end-to-end development of a new feature according to project architecture and workflows.

## 3. Required Context
- `PROJECT.md`
- `ARCHITECTURE.md`
- `.ai/templates/feature-task.md`
- `.ai/workflows/feature-development.md`

## 4. Execution Steps
1. Populate `feature-task.md` with the feature details and acceptance criteria.
2. Architect AI designs the components and updates `DECISIONS.md` if necessary.
3. Backend/Frontend Engineer AI implements the code.
4. Tester AI writes and runs unit/integration tests.
5. Update `completed-tasks.md` upon successful testing.

## 5. AI Agents Involved
- **Architect AI:** Design and planning.
- **Backend Engineer AI / Frontend Engineer AI:** Implementation.
- **Tester AI:** Validation.

## 6. Expected Output
- Implemented feature code.
- Passing test suite.
- Updated `.ai/memory/completed-tasks.md`.

## 7. Completion Rules
- Code must compile, pass all linting rules, and satisfy the acceptance criteria before marking as done.
