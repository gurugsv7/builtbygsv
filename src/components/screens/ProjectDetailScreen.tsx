import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Calendar,
  Code2,
  Database,
  ExternalLink,
  Globe,
  Heart,
  Laptop,
  Layers,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react';
import type { Project } from '../../types';
import v2Glimpse1 from '../../assets/v2productions/glimpse1.png';
import v2Glimpse2 from '../../assets/v2productions/glimpse2.png';
import v2Glimpse3 from '../../assets/v2productions/glimpse3.png';
import v2Glimpse4 from '../../assets/v2productions/glimpse4.png';
import v2HeroImg from '../../assets/v2productions/hero.png';
import v2StoryImg from '../../assets/v2productions/the_story.png';

interface ProjectDetailScreenProps {
  project: Project;
  onBack: () => void;
  onOpenStartProject: () => void;
}

const ICONS: Record<string, LucideIcon> = {
  Brain,
  Calendar,
  Code: Code2,
  Database,
  Globe,
  Heart,
  Laptop,
  Layers,
  React: Sparkles,
  Smartphone,
  TrendingUp,
  User,
  Users,
  Zap,
};

const projectMedia: Record<string, { hero?: string; story?: string; glimpses?: string[] }> = {
  'v2-productions': {
    hero: v2HeroImg,
    story: v2StoryImg,
    glimpses: [v2Glimpse1, v2Glimpse2, v2Glimpse3, v2Glimpse4],
  },
};

export const ProjectDetailScreen = ({
  project,
  onBack,
  onOpenStartProject,
}: ProjectDetailScreenProps) => {
  const detail = project.detailData;
  const media = projectMedia[project.id] ?? {};
  const isHealthcare = project.id === 'thaai-clinic-website';
  const accent = isHealthcare ? 'text-rose-600' : 'text-[#0F8B75]';
  const accentBg = isHealthcare ? 'bg-rose-50 border-rose-200' : 'bg-[#E2F1ED] border-teal-200';
  const heroImage = detail?.heroImage ?? media.hero;
  const storyImage = detail?.storyImage ?? media.story;
  const storyParagraphs = detail?.storyParagraphs?.length
    ? detail.storyParagraphs
    : [project.problemStatement, project.solutionProvided].filter((value): value is string => Boolean(value));
  const glimpses = (detail?.glimpseScreenshots ?? []).map((glimpse, index) => ({
    ...glimpse,
    image: glimpse.image ?? media.glimpses?.[index],
  }));
  const stack = detail?.builtWithTech ?? project.tags.map((name) => ({ name, iconName: 'Code' }));
  const impact = detail?.impactMetrics ?? project.metrics?.map((metric) => ({
    value: metric.value,
    label: metric.label,
    iconName: 'TrendingUp',
  })) ?? [];
  const answerBlock = detail?.answerBlock;
  const answerQuestion = typeof answerBlock === 'object' ? answerBlock.question : `What is ${project.title}?`;
  const answer = typeof answerBlock === 'object' ? answerBlock.answer : answerBlock;

  return (
    <main className="min-h-screen w-full bg-[#FBFBFB] pb-20 text-[#131921]">
      <header className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 lg:px-12">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-[#0F8B75]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to work
        </button>
        <button
          type="button"
          onClick={onOpenStartProject}
          className="inline-flex items-center gap-2 rounded-full bg-[#09121F] px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          Start a Project <ArrowUpRight className="h-4 w-4 text-emerald-400" />
        </button>
      </header>

      <section className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-10 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-16">
        <div className="space-y-6 lg:col-span-6">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] ${accentBg} ${accent}`}>
            <Sparkles className="h-3.5 w-3.5" /> {detail?.engagement} ? {project.category} case study
          </div>
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              {project.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {detail?.liveUrl ? (
              <a
                href={detail.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#09121F] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                View live project <ExternalLink className="h-4 w-4 text-emerald-400" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenStartProject}
                className="inline-flex items-center gap-2 rounded-full bg-[#09121F] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Start a Project <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </button>
            )}
            {detail?.sourceCodeUrl ? (
              <a
                href={detail.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold transition hover:border-[#0F8B75] hover:text-[#0F8B75]"
              >
                View source code <Code2 className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className={`absolute inset-8 rounded-full ${isHealthcare ? 'bg-rose-200' : 'bg-emerald-200'} opacity-70 blur-2xl`} />
          {heroImage ? (
            <img
              src={heroImage}
              alt={`${project.title} project preview`}
              className="relative mx-auto max-h-[34rem] w-full object-contain drop-shadow-2xl"
              fetchPriority="high"
            />
          ) : (
            <div className="relative mx-auto flex aspect-[4/3] max-w-xl items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
              <div className={`relative flex h-28 w-28 items-center justify-center rounded-3xl border ${accentBg}`}>
                <Code2 className={`h-14 w-14 ${accent}`} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-12 lg:grid-cols-[1fr_1.15fr] lg:px-12 lg:py-16">
          <div>
            <p className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>The Challenge</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {detail?.storyHeadline ?? 'From problem to a focused product.'}
            </h2>
            <div className="mt-6 space-y-5 text-sm font-medium leading-7 text-slate-600 sm:text-base">
              {storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {detail?.stickyNoteText ? (
              <blockquote className="mt-8 rotate-[-1deg] rounded-sm border border-amber-200 bg-amber-50 p-5 font-handwritten text-lg font-semibold leading-7 text-slate-800 shadow-sm">
                “{detail.stickyNoteText}”
              </blockquote>
            ) : null}
          </div>
          {storyImage ? (
            <img
              src={storyImage}
              alt={`${project.title} story and design process`}
              className="w-full rounded-3xl object-contain shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6">
                <p className="text-xs font-extrabold uppercase tracking-wider text-rose-700">The problem</p>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">{project.problemStatement}</p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">The solution</p>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">{project.solutionProvided}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {glimpses.length ? (
        <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-12 lg:py-16">
          <p className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>02 · A glimpse</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Inside the experience</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {glimpses.map((glimpse) => (
              <article key={glimpse.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {glimpse.image ? (
                  <img src={glimpse.image} alt={`${project.title}: ${glimpse.title}`} className="aspect-[4/3] w-full object-cover object-top" loading="lazy" />
                ) : (
                  <div className={`flex aspect-[4/3] items-center justify-center ${accentBg}`}>
                    <Smartphone className={`h-12 w-12 ${accent}`} />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold">{glimpse.title}</h3>
                      {glimpse.subtitle ? <p className="mt-1 text-xs font-medium text-slate-500">{glimpse.subtitle}</p> : null}
                    </div>
                    {glimpse.badge ? <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${accentBg} ${accent}`}>{glimpse.badge}</span> : null}
                  </div>
                  {glimpse.metrics ? <p className="mt-4 text-xs font-bold text-slate-700">{glimpse.metrics}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>Engineering</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">A maintainable foundation</h2>
              <dl className="mt-7 grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Timeline', detail?.timeline ?? project.year],
                  ['Capabilities', detail?.capabilities],
                  ['Engagement', detail?.engagement ?? project.category],
                  ['Platform', detail?.platform],
                ].filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, value]) => (
                  <div key={label}><dt className="text-xs font-bold text-slate-400">{label}</dt><dd className="mt-1 font-extrabold">{value}</dd></div>
                ))}
              </dl>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((tech) => {
                const Icon = ICONS[tech.iconName] ?? Laptop;
                return (
                  <div key={tech.name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-4">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${accentBg}`}><Icon className={`h-4 w-4 ${accent}`} /></span>
                    <span className="text-sm font-extrabold">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {impact.length ? (
        <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-12 lg:py-16">
          <p className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>04 · Impact</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">What the build enables</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {impact.map((metric) => {
              const Icon = ICONS[metric.iconName] ?? TrendingUp;
              return (
                <div key={`${metric.value}-${metric.label}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${accentBg}`}><Icon className={`h-4 w-4 ${accent}`} /></span>
                  <p className="mt-5 text-lg font-black">{metric.value}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {detail?.proofSignals?.length ? (
        <section className="border-y border-slate-200 bg-[#F1F4F2]">
          <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-12 lg:py-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Implementation details</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {detail.proofSignals.map((signal) => {
                const Icon = ICONS[signal.iconName] ?? Shield;
                return (
                  <article key={signal.label} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <Icon className={`h-5 w-5 ${accent}`} />
                    <p className="mt-5 text-lg font-black">{signal.value}</p>
                    <h3 className="mt-1 text-xs font-extrabold uppercase tracking-wider text-slate-500">{signal.label}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{signal.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="mx-auto max-w-[1400px] px-5 py-12 lg:px-12">
        {answer ? (
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold">{answerQuestion}</h2>
            <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-slate-600">{answer}</p>
          </div>
        ) : null}
        <div className="flex flex-col gap-6 rounded-3xl bg-[#101A19] p-7 text-white sm:flex-row sm:items-center sm:justify-between lg:p-9">
          <div>
            <p className="text-2xl font-extrabold">Like what you see?</p>
            <p className="mt-2 text-sm font-medium text-slate-300">Let's build something useful together.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {detail?.relatedLinks?.map((link) => (
              <a key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold transition hover:border-white/50">
                {link.label} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ))}
            <button type="button" onClick={onOpenStartProject} className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-extrabold text-[#101A19] transition hover:bg-emerald-300">
              Discuss a project <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
};
