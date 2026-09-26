import { ArrowLeft, ArrowRight, Compass, FileQuestion, Home, Search } from 'lucide-react';
import type { ScreenType } from '../../types';

interface NotFoundScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

const routeCards: { screen: ScreenType; label: string; detail: string }[] = [
  { screen: 'projects', label: 'Work', detail: 'Case studies and shipped work' },
  { screen: 'services', label: 'Services', detail: 'Web, software, AI and automation' },
  { screen: 'contact', label: 'Contact', detail: 'Start with a short project brief' },
];

export const NotFoundScreen = ({ onNavigate }: NotFoundScreenProps) => {
  const requestedPath = window.location.pathname;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F3F0E5] px-4 pb-28 pt-5 text-[#131921] sm:px-7 lg:px-12 lg:pb-16 lg:pt-10">
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-between">
        <header className="flex items-center justify-between">
          <button type="button" onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-xs font-extrabold backdrop-blur-sm transition hover:border-slate-500">
            <ArrowLeft className="h-4 w-4" /> BuiltbyGSV
          </button>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Error 404 / route missing</span>
        </header>

        <section className="grid items-center gap-10 py-12 lg:grid-cols-[1fr_.82fr]">
          <div>
            <div className="relative inline-block">
              <span aria-hidden="true" className="block text-[8rem] font-black leading-none tracking-[-0.1em] text-[#0F8B75] sm:text-[12rem] lg:text-[15rem]">404</span>
              <span className="absolute right-0 top-4 rotate-6 rounded-xl border-2 border-[#131921] bg-[#F5C748] px-3 py-2 font-handwritten text-lg font-bold shadow-[4px_4px_0_#131921] sm:text-xl">
                wrong turn
              </span>
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">This route never made it into production.</h1>
            <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
              The address may be old, mistyped or moved. The rest of the studio is working as expected.
            </p>
            <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-300 bg-white/75 px-4 py-3 font-mono text-xs text-slate-600 backdrop-blur-sm">
              <Search className="h-4 w-4 shrink-0 text-[#E85D22]" />
              <span className="truncate">{requestedPath}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full rotate-3 rounded-[2rem] border-2 border-dashed border-[#0F8B75]/40" />
            <div className="relative rounded-[2rem] border-2 border-[#131921] bg-white p-6 shadow-[10px_10px_0_#131921] sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E2F1ED] text-[#0F8B75]"><Compass className="h-5 w-5" /></span><h2 className="text-xl font-black">Try a working route</h2></div>
                <FileQuestion className="h-6 w-6 text-slate-300" />
              </div>
              <div className="mt-3 divide-y divide-slate-100">
                {routeCards.map((route) => (
                  <button key={route.screen} type="button" onClick={() => onNavigate(route.screen)} className="group flex w-full items-center justify-between gap-4 py-4 text-left">
                    <span><span className="block text-sm font-extrabold group-hover:text-[#0F8B75]">{route.label}</span><span className="mt-0.5 block text-xs font-medium text-slate-500">{route.detail}</span></span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-[#0F8B75] group-hover:text-white"><ArrowRight className="h-4 w-4" /></span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => onNavigate('home')} id="btn-404-home" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#131921] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#0F8B75]">
                <Home className="h-4 w-4" /> Back to homepage
              </button>
            </div>
          </div>
        </section>

        <p className="text-center font-handwritten text-lg font-bold text-slate-500">Good products recover gracefully.</p>
      </div>
    </main>
  );
};
