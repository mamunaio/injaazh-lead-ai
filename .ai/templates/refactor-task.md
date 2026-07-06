# Refactor Task Template

## 1. Objective
[Identify the module or component to be refactored and the specific goal (e.g., performance, readability)]

## 2. Context
[Explain why the current implementation is insufficient and the technical debt it causes]

## 3. Prerequisites
- [Comprehensive test coverage must exist for the component before refactoring begins]

## 4. Requirements
- [Improve internal structure without altering external behavior]
- [Reduce code complexity and improve maintainability]

## 5. Restrictions
- [Strictly no new features or bug fixes during the refactoring phase]
- [Do not change public API contracts]

## 6. Deliverables
- [Refactored source files]
- [Updated documentation (if internal architecture changed)]
- [Performance comparison report (if applicable)]

## 7. Self Review Checklist
- [ ] External behavior remains identical.
- [ ] Existing test suites pass without modification to the assertions.
- [ ] Code complexity metrics have improved.
- [ ] Old, deprecated code is fully removed.

## 8. Output Format
[Format for summarizing the refactoring impact and structural changes]

## 9. Definition of Done
- Refactored code is merged.
- CI pipeline confirms all existing tests pass.
- No external consumers are broken.
