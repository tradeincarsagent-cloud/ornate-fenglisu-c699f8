import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cookie-policy')({
  component: CookiePolicyPage,
})

function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Legal</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg">Cookie Policy</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Last updated: July 2026</p>
        </div>

        <article className="space-y-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <p className="font-body-md text-body-md text-on-surface-variant">
            This Cookie Policy placeholder outlines how cookies and similar technologies may be used on Trade in Cars Agent (TICA) web properties.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            The final policy will document cookie categories, purposes, storage durations, and user choices for consent and preference management.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Updated legal language and controls will be published here before the final release process is completed.
          </p>
        </article>

        <div>
          <Link className="font-body-md text-body-md text-primary hover:opacity-85 transition-all" to="/">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
