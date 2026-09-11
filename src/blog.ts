export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  published: string;
  updated: string;
  readTime: string;
  takeaway: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'website-cost-karaikal',
    path: '/insights/website-cost-karaikal',
    title: 'What does a business website cost in Karaikal?',
    seoTitle: 'Website Cost in Karaikal: 2026 Planning Guide | BuiltbyGSV',
    description:
      'A practical guide to website costs in Karaikal: what changes the price, what local businesses actually need and how to compare development quotes.',
    excerpt:
      'A straightforward way to budget for a business website without paying for features you do not need—or missing the ones that matter.',
    category: 'Planning guide',
    published: '2026-07-31',
    updated: '2026-07-31',
    readTime: '7 min read',
    takeaway:
      'The right budget follows the job the website must do. Define the outcome, content, integrations and ownership before comparing prices.',
    sections: [
      {
        heading: 'There is no useful one-price answer',
        paragraphs: [
          'A five-page information site, an appointment website and a custom customer portal may all be called a “business website,” but they are completely different projects. A responsible estimate starts with the work the site must perform.',
          'For a Karaikal clinic, success might mean making services easy to understand and turning mobile searches into calls or appointment requests. For a retailer, it might mean a searchable catalogue, WhatsApp enquiries and simple content updates. The scope—not the number of buzzwords in a proposal—sets the cost.',
        ],
      },
      {
        heading: 'The five decisions that change the budget',
        paragraphs: [
          'Ask every developer to separate these decisions in the estimate. It makes competing quotes much easier to compare.',
        ],
        bullets: [
          'Content: who writes, edits and translates the service information?',
          'Design: is the experience custom-designed or adapted from a ready-made theme?',
          'Functionality: are forms, booking, payments, dashboards or third-party systems involved?',
          'Search foundations: are page structure, metadata, structured data and local-service content included?',
          'Ownership and support: who controls the domain, hosting, source code and future updates?',
        ],
      },
      {
        heading: 'Three practical website scopes',
        paragraphs: [
          'A starter presence is appropriate when customers mainly need to verify the business, understand the offer and contact you. It should still be fast, mobile-friendly, secure and easy to find by brand name.',
          'A growth website adds carefully planned service pages, location context, case studies, analytics and conversion tracking. This is usually the right level for a clinic, professional practice, school, restaurant or established local service competing in search.',
          'A custom product includes business logic: booking workflows, staff dashboards, customer accounts, inventory, payments or automated communication. It should be estimated as software, not priced like a brochure website.',
        ],
      },
      {
        heading: 'How to compare quotes without choosing blindly',
        paragraphs: [
          'Request an itemised scope and check what happens after launch. A low initial quote can become expensive if content, mobile optimisation, analytics, basic SEO or source-code ownership are excluded.',
          'Ask to see a relevant live project, not only screenshots. Test it on your phone, open several pages and check whether the contact path is obvious. Good development work should be understandable before anyone discusses frameworks.',
        ],
        bullets: [
          'Are all pages and integrations listed?',
          'Are copywriting, photography and translations included or excluded?',
          'Will you own the domain, accounts and source code?',
          'What maintenance is actually required?',
          'How will success be measured after launch?',
        ],
      },
      {
        heading: 'A better first step than asking for a price',
        paragraphs: [
          'Write down the primary customer, the action you want that person to take and the information they need before taking it. Add two or three websites you find clear—not necessarily attractive—and explain why.',
          'That one-page brief lets a developer recommend a smaller, more accurate first version. BuiltbyGSV uses this outcome-first approach so the estimate reflects a real business need instead of a generic package.',
        ],
      },
    ],
  },
  {
    slug: 'local-seo-karaikal-business',
    path: '/insights/local-seo-karaikal-business',
    title: 'Local SEO for Karaikal businesses: a practical starting plan',
    seoTitle: 'Local SEO Guide for Karaikal Businesses | BuiltbyGSV',
    description:
      'A practical local SEO plan for Karaikal businesses covering Google Business Profile, service pages, reviews, consistency and useful local content.',
    excerpt:
      'The foundations a Karaikal clinic, shop or service business should fix before spending heavily on advertisements or publishing dozens of posts.',
    category: 'Local visibility',
    published: '2026-07-31',
    updated: '2026-07-31',
    readTime: '8 min read',
    takeaway:
      'Local visibility comes from consistent business information, a useful website, genuine customer evidence and pages that clearly match what people need.',
    sections: [
      {
        heading: 'Start with trust, not keyword repetition',
        paragraphs: [
          'Someone searching for a clinic, school, service provider or shop in Karaikal usually wants a quick answer: is this business relevant, legitimate, nearby and easy to contact? Your website and business profiles should answer those questions consistently.',
          'Repeating “best business in Karaikal” does not prove quality. Clear services, accurate contact information, real photographs, useful answers and verifiable customer feedback are much stronger signals for people—and a healthier long-term search strategy.',
        ],
      },
      {
        heading: 'Fix the local foundation first',
        paragraphs: [
          'Use one accurate version of your business name, phone number, address and operating hours everywhere. If customers visit the premises, make directions and a map easy to find. If you are a service-area business, represent that honestly instead of inventing an office.',
        ],
        bullets: [
          'Claim and fully complete the correct Google Business Profile.',
          'Choose the most accurate primary business category.',
          'Add original exterior, interior, team and work photographs.',
          'Keep hours, phone number and website URL current.',
          'Link to a page that directly explains the service—not a vague splash screen.',
        ],
      },
      {
        heading: 'Build pages around customer decisions',
        paragraphs: [
          'A useful service page explains who the service is for, what is included, how the process works, common concerns and the next step. Location context should appear naturally where it helps the customer.',
          'For example, a clinic page can explain appointment preparation, available timings and accessibility. A restaurant can publish an accurate menu, reservation information and group-order details. A contractor can show service boundaries, project examples and what affects an estimate.',
        ],
      },
      {
        heading: 'Create a review habit',
        paragraphs: [
          'Ask real customers for honest reviews shortly after a successful interaction. Make the request simple and never write the review for them. Respond professionally to both positive and critical feedback.',
          'Reviews are also research. Repeated phrases reveal what customers value and what questions the website should answer. Do not copy review text into structured data or mark up self-serving ratings as if they were independent awards.',
        ],
      },
      {
        heading: 'Publish local content only when it is genuinely useful',
        paragraphs: [
          'A smaller library of first-hand guides is more defensible than dozens of generic posts. Share questions your customers repeatedly ask, lessons from completed work, checklists, transparent policies and local considerations that change the answer.',
        ],
        bullets: [
          'A clinic’s preparation guide for a specific appointment',
          'A school’s admissions timeline and document checklist',
          'A retailer’s local delivery boundaries and ordering guide',
          'A service business’s pricing factors and project preparation checklist',
          'A case study showing the problem, decisions, result and limitations',
        ],
      },
      {
        heading: 'Measure actions, not only rankings',
        paragraphs: [
          'Track qualified calls, form submissions, direction requests and bookings. Search impressions are helpful, but traffic without useful action is not the goal.',
          'Review results monthly, improve pages that already receive relevant impressions and keep important facts accurate. Local SEO is usually a compounding maintenance practice, not a one-time switch.',
        ],
      },
    ],
  },
  {
    slug: 'karaikal-business-website-checklist',
    path: '/insights/karaikal-business-website-checklist',
    title: 'The Karaikal small-business website checklist',
    seoTitle: 'Karaikal Business Website Checklist | BuiltbyGSV',
    description:
      'A launch checklist for Karaikal business websites covering mobile UX, speed, local information, ownership, security, analytics and search readiness.',
    excerpt:
      'A practical pre-launch checklist for owners who want a site that is fast, credible, maintainable and ready to generate enquiries.',
    category: 'Launch checklist',
    published: '2026-07-31',
    updated: '2026-07-31',
    readTime: '6 min read',
    takeaway:
      'A successful launch is not just a good-looking homepage. Test the complete customer journey, ownership, measurement and maintenance plan.',
    sections: [
      {
        heading: 'Test the customer’s fastest path',
        paragraphs: [
          'Open the website on an ordinary phone using mobile data. Can a new visitor understand the business, confirm the location and take the primary action without guessing? This simple test catches more practical problems than reviewing isolated design screenshots.',
        ],
        bullets: [
          'The main service and location are understandable within seconds.',
          'Phone, WhatsApp, booking or enquiry actions are easy to find.',
          'Tap targets are comfortable and text is readable without zooming.',
          'Forms ask only for information needed at that stage.',
          'Success and error messages explain what happens next.',
        ],
      },
      {
        heading: 'Check credibility and local information',
        paragraphs: [
          'Use the real business name and accurate information. Include original work, team or premises photography whenever possible. Avoid stock claims, invented awards and statistics that cannot be explained.',
        ],
        bullets: [
          'Business name, phone, hours and address or service area are consistent.',
          'The About section identifies who is responsible for the business.',
          'Testimonials are genuine and approved for publication.',
          'Policies, pricing factors and response expectations are clear.',
          'Directions and landmarks are included only when they help visitors.',
        ],
      },
      {
        heading: 'Check speed and resilience',
        paragraphs: [
          'Large uncompressed images, unnecessary scripts and heavy visual effects are common causes of slow local-business sites. Optimise for the devices and connections customers actually use.',
        ],
        bullets: [
          'Images are correctly sized and use modern formats where practical.',
          'Below-the-fold media is lazy-loaded.',
          'The primary content does not depend on a long animation.',
          'The site remains useful when a third-party widget fails.',
          'Pages use HTTPS and dependencies are kept current.',
        ],
      },
      {
        heading: 'Check search and sharing',
        paragraphs: [
          'Every important page needs a descriptive title, a useful main heading and a canonical URL. Search engines should be able to discover the pages through internal links and the sitemap.',
        ],
        bullets: [
          'Titles and descriptions describe the specific page.',
          'Only real, visible information is included in structured data.',
          'The XML sitemap contains canonical public pages.',
          'Social sharing has a clear title, description and image.',
          'The site is connected to Search Console after launch.',
        ],
      },
      {
        heading: 'Confirm ownership before paying the final invoice',
        paragraphs: [
          'The business should control the domain registration, hosting project, analytics property and primary accounts. Document renewal dates and decide who is responsible for updates, backups and enquiries.',
          'A website is an operating asset. Clear ownership and a modest maintenance routine are more valuable than a launch-day feature that nobody can update later.',
        ],
      },
    ],
  },
  {
    slug: 'website-project-brief-template',
    path: '/insights/website-project-brief-template',
    title: 'A website project brief a developer can use',
    seoTitle: 'Website Project Brief Template | BuiltbyGSV',
    description:
      'Use this website project brief template to explain your goals, audience, content, features, ownership and launch needs before requesting proposals.',
    excerpt:
      'A short, specific brief helps a developer estimate the right work and gives you a better way to compare proposals.',
    category: 'Project template',
    published: '2026-08-24',
    updated: '2026-08-24',
    readTime: '7 min read',
    takeaway:
      'Describe the business problem, the people using the site and the action that must work at launch. Let the developer recommend the implementation.',
    sections: [
      {
        heading: 'Start with the decision behind the project',
        paragraphs: [
          'Write down why the website needs work now. A useful reason might be that customers cannot understand the services, staff copy enquiries between tools or the current site is difficult to update. "We need a modern website" gives a developer little to estimate because modern can describe almost any layout or technology.',
          'Name the result the business needs. You may want more qualified appointment requests, fewer repetitive calls or a credible place to send prospects after a meeting. One primary result helps the team decide what belongs in the first release.',
        ],
      },
      {
        heading: 'Describe the people who will use it',
        paragraphs: [
          'A clinic patient checking timings on a phone has different needs from an operations manager reviewing a dashboard on a laptop. Describe the main visitor in a few sentences: what they already know, what they need to confirm and what may stop them from taking action.',
          'Include a second audience only when that group needs a different route through the product. Staff, partners and returning customers often need separate information or permissions. Naming those differences early prevents a simple marketing site from turning into an unplanned portal halfway through development.',
        ],
      },
      {
        heading: 'Document what exists today',
        paragraphs: [
          'List the current domain, website, booking tool, spreadsheets, payment provider and business profiles connected to the project. Add who controls each account. A developer can then see which systems need to stay, which data must move and where access may delay the launch.',
          'Screenshots and links are useful. Explain what works as well as what causes trouble. Rebuilding a familiar workflow without understanding why staff rely on it can replace one problem with another.',
        ],
        bullets: [
          'Current website and domain registrar',
          'Hosting, email and analytics accounts',
          'Booking, payment, CRM or messaging tools',
          'Content, photographs and brand files already available',
          'The person responsible for approving copy and design',
        ],
      },
      {
        heading: 'Define the launch action',
        paragraphs: [
          'Choose the action a visitor must be able to complete on launch day. Examples include calling the business, requesting an appointment, submitting a project brief or buying a defined product. Write the steps from the visitor arriving to the business receiving the request.',
          'Add the information the visitor needs before acting. Service boundaries, price factors, availability, location and evidence of previous work often matter more than decorative sections. This becomes the first content outline and the basis for testing the site.',
        ],
      },
      {
        heading: 'Separate requirements from ideas',
        paragraphs: [
          'Mark each requested feature as required for launch, useful later or still uncertain. This gives the developer room to quote a focused first version and price optional work separately. It also exposes features that depend on an account, API or content source the business does not yet control.',
          'Avoid prescribing technology unless your team must maintain a specific stack. State the constraint instead. "Our staff need to edit service pages without code" is more useful than choosing a content management system before the workflow is understood.',
        ],
      },
      {
        heading: 'Use this copy-paste brief',
        paragraphs: [
          'Paste the headings below into an email or document. Two clear paragraphs under each heading are enough for an initial conversation. Attach the source files and links mentioned in the current-state section rather than embedding private credentials in the brief.',
        ],
        bullets: [
          'Business and project: what the business does and why this project is happening now',
          'Primary audience: who they are, what they need and what may block them',
          'Launch outcome: the main action that must work and how the business receives it',
          'Required pages and functions: launch needs, later ideas and uncertain items kept separate',
          'Current systems: website, domain, tools, data and account owners',
          'Content responsibility: who supplies, writes and approves text, images and legal information',
          'Timing and budget: any fixed date, approval schedule and a realistic spending range',
          'Ownership after launch: who updates content, handles enquiries and approves maintenance work',
        ],
      },
      {
        heading: 'Compare proposals against the brief',
        paragraphs: [
          'A proposal should explain the pages and functions included, what you must supply, what remains optional and who owns the finished accounts and code. Check whether testing, redirects, analytics, deployment and a post-launch period are included. Ask for assumptions to be written down when a price depends on content volume or a third-party integration.',
          'The cheapest proposal may describe less work, while the most expensive may include features that do not support the launch outcome. Compare each response against the same brief and ask how the proposed scope helps the primary visitor complete the main action.',
        ],
      },
    ],
  },
  {
    slug: 'ai-automation-small-business-tamil-nadu',
    path: '/insights/ai-automation-small-business-tamil-nadu',
    title: 'Where AI automation actually pays for a small business',
    seoTitle: 'AI Automation for Small Businesses in Tamil Nadu | BuiltbyGSV',
    description:
      'Which workflows are worth automating in a small Indian business, how to measure the return honestly, and the four situations where AI is the wrong tool.',
    excerpt:
      'A practical filter for deciding what to automate first, written for businesses running on WhatsApp, spreadsheets and a billing package rather than on a CRM.',
    category: 'AI & automation',
    published: '2026-09-10',
    updated: '2026-09-10',
    readTime: '9 min read',
    takeaway:
      'Automate the workflow that costs the most staff hours and has the clearest rules. Measure the hours before you build, and refuse to expand until the pilot has actually saved them.',
    sections: [
      {
        heading: 'Start from hours, not from technology',
        paragraphs: [
          'The useful question is not which AI tool to buy. It is which repetitive job currently consumes the most staff time. In most small businesses in Karaikal, Thanjavur and the surrounding region the answer is one of four: entering purchase and delivery documents, answering the same customer questions on WhatsApp, chasing appointments or payments, and compiling the same daily figures by hand.',
          'Write down how many hours a week each of those costs before anyone demonstrates a tool. That number is the only thing that will tell you afterwards whether the automation worked.',
        ],
      },
      {
        heading: 'The four workflows that reliably pay back',
        paragraphs: [
          'These recur across almost every small business that has tried automation and kept it.',
        ],
        bullets: [
          'Enquiry capture and routing: everything from forms, WhatsApp and missed calls into one queue with an owner and a deadline. The gain is fewer lost enquiries, not fewer staff.',
          'Document extraction: invoices, delivery notes and purchase orders read into structured rows with a review queue. This is usually the single largest time drain in a trading office.',
          'Reminders and follow-up: automatic messages before an appointment and after it. For clinics and service businesses this is consistently the fastest measurable return of anything on this list.',
          'Recurring reports: the daily or weekly numbers someone currently assembles by hand, compiled automatically from the systems that already hold them.',
        ],
      },
      {
        heading: 'When AI is the wrong tool',
        paragraphs: [
          'This matters more than the list above, because these are the projects that waste money and then poison the idea of automation inside a company.',
        ],
        bullets: [
          'The process is not written down anywhere. You cannot automate a rule nobody has stated. Document it first; sometimes writing it down solves the problem outright.',
          'The volume is low. Automating something that happens four times a month rarely repays the build and maintenance cost, however irritating it is.',
          'A deterministic rule would do it. If the logic is a lookup or an if-then, use a lookup or an if-then. It is cheaper, faster and it cannot hallucinate.',
          'Being wrong is expensive and unverifiable. Where an error costs money and nobody would notice it, either add a review step or do not automate it.',
        ],
      },
      {
        heading: 'Run it as a pilot with a number attached',
        paragraphs: [
          'Pick one workflow. Give it one to two weeks. Measure the hours it consumed before and after. If the saving is not visible in that measurement, stop and try a different workflow rather than adding features to this one.',
          'This is also the right way to control cost. A pilot with a defined scope and a token budget has a ceiling. An open-ended AI programme does not, and running costs are where these projects quietly become expensive.',
        ],
      },
      {
        heading: 'Questions to ask anyone selling you automation',
        paragraphs: [
          'The answers separate a system that will still be running in a year from a demonstration.',
        ],
        bullets: [
          'What happens when the model is wrong, and who sees it before it reaches our records?',
          'What is the expected monthly running cost, and what caps it?',
          'Has this been tested on our actual documents and Tamil messages, or on clean English samples?',
          'If we stop working with you, does this keep running, and who can maintain it?',
          'What measurement will tell us in three months whether this was worth doing?',
        ],
      },
    ],
  },
  {
    slug: 'why-one-page-websites-stop-ranking',
    path: '/insights/why-one-page-websites-stop-ranking',
    title: 'Why a one-page website stops ranking as you grow',
    seoTitle: 'Why One-Page Websites Stop Ranking on Google | BuiltbyGSV',
    description:
      'A single page cannot rank for ten different services in ten different towns. How search intent, cannibalisation and page architecture actually work, with the fix.',
    excerpt:
      'The most common structural reason a local business site plateaus, explained with the specific fix rather than a recommendation to publish more blogs.',
    category: 'Search visibility',
    published: '2026-09-10',
    updated: '2026-09-10',
    readTime: '8 min read',
    takeaway:
      'Google ranks pages, not businesses. One page can rank strongly for one intent. If you offer six services across three towns, you need pages that each own one query and do not compete with each other.',
    sections: [
      {
        heading: 'Google ranks pages, not companies',
        paragraphs: [
          'This is the whole idea, and almost every structural SEO mistake follows from missing it. When someone searches for a specific service in a specific town, Google looks for the page that best answers that exact search. It does not assess your company and then pick a page to represent it.',
          'A single homepage listing ten services is, from that perspective, a page about nothing in particular. It competes against pages built entirely around one of those ten services, and it loses to them on the specific query even when the business behind it is better.',
        ],
      },
      {
        heading: 'What this looks like in practice',
        paragraphs: [
          'A single-page site typically ranks well for the business name and poorly for everything else. Search Console shows impressions for the brand and a long tail of positions between twenty and eighty for the service queries that would actually bring customers.',
          'The owner concludes that SEO does not work, or buys a monthly retainer that produces reports rather than pages. Neither addresses the cause, which is that there is no page for the search to match.',
        ],
      },
      {
        heading: 'The fix is architecture, not volume',
        paragraphs: [
          'Map the searches you want to a structure where each page owns exactly one intent. A hub page for the broad city query, and spoke pages beneath it for each distinct service. The hub links to every spoke; the spokes link back and to each other where genuinely relevant.',
        ],
        bullets: [
          'One page per intent. If two pages could answer the same query, you have created competition between them.',
          'Each page needs a direct answer to its query in the first hundred words, before any company description.',
          'Each page needs content that could only have been written for that service and that place. Swapping a town name in identical text is a doorway page, and Google treats it as one.',
          'Every page must be reachable from the navigation or a hub. A page nothing links to is a page Google will not value.',
        ],
      },
      {
        heading: 'The mistake to avoid while fixing it',
        paragraphs: [
          'Cannibalisation. Creating both a page for a broad service query and a near-identical page for a slight variation of it means the two split their signals and neither ranks well. Before adding a page, state its target query in one sentence and check that no existing page already targets it.',
          'The test for whether a new page deserves to exist is simple: could you write four paragraphs about it that would be wrong on any other page of your site? If not, it is a section of an existing page rather than a new one.',
        ],
      },
      {
        heading: 'How long the fix takes',
        paragraphs: [
          'New pages typically start showing impressions in Search Console within two to six weeks. Position movement on a competitive city query usually takes three to six months, and longer on a domain with no external links pointing at it.',
          'Watch impressions before positions. Impressions rising on a query you previously had none for is the earliest reliable signal that the architecture change is working.',
        ],
      },
    ],
  },
  {
    slug: 'thanjavur-business-digital-checklist',
    path: '/insights/thanjavur-business-digital-checklist',
    title: 'A digital checklist for established Thanjavur businesses',
    seoTitle: 'Digital Checklist for Thanjavur & Tanjore Businesses | BuiltbyGSV',
    description:
      'What an established Thanjavur manufacturer, trader, school or clinic should fix first online, ordered by return rather than by how modern it sounds.',
    excerpt:
      'Written for businesses that already work well offline and want the online side to stop being a liability, in the order that actually pays back.',
    category: 'Planning guide',
    published: '2026-09-10',
    updated: '2026-09-10',
    readTime: '8 min read',
    takeaway:
      'Fix findability and response speed before appearance. A plain site that loads fast, states the facts and answers enquiries within an hour beats a beautiful one that nobody finds and nobody replies from.',
    sections: [
      {
        heading: 'The order that matters',
        paragraphs: [
          'Established Thanjavur businesses usually do not have a demand problem. They have a findability problem for new customers and a response-time problem for the enquiries they do receive. Redesigning the website addresses neither, which is why redesigns so often change nothing.',
          'Work through this in order. Each step is cheap relative to the one after it, and each is worth more.',
        ],
        bullets: [
          'Make the basic facts correct and findable: name, address, phone, hours, what you actually sell, on a page that loads in under three seconds on a phone.',
          'Claim and complete your Google Business Profile if you have a physical address. For a business with premises in Thanjavur this is the highest-return item on the entire list, and it is free.',
          'Make enquiries reach a person with a deadline. Most lost business happens between an enquiry arriving and someone noticing it.',
          'Build a page for each distinct thing you sell, rather than one page listing everything.',
          'Then, and only then, consider how it looks.',
        ],
      },
      {
        heading: 'What Thanjavur businesses get wrong specifically',
        paragraphs: [
          'Three patterns recur across manufacturers, traders and institutions in the region.',
        ],
        bullets: [
          'A site built years ago that is not mobile-usable. Most of your traffic is on a phone; if the site requires pinching and zooming, the visit ends there.',
          'A contact page with a form nobody monitors. If a form submits to an address that is not checked daily, remove the form and put the phone number and WhatsApp link in its place.',
          'No page for the specific products or services people search for. Thanjavur firms often sell items with genuine national demand and have no page a national search could ever match.',
        ],
      },
      {
        heading: 'If you sell beyond the district',
        paragraphs: [
          'Thanjavur produces goods with demand well outside Tamil Nadu, and a large share of that currently flows through marketplaces that take a commission and keep the customer relationship. A direct online store does not have to replace that channel. It has to capture the repeat buyers who already know your name.',
          'The requirements are unglamorous: product pages with real photography, weight-based shipping, a payment path including UPI, and honest delivery timelines. Craft and made-to-order items also need lead times and a quotation path, which standard carts do not provide and which is the usual reason these stores underperform.',
        ],
      },
      {
        heading: 'Where software beats a website',
        paragraphs: [
          'For many established Thanjavur businesses the larger return is not on the website at all. It is in the back office: purchase and dispatch document entry, multi-branch stock, admission and fee tracking, or reconciliation that currently runs on parallel spreadsheets.',
          'Those are software projects, not website projects, and should be scoped and priced as software. The test for whether it is worth doing is the number of staff hours the current process consumes each week. Measure that before commissioning anything.',
        ],
      },
      {
        heading: 'A realistic first year',
        paragraphs: [
          'Fix the facts and the Google Business Profile in month one. Build the service or product pages over months two and three. Watch Search Console impressions from month three, and expect meaningful position movement between months four and six. Take on the back-office software once the customer-facing side is no longer leaking enquiries.',
        ],
      },
    ],
  },
  {
    slug: 'mvp-scope-mistakes-founders-make',
    path: '/insights/mvp-scope-mistakes-founders-make',
    title: 'The scope mistakes that sink a first release',
    seoTitle: 'MVP Scope Mistakes Founders Make | BuiltbyGSV',
    description:
      'Six ways founders scope an MVP into failure, and the questions that catch each one before development starts rather than six weeks in.',
    excerpt:
      'Written from the scoping conversation rather than from the pitch deck: what to cut, what never to cut, and how to tell the difference.',
    category: 'Product',
    published: '2026-09-10',
    updated: '2026-09-10',
    readTime: '8 min read',
    takeaway:
      'The failure mode is not building too little. It is building six half-features instead of one that works. Define the single user journey that must succeed, and treat everything else as explicitly out of scope in writing.',
    sections: [
      {
        heading: 'One journey, finished',
        paragraphs: [
          'An MVP that does one thing completely can be given to a real user, charged for, and learned from. An MVP that does six things partially cannot be given to anyone, because every path ends in something unfinished.',
          'Write down the single journey that must work end to end, from arriving to receiving value. That sentence is the scope. Everything else goes on a separate list that is explicitly labelled as not being built.',
        ],
      },
      {
        heading: 'Six mistakes, and how to catch each one',
        paragraphs: [
          'Each of these is cheap to avoid in the scoping conversation and expensive to unwind six weeks into a build. The catch question is the one to ask out loud before agreeing to the scope.',
        ],
        bullets: [
          'Building an admin panel before having a user. Manage the data by hand until the manual work genuinely hurts. Catch it by asking how many records exist today.',
          'Deferring analytics to phase two. Without instrumentation the launch produces opinions, not evidence. Catch it by asking which specific event would prove the idea works.',
          'Treating auth and payments as later work. These touch everything, and retrofitting them is disproportionately expensive. Catch it by asking whether a real customer could pay you on launch day.',
          'Designing for scale nobody has. Architecture for a hundred thousand users when you have none costs weeks and buys nothing. Catch it by asking what happens at a hundred users, not a million.',
          'Adding AI because the deck mentions it. If the feature would not be missed, it is scope. Catch it by asking what breaks for the user if it is removed.',
          'Writing disposable code. A hired engineer assesses the codebase in week one, and a rewrite lands exactly when you can least afford it. Catch it by asking whether the code would survive a technical review from an investor.',
        ],
      },
      {
        heading: 'What should never be cut',
        paragraphs: [
          'Three things stay in scope regardless of how tight the timeline gets, because removing them makes the launch unable to teach you anything.',
        ],
        bullets: [
          'The ability to take a real user through the core journey without anyone intervening manually.',
          'Event instrumentation on the actions that indicate the idea is working.',
          'A payment path, if the business model requires one. Willingness to pay is the strongest signal an MVP can produce, and testing without it tests something else.',
        ],
      },
      {
        heading: 'The conversation that decides the outcome',
        paragraphs: [
          'The scoping conversation, not the build, determines whether an MVP ships on time. It should end with a written release boundary: what is in, what is explicitly out, and what evidence at launch would justify building the next thing.',
          'A developer who agrees to everything in that conversation is not being helpful. Pushing back on scope is the most valuable thing they do, and it happens before any code is written or not at all.',
        ],
      },
      {
        heading: 'A realistic shape',
        paragraphs: [
          'Six to ten weeks for a first release covering authentication, payments, one core workflow and analytics. Longer than that usually means the scope is carrying features that should have been deferred, and it is worth revisiting the release boundary rather than extending the timeline.',
        ],
      },
    ],
  },
  {
    slug: 'google-business-profile-setup-guide',
    path: '/insights/google-business-profile-setup-guide',
    title: 'Setting up Google Business Profile properly',
    seoTitle: 'Google Business Profile Setup Guide for Indian Businesses | BuiltbyGSV',
    description:
      'A step-by-step guide to claiming and completing a Google Business Profile, choosing the right primary category, and what to do if you have no physical address.',
    excerpt:
      'The highest-return free thing a local business can do, done correctly, including the category decision most businesses get wrong.',
    category: 'Search visibility',
    published: '2026-09-10',
    updated: '2026-09-10',
    readTime: '7 min read',
    takeaway:
      'Google Business Profile is roughly a third of local ranking and costs nothing. The primary category is the most consequential field on it, and it is the one most businesses set carelessly.',
    sections: [
      {
        heading: 'Why this comes before website work',
        paragraphs: [
          'For a business with premises customers can visit, Google Business Profile is the single largest factor in local pack rankings, ahead of anything on your website. It is free, it takes an afternoon, and a surprising number of businesses either have not claimed theirs or completed it once and never returned.',
          'If a listing for your business already exists that you did not create, claim it rather than creating a second one. Duplicate listings split your signals and both perform worse.',
        ],
      },
      {
        heading: 'Getting the primary category right',
        paragraphs: [
          'The primary category is the most consequential decision in the whole profile. It largely determines which searches you are eligible to appear for, and choosing a vague one caps your visibility no matter what else you do.',
          'Find the most specific category that genuinely describes your main business, not the broadest one that covers everything you do. A dental clinic should be a dental clinic, not a medical centre. Add the other things you do as secondary categories, where they carry far less weight but still help.',
          'A useful check: search your main service in your town, open the top three listings, and look at their primary categories. That tells you what Google currently considers relevant for that query.',
        ],
      },
      {
        heading: 'Completing the rest',
        paragraphs: [
          'None of these individually decides your ranking, but an incomplete profile competes against complete ones. Work through the list once properly and the rest is maintenance.',
        ],
        bullets: [
          'Name: your actual business name. Adding keywords to it violates the guidelines and risks suspension.',
          'Address and service area: your real address if customers visit, or a service area if you travel to them.',
          'Hours: accurate, including holidays. Wrong hours generate genuinely damaging reviews.',
          'Phone: a number that is answered. Keep it identical to the number on your website.',
          'Photos: real photographs of the premises, team and work. Add new ones periodically rather than once at setup.',
          'Services and description: list each service individually, described in the words customers use.',
          'Website link: point it at the most relevant page, not always the homepage.',
        ],
      },
      {
        heading: 'Reviews, without doing anything stupid',
        paragraphs: [
          'Review volume, recency and content all matter. Ask satisfied customers directly, at the moment the work is finished, with a link that takes them straight to the review form. That is legitimate and effective.',
          'Do not buy reviews, do not write them yourself, and do not offer a discount in exchange for one. Google detects review manipulation and removes listings for it, and a suspended profile costs far more than the reviews were worth. Reply to every review, particularly the critical ones, because that reply is read by the next person deciding whether to call you.',
        ],
      },
      {
        heading: 'If you have no physical address',
        paragraphs: [
          'Remote and online-only businesses cannot verify a Google Business Profile without an address, and using a home address you do not want public, or a fake one, is not a workaround. Google verifies by postcard, video or phone, and a listing built on a false address gets removed.',
          'A service-area business, where you travel to customers, can register with a hidden address. A genuinely remote business with no address at all cannot, and the honest conclusion is that the map pack is not available to you. The effort belongs entirely in organic results instead: a properly structured site with a page for each real search intent, which is a slower route but not a blocked one.',
        ],
      },
      {
        heading: 'Maintaining it',
        paragraphs: [
          'A profile completed once and abandoned decays. Post updates occasionally, add photos, keep hours correct through holidays, answer questions in the Q&A section, and reply to reviews. Freshness is a signal, and most of your local competitors will not bother.',
        ],
      },
    ],
  },
];

export const getBlogPost = (pathname: string) =>
  blogPosts.find((post) => post.path === pathname.replace(/\/$/, '') || post.path === pathname);
