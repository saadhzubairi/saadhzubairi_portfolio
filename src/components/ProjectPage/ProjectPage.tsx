import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const extractAccent = (gradient: string, fallback = '#E5447A'): string => {
  const m = gradient.match(/#([0-9a-fA-F]{3,8})/);
  return m ? `#${m[1]}` : fallback;
};

type Shot = { src: string; alt: string; caption?: string };
type GalleryItem = { src: string; alt: string; label?: string; tone?: string };
type Highlight = { kw: string; title: string; lede: string; body: string; shots: Shot[] };
type Challenge = { title: string; body: string };

type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  caseNumber: string;
  status: string;
  updated: string;
  role: string;
  team: string;
  duration: string;
  links: { github?: string };
  stack: string[];
  banner: {
    gradient: string;
    screenshot: { src: string; alt: string };
    wordmark: string;
    caption: { fig: string; center: string; right: string };
  };
  aboutHeadline: string;
  blurb: string;
  pullQuotes: string[];
  highlightsHeadline: string;
  highlights: Highlight[];
  galleryHeadline: string;
  gallery: GalleryItem[];
  challengesHeadline: string;
  challenges: Challenge[];
  skills: { tech: string[]; soft: string[] };
  navigation: {
    previous: { name: string; slug: string } | null;
    next: { name: string; slug: string } | null;
  };
};

type LightboxItem = { src: string; alt: string; caption?: string };
type OpenLightbox = (items: LightboxItem[], index: number) => void;

const Lightbox: React.FC<{
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}> = ({ items, index, onClose, onIndex }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onClose, onIndex]);

  const item = items[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
        <span>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button onClick={onClose} className="cursor-pointer transition hover:text-white" aria-label="Close">
          ✕ Close
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-6 pb-6 cursor-default" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onIndex((index - 1 + items.length) % items.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 px-4 py-2 font-mono text-xs text-white/70 cursor-pointer transition hover:text-white"
          aria-label="Previous"
        >
          ← Prev
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="max-h-full max-w-[80%] object-contain"
          />
        </AnimatePresence>
        <button
          onClick={() => onIndex((index + 1) % items.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 px-4 py-2 font-mono text-xs text-white/70 cursor-pointer transition hover:text-white"
          aria-label="Next"
        >
          Next →
        </button>
      </div>
      {item.caption && (
        <div className="px-6 pb-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {item.caption}
        </div>
      )}
    </motion.div>
  );
};

const Rule: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-px w-full bg-neutral-900/10 dark:bg-neutral-100/10 ${className}`} />
);

const MonoLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 ${className}`}>
    {children}
  </span>
);

const Banner: React.FC<{ banner: Project['banner'] }> = ({ banner }) => (
  <section className="relative w-full overflow-hidden max-h-[550px]" style={{ background: banner.gradient }}>
    <div className="mx-auto max-w-6xl px-0 pt-16 pb-16">
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-2xl">
        {/* faux browser chrome */}
        <div className="flex items-center gap-2 border-b border-black/10 back bg-gray-200 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <div className="ml-4 flex-1">
            <div className="mx-auto w-64 rounded-md bg-white px-3 py-1 text-center font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
              {banner.wordmark.toLowerCase()}
            </div>
          </div>
        </div>
        <img src={banner.screenshot.src} alt={banner.screenshot.alt} className="block w-full object-cover object-top" />
      </div>
    </div>
  </section>
);

const Hero: React.FC<{ p: Project }> = ({ p }) => (
  <section className="mx-auto max-w-6xl px-0 pt-32 pb-16">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8">
        <MonoLabel>PROJECT · {p.id.toUpperCase()}</MonoLabel>
        <h1 className="mt-6 text-[clamp(64px,9vw,140px)] font-black leading-[0.9] tracking-tight text-neutral-900 dark:text-neutral-100">
          {p.title}.
        </h1>
        <p className="mt-8 max-w-2xl text-xl font-light leading-snug text-neutral-700 dark:text-neutral-300">
          {p.tagline}
        </p>
        {p.links.github && (
          <div className="mt-8">
            <a
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 dark:border-neutral-100 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-900 dark:text-neutral-100 transition hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
            >
              ↗ Repo
            </a>
          </div>
        )}
      </div>
      <aside className="col-span-12 lg:col-span-4">
        <div className="border-t border-neutral-900/15 dark:border-neutral-100/15">
          {[
            ['Role', p.role],
            ['Team', p.team],
            ['Duration', p.duration],
            ['Status', p.status],
            ['Year', p.year],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-neutral-900/15 dark:border-neutral-100/15 py-3">
              <MonoLabel>{k}</MonoLabel>
              <span className="font-mono text-xs text-neutral-900 dark:text-neutral-100">{v}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  </section>
);

const StackGrid: React.FC<{ stack: string[] }> = ({ stack }) => (
  <section className="border-y border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-50 dark:bg-neutral-900">
    <div className="mx-auto max-w-6xl px-0 py-8">
      <div className="mb-4 flex items-center justify-between">
        <MonoLabel>Stack</MonoLabel>
        <MonoLabel>{stack.length} items</MonoLabel>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4 lg:grid-cols-8">
        {stack.map((s, i) => (
          <div key={s} className="flex items-baseline gap-2 border-t border-neutral-900/10 dark:border-neutral-100/10 pt-2">
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-mono text-sm text-neutral-900 dark:text-neutral-100">{s}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About: React.FC<{ p: Project }> = ({ p }) => (
  <section className="mx-auto max-w-6xl px-0 py-24">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4">
        <MonoLabel>§ About</MonoLabel>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <h2 className="text-4xl font-light leading-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          {p.aboutHeadline}
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{p.blurb}</p>
      </div>
    </div>
  </section>
);

const PullQuote: React.FC<{ quote: string; index: string; accent: string }> = ({ quote, index, accent }) => (
  <section style={{ backgroundColor: accent }} className="text-white">
    <div className="mx-auto max-w-6xl px-0 py-20">
      <div className="flex items-start justify-between gap-8">
        <MonoLabel className="!text-white/80">PULL · {index}</MonoLabel>
        <MonoLabel className="!text-white/80">QUOTE</MonoLabel>
      </div>
      <blockquote className="mt-6 max-w-5xl text-[clamp(32px,5vw,64px)] font-light leading-[1.05] tracking-tight">
        “{quote}”
      </blockquote>
    </div>
  </section>
);

const HighlightRow: React.FC<{ h: Highlight; index: number; openLightbox: OpenLightbox }> = ({ h, index, openLightbox }) => (
  <div className="border-t border-neutral-900/15 dark:border-neutral-100/15 py-12">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
          <MonoLabel>{h.kw}</MonoLabel>
        </div>
        <h3 className="mt-4 text-3xl font-light leading-tight text-neutral-900 dark:text-neutral-100">{h.title}</h3>
        <p className="mt-4 text-lg italic text-neutral-700 dark:text-neutral-300">{h.lede}</p>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">{h.body}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {h.shots.map((s, i) => (
            <figure key={s.src} className="space-y-2">
              <button
                type="button"
                onClick={() => openLightbox(h.shots, i)}
                className="block w-full overflow-hidden border border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-50 dark:bg-neutral-900 cursor-pointer transition duration-200 hover:opacity-90"
              >
                <img src={s.src} alt={s.alt} className="block aspect-[4/3] w-full object-cover transition hover:opacity-90" />
              </button>
              {s.caption && <figcaption className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">{s.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Highlights: React.FC<{ p: Project; openLightbox: OpenLightbox }> = ({ p, openLightbox }) => (
  <section className="mx-auto max-w-6xl px-0 py-24">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4">
        <MonoLabel>§ Highlights</MonoLabel>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <h2 className="text-4xl font-light leading-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          {p.highlightsHeadline}
        </h2>
      </div>
    </div>
    <div className="mt-12">
      {p.highlights.map((h, i) => <HighlightRow key={h.title} h={h} index={i} openLightbox={openLightbox} />)}
      <Rule />
    </div>
  </section>
);

const Gallery: React.FC<{ p: Project; openLightbox: OpenLightbox }> = ({ p, openLightbox }) => (
  <section className="border-t border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-50 dark:bg-neutral-900">
    <div className="mx-auto max-w-6xl px-0 py-24">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <MonoLabel>§ Gallery</MonoLabel>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <h2 className="text-4xl font-light leading-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            {p.galleryHeadline}
          </h2>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {p.gallery.map((g, i) => {
          const [left, right] = (g.label || '').split('·').map((s) => s.trim());
          return (
            <figure key={g.src} className="space-y-2">
              <button
                type="button"
                onClick={() => openLightbox(p.gallery.map((x) => ({ src: x.src, alt: x.alt, caption: x.label })), i)}
                className="block w-full overflow-hidden border border-neutral-900/10 dark:border-neutral-100/10 bg-white dark:bg-neutral-900 cursor-pointer transition duration-200 hover:opacity-90"
              >
                <img src={g.src} alt={g.alt} className="block aspect-[3/4] w-full object-cover transition hover:opacity-90" />
              </button>
              <figcaption className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-700 dark:text-neutral-300">{left}</span>
                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">{right}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  </section>
);

const Challenges: React.FC<{ p: Project }> = ({ p }) => (
  <section className="mx-auto max-w-6xl px-0 py-24">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4">
        <MonoLabel>§ Challenges</MonoLabel>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <h2 className="text-4xl font-light leading-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
          {p.challengesHeadline}
        </h2>
      </div>
    </div>
    <div className="mt-12 grid grid-cols-1 gap-8 border-t border-neutral-900/15 dark:border-neutral-100/15 pt-8 md:grid-cols-3">
      {p.challenges.map((c, i) => (
        <div key={c.title} className="space-y-4">
          <MonoLabel>L · {String(i + 1).padStart(2, '0')}</MonoLabel>
          <h3 className="text-xl font-medium leading-tight text-neutral-900 dark:text-neutral-100">{c.title}</h3>
          <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">{c.body}</p>
        </div>
      ))}
    </div>
  </section>
);

const Skills: React.FC<{ p: Project }> = ({ p }) => (
  <section className="border-t border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-50 dark:bg-neutral-900">
    <div className="mx-auto max-w-6xl px-0 py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {[
          { title: 'Technical', items: p.skills.tech, tag: 'T' },
          { title: 'Soft', items: p.skills.soft, tag: 'S' },
        ].map((col) => (
          <div key={col.title} className="border border-neutral-900/15 dark:border-neutral-100/15 bg-white dark:bg-neutral-950 p-8">
            <div className="flex items-baseline justify-between">
              <MonoLabel>§ Skills · {col.title}</MonoLabel>
              <MonoLabel>{col.items.length} items</MonoLabel>
            </div>
            <ul className="mt-6 space-y-3">
              {col.items.map((s, i) => (
                <li key={s} className="flex items-baseline gap-4 border-t border-neutral-900/10 dark:border-neutral-100/10 pt-3">
                  <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                    {col.tag}.{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base text-neutral-900 dark:text-neutral-100">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FooterNav: React.FC<{ p: Project }> = ({ p }) => {
  const navigate = useNavigate();
  return (
    <nav className="border-t border-neutral-900/15 dark:border-neutral-100/15 bg-white dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-8 py-10">
        <button
          disabled={!p.navigation.previous}
          onClick={() => p.navigation.previous && navigate(`/portfolio/${p.navigation.previous.slug}`)}
          className="text-left disabled:opacity-40"
        >
          <MonoLabel>← Previous</MonoLabel>
          <div className="mt-2 text-2xl font-light text-neutral-900 dark:text-neutral-100">
            {p.navigation.previous ? p.navigation.previous.name : 'No previous project'}
          </div>
        </button>
        <button
          disabled={!p.navigation.next}
          onClick={() => p.navigation.next && navigate(`/portfolio/${p.navigation.next.slug}`)}
          className="text-right disabled:opacity-40"
        >
          <MonoLabel>Next →</MonoLabel>
          <div className="mt-2 text-2xl font-light text-neutral-900 dark:text-neutral-100">
            {p.navigation.next ? p.navigation.next.name : 'No next project'}
          </div>
        </button>
      </div>
    </nav>
  );
};

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [lb, setLb] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const openLightbox: OpenLightbox = (items, index) => setLb({ items, index });

  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectId) {
        try {
          const projectModule = await import(`../../assets/portfolio/${projectId}.json`);
          setProject(projectModule.default);
        } catch (error) {
          console.error('Failed to load project data:', error);
          navigate('/404');
        }
      }
    };
    fetchProjectData();
  }, [projectId, navigate]);

  if (!project) return <div className="p-16 font-mono text-sm text-neutral-500 dark:text-neutral-400">Loading…</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
    >
      <Hero p={project} />
      <Banner banner={project.banner} />
      <StackGrid stack={project.stack} />
      <About p={project} />
      <PullQuote quote={project.pullQuotes[0]} index="01" accent={extractAccent(project.banner.gradient)} />
      <Highlights p={project} openLightbox={openLightbox} />
      <Gallery p={project} openLightbox={openLightbox} />
      <Challenges p={project} />
      <PullQuote quote={project.pullQuotes[2]} index="02" accent={extractAccent(project.banner.gradient)} />
      <Skills p={project} />
      <FooterNav p={project} />
      <AnimatePresence>
        {lb && (
          <Lightbox
            items={lb.items}
            index={lb.index}
            onClose={() => setLb(null)}
            onIndex={(i) => setLb({ items: lb.items, index: i })}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectPage;
