import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { setPageMetadata } from '@/lib/seo';

export default function NotFound() {
  useEffect(() => {
    setPageMetadata({
      title: 'Page not found | Gulelat Erena',
      description:
        'This page is unavailable. Return to Gulelat Erena’s software engineering portfolio to explore selected projects and contact information.',
      index: false,
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-background px-5 py-7 text-foreground sm:px-8 lg:px-12">
      <header className="flex items-center justify-between border-b border-border pb-5 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Gulelat Erena / Software Engineer</span>
        <span>404 / Page not found</span>
      </header>
      <section className="mx-auto w-full max-w-[1440px] py-24" aria-labelledby="not-found-title">
        <p className="mb-7 font-mono-custom text-[10px] uppercase tracking-[0.16em] text-primary">The address may be outdated</p>
        <h1 id="not-found-title" className="max-w-4xl text-[clamp(4rem,12vw,10rem)] font-medium leading-[0.82] tracking-[-0.08em]">
          Page not
          <br />
          <span className="font-display italic text-primary">found.</span>
        </h1>
        <p className="mt-9 max-w-md leading-relaxed text-muted-foreground">
          That link doesn&apos;t lead to a page here. Head back to the portfolio or browse the selected work.
        </p>
        <nav aria-label="404 navigation" className="mt-10 flex flex-wrap gap-7 font-mono-custom text-[10px] uppercase tracking-[0.14em]">
          <a href={import.meta.env.BASE_URL} className="outline-focus quiet-link flex items-center gap-2 text-primary">
            <ArrowLeft size={14} aria-hidden="true" /> Back to portfolio
          </a>
          <a href={`${import.meta.env.BASE_URL}#work`} className="outline-focus quiet-link flex items-center gap-2 text-muted-foreground">
            Selected work <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </section>
      <footer className="border-t border-border pt-5 font-mono-custom text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
        Addis Ababa, Ethiopia
      </footer>
    </main>
  );
}
