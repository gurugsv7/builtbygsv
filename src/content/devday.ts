/** Event landing page for people met at DevDay. Shared via QR, kept out of the sitemap. */
export const DEVDAY_PAGE = {
  path: '/devday',
  title: 'Great to meet you at DevDay | BuiltbyGSV',
  description: 'Save Gurusabarivasan’s contact, connect on WhatsApp or LinkedIn, and see what BuiltbyGSV is building: web, software and AI products.',
};

/** Full-screen, story-style tour of the work for showing on a phone. Also kept out of the sitemap. */
export const TOUR_PAGE = {
  path: '/tour',
  title: 'A one-minute tour of BuiltbyGSV',
  description: 'Tap through BuiltbyGSV’s web, software and AI products in a one-minute, story-style tour, then save the contact.',
};

/** A two-sided LinkedIn and X card for networking. Shared by QR, kept out of the sitemap. */
export const CONNECT_PAGE = {
  path: '/connect',
  title: 'Connect with Guru on LinkedIn and X | BuiltbyGSV',
  description: 'Scan to connect with Gurusabarivasan on LinkedIn or follow BuiltbyGSV on X.',
};

/** Pages that install as their own home-screen apps, each with a separate manifest and icon. */
export const HOME_APPS: Record<string, { manifest: string; icon: string; title: string; theme: string }> = {
  '/tour': { manifest: '/apps/tour.webmanifest', icon: '/apps/tour-apple.png', title: 'GSV Tour', theme: '#131921' },
  '/connect': { manifest: '/apps/connect.webmanifest', icon: '/apps/connect-apple.png', title: 'GSV Connect', theme: '#EFE6D3' },
};
