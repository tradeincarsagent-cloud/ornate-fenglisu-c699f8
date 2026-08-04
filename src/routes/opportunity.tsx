import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'
import { opportunityIntelligencePlaceholder } from '../data/opportunity-intelligence'
import { loadMission, MISSION_STAGES, type TicaMission } from '../lib/mission'

export const Route = createFileRoute('/opportunity')({
  component: OpportunityPage,
})

const { featuredOpportunity } = opportunityIntelligencePlaceholder

const ticaVehicleIntelligence = {
  modelIssues: [
    {
      tone: 'warning',
      title: 'Wet timing belt fitted on some engine variants.',
      detail: 'Inspect service invoices for evidence of the correct belt kit and oil-spec maintenance.',
    },
    {
      tone: 'high',
      title: 'Check for evidence of timing belt replacement.',
      detail: 'High priority if mileage or age suggests the interval is due or recently exceeded.',
    },
    {
      tone: 'warning',
      title: 'Water pump commonly replaced with timing belt.',
      detail: 'Confirm whether the pump, tensioners and coolant refresh were completed together.',
    },
    {
      tone: 'info',
      title: 'Oil dilution can occur if used mainly for short journeys.',
      detail: 'Review service frequency and ask about repeated DPF regenerations or frequent top-ups.',
    },
  ],
  inspectionPoints: [
    'Cold start performance',
    'Turbo operation',
    'Gearbox changes smoothly',
    'Suspension noises',
    'Steering alignment',
    'Brake wear',
    'Air conditioning',
    'Electrical equipment',
    'Dashboard warning lights',
  ],
  ownershipAdvice: [
    'Verify complete service history.',
    'Confirm manufacturer recalls have been completed.',
    'Ask when the timing belt or chain was last replaced.',
    'Confirm both remote keys are supplied.',
    'Check tyre brand consistency.',
    'Inspect for signs of previous accident repair.',
  ],
  runningCosts: [
    { label: 'Typical Annual Service Cost', value: '£390–£540', tone: 'info' },
    { label: 'Timing Belt / Chain', value: 'Wet belt — invoice recommended', tone: 'warning' },
    { label: 'Insurance Group', value: 'Group 19', tone: 'info' },
    { label: 'Fuel Economy', value: '52 MPG combined', tone: 'info' },
    { label: 'Road Tax Band', value: '£190 standard rate', tone: 'info' },
    { label: 'ULEZ Status', value: 'Compliant', tone: 'info' },
    { label: 'Known High Cost Repairs', value: 'Turbo / belt-related work', tone: 'high' },
    { label: 'Dealer Demand Rating', value: 'Strong retail demand', tone: 'info' },
  ],
  ownershipRisk: {
    level: 'Medium',
    description: 'Based on known reliability patterns and ownership trends.',
  },
}

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
  const normalizedDecisionAction = (decisionActionDisplay || decisionAction).toUpperCase()
  const isBuyVerdict = normalizedDecisionAction === 'BUY'
  const isReviewVerdict = normalizedDecisionAction === 'REVIEW'
  const isPassVerdict = normalizedDecisionAction === 'PASS'
  const decisionVerdictClassName = isBuyVerdict
    ? 'tica-decision-buy'
    : isReviewVerdict
      ? 'tica-decision-review'
      : isPassVerdict
        ? 'tica-decision-pass'
        : 'text-on-surface'
  const decisionVerdictGlowClassName = isBuyVerdict ? 'tica-decision-buy-glow' : ''
  const investigationTimeline = [
   { time: '09:02', message: '✓ Price reduced by £850 (from £32,845 to £31,995).' },
   { time: '09:04', message: '↑ Dealer demand increased (+12% buyer interest in 24 hours).' },
   { time: '09:06', message: '✓ Opportunity Score increased from 91 to 94.' },
   { time: '09:08', message: '🟢 BUY threshold reached (confidence steady at 97%).' },
  ]
  const vehicleInfo = featuredOpportunity.vehicleInfo
  const [buyingSummaryLead, buyingSummaryTail = ''] = featuredOpportunity.buyingSummary.split(decisionAction)
  const ownershipRiskToneClass =
    ticaVehicleIntelligence.ownershipRisk.level === 'Low'
      ? 'tica-decision-buy'
      : ticaVehicleIntelligence.ownershipRisk.level === 'Medium'
        ? 'tica-decision-review'
        : 'tica-decision-pass'
  const issueToneConfig: Record<'info' | 'warning' | 'high', { label: string; className: string; dotClassName: string }> = {
    info: {
      label: 'Information',
      className: 'tica-decision-buy',
      dotClassName: 'bg-[var(--tica-decision-buy)]',
    },
    warning: {
      label: 'Inspect Carefully',
      className: 'tica-decision-review',
      dotClassName: 'bg-[var(--tica-decision-review)]',
    },
    high: {
      label: 'High Priority',
      className: 'tica-decision-pass',
      dotClassName: 'bg-[var(--tica-decision-pass)]',
    },
  }

  const confidencePercent = parseFloat(featuredOpportunity.confidenceDisplay) // e.g. 97 from "97%"
  const meterZone = confidencePercent >= 67 ? 'buy' : confidencePercent >= 34 ? 'review' : 'pass'
  const meterLabel = meterZone === 'buy' ? 'BUY NOW' : meterZone === 'review' ? 'REVIEW' : 'PASS'
  const meterSentence =
    meterZone === 'buy'
      ? 'TICA considers this one of today\'s strongest buying opportunities based on pricing, resale demand and projected profit.'
      : meterZone === 'review'
        ? 'TICA flags this opportunity for further review — some indicators are positive but caution is advised before committing.'
        : 'TICA does not recommend this vehicle at current pricing — margins and demand indicators fall below buying thresholds.'

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [dotPulsing, setDotPulsing] = useState(true)
  const [meterAnimated, setMeterAnimated] = useState(false)
  const [activeMission, setActiveMission] = useState<TicaMission | null>(null)

  useEffect(() => {
    setActiveMission(loadMission())
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < 5; i++) {
      timers.push(setTimeout(() => setAnalysisStep(i + 1), 200 + i * 400))
    }
    timers.push(setTimeout(() => setAnalysisComplete(true), 200 + 4 * 400 + 600))
    timers.push(setTimeout(() => setDotPulsing(false), 2500))
    // Trigger meter slide-in after a brief paint delay
    timers.push(setTimeout(() => setMeterAnimated(true), 120))
    return () => timers.forEach(clearTimeout)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Missions', href: '/search-builder' },
        { label: 'AI Buying Report', href: '/opportunity', active: true },
        { label: 'Settings', isSectionLabel: true },
        { label: 'TICA Preferences', href: '/settings' },
        { label: 'Owner', isSectionLabel: true },
        { label: 'TICA Operations Centre', href: '/owner' },
        { label: '🧠 TICA Intelligence', href: '/owner/intelligence' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max space-y-3 sm:space-y-4">
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
              <TicaShield size="lg" />
            </div>
          </div>
        </header>

        {/* Mission Engine Status — reads from the shared Mission Engine */}
        {activeMission && (
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5" aria-label="Mission status">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Mission Status</p>
                <p className="mt-0.5 text-sm font-semibold text-on-surface">{activeMission.missionId}</p>
              </div>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                {activeMission.status || 'Mission Created'}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Current Stage</dt>
                <dd className="mt-0.5 font-medium text-on-surface">{activeMission.currentStage || MISSION_STAGES[0]}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Progress</dt>
                <dd className="mt-0.5 font-medium text-on-surface">{activeMission.progress ?? 0}%</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">AI Activity</dt>
                <dd className="mt-0.5 font-medium text-on-surface">{activeMission.currentAiActivity || '—'}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Est. Time Remaining</dt>
                <dd className="mt-0.5 font-medium text-on-surface">{activeMission.estimatedTimeRemaining || '—'}</dd>
              </div>
            </dl>
          </section>
        )}

        {/* Executive Summary — answers "Should I buy this?" within 3-5 seconds */}
        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5">
          <p className="mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary">Executive Summary</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {/* AI Verdict */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-primary/25 bg-surface-container-high px-3 py-5 text-center">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">AI Verdict</p>
              <p className={`mt-2 text-[28px] font-semibold leading-none sm:text-[32px] ${decisionVerdictClassName} ${decisionVerdictGlowClassName}`}>
                {normalizedDecisionAction}
              </p>
            </div>
            {/* TICA Confidence */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Confidence</p>
              <p className="mt-2 text-[28px] font-semibold leading-none text-primary sm:text-[32px]">
                {featuredOpportunity.confidenceDisplay}
              </p>
            </div>
            {/* Estimated Gross Profit */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Gross Profit</p>
              <p className="mt-2 text-[28px] font-semibold leading-none text-on-surface sm:text-[32px]">
                {featuredOpportunity.estimatedGrossProfitDisplay}
              </p>
            </div>
            {/* Estimated Retail Value */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Retail Value</p>
              <p className="mt-2 text-[28px] font-semibold leading-none text-on-surface sm:text-[32px]">
                {featuredOpportunity.estimatedRetailValueDisplay}
              </p>
            </div>
            {/* Opportunity Score */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Opportunity Score</p>
              <p className="mt-2 text-[28px] font-semibold leading-none text-primary sm:text-[32px]">
                {decisionModel.factors.overallOpportunityScore.displayValue}
              </p>
            </div>
            {/* Estimated Days to Sell */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Days to Sell</p>
              <p className="mt-2 text-[28px] font-semibold leading-none text-on-surface sm:text-[32px]">
                {featuredOpportunity.daysToSellDisplay}
              </p>
            </div>
          </div>
        </section>

        {/* AI Analysis Status Banner */}
        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5" aria-label="TICA analysis status">
          <div className="mb-4 flex items-center gap-2.5">
            <span
              className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--tica-decision-buy)] ${dotPulsing ? 'tica-status-dot-pulse' : ''}`}
              aria-hidden="true"
            />
            <p className="text-label-caps font-label-caps font-semibold uppercase tracking-widest text-on-surface">
              TICA Analysis Complete
            </p>
          </div>
          <div className="space-y-2 pl-5">
            {(['Market Analysis', 'Pricing Validation', 'Demand Analysis', 'Profit Projection', 'Risk Assessment'] as const).map(
              (step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant"
                  style={{
                    opacity: analysisStep > index ? 1 : 0,
                    transform: analysisStep > index ? 'translateY(0)' : 'translateY(5px)',
                    transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
                  }}
                >
                  <span className="tica-decision-buy font-semibold">✓</span>
                  <span>{step}</span>
                </div>
              ),
            )}
          </div>
          <p
            className="mt-4 pl-5 text-body-sm font-body-sm text-on-surface-variant/70"
            style={{
              opacity: analysisStep >= 5 ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
            }}
          >
            Completed in 12.4 seconds
          </p>
          {analysisComplete && (
            <div className="tica-analysis-complete-reveal mt-3 flex items-center gap-2 pl-5">
              <span className="tica-decision-buy font-semibold">✔</span>
              <span className="text-body-sm font-semibold text-on-surface">Analysis Complete</span>
            </div>
          )}
        </section>

        {/* ── Dealer Decision Meter ─────────────────────────────────────── */}
        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5" aria-label="Dealer Decision Meter">
          <p className="mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary">Dealer Decision Meter</p>

          {/* Recommendation headline */}
          <div className="mb-5 flex flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
            <div>
              <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">TICA Recommendation</p>
              <p
                className="mt-1 text-[32px] font-semibold leading-none sm:text-[38px]"
                style={{
                  color:
                    meterZone === 'buy'
                      ? 'var(--tica-decision-buy)'
                      : meterZone === 'review'
                        ? 'var(--tica-decision-review)'
                        : 'var(--tica-decision-pass)',
                  textShadow:
                    meterZone === 'buy'
                      ? '0 0 12px rgba(24,168,107,0.35)'
                      : meterZone === 'review'
                        ? '0 0 12px rgba(212,165,55,0.35)'
                        : '0 0 12px rgba(179,58,63,0.35)',
                }}
              >
                {meterLabel}
              </p>
              <p className="mt-1 text-body-sm font-body-sm text-on-surface-variant">
                {featuredOpportunity.confidenceDisplay} Confidence
              </p>
            </div>
          </div>

          {/* Gradient bar + indicator */}
          <div className="ddm-bar-wrapper">
            {/* Zone labels */}
            <div className="ddm-zone-labels" aria-hidden="true">
              <span className="ddm-zone-label ddm-zone-label-pass">PASS</span>
              <span className="ddm-zone-label ddm-zone-label-review">REVIEW</span>
              <span className="ddm-zone-label ddm-zone-label-buy">BUY NOW</span>
            </div>
            {/* Bar track */}
            <div className="ddm-bar-track" role="meter" aria-label={`Decision meter: ${meterLabel} at ${featuredOpportunity.confidenceDisplay} confidence`} aria-valuenow={confidencePercent} aria-valuemin={0} aria-valuemax={100}>
              {/* Indicator */}
              <div
                className="ddm-indicator"
                style={{
                  left: meterAnimated ? `${confidencePercent}%` : '0%',
                  transition: meterAnimated ? 'left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                }}
                aria-hidden="true"
              >
                <div className="ddm-indicator-pin" />
                <div
                  className="ddm-indicator-label"
                  style={{
                    color:
                      meterZone === 'buy'
                        ? 'var(--tica-decision-buy)'
                        : meterZone === 'review'
                          ? 'var(--tica-decision-review)'
                          : 'var(--tica-decision-pass)',
                  }}
                >
                  {featuredOpportunity.confidenceDisplay}
                </div>
              </div>
            </div>
          </div>

          {/* AI context sentence */}
          <p className="mt-5 text-body-sm font-body-sm italic leading-relaxed text-on-surface-variant">
            "{meterSentence}"
          </p>

          {/* Caption */}
          <p className="mt-2 text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant/50">
            Updated using current market intelligence.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-5">
          <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">AI Buying Verdict</h2>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4">
            <div className="verdict-card-premium flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-center sm:px-4.5 sm:py-4 lg:min-w-[250px]">
              <div className="traffic-light-shell" aria-label="AI buying verdict traffic light">
                <div className={`traffic-light-lens ${isBuyVerdict ? 'traffic-light-lens-buy-active' : ''}`} aria-hidden="true" />
                <div className={`traffic-light-lens ${isReviewVerdict ? 'traffic-light-lens-review-active' : ''}`} aria-hidden="true" />
                <div className={`traffic-light-lens ${isPassVerdict ? 'traffic-light-lens-pass-active' : ''}`} aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[0.64rem] font-label-caps uppercase tracking-[0.18em] text-primary/80">AI Buying Verdict</p>
                <p className={`text-[28px] font-semibold leading-none tracking-[0.02em] ${decisionVerdictClassName} ${decisionVerdictGlowClassName} sm:text-[32px]`}>
                  {decisionActionDisplay}
                </p>
                <p className="text-[0.64rem] font-body-sm uppercase tracking-[0.16em] text-on-surface-variant">TICA Recommends</p>
              </div>
              <div className="w-full rounded-xl border border-primary/15 bg-surface-container-high/70 px-3 py-2 text-left">
                <div className="flex items-center justify-center gap-2.5" aria-label="Verdict colour key">
                  <div className="legend-traffic-light shrink-0">
                    <div className="legend-traffic-light-lens legend-lens-green" aria-hidden="true" />
                    <div className="legend-traffic-light-lens legend-lens-amber" aria-hidden="true" />
                    <div className="legend-traffic-light-lens legend-lens-red" aria-hidden="true" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] leading-none">
                    <span className="tica-decision-buy flex items-center">BUY</span>
                    <span className="tica-decision-review flex items-center">REVIEW</span>
                    <span className="tica-decision-pass flex items-center">PASS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-outline-variant/30 bg-surface-container-high px-4 py-3.5 sm:px-5 sm:py-4">
              <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-primary">Why TICA Recommends This</p>
              <ul className="flex-1 space-y-1.5">
                <li className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface">
                  <span className="tica-decision-buy mt-px shrink-0 font-semibold">✓</span>
                  <span>Asking price {featuredOpportunity.listPriceDisplay} below estimated market value ({featuredOpportunity.estimatedRetailValueDisplay})</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface">
                  <span className="tica-decision-buy mt-px shrink-0 font-semibold">✓</span>
                  <span>Estimated profit {featuredOpportunity.estimatedGrossProfitDisplay} exceeds target</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface">
                  <span className="tica-decision-buy mt-px shrink-0 font-semibold">✓</span>
                  <span>Strong current market demand — {featuredOpportunity.demandRatingDisplay}</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface">
                  <span className="tica-decision-buy mt-px shrink-0 font-semibold">✓</span>
                  <span>Low overall buying risk — {featuredOpportunity.riskLevel}</span>
                </li>
                <li className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface">
                  <span className="tica-decision-buy mt-px shrink-0 font-semibold">✓</span>
                  <span>Estimated retail margin is excellent — {featuredOpportunity.scoring.estimatedProfitScore.status}</span>
                </li>
              </ul>
              <div className="mt-3 border-t border-outline-variant/25 pt-3">
                <p className="mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-primary">Recommended Action</p>
                <ul className="space-y-1.5 text-body-sm font-body-sm leading-6 text-on-surface">
                  <li>Contact the seller today.</li>
                  <li>Request MOT history.</li>
                  <li>Confirm service records before placing an offer.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        <section className="dashboard-border rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4 sm:p-5">
          <p className="mb-3 text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant">Target Vehicle</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <div className="min-w-0 flex-1">
              <h2 className="text-headline-lg font-headline-lg text-on-surface">{featuredOpportunity.vehicle}</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <p>
                  <span className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Year</span>
                  <span className="mt-1 block text-body-lg font-body-lg text-on-surface">{featuredOpportunity.year}</span>
                </p>
                <p>
                  <span className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">Asking Price</span>
                  <span className="mt-1 block text-body-lg font-body-lg text-primary">{featuredOpportunity.listPriceDisplay}</span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container sm:w-52 md:w-60">
              <img
                src={featuredOpportunity.heroImageSrc}
                alt={featuredOpportunity.heroImageAlt}
                className="h-auto max-h-[160px] w-full object-cover sm:max-h-[130px] md:max-h-[120px]"
              />
            </div>
          </div>
        </section>


        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <h2 className="text-headline-md font-headline-md text-on-surface">Opportunity Analysis</h2>
          <p className="mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant">
            {featuredOpportunity.analysisSummary}
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">AI Buying Checklist</h2>
          <div className="space-y-3">
          {featuredOpportunity.checklist.map((item) => {
             const statusToneClass =
               item.tone === 'positive'
                 ? 'tica-decision-buy'
                 : item.tone === 'warning'
                   ? 'tica-decision-review'
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
          <p className="mt-4 text-body-sm font-body-sm text-on-surface-variant/70 italic">
            Complete vehicle history, MOT and verification services will be available through trusted data providers in a future release.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Negotiation Advice</h2>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Opening Offer</p>
              <p className="mt-2 text-body-lg font-semibold text-on-surface">{featuredOpportunity.negotiation.openingOfferDisplay}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Acceptance Range</p>
              <p className="mt-2 text-body-lg font-semibold text-on-surface">{featuredOpportunity.negotiation.likelyAcceptanceRangeDisplay}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Confidence</p>
              <p className="mt-2 text-body-lg font-semibold text-primary">{featuredOpportunity.negotiation.confidenceDisplay}</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Advice</p>
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

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Buying Summary</h2>
          <div className="rounded-xl border border-primary/30 bg-primary-container/20 px-4 py-4">
            <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
              {buyingSummaryLead}
              <span className={`font-semibold ${decisionVerdictClassName}`}>{decisionAction}</span>
              {buyingSummaryTail}
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
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

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <div className="flex flex-col gap-2 border-b border-outline-variant/25 pb-4 sm:pb-5">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">TICA Vehicle Intelligence™</p>
            <div className="max-w-3xl">
              <h2 className="text-headline-md font-headline-md text-on-surface">TICA Vehicle Intelligence™</h2>
              <p className="mt-2 text-body-md font-body-md leading-relaxed text-on-surface-variant">
                AI-powered model knowledge based on known ownership issues, manufacturer data, technician experience and real-world reliability trends.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.95fr]">
            <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary">Professional Intelligence Card</p>
                  <h3 className="mt-2 text-title-lg font-semibold text-on-surface">⚠ Known Model Issues</h3>
                </div>
                <div className="rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                  AI model knowledge
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {ticaVehicleIntelligence.modelIssues.map((issue) => {
                  const tone = issueToneConfig[issue.tone]
                  return (
                    <div key={issue.title} className="rounded-xl border border-outline-variant/25 bg-surface-container px-4 py-3">
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone.dotClassName}`} aria-hidden="true" />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-body-md font-body-md text-on-surface">• {issue.title}</p>
                            <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.className}`}>{tone.label}</span>
                          </div>
                          <p className="mt-1 text-body-sm font-body-sm leading-relaxed text-on-surface-variant">{issue.detail}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>

            <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary">AI Risk Indicator</p>
              <h3 className="mt-2 text-title-lg font-semibold text-on-surface">Overall Ownership Risk</h3>
              <div className="mt-4 rounded-2xl border border-outline-variant/30 bg-surface-container px-4 py-4">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-[linear-gradient(90deg,var(--tica-decision-buy)_0%,var(--tica-decision-buy)_33%,var(--tica-decision-review)_33%,var(--tica-decision-review)_66%,var(--tica-decision-pass)_66%,var(--tica-decision-pass)_100%)]" />
                <div className="mt-4 flex items-center justify-between rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-3">
                  <div>
                    <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Current signal</p>
                    <p className={`mt-1 text-body-lg font-semibold ${ownershipRiskToneClass}`}>🟡 {ticaVehicleIntelligence.ownershipRisk.level}</p>
                  </div>
                  <div className="h-4 w-4 rounded-full bg-[var(--tica-decision-review)] shadow-[0_0_14px_rgba(212,165,55,0.45)]" aria-hidden="true" />
                </div>
                <p className="mt-3 text-body-sm font-body-sm leading-relaxed text-on-surface-variant">
                  {ticaVehicleIntelligence.ownershipRisk.description}
                </p>
              </div>
            </article>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary">Common Inspection Points</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ticaVehicleIntelligence.inspectionPoints.map((point) => (
                  <div key={point} className="rounded-xl border border-outline-variant/25 bg-surface-container px-4 py-3 text-body-sm font-body-sm text-on-surface">
                    <span className="tica-decision-buy font-semibold">✓</span>
                    <span className="ml-2">{point}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary">Ownership Tips</p>
              <div className="mt-4 space-y-3">
                {ticaVehicleIntelligence.ownershipAdvice.map((advice) => (
                  <div key={advice} className="rounded-xl border border-outline-variant/25 bg-surface-container px-4 py-3">
                    <p className="text-body-sm font-body-sm leading-relaxed text-on-surface">• {advice}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_0.8fr]">
            <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary">Running Cost Intelligence</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {ticaVehicleIntelligence.runningCosts.map((item) => {
                  const tone = issueToneConfig[item.tone]
                  return (
                    <div key={item.label} className="rounded-xl border border-outline-variant/25 bg-surface-container px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant">{item.label}</p>
                        <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${tone.dotClassName}`} aria-hidden="true" />
                      </div>
                      <p className="mt-3 text-body-sm font-semibold leading-relaxed text-on-surface">{item.value}</p>
                    </div>
                  )
                })}
              </div>
            </article>

            <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary">Future Ready Architecture</p>
              <div className="mt-4 space-y-2.5">
                {[
                  'Manufacturer Technical Data',
                  'DVSA / MOT records',
                  'Recall databases',
                  'Warranty information',
                  'Technical Service Bulletins',
                  'Dealer repair statistics',
                  'Community reliability reports',
                  'AI learning engine',
                ].map((source) => (
                  <div key={source} className="rounded-xl border border-outline-variant/25 bg-surface-container px-4 py-3 text-body-sm font-body-sm text-on-surface">
                    {source}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-body-sm font-body-sm leading-relaxed text-on-surface-variant">
                Each intelligence block is structured as a standalone data field so live feeds can replace demo values without redesigning the report layout.
              </p>
            </article>
          </div>
        </section>

        <section className="dashboard-border timeline-mobile-shell rounded-2xl bg-surface-container p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface">Investigation Timeline</h2>
              <p className="mt-1.5 max-w-2xl text-body-md font-body-md text-on-surface-variant">
                The AI reasoning process behind this recommendation.
              </p>
            </div>

            <div className="timeline-status-panel">
              <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">AI Reasoning</p>
              <p className="mt-2 text-body-md font-body-md text-on-surface">
                <span className="tica-decision-buy mr-2">🟢</span>
                BUY signal confirmed
              </p>
              <p className="mt-1 text-sm text-on-surface-variant">Placeholder investigation checkpoints shown in decision order.</p>
            </div>
          </div>

          <div className="timeline-list mt-4" aria-label="AI investigation timeline">
            {investigationTimeline.map((event) => (
              <article key={`${event.time}-${event.message}`} className="timeline-entry">
                <p className="timeline-entry-time">{event.time}</p>
                <div className="timeline-entry-dot" aria-hidden="true" />
                <p className="timeline-entry-message">{event.message}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Dealer Notes</h2>
          <textarea
            placeholder="Add internal notes, call outcomes, valuation observations, and next actions..."
            className="h-44 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-40"
          />
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Actions</h2>
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
      <button
        aria-label="Back to top"
        className="back-to-top-btn"
        onClick={scrollToTop}
        style={{ opacity: showBackToTop ? 1 : 0, pointerEvents: showBackToTop ? 'auto' : 'none' }}
        type="button"
      >
        <svg aria-hidden="true" fill="none" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15l7-7 7 7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </svg>
      </button>
    </PlatformShell>
  )
}
