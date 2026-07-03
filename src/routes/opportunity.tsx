import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/opportunity')({
  component: OpportunityPage,
})

function OpportunityPage() {
  const vehicleInfo = [
    { label: 'Mileage', value: '28,400 miles' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Fuel', value: 'Petrol' },
    { label: 'Colour', value: 'Isle of Man Green' },
    { label: 'Owners', value: '2' },
    { label: 'Location', value: 'Manchester, M1' },
    { label: 'Seller Type', value: 'Private Seller' },
  ]

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="mx-auto flex min-h-screen max-w-container-max">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col">
          <p className="mb-8 text-headline-md font-headline-md text-primary">Trade in Cars Agent</p>
          <nav className="space-y-2">
            <div className="rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">
              Dealer Command Centre
            </div>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <header className="border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
              Trade in Cars Agent
            </p>
          </header>

          <main className="flex-1 px-6 py-8 md:px-10">
            {/* Vehicle Header */}
            <div className="mb-8">
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h1 className="text-headline-lg font-headline-lg text-primary">BMW M3 Competition</h1>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">
                  High Priority Opportunity
                </span>
              </div>
              <p className="text-headline-md font-headline-md text-on-surface-variant">
                2022 &nbsp;·&nbsp; £31,995
              </p>
            </div>

            {/* Vehicle image placeholder */}
            <div className="dashboard-border mb-8 flex h-72 items-center justify-center rounded-2xl bg-surface-container-high">
              <div className="text-center">
                <p className="mb-2 text-4xl">🚗</p>
                <p className="text-body-md font-body-md text-on-surface-variant">Vehicle image placeholder</p>
                <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant/60">
                  BMW M3 Competition · 2022
                </p>
              </div>
            </div>

            {/* SECTION 1: AI Opportunity Analysis */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">AI Opportunity Analysis</h2>
              <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                <article className="dashboard-border rounded-xl bg-surface-container-high p-5">
                  <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                    Opportunity Score
                  </p>
                  <p className="text-headline-lg font-headline-lg text-primary">97<span className="text-headline-md font-headline-md text-on-surface-variant">/100</span></p>
                </article>
                <article className="dashboard-border rounded-xl bg-surface-container-high p-5">
                  <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                    Estimated Retail Value
                  </p>
                  <p className="text-headline-lg font-headline-lg text-primary">£36,250</p>
                </article>
                <article className="dashboard-border rounded-xl bg-surface-container-high p-5">
                  <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                    Estimated Gross Profit
                  </p>
                  <p className="text-headline-lg font-headline-lg text-primary">£4,255</p>
                </article>
                <article className="dashboard-border rounded-xl bg-surface-container-high p-5">
                  <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                    Demand Rating
                  </p>
                  <p className="text-headline-lg font-headline-lg text-yellow-400">★★★★★</p>
                </article>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">AI Summary</p>
                <p className="text-body-md font-body-md text-on-surface">
                  "This vehicle appears to be priced below current market average and represents an excellent dealer opportunity."
                </p>
              </div>
            </section>

            {/* SECTION 2: Vehicle Information */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">Vehicle Information</h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                {vehicleInfo.map((item) => (
                  <div key={item.label}>
                    <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                      {item.label}
                    </p>
                    <p className="text-body-md font-body-md text-on-surface">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: Vehicle History */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Vehicle History &amp; MOT Checks</h2>
              <div className="dashboard-border flex flex-col items-start gap-3 rounded-xl bg-surface-container-high p-5 md:flex-row md:items-center md:gap-6">
                <span className="rounded-full border border-outline-variant/40 px-4 py-1.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                  Status: Available Soon
                </span>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Future integration with trusted data providers.
                </p>
              </div>
            </section>

            {/* SECTION 4: Dealer Notes */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Dealer Notes</h2>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high">
                <textarea
                  readOnly
                  placeholder="Add your notes about this vehicle here…"
                  rows={6}
                  className="w-full resize-none rounded-xl bg-transparent p-5 text-body-md font-body-md text-on-surface-variant placeholder:text-on-surface-variant/50 focus:outline-none"
                />
              </div>
            </section>

            {/* SECTION 5: Actions */}
            <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90">
                  Save Opportunity
                </button>
                <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40">
                  Contact Seller
                </button>
                <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-outline-variant/70">
                  Ignore
                </button>
                <a
                  href="/dashboard"
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-surface"
                >
                  Return to Dashboard
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
