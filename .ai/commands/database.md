# Command: /database

## 1. Command Name
`/database [action] [entity]`

## 2. Purpose
Manage database schemas, migrations, and ORM/query builder models.

## 3. Required Context
- Database schema definitions (e.g., existing models, SQL schemas).
- `ARCHITECTURE.md`
- `.ai/memory/decisions.md` (for DB design choices).

## 4. Execution Steps
1. Analyze the requested change (e.g., add table, modify column).
2. Generate the necessary migration script (e.g., SQL, Prisma, TypeORM).
3. Update the corresponding Domain Entities and Infrastructure Repositories.
4. Add rollback instructions to the migration.

## 5. AI Agents Involved
- **Backend Engineer AI:** Schema modification and code updates.
- **Architect AI:** Ensures relationships and normalization are correct.

## 6. Expected Output
- Generated migration file.
- Updated infrastructure code (ORM models, repositories).

## 7. Completion Rules
- The migration must be syntactically correct and reversible. Models must perfectly match the new schema.
