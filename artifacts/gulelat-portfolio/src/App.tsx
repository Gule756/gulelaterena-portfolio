import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  Minus,
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

const greetings = ['Hello', 'Selam', 'Akkam'];
const projectFilters = ['All', 'Applications', 'Capstone'] as const;
type ProjectFilter = (typeof projectFilters)[number];

const projects = [
  {
    id: 'feedback',
    index: '01',
    kind: 'Applications',
    title: 'AI-Based Feedback Filter',
    shortTitle: 'AI-Based Feedback Filter',
    description: 'An AI-powered platform that analyzes and filters user feedback, presenting AI-generated insights through a clear and usable interface.',
    detail: 'The project translates AI-generated insights into an interface that helps people understand feedback and decide what to do next.',
    stack: ['JavaScript', 'TypeScript', 'CSS'],
    focus: ['AI integration', 'Frontend development', 'User experience'],
  },
  {
    id: 'abrho',
    index: '02',
    kind: 'Applications',
    title: 'Abrho AI — Study Assistant',
    shortTitle: 'Abrho AI — Study Assistant',
    description: 'An AI-powered study assistant designed to help students organize and reinforce their learning.',
    detail: 'Abrho brings study planning and interactive learning support together, exploring practical AI and API integration in a student-focused application.',
    stack: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite'],
    focus: ['AI integration', 'Interactive applications', 'API integration'],
  },
  {
    id: 'campus',
    index: '03',
    kind: 'Applications',
    title: 'Campus Navigator',
    shortTitle: 'Campus Navigator',
    description: "A web-based navigation application designed to help students find their way around Arba Minch University's campus.",
    detail: 'Interactive map components and location markers make campus places easier to find through a clear, navigation-focused interface.',
    stack: ['Next.js', 'TypeScript', 'MapLibre GL JS'],
    focus: ['Interactive maps', 'Navigation', 'Web development'],
  },
  {
    id: 'checker',
    index: '04',
    kind: 'Applications',
    title: 'Assignment Checker',
    shortTitle: 'Assignment Checker',
    description: 'A web platform that lets students submit assignments online while simplifying the submission process for students and instructors.',
    detail: 'The project focuses on straightforward submission workflows and a clearer digital process for both sides of an assignment.',
    stack: ['Python', 'JavaScript', 'HTML', 'CSS'],
    focus: ['Web application development', 'User workflows'],
  },
  {
    id: 'bingo',
    index: '05',
    kind: 'Applications',
    title: 'Online Bingo',
    shortTitle: 'Online Bingo',
    description: 'A real-time web application developed as a full-stack project.',
    detail: 'The work combines a responsive client interface, real-time game flow, and application logic for an interactive bingo experience.',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Python'],
    focus: ['Real-time functionality', 'Frontend development', 'Application logic'],
  },
  {
    id: 'gamo',
    index: '06',
    kind: 'Capstone',
    title: 'Gamified Gamo Culture Learning App',
    shortTitle: 'Gamified Gamo Culture Learning App',
    description: 'A final-year software engineering project focused on creating a gamified learning experience around Gamo culture.',
    detail: 'Contributed to requirements engineering, UML modeling, system architecture, software quality analysis, and technical documentation.',
    stack: [],
    focus: ['Requirements engineering', 'UML modeling', 'System architecture', 'Software quality analysis', 'Technical documentation'],
  },
];

const skills = [
  ['Languages', ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS']],
  ['Frontend', ['React', 'Next.js', 'Tailwind CSS', 'Vite']],
  ['Backend', ['Node.js', 'Express', 'REST APIs']],
  ['Databases', ['PostgreSQL', 'MongoDB', 'Supabase', 'Neon']],
  ['Engineering', ['Requirements engineering', 'UML', 'Software testing', 'SDLC', 'Software quality', 'Technical documentation']],
  ['Tools', ['Git', 'GitHub', 'Vercel']],
] as const;

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-12 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[0.17em] text-muted-foreground">
      <span className="text-primary">{number}</span>
      <Minus size={13} />
      <span>{label}</span>
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
  const [isLoading, setIsLoading] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setIsLoading(false);
      return;
    }

    const greetingTimer = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % greetings.length);
    }, 520);
    const exitTimer = window.setTimeout(() => setIsLoading(false), 1880);

    return () => {
      window.clearInterval(greetingTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  const visibleProjects = projects.filter((project) => filter === 'All' || project.kind === filter);

  const copyEmail = async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText('gulelaterena@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-[#0d0f0e] text-[#e5e6de]" aria-live="polite" data-testid="loading-screen">
        <div className="loader-copy flex flex-col items-center gap-5">
          <span className="font-display text-5xl italic sm:text-6xl" key={greetingIndex}>{greetings[greetingIndex]}</span>
          <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-[#777d76]">Gulelat Erena / 2026</span>
        </div>
        <div className="absolute bottom-8 left-5 right-5 flex items-center justify-between font-mono-custom text-[9px] uppercase tracking-[0.16em] text-[#555b55] sm:left-10 sm:right-10">
          <span>Addis Ababa</span>
          <span>Software engineering</span>
        </div>
      </div>
    );
  }

  return (
    <main className="page-enter min-h-[100dvh] overflow-hidden bg-background">
      <header className="mx-auto flex max-w-[1440px] items-start justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-12" data-testid="site-header">
        <a href="#home" className="outline-focus flex flex-col gap-1" data-testid="link-home">
          <span className="text-sm font-medium tracking-[-0.02em]">Gulelat Erena</span>
          <span className="font-mono-custom text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Software engineer</span>
        </a>
        <div className="hidden items-start gap-14 md:flex">
          <nav className="flex items-center gap-8 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-muted-foreground" aria-label="Primary navigation">
            {[
              ['01', 'Work', '#work'],
              ['02', 'About', '#about'],
              ['03', 'Contact', '#contact'],
            ].map(([number, label, href]) => (
              <a key={label} href={href} className="outline-focus quiet-link flex items-center gap-2" data-testid={`link-nav-${label.toLowerCase()}`}>
                <span className="text-primary">{number}</span>{label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
            <a href="https://github.com/Gule756" target="_blank" rel="noreferrer" className="outline-focus quiet-link" data-testid="link-header-github">GitHub</a>
            <a href="mailto:gulelaterena@gmail.com" className="outline-focus quiet-link" data-testid="link-header-email">Email</a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="outline-focus grid h-9 w-9 place-items-center border border-border text-muted-foreground md:hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          data-testid="button-toggle-menu"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {mobileOpen && (
        <div className="fade-in border-y border-border bg-secondary px-5 py-3 md:hidden" data-testid="mobile-menu">
          <nav className="flex flex-col font-mono-custom text-[10px] uppercase tracking-[0.15em] text-muted-foreground" aria-label="Mobile navigation">
            {[
              ['01', 'Work', '#work'],
              ['02', 'About', '#about'],
              ['03', 'Contact', '#contact'],
            ].map(([number, label, href]) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)} className="outline-focus flex items-center gap-3 border-b border-border py-4" data-testid={`link-mobile-${label.toLowerCase()}`}>
                <span className="text-primary">{number}</span>{label}
              </a>
            ))}
            <a href="https://github.com/Gule756" target="_blank" rel="noreferrer" className="outline-focus py-4" data-testid="link-mobile-github">GitHub</a>
          </nav>
        </div>
      )}

      <section id="home" className="mx-auto flex min-h-[calc(100dvh-94px)] max-w-[1440px] flex-col justify-between px-5 pb-9 pt-20 sm:px-8 sm:pb-12 sm:pt-28 lg:px-12 lg:pt-32">
        <div className="page-enter-late max-w-[980px]">
          <p className="mb-8 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Based in Addis Ababa, Ethiopia
          </p>
          <h1 className="text-balance text-[clamp(4rem,12.8vw,12.5rem)] font-medium leading-[0.78] tracking-[-0.085em]">
            Software
            <br />
            <span className="font-display italic text-primary">Engineer.</span>
          </h1>
          <p className="mt-10 max-w-[470px] text-lg leading-relaxed text-muted-foreground sm:ml-[18%] sm:text-xl">
            I build modern web applications and AI-powered products, with experience across frontend development, backend development, APIs, databases, and software engineering practices.
          </p>
        </div>
        <div className="mt-24 flex items-end justify-between border-t border-border pt-5 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <a href="#work" className="outline-focus quiet-link flex items-center gap-3" data-testid="link-scroll-work">
            <ArrowDown size={14} className="text-primary" /> Scroll to selected work
          </a>
          <span className="hidden sm:block">Available for thoughtful work</span>
        </div>
      </section>

      <section id="work" className="border-t border-border" aria-labelledby="work-title">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <SectionMarker number="01" label="Selected work" />
          <div className="mb-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <h2 id="work-title" className="max-w-2xl text-5xl font-medium leading-[0.92] tracking-[-0.065em] sm:text-7xl">
              A gallery of
              <br />
              <span className="font-display italic text-primary">things made.</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Web applications and software engineering projects, built from requirements through implementation.</p>
          </div>
          <div className="mb-7 flex items-center gap-5 border-b border-border pb-5 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground" role="tablist" aria-label="Filter selected work">
            <span className="text-muted-foreground/60">Index by</span>
            {projectFilters.map((item, index) => (
              <span key={item} className="flex items-center gap-5">
                {index > 0 && <Minus size={11} className="text-border" />}
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === item}
                  onClick={() => {
                    setFilter(item);
                    setExpandedProject(null);
                  }}
                  className={`outline-focus quiet-link ${filter === item ? 'text-primary' : 'text-muted-foreground'}`}
                  data-testid={`button-filter-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              </span>
            ))}
          </div>
          <div className="border-t border-border">
            {visibleProjects.map((project) => {
              const isExpanded = expandedProject === project.id;
              return (
                <article key={project.id} className="border-b border-border" data-testid={`row-project-${project.id}`}>
                  <button
                    type="button"
                    onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                    className="row-interaction outline-focus grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 px-2 py-6 text-left sm:grid-cols-[54px_1fr_180px_28px] sm:gap-6 sm:px-4 sm:py-7"
                    aria-expanded={isExpanded}
                    data-testid={`button-project-${project.id}`}
                  >
                    <span className="font-mono-custom text-[10px] text-primary">{project.index}</span>
                    <span className="text-lg font-medium tracking-[-0.03em] sm:text-xl">{project.shortTitle}</span>
                    <span className="hidden font-mono-custom text-[10px] uppercase tracking-[0.13em] text-muted-foreground sm:block">{project.kind}</span>
                    <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="fade-in grid gap-6 border-t border-border bg-secondary px-4 py-7 sm:grid-cols-[54px_1fr_180px_28px] sm:gap-6">
                      <span className="hidden sm:block" />
                      <div>
                        <h3 className="max-w-2xl text-2xl font-medium leading-tight tracking-[-0.04em]">{project.title}</h3>
                        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground" data-testid={`text-project-detail-${project.id}`}>{project.description}</p>
                        {project.detail && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/80">{project.detail}</p>}
                        {project.stack.length > 0 && (
                          <div className="mt-5">
                            <p className="mb-2 font-mono-custom text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Tech</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono-custom text-[10px] uppercase tracking-[0.1em] text-primary">
                              {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
                            </div>
                          </div>
                        )}
                        <div className="mt-5">
                          <p className="mb-2 font-mono-custom text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{project.id === 'gamo' ? 'My work' : 'Focus'}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono-custom text-[10px] uppercase tracking-[0.1em] text-primary">
                            {project.focus.map((item) => <span key={item}>{item}</span>)}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono-custom text-[10px] uppercase tracking-[0.13em] text-muted-foreground">{project.kind}</span>
                      <span />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-border" aria-labelledby="about-title">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <SectionMarker number="02" label="About" />
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-28">
            <div>
              <h2 id="about-title" className="max-w-2xl text-5xl font-medium leading-[0.9] tracking-[-0.065em] sm:text-7xl">
                Thoughtful systems,
                <br />
                <span className="font-display italic text-primary">human scale.</span>
              </h2>
              <p className="mt-9 max-w-md text-lg leading-relaxed text-muted-foreground">
                I&apos;m a Software Engineer focused on building practical, user-centered software. My experience includes full-stack web development with React, Next.js, TypeScript, Node.js, Python, and modern databases, supported by a foundation in requirements engineering, system design, software testing, and software quality.
              </p>
              <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                I enjoy taking an idea from requirements and system design through implementation and refinement.
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><MapPin size={14} className="text-primary" /> Addis Ababa, Ethiopia</div>
            </div>
            <div className="border-t border-border">
              <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-border py-6">
                <div>
                  <p className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Education</p>
                  <h3 className="mt-4 text-xl font-medium">BSc Software Engineering</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Arba Minch University / June 2026</p>
                </div>
                <Code2 size={19} className="mt-1 text-primary" />
              </div>
              <div className="grid gap-5 border-b border-border py-6 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Internship / Feb — Jun 2025</p>
                  <h3 className="mt-4 text-xl font-medium">Software Engineering Intern / Ennlite Academy</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Developed a full-stack Bingo application and worked across frontend, backend, database, and version-control workflows.</p>
                  <p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[0.1em] text-primary">JavaScript / React / Node.js / MongoDB</p>
                </div>
                <GitBranch size={19} className="mt-1 text-primary" />
              </div>
              <div className="grid gap-5 border-b border-border py-6 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Engineering foundation</p>
                  <h3 className="mt-4 text-xl font-medium">From requirements to refinement</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Requirements engineering, UML modeling, system architecture, software testing, quality analysis, and technical documentation.</p>
                </div>
                <Terminal size={19} className="mt-1 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border" aria-labelledby="skills-title">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <SectionMarker number="03" label="Working toolkit" />
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 id="skills-title" className="text-5xl font-medium leading-[0.9] tracking-[-0.065em] sm:text-7xl">The tools<br /><span className="font-display italic text-primary">behind the work.</span></h2>
            <Code2 size={25} className="mb-1 hidden text-primary sm:block" />
          </div>
          <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(([label, items]) => (
              <div key={label} className="border-b border-border py-6 sm:px-6 sm:py-7 lg:nth-[3n+1]:pl-0 lg:nth-[3n]:pr-0">
                <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
                <p className="max-w-xs text-base leading-8 text-foreground/85">{items.join(' / ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border" aria-labelledby="contact-title">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <SectionMarker number="04" label="Contact" />
          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-7 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><Terminal size={14} className="text-primary" /> Interested in working together</p>
              <h2 id="contact-title" className="max-w-4xl text-6xl font-medium leading-[0.82] tracking-[-0.08em] sm:text-8xl">
                Have a software
                <br />
                <span className="font-display italic text-primary">project to discuss?</span>
              </h2>
            </div>
            <div>
              <a href="mailto:gulelaterena@gmail.com" className="outline-focus quiet-link group flex items-center justify-between border-b border-border py-4 text-lg" data-testid="link-contact-email">
                <span className="flex items-center gap-3"><Mail size={17} /> gulelaterena@gmail.com</span>
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <a href="tel:+251968196913" className="outline-focus quiet-link group flex items-center justify-between border-b border-border py-4 text-lg" data-testid="link-contact-phone">
                <span className="flex items-center gap-3"><Send size={17} /> +251 968 196 913</span>
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <div className="mt-5 flex items-center justify-between">
                <button type="button" onClick={copyEmail} className="outline-focus font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground quiet-link" data-testid="button-copy-email">
                  {copied ? <span className="flex items-center gap-2 text-primary"><Check size={13} /> Copied</span> : 'Copy email address'}
                </button>
                <a href="https://github.com/Gule756" target="_blank" rel="noreferrer" className="outline-focus font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground quiet-link" data-testid="link-contact-github">GitHub <ExternalLink size={12} className="ml-1 inline" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-7 font-mono-custom text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>Gulelat Erena / Software engineering</span>
          <div className="flex gap-6"><span>Addis Ababa, Ethiopia</span><a href="#home" className="outline-focus quiet-link" data-testid="link-back-top">Back to top</a></div>
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