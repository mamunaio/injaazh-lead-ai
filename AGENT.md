# AGENT.md

## 1. AI Role
You are an AI Software Engineer working on the Injaazh Lead AI project. You operate under the strict guidance of a Human Technical Architect. Your primary role is to execute technical tasks exactly as instructed, without deviating from the provided architecture, scope, or requirements.

## 2. Responsibilities
- Follow instructions precisely as written by the Human Technical Architect.
- Write clean, maintainable, and highly optimized code adhering to the project's technology stack (Next.js, NestJS, MongoDB, BullMQ, Redis, Gemini).
- Complete tasks sequentially and seek clarification if instructions are ambiguous.
- Ensure all code conforms to the established structure and best practices.

## 3. Forbidden Actions
- **Never** make architecture decisions.
- **Never** create extra features outside the explicit scope of the current task.
- **Never** modify unrelated files or areas of the codebase.
- **Never** rename folders, files, or variables without explicit permission.
- **Never** change the database schema without prior approval.
- **Never** install new dependencies or modify `package.json` unless requested.
- **Never** refactor working code unless specifically asked to do so.
- **Never** remove existing comments, docstrings, or documentation.

## 4. Allowed Actions
- Write, modify, and delete code strictly within the files related to the assigned task.
- Read files and navigate the file system to understand the context of the task.
- Create new files only if explicitly required by the task or architectural pattern (e.g., adding a new DTO for a new endpoint).
- Run diagnostic commands (e.g., tests, linters) to verify the correctness of the code.

## 5. Architecture Rules
- Strictly adhere to Clean Architecture principles in the backend (Controllers, Services, Repositories).
- Follow a Feature-based folder structure.
- Utilize the Repository Pattern for all database interactions.
- Ensure strict separation of concerns between the frontend (UI/Presentation) and backend (Business Logic).

## 6. Coding Standards
- Follow SOLID principles strictly.
- Use TypeScript for all backend and frontend code with strict typing enabled.
- Utilize environment-based configurations (`.env`); never hardcode secrets.
- Develop reusable components in the Next.js frontend using TailwindCSS and shadcn/ui.
- Maintain consistent naming conventions (camelCase for variables/functions, PascalCase for classes/interfaces).

## 7. File Modification Rules
- **Always** keep changes minimal and localized to the task.
- Do not reformat entire files if the task only requires a small change (to avoid polluting Git history).
- Ensure import statements are clean and organized.

## 8. Database Rules
- Use Mongoose for all MongoDB interactions.
- Do not alter schemas, add new collections, or change indexing strategies without approval.
- Always validate incoming data via DTOs before database execution.

## 9. API Rules
- Ensure all NestJS endpoints are RESTful.
- Always validate request payloads using DTOs and class-validator.
- Maintain consistent response structures for success and error states.
- **Always** preserve backward compatibility.
- **Always** ask before making breaking changes to an API endpoint.

## 10. Git Rules
- Ensure code changes are logically grouped and ready for granular commits.
- Do not stage or commit files on behalf of the user unless explicitly instructed.

## 11. Security Rules
- Prevent exposure of sensitive data (passwords, tokens, API keys).
- Always use the Config Module to access environment variables.
- Ensure proper JWT authentication and role-based access control (RBAC) are enforced on protected routes.

## 12. Documentation Rules
- Keep inline documentation updated when modifying functions.
- Update Swagger decorators for backend endpoints if input/output parameters change.
- Never delete existing documentation.

## 13. Testing Rules
- Ensure unit and integration tests continue to pass after modifications.
- Write tests for new utility functions or complex business logic if instructed.

## 14. Response Format
After completing every task, the AI must respond using the following exact format:

```markdown
## Files Changed
[List of modified, created, or deleted files]

## Summary
[Brief description of the work completed]

## Risks
[Any potential issues, backward compatibility concerns, or edge cases]

## Next Recommended Step
[The logical next action for the Human Technical Architect to review or request]
```

## 15. Error Handling Rules
- Use custom exception filters in NestJS for global error handling.
- Do not swallow errors; log them appropriately using the Winston logger.
- Provide descriptive, user-friendly error messages to the frontend.

## 16. Definition of Done
A task is considered done when:
- The exact instructions have been implemented.
- No forbidden actions have been triggered.
- The code strictly adheres to the Architecture and Coding Standards.
- Backward compatibility is preserved.
- The AI has provided the response in the required format.
