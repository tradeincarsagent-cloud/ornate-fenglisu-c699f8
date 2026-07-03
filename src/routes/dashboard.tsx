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

            <section className="dashboard-border mb-8 rounded-2xl border-2 border-primary/35 bg-gradient-to-br from-primary-container/35 via-surface-container to-surface-container-high p-6 shadow-[0_0_40px_rgba(58,77,255,0.12)] md:p-8">
              <h2 className="mb-6 text-headline-lg font-headline-lg text-primary">AI Recommendation of the Day</h2>
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
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Current Price</p>
                  <p className="text-body-md font-body-md text-on-surface">£31,995</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Estimated Retail Value</p>
                  <p className="text-body-md font-body-md text-on-surface">£36,250</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Estimated Gross Profit</p>
                  <p className="text-body-md font-body-md text-on-surface">£4,255</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">AI Confidence</p>
                  <p className="text-body-md font-body-md text-on-surface">97%</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Priority</p>
                  <p className="text-body-md font-body-md text-primary">★★★★★ High Priority</p>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Reason for Recommendation</p>
                  <ul className="space-y-1 text-body-md font-body-md text-on-surface-variant">
                    <li>• Recently reduced in price</li>
                    <li>• Below current market average</li>
                    <li>• Strong dealer demand</li>
                    <li>• Excellent resale potential</li>
                    <li>• Located only 42 miles away</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Recommended Action</p>
                  <p className="text-body-md font-body-md text-on-surface">Review this vehicle first today.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary hover:opacity-90 transition-opacity">
                  Review Opportunity
                </button>
                <button className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface hover:border-primary/40 transition-colors">
                  Save to Watchlist
                </button>
              </div>
              <p className="mt-5 text-body-sm font-body-sm text-on-surface-variant">
                AI recommendations are generated using pricing trends, vehicle demand and opportunity scoring. Live data will be connected in a future release.
              </p>
            </section>

            <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">“Your latest AI search results will appear here.”</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
