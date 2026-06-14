# Credly Growth Hub

Credly Growth Hub is a static GitHub Pages web app for learner onboarding, skills tracking, free Credly badge discovery, scheduled continuous learning, and SCORM-style module launch/testing.

## What is included

- Learner onboarding profile
- Target career path selection
- Skills matrix with maturity tracking
- Free Credly badge query catalogue generated across 20 vendors and 100 badge-search combinations
- Scheduled learning sessions
- Badge plan tracking
- JSON export/import for learner review and backup
- SCORM 1.2-style JavaScript API shim for static-module testing
- GitHub Pages deployment workflow

## Governance copy used in the app

### Storage model

Current version uses browser localStorage, which is suitable for a static MVP and individual learner tracking. For multi-user operations, connect Microsoft Entra-backed services.

### Evidence workflow

Recommended approval flow: learner completes badge, submits Credly badge URL, manager validates issuer/date/skills, then marks the badge as verified in this app or a future backend.

### GitHub Pages

The included workflow publishes this repository as a static site on every push to `main`.

## Vendor badge discovery coverage

The app generates free-badge search patterns for these vendor ecosystems:

- MongoDB
- Tableau
- The Linux Foundation
- Fortinet
- Kong
- SAP
- SAS
- Acronis
- Splunk
- Google Cloud
- Microsoft
- Oracle
- Red Hat
- GitHub
- GitLab
- HashiCorp
- VMware
- HPE
- Check Point
- F5

The search format is intentionally simple and auditable:

```text
site:credly.com/org/<vendor>/badge "Cost Free" "<skill>" "Level Foundational"
```

## Storage model

This MVP stores learner data in the browser using `localStorage`. This is suitable for demos, individual badge tracking, coaching reviews, and lightweight manager check-ins.

For production multi-user use, connect Microsoft Entra-backed services, for example:

- Microsoft Entra ID for authentication and identity governance
- Microsoft Graph for user/profile integration
- SharePoint Lists, Dataverse, Azure SQL, or Cosmos DB for learner records
- Azure Functions or Static Web Apps APIs for server-side validation
- Power BI or Microsoft Fabric for cohort analytics
- Moodle, SCORM Cloud, or another LMS runtime for formal SCORM completion records

## Evidence workflow

Recommended badge-verification flow:

1. Learner completes vendor learning or assessment.
2. Learner submits a public Credly badge URL.
3. Manager validates issuer, badge name, issue date, expiry date, skills, and evidence relevance.
4. Manager marks the badge as verified in the app or future backend.
5. Skills matrix and career-growth review are updated.

## SCORM note

The included SCORM player is a static runtime simulation. It exposes a lightweight `window.API` object with common SCORM 1.2 methods such as `LMSInitialize`, `LMSSetValue`, `LMSCommit`, and `LMSFinish`.

For regulated training, formal audit trails, completion rules, sequencing, and score persistence, use a proper LMS or SCORM runtime.

## Suggested next development phases

1. Add Microsoft Entra ID authentication.
2. Add Microsoft Graph user/profile sync.
3. Replace browser storage with SharePoint Lists, Dataverse, Azure SQL, or Cosmos DB.
4. Add manager approval workflow for badge evidence.
5. Add Credly URL validation and issuer/date checks.
6. Add cohort analytics dashboards in Power BI or Microsoft Fabric.
7. Add SCORM/xAPI integration for formal learning record tracking.
8. Add GitHub Classroom, Microsoft Teams, and LMS integration.

## GitHub Pages

The site is deployed from `main` using `.github/workflows/pages.yml`.

If Pages is not already enabled for this repository, open repository settings and set Pages source to **GitHub Actions**.
