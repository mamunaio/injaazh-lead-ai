# Deployment Task Template

## 1. Objective
[Describe the release version, target environment, and deployment scope]

## 2. Context
[Provide the changelog, major features included, and necessary downtime information]

## 3. Prerequisites
- [All tests must pass on the `main` or release branch]
- [Environment variables must be configured in the target environment]
- [Database migrations must be tested]

## 4. Requirements
- [Execute deployment scripts or trigger CI/CD pipelines]
- [Run database migrations securely]
- [Perform post-deployment health checks]

## 5. Restrictions
- [Do not deploy manually from local machines; rely on automated pipelines]
- [Do not execute destructive database migrations without a verified backup]

## 6. Deliverables
- [Deployed application instance]
- [Deployment log or pipeline trace]
- [Post-deployment health check report]

## 7. Self Review Checklist
- [ ] CI/CD pipeline succeeded.
- [ ] Environment variables are correctly mapped.
- [ ] Application is accessible externally.
- [ ] Monitoring and logging are actively receiving data.

## 8. Output Format
[Format for the release notes and deployment status update]

## 9. Definition of Done
- Application is live in the target environment.
- Health checks return positive metrics.
- Stakeholders are notified of the successful deployment.
