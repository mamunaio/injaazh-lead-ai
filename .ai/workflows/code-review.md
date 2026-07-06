# Code Review Workflow

## 1. Trigger
A Pull Request (PR) is opened or a task (Feature/Bugfix) is marked as ready for review.

## 2. Steps
1. **Static Analysis:** Check automated CI results (Linting, Tests).
2. **Standard Audit:** Evaluate the code against `AGENT.md` rules and Clean Architecture.
3. **Security Audit:** Check for vulnerabilities, insecure endpoints, or data leaks.
4. **Feedback Generation:** Provide actionable inline comments using the `review-task.md` format.
5. **Resolution:** Wait for the developer to address feedback and re-review.

## 3. Responsible AI Agent
- **Code Reviewer AI:** (Step 1, 2, 4, 5)
- **Security AI:** (Step 3)

## 4. Required Inputs
- Code diff or Pull Request link.
- `review-task.md` template.
- Project architectural guidelines.

## 5. Expected Outputs
- Detailed review summary report.
- Inline feedback for specific lines of code.
- Final PR Approval or Request for Changes.

## 6. Validation Checklist
- [ ] No unauthorized architectural changes bypass the Architect AI.
- [ ] SOLID principles are respected.
- [ ] Edge cases and failure states are handled.
- [ ] Security rules are strictly adhered to.

## 7. Completion Criteria
- All review comments are resolved by the developer.
- Reviewer AI grants explicit approval.
- Code is ready to be merged.
