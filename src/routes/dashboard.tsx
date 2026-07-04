import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

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
    { vehicle: 'Audi RS5 Sportback', source: 'Auto Trader', profit: '£3,850', priority: 'High' },
    { vehicle: 'Range Rover Velar', source: 'PistonHeads', profit: '£2,400', priority: 'Medium' },
    { vehicle: 'Mercedes A45 AMG', source: 'Motorway', profit: '£3,120', priority: 'High' },
    { vehicle: 'Volkswagen Golf R', source: 'eBay Motors', profit: '£1,980', priority: 'Low' },
    { vehicle: 'Porsche Macan S', source: 'Auto Trader', profit: '£4,450', priority: 'High' },
  ]
  const activeSearches = [
    { name: 'Performance Saloons (2019+)', matches: '14', updated: '3 mins ago' },
    { name: 'SUVs under £28k', matches: '9', updated: '11 mins ago' },
    { name: 'Low-mileage hybrids', matches: '6', updated: '19 mins ago' },
  ]
  const [highlightedOpportunity, setHighlightedOpportunity] = useState<number | null>(null)
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false)
  const [aiSearchLive, setAiSearchLive] = useState(true)

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

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="mx-auto flex min-h-screen max-w-container-max">
        <aside className="hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col">
          <div className="mb-8">
            {/* Logo badge - wider than "Trade in Cars" text below */}
            <svg
              viewBox="0 0 208 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ height: '52px', display: 'block' }}
              aria-label="Trade in Cars Agent logo"
            >
              {/* Outer bezel */}
              <rect x="0.5" y="0.5" width="207" height="51" rx="8"
                stroke="rgba(20,147,255,0.32)" strokeWidth="1"
                fill="rgba(20,147,255,0.05)" />
              {/* Inner subtle border */}
              <rect x="3.5" y="3.5" width="201" height="45" rx="6"
                stroke="rgba(148,163,184,0.07)" strokeWidth="0.5" fill="none" />
              {/* Corner screws */}
              <circle cx="9" cy="9" r="3" fill="rgba(30,41,59,0.85)" stroke="rgba(148,163,184,0.22)" strokeWidth="0.8" />
              <path d="M7.5 9 L10.5 9 M9 7.5 L9 10.5" stroke="rgba(148,163,184,0.28)" strokeWidth="0.6" />
              <circle cx="199" cy="9" r="3" fill="rgba(30,41,59,0.85)" stroke="rgba(148,163,184,0.22)" strokeWidth="0.8" />
              <path d="M197.5 9 L200.5 9 M199 7.5 L199 10.5" stroke="rgba(148,163,184,0.28)" strokeWidth="0.6" />
              <circle cx="9" cy="43" r="3" fill="rgba(30,41,59,0.85)" stroke="rgba(148,163,184,0.22)" strokeWidth="0.8" />
              <path d="M7.5 43 L10.5 43 M9 41.5 L9 44.5" stroke="rgba(148,163,184,0.28)" strokeWidth="0.6" />
              <circle cx="199" cy="43" r="3" fill="rgba(30,41,59,0.85)" stroke="rgba(148,163,184,0.22)" strokeWidth="0.8" />
              <path d="M197.5 43 L200.5 43 M199 41.5 L199 44.5" stroke="rgba(148,163,184,0.28)" strokeWidth="0.6" />
              {/* Car silhouette — side view */}
              <path d="M22 40 L22 33 Q22 31.5 23.5 31.5 L28 31.5 L33 21 Q34.5 17 39 17 L59 17 Q63.5 17 65 21 L70 31.5 L74.5 31.5 Q76 31.5 76 33 L76 40 Z"
                fill="rgba(20,147,255,0.1)" stroke="rgba(20,147,255,0.72)" strokeWidth="1.3" strokeLinejoin="round" />
              {/* Roof / cabin */}
              <path d="M35.5 17 L38.5 10 Q40 8 43 8 L55 8 Q58 8 59.5 10 L62.5 17"
                fill="rgba(20,147,255,0.07)" stroke="rgba(20,147,255,0.62)" strokeWidth="1.3" strokeLinejoin="round" />
              {/* Window split */}
              <line x1="49" y1="8.5" x2="49" y2="17" stroke="rgba(20,147,255,0.35)" strokeWidth="0.8" />
              {/* Front wheel */}
              <circle cx="33.5" cy="40" r="6" fill="rgba(12,19,36,0.9)" stroke="rgba(20,147,255,0.62)" strokeWidth="1.3" />
              <circle cx="33.5" cy="40" r="2" fill="rgba(20,147,255,0.48)" />
              {/* Rear wheel */}
              <circle cx="64.5" cy="40" r="6" fill="rgba(12,19,36,0.9)" stroke="rgba(20,147,255,0.62)" strokeWidth="1.3" />
              <circle cx="64.5" cy="40" r="2" fill="rgba(20,147,255,0.48)" />
              {/* Trade exchange arrows */}
              <line x1="90" y1="20" x2="104" y2="20" stroke="rgba(20,147,255,0.62)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M100 16 L104 20 L100 24" fill="none" stroke="rgba(20,147,255,0.62)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="104" y1="32" x2="90" y2="32" stroke="rgba(20,147,255,0.62)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M94 28 L90 32 L94 36" fill="none" stroke="rgba(20,147,255,0.62)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Vertical divider */}
              <line x1="118" y1="12" x2="118" y2="40" stroke="rgba(148,163,184,0.13)" strokeWidth="1" />
              {/* "AI AGENT" label */}
              <text x="128" y="26" fill="rgba(20,147,255,0.92)"
                fontSize="10" fontWeight="700"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                letterSpacing="2.5">AI AGENT</text>
              {/* Sub-label */}
              <text x="128" y="38" fill="rgba(148,163,184,0.52)"
                fontSize="7.5"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                letterSpacing="2">VEH. SOURCING</text>
            </svg>
            <p className="mt-2 text-body-md font-body-md font-semibold tracking-wide text-primary">Trade in Cars</p>
          </div>
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

            <section className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] xl:items-start">
              <div>
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
              </div>

              <article className="dashboard-border rounded-3xl bg-surface-container-high/70 p-6 backdrop-blur-sm md:p-8">
                <div className={`radar-glass-panel ${radarDetectionGlow ? 'radar-detection-glow' : ''}`}>
                  <div className="radar-container">
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

                  <div className="mt-8 space-y-4">
                    <h3 className="text-headline-md font-headline-md text-on-surface">Live AI Search Radar</h3>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-body-md font-body-md text-on-surface-variant">
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

                  {/* Industrial Power Switch */}
                  <div
                    className={`ai-switch-panel${aiSearchLive ? ' ai-switch-panel-live' : ' ai-switch-panel-paused'}`}
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
                </div>
              </article>
            </section>

            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>
              <p className="mb-6 text-body-md font-body-md text-on-surface-variant">
                "Your latest AI search results will appear here."
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-left">
                  <thead>
                    <tr className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">
                      <th className="px-4 py-2">Vehicle</th>
                      <th className="px-4 py-2">Source</th>
                      <th className="px-4 py-2">Estimated Profit</th>
                      <th className="px-4 py-2">Priority</th>
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
                        <td className="rounded-r-xl px-4 py-3 text-body-md font-body-md text-on-surface">{opportunity.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

            <section className="dashboard-border rounded-2xl bg-surface-container p-6 md:p-8">
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
