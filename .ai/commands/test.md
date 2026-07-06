# Command: /test

## 1. Command Name
`/test [target path or suite]`

## 2. Purpose
Generate missing tests or execute the test suite for a specific component or the entire project.

## 3. Required Context
- Target source files.
- Existing test files.
- `ARCHITECTURE.md` (for testing boundaries).

## 4. Execution Steps
1. Analyze the target code for missing coverage (edge cases, happy paths).
2. Generate unit, integration, or e2e tests using the designated testing framework.
3. Execute the tests.
4. Report coverage and pass/fail status.

## 5. AI Agents Involved
- **Tester AI:** Generates and runs tests.

## 6. Expected Output
- New test files (`*.spec.ts`, `*.test.ts`, etc.).
- Execution report.

## 7. Completion Rules
- Generated tests must run successfully, assert meaningful behavior (not just snapshotting), and mock external dependencies properly.
