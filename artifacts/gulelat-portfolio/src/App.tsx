import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Radio,
  Send,
  Terminal,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projectFilters = ['All work', 'Product', 'Experiments'] as const;
type ProjectFilter = (typeof projectFilters)[number];

const projects = [
  {
    id: 'gamo',
    index: '01',
    kind: 'Product',
    title: 'Gamo culture, made playable.',
    description:
      'A gamified learning experience that turns Gamo culture into a place to explore, remember, and share.',
    detail:
      'The concept connects cultural learning with playful progression. It is an exercise in translating a rich local subject into clear product language without flattening it.',
    stack: ['React', 'Node.js', 'MongoDB'],
    accent: 'orange',
  },
  {
    id: 'campus',
    index: '02',
    kind: 'Product',
    title: 'Find your way around AMU.',
    description:
      'A campus navigation experience for Arba Minch University, built around maps people can actually understand.',
    detail:
      'Built with an emphasis on useful spatial context: clear routes, recognizable landmarks, and a web experience that stays fast while working with map data.',
    stack: ['Next.js', 'TypeScript', 'MapLibre GL JS'],
    accent: 'blue',
  },
  {
    id: 'abrho',
    index: '03',
    kind: 'Product',
    title: 'A study buddy with a point of view.',
    description:
      'Abrho brings study planning, focused revision, and AI-assisted support into one approachable workspace.',
    detail:
      'The project explores where AI API integrations can remove friction from studying while keeping the student in control of the learning loop.',
    stack: ['React', 'Tailwind CSS', 'Vite', 'AI APIs'],
    accent: 'lime',
  },
  {
    id: 'bingo',
    index: '04',
    kind: 'Product',
    title: 'Online Bingo Game',
    description:
      'A multiplayer bingo concept that balances quick interaction with the underlying logic of a real game.',
    detail:
      'This project builds on Gulelat’s internship work: thinking through state, real-time-feeling interaction, and the handoff between a playful interface and reliable server logic.',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Python'],
    accent: 'ink',
  },
  {
    id: 'feedback',
    index: '05',
    kind: 'Experiments',
    title: 'AI-Based Feedback Filter',
    description:
      'An exploration of how feedback can be organized into signal, context, and a useful next action.',
    detail:
      'A compact experiment in practical AI: the interesting part is not the model call, but how the interface helps someone decide what to do with the result.',
    stack: ['Python', 'REST APIs', 'React'],
    accent: 'blue',
  },
  {
    id: 'checker',
    index: '06',
    kind: 'Experiments',
    title: 'Assignment Checker',
    description:
      'A tool concept for making assignment review more consistent, transparent, and less repetitive.',
    detail:
      'The work sits at the intersection of software quality and education: clear criteria, visible feedback, and a workflow that supports improvement instead of only marking errors.',
    stack: ['Python', 'TypeScript', 'Vite'],
    accent: 'orange',
  },
];

const skills = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'Pine Script v5'] },
  { label: 'Interface', items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Vite'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Telegram Mini Apps API'] },
  { label: 'Data', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Neon'] },
  { label: 'Practice', items: ['UML', 'Requirements engineering', 'Software quality metrics'] },
  { label: 'Ship', items: ['Git', 'GitHub', 'Vercel'] },
];

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono-custom text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="text-primary">{number}</span>
      <span className="h-px w-8 bg-border" />
      <span>{children}</span>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectFilter>('All work');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const visibleProjects = projects.filter((project) => filter === 'All work' || project.kind === filter);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('gulelaterena@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <nav className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md" data-testid="navigation-main">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="outline-focus flex items-center gap-3" data-testid="link-home">
            <span className="grid h-9 w-9 place-items-center bg-foreground font-mono-custom text-sm font-bold text-background">GE</span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Gulelat Erena</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {[
              ['Work', '#work'],
              ['Approach', '#approach'],
              ['About', '#about'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="outline-focus font-mono-custom text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                data-testid={`link-nav-${label.toLowerCase()}`}
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="mailto:gulelaterena@gmail.com"
            className="outline-focus hidden items-center gap-2 border border-foreground px-4 py-2 font-mono-custom text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background sm:flex"
            data-testid="link-nav-email"
          >
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="outline-focus grid h-10 w-10 place-items-center border border-border md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-toggle-menu"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-border bg-card px-5 py-4 md:hidden" data-testid="mobile-menu">
            {[
              ['Work', '#work'],
              ['Approach', '#approach'],
              ['About', '#about'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="outline-focus block border-b border-border py-4 font-mono-custom text-xs uppercase tracking-[0.16em]"
                data-testid={`link-mobile-${label.toLowerCase()}`}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section id="top" className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-28">
        <div className="absolute -right-32 top-28 -z-10 h-72 w-72 rounded-full bg-secondary/35 blur-3xl" />
        <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="reveal mb-8 flex items-center gap-3 font-mono-custom text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Available for thoughtful work
            </div>
            <h1 className="reveal reveal-delay-1 max-w-4xl text-balance text-[clamp(3.9rem,9.7vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
              Software
              <br />
              <span className="font-display font-normal italic text-primary">with a pulse.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              I&apos;m <strong className="font-semibold text-foreground">Gulelat Erena</strong>, a software engineering graduate in Addis Ababa building useful, human-scale products across the stack.
            </p>
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="outline-focus inline-flex items-center gap-3 bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1"
                data-testid="link-hero-work"
              >
                Explore selected work <ArrowDownRight size={17} />
              </a>
              <a
                href="https://github.com/Gule756"
                target="_blank"
                rel="noreferrer"
                className="outline-focus inline-flex items-center gap-3 border border-foreground px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
                data-testid="link-hero-github"
              >
                GitHub <ExternalLink size={15} />
              </a>
            </div>
          </div>

          <div className="reveal reveal-delay-3 lg:pb-1">
            <div className="ink-panel relative overflow-hidden p-5 sm:p-7">
              <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-primary/60" />
              <div className="mb-10 flex items-center justify-between border-b border-background/20 pb-4 font-mono-custom text-[10px] uppercase tracking-[0.18em] text-background/60">
                <span className="flex items-center gap-2"><Terminal size={13} /> /gulelat/README</span>
                <span>01—26</span>
              </div>
              <div className="font-mono-custom text-sm leading-[2] text-background/80">
                <p><span className="text-secondary">const</span> engineer = {'{'}</p>
                <p className="pl-5">name: <span className="text-primary">&apos;Gulelat Erena&apos;</span>,</p>
                <p className="pl-5">base: <span className="text-primary">&apos;Addis Ababa, ET&apos;</span>,</p>
                <p className="pl-5">focus: <span className="text-primary">&apos;full-stack products&apos;</span>,</p>
                <p className="pl-5">status: <span className="text-secondary">&apos;learning in public&apos;</span></p>
                <p>{'}'};</p>
                <p className="mt-5 text-background/45">// build something that matters</p>
                <p className="mt-2"><span className="text-secondary">return</span> engineer<span className="animate-[blink_1.1s_step-end_infinite] text-primary">_</span></p>
              </div>
              <div className="mt-10 flex items-end justify-between border-t border-background/20 pt-4">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-background/50">Open to collaboration</span>
                <span className="text-4xl text-primary">↗</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="paper-panel p-4">
                <p className="font-display text-4xl text-primary">3.81</p>
                <p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-muted-foreground">CGPA / 4.00</p>
              </div>
              <div className="paper-panel p-4">
                <p className="font-display text-4xl text-foreground">86.25%</p>
                <p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-muted-foreground">National Exit Exam</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex items-center gap-4 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-10 w-px bg-primary" />
          Scroll to see the thinking
        </div>
      </section>

      <section className="border-y border-foreground bg-primary py-5 text-primary-foreground" aria-label="Capabilities">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 text-center font-mono-custom text-[10px] uppercase tracking-[0.16em] sm:justify-between sm:px-8 lg:px-12">
          <span>JavaScript</span><span className="opacity-50">/</span><span>TypeScript</span><span className="opacity-50">/</span><span>React</span><span className="opacity-50">/</span><span>Node.js</span><span className="opacity-50">/</span><span>Python</span><span className="opacity-50">/</span><span>Product thinking</span>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionLabel number="01">Selected work</SectionLabel>
        <div className="mb-12 grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <h2 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">
            Build the thing.
            <br />
            <span className="font-display font-normal italic text-primary">Then make it make sense.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground lg:justify-self-end">
            A selection of products and experiments shaped by curiosity, local context, and a bias toward making the next interaction obvious.
          </p>
        </div>
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
          {projectFilters.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={`outline-focus border px-4 py-2.5 font-mono-custom text-[10px] uppercase tracking-[0.14em] transition-colors ${filter === item ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
              data-testid={`button-filter-${item.toLowerCase().replace(' ', '-')}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            return (
              <article
                key={project.id}
                className={`paper-panel hover-lift group relative overflow-hidden p-6 sm:p-8 ${index === 0 ? 'md:row-span-2 md:min-h-[500px]' : ''}`}
                data-testid={`card-project-${project.id}`}
              >
                <div className={`absolute right-0 top-0 h-20 w-20 border-b border-l ${project.accent === 'orange' ? 'border-primary/60' : project.accent === 'lime' ? 'border-secondary/80' : project.accent === 'blue' ? 'border-accent' : 'border-foreground/40'}`} />
                <div className="flex items-start justify-between">
                  <span className="font-mono-custom text-xs text-primary">{project.index}</span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{project.kind}</span>
                </div>
                <div className={index === 0 ? 'mt-28' : 'mt-16'}>
                  <h3 className="max-w-md text-3xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-4xl">{project.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((tech) => <span key={tech} className="border border-border px-2.5 py-1 font-mono-custom text-[10px] text-muted-foreground">{tech}</span>)}
                </div>
                {isExpanded && <p className="mt-7 border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground/75" data-testid={`text-project-detail-${project.id}`}>{project.detail}</p>}
                <button
                  type="button"
                  onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                  className="outline-focus mt-9 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                  data-testid={`button-project-${project.id}`}
                >
                  {isExpanded ? 'Close notes' : 'Read the notes'} {isExpanded ? <ChevronDown size={15} className="rotate-180" /> : <ArrowUpRight size={15} />}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="approach" className="ink-panel relative overflow-hidden py-24 sm:py-28">
        <div className="absolute -left-10 top-10 font-display text-[17rem] leading-none text-background/[0.035]">03</div>
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <SectionLabel number="02">How I work</SectionLabel>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
            <div>
              <h2 className="text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-7xl">
                Clarity is a
                <br />
                <span className="font-display font-normal italic text-primary">technical skill.</span>
              </h2>
              <p className="mt-7 max-w-sm leading-relaxed text-background/60">
                I care about the quiet decisions that make software feel trustworthy: naming, feedback, constraints, and the path a person takes through a product.
              </p>
            </div>
            <div className="divide-y divide-background/20 border-y border-background/20">
              {[
                ['01', 'Start with the actual question', 'Before reaching for a stack, I make the problem legible. What needs to be true for this to be useful?'],
                ['02', 'Make the first version teach us', 'A good early build is not precious. It creates a short feedback loop between an idea, an interaction, and a real person.'],
                ['03', 'Leave the code kinder', 'Readable structure, honest edge cases, and small interfaces make the next change easier for everyone.'],
              ].map(([number, title, text]) => (
                <div key={number} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr]">
                  <span className="font-mono-custom text-xs text-primary">{number}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-background/55">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionLabel number="03">The person behind the pull request</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <h2 className="max-w-xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">
              Grounded in
              <br />
              <span className="font-display font-normal italic text-primary">Addis Ababa.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              I am completing a BSc in Software Engineering at Arba Minch University. My work moves between rigorous engineering and the human details that make a tool belong to its context.
            </p>
            <div className="mt-9 flex items-center gap-3 font-mono-custom text-[11px] uppercase tracking-[0.13em] text-muted-foreground">
              <MapPin size={15} className="text-primary" /> Addis Ababa, Ethiopia
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="paper-panel p-6 sm:col-span-2">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Experience / internship</span>
                <span className="font-mono-custom text-xs text-primary">2025</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Ennlite Academy</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">Built a full-stack bingo gaming application with JavaScript, Node.js, React.js, and MongoDB — learning how a playful product still needs serious systems thinking underneath.</p>
            </div>
            <div className="paper-panel p-6">
              <Radio className="text-primary" size={21} />
              <h3 className="mt-8 text-xl font-semibold">Lead with service</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Secretary of the Human Rights Club at AMUSU, recognized for service and discipline.</p>
            </div>
            <div className="paper-panel p-6">
              <GitBranch className="text-primary" size={21} />
              <h3 className="mt-8 text-xl font-semibold">Keep showing up</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">National voluntary community service, alongside a steady practice of building and learning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-24 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <SectionLabel number="04">Working toolkit</SectionLabel>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label} className="border-t border-border pt-5" data-testid={`skill-group-${group.label.toLowerCase()}`}>
                <div className="mb-5 flex items-center gap-3">
                  <Braces size={17} className="text-primary" />
                  <h3 className="font-mono-custom text-[11px] uppercase tracking-[0.16em]">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => <span key={item} className="bg-background px-3 py-2 text-sm text-muted-foreground">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-secondary py-24 sm:py-32">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[32px] border-foreground/10" />
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <SectionLabel number="05">Make an introduction</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-balance text-6xl font-semibold leading-[0.86] tracking-[-0.07em] sm:text-8xl">
                Have a good
                <br />
                <span className="font-display font-normal italic">problem?</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/70">Tell me what you&apos;re working through. I&apos;m interested in teams, products, and collaborations where the details matter.</p>
            </div>
            <div className="lg:justify-self-end">
              <a
                href="mailto:gulelaterena@gmail.com"
                className="outline-focus group flex items-center gap-4 border-b-2 border-foreground pb-3 text-xl font-semibold transition-colors hover:border-primary hover:text-primary sm:text-2xl"
                data-testid="link-contact-email"
              >
                <Mail size={22} /> gulelaterena@gmail.com <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={21} />
              </a>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="outline-focus inline-flex items-center gap-2 border border-foreground/40 px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-secondary"
                  data-testid="button-copy-email"
                >
                  {copied ? <Check size={13} /> : <Layers3 size={13} />} {copied ? 'Copied' : 'Copy email'}
                </button>
                <a
                  href="tel:+251968196913"
                  className="outline-focus inline-flex items-center gap-2 px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[0.12em] text-foreground/65 transition-colors hover:text-foreground"
                  data-testid="link-contact-phone"
                >
                  <Send size={13} /> +251 968 196 913
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground py-8 text-background">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center bg-primary font-mono-custom text-xs font-bold text-primary-foreground">GE</span>
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.16em] text-background/60">Gulelat Erena / Software Engineering</span>
          </div>
          <div className="flex items-center gap-6 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-background/50">
            <a href="https://github.com/Gule756" target="_blank" rel="noreferrer" className="outline-focus transition-colors hover:text-secondary" data-testid="link-footer-github">GitHub</a>
            <span>© 2026</span>
            <a href="#top" className="outline-focus inline-flex items-center gap-2 transition-colors hover:text-secondary" data-testid="link-back-top">Back to top <ArrowUpRight size={13} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;