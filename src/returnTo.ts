/**
 * Case studies opened from the tour or the DevDay page carry `?from=` so their Back
 * button returns people to where they were instead of the work index.
 */
export type ReturnSource = 'tour' | 'devday';

export const caseStudyHref = (id: string, from: ReturnSource, slide?: number) =>
  `/projects/${id}?from=${from}${slide ? `&slide=${slide}` : ''}`;

export function getReturnTarget(search = typeof window === 'undefined' ? '' : window.location.search): { href: string; label: string } | null {
  const params = new URLSearchParams(search);
  const from = params.get('from');
  if (from === 'tour') {
    const slide = Number.parseInt(params.get('slide') ?? '', 10);
    return { href: slide > 0 ? `/tour?slide=${slide}` : '/tour', label: 'Back to tour' };
  }
  if (from === 'devday') return { href: '/devday', label: 'Back to DevDay' };
  return null;
}
