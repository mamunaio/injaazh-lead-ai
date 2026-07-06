# Command: /fix

## 1. Command Name
`/fix [issue description or ID]`

## 2. Purpose
Diagnose and resolve a bug or defect, ensuring it is backed by a regression test.

## 3. Required Context
- `.ai/workflows/bug-fix.md`
- `.ai/memory/known-issues.md`
- `.ai/templates/bugfix-task.md`
- Error logs or stack traces.

## 4. Execution Steps
1. Write a failing unit/integration test that reproduces the bug.
2. Analyze the root cause and implement the localized fix.
3. Run the test suite to ensure the failing test now passes and no other tests are broken.
4. Update `.ai/memory/known-issues.md` (mark as resolved).

## 5. AI Agents Involved
- **Tester AI:** Writes the regression test and validates.
- **Relevant Engineer AI:** Implements the fix.

## 6. Expected Output
- A new regression test.
- Patched source code.
- Updated memory file.

## 7. Completion Rules
- A failing test MUST be written before the code is modified, and the fix must be strictly localized to the bug.
