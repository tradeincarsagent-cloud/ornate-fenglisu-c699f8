import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Company</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg">About Trade in Cars Agent (TICA)</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            TICA is built for modern vehicle dealers who need faster, smarter sourcing decisions. This page is a launch placeholder and will be replaced with final company information.
          </p>
        </div>

        <div className="space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <h2 className="font-headline-md text-headline-md">What to expect</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We are preparing a full company profile including our mission, leadership background, roadmap, and partner network.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            For now, please use the Contact and Support pages for any immediate questions while this content is finalized.
          </p>
        </div>

        <div>
          <Link className="font-body-md text-body-md text-primary hover:opacity-85 transition-all" to="/">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
