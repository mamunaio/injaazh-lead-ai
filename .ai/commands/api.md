# Command: /api

## 1. Command Name
`/api [name or route]`

## 2. Purpose
Generate a new API endpoint including its controller, use-case logic, and route registration.

## 3. Required Context
- `ARCHITECTURE.md`
- Relevant module/domain files.
- `.ai/memory/current-context.md`

## 4. Execution Steps
1. Identify the target module and read its existing entities/interfaces.
2. Create or update the controller/handler for the endpoint.
3. Implement the corresponding use-case (business logic).
4. Define Request/Response DTOs and validation rules.
5. Register the endpoint in the router.

## 5. AI Agents Involved
- **Backend Engineer AI:** Implements the endpoint and logic.
- **Security AI:** Verifies input validation and authorization checks.

## 6. Expected Output
- A fully functional and secured API endpoint.
- DTO definitions.

## 7. Completion Rules
- Endpoint must have strict input validation, proper error handling, and adhere to REST/GraphQL standards.
