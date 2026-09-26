# Client project brief

`/start-project` replaces the enquiry modal. App and content-page calls to action use this route; old `?startProject=1` links redirect to it. A `service` query parameter preselects the relevant capability. Canonical metadata omits query parameters.

## Research and question design

Reviewed on 26 September 2026:

- [GOV.UK: Structuring forms](https://www.gov.uk/service-manual/design/form-structure) — ask questions with a clear purpose, group related decisions and branch by relevance.
- [GOV.UK: Question pages](https://design-system.service.gov.uk/patterns/question-pages/) — label optional information and allow uncertainty where valid.
- [thoughtbot: Hire us](https://thoughtbot.com/hire-us) — begin with the desired project outcome.
- [Netguru: Estimate your project](https://www.netguru.com/estimate-project) — project enquiries and existing RFPs are both useful starting points.
- [Ramotion: Contact](https://www.ramotion.com/contact/) and [Clay: Contact](https://clay.global/contact) — clear company enquiry routes and a direct email alternative.

The agent-reach Exa backend was unavailable; research used the web tool as fallback. The ustwo contact page was also unavailable and was not used as evidence.

The resulting brief has five question groups and an editable review:

1. Business and contact: identify the organisation, context and person to follow up with.
2. Goals and audience: establish the problem, users, maturity and success criteria.
3. Scope: separate launch essentials from later work; identify platform, service-specific needs, integration, scale and data constraints.
4. Design and delivery: establish assets, content ownership, hosting, references, documents and support expectations.
5. Budget and collaboration: establish currency, investment, dates, dependencies, approval and communication.

This is discovery input, not an agreed specification or a promise that no clarification will be needed. Optional questions and “not sure yet” answers avoid forcing clients to invent decisions.

## Delivery and storage

There is no form submission backend. The page exports the entire brief as UTF-8 text or copies it to the clipboard. The client then attaches or pastes it into an email addressed to `admin@builtbygsv.in`. The short email link avoids placing a potentially large brief in a URL, where email clients may truncate it. The UI never claims an enquiry has been received.

Answers stay in React state unless the client explicitly saves a draft. Saved drafts use the `builtbygsv-project-brief-v1` localStorage key and can be restored or deleted. Downloads are local files; saving changes requires clicking Save again. No credentials or private customer records should be entered.

For direct online submission in the future, provision a delivery endpoint and mail service, validate input on the server, add abuse protection, define retention, and show success only after the endpoint confirms receipt. Update the website information copy when that behavior changes.

## Verification

- `npm run lint`, `npm test`, `npm run build`.
- `python tests/project_brief_browser.py`: routing, required fields/email validation, draft save/reload/restore/delete, service branching, review edits and complete long-answer export at 1440, 1024, 390 and 320px.
- `python tests/studio_browser.py --quick`: existing route and navigation checks, including the legacy enquiry link.

Browser checks inspect email links without sending messages.
