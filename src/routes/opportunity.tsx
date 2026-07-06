import { Link, createFileRoute } from '@tanstack/react-router'
import { PlatformShell } from '../components/PlatformShell'
import { opportunityIntelligencePlaceholder } from '../data/opportunity-intelligence'

export const Route = createFileRoute('/opportunity')({
  component: OpportunityPage,
})

const { featuredOpportunity } = opportunityIntelligencePlaceholder

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function OpportunityPage() {
  const keyMetrics = [
    { label: 'Confidence', value: featuredOpportunity.confidenceDisplay },
    { label: 'Opportunity Score', value: featuredOpportunity.scoring.overallOpportunityScore.displayValue },
    { label: 'Estimated Retail Value', value: featuredOpportunity.estimatedRetailValueDisplay },
    { label: 'Estimated Gross Profit', value: featuredOpportunity.estimatedGrossProfitDisplay },
    { label: 'Demand Rating', value: featuredOpportunity.demandRatingDisplay },
  ]
  const vehicleInfo = featuredOpportunity.vehicleInfo
  const [buyingSummaryLead, buyingSummaryTail = ''] = featuredOpportunity.buyingSummary.split('BUY')

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Builder', href: '/search-builder' },
        { label: 'AI Buying Report', href: '/opportunity', active: true },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Settings', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max space-y-6 overflow-x-hidden">
        <header className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div>
              <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Trade In Cars Agent</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary sm:w-auto"
              >
                Return to Dashboard
              </Link>
              <Link
                to="/search-builder"
                className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-body-md font-body-md text-on-primary transition-all hover:brightness-110 sm:w-auto"
              >
                Create New AI Search
              </Link>
            </div>
          </div>

          <nav aria-label="Breadcrumb" className="mt-4 flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
            <Link to="/dashboard" className="transition-colors hover:text-primary">
              Dealer Command Centre
            </Link>
            <ChevronRightIcon />
            <span className="text-on-surface">AI Buying Report</span>
          </nav>

          {/* Page title + Opportunity ID */}
          <div className="mt-3 space-y-1">
            <h1 className="text-headline-lg font-headline-lg text-primary">AI Buying Report</h1>
            <p className="text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant">
              Vehicle Opportunity ID: <span className="font-semibold text-on-surface">{featuredOpportunity.id}</span>
            </p>
          </div>
        </header>

        <section className="dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Buying Verdict</h2>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/50 bg-primary-container px-5 py-6 text-center sm:px-8 sm:py-8 lg:min-w-[320px]">
              <div className="traffic-light-shell" aria-label="AI buying verdict traffic light">
                <div className="traffic-light-lens traffic-light-lens-green-active" aria-hidden="true" />
                <div className="traffic-light-lens" aria-hidden="true" />
                <div className="traffic-light-lens" aria-hidden="true" />
              </div>
              <div>
                <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-primary-container/80">Verdict</p>
                <p className="mt-2 text-[34px] font-bold leading-none tracking-tight text-on-primary-container sm:text-[46px]">{featuredOpportunity.verdictDisplay}</p>
              </div>
              <div className="w-full rounded-xl border border-outline-variant/35 bg-surface-container-high/70 px-4 py-3 text-left">
                <p className="text-body-xs font-body-sm leading-relaxed text-on-surface-variant">
                  <span className="font-semibold text-[#4ade80]">Green</span> = Strong buying opportunity
                  <br />
                  <span className="font-semibold text-[#f59e0b]">Amber</span> = Review further
                  <br />
                  <span className="font-semibold text-[#ef4444]">Red</span> = Pass / avoid
                </p>
              </div>
              <div className="mt-1 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-primary/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Confidence</p>
                  <p className="mt-1 text-body-lg font-semibold text-primary">{featuredOpportunity.confidenceDisplay}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Risk Level</p>
                  <p className="mt-1 text-body-lg font-semibold text-[#4ade80]">{featuredOpportunity.riskLevel}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Est. Gross Profit</p>
                  <p className="mt-1 text-body-md font-semibold text-on-surface">{featuredOpportunity.estimatedGrossProfitDisplay}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Days to Sell</p>
                  <p className="mt-1 text-body-md font-semibold text-on-surface">{featuredOpportunity.daysToSellDisplay}</p>
                </div>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-outline-variant/30 bg-surface-container-high px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
                {featuredOpportunity.verdictNarrative}
              </p>
            </div>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-5 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant">Target Vehicle</p>
              <h2 className="mt-3 text-headline-lg font-headline-lg text-on-surface">{featuredOpportunity.vehicle}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-lg font-body-lg text-on-surface">
                <span>{featuredOpportunity.year}</span>
                <span className="text-primary">{featuredOpportunity.listPriceDisplay}</span>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
                <img src={featuredOpportunity.heroImageSrc} alt={featuredOpportunity.heroImageAlt} className="h-auto max-h-[280px] w-full object-cover" />
              </div>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-primary-container p-5 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.2em] text-on-primary-container/80">AI Verdict</p>
              <p className="mt-4 text-[56px] font-semibold leading-none text-on-primary-container sm:text-[72px]">{featuredOpportunity.verdict}</p>
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
            {featuredOpportunity.analysisSummary}
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Buying Checklist</h2>
          <div className="space-y-3">
          {featuredOpportunity.checklist.map((item) => {
             const statusToneClass =
               item.tone === 'positive'
                 ? 'text-[#4ade80]'
                 : item.tone === 'warning'
                   ? 'text-[#facc15]'
                   : 'text-primary'

             return (
               <div key={item.label} className="flex flex-col gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                 <div className="flex items-center gap-3">
                   <span className="text-xl">{item.icon}</span>
                   <span className="text-body-md font-body-md text-on-surface">{item.label}</span>
                 </div>
                 <div className="text-right">
                   <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">
                     {item.tone === 'info' ? 'Estimate' : 'Status'}
                   </p>
                   <p className={`mt-0.5 text-body-sm font-body-sm ${statusToneClass}`}>{item.statusLabel}</p>
                 </div>
               </div>
             )
          })}
          </div>
          <p className="mt-5 text-body-sm font-body-sm text-on-surface-variant/70 italic">
            Complete vehicle history, MOT and verification services will be available through trusted data providers in a future release.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Negotiation Advice</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Suggested Opening Offer</p>
              <p className="mt-2 text-body-lg font-semibold text-on-surface">{featuredOpportunity.negotiation.openingOfferDisplay}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Likely Acceptance Range</p>
              <p className="mt-2 text-body-lg font-semibold text-on-surface">{featuredOpportunity.negotiation.likelyAcceptanceRangeDisplay}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Negotiation Confidence</p>
              <p className="mt-2 text-body-lg font-semibold text-primary">{featuredOpportunity.negotiation.confidenceDisplay}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Negotiation Advice</p>
              <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                {featuredOpportunity.negotiation.advice}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button
              disabled
              className="cursor-not-allowed rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant/50 opacity-50"
            >
              Future Feature: Simulate Deal
            </button>
            <p className="text-body-sm font-body-sm text-on-surface-variant/60 italic">
              Interactive deal simulation will be available in a future release.
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">AI Buying Summary</h2>
          <div className="rounded-xl border border-primary/30 bg-primary-container/20 px-6 py-5">
            <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
              {buyingSummaryLead}
              <span className="font-semibold text-on-surface">{featuredOpportunity.verdict}</span>
              {buyingSummaryTail}
            </p>
          </div>
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
            className="h-44 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-40"
          />
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <button className="min-h-11 rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110">
              Save Opportunity
            </button>
            <button className="min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Ignore
            </button>
            <button className="min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Contact Seller
            </button>
            <Link
              to="/dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface"
            >
              Return to Dashboard
            </Link>
            <Link
              to="/search-builder"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110"
            >
              Create New AI Search
            </Link>
            <button className="min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Explain Why
            </button>
          </div>
        </section>
      </div>
    </PlatformShell>
  )
}
