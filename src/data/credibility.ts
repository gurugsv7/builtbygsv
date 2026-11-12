export const BUSINESS_REGISTRATION = {
  enterpriseName: 'BUILTBYGSV',
  udyamNumber: 'UDYAM-PY-01-0011724',
  udyamDate: '2026-10-08',
  classification: 'Micro',
  classificationYear: '2026–27',
  commencementDate: '2026-06-08',
  gstin: '34EAMPG8995J1ZV',
  gstApprovalDate: '2026-10-21',
  reviewedDate: '2026-11-12',
  udyamPortal: 'https://udyamregistration.gov.in/',
  gstPortal: 'https://services.gst.gov.in/services/searchtp',
};

export const TRUST_PAGE = {
  path: '/trust',
  title: 'Business Registration & Website Audits | BuiltbyGSV',
  description: 'BuiltbyGSV business registration details, official Udyam and GST verification routes, portfolio evidence and dated Lighthouse website audits.',
};

// Personal experiments are excluded from public business evidence and audits.
export const EXCLUDED_EVIDENCE_PROJECTS = ['neon-rail'];

export type WebsiteAudit = {
  id: string;
  title: string;
  url: string;
  projectId?: string;
  engagement: string;
  strategy: 'mobile' | 'desktop';
  checkedAt: string;
  status: 'complete' | 'unavailable';
  message?: string;
  finalUrl?: string;
  lighthouseVersion?: string;
  report?: string;
  scores?: { performance: number; accessibility: number; bestPractices: number; seo: number };
  metrics?: { lcp: string; cls: string; tbt: string; fcp: string };
};

export const AUDIT_METHOD = 'Lighthouse lab audits of public landing pages, one run per device profile. Scores can vary with the page version, network, device and third-party services. They are not search rankings or real-user Core Web Vitals.';
