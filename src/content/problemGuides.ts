import type { BlogPost } from '../blog';

/**
 * Problem-first guides. Each starts from a problem a real person searches for, answers it
 * directly, and only then mentions the BuiltbyGSV tool or service that addresses it.
 * Claims about our own open-source tools stay within what their READMEs verify.
 */
export const problemGuides: BlogPost[] = [
  {
    slug: 'use-any-controller-with-ps-remote-play-pc',
    path: '/insights/use-any-controller-with-ps-remote-play-pc',
    title: 'Using an Xbox or generic controller with PS Remote Play on Windows',
    seoTitle: 'Xbox or Generic Controller with PS Remote Play on PC | BuiltbyGSV',
    description:
      'Why PS Remote Play on Windows ignores most non-Sony controllers, what DS4Windows does and does not solve, and how EvoBridge emulates a DualShock 4 locally.',
    excerpt:
      'PS Remote Play is built around Sony controllers, and most of the familiar Windows mappers translate in the opposite direction. Here is why your pad is ignored and what actually fixes it.',
    category: 'Open-source tools',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '7 min read',
    takeaway:
      'PS Remote Play expects a DualShock 4 or DualSense. To use an Xbox, EvoFox or other XInput pad, something has to present a virtual DualShock 4 to Windows and hide the physical pad so the app does not see both. EvoBridge, our free MIT-licensed tool, does exactly that and was tested end to end with a live PS5 session.',
    sections: [
      {
        heading: 'Why your controller does nothing in Remote Play',
        paragraphs: [
          'Sony’s PS Remote Play app for Windows is designed around PlayStation controllers. An Xbox controller or a budget XInput pad works perfectly in Steam and most PC games, so the failure feels random, but it is not: the app is looking for a Sony device and the pad never identifies as one.',
          'This hits a lot of people in India in particular, where affordable pads such as the EvoFox Elite X2 or Ant Esports GP400 are far more common than a spare DualShock 4 or DualSense.',
        ],
      },
      {
        heading: 'Why DS4Windows is not the answer here',
        paragraphs: [
          'DS4Windows is the tool most search results point to, but it works in the other direction: it makes a PlayStation controller look like an Xbox 360 controller to PC games. That is the opposite of what Remote Play needs.',
          'Its driver layer, ViGEmBus, was also archived by its maintainer in November 2023, so building new workflows on it carries long-term risk. Some paid mappers do support DualShock 4 output, but they add a licence or subscription for what is a narrow job.',
        ],
      },
      {
        heading: 'What a working setup has to do',
        paragraphs: ['Any reliable fix has three parts, whichever tool provides them:'],
        bullets: [
          'Read the physical controller (XInput or SDL-recognised HID).',
          'Present a virtual USB DualShock 4 to Windows, with correct buttons, sticks, triggers and ideally rumble.',
          'Hide the physical controller from other apps during the session, so nothing receives double input.',
          'Restore the physical controller cleanly when the session stops, even after a crash.',
        ],
      },
      {
        heading: 'How EvoBridge handles it',
        paragraphs: [
          'EvoBridge is a Windows desktop mapper we built and open-sourced. It reads the selected controller, sends its input to a local, unmodified VIIPER backend that exposes a virtual USB DualShock 4, and can optionally use HidHide to hide the physical pad for the length of the session.',
          'It keeps per-device profiles for deadzone, rumble and mappings, shows a live input preview, and has a guided mapping flow for pads SDL does not recognise. Default shortcuts map Back + Start to the PS button and Back + right-stick click to a touchpad click.',
          'It collects no analytics, does not ask for PSN credentials and binds its backend only to loopback ports on your own machine.',
        ],
      },
      {
        heading: 'What has actually been tested',
        paragraphs: [
          'The maintainer confirmed a successful end-to-end session with Sony PS Remote Play and a live PS5. Verified pads include the EvoFox Elite X2 on its dongle and the Ant Esports GP400 in both XInput and PS4/HID modes, with buttons, sticks, triggers and rumble working.',
          'The limits matter just as much. This is DualShock 4 emulation, so there are no DualSense adaptive triggers or advanced haptics, and a pad without a touch surface cannot produce real touchpad gestures. Compatibility with every controller model on the market is not claimed.',
        ],
      },
      {
        heading: 'Setup in short',
        paragraphs: ['Full steps are in the repository README. The outline:'],
        bullets: [
          'Download the Windows x64 ZIP from the EvoBridge releases page and extract the whole folder somewhere writable.',
          'Install the usbip-win2 client tools (0.9.8.1 was tested) and, for double-input protection, HidHide (1.5.230 was tested).',
          'Connect the controller, close other mappers, run EvoBridge.exe, choose the device and start a session.',
          'Open PS Remote Play. Choose Stop in EvoBridge when you are done so the physical pad is restored.',
        ],
      },
    ],
    faqs: [
      { question: 'Can I use an Xbox controller with PS Remote Play on PC?', answer: 'Not directly, because Remote Play expects a Sony controller. A mapper that emulates a virtual DualShock 4, such as EvoBridge, lets an Xbox or XInput pad work with it.' },
      { question: 'Is EvoBridge free?', answer: 'Yes. The original EvoBridge code is MIT licensed and there is no subscription. It bundles the GPL-3.0 VIIPER backend unmodified, with its licence and source.' },
      { question: 'Does EvoBridge support DualSense features?', answer: 'No. It emulates a DualShock 4, so adaptive triggers and advanced haptics are not available. Standard rumble is forwarded where the physical pad supports it.' },
      { question: 'Will it work with my exact controller?', answer: 'Pads that report as XInput or are recognised by SDL are the best fit, and there is a guided mapping flow for others. Only the models listed in the README have recorded test results.' },
    ],
    related: [
      { path: '/services/custom-software-development', label: 'Custom software development' },
      { path: '/projects', label: 'BuiltbyGSV projects' },
    ],
    sources: [
      { label: 'EvoBridge source and releases (GitHub)', url: 'https://github.com/gurugsv7/EvoBridge' },
      { label: 'ViGEmBus repository (archived)', url: 'https://github.com/nefarius/ViGEmBus' },
      { label: 'VIIPER virtual controller backend', url: 'https://github.com/Alia5/VIIPER' },
      { label: 'HidHide', url: 'https://github.com/nefarius/HidHide' },
    ],
  },
  {
    slug: 'send-text-and-files-android-to-windows-without-cloud',
    path: '/insights/send-text-and-files-android-to-windows-without-cloud',
    title: 'Getting text and files from an Android phone to a Windows laptop, without the cloud',
    seoTitle: 'Android to Windows Clipboard & Files Without Cloud | BuiltbyGSV',
    description:
      'Stop emailing yourself. A fair comparison of Phone Link, Quick Share and WhatsApp-to-self, and how LocalDrop shares to the Windows clipboard over local Wi-Fi.',
    excerpt:
      'Emailing yourself, “message yourself” on WhatsApp and USB cables all work, slowly. Here is what the built-in options do well, where they fall short, and the local-only approach we built.',
    category: 'Open-source tools',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '7 min read',
    takeaway:
      'If you use a Samsung phone with Phone Link or Google’s Quick Share for Windows, try those first. If you want Android’s Share menu to land directly on the Windows clipboard, with no account or cloud relay, LocalDrop pairs once by QR code and sends over your own Wi-Fi or hotspot.',
    sections: [
      {
        heading: 'The real problem: the clipboard does not cross devices',
        paragraphs: [
          'Most transfers between a phone and a laptop are small: an OTP, an address, a link, a screenshot for a report. The usual workarounds, such as WhatsApp “message yourself”, email drafts or Telegram Saved Messages, route a two-second job through a cloud service and a second app, and leave copies of private text in chat history.',
          'What people actually want is simple: share on the phone, press Ctrl+V on the laptop.',
        ],
      },
      {
        heading: 'What the built-in options do well',
        paragraphs: [
          'Microsoft Phone Link offers cross-device copy and paste on supported phones, mainly Samsung models, with both devices signed in to the same Microsoft account. When it works it is the most seamless option, but one-way failures are a common complaint and image size has historically been limited.',
          'Google’s Quick Share for Windows moves files between Android and a PC nearby and can send text, but it works through its own app window, has a range limit of about five metres, and some options need a Google account.',
        ],
      },
      {
        heading: 'Where they fall short',
        bullets: [
          'Account requirements: Microsoft or Google sign-in on both sides.',
          'Phone model limits: the deepest clipboard integration is reserved for specific brands.',
          'Text arrives in an app window instead of directly on the clipboard, so there is still a copy step.',
          'Behaviour on public Wi-Fi, office networks and phone hotspots can be unpredictable.',
        ],
        paragraphs: [],
      },
      {
        heading: 'The local-only approach: LocalDrop',
        paragraphs: [
          'LocalDrop is a small open-source clipboard bridge we built with a Rust core, native Kotlin on Android and Tauri 2 on Windows. You pair the phone and laptop once with a QR code. After that, Share → LocalDrop on Android puts the content on the Windows clipboard and you press Ctrl+V.',
          'Text arrives as real Unicode text. A single supported image (PNG, JPEG, WebP, BMP) arrives as actual clipboard pixels plus the original file. Multiple images, videos and other files arrive as file references that can be pasted wherever the destination accepts them.',
          'Transfers stay on the local network, with no cloud relay, accounts or analytics. Pairing is tied to the key rather than the network, so it keeps working on any Wi-Fi the two devices share, or when the laptop joins the phone’s hotspot.',
        ],
      },
      {
        heading: 'The other direction, and the honest limits',
        paragraphs: [
          'From Windows 0.3.1, you can copy on the laptop and tap Receive on Android, including from a home-screen widget, and received images and videos are saved to a LocalDrop album on Android 10 and later.',
          'It is a development preview: the Windows executable is unsigned, the APK is development-signed, and it has not been through a security audit. It is not a Windows Share-panel target yet, and HEIC, AVIF and GIF stay as files rather than becoming clipboard images. Windows Firewall must allow it, and new networks are often classed as Public.',
        ],
      },
    ],
    faqs: [
      { question: 'How do I copy text from Android and paste it on Windows?', answer: 'Phone Link’s cross-device copy and paste works on supported phones with a Microsoft account. Without an account, a local bridge such as LocalDrop sends Android shares straight to the Windows clipboard over Wi-Fi.' },
      { question: 'Does LocalDrop upload anything to the internet?', answer: 'No. Transfers go directly between paired devices on the local network. There is no cloud relay, account or analytics service.' },
      { question: 'Do I need the same Wi-Fi network?', answer: 'The devices need a network path to each other: the same Wi-Fi, or the laptop connected to the phone’s hotspot. Pairing survives network changes.' },
      { question: 'Is LocalDrop safe for sensitive data?', answer: 'Traffic stays local and pairing uses a key exchanged by QR code, but it is an early preview, not an audited security product. Keep the pairing QR private.' },
    ],
    related: [
      { path: '/services/custom-software-development', label: 'Custom software development' },
      { path: '/services/automation', label: 'Automation and integrations' },
    ],
    sources: [
      { label: 'LocalDrop source and releases (GitHub)', url: 'https://github.com/gurugsv7/localdrop' },
      { label: 'Microsoft: transfer content between devices with Phone Link', url: 'https://support.microsoft.com/en-us/help/4539429' },
      { label: 'Google: share files between Android and Windows with Quick Share', url: 'https://support.google.com/android/answer/13801258?hl=en' },
    ],
  },
  {
    slug: 'clip-livestream-highlights-into-shorts-locally',
    path: '/insights/clip-livestream-highlights-into-shorts-locally',
    title: 'Turning livestream highlights into Shorts without scrubbing hours of VOD',
    seoTitle: 'Clip Livestream Highlights into Shorts Automatically | BuiltbyGSV',
    description:
      'How rolling buffers, chat spikes, laughter detection and Whisper captions find stream highlights, and how LiveClip AI does it locally with no paid APIs.',
    excerpt:
      'Clippers lose most of their time hunting for the moment, not editing it. Here is how highlight detection works, what signals are reliable, and the local tool we built around them.',
    category: 'AI & automation',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Don’t record everything and search later. Keep a short rolling buffer per stream, protect only the moments that chat, audio or speech flags, and cut each kept moment to its strongest 15 to 30 seconds with word-timed captions. LiveClip AI does this on your own PC, for up to four streams at once.',
    sections: [
      {
        heading: 'Why clipping is slow',
        paragraphs: [
          'A clipper following four streamers can easily face sixteen hours of footage a day. Watching it back to find thirty good seconds is the expensive part; the editing itself takes minutes.',
          'Recording everything at full quality also fills a disk quickly, and by the time a VOD is available, the moment has often already been clipped by someone else.',
        ],
      },
      {
        heading: 'Signals that actually predict a highlight',
        paragraphs: ['No single signal is enough. The useful ones, roughly in order of reliability:'],
        bullets: [
          'Viewer clips: when viewers clip a moment on Twitch, that is a strong human vote.',
          'Crowd requests: several different chatters asking for a clip within seconds.',
          'Chat rate spikes measured against that channel’s normal pace, plus reaction-style messages and copy-paste spam.',
          'Sound events such as laughter, screams and cheering, while ignoring loud game noise like gunfire and music.',
          'Loudness compared with the streamer’s own baseline, and live speech recognition for phrases like “no way” or “let’s go”.',
        ],
      },
      {
        heading: 'The rolling-buffer approach',
        paragraphs: [
          'LiveClip AI keeps a short rolling buffer of original-quality footage per stream, around 170 MB for three minutes at 1080p60. Footage is deleted as it ages unless a signal or a manual save protects it, which keeps disk use bounded over hours of monitoring.',
          'Near-misses are not thrown away immediately: lower-scoring candidates go to a capped “Maybe” pool you can rescue clips from, with the lowest scores evicted first.',
        ],
      },
      {
        heading: 'From moment to a postable reel',
        paragraphs: [
          'Each kept clip is transcribed with Whisper and cut automatically to the densest 15 to 30 seconds around the peak, with silences over a second removed. Captions use real word timestamps, sit inside the platform safe area and highlight the active word.',
          'You review clips in a queue sorted by score, approve or reject with one key, adjust layout (smart crop, facecam over gameplay, or letterbox) and export a 1080×1920 MP4 with an SRT file.',
        ],
      },
      {
        heading: 'Local, and what that costs you',
        paragraphs: [
          'Recording, analysis, editing and export need no cloud services, paid APIs or social accounts. On Windows it uses NVIDIA NVENC for exports and CUDA Whisper when available; on Apple Silicon it uses VideoToolbox and CPU Whisper.',
          'The trade-off is hardware: it was built and tuned on an RTX 4060 laptop with 16 GB of RAM, and a weaker machine will monitor fewer streams comfortably.',
        ],
      },
      {
        heading: 'Permission comes first',
        paragraphs: [
          'A tool that makes clipping fast does not change who owns the footage. Clip and repost only streams you have the streamer’s permission to use, typically as their editor or through a clipping programme they run, and follow each platform’s rules.',
        ],
      },
    ],
    faqs: [
      { question: 'How do clippers find highlights in long streams?', answer: 'The efficient way is live detection: chat rate spikes, viewer clips, laughter or shouting, and speech cues flag moments as they happen, so nobody has to rewatch the VOD.' },
      { question: 'Does LiveClip AI need an internet API or subscription?', answer: 'No paid APIs are needed. It runs locally. Optional free keys, such as a Twitch app ID or YouTube API key, improve chat and viewer-clip signals.' },
      { question: 'How long should a livestream Short be?', answer: 'LiveClip cuts to the strongest 15 to 30 seconds by default, with the hook on screen from the first frame. The maximum is adjustable.' },
      { question: 'Can I repost any streamer’s clips?', answer: 'Only with permission. The footage belongs to the streamer and is governed by the platform’s terms.' },
    ],
    related: [
      { path: '/services/ai-solutions', label: 'AI solutions' },
      { path: '/insights/reel-press-workflow', label: 'How we made a reel without a video editor' },
      { path: '/projects/reelcut-ai-video-editor', label: 'ReelCut AI video editor case study' },
    ],
    sources: [
      { label: 'LiveClip AI source (GitHub)', url: 'https://github.com/gurugsv7/liveclip-ai' },
    ],
  },
  {
    slug: 'organise-family-medical-records-india',
    path: '/insights/organise-family-medical-records-india',
    title: 'Keeping a family’s medical records in order in India',
    seoTitle: 'Organise Family Medical Records & Prescriptions in India | BuiltbyGSV',
    description:
      'A practical system for prescriptions, lab reports and discharge summaries, how ABHA fits in, and what a patient-owned medical record app must get right.',
    excerpt:
      'Most families carry a plastic folder of prescriptions to every appointment. Here is a better system you can start today, where ABHA helps and where it does not, and what we learned building MediFace.',
    category: 'Healthcare & records',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '9 min read',
    takeaway:
      'Keep the original of every document, record a few facts from each (date, diagnosis, medicines, allergies, follow-up), and bring a one-page summary of changes since the last visit. ABHA can link records from participating facilities, but a patient-held copy of paper and WhatsApp-delivered reports is still needed.',
    sections: [
      {
        heading: 'Why records go missing',
        paragraphs: [
          'Indian patients often see several doctors across private clinics, government hospitals and labs. Prescriptions are on paper, lab reports arrive as WhatsApp PDFs, and discharge summaries sit in a cupboard. When an elderly parent is admitted somewhere new, the most important information, such as current medicines and allergies, is the hardest to find.',
          'Doctors repeat tests because earlier results cannot be produced, and medicine changes made by one doctor are not visible to the next.',
        ],
      },
      {
        heading: 'A system you can start today',
        bullets: [
          'One folder per family member, paper and digital, with documents in date order.',
          'Photograph every paper document flat, in good light, the day you receive it.',
          'Keep a short running list per person: current medicines with dose, known allergies, major diagnoses and procedures, and the date of each.',
          'Before each visit, write down what changed since the last one and the two or three questions you need answered.',
          'Never discard the original. A typed summary is a convenience; the signed document is the evidence.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Where ABHA helps, and its current limits',
        paragraphs: [
          'The Ayushman Bharat Health Account (ABHA) lets records from participating hospitals, labs and clinics be linked to a health ID, with access controlled by patient consent. Government figures put linked records in the crores, and it is worth creating one for each family member.',
          'Independent research and reporting point to the gaps: adoption depends on whether your providers participate, consent requests can be confusing for less digitally confident patients, and records from paper-based clinics are not captured. A personal copy is still necessary.',
        ],
      },
      {
        heading: 'What a patient-owned record app must get right',
        paragraphs: ['From building MediFace, our continuity-of-care product currently in development, the requirements that matter most are not features but safeguards:'],
        bullets: [
          'The original document is always kept and always one tap away from any extracted fact.',
          'Text read by OCR is never treated as clinical truth. The patient confirms each fact against the page before it enters the timeline.',
          'Unconfirmed facts stay excluded rather than guessed.',
          'Sharing with a doctor or relative is read-only and time-limited, and can be revoked.',
          'It supports the languages prescriptions are actually written in. MediFace reads English and Tamil locally.',
        ],
      },
      {
        heading: 'What MediFace is, and is not',
        paragraphs: [
          'MediFace turns photographed or uploaded records into a confirmed timeline and a doctor-visit summary with medicine differences, unresolved questions and links to the source pages. Originals are stored privately per owner, and invited readers see only confirmed facts.',
          'It is not a diagnosis or treatment system, and handwriting recognition and production clinical review are still in progress. We publish this as a working approach, not a finished medical product.',
        ],
      },
    ],
    faqs: [
      { question: 'What medical records should I keep for my parents?', answer: 'Prescriptions, lab and imaging reports, discharge summaries, vaccination records and a current list of medicines and allergies. Keep originals and a dated photo of each.' },
      { question: 'Does ABHA store all my medical records?', answer: 'It links records from participating providers with your consent. Records from clinics that are not connected, and paper documents, still need to be kept separately.' },
      { question: 'Can an app read handwritten prescriptions accurately?', answer: 'Not reliably enough to trust without review. Any extracted text should be checked against the original before it is relied on.' },
      { question: 'Is MediFace available to the public?', answer: 'MediFace is in active development with private records and invited readers. Contact BuiltbyGSV if you run a clinic or care programme interested in a pilot.' },
    ],
    related: [
      { path: '/clinic-website-development-karaikal', label: 'Clinic websites in Karaikal' },
      { path: '/projects/thaai-clinic-website', label: 'Thaai Clinic patient-journey prototype' },
      { path: '/services/custom-software-development', label: 'Custom healthcare software' },
    ],
    sources: [
      { label: 'Ayushman Bharat Digital Mission (ABDM)', url: 'https://abdm.gov.in/' },
      { label: 'BMC Health Services Research: ABDM adoption study (2026)', url: 'https://link.springer.com/article/10.1186/s12913-026-14314-7' },
    ],
  },
  {
    slug: 'who-owns-your-website-domain-hosting-code',
    path: '/insights/who-owns-your-website-domain-hosting-code',
    title: 'Who really owns your website? Domain, hosting and code',
    seoTitle: 'Who Owns Your Website? Domain & Code Ownership in India | BuiltbyGSV',
    description:
      'How to check who controls your domain, hosting and code, how to get your .in domain back from a previous web designer, and what to put in the contract next time.',
    excerpt:
      'The most expensive website problem we see is not design. It is a business that cannot change its own site because a former developer controls the domain. Here is how to check and fix it.',
    category: 'Planning guide',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Your business should be the registrant of its domain, hold the login to the registrar and hosting accounts, and receive the source code at handover. For a .in domain, the registrar must give the registrant the transfer (auth) code on request; NIXI, the registry, will not change records directly.',
    sections: [
      {
        heading: 'Why this happens so often',
        paragraphs: [
          'Many small businesses get their first website as a bundle: the designer buys the domain, hosts the site and maintains it. Years later the designer is unreachable, the renewal lapses, or the business wants to move, and discovers that the domain was registered in someone else’s name or account.',
          'Nobody intends harm in most cases. It is simply faster for the designer to buy everything on their own account, and nobody writes down who owns what.',
        ],
      },
      {
        heading: 'A ten-minute ownership check',
        bullets: [
          'Look up your domain in a WHOIS or RDAP tool to see the sponsoring registrar. For .in domains the registrant contact details must be accurate; proxy ownership is not permitted.',
          'Ask for the registrar account login. If you do not have it, you do not control the domain.',
          'Find out where the site is hosted and whose card pays for it.',
          'Check who owns the Google Business Profile, Search Console property and analytics account.',
          'Ask whether you have a copy of the source code or, for WordPress, a full backup of files and database.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Getting a .in domain back',
        paragraphs: [
          'If you are the registrant, ask the current registrar, or the person who controls the registrar account, to remove the transfer lock and give you the auth code. Registrars are contractually required to provide it to the registrant. The .IN registry advises that changes go through the registrar, not the registry.',
          'Once you start the transfer at a new registrar, it completes within five days unless the losing registrar rejects it. Transfers are not allowed in the first 60 days after registration. After transferring, change the auth code.',
          'If the domain is registered in the designer’s name rather than yours, you need their cooperation to change the registrant first. Ask politely, in writing, and keep records.',
        ],
      },
      {
        heading: 'What to put in your next website agreement',
        bullets: [
          'The domain is registered in the business’s name and the business holds the registrar login.',
          'Hosting, email and analytics accounts are created in the business’s name, with the developer added as a user.',
          'Source code, database and all accounts are handed over at the end of the project with written documentation.',
          'Renewal dates and who pays for each renewal are listed in one place.',
        ],
        paragraphs: [],
      },
      {
        heading: 'How we handle it',
        paragraphs: [
          'At BuiltbyGSV, source code, database, domain and hosting accounts are transferred to the client at handover, with documentation. Nothing stops a client moving to another developer afterwards. Our pricing and FAQ pages spell this out before any project starts.',
        ],
      },
    ],
    faqs: [
      { question: 'My web designer registered my domain. Do I own it?', answer: 'You own it only if you are listed as the registrant and can control it at the registrar. Check WHOIS and ask for the registrar account login.' },
      { question: 'How do I transfer a .in domain to another registrar?', answer: 'Unlock the domain and get the auth code from the current registrar, then start the transfer at the new registrar. It completes within five days unless rejected.' },
      { question: 'Can NIXI give me my auth code?', answer: 'No. NIXI does not issue auth codes to registrants. Your current registrar must provide it on request.' },
      { question: 'Should I get the source code of my website?', answer: 'Yes. Ask for the code, database and documentation at handover so another developer can maintain the site if needed.' },
    ],
    related: [
      { path: '/pricing', label: 'Project pricing and what is included' },
      { path: '/faq', label: 'Frequently asked questions' },
      { path: '/compare/freelance-developer-vs-web-development-agency', label: 'Freelancer, agency or studio?' },
      { path: '/insights/website-project-brief-template', label: 'Website project brief template' },
    ],
    sources: [
      { label: '.IN Registry: domain name transfers', url: 'https://registry.in/domainnametransfers' },
      { label: '.IN Registry: frequently asked questions', url: 'https://registry.in/faqs' },
    ],
  },
  {
    slug: 'compare-website-quotes-india',
    path: '/insights/compare-website-quotes-india',
    title: 'How to compare three website quotes that look nothing alike',
    seoTitle: 'How to Compare Website Development Quotes in India | BuiltbyGSV',
    description:
      'Why one developer quotes ₹8,000, another ₹50,000 and a third a monthly fee, and a line-by-line method to compare website quotes fairly before you choose.',
    excerpt:
      'One listing says “from ₹8,000, live in seven days”, another quotes per month, a third asks for a discovery call. They are rarely quoting the same thing. Here is how to make them comparable.',
    category: 'Planning guide',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '7 min read',
    takeaway:
      'Convert every quote into the same shape: what pages and features are included, who writes the content, what happens after launch, who owns the accounts, and the total cost over two years. The cheapest quote is often the one with the most exclusions.',
    sections: [
      {
        heading: 'Why the numbers vary so much',
        paragraphs: [
          'When we reviewed listings for web developers in Karaikal, Puducherry and Thanjavur, prices were shown in at least three incompatible ways: fixed project prices from around ₹8,000, monthly fees, and hourly rates. Some promised a live site within seven working days of receiving content, which quietly moves the hardest part, the content, onto you.',
          'None of these is dishonest by itself. They simply describe different products: a template filled in quickly, an ongoing rental, or a custom build.',
        ],
      },
      {
        heading: 'Put every quote into the same table',
        bullets: [
          'Scope: the exact list of pages, forms, integrations (WhatsApp, payments, booking) and languages.',
          'Content: who writes text, takes photos and prepares product data.',
          'Build: template, page builder or custom code, and how fast it loads on a mid-range Android phone.',
          'After launch: hosting, SSL, backups, security updates and small edits, and their yearly cost.',
          'Ownership: whose name the domain, hosting and code are in.',
          'Search basics: unique page titles, a sitemap, Search Console setup and Google Business Profile help.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Calculate the two-year cost',
        paragraphs: [
          'A ₹8,000 site with a ₹6,000 yearly renewal and paid edits can cost more over two years than a ₹25,000 site with hosting included and a handful of edits per year. A monthly fee that includes everything can be good value, but check whether the site disappears if you stop paying.',
          'Add the build price, two years of hosting, domain and maintenance, and a realistic estimate of paid changes. Compare that number, not the headline.',
        ],
      },
      {
        heading: 'Questions that reveal the real quote',
        bullets: [
          'Can you show me a live site you built, on my phone, not a screenshot?',
          'Who will actually build it, and can I talk to them during the project?',
          'What exactly is not included in this price?',
          'If I want to move to another developer next year, what do I receive?',
          'How will the site be found for the services and town I care about?',
        ],
        paragraphs: [],
      },
      {
        heading: 'Red flags',
        bullets: [
          'Guaranteed first-page rankings or “top 3 on Google” promises.',
          'No written scope, or a scope that only says “5 pages”.',
          'The domain bought in the developer’s name.',
          'Reviews and portfolio items that cannot be checked anywhere else.',
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      { question: 'How much should a small business website cost in India?', answer: 'It depends on scope. Simple template sites can start under ₹10,000, while custom sites with booking, payments or multiple languages cost several times that. Compare two-year total cost, not the headline.' },
      { question: 'Is a monthly website plan better than a one-time payment?', answer: 'It can be, if it includes hosting, updates and edits. Check what happens to the site and the domain if you stop paying.' },
      { question: 'Why do some developers ask for a discovery call before quoting?', answer: 'Because custom work cannot be priced without knowing the scope. A good discovery call should end with a written scope you can compare against other quotes.' },
    ],
    related: [
      { path: '/pricing', label: 'BuiltbyGSV pricing' },
      { path: '/insights/website-cost-karaikal', label: 'What a website costs in Karaikal' },
      { path: '/insights/who-owns-your-website-domain-hosting-code', label: 'Who owns your website?' },
      { path: '/compare/freelance-developer-vs-web-development-agency', label: 'Freelancer, agency or studio?' },
    ],
  },
  {
    slug: 'website-speed-on-budget-android-phones',
    path: '/insights/website-speed-on-budget-android-phones',
    title: 'Why your website feels slow on your customers’ phones',
    seoTitle: 'Make Your Website Fast on Budget Android Phones | BuiltbyGSV',
    description:
      'Most Indian customers browse on mid-range Android phones over mobile data. What Core Web Vitals measure, why small-business sites are slow, and fixes in order.',
    excerpt:
      'The site loads instantly on the office laptop and crawls on a customer’s phone. Here is why that happens, how to measure it properly and the fixes that make the biggest difference.',
    category: 'Search visibility',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '7 min read',
    takeaway:
      'Test on a mid-range Android phone over mobile data, not office Wi-Fi. Aim for the “good” Core Web Vitals thresholds: Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint within 200 milliseconds and Cumulative Layout Shift below 0.1. Oversized images, heavy page builders and third-party scripts cause most failures.',
    sections: [
      {
        heading: 'Your laptop is the wrong test device',
        paragraphs: [
          'Business owners usually check their website on a fast laptop over good Wi-Fi. Their customers open it from a WhatsApp link on a mid-range Android phone with a weaker processor, on mobile data. The same page can take several times longer there, and the processor, not just the network, is often the bottleneck.',
        ],
      },
      {
        heading: 'What Google actually measures',
        paragraphs: [
          'Core Web Vitals are field measurements from real Chrome users. Largest Contentful Paint (LCP) measures when the main content appears; Interaction to Next Paint (INP) measures how quickly the page responds to taps; Cumulative Layout Shift (CLS) measures how much the layout jumps while loading.',
          'They are part of how Google assesses page experience. They will not lift a page with weak content, but a slow page loses visitors before they read anything.',
        ],
      },
      {
        heading: 'The usual causes on small-business sites',
        bullets: [
          'Hero images uploaded straight from a camera or phone at several megabytes.',
          'Page builders and themes that load large amounts of JavaScript and CSS on every page.',
          'Chat widgets, sliders, multiple analytics tags and social embeds loaded before content.',
          'Web fonts loaded from several families and weights.',
          'Cheap shared hosting with slow server response.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Fixes, in the order we apply them',
        bullets: [
          'Resize and compress images, serve WebP or AVIF, and give every image a width and height so the layout does not jump.',
          'Remove plugins and scripts the business does not use. Load chat and social widgets only after interaction.',
          'Limit fonts to one or two families and the weights actually used.',
          'Pre-render or statically generate pages that do not change often, so the HTML arrives ready to show.',
          'Re-measure with PageSpeed Insights on mobile and, after a few weeks, check the field data in Search Console.',
        ],
        paragraphs: [],
      },
      {
        heading: 'We publish our own numbers',
        paragraphs: [
          'Our trust page links dated Lighthouse reports, on mobile and desktop, for this website and the public projects we have built, whatever the scores. Lab tests are a snapshot, not a ranking, but they are a fair way to compare developers: ask any developer you are considering for the same.',
        ],
      },
    ],
    faqs: [
      { question: 'What is a good page speed score?', answer: 'Focus on Core Web Vitals rather than the single score: LCP within 2.5 seconds, INP within 200 milliseconds and CLS below 0.1 for most visits.' },
      { question: 'Does website speed affect Google ranking?', answer: 'Page experience is one of many signals. It rarely outweighs relevant content, but slow pages lose visitors and enquiries regardless of ranking.' },
      { question: 'Why is my WordPress site slow on mobile?', answer: 'Usually large images, a heavy theme or page builder, and many plugins loading scripts on every page. Remove what you do not use and optimise images first.' },
    ],
    related: [
      { path: '/trust', label: 'Dated website audits' },
      { path: '/seo-services-karaikal', label: 'SEO services in Karaikal' },
      { path: '/services/web-development', label: 'Website development' },
      { path: '/insights/why-one-page-websites-stop-ranking', label: 'Why one-page websites stop ranking' },
    ],
    sources: [
      { label: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
      { label: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/' },
    ],
  },
  {
    slug: 'mvp-development-cost-india',
    path: '/insights/mvp-development-cost-india',
    title: 'What an MVP really costs to build in India, and what moves the price',
    seoTitle: 'MVP Development Cost in India (2026): What Drives It | BuiltbyGSV',
    description:
      'Published MVP prices in India vary tenfold. The six scope decisions that drive cost, how freelancers, agencies and studios differ, and how to get comparable quotes.',
    excerpt:
      'Search for MVP costs and you will find ranges from a few lakh to two crore. Here is why the ranges are so wide and how to work out what your first release should cost.',
    category: 'Product',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Published figures for an Indian MVP run from roughly ₹2–6 lakh with freelancers to ₹8–20 lakh with Tier-1 city agencies, but those numbers come mostly from vendors. Your cost is set by six decisions: platforms, roles and permissions, payments, integrations, AI features and how much is real versus manual behind the scenes.',
    sections: [
      {
        heading: 'Why published ranges are useless on their own',
        paragraphs: [
          'Most MVP pricing articles are written by development companies, and the ranges they publish reflect what they sell. One guide puts a production MVP from an Indian team at a few thousand US dollars; another lists ₹8 to 20 lakh for agencies in Bengaluru, Mumbai, Delhi NCR and Pune, and ₹2 to 6 lakh for freelancers.',
          'Both can be true. They describe different scopes, team sizes and levels of polish. The useful question is not “what does an MVP cost” but “what does my first release need”.',
        ],
      },
      {
        heading: 'The six decisions that drive cost',
        bullets: [
          'Platforms: a responsive web app costs far less than separate iOS and Android apps. Start on the web unless a native capability is essential.',
          'Roles: every extra user type (admin, vendor, customer, reviewer) adds screens, permissions and testing.',
          'Payments: one-time payments are simple; subscriptions, refunds, split payouts and GST invoices are not.',
          'Integrations: each external API adds build time and an ongoing maintenance dependency.',
          'AI features: a narrow, well-defined AI step is affordable; open-ended “chat with everything” features are not, and add running costs.',
          'Automation versus manual: many successful MVPs handle approvals, onboarding or matching manually at first.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Freelancer, agency or studio',
        paragraphs: [
          'A freelancer is usually cheapest and suits a tight, well-specified build, with continuity risk if they become unavailable. Larger agencies cost most and suit multi-team projects with contractual cover. A small product studio sits between, keeping product thinking and engineering in the same few people.',
          'Our comparison page goes through each option honestly, including when not to hire us.',
        ],
      },
      {
        heading: 'How to get a quote you can compare',
        bullets: [
          'Write one sentence describing the user and the job the first release must do for them.',
          'List the screens and the user roles, and mark each feature as launch, later or unsure.',
          'Ask each vendor for a fixed-scope quote against that list, plus estimated monthly running costs.',
          'Ask who will build it and what you receive at handover: code, database, accounts and documentation.',
        ],
        paragraphs: [],
      },
      {
        heading: 'What we have shipped as first releases',
        paragraphs: [
          'Examples on this site include KAMAYUU, a browser card game with a dedicated rules engine and realtime multiplayer, and S4SkillUp, a career-preparation workspace for students. Each case study describes the scope that shipped and separates what is verified from what is not.',
        ],
      },
    ],
    faqs: [
      { question: 'How much does an MVP cost in India?', answer: 'Published ranges run from about ₹2–6 lakh with freelancers to ₹8–20 lakh with Tier-1 agencies, but scope decisions such as platforms, roles, payments and integrations matter more than the vendor type.' },
      { question: 'How long does it take to build an MVP?', answer: 'A focused web MVP typically takes six to ten weeks. Native apps, complex payments and many integrations extend that.' },
      { question: 'Should my MVP be a mobile app or a web app?', answer: 'Start with a responsive web app unless your core feature needs native capabilities. It is faster and cheaper to change while you learn.' },
    ],
    related: [
      { path: '/mvp-development-company-bengaluru', label: 'MVP development in Bengaluru' },
      { path: '/insights/mvp-scope-mistakes-founders-make', label: 'The scope mistakes that sink a first release' },
      { path: '/compare/freelance-developer-vs-web-development-agency', label: 'Freelancer, agency or studio?' },
      { path: '/projects/kamayuu-card-game', label: 'KAMAYUU case study' },
      { path: '/projects/s4skillup', label: 'S4SkillUp case study' },
    ],
    sources: [
      { label: 'eChai Ventures: realistic MVP cost in India', url: 'https://echai.ventures/startingup/finding-developers/how-much-should-an-mvp-realistically-cost-to-build-in-india' },
      { label: 'Codingclave: MVP development cost in India 2026', url: 'https://codingclave.com/blog/mvp-development-cost-india-2026' },
    ],
  },
];
