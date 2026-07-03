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
  const recentOpportunities = [
    {
      vehicle: 'BMW M3 Competition',
      year: '2022',
      askingPrice: '£31,995',
      estimatedProfit: '£4,200',
      distance: '42 miles',
      source: 'Auto Trader',
      confidence: 97,
      status: 'New Today',
    },
    {
      vehicle: 'Mercedes E220 AMG Line',
      year: '2021',
      askingPrice: '£18,995',
      estimatedProfit: '£2,100',
      distance: '18 miles',
      source: 'Dealer Network',
      confidence: 93,
      status: 'Price Reduced',
    },
    {
      vehicle: 'Ford Ranger Wildtrak',
      year: '2023',
      askingPrice: '£23,995',
      estimatedProfit: '£3,600',
      distance: '65 miles',
      source: 'Facebook Marketplace',
      confidence: 95,
      status: 'New Listing',
    },
    {
      vehicle: 'VW Golf R',
      year: '2022',
      askingPrice: '£29,750',
      estimatedProfit: '£2,900',
      distance: '32 miles',
      source: 'Motorway',
      confidence: 91,
      status: 'Watch',
    },
    {
      vehicle: 'Harley-Davidson Fat Boy',
      year: '2020',
      askingPrice: '£12,995',
      estimatedProfit: '£1,800',
      distance: '55 miles',
      source: 'Dealer Stock',
      confidence: 90,
      status: 'New Today',
    },
  ]

  const getConfidenceBadgeClasses = (confidence: number) => {
    if (confidence >= 95) {
      return 'bg-emerald-500/15 text-emerald-700 ring-emerald-500/30'
    }
    if (confidence >= 90) {
      return 'bg-blue-500/15 text-blue-700 ring-blue-500/30'
    }
    return 'bg-amber-500/20 text-amber-800 ring-amber-500/30'
  }

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
              <h2 className="mb-2 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>
              <p className="mb-6 text-body-md font-body-md text-on-surface-variant">
                New vehicles matching your saved searches.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                      <th className="border-b border-outline-variant/25 px-4 py-3">Vehicle</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Year</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Asking Price</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Estimated Profit</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Distance</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Source</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Confidence</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Status</th>
                      <th className="border-b border-outline-variant/25 px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOpportunities.map((opportunity) => (
                      <tr key={opportunity.vehicle} className="text-body-md font-body-md text-on-surface">
                        <td className="border-b border-outline-variant/15 px-4 py-4">{opportunity.vehicle}</td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">{opportunity.year}</td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">{opportunity.askingPrice}</td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">{opportunity.estimatedProfit}</td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">{opportunity.distance}</td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">{opportunity.source}</td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-label-caps font-label-caps tracking-wide ring-1 ${getConfidenceBadgeClasses(opportunity.confidence)}`}
                          >
                            {opportunity.confidence}%
                          </span>
                        </td>
                        <td className="border-b border-outline-variant/15 px-4 py-4 text-on-surface-variant">
                          {opportunity.status}
                        </td>
                        <td className="border-b border-outline-variant/15 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button className="rounded-md bg-primary px-3 py-1.5 text-label-caps font-label-caps text-on-primary hover:opacity-90 transition-opacity">
                              Review
                            </button>
                            <button className="rounded-md border border-outline-variant/40 bg-surface-container-high px-3 py-1.5 text-label-caps font-label-caps text-on-surface hover:border-primary/40 transition-colors">
                              Save
                            </button>
                            <button className="rounded-md border border-outline-variant/40 bg-surface-container-high px-3 py-1.5 text-label-caps font-label-caps text-on-surface-variant hover:border-primary/40 transition-colors">
                              Ignore
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
