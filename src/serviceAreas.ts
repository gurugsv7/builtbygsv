/**
 * Service-area content manifest.
 *
 * BuiltbyGSV is a remote/cloud studio with no public street address, so it cannot
 * hold a verified Google Business Profile and cannot compete in the Google Map Pack.
 * The strategy these pages implement is organic-only: win the blue links with a
 * hub-and-spoke structure that has real depth per query, instead of one thin
 * homepage trying to rank for everything.
 *
 * Hub  = /web-software-developer-<city>   (broad "web developer in <city>" intent)
 * Spoke = /<service>-<city>               (one distinct service intent each)
 *
 * Spokes never duplicate the hub's target query. Each spoke owns a query the hub
 * does not target, which is what keeps this out of doorway-page territory.
 */

export interface PriceBand {
  name: string;
  range: string;
  fits: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Deliverable {
  title: string;
  detail: string;
}

export interface ServiceAreaPage {
  /** Canonical path, no trailing slash. */
  path: string;
  citySlug: CitySlug;
  city: string;
  alternateCity?: string;
  region: string;
  /** Short label used in breadcrumbs and internal-link anchors. */
  serviceName: string;
  /** schema.org Service.serviceType values. */
  serviceType: string[];
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /**
   * 40-60 word extractable answer block. Answer-engine optimisation: ChatGPT,
   * Perplexity and AI Overviews lift these near-verbatim.
   */
  answer: string;
  intro: string;
  deliverables: Deliverable[];
  /** Why this city specifically - the anti-thin-content requirement. */
  localContext: string[];
  priceBands: PriceBand[];
  faqs: Faq[];
  proof: string;
  /** Internal links out. Prevents orphan spokes and spreads authority. */
  related: { path: string; label: string }[];
}

export type CitySlug = 'karaikal' | 'thanjavur' | 'bengaluru';

/** INR bands shown on India-facing local pages. Global pages keep USD. */
export const INR_BANDS = {
  starterSite: { name: 'Starter presence', range: 'INR 18,000 - 45,000', fits: 'A credible 4-6 page site that ranks for your business name and turns phone searches into calls.' },
  growthSite: { name: 'Growth website', range: 'INR 60,000 - 1,60,000', fits: 'Service pages built per query, local SEO foundations, analytics and conversion tracking.' },
  ecommerce: { name: 'Online store', range: 'INR 85,000 - 2,50,000', fits: 'Catalogue, cart, payment gateway, order flow and inventory sync.' },
  software: { name: 'Custom software', range: 'INR 1,50,000 - 6,00,000+', fits: 'Dashboards, portals, booking and billing systems scoped as software, not as a brochure site.' },
  automationPilot: { name: 'Automation pilot', range: 'INR 25,000 - 75,000', fits: 'One workflow removed end to end, measured against the hours it used to cost.' },
  aiBuild: { name: 'AI build', range: 'INR 90,000 - 3,50,000', fits: 'Retrieval assistants, document extraction and agent workflows with guardrails and cost caps.' },
  seoFoundations: { name: 'SEO foundations', range: 'INR 30,000 - 90,000', fits: 'Technical fixes, page architecture, schema and the content set a city query actually needs.' },
  mvp: { name: 'MVP build', range: 'INR 2,50,000 - 8,00,000', fits: 'A shippable first release with auth, payments, core workflow and analytics.' },
} as const satisfies Record<string, PriceBand>;

const KARAIKAL = { citySlug: 'karaikal' as const, city: 'Karaikal', region: 'Puducherry' };
const THANJAVUR = { citySlug: 'thanjavur' as const, city: 'Thanjavur', alternateCity: 'Tanjore', region: 'Tamil Nadu' };
const BENGALURU = { citySlug: 'bengaluru' as const, city: 'Bengaluru', alternateCity: 'Bangalore', region: 'Karnataka' };

export const serviceAreaPages: ServiceAreaPage[] = [
  {
    ...KARAIKAL,
    path: '/ai-automation-agency-karaikal',
    serviceName: 'AI & automation',
    serviceType: ['Business Automation', 'AI Solutions', 'Workflow Automation'],
    title: 'AI Automation Agency in Karaikal | BuiltbyGSV',
    description:
      'AI automation for Karaikal businesses: WhatsApp enquiry handling, invoice and record extraction, appointment reminders and daily reporting, built and measured by GuruGSV.',
    eyebrow: 'AI & automation for Karaikal',
    h1: 'AI automation agency in Karaikal.',
    answer:
      'BuiltbyGSV builds AI and automation systems for Karaikal businesses: WhatsApp and form enquiry routing, invoice and document extraction, appointment reminders, and automatic daily reporting. Each build starts as one measured workflow with a fixed cost ceiling and a human fallback, so it can be judged on hours saved rather than on the technology used.',
    intro:
      'Most Karaikal businesses do not need an AI strategy. They need one specific job to stop eating three hours a day. That is where this work starts: pick the workflow costing the most staff time, automate it end to end, and measure the result against the time it used to take.',
    deliverables: [
      { title: 'Enquiry capture and routing', detail: 'Website forms, WhatsApp messages and missed calls land in one place, get acknowledged automatically, and are assigned to a person with a response deadline instead of sitting unread in a phone.' },
      { title: 'Document and invoice extraction', detail: 'Purchase invoices, delivery notes, prescriptions or ID documents are read into structured rows in your sheet or database, with a review queue for anything the model is unsure about.' },
      { title: 'Appointment and follow-up reminders', detail: 'Automatic SMS or WhatsApp reminders before an appointment and a follow-up after it, which is usually the fastest single way to reduce no-shows for a clinic or service business.' },
      { title: 'Retrieval assistants over your own files', detail: 'Ask questions against your own price lists, catalogues, policies or past quotations. Answers cite the source document, so staff can verify rather than trust.' },
      { title: 'Daily reporting without a person', detail: 'Sales, bookings, stock or enquiry numbers compiled and delivered every morning to the people who need them, pulled from the systems you already use.' },
      { title: 'Guardrails and cost control', detail: 'Every AI feature ships with a token budget, rate limits, prompt sanitisation and a defined fallback for when the model is unavailable. Running costs stay predictable.' },
    ],
    localContext: [
      'Karaikal businesses run lean. Automation here has to reduce headcount pressure, not add a system somebody must now babysit.',
      'Enquiries arrive on WhatsApp far more than on email, so the automation is built around WhatsApp and phone rather than assuming a CRM already exists.',
      'Tamil and English both appear in customer messages, and the extraction and routing logic is tested against mixed-language input rather than English-only samples.',
      'Most local teams already run on spreadsheets, Tally or a billing package. The automation connects to those instead of asking anyone to migrate.',
    ],
    priceBands: [INR_BANDS.automationPilot, INR_BANDS.aiBuild, INR_BANDS.software],
    faqs: [
      { question: 'What is the smallest useful AI automation project?', answer: 'A single workflow pilot. One repetitive job, usually enquiry routing or invoice entry, automated end to end in one to two weeks with a before-and-after measurement of the time it consumed. If it does not save measurable hours, there is no case for expanding it.' },
      { question: 'Will AI automation replace my staff?', answer: 'Not in the projects that work. It removes the copying, retyping and chasing that surrounds the job, so the same people handle more customers. Every build keeps a human review step for anything the system is not confident about.' },
      { question: 'Does this work if my business runs on WhatsApp and paper?', answer: 'Yes, and that is the common starting point in Karaikal. The first phase usually captures what is currently verbal or on paper into a structured record, because nothing can be automated until it exists as data.' },
      { question: 'How are ongoing AI costs controlled?', answer: 'Each feature has a monthly token budget and rate limits set before launch. Where a cheaper deterministic rule can do the job, it is used instead of a model call. You are told the expected monthly running cost before the build starts.' },
      { question: 'Can it read Tamil documents and messages?', answer: 'Yes. Extraction and routing are tested against real Tamil and mixed-language samples from your own business rather than clean English test data, because that is where accuracy actually breaks.' },
    ],
    proof:
      'The Thaai Clinic project in Karaikal covered the same ground from the patient side: appointment booking, structured health records and reminder-driven follow-up, replacing a phone-and-register workflow with something staff and patients could both rely on.',
    related: [
      { path: '/web-software-developer-karaikal', label: 'Web & software developer in Karaikal' },
      { path: '/custom-software-development-karaikal', label: 'Custom software development in Karaikal' },
      { path: '/services/automation', label: 'Automation & integrations service' },
      { path: '/ai-automation-agency-thanjavur', label: 'AI automation in Thanjavur' },
    ],
  },
  {
    ...KARAIKAL,
    path: '/ecommerce-website-development-karaikal',
    serviceName: 'E-commerce websites',
    serviceType: ['E-commerce Website Development', 'Web Development'],
    title: 'Ecommerce Website Development in Karaikal | BuiltbyGSV',
    description:
      'Online stores for Karaikal businesses: product catalogue, UPI and card payments, delivery zones, WhatsApp ordering and stock control, built to load fast on mobile data.',
    eyebrow: 'Selling online from Karaikal',
    h1: 'Ecommerce website development in Karaikal.',
    answer:
      'BuiltbyGSV builds online stores for Karaikal retailers and producers: product catalogue, UPI and card checkout, delivery-zone and shipping rules, WhatsApp ordering, and stock that stays in step with the shop counter. Stores are built mobile-first because almost all local traffic arrives on a phone over mobile data.',
    intro:
      'An online store only earns its cost if orders actually complete. In practice that means a catalogue customers can search on a phone, a checkout that does not lose them at the payment step, and stock numbers that match what is on the shelf. Everything else is decoration.',
    deliverables: [
      { title: 'A catalogue that survives a phone', detail: 'Search, filters and category pages that stay usable on a mid-range Android over a patchy connection. Images are compressed and served in modern formats so pages load in seconds, not tens of seconds.' },
      { title: 'UPI, card and cash-on-delivery checkout', detail: 'Razorpay or a comparable Indian gateway wired properly, with UPI as a first-class option rather than an afterthought, plus cash on delivery where your margins allow it.' },
      { title: 'Delivery zones and shipping rules', detail: 'Different rates and availability for Karaikal town, the wider Puducherry region, Tamil Nadu and the rest of India, so customers see a real total before they commit.' },
      { title: 'WhatsApp ordering as a real path', detail: 'A one-tap route from any product to a pre-filled WhatsApp message. Many local customers will always prefer to confirm by chat, and losing them at the cart is avoidable.' },
      { title: 'Stock that matches the counter', detail: 'Inventory synchronised with your billing or POS system where one exists, so the site stops selling what the shop has already sold.' },
      { title: 'Product schema and search visibility', detail: 'Structured data for products, prices and availability so listings can show prices and ratings directly in Google results rather than a plain blue link.' },
    ],
    localContext: [
      'A Karaikal store usually sells to three audiences at once: local customers checking stock before travelling in, the regional market, and family living outside the district ordering home. Delivery and payment rules have to serve all three.',
      'Most orders start on a phone during a commute or a break, so the entire flow is tested on mobile data before it is tested on a desktop.',
      'Cash on delivery still converts customers who will not enter card details, and a store that refuses it loses real revenue in this market.',
      'Seasonal and festival demand is sharp here. The catalogue is built so you can push a seasonal collection to the front without calling a developer.',
    ],
    priceBands: [INR_BANDS.ecommerce, INR_BANDS.growthSite, INR_BANDS.automationPilot],
    faqs: [
      { question: 'Should I use Shopify or a custom store?', answer: 'Shopify is the right answer for many Karaikal retailers: lower monthly risk, faster launch, no maintenance burden. Custom is worth it when your pricing, delivery or inventory logic does not fit a template, or when the store has to talk to billing software you already run. You will get a straight recommendation, not a push toward the more expensive build.' },
      { question: 'Can customers pay by UPI?', answer: 'Yes. UPI is set up as a primary checkout option through an Indian payment gateway, alongside cards, netbanking and optional cash on delivery.' },
      { question: 'How long does an online store take to build?', answer: 'A focused catalogue store with payments and delivery rules is typically three to six weeks once product data and images are ready. Product content is usually the slowest part, so it is worth starting that before development.' },
      { question: 'Will the store work when the connection is poor?', answer: 'It is built for that. Images are compressed and lazily loaded, pages are statically served where possible, and the critical path to checkout is kept small so it completes on a weak mobile connection.' },
      { question: 'Can I add products myself afterwards?', answer: 'Yes. Adding products, changing prices and running a seasonal collection are handled through an admin interface. You should never need a developer to change a price.' },
    ],
    proof:
      'The catalogue and media patterns used here come from the same product process as the V2 Productions build: structured content, fast media handling, and an enquiry path that stays visible on every screen.',
    related: [
      { path: '/web-software-developer-karaikal', label: 'Web & software developer in Karaikal' },
      { path: '/seo-services-karaikal', label: 'SEO services in Karaikal' },
      { path: '/insights/website-cost-karaikal', label: 'What a website costs in Karaikal' },
      { path: '/services/web-development', label: 'Website development service' },
    ],
  },
  {
    ...KARAIKAL,
    path: '/seo-services-karaikal',
    serviceName: 'SEO services',
    serviceType: ['Search Engine Optimization', 'Technical SEO', 'Local SEO'],
    title: 'SEO Services in Karaikal | Local Search | BuiltbyGSV',
    description:
      'Technical and local SEO for Karaikal businesses: page architecture, schema, Google Business Profile and the content a city query actually needs. Honest reporting, no rank guarantees.',
    eyebrow: 'Local search, done honestly',
    h1: 'SEO services in Karaikal.',
    answer:
      'BuiltbyGSV does technical and local SEO for Karaikal businesses: fixing crawl and indexing problems, building one page per real search intent, adding correct structured data, and setting up Google Business Profile and citations. No agency can guarantee a number-one ranking, and any that does is selling something Google does not sell.',
    intro:
      'Most local SEO proposals are a monthly retainer attached to a keyword report. This is different work: find out why the site cannot rank today, fix that, then build the specific pages your target searches actually require. If the site is technically sound and the content is thin, no amount of monthly reporting fixes it.',
    deliverables: [
      { title: 'A technical audit that names the blocker', detail: 'Indexing, canonicals, redirects, Core Web Vitals, mobile rendering and crawl waste. You get the specific reason pages are not ranking, with evidence, not a colour-coded score.' },
      { title: 'One page per real intent', detail: 'A single homepage cannot rank for every service and every town. Search demand is mapped to a page architecture where each page owns one query and does not compete with its neighbours.' },
      { title: 'Structured data that validates', detail: 'Organization, Service, FAQ, Product, Article and Breadcrumb markup implemented correctly and checked against the Rich Results Test, not pasted from a plugin and left broken.' },
      { title: 'Google Business Profile and citations', detail: 'Where you have a physical address: correct primary category, complete profile, photos, posts, and a consistent name, address and phone across Justdial, Sulekha, Bing Places and the directories that matter locally.' },
      { title: 'Content that answers the question', detail: 'Pages written to satisfy the search, with the direct answer near the top so it can be lifted into AI Overviews, ChatGPT and Perplexity answers as well as ranked in the blue links.' },
      { title: 'Reporting you can check yourself', detail: 'Search Console impressions, positions and clicks for the queries you care about, read from your own property, so nothing depends on trusting a screenshot from an agency dashboard.' },
    ],
    localContext: [
      'Karaikal search results are dominated by directories such as Justdial, Sulekha and IndiaMART, which means a real business site with proper structure can outrank listings that carry no depth at all.',
      'Several competing local sites are single-page builds trying to rank for every service at once. That is the specific weakness a properly structured site exploits.',
      'Searches here mix town, district and region: Karaikal, Puducherry, Nagapattinam, Thanjavur. The page architecture has to cover that spread without producing near-duplicate pages.',
      'If your business has a physical Karaikal address, Google Business Profile is roughly a third of local ranking and is the first thing to fix. If it does not, the map pack is not winnable and the effort belongs in organic results instead.',
    ],
    priceBands: [INR_BANDS.seoFoundations, INR_BANDS.growthSite, INR_BANDS.starterSite],
    faqs: [
      { question: 'Can you guarantee first place on Google?', answer: 'No, and neither can anyone else. Google sells ads, not organic positions. What can be committed to is fixing the technical blockers, building the pages the query needs, and showing you the position and impression movement in your own Search Console.' },
      { question: 'How long does local SEO take to show results?', answer: 'Technical fixes and new pages usually start appearing in Search Console impressions within two to six weeks. Meaningful position movement on a competitive city query typically takes three to six months, and longer on a new domain with no links.' },
      { question: 'Do I need a Google Business Profile?', answer: 'If you have a real address customers can visit, yes. It is the single biggest local ranking factor and the only way into the map pack. If you operate remotely with no address, you cannot get one, and the strategy shifts entirely to organic results.' },
      { question: 'Is SEO worth it for a small Karaikal business?', answer: 'It depends on whether people search for what you sell. For clinics, schools, retailers, contractors and professional services, local search demand is real and steady. For a business running entirely on referral, the money is usually better spent elsewhere, and you will be told so.' },
      { question: 'What if my current site is the problem?', answer: 'That is common. If the site is unindexable, slow on mobile, or has one page trying to serve ten intents, fixing the site is the SEO work. Rebuilding a weak site is often cheaper than paying to promote it for a year.' },
    ],
    proof:
      'The technical playbook applied to client work is the same one running on this site: prerendered HTML for every route, validated JSON-LD, one page per intent, and a generated sitemap that cannot drift from what is actually published.',
    related: [
      { path: '/insights/local-seo-karaikal-business', label: 'Local SEO guide for Karaikal businesses' },
      { path: '/web-software-developer-karaikal', label: 'Web & software developer in Karaikal' },
      { path: '/ecommerce-website-development-karaikal', label: 'Ecommerce development in Karaikal' },
      { path: '/faq', label: 'Common questions' },
    ],
  },
  {
    ...KARAIKAL,
    path: '/custom-software-development-karaikal',
    serviceName: 'Custom software',
    serviceType: ['Custom Software Development', 'Business Software'],
    title: 'Custom Software Development in Karaikal | BuiltbyGSV',
    description:
      'Billing, booking, inventory and staff software for Karaikal businesses. Built around how your team already works, with the source code and data staying yours.',
    eyebrow: 'Software for how you actually work',
    h1: 'Custom software development in Karaikal.',
    answer:
      'BuiltbyGSV builds custom business software for Karaikal companies: billing and invoicing, appointment and booking systems, inventory and stock control, staff and attendance tools, and customer portals. Scope starts from the workflow your team already runs, and you own the source code and the data at the end.',
    intro:
      'The decision worth making carefully is build versus buy. A ready-made package is usually the right answer, and you will be told when it is. Custom software earns its cost when your process genuinely does not fit the package, or when the package cannot talk to the other systems you run.',
    deliverables: [
      { title: 'Billing and invoicing in your format', detail: 'GST-compliant invoices in the layout your customers already recognise, with the numbering, discount and credit rules your business actually uses rather than a generic template.' },
      { title: 'Booking and appointment systems', detail: 'Slot management, staff or doctor assignment, cancellations and automated reminders, with a customer-facing booking page and a simple internal view for the front desk.' },
      { title: 'Inventory and stock control', detail: 'Stock movement, reorder alerts, batch and expiry tracking where it matters, and reconciliation between what the system says and what the shelf holds.' },
      { title: 'Staff, attendance and task tools', detail: 'Shift schedules, attendance capture, task assignment and the daily numbers a manager needs, without paying per user for a platform built for a company ten times your size.' },
      { title: 'Customer and partner portals', detail: 'A logged-in area where customers or dealers check their own orders, balances, documents or history, which removes a large share of routine phone calls.' },
      { title: 'Ownership handed over properly', detail: 'Source code, database, hosting accounts and documentation are yours. There is no arrangement where the software stops working if you stop paying the developer.' },
    ],
    localContext: [
      'Most Karaikal businesses already run Tally, a billing package or a set of well-understood spreadsheets. New software has to read from and write to those, not demand a migration nobody has time for.',
      'Teams are small and often share one counter machine plus several phones. Interfaces are designed for that reality rather than for one user per desktop.',
      'Power and connectivity are not guaranteed, so anything used at a counter is built to keep working through an interruption and reconcile afterwards.',
      'Bilingual labels matter. Staff-facing screens can carry Tamil where that is what the person at the counter reads fastest.',
    ],
    priceBands: [INR_BANDS.software, INR_BANDS.automationPilot, INR_BANDS.growthSite],
    faqs: [
      { question: 'Should I buy ready-made software instead?', answer: 'Often, yes. If a package covers eighty percent of your process at a monthly fee, buying it is usually the better decision, and you will be told that before any custom quote. Custom is worth it when the package cannot handle your actual rules, or when integrating several packages costs more than building the piece that connects them.' },
      { question: 'Can it work with Tally or my existing billing software?', answer: 'Usually yes, through import and export, a database connection, or an API where the vendor exposes one. The integration approach is confirmed during scoping, before you commit, because it varies a lot by product and version.' },
      { question: 'Do I own the software when it is finished?', answer: 'Yes. Source code, database and hosting accounts are transferred to you. The software does not stop working if the relationship ends.' },
      { question: 'What happens if it breaks after launch?', answer: 'Launch includes a defined support window for defects. Beyond that you can hold a maintenance arrangement or take the code to any developer, since it is documented and built on standard tooling rather than locked to one person.' },
      { question: 'How long does a custom system take?', answer: 'A focused first release covering one core workflow properly is usually four to eight weeks. Full multi-module systems take longer and are deliberately built in reviewable slices so you see working software early rather than at the end.' },
    ],
    proof:
      'Thaai Clinic in Karaikal is the closest reference: appointment booking, structured patient records and a reminder workflow, replacing a register-and-phone process with a system the front desk could run without training sessions.',
    related: [
      { path: '/ai-automation-agency-karaikal', label: 'AI automation in Karaikal' },
      { path: '/clinic-website-development-karaikal', label: 'Clinic & hospital websites in Karaikal' },
      { path: '/services/custom-software-development', label: 'Custom software service' },
      { path: '/web-software-developer-karaikal', label: 'Web & software developer in Karaikal' },
    ],
  },
  {
    ...KARAIKAL,
    path: '/clinic-website-development-karaikal',
    serviceName: 'Clinic & hospital websites',
    serviceType: ['Healthcare Website Development', 'Appointment Booking Software'],
    title: 'Clinic & Hospital Website Development in Karaikal | BuiltbyGSV',
    description:
      'Websites and appointment systems for Karaikal clinics, hospitals and diagnostic centres. Built from a real local project: booking, records, reminders and local search visibility.',
    eyebrow: 'Healthcare, built locally',
    h1: 'Clinic and hospital website development in Karaikal.',
    answer:
      'BuiltbyGSV builds websites and appointment systems for Karaikal clinics, hospitals and diagnostic centres: doctor and department pages, online booking, automated reminders, digital health records and local search visibility. The reference project is Thaai Clinic in Karaikal, built around booking, records and follow-up.',
    intro:
      'A patient looking for a clinic on a phone wants four things fast: is this the right specialisation, is it near me, when is it open, and how do I book. A clinic website that answers those four in under ten seconds outperforms a far prettier one that does not.',
    deliverables: [
      { title: 'Doctor and department pages', detail: 'A page per doctor and per specialisation with qualifications, timings and a direct booking action. These are the pages that rank for searches naming a specialisation and a town.' },
      { title: 'Online appointment booking', detail: 'Real slot availability by doctor and day, confirmation to the patient, and a front-desk view that fits how reception already works rather than adding a second system to check.' },
      { title: 'Automated reminders and follow-up', detail: 'SMS or WhatsApp reminders before the appointment and a follow-up after it. For most clinics this is the single change that most reduces no-shows.' },
      { title: 'Digital health records', detail: 'Reports and prescriptions stored against the patient with controlled access, so history is retrievable at the next visit instead of depending on the patient bringing a folder.' },
      { title: 'Local search visibility', detail: 'MedicalClinic and Physician structured data, correct opening hours, and pages built for how people search here, which is specialisation plus town rather than marketing language.' },
      { title: 'Usable on a basic phone', detail: 'Large tap targets, readable type, high contrast and fast loading on mobile data, because a meaningful share of patients are older or on entry-level devices.' },
    ],
    localContext: [
      'Karaikal patients frequently search by specialisation and town together. A single generic clinic page cannot serve those searches the way a page per specialisation can.',
      'A large share of booking traffic arrives through WhatsApp and phone calls, so online booking is added as an additional path rather than as a replacement reception has to police.',
      'Patients travel in from Nagapattinam, Thirunallar and the surrounding villages, so directions, timings and transport detail carry more weight than they would in a city.',
      'Tamil-language content is not optional for a healthcare audience here, particularly for older patients reading service and preparation information.',
    ],
    priceBands: [INR_BANDS.growthSite, INR_BANDS.software, INR_BANDS.starterSite],
    faqs: [
      { question: 'Do you have experience with healthcare projects in Karaikal?', answer: 'Yes. Thaai Clinic in Karaikal is a BuiltbyGSV project covering appointment booking, a patient dashboard, digital health records and reminder-driven follow-up, alongside a website refresh and local search work.' },
      { question: 'How is patient data protected?', answer: 'Records are access-controlled per role, transmitted over TLS and stored encrypted, with retention and access rules agreed in writing before launch. Health data is treated as sensitive by default rather than as ordinary application data.' },
      { question: 'Can patients still book by phone?', answer: 'Yes, and most will for a long time. Online booking is an additional channel; phone bookings are entered into the same calendar so there is one source of truth and no double-booked slot.' },
      { question: 'Will the site be available in Tamil?', answer: 'Yes, where you want it. Service descriptions, preparation instructions and contact information are the sections that benefit most from Tamil for a Karaikal patient audience.' },
      { question: 'How much does a clinic website cost?', answer: 'An informational clinic site with doctor pages and enquiry forms typically falls in the INR 60,000 to 1,60,000 range. Adding real online booking, records and reminders moves it into custom software territory, generally from INR 1,50,000 upward depending on the workflow.' },
    ],
    proof:
      'Thaai Clinic, Karaikal: a mobile-first patient experience covering appointment booking, a home dashboard showing the next visit, a secure health-record vault and daily care content, delivered as a working product rather than a mockup.',
    related: [
      { path: '/projects/thaai-clinic-website', label: 'Thaai Clinic case study' },
      { path: '/custom-software-development-karaikal', label: 'Custom software in Karaikal' },
      { path: '/web-software-developer-karaikal', label: 'Web & software developer in Karaikal' },
      { path: '/seo-services-karaikal', label: 'SEO services in Karaikal' },
    ],
  },
  {
    ...THANJAVUR,
    path: '/ai-automation-agency-thanjavur',
    serviceName: 'AI & automation',
    serviceType: ['Business Automation', 'AI Solutions', 'Workflow Automation'],
    title: 'AI Automation Agency in Thanjavur (Tanjore) | BuiltbyGSV',
    description:
      'AI automation for Thanjavur and Tanjore businesses: order and enquiry routing, document extraction, dispatch tracking and automated reporting for manufacturers, schools and clinics.',
    eyebrow: 'AI & automation for Thanjavur',
    h1: 'AI automation agency in Thanjavur.',
    answer:
      'BuiltbyGSV builds AI and automation systems for Thanjavur and Tanjore businesses: order and enquiry routing, purchase and dispatch document extraction, production and stock reporting, and admission or appointment follow-up. Projects start as a single measured workflow with a fixed cost ceiling and a human review step.',
    intro:
      'Thanjavur runs on established businesses with settled processes: manufacturers, traders, schools, hospitals and long-standing family firms. Automation that demands those processes change usually fails. Automation that removes the retyping between them usually pays for itself inside a quarter.',
    deliverables: [
      { title: 'Order and enquiry routing', detail: 'Enquiries from phone, WhatsApp, email and the website collected into one queue with an owner and a response deadline, so nothing depends on whoever happened to take the call.' },
      { title: 'Purchase and dispatch document extraction', detail: 'Purchase orders, delivery challans, lorry receipts and invoices read into structured records, with a review queue for low-confidence fields. This is usually the largest single time drain in a trading or manufacturing office.' },
      { title: 'Production and stock reporting', detail: 'Daily or shift-level output, stock and dispatch figures compiled automatically from whatever systems and sheets currently hold them, and delivered to the people who act on them.' },
      { title: 'Admission and appointment follow-up', detail: 'For schools, colleges and clinics: automatic acknowledgement, reminder and follow-up sequences on enquiries, which is where most institutions lose interested people.' },
      { title: 'Retrieval assistants over internal documents', detail: 'Staff query price lists, specifications, policies and past correspondence in plain language and get answers that cite the source file rather than paraphrasing it.' },
      { title: 'Guardrails and predictable cost', detail: 'Token budgets, rate limits and deterministic fallbacks defined before launch, with the expected monthly running cost stated up front.' },
    ],
    localContext: [
      'Thanjavur has a deeper base of established manufacturers and traders than Karaikal, so the highest-value automation is usually in the back office - purchase, dispatch and reconciliation - rather than in customer-facing chat.',
      'Many firms here have run the same process for two decades and have staff who know it precisely. The automation is built to match that process, not to impose a redesign.',
      'The education and healthcare sector around Thanjavur is large, and admission and appointment follow-up is consistently the workflow with the clearest measurable return.',
      'Tamil-first communication with customers and staff is the norm, so messaging, extraction and interface labels are built for Tamil rather than translated afterwards.',
    ],
    priceBands: [INR_BANDS.automationPilot, INR_BANDS.aiBuild, INR_BANDS.software],
    faqs: [
      { question: 'Do you work with Thanjavur businesses remotely?', answer: 'Yes. BuiltbyGSV is a remote studio, and projects run on structured checkpoints, written progress updates and review calls. Thanjavur is close enough to Karaikal that on-site sessions can be arranged for discovery or handover where the project needs them.' },
      { question: 'Which workflow should we automate first?', answer: 'The one that consumes the most staff hours and has the clearest rules. In most Thanjavur trading and manufacturing offices that is purchase or dispatch document entry. Discovery measures the current cost before anything is built, so the decision is based on hours rather than on preference.' },
      { question: 'Can it work with our existing ERP or Tally?', answer: 'Usually yes, through import and export, a database connection, or an API where one exists. The approach is confirmed during scoping because it varies significantly between products and versions.' },
      { question: 'What if the AI gets something wrong?', answer: 'Every extraction and routing step has a confidence threshold. Anything below it goes to a human review queue rather than into your records. Accuracy is measured against your real documents during the pilot, and you see the number before expanding.' },
      { question: 'How quickly can we see a result?', answer: 'A single workflow pilot typically runs one to two weeks from data access to a working automation, with a before-and-after time measurement at the end.' },
    ],
    proof:
      'The same discovery-to-measurement process runs on every BuiltbyGSV automation project: identify the workflow, measure what it costs today, build it in reviewable slices, and compare the result against the original number rather than against a demo.',
    related: [
      { path: '/web-software-developer-thanjavur', label: 'Web & software developer in Thanjavur' },
      { path: '/custom-software-development-thanjavur', label: 'Custom software in Thanjavur' },
      { path: '/ai-automation-agency-karaikal', label: 'AI automation in Karaikal' },
      { path: '/services/ai-solutions', label: 'AI solutions service' },
    ],
  },
  {
    ...THANJAVUR,
    path: '/custom-software-development-thanjavur',
    serviceName: 'Custom software',
    serviceType: ['Custom Software Development', 'Business Software'],
    title: 'Custom Software Development in Thanjavur (Tanjore) | BuiltbyGSV',
    description:
      'Billing, inventory, dispatch, admission and portal software for Thanjavur and Tanjore businesses, schools and hospitals. Built around your existing process, with full ownership handover.',
    eyebrow: 'Software for established teams',
    h1: 'Custom software development in Thanjavur.',
    answer:
      'BuiltbyGSV builds custom business software for Thanjavur and Tanjore organisations: billing and GST invoicing, inventory and dispatch tracking, admission and student systems, hospital and appointment tools, and dealer or customer portals. The build starts from your existing process, and source code, database and hosting are handed over to you.',
    intro:
      'Thanjavur businesses rarely need to be told how their process works. They need software that finally matches it, instead of a package that forces three workarounds and a parallel spreadsheet. That is the specific problem custom software should solve here.',
    deliverables: [
      { title: 'Billing, GST and accounts integration', detail: 'Invoices in the format your customers and auditors already accept, with your numbering, credit and discount rules, and a clean export path into the accounts system you already run.' },
      { title: 'Inventory, dispatch and lorry-receipt tracking', detail: 'Goods movement from stock to dispatch to delivery confirmation, with the paperwork trail your customers and transporters expect, and reconciliation that catches the gaps.' },
      { title: 'Admission and student management', detail: 'For the schools and colleges around Thanjavur: enquiry to admission tracking, fee schedules and receipts, attendance, and parent communication in one place instead of four registers.' },
      { title: 'Hospital and appointment systems', detail: 'Slot and doctor management, patient records, billing and reporting, built for a front desk that will keep taking phone bookings alongside online ones.' },
      { title: 'Dealer and customer portals', detail: 'A logged-in area where dealers or customers see their own orders, balances, dispatch status and documents, which removes a large share of routine calls to the office.' },
      { title: 'Ownership and documentation handover', detail: 'Source code, database, hosting accounts and written documentation transfer to you at the end. Any competent developer can maintain it afterwards.' },
    ],
    localContext: [
      'Thanjavur firms are typically older and larger than the Karaikal average, which means existing systems, existing data and existing staff habits all have to be respected in the migration plan rather than discovered late.',
      'Multi-branch and multi-godown operations are common here, so stock, billing and permissions are designed for more than one location from the start.',
      'The education sector around Thanjavur is substantial, and admission-to-fee tracking is the workflow most often still split across registers and spreadsheets.',
      'Staff-facing screens carry Tamil labels where that is what the person using them reads fastest, which measurably reduces training time and data-entry errors.',
    ],
    priceBands: [INR_BANDS.software, INR_BANDS.growthSite, INR_BANDS.automationPilot],
    faqs: [
      { question: 'We already have software that half works. Can it be fixed instead of replaced?', answer: 'Often yes, and that is usually cheaper. The first step is an assessment of what exists: if the data model is sound and the problem is missing features or a bad interface, extending it beats rebuilding. If the foundation is unsound, you will be told that plainly with the reasoning.' },
      { question: 'Can you handle multiple branches or godowns?', answer: 'Yes. Multi-location stock, per-branch billing series, and role-based permissions so a branch sees its own data are all standard scope rather than a later upgrade.' },
      { question: 'How is our existing data moved across?', answer: 'Migration is planned during scoping: what comes across, what is archived, and how it is verified. Existing data is imported and reconciled against your current totals before the old system is retired, and both run in parallel during the switchover.' },
      { question: 'Do you visit Thanjavur for the project?', answer: 'BuiltbyGSV runs remotely by default, with structured checkpoints and written updates. On-site sessions for discovery, training or handover can be arranged where the project genuinely benefits, and Thanjavur is within straightforward reach of Karaikal.' },
      { question: 'What does a system like this cost?', answer: 'A focused single-workflow system generally starts around INR 1,50,000. Multi-module systems covering billing, inventory and portals run higher and are quoted per module after scoping, so you can stage the investment rather than commit to everything at once.' },
    ],
    proof:
      'Every BuiltbyGSV software project is built in reviewable slices: one working workflow at a time, tested against real data, so you see and judge running software early instead of approving a specification and waiting.',
    related: [
      { path: '/web-software-developer-thanjavur', label: 'Web & software developer in Thanjavur' },
      { path: '/ai-automation-agency-thanjavur', label: 'AI automation in Thanjavur' },
      { path: '/custom-software-development-karaikal', label: 'Custom software in Karaikal' },
      { path: '/services/custom-software-development', label: 'Custom software service' },
    ],
  },
  {
    ...THANJAVUR,
    path: '/ecommerce-website-development-thanjavur',
    serviceName: 'E-commerce websites',
    serviceType: ['E-commerce Website Development', 'Web Development'],
    title: 'Ecommerce Website Development in Thanjavur (Tanjore) | BuiltbyGSV',
    description:
      'Online stores for Thanjavur and Tanjore businesses: handicrafts, textiles, food products and trade catalogues, with UPI checkout, shipping rules and stock control.',
    eyebrow: 'Selling beyond the district',
    h1: 'Ecommerce website development in Thanjavur.',
    answer:
      'BuiltbyGSV builds online stores for Thanjavur and Tanjore businesses, including handicraft, textile, food and trade catalogues. Builds cover product catalogue, UPI and card checkout, pan-India and international shipping rules, WhatsApp ordering, and stock synchronised with your existing billing system.',
    intro:
      'Thanjavur makes things people outside Thanjavur want to buy. Tanjore paintings, bronze work, textiles, brassware and food products all have demand well beyond the district, and most of that demand currently goes through marketplaces that take a cut and keep the customer relationship.',
    deliverables: [
      { title: 'Catalogues built for craft and variant products', detail: 'Handicraft and textile products need size, material, finish and made-to-order variants, plus enough photography structure to sell an item the buyer cannot handle. The catalogue is designed for that rather than for simple stock-keeping units.' },
      { title: 'Pan-India and international shipping', detail: 'Weight and dimension-based rates, courier integration, fragile-item handling for bronze and painting work, and clear delivery expectations before checkout.' },
      { title: 'UPI, card and international payments', detail: 'An Indian gateway with UPI as a first-class option for domestic buyers, plus card and international payment support where you sell to buyers outside India.' },
      { title: 'Trade and bulk enquiry paths', detail: 'A separate route for wholesale and export enquiries, with quantity, specification and quotation handling, because that buyer should not be pushed through a retail cart.' },
      { title: 'Stock synchronised with billing', detail: 'Inventory kept in step with your existing billing or accounting system so the store stops selling what has already been sold at the counter or shipped to a trade order.' },
      { title: 'Product schema and marketplace independence', detail: 'Structured product data so your own listings can compete in Google results, which is how you reduce dependence on marketplaces that own the customer relationship.' },
    ],
    localContext: [
      'Thanjavur products sell nationally and internationally far more than locally, which reverses the usual local-store priority: shipping, packaging and buyer trust matter more than delivery-radius rules.',
      'Craft and made-to-order items need lead-time and customisation handling that a standard cart does not provide, and skipping this is the most common reason these stores underperform.',
      'Many Thanjavur producers currently sell through marketplaces at a significant commission. A direct store is worth building specifically to shift repeat buyers off that channel.',
      'Export and bulk buyers arrive with different requirements from retail buyers, so the site carries two distinct paths rather than forcing both through one checkout.',
    ],
    priceBands: [INR_BANDS.ecommerce, INR_BANDS.growthSite, INR_BANDS.automationPilot],
    faqs: [
      { question: 'Can I sell internationally from Thanjavur?', answer: 'Yes. That requires international payment support, weight and dimension-based shipping, customs documentation handling and clear delivery timelines. It is scoped as an explicit part of the build rather than assumed, because it materially changes checkout and fulfilment.' },
      { question: 'How do made-to-order and custom items work?', answer: 'Products can carry lead times, customisation options and a quotation path instead of instant checkout. For craft items this is usually essential, since the buyer is commissioning rather than buying from stock.' },
      { question: 'Should I stay on marketplaces as well?', answer: 'Usually yes, at least initially. Marketplaces bring discovery; your own store keeps the margin and the customer relationship. The practical strategy is to keep both and move repeat buyers to the direct store over time.' },
      { question: 'What about photography for handicraft products?', answer: 'Photography is the single biggest factor in selling craft items online, and it is not included in development. What is provided is the specification for what to shoot and how, plus a catalogue built to display it well.' },
      { question: 'How long will this take to build?', answer: 'Three to six weeks for the store itself once product data and photography are ready. Product content is almost always the bottleneck, so it is worth beginning that before development starts.' },
    ],
    proof:
      'The V2 Productions build applied the same demands - heavy media handled fast, structured catalogue content, and a booking or enquiry path visible from every screen - to a creative studio selling work that has to be seen before it is bought.',
    related: [
      { path: '/web-software-developer-thanjavur', label: 'Web & software developer in Thanjavur' },
      { path: '/custom-software-development-thanjavur', label: 'Custom software in Thanjavur' },
      { path: '/ecommerce-website-development-karaikal', label: 'Ecommerce development in Karaikal' },
      { path: '/pricing', label: 'Project pricing' },
    ],
  },
  {
    ...BENGALURU,
    path: '/mvp-development-company-bengaluru',
    serviceName: 'MVP development',
    serviceType: ['MVP Development', 'Product Development', 'Software Development'],
    title: 'MVP Development Company in Bengaluru | BuiltbyGSV',
    description:
      'MVP development for Bengaluru founders: a shippable first release with auth, payments, core workflow and analytics in six to ten weeks, built to be extended rather than thrown away.',
    eyebrow: 'First releases for founders',
    h1: 'MVP development company in Bengaluru.',
    answer:
      'BuiltbyGSV builds MVPs for Bengaluru founders and early teams: a shippable first release covering authentication, payments, the core workflow and analytics, typically in six to ten weeks. The build targets one validated user journey and is written to be extended by your own team rather than rewritten after the raise.',
    intro:
      'The failure mode for an MVP is not building too little. It is building six half-features instead of one that works, then having nothing solid to show an investor or a first customer. The scope conversation is where this project succeeds or fails.',
    deliverables: [
      { title: 'A release boundary agreed before code', detail: 'One primary user journey, defined precisely, with everything else recorded as explicitly out of scope. This is the single decision that most determines whether an MVP ships on time.' },
      { title: 'Auth, payments and the core workflow', detail: 'Real authentication, a working payment path where the model needs one, and the central workflow built properly rather than mocked, so the product can take an actual first customer.' },
      { title: 'Analytics from day one', detail: 'Event tracking for the specific actions that indicate the idea is working, instrumented before launch. Without this, the MVP produces opinions rather than evidence.' },
      { title: 'Practical AI features where they earn their place', detail: 'Retrieval, extraction, generation or assistant features built with a defined source of truth, a cost ceiling and a human fallback, rather than added because the deck mentions AI.' },
      { title: 'A codebase your team can take over', detail: 'TypeScript throughout, standard architecture, tests on the paths that matter and readable commit history, so a hired engineer is productive in days rather than proposing a rewrite.' },
      { title: 'Deployment, monitoring and handover', detail: 'Shipped on infrastructure you own, with error monitoring, deployment documented, and accounts transferred. No dependency on the original developer to release a change.' },
    ],
    localContext: [
      'Bengaluru founders are usually raising or pitching against a clock, so the deliverable that matters is a working product on a real domain by a specific date, not a comprehensive roadmap.',
      'A hired first engineer will assess the codebase within a week. An MVP built as disposable code becomes an expensive rewrite exactly when the team is least able to afford one.',
      'The market here is crowded with agencies selling large scopes. The more useful service is an honest reduction of scope to what actually needs to exist for the next milestone.',
      'Working with one person who handles product definition, design and implementation removes the handoff loss that makes small scopes expensive at larger agencies.',
    ],
    priceBands: [INR_BANDS.mvp, INR_BANDS.software, INR_BANDS.aiBuild],
    faqs: [
      { question: 'How long does an MVP take?', answer: 'Six to ten weeks for a focused first release with authentication, payments, one core workflow and analytics. Scopes that stretch beyond that are usually carrying features that should have been deferred, and the scoping conversation is where that gets identified.' },
      { question: 'Will I own the code and be able to hire a team onto it?', answer: 'Yes. Source code, infrastructure accounts and documentation are yours. The codebase uses standard TypeScript and conventional architecture specifically so an incoming engineer can work in it without a rewrite.' },
      { question: 'Can you work with my designer or existing Figma files?', answer: 'Yes. Existing designs are implemented as given, with any interaction or accessibility problems raised before build rather than discovered afterwards. If there is no designer, interface direction is part of the engagement.' },
      { question: 'What if I need changes after launch?', answer: 'Post-launch work is scoped from what real usage shows, which is the point of instrumenting analytics from day one. You can continue with BuiltbyGSV, hand over to your own team, or take it elsewhere; nothing is locked.' },
      { question: 'Do you take equity instead of fees?', answer: 'No. Engagements are fee-based with an agreed scope, which keeps the incentive on shipping the right small thing rather than on maximising the build.' },
    ],
    proof:
      'The Budget Diet App is a BuiltbyGSV lab product built to this exact shape: one clearly defined user problem, a focused feature set covering daily planning, search and price tracking, and a release that could be judged on use rather than on a specification.',
    related: [
      { path: '/web-software-developer-bengaluru', label: 'Web & software developer in Bengaluru' },
      { path: '/saas-development-company-bengaluru', label: 'SaaS development in Bengaluru' },
      { path: '/ai-automation-agency-bengaluru', label: 'AI automation in Bengaluru' },
      { path: '/process', label: 'How projects run' },
    ],
  },
  {
    ...BENGALURU,
    path: '/saas-development-company-bengaluru',
    serviceName: 'SaaS development',
    serviceType: ['SaaS Development', 'Web Application Development'],
    title: 'SaaS Development Company in Bengaluru | BuiltbyGSV',
    description:
      'SaaS product development for Bengaluru teams: multi-tenant architecture, subscription billing, roles and permissions, admin tooling and usage analytics built on React and TypeScript.',
    eyebrow: 'Products that have to keep running',
    h1: 'SaaS development company in Bengaluru.',
    answer:
      'BuiltbyGSV builds and extends SaaS products for Bengaluru teams: multi-tenant data architecture, subscription and usage billing, role-based permissions, onboarding flows, admin tooling and usage analytics. The work is done in React, TypeScript, Node and Postgres, with the operational pieces treated as core scope rather than as later additions.',
    intro:
      'What separates a SaaS product from a web app is everything around the feature: tenancy, billing, permissions, onboarding, support tooling and the ability to answer what a specific customer did last Tuesday. Products that defer those become very expensive at exactly the point they start growing.',
    deliverables: [
      { title: 'Multi-tenant architecture done early', detail: 'Tenant isolation designed into the data model from the start. Retrofitting tenancy onto a single-tenant schema is one of the most costly rewrites a growing product can face.' },
      { title: 'Subscription and usage billing', detail: 'Plans, trials, upgrades, downgrades, proration, failed payments and dunning wired through Stripe, Razorpay or an equivalent, including the webhook handling that keeps entitlements correct.' },
      { title: 'Roles, permissions and team accounts', detail: 'Organisation accounts, invitations, role-based access and audit trails, which is the first thing a business customer asks about and the first thing that blocks a deal when missing.' },
      { title: 'Onboarding that reduces early churn', detail: 'The first-session path built deliberately, with empty states, sample data and progressive setup, because most SaaS churn happens before the user reaches the value.' },
      { title: 'Admin and support tooling', detail: 'Internal screens for impersonation, plan changes, usage inspection and troubleshooting. Without these, support work becomes engineering work and stays that way.' },
      { title: 'Usage analytics and product metrics', detail: 'Activation, retention and feature-usage instrumentation feeding decisions about what to build next, rather than a dashboard nobody opens.' },
    ],
    localContext: [
      'Bengaluru SaaS teams frequently sell to both Indian and overseas customers, which means multi-currency billing, GST handling and timezone-correct reporting are requirements rather than edge cases.',
      'Early teams here often have strong product sense and a shortage of senior engineering hours. The useful contribution is the architectural decisions that are expensive to reverse, made correctly the first time.',
      'A product that will be handed to an in-house team needs conventional structure and documentation, not clever abstractions only its original author understands.',
      'Enterprise-facing Indian SaaS gets asked about roles, audit logs and data residency early in the sales cycle, so those belong in the first build rather than in a later compliance scramble.',
    ],
    priceBands: [INR_BANDS.mvp, INR_BANDS.software, INR_BANDS.aiBuild],
    faqs: [
      { question: 'Can you take over an existing SaaS codebase?', answer: 'Yes, starting with an assessment of the data model, tenancy approach, test coverage and deployment setup. You get an honest read on whether it should be extended or restructured, including the case where the answer is that it is fine and needs no intervention.' },
      { question: 'Which billing provider should we use?', answer: 'Stripe where you sell internationally, Razorpay where the customer base is primarily Indian, and occasionally both. The recommendation depends on your currencies, GST obligations and payout requirements, and it is made during scoping rather than by default.' },
      { question: 'How is multi-tenancy handled?', answer: 'Usually shared-schema with enforced tenant scoping at the data-access layer, which suits most early SaaS products. Separate schemas or databases are used where a customer contractually requires isolation. The decision is made explicitly and documented, because reversing it later is expensive.' },
      { question: 'Do you build the AI features too?', answer: 'Yes, where they earn their place: retrieval over customer data, document extraction, drafting and assistant workflows. Each ships with a defined source of truth, a cost ceiling per tenant and a human fallback path.' },
      { question: 'What happens when we hire our own engineers?', answer: 'That is the intended outcome. The codebase, documentation and infrastructure are built for handover, and the transition can include a structured walkthrough with your incoming team.' },
    ],
    proof:
      'BuiltbyGSV works in React, TypeScript, Node, Python, PostgreSQL, Supabase, Docker and AWS, and selects the stack around the product and the team that will maintain it rather than around a fixed house preference.',
    related: [
      { path: '/mvp-development-company-bengaluru', label: 'MVP development in Bengaluru' },
      { path: '/web-software-developer-bengaluru', label: 'Web & software developer in Bengaluru' },
      { path: '/services/custom-software-development', label: 'Custom software service' },
      { path: '/pricing', label: 'Project pricing' },
    ],
  },
  {
    ...BENGALURU,
    path: '/ai-automation-agency-bengaluru',
    serviceName: 'AI & automation',
    serviceType: ['AI Solutions', 'Business Automation', 'AI Agent Development'],
    title: 'AI Automation Agency in Bengaluru | BuiltbyGSV',
    description:
      'AI automation for Bengaluru teams: RAG assistants over internal data, document extraction, agent workflows and internal tooling, with evaluation, guardrails and per-tenant cost caps.',
    eyebrow: 'AI that survives production',
    h1: 'AI automation agency in Bengaluru.',
    answer:
      'BuiltbyGSV builds production AI systems for Bengaluru teams: retrieval assistants over internal data, document and invoice extraction, agent workflows, and AI features inside existing products. Every build includes an evaluation set, guardrails, a per-tenant cost ceiling and a defined human fallback.',
    intro:
      'Most AI prototypes demo well and fail in production for the same three reasons: nobody built an evaluation set, nobody capped the cost, and nobody defined what happens when the model is wrong. Those three are treated as scope here, not as follow-up work.',
    deliverables: [
      { title: 'Retrieval assistants over your own data', detail: 'Chunking, embedding and retrieval tuned against your actual documents, with answers that cite their sources so users can verify. Retrieval quality, not the model choice, is what determines whether this works.' },
      { title: 'An evaluation set before launch', detail: 'A held-out set of real questions with known-correct answers, scored before and after every change. Without it, prompt changes are guesswork and regressions ship silently.' },
      { title: 'Document and invoice extraction', detail: 'Structured extraction from PDFs, scans and images with per-field confidence, a review queue below threshold, and accuracy measured against your own documents rather than a benchmark.' },
      { title: 'Agent workflows with real boundaries', detail: 'Multi-step agents with explicit tool permissions, step limits, spend caps and an audit trail of what was called and why. Agents that can act need constraints before they need capability.' },
      { title: 'Cost control per tenant and per feature', detail: 'Token budgets, caching, model routing that sends easy work to cheaper models, and dashboards showing where spend actually goes, so unit economics stay defensible.' },
      { title: 'Guardrails and human fallback', detail: 'Prompt injection defences, output validation, rate limiting and a defined path for the user when the model is unavailable or unsure. Every AI feature has a documented failure behaviour.' },
    ],
    localContext: [
      'Bengaluru teams often already have a working AI prototype and need it made reliable, observable and affordable enough to put in front of customers. That hardening work is the common engagement here.',
      'Products serving enterprise customers get asked about data handling, retention and model providers during procurement, so those choices are documented from the start rather than reconstructed under deadline.',
      'Per-tenant AI cost is a genuine margin risk for Indian SaaS pricing, which makes routing, caching and budget enforcement a commercial requirement rather than an optimisation.',
      'Teams here will maintain this themselves, so evaluation harnesses and prompt versioning are handed over as working tooling rather than described in a document.',
    ],
    priceBands: [INR_BANDS.aiBuild, INR_BANDS.mvp, INR_BANDS.automationPilot],
    faqs: [
      { question: 'Our AI prototype works in demos but fails with real users. Can that be fixed?', answer: 'Usually, and it is the most common request. The work is an evaluation set built from real failures, retrieval tuning against your actual corpus, output validation, and a fallback path. The failure is almost always in retrieval and evaluation rather than in the model.' },
      { question: 'Which models do you use?', answer: 'Whichever fits the task, cost and data constraints, including Claude, Gemini and open models where self-hosting is required. Systems are built so the model can be swapped, because the right choice changes every few months.' },
      { question: 'How do you stop AI costs running away?', answer: 'Per-feature and per-tenant token budgets, aggressive caching, routing simple work to cheaper models, and enforcement in code rather than in a policy document. Expected monthly cost is estimated before the build and monitored after launch.' },
      { question: 'Can this run on our own infrastructure?', answer: 'Yes, where data residency or procurement requires it, using self-hosted models and your own vector storage. The trade-off in quality and operational cost is set out honestly before you decide.' },
      { question: 'How do you handle prompt injection?', answer: 'Untrusted content is treated as data rather than instruction, tool permissions are explicitly scoped, outputs are validated before they act on anything, and agent steps are audited. This matters most where the system reads customer-supplied documents or web content.' },
    ],
    proof:
      'The AI work at BuiltbyGSV covers retrieval and vector search, multimodal extraction, and assistant integration, and every feature ships with the rate limits, prompt sanitisation, cost budgets and fallback strategy needed to run it in production.',
    related: [
      { path: '/saas-development-company-bengaluru', label: 'SaaS development in Bengaluru' },
      { path: '/mvp-development-company-bengaluru', label: 'MVP development in Bengaluru' },
      { path: '/ai-automation-agency-karaikal', label: 'AI automation in Karaikal' },
      { path: '/services/ai-solutions', label: 'AI solutions service' },
    ],
  },
];

export const getServiceAreaPage = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return serviceAreaPages.find((page) => page.path === normalized);
};

export const serviceAreaPagesForCity = (citySlug: CitySlug) =>
  serviceAreaPages.filter((page) => page.citySlug === citySlug);
