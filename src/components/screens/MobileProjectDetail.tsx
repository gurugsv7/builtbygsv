import { useRef, useState, type ReactNode, type UIEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Briefcase, Calendar, ChevronDown, ExternalLink, Heart, Layers, MapPin, Monitor, Sprout, Video, type LucideIcon } from 'lucide-react';
import type { Project } from '../../types';
import { projectMedia } from '../../data/projectMedia';
import { WORK_SUMMARIES } from '../../data/studio';
import { Reveal, RevealGroup, RevealItem } from '../../motion/primitives';
import { EASE, SPRING } from '../../motion/tokens';

interface Props {
  project: Project;
  onBack: () => void;
  onOpenStartProject: () => void;
}

const ICONS: Record<string, LucideIcon> = { Video, Sprout, Heart };
const ACCENTS: Record<string, string> = { 'thaai-clinic-website': '#E11D48', 'budget-diet-app': '#15803D' };

/**
 * Mobile case study, driven entirely by the project record so every project gets the
 * same structure: a cover, a swipeable fact strip, the story as a card deck, then
 * screens, stack and what could come next.
 */
export function MobileProjectDetail({ project, onBack, onOpenStartProject }: Props) {
  const detail = project.detailData;
  const media = projectMedia[project.id] ?? {};
  const accent = ACCENTS[project.id] ?? '#0F8B75';
  const Icon = ICONS[project.iconName] ?? Briefcase;
  const cover = useRef<HTMLDivElement>(null);
  const { scrollYProgress: reading } = useScroll();
  const { scrollYProgress: coverOut } = useScroll({ target: cover, offset: ['start start', 'end start'] });
  const imageY = useTransform(coverOut, [0, 1], [0, 48]);
  const imageScale = useTransform(coverOut, [0, 1], [1, 1.06]);
  const barTitle = useTransform(coverOut, [0.55, 0.9], [0, 1]);
  const barTitleY = useTransform(coverOut, [0.55, 0.9], [6, 0]);

  const facts = [
    { label: 'Timeline', value: detail?.timeline ?? project.year, icon: Calendar },
    { label: 'Platform', value: detail?.platform, icon: Monitor },
    { label: 'Capabilities', value: detail?.capabilities, icon: Layers },
    { label: 'Location', value: project.location, icon: MapPin },
  ].filter((fact): fact is { label: string; value: string; icon: LucideIcon } => Boolean(fact.value));

  const stack = detail?.builtWithTech?.map((tech) => tech.name) ?? project.tags;
  const summary = WORK_SUMMARIES[project.id];
  type StoryCard = { label: string; body: ReactNode };
  const story = ([
    { label: 'Context', body: <><p className="text-base font-extrabold leading-snug">{[project.client, project.location].filter(Boolean).join(' · ')}</p><p className="mt-2 text-xs leading-6 text-slate-600">{project.description}</p></> },
    project.problemStatement ? { label: 'Problem', body: <><p className="text-base font-extrabold leading-snug">{summary?.problem ?? 'The challenge'}</p><p className="mt-2 text-xs leading-6 text-slate-600">{project.problemStatement}</p></> } : null,
    project.solutionProvided ? { label: 'What we built', body: <><p className="text-base font-extrabold leading-snug">{summary?.built ?? 'The approach'}</p><p className="mt-2 text-xs leading-6 text-slate-600">{project.solutionProvided}</p></> } : null,
    { label: 'How it works', body: <>{detail?.capabilities && <p className="text-base font-extrabold leading-snug">{detail.capabilities}</p>}<ul className="mt-3 flex flex-wrap gap-1.5">{stack.map((name) => <li key={name} className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">{name}</li>)}</ul></> },
    { label: 'Status', body: <><p className="text-base font-extrabold">{project.status}</p><p className="mt-1 text-xs text-slate-500">{[detail?.timeline, detail?.platform].filter(Boolean).join(' · ')}</p></> },
  ] as (StoryCard | null)[]).filter((card): card is StoryCard => Boolean(card));

  const glimpses = (detail?.glimpseScreenshots ?? [])
    .map((glimpse, index) => ({ ...glimpse, image: glimpse.image ?? media.glimpses?.[index] }))
    .filter((glimpse) => glimpse.image);
  const answer = typeof detail?.answerBlock === 'object' ? detail.answerBlock : null;

  return (
    <main className="mx-auto max-w-xl text-[#131921]">
      <div className="sticky top-0 z-30 border-b border-slate-200/60 bg-[#F8F9FA]/90 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3">
          <button type="button" onClick={onBack} aria-label="Back to work" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 active:scale-95">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <motion.p aria-hidden="true" className="min-w-0 flex-1 truncate text-sm font-extrabold" style={{ opacity: barTitle, y: barTitleY }}>{project.title}</motion.p>
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${project.statusColor ?? ''}`}>{project.status}</span>
        </div>
        <motion.span aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-0.5 origin-left" style={{ scaleX: reading, backgroundColor: accent }} />
      </div>

      <div ref={cover} className="px-4 pt-4">
        <div className={`relative overflow-hidden rounded-[1.75rem] ${project.iconBgColor}`}>
          <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:14px_14px]" style={{ backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)` }} />
          <motion.div className="relative flex aspect-[4/3] items-center justify-center p-5" style={{ y: imageY, scale: imageScale }}>
            {media.hero ? (
              <motion.img src={media.hero} alt={`${project.title} project preview`} fetchPriority="high" className="max-h-full w-full object-contain drop-shadow-xl"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE.out }} />
            ) : (
              <PhoneCover project={project} Icon={Icon} accent={accent} />
            )}
          </motion.div>
        </div>
      </div>

      <motion.header className="px-4 pt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE.out, delay: 0.1 }}>
        <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: accent }}>{detail?.engagement} · {project.category} case study</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight">{project.title}</h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{project.subtitle}</p>
        {detail?.heroDoodleText && <p className="mt-3 font-handwritten text-lg" style={{ color: accent }}>{detail.heroDoodleText}</p>}
      </motion.header>

      <ul className="no-scrollbar mt-5 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-1" aria-label="Project facts">
        {facts.map(({ label, value, icon: FactIcon }) => (
          <li key={label} className="w-[46%] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs">
            <FactIcon className="h-4 w-4" style={{ color: accent }} aria-hidden="true" />
            <p className="mt-3 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-0.5 text-xs font-extrabold leading-snug">{value}</p>
          </li>
        ))}
      </ul>

      <StoryDeck cards={story} accent={accent} />

      {glimpses.length > 0 && (
        <section className="mt-8" aria-labelledby="mobile-glimpses">
          <Reveal className="px-4"><h2 id="mobile-glimpses" className="text-lg font-extrabold">Inside the experience</h2></Reveal>
          <ul className="no-scrollbar mt-3 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2">
            {glimpses.map((glimpse) => (
              <li key={glimpse.title} className="w-[72%] shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img src={glimpse.image} alt={`${project.title}: ${glimpse.title}`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
                <p className="px-3.5 py-3 text-xs font-extrabold">{glimpse.title}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="space-y-6 px-4 pt-8">
        {detail?.stickyNoteText && (
          <motion.blockquote className="rounded-sm border border-amber-200 bg-amber-50 p-4 font-handwritten text-lg font-semibold leading-7 text-slate-800 shadow-sm"
            initial={{ opacity: 0, rotate: 0 }} whileInView={{ opacity: 1, rotate: -1.5 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: EASE.out }}>
            “{detail.stickyNoteText}”
          </motion.blockquote>
        )}

        <Reveal as="section" className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <h2 className="text-sm font-extrabold">Built with</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((name) => <li key={name} className="rounded-lg bg-[#F1F4F2] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-700">{name}</li>)}
          </ul>
        </Reveal>

        {detail?.whatsNextItems?.length ? (
          <section aria-labelledby="mobile-next">
            <h2 id="mobile-next" className="text-sm font-extrabold">Possible next steps</h2>
            <RevealGroup as="ol" className="mt-3 space-y-2">
              {detail.whatsNextItems.map((item, index) => (
                <RevealItem as="li" key={item} className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700">
                  <span className="font-mono text-[10px] font-bold" style={{ color: accent }}>0{index + 1}</span>{item}
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        ) : null}

        {answer && (
          <details className="group rounded-2xl border border-slate-200/90 bg-white p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-extrabold [&::-webkit-details-marker]:hidden">
              {answer.question}<ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs leading-6 text-slate-600">{answer.answer}</p>
          </details>
        )}

        <Reveal as="section" className="relative overflow-hidden rounded-3xl bg-[#101A19] p-5 text-white">
          <span aria-hidden="true" className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-[26px] border-[#174B40]" />
          <p className="relative font-handwritten text-xl">Like what you see?</p>
          <p className="relative mt-1 text-xs text-slate-300">Let’s build something useful together.</p>
          <div className="relative mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={onOpenStartProject} id="btn-build-similar-project" className="inline-flex items-center gap-2 rounded-full bg-[#F5C748] px-4 py-2.5 text-xs font-extrabold text-[#131921] active:scale-95">
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </button>
            {detail?.liveUrl && (
              <a href={detail.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold">
                Live project <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          {detail?.relatedLinks?.length ? (
            <ul className="relative mt-4 space-y-1 border-t border-white/10 pt-3">
              {detail.relatedLinks.map((link) => <li key={link.href}><a href={link.href} className="flex items-center justify-between py-1.5 text-[11px] font-bold text-slate-300">{link.label}<ArrowUpRight className="h-3.5 w-3.5" /></a></li>)}
            </ul>
          ) : null}
        </Reveal>
      </div>
    </main>
  );
}

/** The case study as swipeable cards; the dots follow the swipe. */
function StoryDeck({ cards, accent }: { cards: { label: string; body: ReactNode }[]; accent: string }) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLOListElement>(null);
  const onScroll = (event: UIEvent<HTMLOListElement>) => {
    const list = event.currentTarget;
    const card = list.firstElementChild as HTMLElement | null;
    if (!card) return;
    const next = Math.round(list.scrollLeft / (card.offsetWidth + 12));
    if (next !== active) setActive(Math.min(cards.length - 1, Math.max(0, next)));
  };
  const goTo = (index: number) => {
    const card = track.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  return (
    <section className="mt-8" aria-labelledby="mobile-story">
      <div className="flex items-end justify-between px-4">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>The project, in sequence</p>
          <h2 id="mobile-story" className="mt-1 text-lg font-extrabold">From context to release</h2>
        </div>
        <span className="font-mono text-[10px] font-bold text-slate-500">0{active + 1}/0{cards.length}</span>
      </div>
      <ol ref={track} onScroll={onScroll} className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2">
        {cards.map((card, index) => (
          <li key={card.label} className="flex w-[84%] shrink-0 snap-start flex-col rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white" style={{ backgroundColor: accent }}>{index + 1}</span>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>{card.label}</p>
            </div>
            <div className="mt-4">{card.body}</div>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {cards.map((card, index) => (
          <button key={card.label} type="button" onClick={() => goTo(index)} aria-label={`Show ${card.label}`} aria-current={index === active ? 'step' : undefined}
            className="relative flex h-6 w-6 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            {index === active && <motion.span layoutId="story-dot" transition={SPRING.gentle} className="absolute h-1.5 w-4 rounded-full" style={{ backgroundColor: accent }} />}
          </button>
        ))}
      </div>
    </section>
  );
}

/** Cover for projects without screenshots: a phone frame composed from the project's own data. */
function PhoneCover({ project, Icon, accent }: { project: Project; Icon: LucideIcon; accent: string }) {
  return (
    <motion.div className="relative h-full" initial={{ opacity: 0, y: 20, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: -5 }} transition={{ duration: 0.8, ease: EASE.out }}>
      <div className="flex h-full w-[150px] flex-col rounded-[1.6rem] border-2 border-[#131921] bg-white p-3 shadow-xl">
        <span aria-hidden="true" className="mx-auto h-1.5 w-10 rounded-full bg-[#131921]" />
        <span className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: accent }}><Icon className="h-5 w-5" /></span>
        <p className="mt-3 text-[11px] font-extrabold leading-tight">{project.title}</p>
        <p className="mt-1 line-clamp-2 text-[8px] leading-3 text-slate-500">{project.detailData?.heroDoodleText}</p>
        <div aria-hidden="true" className="mt-auto space-y-1.5">
          <span className="block h-5 rounded-md" style={{ backgroundColor: `${accent}22` }} />
          <span className="block h-5 rounded-md bg-slate-100" />
          <span className="block h-5 w-2/3 rounded-md bg-slate-100" />
        </div>
      </div>
      <motion.span aria-hidden="true" className="absolute -right-6 top-6 rounded-full border border-[#131921] bg-[#F5C748] px-2.5 py-1 text-[9px] font-extrabold"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 18 }}>
        {project.status}
      </motion.span>
    </motion.div>
  );
}
