# PROJECT.md

## 1. Project Vision
To become the premier AI-driven ecosystem for intelligent outreach, empowering businesses to effortlessly discover, analyze, and engage with high-value prospects through hyper-personalized, data-backed communication strategies.

## 2. Mission
To eliminate the friction and inefficiency of traditional B2B lead generation by providing an intuitive, scalable, and autonomous platform that bridges the gap between raw data and meaningful business relationships.

## 3. Product Goals
- Automate the end-to-end lead lifecycle from discovery to initial contact.
- Leverage AI (Gemini) to generate contextual, highly converting outreach copy.
- Provide real-time campaign analytics and delivery tracking.
- Ensure high deliverability and scalable performance for enterprise workloads.
- Maintain a seamless, low-latency user experience across all devices.

## 4. Target Users
- Agencies requiring multi-tenant campaign management.
- Freelancers seeking automated pipeline growth.
- B2B Companies looking to scale direct sales.
- Sales Teams requiring intelligent prospect insights.
- Marketing Teams aiming to align content with outbound strategies.

## 5. Core Features
- **Intelligent Lead Capture:** Bulk import, manual entry, and automated scraping.
- **AI Website Analysis:** Automated extraction of company context, value propositions, and key personnel.
- **Hyper-Personalized Outreach:** Gemini-powered generation of email sequences tailored to individual lead profiles.
- **Campaign Management:** Automated scheduling, sequencing, and A/B testing of outreach efforts.
- **Email Tracking:** Real-time monitoring of open rates, click-through rates, and reply detection.
- **Follow-up Automation:** Smart, context-aware automated follow-ups based on lead engagement.
- **Multi-tenant Dashboard:** Centralized workspace for managing multiple clients or organizational units.

## 6. Out of Scope Features
- Native CRM functionality (sales pipelines, deal tracking).
- Direct social media messaging automation (e.g., LinkedIn automation).
- VoIP calling or SMS outreach.
- Payroll, invoicing, or native payment processing for closed deals.

## 7. Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend:** NestJS, TypeScript
- **Database:** MongoDB (via Mongoose)
- **Queue/Workers:** BullMQ
- **Caching:** Redis
- **AI Integration:** Google Gemini
- **Infrastructure:** Docker, Docker Compose

## 8. Development Principles
- **Clean Architecture:** Strict separation of concerns (Controllers, Services, Repositories).
- **SOLID Design:** Ensuring maintainable, scalable, and testable code.
- **Component-Driven UI:** Reusable, accessible, and highly customized frontend components.
- **Validation First:** Strict DTO validation and type safety across the stack.
- **Asynchronous Processing:** Offloading heavy operations (AI generation, bulk imports) to background queues.
- **Environment Isolation:** Strict configuration management across Development, Staging, and Production.

## 9. Architecture Overview
The system follows a decoupled client-server architecture. The Next.js frontend communicates with the NestJS backend via RESTful APIs. The backend utilizes MongoDB for persistent storage and Redis for caching and BullMQ task management. Heavy workloads, such as Gemini AI analysis and email dispatching, are handled asynchronously by background workers to ensure API responsiveness. The entire stack is containerized using Docker for consistent deployment.

## 10. Module Overview
- **Auth Module:** JWT-based authentication, authorization, and session handling.
- **User/Tenant Module:** Management of user profiles, organization settings, and permissions.
- **Lead Management Module:** Core CRUD operations, tagging, filtering, and scoring of prospects.
- **AI Engine Module:** Interfacing with Gemini for contextual analysis and copy generation.
- **Campaign Module:** Workflow orchestration, sequence scheduling, and execution tracking.
- **Email Delivery Module:** SMTP integrations, tracking pixel injection, and webhook handling for bounces/replies.
- **Analytics Module:** Aggregation of campaign performance metrics and lead conversion rates.

## 11. Development Roadmap
- **Phase 1: Foundation & Architecture:** Environment setup, CI/CD pipelines, database schemas, and core authentication.
- **Phase 2: Core Lead Management:** CRUD operations, CSV parsing, and UI implementation for lead handling.
- **Phase 3: AI Integration:** Connecting Gemini API, building the prompt engine, and implementing website analysis workers.
- **Phase 4: Campaign Engine:** Scheduling logic, sequence building, and BullMQ queue orchestration.
- **Phase 5: Email Tracking & Delivery:** SMTP setup, webhook integrations, and analytics dashboard.
- **Phase 6: Polish & Launch:** End-to-end testing, performance optimization, and production deployment.

## 12. Current Phase
Phase 1: Foundation & Architecture

## 13. Current Milestone
Establishing the project structure, defining the architecture, and drafting technical documentation.

## 14. Success Criteria
- The application can ingest 10,000+ leads via CSV without performance degradation.
- AI generation produces relevant, context-aware emails in under 5 seconds per lead.
- The campaign engine successfully dispatches scheduled emails with a 99.9% uptime rate.
- The frontend achieves a Lighthouse performance score of 90+.
- All core APIs are fully documented via Swagger and covered by unit/integration tests.

## 15. Documentation References
- API Documentation: `TBD (Swagger URL)`
- Frontend Component Library: `TBD (Storybook/Docs)`
- Deployment Guide: `TBD`

## 16. Future Plans
- Native integrations with major CRMs (Salesforce, HubSpot).
- Advanced analytics with predictive conversion modeling.
- Support for multi-channel outreach (combining Email with API-based social outreach where permitted).
- White-labeling capabilities for enterprise agency clients.
