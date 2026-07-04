import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/opportunity')({
  component: OpportunityPage,
})

function OpportunityPage() {
  const summaryItems = [
    { label: 'Vehicle', value: 'BMW M3 Competition' },
    { label: 'Year', value: '2022' },
    { label: 'Price', value: '£31,995' },
    { label: 'AI Verdict', value: 'BUY' },
    { label: 'Confidence', value: '97%' },
    { label: 'Opportunity Score', value: '97 / 100' },
    { label: 'Estimated Retail Value', value: '£36,250' },
    { label: 'Estimated Gross Profit', value: '£4,255' },
    { label: 'Demand Rating', value: '★★★★★' },
  ]

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-on-surface md:px-10">
      <div className="mx-auto max-w-container-max space-y-8">
        <header>
          <h1 className="text-headline-lg font-headline-lg text-primary">AI Buying Report</h1>
        </header>

        <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {summaryItems.map((item) => (
              <div key={item.label}>
                <dt className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">{item.label}</dt>
                <dd className="mt-1 text-body-lg font-body-lg text-on-surface">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface">AI Opportunity Analysis</h2>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface">Vehicle Information</h2>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
          <h2 className="mb-2 text-headline-md font-headline-md text-on-surface">Vehicle History &amp; MOT Checks</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Powered by trusted vehicle data providers.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface">Dealer Notes</h2>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
          <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-primary px-5 py-2.5 text-body-md font-body-md text-on-primary">Save Opportunity</button>
            <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant">
              Ignore
            </button>
            <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant">
              Contact Seller
            </button>
            <a
              href="/dashboard"
              className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant"
            >
              Return to Dashboard
            </a>
            <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant">
              Explain Why
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
