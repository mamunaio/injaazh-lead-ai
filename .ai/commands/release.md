# Command: /release

## 1. Command Name
`/release [version]`

## 2. Purpose
Prepare the codebase for a deployment/release, generating necessary artifacts and changelogs.

## 3. Required Context
- `.ai/workflows/release.md`
- `.ai/memory/completed-tasks.md`
- `.ai/templates/deployment-task.md`

## 4. Execution Steps
1. Parse `completed-tasks.md` to generate release notes/changelog.
2. Verify all tests pass on the main branch.
3. Update version numbers in configuration files (e.g., `package.json`).
4. Execute build scripts (e.g., Docker image build) if applicable.

## 5. AI Agents Involved
- **DevOps Engineer AI:** Handles build and versioning.
- **Documentation AI:** Generates the changelog.

## 6. Expected Output
- Updated changelog (`CHANGELOG.md`).
- Version bumps.
- Ready-to-deploy build artifacts.

## 7. Completion Rules
- The build must succeed without errors, and the changelog must accurately reflect the closed tasks.
