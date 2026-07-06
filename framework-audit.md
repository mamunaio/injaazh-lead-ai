# Framework Audit Report

## Overall Score
**85/100**

## Problems Found

1. **Inconsistent Naming:**
   - The workflow is named `bug-fix.md` (hyphenated), but the template is `bugfix-task.md` (unhyphenated).
   - The workflow is named `code-review.md`, while the template is simply `review-task.md`.

2. **Missing Workflows:**
   - There are templates for `api-task.md` and `refactor-task.md` in `.ai/templates/`, but there are no corresponding workflows (e.g., `api-development.md` or `refactoring.md`) in `.ai/workflows/` to guide their execution.

3. **Missing Commands:**
   - A template for `refactor-task.md` exists, but there is no `/refactor` command in `.ai/commands/`.
   - The `devops.md` agent exists, and there is a `release.md` command, but no `/deploy` or `/infrastructure` command for non-release devops tasks.

4. **Missing Templates:**
   - The `/docs` command exists in `.ai/commands/`, and a Documentation AI agent exists, but there is no `documentation-task.md` in `.ai/templates/`.

5. **Naming Collisions (Context Confusion):**
   - The file `database.md` exists in three separate locations: `docs/database.md`, `.ai/agents/database.md`, and `.ai/commands/database.md`. This naming overlap is highly likely to cause context confusion for AI agents attempting to read or update the database schema versus understanding the agent persona or command.

6. **Inconsistent Indexing:**
   - There are `index.md` files in `.ai/agents/`, `.ai/templates/`, `.ai/workflows/`, and `.ai/memory/`, but `.ai/commands/` is missing an `index.md` file.

7. **Conflicting Rules:**
   - `AGENT.md` strictly forbids modifying unrelated files or renaming variables/folders without permission. However, AI agents operating under the `refactor` template or `/fix` command will inevitably need to break this rule to perform their duties effectively.

## Recommended Fixes

1. **Standardize Nomenclature:** 
   - Rename `bugfix-task.md` to `bug-fix-task.md`.
   - Align `review-task.md` with `code-review-task.md`.
2. **Resolve Collisions:** 
   - Rename `docs/database.md` to `database-schema.md`.
   - Rename `.ai/agents/database.md` to `database-agent.md`.
   - Rename `.ai/commands/database.md` to `database-command.md` (or leave the command as `database.md` but rename the others).
3. **Fill Gaps:**
   - Create `.ai/workflows/api-development.md`.
   - Create `.ai/workflows/refactoring.md`.
   - Create `.ai/templates/documentation-task.md`.
   - Create `.ai/commands/refactor.md`.
   - Create `.ai/commands/index.md`.
4. **Update Rules:**
   - Add a clause in `AGENT.md` that explicitly grants variable renaming and structural modifications when an agent is executing a designated `/refactor` or `/fix` command.

## Approval Status
**Pending Review**
