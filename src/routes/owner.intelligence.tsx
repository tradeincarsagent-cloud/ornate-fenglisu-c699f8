import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'
import { MISSION_STAGES, type TicaMission } from '../lib/mission'
import { useMissionProgress } from '../lib/useMissionProgress'

export const Route = createFileRoute('/owner/intelligence')({
  component: OwnerIntelligencePage,
})

type OpportunityCard = {
  title: string
  vehicle: string
  estimatedMargin: string
  confidence: string
  recommendation: string
  note: string
}

type MarketCard = {
  name: string
  demand: string
  supply: string
  margin: string
  trend: string
  confidence: string
}

type LearningMetric = {
  label: string
  value: string
  detail: string
  tone?: 'default' | 'primary' | 'success'
}

type PredictionGroup = {
  title: string
  tone: 'primary' | 'warning' | 'success' | 'critical'
  items: string[]
}

type SourceCard = {
  name: string
  status: 'Connected' | 'Monitoring' | 'Delayed' | 'Planned'
  quality: string
  lastUpdate: string
  detail: string
}

type DecisionItem = {
  action: string
  priority: 'Immediate' | 'Today' | 'Monitor'
  rationale: string
}

const opportunityCards: OpportunityCard[] = [
  {
    title: 'Best Opportunity Today',
    vehicle: '2021 Porsche Macan S',
    estimatedMargin: '£4,260',
    confidence: '96%',
    recommendation: 'Escalate to buyer review before midday.',
    note: 'Retail demand is holding while trade supply is narrowing.',
  },
  {
    title: 'Fastest Moving Market',
    vehicle: '2022 Volkswagen Golf GTI Clubsport',
    estimatedMargin: '£2,180',
    confidence: '94%',
    recommendation: 'Increase alert frequency on GTI searches.',
    note: 'Average time-to-sale has shortened by 1.8 days week-on-week.',
  },
  {
    title: 'Highest Estimated Margin',
    vehicle: '2020 Land Rover Defender 110 HSE',
    estimatedMargin: '£5,480',
    confidence: '82%',
    recommendation: 'Proceed selectively and verify acquisition costs.',
    note: 'Margin is attractive, but pricing volatility remains elevated.',
  },
  {
    title: 'Highest Confidence Match',
    vehicle: '2023 Ford Ranger Wildtrak',
    estimatedMargin: '£2,940',
    confidence: '98%',
    recommendation: 'Keep live monitoring active across fleet channels.',
    note: 'Dealer demand and buyer conversion patterns remain consistently strong.',
  },
]

const marketCards: MarketCard[] = [
  { name: 'Performance Cars', demand: 'High', supply: 'Tightening', margin: '£3,420', trend: 'Rising', confidence: '95%' },
  { name: 'Classics', demand: 'Stable', supply: 'Selective', margin: '£4,850', trend: 'Firm', confidence: '79%' },
  { name: 'SUVs', demand: 'High', supply: 'Balanced', margin: '£2,680', trend: 'Positive', confidence: '91%' },
  { name: 'Pick-ups', demand: 'High', supply: 'Constrained', margin: '£2,940', trend: 'Rising', confidence: '93%' },
  { name: 'Electric Vehicles', demand: 'Mixed', supply: 'Heavy', margin: '£1,260', trend: 'Softening', confidence: '84%' },
  { name: 'Vans', demand: 'Reliable', supply: 'Improving', margin: '£2,140', trend: 'Steady', confidence: '89%' },
]

const learningMetrics: LearningMetric[] = [
  { label: 'Vehicles Analysed Today', value: '84,312', detail: 'Across 6 connected intelligence sources', tone: 'primary' },
  { label: 'Patterns Learned', value: '318', detail: 'Fresh pricing, stocking and demand patterns detected', tone: 'success' },
  { label: 'Dealer Behaviour Signals', value: '47', detail: 'Search and bid urgency changes across active dealers' },
  { label: 'Pricing Trends Detected', value: '126', detail: 'Above historical daily average of 101', tone: 'primary' },
  { label: 'Mission Success Rate', value: '92.4%', detail: 'Successful surfaced opportunities versus target profile matches', tone: 'success' },
  { label: 'Average AI Confidence', value: '89.1%', detail: 'Weighted across all overnight analysis batches' },
]

const predictionGroups: PredictionGroup[] = [
  {
    title: 'Likely Rising Markets',
    tone: 'success',
    items: ['Volkswagen Golf GTI / Clubsport', 'Porsche Macan petrol models', 'Ford Ranger Wildtrak', 'Toyota Hilux Invincible X'],
  },
  {
    title: 'Likely Falling Markets',
    tone: 'warning',
    items: ['BMW M3 Competition', 'Tesla Model 3 Long Range', 'Audi e-tron 55', 'Large diesel executive saloons'],
  },
  {
    title: 'Best Vehicles To Buy Next 30 Days',
    tone: 'primary',
    items: ['Porsche Cayenne Coupe', 'Volkswagen Golf R', 'Ford Transit Custom Limited', 'Mercedes GLC 300d AMG Line'],
  },
  {
    title: 'High Risk Purchases',
    tone: 'critical',
    items: ['Late-shape Defender 110 above guide', 'High-mileage Tesla Model Y', 'Older BMW M5 with inconsistent history', 'EV stock over 120 days old'],
  },
  {
    title: 'Emerging Opportunities',
    tone: 'primary',
    items: ['Dealer group de-fleeted SUVs', 'Nearly-new premium hybrids', 'Low-owner facelift Macans', 'Network part-ex pick-up stock'],
  },
]

const sourceCards: SourceCard[] = [
  { name: 'Auto Trader', status: 'Connected', quality: '98/100', lastUpdate: '2 min ago', detail: 'Primary retail pricing and stock depth feed is healthy.' },
  { name: 'Motorway', status: 'Connected', quality: '94/100', lastUpdate: '4 min ago', detail: 'Trade supply signal remains strong for prestige and 4x4 stock.' },
  { name: 'Dealer Networks', status: 'Connected', quality: '91/100', lastUpdate: '7 min ago', detail: 'Inter-dealer demand is accelerating for GTI and Macan searches.' },
  { name: 'Fleet Disposal', status: 'Monitoring', quality: '87/100', lastUpdate: '12 min ago', detail: 'Good quality pipeline, but lower match volume this morning.' },
  { name: 'Auction Sources', status: 'Delayed', quality: '78/100', lastUpdate: '43 min ago', detail: 'One overnight batch landed late; confidence adjusted automatically.' },
  { name: 'Future Integrations', status: 'Planned', quality: '—', lastUpdate: 'Roadmap', detail: 'Insurance write-off, OEM remarketing and finance returns are queued.' },
]

const decisionItems: DecisionItem[] = [
  {
    action: 'Increase monitoring of Golf GTI searches.',
    priority: 'Immediate',
    rationale: 'Retail demand is rising faster than incoming supply, improving buy-speed advantage for connected dealers.',
  },
  {
    action: 'Reduce Defender buying confidence on any stock above guide.',
    priority: 'Today',
    rationale: 'Headline margin is attractive, but the model is showing broader price dispersion and slower days-to-sale.',
  },
  {
    action: 'Increase Porsche Macan search priority.',
    priority: 'Today',
    rationale: 'Consistent demand, cleaner part-ex stock and strong resale velocity make Macan the best balanced target today.',
  },
  {
    action: 'Watch BMW M3 pricing closely.',
    priority: 'Monitor',
    rationale: 'Softening retail prices suggest a near-term reset; only best-spec cars should be surfaced aggressively.',
  },
]

const predictionToneClasses: Record<PredictionGroup['tone'], string> = {
  primary: 'border-primary/20 bg-primary/5',
  warning: 'border-amber-400/20 bg-amber-400/5',
  success: 'border-emerald-400/20 bg-emerald-400/5',
  critical: 'border-red-400/20 bg-red-400/5',
}

const predictionLabelClasses: Record<PredictionGroup['tone'], string> = {
  primary: 'text-primary',
  warning: 'text-amber-300',
  success: 'text-emerald-300',
  critical: 'text-red-300',
}

const metricValueClasses: Record<NonNullable<LearningMetric['tone']>, string> = {
  default: 'text-on-surface',
  primary: 'text-primary',
  success: 'text-emerald-300',
}

const sourceStatusClasses: Record<SourceCard['status'], string> = {
  Connected: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  Monitoring: 'border-primary/25 bg-primary/10 text-primary',
  Delayed: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
  Planned: 'border-outline-variant/25 bg-surface/40 text-on-surface-variant',
}

const decisionPriorityClasses: Record<DecisionItem['priority'], string> = {
  Immediate: 'border-red-400/25 bg-red-400/10 text-red-300',
  Today: 'border-primary/25 bg-primary/10 text-primary',
  Monitor: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
}

const ACTIVE_STAGE_INDEX = 0
const PROCESSING_STATUS = 'Mission Created'
const PROCESSING_STAGE = 'Mission Created'

function formatVehicle(mission: TicaMission) {
  return [mission.vehicleType, mission.vehicleRequirements.make, mission.vehicleRequirements.model].filter(Boolean).join(' / ') || 'Not specified'
}

function formatBudget(budget: string) {
  return budget ? `Up to £${Number(budget).toLocaleString('en-GB')}` : 'Not specified'
}

function SectionCard({ title, eyebrow, subtitle, children }: { title: string; eyebrow?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-high/80 shadow-[0_8px_32px_rgba(2,6,23,0.22)] backdrop-blur-sm overflow-hidden">
      <div className="border-b border-outline-variant/20 px-5 py-4 md:px-6">
        {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">{eyebrow}</p> : null}
        <h2 className="mt-1 text-body-lg font-semibold text-on-surface">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p> : null}
      </div>
      <div className="px-5 py-4 md:px-6">{children}</div>
    </section>
  )
}

function LiveClock() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(() => new Date())
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())
    intervalRef.current = window.setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <span suppressHydrationWarning className="tabular-nums text-on-surface text-sm font-medium">
      {mounted ? time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
    </span>
  )
}

function OwnerIntelligencePage() {
  const [showBackTop, setShowBackTop] = useState(false)
  const activeMission = useMissionProgress()
  const missionLoaded = activeMission !== null
  const [activityTimestamp, setActivityTimestamp] = useState('')

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActivityTimestamp(
      new Date().toLocaleString('en-GB', {
        dateStyle: 'short',
        timeStyle: 'medium',
      }),
    )
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { label: 'Dealer Command Centre', href: '/dashboard' },
    { label: 'AI Search Missions', href: '/search-builder' },
    { label: 'AI Buying Report', href: '/opportunity' },
    { label: 'Settings', isSectionLabel: true },
    { label: 'TICA Preferences', href: '/settings' },
    { label: 'Owner', isSectionLabel: true },
    { label: 'TICA Operations Centre', href: '/owner' },
    { label: '🧠 TICA Intelligence', href: '/owner/intelligence', active: true },
    { label: 'Future Features', isSectionLabel: true },
    { label: 'Vehicle History & MOT', disabled: true },
    { label: 'Watchlist', disabled: true },
    { label: 'Subscription', disabled: true },
  ]

  return (
    <PlatformShell navItems={navItems}>
      <div className="mx-auto w-full max-w-container-max space-y-6 sm:space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-on-surface-variant/50">
          <span>Operations Centre</span>
          <span aria-hidden="true">/</span>
          <span>Intelligence</span>
        </nav>

        <header>
          <div className="mb-1 flex items-center gap-2">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Private</p>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
              Owner Only
            </span>
          </div>
          <div className="mb-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="text-headline-lg font-headline-lg text-primary">TICA Intelligence</h1>
              <p className="mt-1 text-sm font-semibold text-on-surface md:text-body-md">Strategic AI Analysis &amp; Market Intelligence</p>
              <p className="mt-1 text-body-md font-body-md text-on-surface-variant">
                What TICA is learning, what is changing in the market, and what the ownership team should do next.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-emerald-400/20 bg-surface-container-high/65 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/45 animate-pulse" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">TICA Live</span>
                </div>
                <span className="hidden h-4 w-px bg-outline-variant/30 sm:block" aria-hidden="true" />
                <span className="text-sm text-on-surface-variant">Overall AI confidence remains high</span>
                <span className="hidden h-4 w-px bg-outline-variant/30 md:block" aria-hidden="true" />
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant/80">Local Time</span>
                  <LiveClock />
                </div>
              </div>
              <div className="mt-3 grid gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-high/40 px-4 py-2.5 sm:grid-cols-3 sm:gap-x-6">
                {[
                  { label: 'Vehicles Analysed', value: '84,312' },
                  { label: 'High-Confidence Opportunities', value: '3' },
                  { label: 'Sources with Delays', value: '1' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <span className="text-sm font-bold tabular-nums text-on-surface">{stat.value}</span>
                    <span className="text-[11px] text-on-surface-variant/60">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-2 md:items-end">
              <TicaShield />
              <div className="text-center md:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/50">Platform Status</p>
                <div className="mt-0.5 flex items-center justify-center gap-1.5 md:justify-end">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="text-xs font-medium text-emerald-300">Production</span>
                </div>
                <p className="mt-0.5 text-[10px] text-on-surface-variant/40">Version 1.0</p>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-[1.75rem] border border-primary/20 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(17,24,39,0.82))] p-5 shadow-[0_18px_50px_rgba(2,6,23,0.35)] sm:p-6 lg:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(16rem,0.95fr)] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Executive AI Briefing</p>
              <div className="mt-4 space-y-4">
                <p className="text-lg leading-8 text-on-surface sm:text-[1.4rem] sm:leading-9">
                  Good afternoon, Jonathan. Overnight TICA analysed 84,312 vehicles across connected sources. Demand for
                  Volkswagen Golf GTI models continues to rise while BMW M3 prices have softened. Three high-confidence
                  buying opportunities require review today. One data source experienced intermittent delays overnight.
                  Overall AI confidence remains high.
                </p>
                <p className="max-w-3xl text-sm leading-7 text-on-surface-variant">
                  The strongest signal this morning is the continued compression in performance hatchback supply while
                  retailer search intent remains elevated. TICA is also detecting a cleaner acquisition window for Porsche
                  Macan petrol stock and stronger-than-usual margin protection in premium pick-ups.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/70">Morning highlights</p>
              <div className="mt-4 space-y-3">
                {[
                  'Golf GTI search demand up 14% week-on-week',
                  'Macan petrol stock now retailing 2.1 days faster',
                  'Auction-source delay contained with no critical data loss',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-outline-variant/15 bg-surface/25 px-3 py-3">
                    <span className="mt-0.5 text-primary">•</span>
                    <p className="text-sm text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionCard
          title="Mission Processing Engine"
          subtitle="Live AI workflow for active dealer search missions."
        >
          {missionLoaded && activeMission ? (
            <>
              {/* Pipeline — desktop horizontal */}
              <div className="hidden lg:flex items-start gap-1">
                {MISSION_STAGES.map((stage, i) => {
                  const activeIdx = activeMission.currentStageIndex ?? ACTIVE_STAGE_INDEX
                  const status = i < activeIdx ? 'completed' : i === activeIdx ? 'active' : 'upcoming'
                  return (
                    <div key={stage} className="flex min-w-0 flex-1 items-start gap-1">
                      <div
                        className={`min-w-0 flex-1 rounded-xl border p-3 ${
                          status === 'completed'
                            ? 'border-emerald-400/25 bg-emerald-400/10'
                            : status === 'active'
                              ? 'border-primary/35 bg-primary/10 ring-1 ring-primary/15'
                              : 'border-outline-variant/15 bg-surface/20'
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-1.5">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                              status === 'completed'
                                ? 'bg-emerald-400/20 text-emerald-300'
                                : status === 'active'
                                  ? 'bg-primary/20 text-primary'
                                  : 'bg-surface-container-high text-on-surface-variant/40'
                            }`}
                          >
                            {status === 'completed' ? '✓' : i + 1}
                          </span>
                        </div>
                        <p
                          className={`text-[11px] font-semibold leading-tight ${
                            status === 'completed' ? 'text-emerald-300' : status === 'active' ? 'text-primary' : 'text-on-surface-variant/50'
                          }`}
                        >
                          {stage}
                        </p>
                      </div>
                      {i < MISSION_STAGES.length - 1 ? (
                        <div className="mt-4 flex shrink-0 self-start px-0.5 text-xs text-outline-variant/35" aria-hidden="true">
                          →
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>

              {/* Pipeline — mobile/tablet vertical stepper */}
              <div className="space-y-1.5 lg:hidden">
                {MISSION_STAGES.map((stage, i) => {
                  const activeIdx = activeMission.currentStageIndex ?? ACTIVE_STAGE_INDEX
                  const status = i < activeIdx ? 'completed' : i === activeIdx ? 'active' : 'upcoming'
                  return (
                    <div
                      key={stage}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                        status === 'completed'
                          ? 'border-emerald-400/15 bg-emerald-400/5'
                          : status === 'active'
                            ? 'border-primary/25 bg-primary/5'
                            : 'border-outline-variant/10 bg-surface/15'
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                          status === 'completed'
                            ? 'border-emerald-400/25 bg-emerald-400/20 text-emerald-300'
                            : status === 'active'
                              ? 'border-primary/35 bg-primary/20 text-primary'
                              : 'border-outline-variant/20 bg-surface-container-high text-on-surface-variant/40'
                        }`}
                      >
                        {status === 'completed' ? '✓' : i + 1}
                      </div>
                      <p
                        className={`flex-1 text-sm font-medium ${
                          status === 'completed' ? 'text-emerald-300' : status === 'active' ? 'text-primary' : 'text-on-surface-variant/50'
                        }`}
                      >
                        {stage}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_268px]">
                <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Active Mission</p>
                      <h3 className="mt-1 text-base font-bold text-on-surface">{activeMission.missionId}</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {activeMission.status || PROCESSING_STATUS}
                    </span>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Mission ID</dt>
                      <dd className="mt-1 font-medium text-on-surface">{activeMission.missionId}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Vehicle</dt>
                      <dd className="mt-1 font-medium text-on-surface">{formatVehicle(activeMission)}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Budget</dt>
                      <dd className="mt-1 font-semibold text-primary">{formatBudget(activeMission.budget)}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Search Area</dt>
                      <dd className="mt-1 font-medium text-on-surface">{activeMission.searchArea || 'Not specified'}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Buying Priority</dt>
                      <dd className="mt-1 font-medium text-on-surface">{activeMission.buyingPriority || 'Not specified'}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Current Stage</dt>
                      <dd className="mt-1 font-medium text-on-surface">{activeMission.currentStage || PROCESSING_STAGE}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Status</dt>
                      <dd className="mt-1 font-medium text-on-surface">{activeMission.status || PROCESSING_STATUS}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Est. Time Remaining</dt>
                      <dd className="mt-1 font-medium text-on-surface">{activeMission.estimatedTimeRemaining || '—'}</dd>
                    </div>
                  </dl>
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{activeMission.currentStage || PROCESSING_STAGE}</p>
                      <span className="text-sm font-bold tabular-nums text-primary">{activeMission.progress ?? 0}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
                      <div
                        className="h-full rounded-full bg-primary/70"
                        style={{ width: `${activeMission.progress ?? 0}%` }}
                        role="progressbar"
                        aria-valuenow={activeMission.progress ?? 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Mission progress: ${activeMission.progress ?? 0}%`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4 sm:p-5">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/70">AI Activity</p>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm text-on-surface">{activeMission.currentAiActivity || 'Mission accepted from TICA Operations Centre.'}</p>
                        <p className="mt-0.5 text-[11px] tabular-nums text-on-surface-variant/50">{activityTimestamp}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4 sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/70">AI Engine Status</p>
                    <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                      <p className="text-sm font-semibold text-primary">{activeMission.currentStage || 'Mission Created'}</p>
                      <p className="mt-1 text-sm text-on-surface-variant">{activeMission.currentAiActivity || 'Awaiting AI validation.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : missionLoaded ? (
            <div className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-6 text-center sm:p-8">
              <p className="text-base font-semibold text-on-surface">No active AI Search Mission available.</p>
              <Link
                to="/search-builder"
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:brightness-110"
              >
                Create AI Search Mission
              </Link>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Opportunity Radar" eyebrow="What looks strongest right now">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {opportunityCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">{card.title}</p>
                <h3 className="mt-2 text-base font-semibold text-on-surface">{card.vehicle}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Estimated Margin</p>
                    <p className="mt-1 text-base font-bold text-primary">{card.estimatedMargin}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">AI Confidence</p>
                    <p className="mt-1 text-base font-bold text-emerald-300">{card.confidence}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-on-surface">{card.recommendation}</p>
                <p className="mt-2 text-xs leading-6 text-on-surface-variant">{card.note}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Market Intelligence" eyebrow="Segment-level reading">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {marketCards.map((card) => (
              <article key={card.name} className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-on-surface">{card.name}</h3>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {card.trend}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Market Demand</dt>
                    <dd className="mt-1 text-on-surface">{card.demand}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Supply</dt>
                    <dd className="mt-1 text-on-surface">{card.supply}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Estimated Margin</dt>
                    <dd className="mt-1 text-primary font-semibold">{card.margin}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">AI Confidence</dt>
                    <dd className="mt-1 text-emerald-300 font-semibold">{card.confidence}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI Learning Centre" eyebrow="How the model is improving today">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {learningMetrics.map((metric) => {
              const tone = metric.tone ?? 'default'
              return (
                <article key={metric.label} className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">{metric.label}</p>
                  <p className={`mt-2 text-2xl font-bold ${metricValueClasses[tone]}`}>{metric.value}</p>
                  <p className="mt-2 text-sm text-on-surface-variant">{metric.detail}</p>
                </article>
              )
            })}
          </div>
          <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Learning Progress</p>
                <p className="mt-1 text-base font-semibold text-on-surface">Signal confidence has improved throughout the morning batch cycle.</p>
              </div>
              <p className="text-2xl font-bold text-primary">76%</p>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(20,147,255,0.65),rgba(74,222,128,0.78))]" style={{ width: '76%' }} />
            </div>
            <p className="mt-3 text-sm text-on-surface-variant">TICA has already completed 76% of today’s scheduled learning passes across pricing, demand and dealer behaviour models.</p>
          </div>
        </SectionCard>

        <SectionCard title="Prediction Engine" eyebrow="Where the market is heading next">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {predictionGroups.map((group) => (
              <article key={group.title} className={`rounded-2xl border p-4 ${predictionToneClasses[group.tone]}`}>
                <h3 className={`text-base font-semibold ${predictionLabelClasses[group.tone]}`}>{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-xl border border-outline-variant/15 bg-surface/25 px-3 py-2.5 text-sm text-on-surface-variant">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Connected Intelligence Sources" eyebrow="Feed health and confidence">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sourceCards.map((source) => (
              <article key={source.name} className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-on-surface">{source.name}</h3>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${sourceStatusClasses[source.status]}`}>
                    {source.status}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Quality Score</dt>
                    <dd className="mt-1 text-on-surface">{source.quality}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60">Last Update</dt>
                    <dd className="mt-1 text-on-surface">{source.lastUpdate}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm leading-6 text-on-surface-variant">{source.detail}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="AI Decision Engine" eyebrow="What TICA recommends next">
          <div className="space-y-3">
            {decisionItems.map((item) => (
              <article key={item.action} className="rounded-2xl border border-outline-variant/20 bg-surface/35 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-on-surface">{item.action}</h3>
                    <p className="mt-2 text-sm leading-7 text-on-surface-variant">{item.rationale}</p>
                  </div>
                  <span className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${decisionPriorityClasses[item.priority]}`}>
                    {item.priority}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-high/60 px-5 py-4 text-sm leading-7 text-on-surface-variant shadow-[0_8px_28px_rgba(2,6,23,0.16)]">
          TICA Intelligence continuously analyses connected market data to identify buying opportunities and improve dealer
          search performance.
        </div>

        {showBackTop ? (
          <button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface-container-high text-primary shadow-[0_4px_16px_rgba(2,6,23,0.4)] transition-all hover:bg-primary/10"
            aria-label="Back to top"
          >
            ↑
          </button>
        ) : null}
      </div>
    </PlatformShell>
  )
}
