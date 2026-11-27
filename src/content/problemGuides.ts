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
  {
    slug: 'whatsapp-business-app-vs-api-clinics-shops',
    path: '/insights/whatsapp-business-app-vs-api-clinics-shops',
    title: 'WhatsApp Business app or WhatsApp API? A guide for clinics and shops',
    seoTitle: 'WhatsApp Business App vs API for Clinics & Shops | BuiltbyGSV',
    description:
      'When the free WhatsApp Business app is enough, when the API is worth paying for, what per-message pricing in India means for your bill, and what to automate first.',
    excerpt:
      'Most clinics and shops in Karaikal and Thanjavur already run on WhatsApp. The question is whether the free app is still enough, or whether reminders and order updates need the API.',
    category: 'AI & automation',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Stay on the free WhatsApp Business app while one or two people can answer every chat from a phone. Move to the WhatsApp Business Platform (API) when you need automated reminders, several staff on one number, or messages triggered by your booking or billing software. Since July 2025 the API is billed per delivered template message, so budget by message type.',
    sections: [
      {
        heading: 'What the free app does well',
        paragraphs: [
          'The WhatsApp Business app gives a business profile, a catalogue, quick replies, labels, a greeting message and an away message, all free on one phone plus linked devices. For a clinic receptionist or a shop owner handling a few dozen chats a day, that covers most needs.',
          'Its limits appear with volume and process: there is no proper way to trigger messages from your own software, no structured hand-off between staff, and broadcast lists only reach people who saved your number.',
        ],
      },
      {
        heading: 'Signs you have outgrown the app',
        bullets: [
          'Staff are copying appointment times or order numbers into WhatsApp by hand every day.',
          'No-shows or missed payments are costing more than an hour of someone’s time each week.',
          'Several people need to answer the same number without sharing one phone.',
          'You want messages to go out automatically when something happens in your system: a booking, a dispatch, a lab report ready.',
        ],
        paragraphs: [],
      },
      {
        heading: 'How API pricing works in India',
        paragraphs: [
          'The WhatsApp Business Platform is used through Meta directly or through a provider (a business solution provider) that adds a dashboard. Since 1 July 2025 Meta charges per delivered template message, with the rate depending on the category: marketing, utility or authentication. Replies within a customer-service conversation the customer starts are treated differently from templates you initiate.',
          'Published third-party summaries for India mostly give around ₹0.86 per marketing message and around ₹0.12 for utility and authentication messages in 2026, but providers quote different figures and add their own fees and GST. Check Meta’s current rate card and your provider’s plan before budgeting.',
          'The practical consequence: appointment reminders and order updates (utility) are cheap; promotional broadcasts (marketing) cost several times more and also annoy customers if overused.',
        ],
      },
      {
        heading: 'What to automate first',
        bullets: [
          'Appointment confirmations and a reminder the day before, with a reply option to reschedule.',
          'Order, dispatch and delivery updates triggered from your billing or order system.',
          '“Report ready” or “prescription ready” notifications, without attaching sensitive documents in the message itself.',
          'Payment reminders with a payment link, sent once, not daily.',
        ],
        paragraphs: [
          'Leave open-ended questions to a human at first. An AI assistant can draft replies or answer opening hours and directions later, once you know which questions actually repeat.',
        ],
      },
      {
        heading: 'Rules that keep your number healthy',
        bullets: [
          'Collect clear opt-in before sending template messages, and honour opt-outs immediately.',
          'Keep templates specific and useful. Messages that many people block or report can lower your number’s quality rating and sending limits.',
          'Do not send medical details or full documents over WhatsApp unless the patient has agreed; send a notice and let them collect or download securely.',
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      { question: 'Is the WhatsApp Business app free?', answer: 'Yes. The app itself is free. The WhatsApp Business Platform (API) is billed per delivered template message, plus any provider fees.' },
      { question: 'How much does WhatsApp API cost per message in India?', answer: 'It depends on the category. 2026 summaries mostly quote about ₹0.86 for marketing and about ₹0.12 for utility and authentication messages, before provider fees and GST. Confirm on Meta’s current rate card.' },
      { question: 'Can I use the same number on the app and the API?', answer: 'A number is registered on one or the other. Moving a number to the API removes it from the app, so plan the switch and inform staff first.' },
      { question: 'Can WhatsApp send automatic appointment reminders?', answer: 'Yes, through the API using approved utility templates triggered by your booking system.' },
    ],
    related: [
      { path: '/ai-automation-agency-karaikal', label: 'AI automation in Karaikal' },
      { path: '/ai-automation-agency-thanjavur', label: 'AI automation in Thanjavur' },
      { path: '/insights/ai-automation-small-business-tamil-nadu', label: 'Where AI automation actually pays' },
      { path: '/clinic-website-development-karaikal', label: 'Clinic websites in Karaikal' },
    ],
    sources: [
      { label: 'Meta: pricing on the WhatsApp Business Platform', url: 'https://developers.facebook.com/docs/whatsapp/pricing' },
      { label: 'MyOperator: WhatsApp API pricing in India (2026)', url: 'https://myoperator.com/blog/whatsapp-business-api-pricing-india-2026' },
    ],
  },
  {
    slug: 'tamil-english-bilingual-website',
    path: '/insights/tamil-english-bilingual-website',
    title: 'Should your business website be in Tamil, English or both?',
    seoTitle: 'Tamil & English Bilingual Website: When It Pays | BuiltbyGSV',
    description:
      'When a Tamil version of your website brings real customers, how to structure a bilingual site so Google indexes both languages, and the mistakes that waste the effort.',
    excerpt:
      'Many customers in Tamil Nadu and Puducherry search in English but read more comfortably in Tamil. Here is how to decide, and how to build a second language properly instead of a translate button.',
    category: 'Search visibility',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '7 min read',
    takeaway:
      'Add Tamil pages when your customers would choose them: older patients, rural buyers, government-facing services, or anyone who already messages you in Tamil. Build each language as its own URL with human-checked text and hreflang links between them. A machine-translate widget does not create pages Google can index.',
    sections: [
      {
        heading: 'Who actually benefits from a Tamil version',
        paragraphs: [
          'Look at how customers already talk to you. If most WhatsApp messages and calls are in Tamil, if your customers include older people or rural families, or if you serve schools, clinics, temples or government programmes, Tamil pages usually earn their cost.',
          'If your buyers are mostly businesses, startups or customers outside Tamil Nadu, English remains the primary language and a Tamil version is a lower priority.',
        ],
      },
      {
        heading: 'Start with the pages that matter',
        paragraphs: ['You do not need to translate everything. The pages that convert:'],
        bullets: [
          'Home page with what you do, where you are and how to contact you.',
          'The two or three main service pages.',
          'Contact, timings, location and directions.',
          'A short FAQ in the words customers actually use.',
        ],
      },
      {
        heading: 'How to structure it so Google sees both languages',
        bullets: [
          'Give each language its own URL, for example /ta/ for Tamil pages, rather than switching language on the same URL with JavaScript.',
          'Add hreflang annotations so each page points to its other-language version (en-IN and ta-IN) and to itself.',
          'Set the html lang attribute correctly on each page and translate the title and meta description too.',
          'Link the language versions to each other visibly, and let visitors choose rather than redirecting them automatically by location.',
          'Use a Unicode Tamil web font that renders cleanly on budget Android phones and keep it to the weights you use.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Mistakes that waste the effort',
        bullets: [
          'A Google Translate widget: the translated text is not on any indexable page, and the quality shows.',
          'Literal translation of English marketing copy. Write how a customer would ask the question in Tamil, including common English words people really use.',
          'Tamil text inside images, which cannot be searched, read aloud or edited easily.',
          'Letting the Tamil pages fall out of date when prices or timings change in English.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Measuring whether it worked',
        paragraphs: [
          'In Search Console, filter performance by page to see impressions and clicks on the Tamil URLs, and watch which Tamil queries start appearing. Track enquiries that arrive from those pages separately for a few months before deciding whether to translate more.',
        ],
      },
    ],
    faqs: [
      { question: 'Does Google rank Tamil websites?', answer: 'Yes. Google indexes Tamil pages and shows them for Tamil queries. Each language version needs its own crawlable URL.' },
      { question: 'What is hreflang?', answer: 'An annotation that tells search engines which pages are language versions of each other, so the right version appears for the right searcher.' },
      { question: 'Is a website translation plugin enough?', answer: 'Not for search. Client-side translation widgets do not create indexable Tamil pages. Use separate, human-checked pages.' },
      { question: 'Should I use Tanglish on my website?', answer: 'For headings and calls to action, mixing in the English words customers really use is fine. Keep body text in clear, natural Tamil.' },
    ],
    related: [
      { path: '/seo-services-karaikal', label: 'SEO services in Karaikal' },
      { path: '/insights/local-seo-karaikal-business', label: 'Local SEO plan for Karaikal businesses' },
      { path: '/web-software-developer-thanjavur', label: 'Web development in Thanjavur' },
    ],
    sources: [
      { label: 'Google Search Central: localized versions of your pages', url: 'https://developers.google.com/search/docs/specialty/international/localized-versions' },
      { label: 'Google Search Central: managing multi-regional and multilingual sites', url: 'https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites' },
    ],
  },
  {
    slug: 'gst-invoices-and-payments-in-your-first-web-app',
    path: '/insights/gst-invoices-and-payments-in-your-first-web-app',
    title: 'Payments, subscriptions and GST invoices in your first web app',
    seoTitle: 'Payments, Subscriptions & GST Invoices in Indian Apps | BuiltbyGSV',
    description:
      'What an Indian MVP needs for payments: one-time versus recurring, RBI e-mandate rules, GST invoice fields, e-invoicing thresholds and what to postpone until later.',
    excerpt:
      'Payments look like a single feature on a roadmap and turn into five. Here is what an Indian first release actually needs, what the rules require, and what can safely wait.',
    category: 'Product',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '9 min read',
    takeaway:
      'Launch with one-time payments through a payment gateway’s hosted checkout and a correct GST invoice for every paid order. Add subscriptions only when the product proves people return, and design for RBI’s e-mandate rules: registration with additional authentication, and per-debit limits above which customers must authenticate again. Confirm tax treatment with your accountant.',
    sections: [
      {
        heading: 'Why payments are never one feature',
        paragraphs: [
          'A “payments” line on a roadmap usually hides checkout, failure handling, refunds, invoices, reconciliation with the gateway’s settlement reports and, for subscriptions, mandates, renewals and cancellations. Each needs screens, edge cases and testing.',
          'This is one of the main reasons first-release estimates grow. Deciding early which of these you genuinely need at launch keeps the scope honest.',
        ],
      },
      {
        heading: 'Start with hosted checkout and webhooks',
        bullets: [
          'Use the gateway’s hosted or embedded checkout rather than handling card details yourself. It keeps sensitive data off your servers.',
          'Treat the gateway’s server-to-server webhook as the source of truth for “paid”, not the browser redirect, which can fail on a weak connection.',
          'Make order fulfilment idempotent so a repeated webhook does not create a second order.',
          'Store the gateway’s payment ID against every order for refunds and reconciliation.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Subscriptions and RBI e-mandate rules',
        paragraphs: [
          'Recurring card and UPI AutoPay payments run on e-mandates. The customer registers the mandate once with additional factor authentication; later debits up to the per-transaction limit, ₹15,000 for most categories under the 2022 RBI framework, can run without a fresh OTP. Reports on RBI’s consolidated 2026 framework describe higher limits for some categories such as insurance premiums and mutual fund investments.',
          'For your product this means: build pre-debit notifications, handle mandate failures and cancellations gracefully, and offer a fallback to a one-time payment link. Check the gateway’s current documentation rather than relying on a summary.',
        ],
      },
      {
        heading: 'GST invoices',
        paragraphs: [
          'If you are GST-registered, every taxable sale needs a tax invoice with the required details: your name, address and GSTIN, a serial number, date, the customer’s details (and GSTIN for business customers), description, HSN or SAC code, taxable value, the tax rate and amounts split into CGST and SGST or IGST, and the place of supply.',
          'Place of supply decides whether CGST plus SGST or IGST applies, so collect the customer’s state at checkout. Generate invoices from the confirmed payment, number them sequentially, and never edit an issued invoice; issue a credit note instead.',
          'E-invoicing through the Invoice Registration Portal is mandatory once aggregate annual turnover exceeds ₹5 crore, and businesses at ₹10 crore and above must report invoices within 30 days. Most first releases are below these thresholds, but design invoice data so it can be sent to the IRP later.',
        ],
      },
      {
        heading: 'What can safely wait',
        bullets: [
          'Coupons and complex discount rules.',
          'Split payouts to vendors, which need marketplace-specific gateway products and agreements.',
          'Multiple currencies and international cards.',
          'Self-service plan upgrades and pro-rated billing.',
        ],
        paragraphs: ['None of this is legal or tax advice. Confirm your invoice format and tax treatment with a chartered accountant before launch.'],
      },
    ],
    faqs: [
      { question: 'Do I need GST registration to accept online payments?', answer: 'Payment gateways may onboard unregistered businesses, but if your turnover or business type requires registration you must register and issue GST invoices. Confirm with an accountant.' },
      { question: 'What is the RBI limit for recurring payments without OTP?', answer: 'Under the 2022 framework most recurring e-mandate debits up to ₹15,000 run without fresh authentication after registration. Some categories have higher limits under later rules.' },
      { question: 'When is GST e-invoicing mandatory?', answer: 'When aggregate annual turnover exceeds ₹5 crore in any financial year from 2017–18. Businesses at ₹10 crore and above must report e-invoices within 30 days.' },
      { question: 'Should my MVP support subscriptions?', answer: 'Only if recurring use is the core of the product. Many first releases validate demand with one-time or manual payments first.' },
    ],
    related: [
      { path: '/saas-development-company-bengaluru', label: 'SaaS development in Bengaluru' },
      { path: '/mvp-development-company-bengaluru', label: 'MVP development in Bengaluru' },
      { path: '/insights/mvp-development-cost-india', label: 'What an MVP costs in India' },
      { path: '/ecommerce-website-development-karaikal', label: 'Ecommerce development in Karaikal' },
    ],
    sources: [
      { label: 'RBI: processing of e-mandates for recurring transactions', url: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12341' },
      { label: 'Business Today: RBI e-mandate framework 2026', url: 'https://www.businesstoday.in/personal-finance/news/story/rbi-caps-recurring-payments-at-rs15000-without-otp-under-new-e-mandate-framework-526759-2026-04-21' },
      { label: 'Tally: e-invoicing threshold limit', url: 'https://tallysolutions.com/gst/e-invoicing-threshold/' },
    ],
  },
  {
    slug: 'google-business-profile-suspended-fix',
    path: '/insights/google-business-profile-suspended-fix',
    title: 'Google Business Profile suspended? Causes and how to appeal',
    seoTitle: 'Google Business Profile Suspended: Causes & Appeal Steps | BuiltbyGSV',
    description:
      'Why Google suspends business profiles, how a suspension differs from an unverified profile, what to fix before appealing, and the evidence that supports reinstatement.',
    excerpt:
      'A suspended profile disappears from Maps exactly when customers are looking. Most suspensions trace back to a handful of guideline problems. Fix those first, then appeal with evidence.',
    category: 'Search visibility',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Do not create a new profile. Read Google’s guidelines, fix anything that does not match them, usually the business name, address or category, then submit one appeal through Google’s official appeals process with real evidence of the business at that location.',
    sections: [
      {
        heading: 'Suspended, disabled or just unverified?',
        paragraphs: [
          'Google uses different states for different problems. An unverified profile has not completed verification yet. A suspended or disabled profile has been restricted for a suspected guideline or policy issue, and may disappear from Search and Maps. Content can also be removed individually, such as a photo or a review.',
          'The Business Profile manager and Google’s email usually tell you which applies. The fix and the appeal route depend on it.',
        ],
      },
      {
        heading: 'Common causes',
        bullets: [
          'Keywords added to the business name, such as “Best Dental Clinic Karaikal” instead of the real name on your signboard.',
          'An address the business does not genuinely staff, such as a virtual office, a co-working desk or a relative’s house.',
          'A service-area business showing a home address publicly.',
          'Duplicate profiles for the same location, often created by an agency or a previous owner.',
          'Categories that do not match what you actually do, or several edits made in quick succession.',
          'A problem with the Google account itself, or a profile managed by someone you no longer work with.',
        ],
        paragraphs: [],
      },
      {
        heading: 'What to fix before appealing',
        bullets: [
          'Make the name match your signboard, registration and invoices exactly.',
          'Correct the address, or hide it and set service areas if customers do not visit you.',
          'Choose the most accurate primary category and remove unrelated ones.',
          'Find and report duplicates instead of creating a new profile.',
          'Make sure your website shows the same name, address and phone number.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Appeal with evidence',
        paragraphs: [
          'Use the official appeal or reinstatement process linked from your profile or Google’s help pages. Submit once and wait; repeated appeals do not speed things up.',
          'Prepare evidence that the business operates at that location: the permanent signboard, a utility bill or registration document with the business name and address, and photos of the premises and equipment. Google sometimes asks for a continuous, unedited video showing the signage, the surroundings and proof you manage the business, such as unlocking the door or opening the counter.',
          'Registration documents such as a Udyam certificate or GST registration help show the business is real, but the name and address on them must match the profile.',
        ],
      },
      {
        heading: 'Preventing it next time',
        bullets: [
          'Make edits only when something genuinely changes, and one at a time.',
          'Keep ownership of the profile in an account the business controls, and add agencies as managers, not owners.',
          'Never buy reviews or offer incentives for them.',
        ],
        paragraphs: [],
      },
    ],
    faqs: [
      { question: 'Why was my Google Business Profile suspended?', answer: 'Usually a mismatch with Google’s guidelines: keywords in the name, an address the business does not staff, duplicates or unsuitable categories. Google does not always state the reason.' },
      { question: 'How long does a Google Business Profile appeal take?', answer: 'It varies. Many appeals are decided within days, but some take weeks. Submit once with complete evidence.' },
      { question: 'Should I create a new profile if mine is suspended?', answer: 'No. A new profile for the same business is a duplicate and can make the situation worse. Fix and appeal the existing one.' },
      { question: 'Can a web developer get my profile reinstated?', answer: 'Nobody can guarantee reinstatement. A developer can help correct your details and prepare evidence, but the appeal must come from the profile owner.' },
    ],
    related: [
      { path: '/insights/google-business-profile-setup-guide', label: 'Setting up Google Business Profile properly' },
      { path: '/insights/local-seo-karaikal-business', label: 'Local SEO plan for Karaikal businesses' },
      { path: '/seo-services-karaikal', label: 'SEO services in Karaikal' },
    ],
    sources: [
      { label: 'Google: fix suspended or disabled profiles', url: 'https://support.google.com/business/answer/4569145' },
      { label: 'Google: appeal Business Profile restrictions', url: 'https://support.google.com/business/answer/13597551' },
      { label: 'Google: guidelines for representing your business', url: 'https://support.google.com/business/answer/3038177' },
    ],
  },
  {
    slug: 'make-a-hackathon-project-shippable',
    path: '/insights/make-a-hackathon-project-shippable',
    title: 'Turning a hackathon project into something people can actually use',
    seoTitle: 'Make Your Hackathon Project Shippable: A Student Guide | BuiltbyGSV',
    description:
      'Most hackathon builds die the week after judging. A practical checklist for students to turn a demo into a deployed product and a stronger portfolio story.',
    excerpt:
      'A hackathon rewards a convincing demo. Real users need something else. Here is the gap between the two and a two-week plan to close it, written for college students in India.',
    category: 'Students & careers',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'After the hackathon, cut the project to the one flow that impressed judges, make that flow work for a stranger without your help, deploy it on a real URL, and write a README that explains the problem, what works and what does not. One finished, honest project beats five abandoned demos on a CV.',
    sections: [
      {
        heading: 'Why demos die after judging',
        paragraphs: [
          'Hackathon projects are optimised for a five-minute pitch: hard-coded data, a happy path that only works in the order you click, API keys in the code and a deployment that ran on one laptop. That is the right trade-off for a weekend, and the wrong one for anything after it.',
          'Recruiters and clients open the GitHub link. If it does not run, or the README is the hackathon pitch, the project counts against you rather than for you.',
        ],
      },
      {
        heading: 'Week one: make one flow real',
        bullets: [
          'Pick the single flow that best shows the idea and delete or hide everything else.',
          'Replace hard-coded and mocked data in that flow with real storage and real responses.',
          'Move secrets out of the code into environment variables, and rotate any key that was ever committed.',
          'Handle the obvious failures: empty input, slow network, an API that returns an error.',
          'Ask a friend who has never seen it to use it while you watch silently. Fix what confuses them.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Week two: ship and explain it',
        bullets: [
          'Deploy on a real URL. Free tiers from Vercel, Netlify, Render or Supabase are enough for a portfolio project.',
          'Rewrite the README: the problem in two sentences, a screenshot, how to run it, what works, what does not, and what you would build next.',
          'Remove inflated claims from the pitch deck. Statistics about the size of the problem are fine if cited; claims about impact you have not measured are not.',
          'Add a short case study to LinkedIn or your portfolio describing a real decision you made and why.',
        ],
        paragraphs: [],
      },
      {
        heading: 'What interviewers actually ask about',
        paragraphs: [
          'Interviewers rarely ask about the feature list. They ask what broke, what you would change, how you handled data or security, and what you personally built in a team project. A project you finished after the hackathon gives you real answers to all four.',
        ],
      },
      {
        heading: 'Use the free tools you already have',
        paragraphs: [
          'Student offers such as the GitHub Student Developer Pack cover hosting credits, domains and developer tools worth far more than a student budget. Our free tools guide lists the ones that are genuinely useful and how to claim them from an Indian college.',
          'If you want to work on shipped products alongside a studio, BuiltbyGSV runs six-month software and web engineering internships.',
        ],
      },
    ],
    faqs: [
      { question: 'Should I put hackathon projects on my resume?', answer: 'Yes, if the project runs, has a clear README and you can explain what you built. A broken link or unfinished demo is better left off.' },
      { question: 'How do I deploy a student project for free?', answer: 'Static and frontend projects deploy free on Vercel or Netlify; small backends and databases fit free tiers from Render or Supabase. Student developer packs add more credits.' },
      { question: 'What should a project README include?', answer: 'The problem, a screenshot, setup steps, what works, known limitations and next steps. Keep secrets and private data out of the repository.' },
    ],
    related: [
      { path: '/student', label: 'Free tools for college students' },
      { path: '/careers', label: 'Engineering internships at BuiltbyGSV' },
      { path: '/insights/mvp-scope-mistakes-founders-make', label: 'The scope mistakes that sink a first release' },
    ],
    sources: [
      { label: 'GitHub Student Developer Pack', url: 'https://education.github.com/pack' },
    ],
  },
  {
    slug: 'move-business-off-excel-and-paper-registers',
    path: '/insights/move-business-off-excel-and-paper-registers',
    title: 'When to move your business off Excel and paper registers',
    seoTitle: 'Moving a Business Off Excel & Paper Registers | BuiltbyGSV',
    description:
      'Signs your spreadsheets and paper registers are costing more than software would, what to try before custom software, and how to move without stopping daily work.',
    excerpt:
      'Excel and a paper register run thousands of businesses perfectly well, until they do not. Here is how to tell when you have crossed that line and how to move without disrupting the counter.',
    category: 'Planning guide',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Keep Excel while one person owns the file and mistakes are cheap. Move when several people edit the same records, when errors cost real money, or when you spend hours a week compiling the same report. Try a good off-the-shelf tool first; build custom software only for the workflow that makes your business different.',
    sections: [
      {
        heading: 'Excel is not the problem, until it is',
        paragraphs: [
          'Spreadsheets are flexible, familiar and free. For a single owner tracking stock, fees or appointments, they are often the right tool. The trouble starts when the business grows around the file: copies on different computers, a register that only one person understands, and a monthly report that takes a full day to assemble.',
        ],
      },
      {
        heading: 'Signs you have outgrown it',
        bullets: [
          'Several people edit the same sheet and nobody is sure which copy is current.',
          'You find mistakes in billing, stock or fees regularly, and each one costs money or a customer.',
          'Someone spends hours every week copying the same figures into a report.',
          'Customers ask for things you cannot do quickly: “what did I order last time?”, “how much is pending?”.',
          'The business would stall if the one person who understands the file were away for a week.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Try off-the-shelf first',
        paragraphs: [
          'Accounting, billing, inventory, appointment and school-fee software already exists for most standard workflows, often with GST support and Tamil-speaking support teams. A month of subscription costs far less than custom development.',
          'Custom software makes sense for the workflow that is specific to you: how a chit fund calculates dues, how a clinic handles its own patient journey, how a manufacturer tracks job work across units. That is where generic tools force painful workarounds.',
        ],
      },
      {
        heading: 'Moving without stopping the counter',
        bullets: [
          'Map the current process on paper first, including the workarounds staff actually use.',
          'Clean the data before importing: one row per customer or item, consistent names and dates.',
          'Run the old and new systems side by side for two to four weeks on real transactions.',
          'Train the people who use it daily, not only the owner, and keep a one-page guide at the counter.',
          'Switch off the old register on a fixed date, and keep an export of the old data.',
        ],
        paragraphs: [],
      },
      {
        heading: 'What a good first version looks like',
        paragraphs: [
          'A first custom build should replace one painful register end to end, work on the phones and computers you already have, and export everything to Excel so you are never locked in. Reports that once took a day should take a click. If a proposal starts with ten modules, ask which single one removes the most hours, and start there.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Excel enough for a small business?', answer: 'Often yes, while one person owns the file and errors are cheap. It struggles when several people share records or reports take hours to compile.' },
      { question: 'Should I buy software or build custom software?', answer: 'Buy for standard workflows like accounting and billing. Build only for the process that makes your business different and that generic tools handle badly.' },
      { question: 'How long does it take to move from paper registers to software?', answer: 'A focused first module with data clean-up and a parallel run typically takes a few weeks to two months, depending on how messy the existing records are.' },
    ],
    related: [
      { path: '/custom-software-development-karaikal', label: 'Custom software in Karaikal' },
      { path: '/custom-software-development-thanjavur', label: 'Custom software in Thanjavur' },
      { path: '/services/custom-software-development', label: 'Custom software development' },
      { path: '/insights/ai-automation-small-business-tamil-nadu', label: 'Where AI automation actually pays' },
    ],
  },
  {
    slug: 'clinic-appointment-system-build-or-subscribe',
    path: '/insights/clinic-appointment-system-build-or-subscribe',
    title: 'Clinic appointment software: subscribe or build your own?',
    seoTitle: 'Clinic Appointment Software: Subscribe or Build? | BuiltbyGSV',
    description:
      'When a subscription clinic app is enough, when a custom booking system pays off, and what any system holding patient data must handle under India’s DPDP Act.',
    excerpt:
      'Most clinics should start with a subscription booking tool. Some outgrow it quickly. Here is how to tell which you are, and what a patient-data system must get right either way.',
    category: 'Healthcare & records',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Subscribe if you are a single-doctor or small clinic with a standard OPD flow. Consider custom software when your workflow is unusual (several doctors and procedures, packages, follow-up programmes, multiple branches) or when you need your own branded patient experience and data. Either way, patient data needs consent, access control and a plan for the DPDP Act.',
    sections: [
      {
        heading: 'What a clinic actually needs from booking',
        bullets: [
          'Patients can book or request a slot from a phone without calling during busy hours.',
          'Reception sees the day’s queue, walk-ins and tokens in one place.',
          'Confirmations and reminders go out automatically, which reduces no-shows.',
          'Doctors see the patient’s previous visits before calling them in.',
          'Billing, receipts and follow-up dates connect to the same visit.',
        ],
        paragraphs: [],
      },
      {
        heading: 'When subscription software is the right answer',
        paragraphs: [
          'Ready-made clinic and practice-management products cover the standard OPD flow well: slots, tokens, prescriptions, billing and reminders, often with mobile apps and support included. For a single doctor or a small clinic, a monthly subscription is almost always cheaper and faster than building anything.',
          'Before signing, check that you can export all patient and visit data, that the vendor explains where data is stored and who can access it, and how pricing changes as you add doctors or branches.',
        ],
      },
      {
        heading: 'When custom software starts to pay off',
        bullets: [
          'Your flow does not fit the template: procedure packages, dialysis or physiotherapy schedules, camps, or programmes with fixed follow-up visits.',
          'Several branches or doctors share patients and the subscription prices per doctor or per branch.',
          'You want booking on your own website and WhatsApp under your own brand, not inside a marketplace that also lists competing clinics.',
          'Staff are maintaining spreadsheets alongside the subscription to cover what it cannot do.',
        ],
        paragraphs: [
          'A middle path also works: keep a subscription for billing and records, and build only a branded booking front end and reminders that connect to it.',
        ],
      },
      {
        heading: 'Patient data: what any system must handle',
        paragraphs: [
          'India’s Digital Personal Data Protection Act, 2023 and the DPDP Rules notified in November 2025 are being phased in over roughly 12 to 18 months. Health information is sensitive regardless of the dates: collect only what you need, tell patients clearly why, and control who on your staff can see what.',
        ],
        bullets: [
          'Role-based access: reception, doctors and billing see different things.',
          'An audit trail of who viewed or changed a record.',
          'No medical reports sent as open WhatsApp attachments without the patient’s agreement.',
          'Backups, and a tested way to restore them.',
          'A written answer to “where is this data stored, and who else can reach it?”.',
        ],
      },
      {
        heading: 'A sensible first version',
        paragraphs: [
          'If you do build, start with booking, the reception queue and reminders, connected to your existing billing. Add patient history and follow-up programmes once the first part is in daily use. Our Thaai Clinic prototype shows the patient-side booking and record experience we design; it is a concept, not a deployed healthcare system.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the best appointment system for a small clinic?', answer: 'For most single-doctor or small clinics, a subscription practice-management app with booking, tokens, reminders and billing. Check data export and access controls before choosing.' },
      { question: 'How much does custom clinic software cost?', answer: 'It depends on scope. A branded booking and reminder system connected to existing billing costs far less than a full hospital system. Get a fixed-scope quote for the first module.' },
      { question: 'Does the DPDP Act apply to clinics?', answer: 'Yes, it applies to digital personal data processed by clinics, with obligations phased in after the 2025 rules. Take legal advice on the specific dates and duties.' },
    ],
    related: [
      { path: '/clinic-website-development-karaikal', label: 'Clinic and hospital websites in Karaikal' },
      { path: '/projects/thaai-clinic-website', label: 'Thaai Clinic prototype' },
      { path: '/insights/whatsapp-business-app-vs-api-clinics-shops', label: 'WhatsApp app or API for clinics' },
      { path: '/insights/organise-family-medical-records-india', label: 'Keeping family medical records in order' },
    ],
    sources: [
      { label: 'PIB: Digital Personal Data Protection Rules, 2025', url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf' },
      { label: 'YourStory: DPDP Rules rollout over 18 months', url: 'https://yourstory.com/2025/11/digital-personal-data-protection-dpdp-rules-2025-rollout-over-18-months' },
    ],
  },
  {
    slug: 'brief-an-ai-chatbot-that-does-not-make-things-up',
    path: '/insights/brief-an-ai-chatbot-that-does-not-make-things-up',
    title: 'How to brief an AI chatbot that does not make things up about your business',
    seoTitle: 'AI Chatbot for Your Business Without Hallucinations | BuiltbyGSV',
    description:
      'Why business chatbots invent prices and policies, how grounding answers in your own documents works, and the brief and tests to agree before anyone builds one.',
    excerpt:
      'A chatbot that confidently quotes the wrong price is worse than no chatbot. Here is what to prepare, what to ask a developer and how to test it before customers ever see it.',
    category: 'AI & automation',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '9 min read',
    takeaway:
      'A useful business chatbot answers only from documents you approve, says “I don’t know, let me connect you” when the answer is not there, and hands sensitive or high-stakes questions to a person. The quality depends far more on the source documents and test questions you prepare than on which AI model is used.',
    sections: [
      {
        heading: 'Why chatbots make things up',
        paragraphs: [
          'Large language models generate fluent text from patterns. Asked about your clinic’s Sunday timings or your shop’s return policy, a model with no access to your real information will produce a plausible answer anyway. That is a hallucination, and to a customer it looks exactly like a fact.',
          'The fix is not a bigger model. It is giving the model your actual information at the moment it answers, and instructing it to refuse when that information does not contain the answer.',
        ],
      },
      {
        heading: 'Grounding: answering from your own documents',
        paragraphs: [
          'The standard approach, often called retrieval-augmented generation, works in two steps. First, the system searches your approved documents for the passages relevant to the question. Then the model writes an answer using only those passages, ideally showing which source it used.',
          'This means your documents become the product. Outdated price lists, contradictory FAQs and policies that live only in the owner’s head will show up directly in the chatbot’s answers.',
        ],
      },
      {
        heading: 'What to prepare before talking to a developer',
        bullets: [
          'A single, current source for prices, timings, locations, services and policies, with an owner who updates it.',
          'Fifty real questions customers have asked, taken from WhatsApp, calls and email, with the correct answer for each.',
          'A list of questions the bot must never answer itself: medical, legal or financial advice, complaints, refunds, anything involving a specific customer’s account.',
          'The hand-off route: which person or WhatsApp number takes over, and during which hours.',
          'The languages customers actually use, including mixed Tamil and English.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Test it like a sceptical customer',
        bullets: [
          'Run all fifty real questions and check every answer against your sheet.',
          'Ask questions whose answers are not in the documents. The correct response is a polite refusal and a hand-off, not a guess.',
          'Try to make it promise discounts, delivery dates or outcomes you do not offer.',
          'Ask in Tamil, in Tanglish and with spelling mistakes.',
          'Repeat the tests after every document update or model change.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Running costs and ownership',
        paragraphs: [
          'AI chatbots have usage-based running costs that grow with traffic and with how much text is sent to the model on each question. Ask for an estimate per thousand conversations and a monthly cap. Make sure the documents, conversation logs and configuration belong to you and can be exported.',
          'Read conversation logs every week for the first month. They show exactly which questions customers ask and where your documents are missing answers, which is useful even beyond the chatbot.',
        ],
      },
    ],
    faqs: [
      { question: 'Why does my chatbot give wrong answers?', answer: 'Usually because it is answering from the model’s general knowledge instead of your documents, or your documents are outdated or contradictory. Ground it in approved sources and test it.' },
      { question: 'What is retrieval-augmented generation?', answer: 'A method where the system first finds relevant passages in your documents, then has the AI answer using only those passages.' },
      { question: 'Can a chatbot replace my customer support staff?', answer: 'It can answer repeated factual questions. Complaints, refunds, sensitive and high-stakes questions should be handed to a person.' },
      { question: 'Can an AI chatbot answer in Tamil?', answer: 'Current models handle Tamil and mixed Tamil-English, but test with real customer questions before launch.' },
    ],
    related: [
      { path: '/services/ai-solutions', label: 'AI solutions' },
      { path: '/ai-automation-agency-bengaluru', label: 'AI automation in Bengaluru' },
      { path: '/insights/ai-automation-small-business-tamil-nadu', label: 'Where AI automation actually pays' },
      { path: '/insights/whatsapp-business-app-vs-api-clinics-shops', label: 'WhatsApp app or API?' },
    ],
  },
  {
    slug: 'school-coaching-centre-fee-management',
    path: '/insights/school-coaching-centre-fee-management',
    title: 'Fee management for schools and coaching centres: from register to app',
    seoTitle: 'Fee Management for Schools & Coaching Centres | BuiltbyGSV',
    description:
      'Stop fee leakage and chasing parents: what a fee system must track, UPI collection with automatic receipts, reminders that work, and when an app beats a register.',
    excerpt:
      'Fee collection is where many schools and coaching centres quietly lose money and goodwill. Here is how to set it up properly, whether you use a register, a ready-made app or custom software.',
    category: 'Planning guide',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '8 min read',
    takeaway:
      'Whatever tool you use, every student needs a fee plan, every payment needs a receipt with a number, and dues need a single list you trust. Collect by UPI or payment link with automatic receipts, send reminders on fixed dates, and give parents a way to check their balance without calling the office.',
    sections: [
      {
        heading: 'Where fee collection goes wrong',
        bullets: [
          'Concessions, sibling discounts and instalment plans agreed verbally and never written down.',
          'Cash and UPI payments recorded in different places, so the balance is never quite right.',
          'Receipts written by hand, numbered inconsistently, or not given at all.',
          'Office staff spending the first week of every month phoning parents.',
          'Parents disputing amounts because they cannot see what was paid and when.',
        ],
        paragraphs: [],
      },
      {
        heading: 'What a fee system must track',
        bullets: [
          'Each student’s fee plan: heads (tuition, transport, exam, materials), amounts, due dates and approved concessions.',
          'Every payment with date, mode (cash, UPI, bank transfer, cheque), reference and the staff member who recorded it.',
          'A numbered receipt for every payment, sent to the parent.',
          'Outstanding dues by student, class and batch, at any moment.',
          'Refunds and adjustments as separate entries, never by editing old payments.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Collecting online without losing track',
        paragraphs: [
          'A static UPI QR at the counter is convenient but leaves staff matching screenshots to students. Payment links or a gateway that carries the student ID let each payment mark the right dues as paid and trigger the receipt automatically.',
          'Keep cash, but record it in the same system on the same day, so the outstanding list stays the single source of truth.',
        ],
      },
      {
        heading: 'Reminders parents do not ignore',
        bullets: [
          'One reminder a few days before the due date, one on the date and one a week after. Not daily messages.',
          'Each reminder shows the exact amount, what it is for and a link to pay.',
          'Polite wording, sent in the language parents use, and never shared in class or group chats.',
          'A clear contact for families who need an instalment arrangement.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Register, ready-made app or custom software',
        paragraphs: [
          'A well-kept register or spreadsheet can work for a small coaching centre with one person in charge. School management software covers standard fee, attendance and report-card needs at a subscription cost and suits most schools.',
          'Custom software makes sense when your structure is unusual, such as many batches and courses with different instalment plans, several branches, or fees tied to attendance or materials, or when you want fee status, attendance and results in one branded parent app. Confirm the tax treatment of each fee head with your accountant, because education services and other charges can be treated differently under GST.',
        ],
      },
    ],
    faqs: [
      { question: 'How can a coaching centre collect fees online?', answer: 'Use payment links or a gateway that carries the student reference, so each payment updates the right dues and sends a receipt automatically.' },
      { question: 'What should a fee receipt include?', answer: 'Institution name, receipt number, date, student name and class or batch, fee heads paid, amount, payment mode and reference, plus any applicable tax details.' },
      { question: 'Do I need custom software for fee management?', answer: 'Not usually. Ready-made school software fits standard structures. Custom software helps with unusual plans, several branches or a branded parent app.' },
    ],
    related: [
      { path: '/insights/move-business-off-excel-and-paper-registers', label: 'Moving off Excel and paper registers' },
      { path: '/custom-software-development-karaikal', label: 'Custom software in Karaikal' },
      { path: '/custom-software-development-thanjavur', label: 'Custom software in Thanjavur' },
      { path: '/insights/gst-invoices-and-payments-in-your-first-web-app', label: 'Payments and GST in a web app' },
    ],
  },
  {
    slug: 'website-maintenance-cost-after-launch',
    path: '/insights/website-maintenance-cost-after-launch',
    title: 'What a website costs to keep running after launch',
    seoTitle: 'Website Maintenance Cost After Launch in India | BuiltbyGSV',
    description:
      'Domain renewals, hosting, email, security updates, backups and edits: what each costs to keep a business website running in India, and which charges to avoid.',
    excerpt:
      'The build price is only the first bill. Here is every recurring cost of a business website, typical ranges, and the questions that stop a cheap launch turning into an expensive year two.',
    category: 'Planning guide',
    published: '2026-11-27',
    updated: '2026-11-27',
    readTime: '7 min read',
    takeaway:
      'Every website has a domain renewal and somewhere to host it. Everything else depends on how it was built: a WordPress site needs regular plugin and security updates, a static or pre-rendered site needs very little. Ask for the renewal price, not the introductory offer, and know exactly what your maintenance fee covers.',
    sections: [
      {
        heading: 'Costs every website has',
        bullets: [
          'Domain renewal: a .in domain typically renews at roughly ₹600 to ₹1,500 a year before GST, depending on the registrar. First-year offers are often far lower, so compare renewal prices.',
          'Hosting: from free tiers for small static sites to a few thousand rupees a year for shared hosting, and more for servers running applications. Introductory hosting prices often rise sharply at renewal.',
          'SSL certificate: free from providers such as Let’s Encrypt on most modern hosts. Paying extra for a basic certificate is rarely necessary.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Costs that depend on how the site was built',
        bullets: [
          'WordPress and similar platforms need core, theme and plugin updates every month. Skipping them is the most common way small-business sites get hacked.',
          'Premium themes and plugins often carry yearly licence fees.',
          'Static or pre-rendered sites have fewer moving parts and much less to update, though any forms or integrations still need checking.',
          'Web applications with databases, logins or payments need monitoring, backups and dependency updates as a matter of routine.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Costs people forget',
        bullets: [
          'Business email on your domain, usually priced per user per month.',
          'Backups stored somewhere other than the hosting account, and a tested restore.',
          'Paid services the site uses: maps, SMS, WhatsApp API, payment gateway fees.',
          'Content updates: new prices, staff, photos and services. These are usually the most frequent requests.',
        ],
        paragraphs: [],
      },
      {
        heading: 'Questions to ask about any maintenance plan',
        bullets: [
          'Exactly which tasks are included each month, and how many content edits?',
          'How quickly will you respond if the site goes down?',
          'Where are backups kept and when was a restore last tested?',
          'Are renewals in my name and on my card, or bundled into your fee?',
          'What happens to the site and domain if I stop the plan?',
        ],
        paragraphs: [],
      },
      {
        heading: 'How to keep the yearly bill low',
        paragraphs: [
          'Register the domain and hosting in your business’s name with auto-renew on, so renewals never depend on a third party. Choose a build that matches how often the site changes: a site updated twice a year does not need the same platform as a shop updating stock daily.',
          'Ask for a short handover document listing every account, renewal date and recurring charge. It is the cheapest insurance a business website can have.',
        ],
      },
    ],
    faqs: [
      { question: 'How much does it cost to renew a .in domain?', answer: 'Roughly ₹600 to ₹1,500 a year before GST at common registrars in 2026. Check the renewal price, not the first-year offer.' },
      { question: 'Does a website need monthly maintenance?', answer: 'WordPress and plugin-based sites need monthly updates for security. Static and pre-rendered sites need far less, mainly renewals and content changes.' },
      { question: 'Do I need to pay for an SSL certificate?', answer: 'Usually not. Most modern hosts provide free SSL certificates that renew automatically.' },
      { question: 'What happens if my domain expires?', answer: 'The site and email on it stop working. Registrars usually allow a short late-renewal period, often at extra cost, before the domain can be lost.' },
    ],
    related: [
      { path: '/pricing', label: 'BuiltbyGSV pricing' },
      { path: '/insights/who-owns-your-website-domain-hosting-code', label: 'Who owns your website?' },
      { path: '/insights/compare-website-quotes-india', label: 'How to compare website quotes' },
      { path: '/insights/website-cost-karaikal', label: 'What a website costs in Karaikal' },
    ],
    sources: [
      { label: 'OVHcloud: .in domain pricing (India)', url: 'https://www.ovhcloud.com/en-in/domains/tld/in/' },
      { label: 'Gandi: .in domain pricing (India)', url: 'https://www.gandi.net/en-IN/domain/tld/in' },
      { label: 'Let’s Encrypt', url: 'https://letsencrypt.org/' },
    ],
  },
];
