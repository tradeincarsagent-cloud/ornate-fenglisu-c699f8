import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const summaryCards = [
    { icon: '🚗', title: 'New Vehicle Opportunities', value: '8' },
    { icon: '📉', title: 'Price Drops', value: '2' },
    { icon: '⭐', title: 'High-Profit Matches', value: '3' },
    { icon: '🔔', title: 'Auctions Ending Today', value: '1' },
    { icon: '❤️', title: 'Saved Vehicles Updated', value: '5' },
  ]
  const activeSearches = [
    {
      vehicle: 'BMW M3 Competition',
      budget: 'Up to £35,000',
      radius: '200 miles',
      lastScan: '3 minutes ago',
      status: 'Monitoring',
    },
    {
      vehicle: 'Mercedes E220 AMG Line',
      budget: 'Up to £24,500',
      radius: '150 miles',
      lastScan: '11 minutes ago',
      status: 'Monitoring',
    },
    {
      vehicle: 'Ford Ranger Wildtrak',
      budget: 'Up to £29,995',
      radius: '100 miles',
      lastScan: '18 minutes ago',
      status: 'Monitoring',
    },
    {
      vehicle: 'VW Golf R',
      budget: 'Up to £27,000',
      radius: '175 miles',
      lastScan: '7 minutes ago',
      status: 'Monitoring',
    },
    {
      vehicle: 'Ford Transit Custom',
      budget: 'Up to £21,000',
      radius: '120 miles',
      lastScan: '22 minutes ago',
      status: 'Monitoring',
    },
    {
      vehicle: 'Toyota Hilux Invincible',
      budget: 'Up to £33,500',
      radius: '250 miles',
      lastScan: '5 minutes ago',
      status: 'Monitoring',
    },
  ]

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="mx-auto flex min-h-screen max-w-container-max">
        <aside className="hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col">
          <p className="mb-8 text-headline-md font-headline-md text-primary">Trade in Cars Agent</p>
          <nav className="space-y-2">
            <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary">
              Dealer Command Centre
            </div>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
              Trade in Cars Agent
            </p>
          </header>

          <main className="flex-1 px-6 py-8 md:px-10">
            <h1 className="mb-2 text-headline-lg font-headline-lg text-primary">Dealer Command Centre</h1>
            <p className="mb-8 text-headline-md font-headline-md text-on-surface">Good Morning, Jonathan</p>

            <section className="mb-8">
              <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Morning Intelligence Brief</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                {summaryCards.map((card) => (
                  <article key={card.title} className="dashboard-border rounded-xl bg-surface-container-high p-5">
                    <p className="mb-3 text-body-md font-body-md text-on-surface-variant">
                      {card.icon} {card.title}
                    </p>
                    <p className="text-headline-lg font-headline-lg text-primary">{card.value}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">Today’s Best Opportunity</h2>
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Vehicle</p>
                  <p className="text-body-md font-body-md text-on-surface">BMW M3 Competition</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Year</p>
                  <p className="text-body-md font-body-md text-on-surface">2022</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Price</p>
                  <p className="text-body-md font-body-md text-on-surface">£31,995</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Estimated Profit</p>
                  <p className="text-body-md font-body-md text-on-surface">£4,200</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Confidence Score</p>
                  <p className="text-body-md font-body-md text-on-surface">97%</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Reason</p>
                  <p className="text-body-md font-body-md text-on-surface-variant">Recently reduced in price.</p>
                  <p className="text-body-md font-body-md text-on-surface-variant">Strong resale potential.</p>
                  <p className="text-body-md font-body-md text-on-surface-variant">Located only 42 miles away.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary hover:opacity-90 transition-opacity">
                  Review Opportunity
                </button>
                <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface hover:border-primary/40 transition-colors">
                  Save Vehicle
                </button>
              </div>
            </section>

            <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">“Your latest AI search results will appear here.”</p>
            </section>

            <section className="mt-8">
              <div className="mb-6">
                <h2 className="mb-2 text-headline-md font-headline-md text-on-surface">My Active Searches</h2>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Vehicles currently being monitored by Trade in Cars Agent.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {activeSearches.map((search) => (
                  <article
                    key={search.vehicle}
                    className="dashboard-border rounded-2xl bg-surface-container-high p-6 shadow-[0_18px_45px_rgba(3,8,20,0.28)]"
                  >
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                          Vehicle Search
                        </p>
                        <h3 className="text-headline-sm font-headline-md text-on-surface">{search.vehicle}</h3>
                      </div>
                      <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">
                        {search.status}
                      </span>
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                          Maximum Budget
                        </p>
                        <p className="text-body-md font-body-md text-on-surface">{search.budget}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                          Search Radius
                        </p>
                        <p className="text-body-md font-body-md text-on-surface">{search.radius}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                          Last Scan
                        </p>
                        <p className="text-body-md font-body-md text-on-surface">{search.lastScan}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                          Status
                        </p>
                        <p className="text-body-md font-body-md text-on-surface">{search.status}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40">
                        Pause
                      </button>
                      <button className="rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40">
                        Edit
                      </button>
                      <button className="rounded-lg bg-primary px-4 py-2 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90">
                        Run Search Now
                      </button>
                      <button className="rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40">
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
