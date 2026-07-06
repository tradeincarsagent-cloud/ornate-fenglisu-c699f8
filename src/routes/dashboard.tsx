import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function DashboardPage() {
  const summaryCards = [
    { icon: '🚗', title: 'New Vehicle Opportunities', value: '8' },
    { icon: '📉', title: 'Price Drops', value: '2' },
    { icon: '⭐', title: 'High-Profit Matches', value: '3' },
    { icon: '🔔', title: 'Auctions Ending Today', value: '1' },
    { icon: '❤️', title: 'Saved Vehicles Updated', value: '5' },
  ]
  const recentOpportunities = [
    { vehicle: 'Audi RS5 Sportback', source: 'Auto Trader', price: '£37,500', profit: '£3,850', priority: 'High', confidence: '94%' },
    { vehicle: 'Range Rover Velar', source: 'PistonHeads', price: '£29,950', profit: '£2,400', priority: 'Medium', confidence: '78%' },
    { vehicle: 'Mercedes A45 AMG', source: 'Motorway', price: '£34,750', profit: '£3,120', priority: 'High', confidence: '91%' },
    { vehicle: 'Volkswagen Golf R', source: 'eBay Motors', price: '£24,200', profit: '£1,980', priority: 'Low', confidence: '65%' },
    { vehicle: 'Porsche Macan S', source: 'Auto Trader', price: '£42,000', profit: '£4,450', priority: 'High', confidence: '97%' },
  ]
  const activeSearches = [
    { name: 'Performance Saloons (2019+)', matches: '14', updated: '3 mins ago' },
    { name: 'SUVs under £28k', matches: '9', updated: '11 mins ago' },
    { name: 'Low-mileage hybrids', matches: '6', updated: '19 mins ago' },
  ]

  const [highlightedOpportunity, setHighlightedOpportunity] = useState<number | null>(null)
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false)
  const [aiSearchLive, setAiSearchLive] = useState(true)
  const [expandedSearches, setExpandedSearches] = useState<Record<number, boolean>>(
    () => Object.fromEntries(activeSearches.map((_, i) => [i, true])),
  )

  useEffect(() => {
    if (!aiSearchLive) return

    let nextOpportunityIndex = 0
    const scanInterval = setInterval(() => {
      setRadarDetectionGlow(true)
      setHighlightedOpportunity(nextOpportunityIndex)
      nextOpportunityIndex = (nextOpportunityIndex + 1) % recentOpportunities.length

      setTimeout(() => setRadarDetectionGlow(false), 1100)
      setTimeout(() => setHighlightedOpportunity(null), 1700)
    }, 6200)

    return () => clearInterval(scanInterval)
  }, [recentOpportunities.length, aiSearchLive])

  const toggleSearch = (index: number) => {
    setExpandedSearches((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard', active: true },
        { label: 'AI Search Builder', href: '/search-builder' },
        { label: 'AI Buying Report', href: '/opportunity' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Settings', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
            <h1 className="mb-2 text-headline-lg font-headline-lg text-primary">Dealer Command Centre</h1>
            <p className="mb-8 text-headline-md font-headline-md text-on-surface">Good Morning, Jonathan</p>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/search-builder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110"
              >
                Create New AI Search
              </Link>
              <Link
                to="/opportunity"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary"
              >
                View AI Buying Report
              </Link>
            </div>

            {/* ── Morning Intelligence ─────────────────────────────────── */}
            <section className="mb-10 space-y-8">
              <div>
                <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Morning Intelligence Brief</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
                  {summaryCards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`dashboard-border flex flex-col justify-between rounded-xl bg-surface-container-high text-center min-h-20 p-3 md:min-h-[152px] md:p-5${index === 4 ? ' col-span-2 mx-auto w-[calc(50%-8px)] lg:col-span-1 lg:w-auto lg:mx-0' : ''}`}
                    >
                      <p className="text-xs leading-snug text-on-surface-variant md:text-body-md md:font-body-md">
                        <span className="block">{card.icon}</span>
                        <span>{card.title}</span>
                      </p>
                      <p className="mt-1 text-2xl font-bold text-primary md:text-headline-lg md:font-headline-lg md:mt-0">{card.value}</p>
                    </article>
                  ))}
                </div>
              </div>

              {/* ── AI Search Radar (unchanged) ──────────────────────── */}
              <article className="dashboard-border mx-auto w-full max-w-5xl rounded-3xl bg-surface-container-high/70 p-6 backdrop-blur-sm md:p-8">
                <div className={`radar-glass-panel flex flex-col ${radarDetectionGlow ? 'radar-detection-glow' : ''}`}>
                <div className="radar-container order-1">
                  <div className="radar-frame" />
                  <div className="radar-scope">
                    <div className="radar-ring radar-ring-1" />
                    <div className="radar-ring radar-ring-2" />
                    <div className="radar-ring radar-ring-3" />
                    <div className="radar-crosshair radar-crosshair-horizontal" />
                    <div className="radar-crosshair radar-crosshair-vertical" />
                    <div className="radar-sweep" style={{ animationPlayState: aiSearchLive ? 'running' : 'paused' }} />
                    <span className="radar-blip radar-blip-1" style={{ animationPlayState: aiSearchLive ? 'running' : 'paused' }} />
                    <span className="radar-blip radar-blip-2" style={{ animationPlayState: aiSearchLive ? 'running' : 'paused' }} />
                    <span className="radar-blip radar-blip-3" style={{ animationPlayState: aiSearchLive ? 'running' : 'paused' }} />
                    <span className="radar-blip radar-blip-4" style={{ animationPlayState: aiSearchLive ? 'running' : 'paused' }} />
                  </div>
                </div>

                <h3 className="order-2 mt-8 text-center text-headline-md font-headline-md text-on-surface">Live AI Search Radar</h3>

                {/* Industrial Power Switch — mobile: directly below radar; desktop: below stats */}
                <div
                  className={`ai-switch-panel order-3 md:order-4${aiSearchLive ? ' ai-switch-panel-live' : ' ai-switch-panel-paused'}`}
                    role="switch"
                    aria-checked={aiSearchLive}
                    tabIndex={0}
                    onClick={() => setAiSearchLive((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setAiSearchLive((v) => !v)
                      }
                    }}
                  >
                    <span className="ai-switch-screw ai-switch-screw-tl" />
                    <span className="ai-switch-screw ai-switch-screw-tr" />
                    <span className="ai-switch-screw ai-switch-screw-bl" />
                    <span className="ai-switch-screw ai-switch-screw-br" />
                    <p className="ai-switch-title">AI Search Control</p>
                    <div className="ai-switch-rockers">
                      <div className={`ai-switch-rocker ai-switch-rocker-live${aiSearchLive ? ' ai-switch-rocker-active' : ''}`}>
                        <span className={`ai-switch-led${aiSearchLive ? ' ai-switch-led-on-live' : ''}`} />
                        <span className="ai-switch-rocker-label">LIVE</span>
                      </div>
                      <div className={`ai-switch-rocker ai-switch-rocker-paused${!aiSearchLive ? ' ai-switch-rocker-active' : ''}`}>
                        <span className={`ai-switch-led${!aiSearchLive ? ' ai-switch-led-on-paused' : ''}`} />
                        <span className="ai-switch-rocker-label">PAUSED</span>
                      </div>
                    </div>
                  </div>

                  <dl className="order-4 md:order-3 mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-body-md font-body-md text-on-surface-variant">
                    <dt className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Status:</dt>
                    <dd className="text-on-surface">{aiSearchLive ? '🟢 Searching' : '⏸ Paused'}</dd>
                    <dt className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Sources Active:</dt>
                    <dd className="text-on-surface">5</dd>
                    <dt className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Vehicles Checked Today:</dt>
                    <dd className="text-on-surface">12,487</dd>
                    <dt className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Matches Found:</dt>
                    <dd className="text-on-surface">27</dd>
                    <dt className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">High Priority Matches:</dt>
                    <dd className="text-on-surface">3</dd>
                    <dt className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Last Scan:</dt>
                    <dd className="text-on-surface">12 seconds ago</dd>
                  </dl>
                </div>
              </article>
            </section>

            {/* ── Recent Opportunities ─────────────────────────────────── */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>
              <p className="mb-6 text-body-md font-body-md text-on-surface-variant">
                "Your latest AI search results will appear here."
              </p>

              {/* Desktop table (unchanged, hidden on mobile) */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-left">
                  <thead>
                    <tr className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                      <th className="px-4 py-2">Vehicle</th>
                      <th className="px-4 py-2">Source</th>
                      <th className="px-4 py-2">Estimated Profit</th>
                      <th className="px-4 py-2">Priority</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOpportunities.map((opportunity, index) => (
                      <tr
                        key={opportunity.vehicle}
                        className={`rounded-xl bg-surface-container-high transition-all ${
                          highlightedOpportunity === index ? 'opportunity-row-highlight' : ''
                        }`}
                      >
                        <td className="rounded-l-xl px-4 py-3 text-body-md font-body-md text-on-surface">{opportunity.vehicle}</td>
                        <td className="px-4 py-3 text-body-md font-body-md text-on-surface-variant">{opportunity.source}</td>
                        <td className="px-4 py-3 text-body-md font-body-md text-on-surface">{opportunity.profit}</td>
                        <td className="px-4 py-3 text-body-md font-body-md text-on-surface">{opportunity.priority}</td>
                        <td className="rounded-r-xl px-4 py-3">
                          <Link
                            to="/opportunity"
                            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards (hidden on md+) */}
              <div className="space-y-3 md:hidden">
                {recentOpportunities.map((opportunity, index) => (
                  <article
                    key={opportunity.vehicle}
                    className={`rounded-xl bg-surface-container-high p-4 transition-all ${
                      highlightedOpportunity === index ? 'opportunity-row-highlight' : ''
                    }`}
                  >
                    <div className="mb-3">
                      <p className="text-body-md font-body-md font-medium text-on-surface">{opportunity.vehicle}</p>
                      <p className="text-sm text-on-surface-variant">{opportunity.source}</p>
                    </div>
                    <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-surface-container p-3">
                      <div className="text-center">
                        <p className="mb-1 text-xs uppercase tracking-widest text-on-surface-variant">Price</p>
                        <p className="text-sm font-medium text-on-surface">{opportunity.price}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-1 text-xs uppercase tracking-widest text-on-surface-variant">Profit</p>
                        <p className="text-sm font-medium text-primary">{opportunity.profit}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-1 text-xs uppercase tracking-widest text-on-surface-variant">Confidence</p>
                        <p className="text-sm font-medium text-on-surface">{opportunity.confidence}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to="/opportunity"
                        className="flex flex-1 items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75"
                      >
                        Review
                      </Link>
                      <button className="flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40">
                        Save
                      </button>
                      <button className="flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60">
                        Dismiss
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ── AI Recommendation ────────────────────────────────────── */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">AI Recommendation of the Day</h2>

              {/* Mobile premium badge */}
              <div className="mb-5 md:hidden">
                <span className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  ⭐ Today's AI Pick
                </span>
              </div>

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

              {/* Buttons: full-width stacked on mobile, inline on md+ */}
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
                <Link
                  to="/opportunity"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90 md:w-auto"
                >
                  Review Opportunity
                </Link>
                <button className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40 md:w-auto">
                  Save Vehicle
                </button>
              </div>
            </section>

            {/* ── My Active Searches ───────────────────────────────────── */}
            <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">My Active Searches</h2>
              <div className="space-y-3">
                {activeSearches.map((search, index) => (
                  <article key={search.name} className="rounded-xl bg-surface-container-high p-4">
                    {/* Desktop layout (unchanged) */}
                    <div className="hidden gap-2 md:flex md:flex-row md:items-center md:justify-between">
                      <p className="text-body-md font-body-md text-on-surface">{search.name}</p>
                      <p className="text-body-md font-body-md text-primary">{search.matches} matches</p>
                      <p className="text-body-md font-body-md text-on-surface-variant">Updated {search.updated}</p>
                    </div>

                    {/* Mobile layout: collapsible card with action buttons */}
                    <div className="md:hidden">
                      <button
                        onClick={() => toggleSearch(index)}
                        className="flex w-full items-center justify-between gap-3"
                        aria-expanded={expandedSearches[index]}
                      >
                        <div className="min-w-0 text-left">
                          <p className="text-body-md font-body-md text-on-surface">{search.name}</p>
                          <p className="mt-0.5 text-sm text-primary">
                            {search.matches} matches · Updated {search.updated}
                          </p>
                        </div>
                        <span className="flex-shrink-0 text-on-surface-variant">
                          <ChevronIcon open={expandedSearches[index]} />
                        </span>
                      </button>

                      {expandedSearches[index] && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <button className="rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75">
                            Run Now
                          </button>
                          <button className="rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40">
                            Edit
                          </button>
                          <button className="rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60">
                            Pause
                          </button>
                          <button className="rounded-lg border border-red-500/30 bg-surface-container py-2.5 text-sm font-medium text-red-400 transition-colors hover:border-red-500/50">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
    </PlatformShell>
  )
}
