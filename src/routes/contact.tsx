import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Company</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg">Contact</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            This is a launch-ready placeholder contact page. Final contact channels and team profiles will be published soon.
          </p>
        </div>

        <div className="space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <h2 className="font-headline-md text-headline-md">General enquiries</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Email: contact@tradeincarsagent.com
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We aim to respond within one business day.
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
