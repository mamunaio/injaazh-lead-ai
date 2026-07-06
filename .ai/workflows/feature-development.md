# Feature Development Workflow

## 1. Trigger
A new feature request is approved and moved to the "In Progress" sprint queue.

## 2. Steps
1. **Planning:** Review the requirements and generate `feature-task.md`.
2. **Architecture Check:** Ensure the feature design adheres to `ARCHITECTURE.md` and Clean Architecture principles.
3. **Implementation:** Develop the backend APIs and frontend UI components.
4. **Testing:** Write unit and integration tests to cover the new functionality.
5. **Review Phase:** Submit the completed feature for a Code Review.

## 3. Responsible AI Agent
- **Architect AI:** (Step 1 & 2)
- **Backend Engineer AI / Frontend Engineer AI:** (Step 3)
- **Tester AI:** (Step 4)

## 4. Required Inputs
- Approved user story or requirements document.
- `feature-task.md` template.
- Relevant API contracts and database schema (`database.md`).

## 5. Expected Outputs
- Completed source code files matching the feature requirements.
- Passing unit and integration tests.
- Updated documentation.

## 6. Validation Checklist
- [ ] Code compiles and builds without errors.
- [ ] Linter and formatter (ESLint/Prettier) report no issues.
- [ ] Strict type checking is maintained (no implicit `any`).
- [ ] Feature perfectly fulfills the acceptance criteria.

## 7. Completion Criteria
- Feature code is committed.
- All tests pass locally and in the CI pipeline.
- Handed off to the Code Review workflow.
