import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/opportunity')({
  component: OpportunityPage,
})

function OpportunityPage() {
  const keyMetrics = [
    { label: 'Confidence', value: '97%' },
    { label: 'Opportunity Score', value: '97 / 100' },
    { label: 'Estimated Retail Value', value: '£36,250' },
    { label: 'Estimated Gross Profit', value: '£4,255' },
    { label: 'Demand Rating', value: '★★★★★' },
  ]

  const vehicleInfo = [
    { label: 'Mileage', value: '47,820 miles' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Fuel', value: 'Petrol' },
    { label: 'Colour', value: 'Black Sapphire' },
    { label: 'Owners', value: '2 previous owners' },
    { label: 'Location', value: 'Manchester' },
    { label: 'Seller Type', value: 'Independent dealer' },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-8 text-on-surface sm:px-6 md:px-10">
      <div className="mx-auto w-full max-w-container-max space-y-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-headline-lg font-headline-lg text-primary">AI Buying Report</h1>
            <p className="text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant">Premium Opportunity Review</p>
          </div>
          <a
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary sm:w-auto"
          >
            Return to Dashboard
          </a>
        </header>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-5 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant">Target Vehicle</p>
              <h2 className="mt-3 text-headline-lg font-headline-lg text-on-surface">BMW M3 Competition</h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-lg font-body-lg text-on-surface">
                <span>2022</span>
                <span className="text-primary">£31,995</span>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-primary-container p-5 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.2em] text-on-primary-container/80">AI Verdict</p>
              <p className="mt-4 text-[56px] font-semibold leading-none text-on-primary-container sm:text-[72px]">BUY</p>
            </div>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {keyMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <dt className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">{metric.label}</dt>
                <dd className="mt-2 text-body-lg font-body-lg text-on-surface">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface">AI Opportunity Analysis</h2>
          <p className="mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant">
            This M3 Competition presents a strong margin profile with high market demand, stable retail velocity, and a purchase price
            positioned well below projected forecourt value. The pricing spread and demand indicators support a confident stock turn
            opportunity for premium performance inventory.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Vehicle Information</h2>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vehicleInfo.map((item) => (
              <div key={item.label} className="rounded-xl border border-outline-variant/25 bg-surface-container-high p-4">
                <dt className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">{item.label}</dt>
                <dd className="mt-1 text-body-md font-body-md text-on-surface">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Vehicle History &amp; MOT Checks</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Powered by trusted vehicle data providers.</p>
          <p className="mt-2 text-body-md font-body-md text-primary">Status: Available soon.</p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Dealer Notes</h2>
          <textarea
            placeholder="Add internal notes, call outcomes, valuation observations, and next actions..."
            className="h-40 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60"
          />
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <button className="rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110">
              Save Opportunity
            </button>
            <button className="rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Ignore
            </button>
            <button className="rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Contact Seller
            </button>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface"
            >
              Return to Dashboard
            </a>
            <button className="rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Explain Why
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
