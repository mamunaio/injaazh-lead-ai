# Database Architecture

## 1. Global Database Policies

### Naming Conventions
- **Collections:** lowercase, plural (e.g., `users`, `organizations`, `leads`).
- **Fields:** camelCase (e.g., `firstName`, `organizationId`).
- **References:** Suffix with `Id` (e.g., `userId`, `campaignId`).

### Multi-Tenant Strategy
- **Approach:** Tenant-per-Document.
- **Implementation:** Every domain entity (User, Lead, Campaign) must include a required `organizationId` referencing the `Organizations` collection. Database queries must always filter by `organizationId` to ensure data isolation.

### Soft Delete Strategy
- **Implementation:** Records are never physically deleted. 
- **Fields:** 
  - `isDeleted`: Boolean (Default: `false`)
  - `deletedAt`: Date (Default: `null`)
- **Queries:** All active read operations must implicitly append `{ isDeleted: false }`.

### Audit Fields
- **Fields:**
  - `createdBy`: ObjectId (Reference to `User`)
  - `updatedBy`: ObjectId (Reference to `User`)

### Timestamp Policy
- **Fields:**
  - `createdAt`: Date (Auto-generated on insertion)
  - `updatedAt`: Date (Auto-generated on modification)

---

## 2. Collections Overview

### A. organizations
**Purpose:** Represents a tenant (client, agency, or company) using the SaaS platform. All data belongs to an organization.

- **Fields:**
  - `_id`: ObjectId
  - `name`: String
  - `subscriptionTier`: String
  - `apiKeys`: Array of Strings
  - `isActive`: Boolean
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `name`, `subscriptionTier`
- **Default Values:** `subscriptionTier: 'Free'`, `isActive: true`
- **Enum Values:** `subscriptionTier`: ['Free', 'Pro', 'Enterprise']
- **Relationships:** None (Root Entity)
- **Indexes:** 
  - `{ name: 1 }`
- **Unique Constraints:** `name`
- **Validation Rules:** `name` must be alphanumeric with spaces, max 100 characters.

---

### B. users
**Purpose:** Represents a human user interacting with the system under a specific organization.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `email`: String
  - `passwordHash`: String
  - `firstName`: String
  - `lastName`: String
  - `role`: String
  - `lastLoginAt`: Date
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `email`, `passwordHash`, `firstName`, `role`
- **Default Values:** `role: 'User'`
- **Enum Values:** `role`: ['Owner', 'Admin', 'User']
- **Relationships:** 
  - `organizationId` -> `organizations._id`
- **Indexes:** 
  - `{ organizationId: 1 }`
  - `{ email: 1 }`
- **Unique Constraints:** `email` (Global uniqueness)
- **Validation Rules:** Valid email format required. Password hash must not be exposed in queries.

---

### C. leads
**Purpose:** Stores prospect information for outreach campaigns.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `email`: String
  - `firstName`: String
  - `lastName`: String
  - `company`: String
  - `jobTitle`: String
  - `linkedinUrl`: String
  - `websiteUrl`: String
  - `status`: String
  - `aiScore`: Number
  - `metadata`: Object (Dynamic Key-Value pairs)
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `email`
- **Default Values:** `status: 'New'`, `aiScore: 0`
- **Enum Values:** `status`: ['New', 'Enriched', 'Contacted', 'Qualified', 'Converted', 'Bounced']
- **Relationships:** 
  - `organizationId` -> `organizations._id`
- **Indexes:** 
  - `{ organizationId: 1, email: 1 }` (Compound Index)
  - `{ organizationId: 1, status: 1 }`
- **Unique Constraints:** Compound Unique Index on `{ organizationId: 1, email: 1 }`
- **Validation Rules:** Valid email format required. `aiScore` must be between 0 and 100.

---

### D. campaigns
**Purpose:** Defines outreach strategies, AI prompts, and scheduling logic for lead segments.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `name`: String
  - `promptTemplate`: String
  - `status`: String
  - `scheduledAt`: Date
  - `completedAt`: Date
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `name`, `promptTemplate`, `status`
- **Default Values:** `status: 'Draft'`
- **Enum Values:** `status`: ['Draft', 'Active', 'Paused', 'Completed']
- **Relationships:** 
  - `organizationId` -> `organizations._id`
- **Indexes:** 
  - `{ organizationId: 1, status: 1 }`
- **Unique Constraints:** None
- **Validation Rules:** `promptTemplate` must not be empty.

---

### E. campaign_logs
**Purpose:** Tracks AI interactions, generated content, and email dispatch status for every single lead processed in a campaign.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `campaignId`: ObjectId
  - `leadId`: ObjectId
  - `generatedSubject`: String
  - `generatedBody`: String
  - `status`: String
  - `errorMessage`: String
  - `openedAt`: Date
  - `repliedAt`: Date
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `campaignId`, `leadId`, `status`
- **Default Values:** `status: 'Pending'`
- **Enum Values:** `status`: ['Pending', 'Generating', 'Generated', 'Sent', 'Opened', 'Replied', 'Failed']
- **Relationships:** 
  - `organizationId` -> `organizations._id`
  - `campaignId` -> `campaigns._id`
  - `leadId` -> `leads._id`
- **Indexes:** 
  - `{ campaignId: 1, leadId: 1 }`
  - `{ organizationId: 1, status: 1 }`
- **Unique Constraints:** Compound Unique Index on `{ campaignId: 1, leadId: 1 }` (A lead should only be processed once per campaign).
- **Validation Rules:** None.

---

### F. lead_sources
**Purpose:** Tracks where leads originated from (e.g., CSV Upload, Web Scraping, API).

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `name`: String
  - `type`: String
  - `configuration`: Object
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `name`, `type`
- **Default Values:** None
- **Enum Values:** `type`: ['CSV', 'Scraper', 'API', 'Manual']
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1, type: 1 }` (Performance)
- **Unique Constraints:** None
- **Validation Rules:** None

---

### G. website_analysis
**Purpose:** Caches scraped and parsed data from company websites to avoid re-scraping.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `domain`: String
  - `rawHtml`: String
  - `parsedContent`: String
  - `summary`: String
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `domain`
- **Default Values:** None
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1, domain: 1 }` (Compound Unique & Performance)
  - `{ createdAt: 1 }` (TTL Index: Expire after 30 days to force fresh scrape)
- **Unique Constraints:** Compound Unique Index on `{ organizationId: 1, domain: 1 }`
- **Validation Rules:** Valid domain format.

---

### H. ai_analysis
**Purpose:** Stores Gemini's qualification and insight generation results for a specific lead/company.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `leadId`: ObjectId
  - `insights`: Array of Strings
  - `score`: Number
  - `rawAiResponse`: String
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `leadId`
- **Default Values:** `score: 0`
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
  - `leadId` -> `leads._id`
- **Indexes:**
  - `{ leadId: 1 }` (Performance)
- **Unique Constraints:** None
- **Validation Rules:** `score` between 0 and 100.

---

### I. prompt_templates
**Purpose:** Reusable AI prompts for generating outreach.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `name`: String
  - `content`: String
  - `variables`: Array of Strings
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `name`, `content`
- **Default Values:** None
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1 }` (Performance)
  - `{ name: "text" }` (Search Index for template lookup)
- **Unique Constraints:** `{ organizationId: 1, name: 1 }`
- **Validation Rules:** None

---

### J. email_templates
**Purpose:** Standard HTML/Text templates for emails.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `name`: String
  - `subject`: String
  - `htmlBody`: String
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `name`, `subject`
- **Default Values:** None
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1 }` (Performance)
- **Unique Constraints:** `{ organizationId: 1, name: 1 }`
- **Validation Rules:** None

---

### K. email_history
**Purpose:** Immutable log of all emails sent out by the system.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `campaignId`: ObjectId
  - `leadId`: ObjectId
  - `messageId`: String (from SMTP)
  - `status`: String
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `campaignId`, `leadId`, `messageId`
- **Default Values:** `status: 'Sent'`
- **Enum Values:** `status`: ['Sent', 'Delivered', 'Bounced', 'Spam']
- **Relationships:**
  - `organizationId` -> `organizations._id`
  - `campaignId` -> `campaigns._id`
  - `leadId` -> `leads._id`
- **Indexes:**
  - `{ organizationId: 1, campaignId: 1 }` (Compound Performance)
  - `{ messageId: 1 }` (Performance for webhook lookups)
  - `{ createdAt: 1 }` (TTL Index: Expire after 365 days)
- **Unique Constraints:** `{ messageId: 1 }`
- **Validation Rules:** None

---

### L. smtp_accounts
**Purpose:** Stores SMTP credentials for sending emails on behalf of the tenant.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `host`: String
  - `port`: Number
  - `username`: String
  - `passwordEncrypted`: String
  - `isVerified`: Boolean
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `host`, `port`, `username`, `passwordEncrypted`
- **Default Values:** `isVerified: false`
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1 }` (Performance)
- **Unique Constraints:** None
- **Validation Rules:** Password must be encrypted via AES before storage.

---

### M. lead_activities
**Purpose:** Timeline log of actions taken by or upon a lead (e.g., opened email, replied, clicked link).

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `leadId`: ObjectId
  - `type`: String
  - `metadata`: Object
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `leadId`, `type`
- **Default Values:** None
- **Enum Values:** `type`: ['EmailOpened', 'EmailClicked', 'Replied', 'StatusChanged']
- **Relationships:**
  - `organizationId` -> `organizations._id`
  - `leadId` -> `leads._id`
- **Indexes:**
  - `{ leadId: 1, createdAt: -1 }` (Compound Performance for timeline rendering)
  - `{ createdAt: 1 }` (TTL Index: Expire after 365 days)
- **Unique Constraints:** None
- **Validation Rules:** None

---

### N. workflows
**Purpose:** Defines automation logic (e.g., "If lead replies, change status to Qualified").

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `name`: String
  - `trigger`: String
  - `actions`: Array of Objects
  - `isActive`: Boolean
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `name`, `trigger`, `actions`
- **Default Values:** `isActive: true`
- **Enum Values:** `trigger`: ['OnReply', 'OnOpen', 'OnScoreThreshold']
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1, isActive: 1 }` (Compound Performance)
- **Unique Constraints:** None
- **Validation Rules:** None

---

### O. workflow_runs
**Purpose:** Logs executions of automation workflows for debugging and auditing.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `workflowId`: ObjectId
  - `leadId`: ObjectId
  - `status`: String
  - `error`: String
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `workflowId`, `leadId`, `status`
- **Default Values:** `status: 'Success'`
- **Enum Values:** `status`: ['Success', 'Failed']
- **Relationships:**
  - `organizationId` -> `organizations._id`
  - `workflowId` -> `workflows._id`
  - `leadId` -> `leads._id`
- **Indexes:**
  - `{ workflowId: 1 }` (Performance)
  - `{ createdAt: 1 }` (TTL Index: Expire after 30 days)
- **Unique Constraints:** None
- **Validation Rules:** None

---

### P. integrations
**Purpose:** Configuration for third-party connections (e.g., Salesforce, HubSpot).

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `provider`: String
  - `accessTokenEncrypted`: String
  - `refreshTokenEncrypted`: String
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `provider`
- **Default Values:** None
- **Enum Values:** `provider`: ['Salesforce', 'HubSpot', 'Slack']
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1, provider: 1 }` (Compound Performance)
- **Unique Constraints:** `{ organizationId: 1, provider: 1 }`
- **Validation Rules:** None

---

### Q. api_keys
**Purpose:** API keys generated by the tenant to access the platform programmatically.

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `name`: String
  - `keyHash`: String
  - `lastUsedAt`: Date
  - `expiresAt`: Date
  - `isActive`: Boolean
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `name`, `keyHash`
- **Default Values:** `isActive: true`
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ keyHash: 1 }` (Performance & Unique for auth lookup)
- **Unique Constraints:** `{ keyHash: 1 }`
- **Validation Rules:** None

---

### R. notifications
**Purpose:** In-app alerts for users (e.g., "Campaign finished", "High-value lead replied").

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `userId`: ObjectId
  - `title`: String
  - `message`: String
  - `isRead`: Boolean
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `userId`, `title`
- **Default Values:** `isRead: false`
- **Enum Values:** None
- **Relationships:**
  - `organizationId` -> `organizations._id`
  - `userId` -> `users._id`
- **Indexes:**
  - `{ userId: 1, isRead: 1 }` (Compound Performance)
  - `{ createdAt: 1 }` (TTL Index: Expire after 60 days)
- **Unique Constraints:** None
- **Validation Rules:** None

---

### S. jobs
**Purpose:** Audit log of background BullMQ jobs specifically related to bulk tasks (e.g., CSV Import).

- **Fields:**
  - `_id`: ObjectId
  - `organizationId`: ObjectId
  - `type`: String
  - `status`: String
  - `progress`: Number
  - `resultMetadata`: Object
  - *Standard Audit & Timestamp Fields*
- **Required Fields:** `organizationId`, `type`, `status`
- **Default Values:** `status: 'Pending'`, `progress: 0`
- **Enum Values:** `type`: ['LeadImport', 'CampaignSync'], `status`: ['Pending', 'Processing', 'Completed', 'Failed']
- **Relationships:**
  - `organizationId` -> `organizations._id`
- **Indexes:**
  - `{ organizationId: 1, status: 1 }` (Performance)
  - `{ createdAt: 1 }` (TTL Index: Expire after 14 days)
- **Unique Constraints:** None
- **Validation Rules:** None
