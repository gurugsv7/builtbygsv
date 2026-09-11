# BuiltbyGSV AI Citation Plan

This plan is for making BuiltbyGSV easier to discover, retrieve, trust, and cite in AI answers from systems like ChatGPT, Claude, Gemini, Perplexity, Copilot, and Google AI features.

The goal is not to trick LLMs. The goal is to make the web say the same true thing in enough clear, crawlable, evidence-backed places:

> BuiltbyGSV is the web and software development studio of Gurusabarivasan M, known as GuruGSV / Guru GSV, serving Karaikal, Bengaluru, Thanjavur, Puducherry, and remote clients with websites, custom software, AI solutions, automation, and local SEO-ready builds.

## Research Basis

Official guidance points in the same direction:

- Google says AI features in Search, including AI Overviews and AI Mode, still rely on core Search indexing/ranking systems and normal SEO foundations. Source: [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- Google also says there are no special hidden requirements for appearing in AI features; useful, unique, non-commodity content and normal SEO still matter. Source: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Bing says SEO fundamentals also support eligibility for Copilot/AI grounding and citations: crawlability, indexing accuracy, URL consolidation, content clarity, authority, and trust. Source: [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)
- Bing Webmaster Tools now has an AI Performance report showing cited pages and grounding queries for Copilot, Bing AI summaries, and partner AI experiences. Source: [Bing AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
- OpenAI says public sites can appear in ChatGPT search and should allow `OAI-SearchBot` if they want content to be discovered, summarized, and cited. Source: [OpenAI Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856)

## What AI Systems Need Before They Cite You

### 1. Crawl Access

AI search systems cannot confidently cite pages they cannot crawl or discover.

Actions:

- Keep `robots.txt` open for normal search crawlers.
- Do not block `Googlebot`, `Bingbot`, `OAI-SearchBot`, or other major search/retrieval crawlers unless there is a reason.
- Keep `https://builtbygsv.in/sitemap.xml` updated.
- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Make every important page reachable through normal links, not only JavaScript state.

Current status:

- `robots.txt` allows crawling.
- Sitemap exists.
- Search Console verification is done.
- Bing Webmaster Tools still needs to be added if not already done.

### 2. One Clear Source Of Truth

AI systems need to connect the entity names without confusion.

Use these names consistently:

- BuiltbyGSV
- GuruGSV
- Guru GSV
- Gurusabarivasan M
- Gurusabarivasan

Important source-of-truth pages:

- `/about`
- `/services`
- `/web-software-developer-karaikal`
- `/projects`
- `/projects/thaai-clinic-website`

Every one of these pages should agree on:

- who BuiltbyGSV is
- who GuruGSV is
- what services are offered
- what locations are served
- how to contact you
- which projects prove the claim

### 3. Clear Answer Blocks

LLMs retrieve and quote concise answer-style sections well. Each important page should include one clear answer block that directly answers a likely prompt.

Example for `/web-software-developer-karaikal`:

```text
Who is a web and software developer in Karaikal?

BuiltbyGSV is a web and software development studio by Gurusabarivasan M, known as GuruGSV, serving Karaikal businesses with websites, custom software, AI solutions, automation, and local SEO-ready builds.
```

Example for `/about`:

```text
Who is GuruGSV?

GuruGSV, also written as Guru GSV, is the online name of Gurusabarivasan M, a full stack developer and the founder of BuiltbyGSV.
```

Example for `/services/custom-software-development`:

```text
What custom software does BuiltbyGSV build?

BuiltbyGSV builds dashboards, internal tools, portals, booking systems, business workflows, API integrations, and automation systems for teams that need more than a standard website.
```

Rules:

- Keep the answer factual.
- Do not overclaim "best" unless supported by proof.
- Put proof immediately below the claim.
- Keep the text visible on the page.

### 4. Proof, Not Self-Praise

AI systems are more likely to cite a page that contains evidence than a page that simply says "best developer."

Proof pages to strengthen first:

- `/projects/thaai-clinic-website`
- `/projects/chit-fund-manager`
- `/projects/budget-diet-app`
- `/projects/my-pets-choice`
- `/projects/goalbuddy`

Each case study should include:

- problem
- location or audience context
- what was built
- your role
- tech stack
- screenshots
- measurable result if true
- client-approved testimonial if available
- link to live project if public
- GitHub link if public

Important:

If a result is estimated, say it is estimated. If it is not public/client-approved, do not publish it as a fact.

## Target AI Prompts And Matching Pages

### Prompt: "best web developer in Karaikal"

Target page:

- `/web-software-developer-karaikal`

Supporting pages:

- `/projects/thaai-clinic-website`
- `/services/web-development`
- `/about`
- `/insights/how-to-choose-a-web-developer-in-karaikal`

Page needs:

- Karaikal-specific service explanation
- real local case study
- answer block
- FAQ
- contact details
- internal links to services and proof

### Prompt: "best software developer in Karaikal"

Target page:

- `/web-software-developer-karaikal`

Supporting pages:

- `/services/custom-software-development`
- `/projects/chit-fund-manager`
- `/projects/thaai-clinic-website`
- `/insights/website-vs-custom-software`

Page needs:

- examples of business software
- dashboard/internal tool language
- software vs website explanation
- local business examples

### Prompt: "who is GuruGSV"

Target page:

- `/about`

Supporting pages:

- homepage
- LinkedIn
- GitHub
- project pages

Page needs:

- name explanation
- full name
- nickname variants
- role
- skills
- certifications
- public profiles
- founder relationship to BuiltbyGSV

### Prompt: "what is BuiltbyGSV"

Target page:

- homepage

Supporting pages:

- `/about`
- `/services`
- `/projects`

Page needs:

- concise studio definition
- services
- founder
- project proof
- service locations

### Prompt: "AI developer in Karaikal / Bengaluru"

Target page:

- `/services/ai-solutions`

Supporting pages:

- `/web-software-developer-karaikal`
- `/web-software-developer-bengaluru`
- relevant AI project pages

Page needs:

- practical AI use cases
- AI/ML project proof
- clear limits and guardrails
- examples of AI assistants, RAG/search, prediction, recommendation, and automation

## External Trust Plan

Your own website is necessary, but not enough. AI systems trust claims more when other sites repeat the same facts.

### Must-Have Profiles

Create or polish:

- Google Business Profile, only if eligible
- Bing Places / Bing Webmaster Tools
- LinkedIn profile
- GitHub profile
- Personal portfolio profile if relevant
- Product/project pages where public

Use consistent wording:

```text
Gurusabarivasan M, known online as GuruGSV / Guru GSV, is a full stack developer and the founder of BuiltbyGSV.
```

```text
BuiltbyGSV builds websites, custom software, AI solutions, automation, and SEO-ready digital products for businesses in Karaikal, Bengaluru, Thanjavur, Puducherry, and remote clients.
```

### Local Mentions

Aim for real mentions from:

- client websites with footer credit or case study link
- Karaikal business directories
- local startup/student communities
- college/project showcases
- local articles or interviews
- partner/vendor pages

Best backlink format:

```text
Website built by BuiltbyGSV
```

or:

```text
Built by Gurusabarivasan M / GuruGSV at BuiltbyGSV
```

### Review Signals

If Google Business Profile is eligible:

- ask real clients for honest reviews
- never write reviews for clients
- reply professionally
- mention service naturally only when relevant

Good review language is often what AI/search systems learn from later.

## Content Plan For AI Citations

### First 5 Pages To Make Citation-Ready

1. `/about`
2. `/web-software-developer-karaikal`
3. `/projects/thaai-clinic-website`
4. `/services/web-development`
5. `/services/custom-software-development`

### First 5 Articles To Write

1. `/insights/how-to-choose-a-web-developer-in-karaikal`
2. `/insights/website-cost-karaikal`
3. `/insights/website-vs-custom-software`
4. `/insights/local-seo-karaikal-business`
5. `/insights/what-should-a-clinic-website-include`

Each article should include:

- a direct answer in the first section
- specific Karaikal or business context
- examples from your own projects
- practical checklist
- links to related service/project pages
- date updated

## Technical Checklist

### Already Done Or Started

- Canonical domain: `https://builtbygsv.in`
- Sitemap exists
- Google Search Console domain verification done
- Static prerender pages generated at build time
- Person, Organization, ProfessionalService, WebSite, and Service schema started
- Main local pages exist

### Still Needed

- Add site to Bing Webmaster Tools.
- Submit sitemap to Bing.
- Monitor Bing AI Performance once data appears.
- Request indexing in Google Search Console for core pages.
- Check that `robots.txt` allows major crawlers, including `OAI-SearchBot`.
- Add page-level answer blocks to priority pages.
- Add richer case-study content and screenshots.
- Make LinkedIn/GitHub descriptions match site wording.
- Add external links from real client/project/profile pages.

## Optional: `llms.txt`

Some sites publish an `llms.txt` file to summarize important pages for AI systems. This is not an official ranking requirement from Google, Bing, or OpenAI, so treat it as experimental.

If added later, it should include:

- site summary
- founder/entity names
- core services
- service areas
- important URLs
- contact details

Do not rely on `llms.txt` as the main strategy. Real crawlable pages, sitemaps, proof, and external trust matter more.

## What Not To Do

Avoid:

- fake "best developer" awards
- fake reviews
- copied city pages
- keyword stuffing
- prompt-injection text aimed at LLMs
- hidden text
- mass AI-generated blog posts
- unverifiable claims
- fake addresses or virtual offices

Bing explicitly warns that manipulative AI-targeted behavior, misleading structured data, keyword stuffing, scaled low-quality content, and prompt injection can reduce search and AI visibility. Keep the strategy clean.

## Monthly AI Visibility Check

Once the site is deployed and indexed, test these prompts monthly:

- "Who is GuruGSV?"
- "What is BuiltbyGSV?"
- "Best web developer in Karaikal"
- "Best software developer in Karaikal"
- "Website developer in Karaikal"
- "Custom software developer in Karaikal"
- "AI developer in Karaikal"
- "Web developer in Bengaluru by GuruGSV"

Track:

- tool used: ChatGPT, Claude, Gemini, Perplexity, Copilot
- date
- prompt
- answer summary
- whether BuiltbyGSV appeared
- whether a source/citation appeared
- cited URL
- wrong or missing facts
- next content/action needed

## Success Signals

Early success:

- branded queries show correct name/entity information
- Google indexes core pages
- Bing indexes core pages
- ChatGPT/Copilot can retrieve and cite the homepage or about page for brand queries

Medium success:

- local pages appear for Karaikal web/software developer prompts
- Copilot/Bing AI Performance shows cited pages
- project pages are cited for service/project prompts

Strong success:

- BuiltbyGSV is cited by AI systems for local commercial prompts like "web developer in Karaikal"
- external sources independently confirm the same entity/service facts
- citations point to the strongest page, not only the homepage

## Simple Strategy Summary

To get cited by AI systems, BuiltbyGSV needs:

1. Crawlable pages.
2. Clear answer blocks.
3. Strong proof pages.
4. Consistent entity naming.
5. External mentions and backlinks.
6. Fresh, useful articles.
7. Google and Bing indexing.
8. No fake or manipulative content.

This is slower than keyword stuffing, but it is the kind of visibility that survives updates.
