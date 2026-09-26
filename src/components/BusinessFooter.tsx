import { ArrowUpRight } from 'lucide-react';
import { brandEntity } from '../seo';

const groups = [
  { title: 'Build with us', links: [['/services', 'Services'], ['/projects', 'Selected work'], ['/process', 'Our process'], ['/pricing', 'Pricing & scope'], ['/start-project', 'Start a Project']] },
  { title: 'BuiltbyGSV', links: [['/about', 'About us'], ['/careers', 'Careers · We’re hiring'], ['/insights', 'Insights'], ['/contact', 'Contact']] },
  { title: 'Helpful information', links: [['/faq', 'FAQs'], ['/website-information', 'Website & enquiries'], ['/web-software-developer-karaikal', 'Karaikal'], ['/web-software-developer-bengaluru', 'Bengaluru']] },
];

export function BusinessFooter() {
  const links = <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
    {groups.map(group => <div key={group.title}><p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">{group.title}</p><ul className="space-y-3">{group.links.map(([href, label]) => <li key={href}><a href={href} className="text-xs font-semibold text-slate-600 transition-colors hover:text-[#0F8B75]">{label}</a></li>)}</ul></div>)}
  </div>;
  return <footer className="border-t border-slate-200 bg-[#F1F4F2] px-4 py-6 lg:px-10 lg:py-10">
    <div className="mx-auto max-w-6xl">
      <div className="hidden gap-10 lg:grid lg:grid-cols-[.8fr_1.6fr]"><div><p className="text-xl font-extrabold">Builtby<span className="text-[#0F8B75]">GSV</span></p><p className="mt-3 text-xs leading-6 text-slate-600">Product &amp; AI Engineering Studio.<br />Useful products. Thoughtful engineering.</p><a href={`mailto:${brandEntity.email}`} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0F8B75]">{brandEntity.email}<ArrowUpRight className="h-3 w-3" /></a></div>{links}</div>
      <details className="group lg:hidden"><summary className="flex cursor-pointer list-none items-center justify-between text-xs font-extrabold [&::-webkit-details-marker]:hidden">Explore BuiltbyGSV <span className="text-lg text-[#0F8B75] group-open:rotate-45">+</span></summary><div className="py-5">{links}</div><a href={`mailto:${brandEntity.email}`} className="mb-5 inline-block text-xs font-bold text-[#0F8B75]">{brandEntity.email}</a></details>
      <p className="mt-5 border-t border-slate-200 pt-4 text-[10px] leading-5 text-slate-500">© {new Date().getFullYear()} BuiltbyGSV. Product, software &amp; AI engineering.</p>
    </div>
  </footer>;
}
