export function ServiceEngagement() {
  return <>
  <details className="group rounded-2xl border border-slate-200 bg-white p-4 lg:hidden">
    <summary className="cursor-pointer text-xs font-extrabold text-[#131921]">How an engagement works</summary>
    <p className="mt-3 text-xs leading-6 text-slate-600">We agree on scope and the technical approach, review design and development in stages, then test the important workflows before launch. Handover includes ownership and documentation. Further work follows usage and feedback.</p>
    <a href="/process" className="mt-3 inline-block text-xs font-bold text-[#0F8B75]">Our delivery process ↗</a>
  </details>
  <section className="hidden rounded-2xl border border-slate-200 bg-[#E2F1ED]/50 p-5 lg:block">
    <h2 className="text-lg font-extrabold text-[#131921]">From requirements to release.</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">We start with the users, existing systems and the workflow that needs to improve. Together, we agree on scope, the technical approach and what a successful first release must do.</p>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Design and engineering progress in reviewable stages. We validate important workflows and edge cases before deployment, then document ownership and handover. Further iteration is scoped around usage and feedback.</p>
    <a href="/process" className="mt-4 inline-block text-xs font-bold text-[#0F8B75]">Explore our delivery process ↗</a>
  </section>
  </>;
}
