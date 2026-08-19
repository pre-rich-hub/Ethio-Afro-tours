import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import type { PolicyDocument } from '@/lib/policies'
import { policyEffectiveDate } from '@/lib/policies'
import { contact } from '@/lib/site'

export function PolicyPage({ document }: { document: PolicyDocument }) {
  return (
    <article lang="en">
      <header className="border-b border-border bg-bg-dark pt-32 text-background sm:pt-36">
        <div className="shell pb-14 sm:pb-18 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-[11px] uppercase tracking-[0.16em] text-background/55">
            <Link href="/" className="transition-colors hover:text-accent">Home</Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-background/85">{document.title}</span>
          </nav>
          <p className="eyebrow mb-5 text-accent"><span className="rule" />{document.eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
            {document.title}
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-background/72 sm:text-lg">
            {document.description}
          </p>
          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-background/15 pt-6 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.18em] text-background/45">Effective date</dt>
              <dd className="mt-1 text-background/85">{policyEffectiveDate}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.18em] text-background/45">Controlling language</dt>
              <dd className="mt-1 text-background/85">English</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="shell grid gap-12 py-14 sm:py-18 lg:grid-cols-[260px_minmax(0,760px)] lg:justify-between lg:gap-20 lg:py-24">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-border bg-card p-5 sm:p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">On this page</h2>
            <ol className="mt-5 space-y-3">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm leading-snug text-muted-foreground transition-colors hover:text-primary">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-5 border-l-2 border-accent pl-4 text-xs leading-relaxed text-muted-foreground">
            This document is provided in English. If any translated summary differs, this English version controls.
          </p>
        </aside>

        <div>
          <p className="border-b border-border pb-10 text-pretty font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
            {document.introduction}
          </p>

          <div className="divide-y divide-border">
            {document.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 py-10 sm:py-12">
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-pretty leading-7 text-muted-foreground">{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="mt-5 space-y-3 pl-5 text-muted-foreground marker:text-accent">
                    {section.bullets.map((item) => <li key={item} className="list-disc pl-2 leading-7">{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-4 bg-primary p-7 text-primary-foreground sm:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Questions about this document?</p>
            <h2 className="mt-3 text-2xl sm:text-3xl">Speak with our Addis Ababa team</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/75">
              For policy questions or privacy requests, email us and include enough information for us to understand and respond to your request.
            </p>
            <a href={`mailto:${contact.email}`} className="mt-6 inline-flex items-center gap-2 border border-primary-foreground/25 px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent">
              <Mail className="h-4 w-4" aria-hidden /> {contact.email}
            </a>
          </section>

          <nav aria-label="Related policies" className="mt-10 border-t border-border pt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Related information</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {document.related.map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent">
                  {item.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          </nav>

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            This page is intended to clearly describe our current practices and terms. It is not a substitute for independent legal advice.
          </p>
        </div>
      </div>
    </article>
  )
}
