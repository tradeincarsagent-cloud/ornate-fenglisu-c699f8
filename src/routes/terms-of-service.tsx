import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms-of-service')({
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Legal</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg">Terms of Service</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Last updated: July 2026</p>
        </div>

        <article className="space-y-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <p className="font-body-md text-body-md text-on-surface-variant">
            These Terms of Service placeholder terms define the expected contractual framework for access to the Trade in Cars Agent (TICA) platform.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            The final version will include account obligations, acceptable use, service limitations, intellectual property provisions, and liability terms.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            This placeholder will be replaced with approved legal text prior to final launch and commercial rollout.
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
