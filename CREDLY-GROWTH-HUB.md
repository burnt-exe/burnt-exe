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

This MVP stores learner data in the browser using `localStorage`. This is suitable for demos, personal badge tracking, and lightweight coaching workflows.

For production use, connect a backend such as:

- Supabase Auth + Postgres
- Firebase Auth + Firestore
- Microsoft Entra ID + API backend
- Moodle or another LMS for SCORM runtime tracking
- SCORM Cloud for production SCORM dispatch and completion tracking

## SCORM note

The included SCORM player is a static runtime simulation. It exposes a lightweight `window.API` object with common SCORM 1.2 methods such as `LMSInitialize`, `LMSSetValue`, `LMSCommit`, and `LMSFinish`.

For regulated training, formal audit trails, completion rules, sequencing, and score persistence, use a proper LMS or SCORM runtime.

## Suggested next development phases

1. Add multi-user authentication.
2. Replace browser storage with Supabase or Firebase.
3. Add manager approval workflow for badge evidence.
4. Add Credly URL validation and issuer/date checks.
5. Add cohort analytics dashboards.
6. Add SCORM/xAPI integration for formal learning record tracking.
7. Add GitHub Classroom, Microsoft Teams, and LMS integration.

## GitHub Pages

The site is deployed from `main` using `.github/workflows/pages.yml`.

If Pages is not already enabled for this repository, open repository settings and set Pages source to **GitHub Actions**.
