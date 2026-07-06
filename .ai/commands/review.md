# Command: /review

## 1. Command Name
`/review`

## 2. Purpose
Trigger a comprehensive code review against recent changes or a specific Pull Request.

## 3. Required Context
- Uncommitted changes or target PR branch.
- `AGENT.md` (for coding standards).
- `.ai/workflows/code-review.md`
- `.ai/templates/review-task.md`

## 4. Execution Steps
1. Run static analysis, linters, and type checkers.
2. Analyze code diffs for adherence to Clean Architecture.
3. Perform a security scan for vulnerabilities.
4. Generate a review report or add inline comments.

## 5. AI Agents Involved
- **Code Reviewer AI:** Code quality and architecture checks.
- **Security AI:** Vulnerability scanning.

## 6. Expected Output
- Completed `review-task.md` or inline feedback.
- Pass/Fail decision on the reviewed code.

## 7. Completion Rules
- The review must cover both stylistic rules and structural/architectural guidelines.
