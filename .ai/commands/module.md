# Command: /module

## 1. Command Name
`/module [name]`

## 2. Purpose
Scaffold a new Clean Architecture module (domain) with the correct folder structure and interfaces.

## 3. Required Context
- `ARCHITECTURE.md`
- `PROJECT.md`

## 4. Execution Steps
1. Generate the standard module directories (e.g., Domain, UseCases, Infrastructure, Presentation).
2. Create boilerplate entities, repository interfaces, and basic DTOs.
3. Register the new module in the application's dependency injection container or router.
4. Log the module creation in `.ai/memory/project-state.md`.

## 5. AI Agents Involved
- **Architect AI:** Ensures structural compliance.
- **Backend Engineer AI:** Generates the boilerplate files.

## 6. Expected Output
- A new directory structure matching `ARCHITECTURE.md`.
- Basic interface files (Entities, Repositories).

## 7. Completion Rules
- The scaffolded module must strictly adhere to the Clean Architecture rules without generating logic that violates dependency inversion.
