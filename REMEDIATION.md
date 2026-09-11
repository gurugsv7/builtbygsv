# Repository remediation plan

Updated: 2026-08-24

## P0 — correctness and trust

- [x] Make project lists and filters data-driven; remove cards that opened unrelated projects.
- [x] Render each case study from its own project data and media.
- [x] Stop presenting unavailable live/source links as working links.
- [x] Replace the in-memory inquiry success claim with an explicit pre-filled email handoff.
- [x] Synchronize live project routes, sitemap entries, prerender output, and route metadata.
- [x] Repair project/modal state when navigating or using browser history.

## P1 — security and release safety

- [x] Remove unused direct dependencies and install React type declarations.
- [x] Enable strict TypeScript and dead-code checks.
- [x] Resolve the transitive npm advisory and verify a zero-vulnerability audit.
- [x] Add CSP, anti-framing, HSTS, opener, referrer, content-type, and permissions headers.
- [x] Add route, sitemap, schema, prerender, and deployment-config tests.
- [x] Add CI for clean install, lint, tests, build/prerender, and npm audit.

### Launch-checklist scope

The attached 20-point checklist is mainly written for server applications. This repository currently ships a static React portfolio with no authentication, payment processing, file uploads, database, cookies, or runtime AI endpoint.

- Applicable now: HSTS and baseline browser security headers are configured in `vercel.json`; React escapes rendered path text; CSP limits network connections to the same origin; there are no default admin routes; and the static deployment does not expose a browsable source directory.
- Not triggered by the current architecture: CSRF tokens, session invalidation, password resets, user-enumeration prevention, account lockout, secure-cookie flags, upload allowlists, payment webhook verification, request-body limits, password-reset rate limits, database permissions, prompt-injection defenses, and AI-usage caps.
- Required if a backend is added: implement the relevant controls at the server or edge boundary, add security-event logging, and test the deployed behavior. Client-side checks alone would not satisfy them.

## P2 — maintainability and accessibility

- [x] Remove dead routes, components, props, types, and duplicate binary assets.
- [x] Make project/service cards and expandable features keyboard accessible.
- [x] Add dialog semantics, input names, autocomplete hints, and Escape dismissal.
- [ ] Consolidate the four service-detail screens and duplicated mobile/desktop service-overview markup. This should follow screenshot-based regression coverage because those files intentionally use distinct visual compositions.
- [ ] Consolidate route/SEO/prerender content into one serializable content manifest. Tests now prevent drift, but the authoring data is still duplicated between browser TypeScript and the Node prerender script.

## P3 — product and coverage follow-up

- [x] Add a browser smoke suite for core navigation, Contact, the project-brief article, responsive 404 behavior, metadata, and console errors.
- [ ] Expand browser coverage to filters, dialogs, the mail handoff, and every responsive layout.
- [ ] Replace the email handoff with a server-side lead endpoint only when spam controls, consent, retention, and delivery ownership are defined.
- [ ] Verify performance and accessibility against deployed production headers with Lighthouse and an automated accessibility scanner.
