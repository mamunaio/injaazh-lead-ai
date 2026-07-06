# Bug Fix Workflow

## 1. Trigger
A defect or bug is reported and prioritized for resolution.

## 2. Steps
1. **Diagnosis:** Analyze the bug report and reproduce the issue using `bugfix-task.md`.
2. **Isolation:** Write a failing regression test that demonstrates the bug.
3. **Resolution:** Patch the source code to fix the defect without altering unrelated logic.
4. **Validation:** Ensure the regression test and all existing test suites pass.
5. **Review:** Submit the patch for a Code Review.

## 3. Responsible AI Agent
- **Tester AI:** (Step 1 & 2)
- **Backend Engineer AI / Frontend Engineer AI:** (Step 3)

## 4. Required Inputs
- Bug report (steps to reproduce, expected vs. actual behavior).
- `bugfix-task.md` template.
- Application error logs or stack traces.

## 5. Expected Outputs
- Isolated regression test.
- Patched source code resolving the issue.
- Root cause analysis summary.

## 6. Validation Checklist
- [ ] Failing test is written *before* the fix.
- [ ] Fix successfully turns the failing test green.
- [ ] No other tests are broken (backward compatibility maintained).
- [ ] Changes are minimal and strictly localized.

## 7. Completion Criteria
- Bug is confirmed resolved locally.
- Regression tests are integrated.
- Code is pushed and awaiting review.
