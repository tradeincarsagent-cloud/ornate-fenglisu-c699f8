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
  const radarSignals = [
    {
      title: 'BMW M4 Competition (2021)',
      source: 'Auto Trader',
      signal: 'Price dropped £1,250 in last 24h',
      confidence: '96%',
    },
    {
      title: 'Audi RS3 Saloon (2022)',
      source: 'BCA Auction',
      signal: 'Auction ends in 2h 14m',
      confidence: '91%',
    },
    {
      title: 'Mercedes A45 S (2020)',
      source: 'Motorway',
      signal: 'Seller just reduced reserve by £900',
      confidence: '94%',
    },
  ]
  const recentOpportunities = [
    { vehicle: 'BMW M3 Competition', margin: '£4,200', status: 'Ready for review' },
    { vehicle: 'Audi RS5 Coupe', margin: '£3,850', status: 'Seller contacted' },
    { vehicle: 'Mercedes C63 S', margin: '£3,400', status: 'Awaiting history check' },
  ]
  const activeSearches = [
    { name: 'Performance Saloons (2019+)', matches: '14', updated: '3 mins ago' },
    { name: 'SUVs under £28k', matches: '9', updated: '11 mins ago' },
    { name: 'Low-mileage hybrids', matches: '6', updated: '19 mins ago' },
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
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">AI Recommendation of the Day</h2>
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

            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">Live AI Search Radar</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {radarSignals.map((signal) => (
                  <article key={signal.title} className="rounded-xl bg-surface-container-high p-5">
                    <p className="mb-2 text-body-md font-body-md text-on-surface">{signal.title}</p>
                    <p className="mb-3 text-body-md font-body-md text-on-surface-variant">{signal.source}</p>
                    <p className="mb-3 text-body-md font-body-md text-on-surface">{signal.signal}</p>
                    <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">
                      Confidence {signal.confidence}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>
              <div className="space-y-3">
                {recentOpportunities.map((opportunity) => (
                  <article
                    key={opportunity.vehicle}
                    className="flex flex-col gap-2 rounded-xl bg-surface-container-high p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <p className="text-body-md font-body-md text-on-surface">{opportunity.vehicle}</p>
                    <p className="text-body-md font-body-md text-primary">{opportunity.margin}</p>
                    <p className="text-body-md font-body-md text-on-surface-variant">{opportunity.status}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="dashboard-border mt-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">My Active Searches</h2>
              <div className="space-y-3">
                {activeSearches.map((search) => (
                  <article
                    key={search.name}
                    className="flex flex-col gap-2 rounded-xl bg-surface-container-high p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <p className="text-body-md font-body-md text-on-surface">{search.name}</p>
                    <p className="text-body-md font-body-md text-primary">{search.matches} matches</p>
                    <p className="text-body-md font-body-md text-on-surface-variant">Updated {search.updated}</p>
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
