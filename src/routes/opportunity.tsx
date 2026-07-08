import { Link, createFileRoute } from '@tanstack/react-router'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'
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
  const decisionModel = featuredOpportunity.decisionModel
  const decisionAction = decisionModel.recommendedAction
  const decisionActionDisplay = decisionModel.recommendedActionDisplay
  const keyMetrics = [
   { label: 'Confidence', value: featuredOpportunity.confidenceDisplay },
   { label: 'Opportunity Score', value: decisionModel.factors.overallOpportunityScore.displayValue },
   { label: 'Estimated Retail Value', value: featuredOpportunity.estimatedRetailValueDisplay },
   { label: 'Estimated Gross Profit', value: featuredOpportunity.estimatedGrossProfitDisplay },
   { label: 'Demand Rating', value: featuredOpportunity.demandRatingDisplay },
  ]
  const verdictReasons = [
   'Asking price is 6% below estimated market value.',
   'Estimated resale demand is High.',
   'Estimated gross profit £4,255.',
   'Risk assessment: Low.',
  ]
  const verdictMetrics = [
   { label: 'Confidence', value: featuredOpportunity.confidenceDisplay, valueClassName: 'text-primary' },
   { label: 'Risk Level', value: featuredOpportunity.riskLevel, valueClassName: 'text-[#4ade80]' },
   { label: 'Est. Gross Profit', value: featuredOpportunity.estimatedGrossProfitDisplay, valueClassName: 'text-on-surface' },
   { label: 'Days to Sell', value: featuredOpportunity.daysToSellDisplay, valueClassName: 'text-on-surface' },
  ]
  const investigationTimeline = [
   { time: '09:02', message: '✓ Price reduced by £850 (from £32,845 to £31,995).' },
   { time: '09:04', message: '↑ Dealer demand increased (+12% buyer interest in 24 hours).' },
   { time: '09:06', message: '✓ Opportunity Score increased from 91 to 94.' },
   { time: '09:08', message: '🟢 BUY threshold reached (confidence steady at 97%).' },
  ]
  const vehicleInfo = featuredOpportunity.vehicleInfo
  const [buyingSummaryLead, buyingSummaryTail = ''] = featuredOpportunity.buyingSummary.split(decisionAction)

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Builder', href: '/search-builder' },
        { label: 'AI Buying Report', href: '/opportunity', active: true },
        { label: 'Settings', isSectionLabel: true },
        { label: 'Notification Preferences', href: '/settings' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max space-y-4 sm:space-y-6">
        <header className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6">
          {/* Future exported PDF buying reports should reuse the TICA shield as the official TICA certification mark. */}
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
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="space-y-1">
              <h1 className="text-headline-lg font-headline-lg text-primary">AI Buying Report</h1>
              <p className="text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant">
                Vehicle Opportunity ID: <span className="font-semibold text-on-surface">{featuredOpportunity.id}</span>
              </p>
            </div>
            <div className="self-end sm:self-auto">
              <TicaShield />
            </div>
          </div>
        </header>

        <section className="dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface sm:mb-5">AI Buying Verdict</h2>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-5">
            <div className="verdict-card-premium flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-5 text-center sm:px-8 sm:py-8 lg:min-w-[320px]">
              <div className="traffic-light-shell" aria-label="AI buying verdict traffic light">
                <div className="traffic-light-lens traffic-light-lens-green-active" aria-hidden="true" />
                <div className="traffic-light-lens" aria-hidden="true" />
                <div className="traffic-light-lens" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.18em] text-primary/80">AI Buying Verdict</p>
                <p className="text-[30px] font-semibold leading-none tracking-[0.02em] text-on-surface sm:text-[40px]">{decisionActionDisplay}</p>
                <p className="text-body-sm font-body-sm text-on-surface">TICA Confidence: {featuredOpportunity.confidenceDisplay}</p>
                <p className="text-body-sm font-body-sm uppercase tracking-[0.14em] text-on-surface-variant">Recommended Action by TICA AI</p>
              </div>
              <div className="w-full rounded-xl border border-primary/15 bg-surface-container-high/70 px-4 py-3 text-left">
                {/* Compact visual traffic light legend – shown on all screen sizes */}
                <div className="flex items-center gap-3" aria-label="Verdict colour key">
                  <div className="legend-traffic-light shrink-0">
                    <div className="legend-traffic-light-lens legend-lens-green" aria-hidden="true" />
                    <div className="legend-traffic-light-lens legend-lens-amber" aria-hidden="true" />
                    <div className="legend-traffic-light-lens legend-lens-red" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-[6px] py-[7px] text-xs font-semibold leading-none">
                    <span className="flex h-[30px] items-center text-[#4ade80]">BUY</span>
                    <span className="flex h-[30px] items-center text-[#f59e0b]">REVIEW</span>
                    <span className="flex h-[30px] items-center text-[#ef4444]">PASS</span>
                  </div>
                </div>
              </div>
              <div className="verdict-metrics-group mt-1 grid w-full grid-cols-2 auto-rows-fr gap-2">
                {verdictMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`flex h-full min-h-[88px] flex-col justify-center rounded-xl border bg-surface-container-high px-3 py-3 text-center ${
                      index === 0 ? 'border-primary/20' : 'border-outline-variant/25'
                    }`}
                  >
                    <p className="text-label-caps font-label-caps uppercase tracking-[0.08em] text-on-surface-variant sm:tracking-[0.15em]">{metric.label}</p>
                    <p className={`mt-1 text-body-md font-semibold sm:text-body-lg ${metric.valueClassName}`}>{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-outline-variant/30 bg-surface-container-high px-4 py-4 sm:px-6 sm:py-6">
              <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
                {featuredOpportunity.verdictNarrative}
              </p>
            </div>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
          <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Why TICA Recommends This</p>
          <ul className="mt-3 space-y-2.5 text-body-sm font-body-sm text-on-surface">
            {verdictReasons.map((reason) => (
              <li key={reason} className="flex items-center gap-2">
                <span className="text-[#4ade80]">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-primary/20 bg-surface-container-high/60 px-4 py-3">
            <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">TICA Summary</p>
            <p className="text-body-sm font-body-sm leading-relaxed text-on-surface-variant">
              Based on current market conditions, TICA considers this a high-confidence buying opportunity.
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4 sm:p-6">
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
            <div className="verdict-card-premium rounded-2xl p-4 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.2em] text-primary/80">AI Verdict</p>
              <p className="mt-4 text-[52px] font-semibold leading-none text-on-surface sm:text-[68px]">{decisionAction}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {keyMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <dt className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">{metric.label}</dt>
                <dd className="mt-2 text-body-lg font-body-lg text-on-surface">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface">AI Opportunity Analysis</h2>
          <p className="mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant">
            {featuredOpportunity.analysisSummary}
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
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

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Negotiation Advice</h2>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
              className="min-h-11 cursor-not-allowed rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant/50 opacity-50"
            >
              Future Feature: Simulate Deal
            </button>
            <p className="text-body-sm font-body-sm text-on-surface-variant/60 italic">
              Interactive deal simulation will be available in a future release.
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">AI Buying Summary</h2>
          <div className="rounded-xl border border-primary/30 bg-primary-container/20 px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
              {buyingSummaryLead}
              <span className="font-semibold text-on-surface">{decisionAction}</span>
              {buyingSummaryTail}
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
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

        <section className="dashboard-border timeline-mobile-shell rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface">AI Investigation Timeline</h2>
              <p className="mt-2 max-w-2xl text-body-md font-body-md text-on-surface-variant">
                The AI reasoning process behind this recommendation.
              </p>
            </div>

            <div className="timeline-status-panel">
              <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">AI Reasoning</p>
              <p className="mt-2 text-body-md font-body-md text-on-surface">
                <span className="mr-2 text-emerald-400">🟢</span>
                BUY signal confirmed
              </p>
              <p className="mt-1 text-sm text-on-surface-variant">Placeholder investigation checkpoints shown in decision order.</p>
            </div>
          </div>

          <div className="timeline-list mt-6" aria-label="AI investigation timeline">
            {investigationTimeline.map((event) => (
              <article key={`${event.time}-${event.message}`} className="timeline-entry">
                <p className="timeline-entry-time">{event.time}</p>
                <div className="timeline-entry-dot" aria-hidden="true" />
                <p className="timeline-entry-message">{event.message}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Dealer Notes</h2>
          <textarea
            placeholder="Add internal notes, call outcomes, valuation observations, and next actions..."
            className="h-44 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-40"
          />
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
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
