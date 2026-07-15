import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Legal</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg">Privacy Policy</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Last updated: July 2026</p>
        </div>

        <article className="space-y-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <p className="font-body-md text-body-md text-on-surface-variant">
            This Privacy Policy placeholder explains the structure of how Trade in Cars Agent (TICA) intends to collect, use, and safeguard personal data.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We plan to provide complete details about data categories, processing purposes, lawful bases, retention timelines, and user rights before full production launch.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Final legal wording will be reviewed and published in this location. Continued use after publication will be subject to the updated policy.
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
