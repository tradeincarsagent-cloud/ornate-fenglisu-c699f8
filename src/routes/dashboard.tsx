import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'
import { opportunityIntelligencePlaceholder } from '../data/opportunity-intelligence'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

type RadarContactType = 'car' | 'pickup' | 'van' | 'motorcycle'

type MissionStatus = 'Monitoring' | 'Waiting' | 'Updating'

const missionStatusConfig: Record<MissionStatus, { color: string; glow: string; label: string; emoji: string }> = {
  Monitoring: { color: 'rgba(74, 222, 128, 0.9)', glow: 'rgba(74, 222, 128, 0.55)', label: 'Monitoring', emoji: '🟢' },
  Waiting: { color: 'rgba(251, 191, 36, 0.88)', glow: 'rgba(251, 191, 36, 0.5)', label: 'Waiting', emoji: '🟡' },
  Updating: { color: 'rgba(56, 189, 248, 0.9)', glow: 'rgba(56, 189, 248, 0.5)', label: 'Updating', emoji: '🔵' },
}

type TimelineTemplate = {
  id: string
  message: string
  contactId: string
  opportunityIndex: number
  missionIndex?: number
}

type TimelineEvent = TimelineTemplate & {
  eventId: string
  time: string
}

const radarContacts: Array<{
  id: string
  x: number
  y: number
  vehicleType: RadarContactType
  opportunityIndex: number
  angleDeg: number
}> = [
  { id: 'contact-1', x: 0.63, y: 0.24, vehicleType: 'car', opportunityIndex: 0, angleDeg: 35.8 },
  { id: 'contact-2', x: 0.29, y: 0.61, vehicleType: 'pickup', opportunityIndex: 1, angleDeg: 239.7 },
  { id: 'contact-3', x: 0.74, y: 0.47, vehicleType: 'van', opportunityIndex: 2, angleDeg: 85.2 },
  { id: 'contact-4', x: 0.57, y: 0.7, vehicleType: 'motorcycle', opportunityIndex: 3, angleDeg: 161.6 },
  { id: 'contact-5', x: 0.18, y: 0.33, vehicleType: 'car', opportunityIndex: 4, angleDeg: 208.1 },
]

const timelineTemplates: TimelineTemplate[] = [
  {
    id: 'timeline-audi-rs5',
    message: 'Audi RS5 Sportback detected below market price.',
    contactId: 'contact-1',
    opportunityIndex: 0,
  },
  {
    id: 'timeline-range-rover',
    message: 'Range Rover Velar price reduced by £850.',
    contactId: 'contact-2',
    opportunityIndex: 1,
  },
  {
    id: 'timeline-mercedes-search',
    message: 'Dealer Network search completed for Mercedes A45 AMG.',
    contactId: 'contact-3',
    opportunityIndex: 2,
    missionIndex: 2,
  },
  {
    id: 'timeline-porsche-opportunity',
    message: 'New Porsche Macan S opportunity added to Recent Opportunities.',
    contactId: 'contact-5',
    opportunityIndex: 4,
  },
  {
    id: 'timeline-golf-mission',
    message: 'AI Search Mission updated for Volkswagen Golf R.',
    contactId: 'contact-4',
    opportunityIndex: 3,
    missionIndex: 0,
  },
]

const initialTimelineEvents: TimelineEvent[] = [
  { ...timelineTemplates[0], eventId: 'timeline-seed-1', time: '09:14' },
  { ...timelineTemplates[1], eventId: 'timeline-seed-2', time: '09:11' },
  { ...timelineTemplates[2], eventId: 'timeline-seed-3', time: '09:08' },
  { ...timelineTemplates[3], eventId: 'timeline-seed-4', time: '09:05' },
  { ...timelineTemplates[4], eventId: 'timeline-seed-5', time: '09:02' },
]

const aiStatusMessages = [
  'Scanning marketplaces…',
  'Comparing market prices…',
  'Checking dealer demand…',
  'Reviewing overnight auctions…',
  'Analysing new listings…',
  'Monitoring watched vehicles…',
  'Ranking opportunities…',
]

const greetingSummaries = [
  'TICA analysed 8,462 vehicles overnight.',
  'Three opportunities require your attention.',
  'One monitored vehicle has reduced in price.',
  'Your top search mission found 3 new matches.',
  'Market prices shifted on 14 vehicles overnight.',
]

const topOpportunityComparison = [
  { vehicle: 'BMW M3 Competition', opportunityScore: 94, estimatedProfit: '£4,255', daysToSell: '22 days', ticaDecision: 'BUY' },
  { vehicle: 'BMW M3 Competition', opportunityScore: 89, estimatedProfit: '£3,620', daysToSell: '27 days', ticaDecision: 'REVIEW' },
  { vehicle: 'BMW M3 Competition', opportunityScore: 74, estimatedProfit: '£1,980', daysToSell: '41 days', ticaDecision: 'PASS' },
] as const

const topOpportunityReasons = [
  'Highest opportunity score across this comparison set.',
  'Strongest estimated profit among available options.',
  'Aligned with current BUY threshold in the TICA model.',
]

const activityTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const counterFormatter = new Intl.NumberFormat('en-GB')

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
  const { dashboardRecentOpportunities, featuredOpportunity } = opportunityIntelligencePlaceholder
  const decisionModel = featuredOpportunity.decisionModel
  const summaryCards = [
    { icon: '🚗', title: 'New Vehicle Opportunities', value: '8' },
    { icon: '📉', title: 'Price Drops', value: '2' },
    { icon: '⭐', title: 'High-Profit Matches', value: '3' },
    { icon: '🔔', title: 'Auctions Ending Today', value: '1' },
    { icon: '❤️', title: 'Saved Vehicles Updated', value: '5' },
  ]
  const dailyBriefingCards = [
    { label: 'Listings Analysed', value: '18,462', detail: 'Across your connected search sources' },
    { label: 'Matches Found', value: '24', detail: '5 passed your buying criteria today' },
    { label: 'Top Priority', value: featuredOpportunity.vehicle, detail: featuredOpportunity.scoring.estimatedProfitScore.status },
  ]
  const recentOpportunities = dashboardRecentOpportunities
  const activeSearches: Array<{
    name: string
    status: MissionStatus
    lastScan: string
    opportunities: number
    vehicleType: string
    searchArea: string
    budget: string
    nextScan: string
    progress: number
    vehiclesAnalysedToday: number
    rejectedListings: number
    qualifiedOpportunities: number
    bestOpportunityScore: number
    missionUpdate: string
    sources: string[]
    liveMessages: string[]
  }> = [
    {
      name: 'BMW M3 UK Search',
      status: 'Monitoring',
      lastScan: '2 minutes ago',
      opportunities: 3,
      vehicleType: 'Car',
      searchArea: 'UK Nationwide',
      budget: 'Up to £35,000',
      nextScan: '13 minutes',
      progress: 78,
      vehiclesAnalysedToday: 4821,
      rejectedListings: 112,
      qualifiedOpportunities: 3,
      bestOpportunityScore: 94,
      missionUpdate: 'One opportunity promoted to Today\'s Best Buy.',
      sources: ['Auto Trader UK', 'Facebook Marketplace', 'Motors.co.uk', 'CarGurus', 'Dealer Auctions', 'Classic Cars'],
      liveMessages: ['Scanning 6 marketplaces…', 'Analysing new listings…', 'Comparing prices…', 'Checking dealer demand…'],
    },
    {
      name: 'SUVs under £28k',
      status: 'Waiting',
      lastScan: '11 minutes ago',
      opportunities: 9,
      vehicleType: 'SUV',
      searchArea: 'South East England',
      budget: 'Up to £28,000',
      nextScan: '4 minutes',
      progress: 42,
      vehiclesAnalysedToday: 2309,
      rejectedListings: 87,
      qualifiedOpportunities: 9,
      bestOpportunityScore: 81,
      missionUpdate: 'No new qualifying listings during the last scan.',
      sources: ['Auto Trader UK', 'Motors.co.uk', 'CarGurus', 'Dealer Auctions'],
      liveMessages: ['Checking dealer demand…', 'Searching for price reductions…', 'Analysing new listings…', 'Scanning 4 marketplaces…'],
    },
    {
      name: 'Low-mileage hybrids',
      status: 'Updating',
      lastScan: '1 minute ago',
      opportunities: 6,
      vehicleType: 'Hybrid / EV',
      searchArea: 'UK Nationwide',
      budget: 'Up to £22,000',
      nextScan: '19 minutes',
      progress: 61,
      vehiclesAnalysedToday: 3144,
      rejectedListings: 98,
      qualifiedOpportunities: 6,
      bestOpportunityScore: 76,
      missionUpdate: 'Price reduction detected on one monitored vehicle.',
      sources: ['Auto Trader UK', 'Facebook Marketplace', 'Motors.co.uk', 'CarGurus', 'Classic Cars'],
      liveMessages: ['Scanning 5 marketplaces…', 'Comparing prices…', 'Checking dealer demand…', 'Searching for price reductions…'],
    },
  ]
  const recommendationEvidencePoints = [
    decisionModel.factors.overallOpportunityScore.summary,
    decisionModel.factors.dealerDemand.summary,
    decisionModel.factors.estimatedProfit.summary,
    decisionModel.factors.timeOnMarket.summary,
    decisionModel.factors.vehicleHistory.summary,
  ]
  const recommendationCautionPoints = [
    'Vehicle history has not yet been verified.',
    'Service history should be confirmed.',
    'Seller response time is currently unknown.',
  ]

  const [highlightedOpportunity, setHighlightedOpportunity] = useState<number | null>(null)
  const [highlightedMission, setHighlightedMission] = useState<number | null>(null)
  const [priorityContactId, setPriorityContactId] = useState<string | null>(null)
  const [contactIntensity, setContactIntensity] = useState<number[]>(() => radarContacts.map(() => 0.22))
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false)
  const [aiSearchLive, setAiSearchLive] = useState(true)
  const [timelineEvents, setTimelineEvents] = useState(initialTimelineEvents)
  const [activeTimelineEventId, setActiveTimelineEventId] = useState<string | null>(null)
  const [liveCounters, setLiveCounters] = useState({
    vehiclesCheckedToday: 12487,
    matchesFound: 27,
    highPriorityMatches: 3,
  })
  const [expandedSearches, setExpandedSearches] = useState<Record<number, boolean>>(
    () => Object.fromEntries(activeSearches.map((_, i) => [i, true])),
  )
  const [openMoreMenu, setOpenMoreMenu] = useState<number | null>(null)
  const [recAction, setRecAction] = useState<'saved' | 'dismissed' | 'reminded' | null>(null)
  const [opportunityHistoryOpen, setOpportunityHistoryOpen] = useState(false)
  const [activeAiStatusMessage, setActiveAiStatusMessage] = useState(aiStatusMessages[0])
  const [aiStatusMessageVisible, setAiStatusMessageVisible] = useState(true)
  const [missionMsgIndices, setMissionMsgIndices] = useState<number[]>(() => activeSearches.map(() => 0))
  const [missionMsgVisible, setMissionMsgVisible] = useState<boolean[]>(() => activeSearches.map(() => true))
  const [greetingSummaryIndex, setGreetingSummaryIndex] = useState(0)
  const [greetingSummaryVisible, setGreetingSummaryVisible] = useState(true)

  const timelineCursorRef = useRef(initialTimelineEvents.length % timelineTemplates.length)

  useEffect(() => {
    if (!aiSearchLive) return

    const sweepDurationMs = 3600
    const sweepHeadOffsetDeg = 60
    const sweepTrailDegrees = 128
    const baseIntensity = 0.16
    const updateSweep = () => {
      const elapsed = Date.now() % sweepDurationMs
      const baseAngle = (elapsed / sweepDurationMs) * 360
      const sweepHeadAngle = (baseAngle + sweepHeadOffsetDeg) % 360

      setContactIntensity(
        radarContacts.map((contact) => {
          const trailingDelta = (sweepHeadAngle - contact.angleDeg + 360) % 360
          if (trailingDelta > sweepTrailDegrees) return baseIntensity

          const normalizedTrail = trailingDelta / sweepTrailDegrees
          const trailFade = Math.exp(-normalizedTrail * 3.1)
          const beamHitFlash = Math.exp(-((trailingDelta / 8) ** 2))
          const nextIntensity = baseIntensity + trailFade * 0.66 + beamHitFlash * 0.24
          return Math.min(1, nextIntensity)
        }),
      )
    }

    updateSweep()
    const sweepInterval = setInterval(updateSweep, 60)
    return () => clearInterval(sweepInterval)
  }, [aiSearchLive])

  useEffect(() => {
    if (!aiSearchLive) {
      setContactIntensity(radarContacts.map(() => 0.22))
      setPriorityContactId(null)
      setRadarDetectionGlow(false)
      setHighlightedOpportunity(null)
      setActiveTimelineEventId(null)
      return
    }
  }, [aiSearchLive])

  useEffect(() => {
    if (!aiSearchLive) return

    let cancelled = false
    const timeoutIds: number[] = []
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      timeoutIds.push(id)
    }

    const runTimelineActivity = () => {
      if (cancelled) return
      const template = timelineTemplates[timelineCursorRef.current]
      const eventId = `${template.id}-${Date.now()}`
      timelineCursorRef.current = (timelineCursorRef.current + 1) % timelineTemplates.length

      setTimelineEvents((current) => [
        { ...template, eventId, time: activityTimeFormatter.format(new Date()) },
        ...current,
      ].slice(0, 6))
      setPriorityContactId(template.contactId)
      setRadarDetectionGlow(true)
      setHighlightedOpportunity(template.opportunityIndex)
      setActiveTimelineEventId(eventId)
      if (template.missionIndex !== undefined) {
        setHighlightedMission(template.missionIndex)
      }

      schedule(() => setPriorityContactId(null), 1600)
      schedule(() => setRadarDetectionGlow(false), 1000)
      schedule(() => setHighlightedOpportunity(null), 1700)
      schedule(() => setActiveTimelineEventId(null), 1900)
      if (template.missionIndex !== undefined) {
        schedule(() => setHighlightedMission(null), 1700)
      }
      schedule(runTimelineActivity, 11000 + Math.random() * 4000)
    }

    schedule(runTimelineActivity, 9000)
    return () => {
      cancelled = true
      timeoutIds.forEach((id) => window.clearTimeout(id))
    }
  }, [aiSearchLive])

  useEffect(() => {
    if (!aiSearchLive) return

    let cancelled = false
    const timeoutIds: number[] = []
    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      timeoutIds.push(id)
    }

    const advanceCounters = () => {
      if (cancelled) return
      setLiveCounters((current) => {
        const matchesIncrement = Math.random() > 0.42 ? 1 : 0
        const priorityIncrement = matchesIncrement > 0 && Math.random() > 0.76 ? 1 : 0

        return {
          vehiclesCheckedToday: current.vehiclesCheckedToday + 8 + Math.floor(Math.random() * 17),
          matchesFound: current.matchesFound + matchesIncrement,
          highPriorityMatches: current.highPriorityMatches + priorityIncrement,
        }
      })

      schedule(advanceCounters, 4500 + Math.random() * 2500)
    }

    schedule(advanceCounters, 4200)
    return () => {
      cancelled = true
      timeoutIds.forEach((id) => window.clearTimeout(id))
    }
  }, [aiSearchLive])

  useEffect(() => {
    if (!aiSearchLive) {
      setActiveAiStatusMessage('Monitoring paused — awaiting resume…')
      setAiStatusMessageVisible(true)
      return
    }

    let messageIndex = 0
    let fadeTimeoutId: number | null = null
    setActiveAiStatusMessage(aiStatusMessages[0])
    setAiStatusMessageVisible(true)

    const intervalId = window.setInterval(() => {
      setAiStatusMessageVisible(false)
      if (fadeTimeoutId !== null) {
        window.clearTimeout(fadeTimeoutId)
      }
      fadeTimeoutId = window.setTimeout(() => {
        messageIndex = (messageIndex + 1) % aiStatusMessages.length
        setActiveAiStatusMessage(aiStatusMessages[messageIndex])
        setAiStatusMessageVisible(true)
      }, 220)
    }, 12000)

    return () => {
      window.clearInterval(intervalId)
      if (fadeTimeoutId !== null) {
        window.clearTimeout(fadeTimeoutId)
      }
    }
  }, [aiSearchLive])

  useEffect(() => {
    if (!aiSearchLive) {
      setMissionMsgVisible(activeSearches.map(() => true))
      return
    }

    const fadeMs = 220
    const intervalMs = 4500
    const staggerMs = 1400
    const fadeTimeoutIds: (number | null)[] = activeSearches.map(() => null)

    const intervalIds = activeSearches.map((_, i) => {
      return window.setInterval(() => {
        setMissionMsgVisible((prev) => prev.map((v, j) => (j === i ? false : v)))
        if (fadeTimeoutIds[i] !== null) window.clearTimeout(fadeTimeoutIds[i]!)
        fadeTimeoutIds[i] = window.setTimeout(() => {
          setMissionMsgIndices((prev) => prev.map((idx, j) => (j === i ? (idx + 1) % activeSearches[i].liveMessages.length : idx)))
          setMissionMsgVisible((prev) => prev.map((v, j) => (j === i ? true : v)))
        }, fadeMs)
      }, intervalMs + i * staggerMs)
    })

    return () => {
      intervalIds.forEach((id) => window.clearInterval(id))
      fadeTimeoutIds.forEach((id) => { if (id !== null) window.clearTimeout(id) })
    }
  }, [aiSearchLive])

  useEffect(() => {
    let fadeTimeoutId: number | null = null
    const intervalId = window.setInterval(() => {
      setGreetingSummaryVisible(false)
      if (fadeTimeoutId !== null) window.clearTimeout(fadeTimeoutId)
      fadeTimeoutId = window.setTimeout(() => {
        setGreetingSummaryIndex((i) => (i + 1) % greetingSummaries.length)
        setGreetingSummaryVisible(true)
      }, 220)
    }, 13000)
    return () => {
      window.clearInterval(intervalId)
      if (fadeTimeoutId !== null) window.clearTimeout(fadeTimeoutId)
    }
  }, [])

  const toggleSearch = (index: number) => {
    setExpandedSearches((prev) => ({ ...prev, [index]: !prev[index] }))
    setOpenMoreMenu(null)
  }

  const operationsPanelItems = [
    { label: 'Status', value: aiSearchLive ? 'Searching' : 'Paused', tone: aiSearchLive ? 'live' : 'paused' },
    { label: 'Sources Active', value: '5' },
    { label: 'Vehicles Checked Today', value: counterFormatter.format(liveCounters.vehiclesCheckedToday) },
    { label: 'Matches Found', value: counterFormatter.format(liveCounters.matchesFound) },
    { label: 'High Priority Matches', value: counterFormatter.format(liveCounters.highPriorityMatches), tone: 'accent' },
    { label: 'Last Scan', value: aiSearchLive ? 'Moments ago' : 'Paused' },
  ]

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard', active: true },
        { label: 'AI Search Finder', href: '/search-builder' },
        { label: 'AI Buying Report', href: '/opportunity' },
        { label: 'Settings', isSectionLabel: true },
        { label: 'Notification Preferences', href: '/settings' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max">
            <div className="mb-5 flex items-start justify-between gap-4">
              <h1 className="text-headline-lg font-headline-lg text-primary">Dealer Command Centre</h1>
              <div className="shrink-0">
                <TicaShield />
              </div>
            </div>
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container-high/80 p-5 shadow-[0_22px_40px_rgba(2,6,23,0.28)] backdrop-blur-sm md:p-6">
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">AI Daily Briefing</p>
                  <h2 className="text-headline-md font-headline-md text-on-surface">Good Morning Jonathan,</h2>
                  <p className="text-sm text-on-surface-variant">5 vehicles need attention today. Start with your strongest profit opportunity.</p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {dailyBriefingCards.map((card) => (
                    <article
                      key={card.label}
                      className="rounded-2xl border border-outline-variant/35 bg-surface/55 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/85">{card.label}</p>
                      <p className="mt-2 text-lg font-semibold text-on-surface">{card.value}</p>
                      <p className="mt-1 text-sm text-on-surface-variant">{card.detail}</p>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs tracking-[0.08em] text-on-surface-variant">
                    Voice AI briefing coming in a future release.
                  </p>
                  <button
                    type="button"
                    disabled
                    title="Voice AI briefing coming in a future release."
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-outline-variant/35 bg-surface/40 px-4 py-2 text-sm font-medium text-on-surface-variant opacity-70"
                  >
                    🎤 Hear Today’s Briefing
                  </button>
                </div>
              </div>
            </section>

            <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap">
              <Link
                to="/opportunity"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110"
              >
                Review Top Opportunity
              </Link>
              <Link
                to="/search-builder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary"
              >
                Create New Search
              </Link>
            </div>

            {/* ── Morning Intelligence ─────────────────────────────────── */}
            <section className="mb-8 space-y-6 sm:space-y-8">
              <div>
                {/* ── Mobile-only rotating summary ────────────────────── */}
                <div className="mb-3 md:hidden">
                  <p
                    className="min-h-[1.2rem] text-xs text-on-surface-variant transition-opacity duration-200"
                    style={{ opacity: greetingSummaryVisible ? 1 : 0 }}
                  >
                    {greetingSummaries[greetingSummaryIndex]}
                  </p>
                </div>

                <h2 className="mb-3 text-headline-md font-headline-md text-on-surface sm:mb-4">Morning Intelligence Brief</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-5">
                  {summaryCards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`dashboard-border flex min-h-[44px] flex-col justify-between rounded-xl bg-surface-container-high p-3 text-left sm:min-h-[120px] sm:p-4 sm:text-center md:min-h-[152px] md:p-5${index === 4 ? ' hidden sm:flex sm:col-span-2 sm:mx-auto sm:w-[calc(50%-8px)] lg:col-span-1 lg:w-auto lg:mx-0' : ''}`}
                    >
                      <p className="text-xs leading-snug text-on-surface-variant md:text-body-md md:font-body-md">
                        <span className="block">{card.icon}</span>
                        <span>{card.title}</span>
                      </p>
                      <p className="mt-0.5 text-[1.5rem] leading-tight font-bold text-primary sm:text-[1.4rem] md:mt-0 md:text-headline-lg md:font-headline-lg">{card.value}</p>
                    </article>
                  ))}
                </div>

                {/* ── Mobile: Today's Best Buy featured card ────────────── */}
                <article className="best-buy-mobile-accent dashboard-border mt-2 rounded-xl bg-surface-container-high p-4 sm:hidden">
                  <div className="mb-2.5 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">🏆 Today's Best Buy</p>
                    <span className="rounded-full border border-primary/30 bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">⭐ AI Pick</span>
                  </div>
                  <p className="mb-2 text-body-md font-body-md font-semibold text-on-surface">{featuredOpportunity.vehicle}</p>
                  <div className="mb-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                    <div>
                      <span className="uppercase tracking-widest">Price</span>
                      <p className="font-semibold text-on-surface">{featuredOpportunity.listPriceDisplay}</p>
                    </div>
                    <div>
                      <span className="uppercase tracking-widest">Est. Profit</span>
                      <p className="font-semibold text-on-surface">{featuredOpportunity.dashboardEstimatedProfitDisplay}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${decisionModel.weightedDecisionScore}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-primary">{decisionModel.weightedDecisionScore}% confidence</span>
                    <span className="text-xs font-bold text-on-surface">🟢 BUY</span>
                  </div>
                </article>
              </div>

              {/* ── AI Search Radar ──────────────────────────────────── */}
              <article className="dashboard-border mx-auto w-full max-w-5xl rounded-3xl bg-surface-container-high/70 p-4 backdrop-blur-sm md:p-6 lg:p-8">
                <div className={`radar-glass-panel flex flex-col ${radarDetectionGlow ? 'radar-detection-glow' : ''}`}>
                <h3 className="text-center text-headline-md font-headline-md text-on-surface">Live AI Search Radar</h3>

                <div className="radar-container mt-6">
                  <div className="radar-frame" />
                  <div className="radar-scope">
                    <div className="radar-ring radar-ring-1" />
                    <div className="radar-ring radar-ring-2" />
                    <div className="radar-ring radar-ring-3" />
                    <div className="radar-crosshair radar-crosshair-horizontal" />
                    <div className="radar-crosshair radar-crosshair-vertical" />
                    <div className="radar-sweep" style={{ animationPlayState: aiSearchLive ? 'running' : 'paused' }} />
                    {radarContacts.map((contact, index) => (
                      <span
                        key={contact.id}
                        className={`radar-contact${priorityContactId === contact.id ? ' radar-contact-priority' : ''}`}
                        data-vehicle-type={contact.vehicleType}
                        style={
                          {
                            top: `${contact.y * 100}%`,
                            left: `${contact.x * 100}%`,
                            '--radar-contact-intensity': `${contactIntensity[index] ?? 0.22}`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                </div>

                <div
                  className={`ai-switch-panel mt-8${aiSearchLive ? ' ai-switch-panel-live' : ' ai-switch-panel-paused'}`}
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

                  <section className="mt-8 rounded-2xl border border-outline-variant/25 bg-surface-container-high/55 p-5 md:p-6">
                    <p className="text-center font-label-caps text-label-caps uppercase tracking-[0.18em] text-primary/85">AI Operations Panel</p>
                    <dl className="mt-4 grid overflow-hidden rounded-xl border border-outline-variant/25 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.28))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:grid-cols-2 xl:grid-cols-3">
                      {operationsPanelItems.map((item, index) => (
                        <div
                          key={item.label}
                          className={`flex min-h-[72px] flex-col justify-between gap-3 px-4 py-3 sm:min-h-[104px] sm:gap-4 sm:px-5 sm:py-4 ${
                            index < operationsPanelItems.length - 1 ? 'border-b border-outline-variant/18' : ''
                          } ${
                            index % 2 === 0 ? 'sm:border-r sm:border-outline-variant/18' : ''
                          } ${
                            index >= operationsPanelItems.length - 2 ? 'sm:border-b-0' : ''
                          } ${
                            index % 3 !== 2 ? 'xl:border-r xl:border-outline-variant/18' : 'xl:border-r-0'
                          } ${
                            index >= operationsPanelItems.length - 3 ? 'xl:border-b-0' : ''
                          }`}
                        >
                          <dt className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant/90">{item.label}</dt>
                          <dd
                            className={`flex items-center gap-2 text-[1.05rem] font-semibold tracking-[0.01em] text-on-surface ${
                              item.tone === 'accent' ? 'text-primary' : ''
                            }`}
                          >
                            {item.tone === 'live' ? <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.55)]" aria-hidden="true" /> : null}
                            {item.tone === 'paused' ? <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.45)]" aria-hidden="true" /> : null}
                            <span className="tabular-nums">{item.value}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>

                  <article className="dashboard-border timeline-mobile-shell mt-6 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-headline-md font-headline-md text-on-surface">AI Activity Timeline</h3>
                        <p className="mt-2 max-w-2xl text-body-md font-body-md text-on-surface-variant">
                          Live placeholder activity from the Dealer Command Centre AI operations flow.
                        </p>
                      </div>

                      <div className="timeline-status-panel">
                        <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">AI Status</p>
                        <p className="mt-2 text-body-md font-body-md text-on-surface">
                          <span className="mr-2 text-emerald-400">🟢</span>
                          Operational
                        </p>
                        <p className="radar-status-message mt-1 min-h-[1.35rem] text-sm text-on-surface-variant">
                          <span
                            className={`block transition-opacity duration-200 ${aiStatusMessageVisible ? 'opacity-100' : 'opacity-0'}`}
                          >
                            {activeAiStatusMessage}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="timeline-list mt-6" aria-live="polite">
                      {timelineEvents.map((event) => (
                        <article
                          key={event.eventId}
                          className={`timeline-entry${activeTimelineEventId === event.eventId ? ' timeline-entry-live' : ''}`}
                        >
                          <p className="timeline-entry-time">{event.time}</p>
                          <div className="timeline-entry-dot" aria-hidden="true" />
                          <p className="timeline-entry-message">{event.message}</p>
                        </article>
                      ))}
                    </div>
                  </article>
                </div>
              </article>
            </section>

            {/* ── AI Recommendation ────────────────────────────────────── */}
            <section className="best-buy-mobile-accent dashboard-border mb-8 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Today's Best Buy</h2>
              <p className="mb-5 max-w-[20rem] text-sm text-on-surface-variant">Certified by the TICA Decision Engine.</p>

              {/* Mobile premium badge */}
              <div className="mb-5 md:hidden">
                <span className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  ⭐ Today's AI Pick
                </span>
              </div>

              <div className="mb-7 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Vehicle</p>
                  <p className="text-body-md font-body-md text-on-surface">{featuredOpportunity.vehicle}</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Year</p>
                  <p className="text-body-md font-body-md text-on-surface">{featuredOpportunity.year}</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Price</p>
                  <p className="text-body-md font-body-md text-on-surface">{featuredOpportunity.listPriceDisplay}</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Estimated Profit</p>
                  <p className="text-body-md font-body-md text-on-surface">{featuredOpportunity.dashboardEstimatedProfitDisplay}</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-container-high">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${decisionModel.weightedDecisionScore}%` }}
                      />
                    </div>
                    <span className="text-body-md font-body-md text-on-surface">{decisionModel.weightedDecisionScore}%</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-primary">High Confidence</p>
                </div>
                <div>
                  <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Reason</p>
                  {featuredOpportunity.dashboardReasonLines.map((reason) => (
                    <p key={reason} className="text-body-md font-body-md text-on-surface-variant">{reason}</p>
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <h3 className="mb-3 text-body-md font-body-md font-medium text-on-surface">Why TICA Chose This Vehicle</h3>
                <ul className="mb-4 space-y-2 text-sm text-on-surface-variant">
                  {recommendationEvidencePoints.map((point, index) => (
                    <li key={point}>{index === recommendationEvidencePoints.length - 1 ? '🟡' : '🟢'} {point}</li>
                  ))}
                </ul>
                <div className="mb-3 border-t border-outline-variant/20 pt-3">
                  <h4 className="mb-2 text-body-sm font-body-sm font-medium text-on-surface">Things to Consider</h4>
                  <ul className="space-y-1.5 text-sm text-on-surface-variant">
                    {recommendationCautionPoints.map((point) => (
                      <li key={point}>⚠ {point}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3 border-t border-outline-variant/20 pt-3">
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Opportunity Score</p>
                  <p className="text-headline-sm font-headline-sm text-on-surface">94 / 100</p>
                </div>
                <div className="border-t border-outline-variant/20 pt-3">
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">TICA Decision</p>
                  <p className="text-body-md font-body-md font-semibold text-on-surface">🟢 BUY</p>
                </div>
              </div>

              <div className="mb-8 rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <h3 className="mb-3 text-body-md font-body-md font-medium text-on-surface sm:mb-4">Top Opportunity Comparison</h3>
                <div className="hidden overflow-x-auto md:block">
                  <table className="min-w-full text-left text-sm text-on-surface">
                    <thead className="border-b border-outline-variant/30 text-xs uppercase tracking-widest text-on-surface-variant">
                      <tr>
                        <th className="px-0 py-2 font-label-caps">Vehicle</th>
                        <th className="px-0 py-2 font-label-caps">Opportunity Score</th>
                        <th className="px-0 py-2 font-label-caps">Estimated Profit</th>
                        <th className="px-0 py-2 font-label-caps">TICA Decision</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topOpportunityComparison.map((row, index) => (
                        <tr key={`${row.vehicle}-${row.opportunityScore}-${index}`} className="border-b border-outline-variant/20 last:border-b-0">
                          <td className="py-2 pr-3">{row.vehicle}</td>
                          <td className="py-2 pr-3">{row.opportunityScore}</td>
                          <td className="py-2 pr-3">{row.estimatedProfit}</td>
                          <td className="py-2 font-semibold">{row.ticaDecision}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="space-y-3 md:hidden">
                  {topOpportunityComparison.map((row, index) => (
                    <article key={`${row.vehicle}-${row.opportunityScore}-${index}`} className="rounded-xl border border-outline-variant/25 bg-surface-container px-4 py-3.5">
                      <dl className="grid grid-cols-1 gap-2.5">
                        <div>
                          <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Vehicle Name</dt>
                          <dd className="mt-0.5 text-body-md font-body-md text-on-surface">{row.vehicle}</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Opportunity Score</dt>
                            <dd className="mt-0.5 text-body-md font-body-md text-on-surface">{row.opportunityScore}</dd>
                          </div>
                          <div>
                            <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Estimated Profit</dt>
                            <dd className="mt-0.5 text-body-md font-body-md text-on-surface">{row.estimatedProfit}</dd>
                          </div>
                          <div>
                            <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Days to Sell</dt>
                            <dd className="mt-0.5 text-body-md font-body-md text-on-surface">{row.daysToSell}</dd>
                          </div>
                          <div>
                            <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">AI Verdict</dt>
                            <dd className="mt-0.5 text-body-md font-body-md font-semibold text-on-surface">{row.ticaDecision}</dd>
                          </div>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>

                <div className="mt-4 border-t border-outline-variant/20 pt-4">
                  <h4 className="mb-2 text-sm font-semibold text-on-surface">Why the top vehicle ranks first</h4>
                  <ul className="space-y-1.5 text-sm text-on-surface-variant">
                    {topOpportunityReasons.map((reason) => (
                      <li key={reason}>• {reason}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Opportunity History ───────────────────────────────── */}
              <div className="mb-6 rounded-xl border border-outline-variant/30 bg-surface-container-high">
                <button
                  type="button"
                  onClick={() => setOpportunityHistoryOpen((v) => !v)}
                  className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-body-md font-body-md font-medium text-on-surface">Opportunity History</span>
                  <span className="text-xs text-on-surface-variant" aria-hidden="true">
                    {opportunityHistoryOpen ? '▲' : '▼'}
                  </span>
                </button>

                {opportunityHistoryOpen && (
                  <div className="border-t border-outline-variant/20 px-4 pb-4 pt-3">
                    {/* AI Confidence Trend */}
                    <div className="mb-4 flex items-center gap-3 rounded-lg border border-primary/20 bg-surface-container px-3 py-2.5">
                      <span className="text-xs uppercase tracking-widest text-on-surface-variant">AI Confidence Trend</span>
                      <span className="ml-auto text-sm font-semibold text-on-surface">
                        <span className="text-on-surface-variant">87%</span>
                        {' → '}
                        <span className="text-primary">94%</span>
                      </span>
                    </div>

                    {/* Timeline */}
                    <ol className="relative space-y-4 border-l border-outline-variant/30 pl-5">
                      {/* Yesterday */}
                      <li className="relative">
                        <span className="absolute -left-[11px] top-1 block h-2.5 w-2.5 rounded-full border border-outline-variant/40 bg-surface-container-high" />
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Yesterday</p>
                        <p className="text-xs text-on-surface-variant">
                          Opportunity Score: <span className="font-semibold text-on-surface">89</span>
                        </p>
                      </li>

                      {/* Today */}
                      <li className="relative">
                        <span className="absolute -left-[11px] top-1 block h-2.5 w-2.5 rounded-full border border-primary/50 bg-primary/20" />
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Today</p>
                        <p className="mb-1.5 text-xs text-on-surface-variant">
                          Opportunity Score: <span className="font-semibold text-on-surface">94</span>
                        </p>
                        <p className="mb-1 text-xs font-medium text-on-surface">Changes detected:</p>
                        <ul className="space-y-0.5 text-xs text-on-surface-variant">
                          <li>✓ Asking price reduced by £1,200</li>
                          <li>✓ Dealer demand increased</li>
                          <li>✓ Confidence improved</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                )}
              </div>

              {/* ── What's Changed Since Last Scan ────────────────────── */}
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-outline-variant/20 bg-surface-container-high px-4 py-3">
                <span className="mt-0.5 text-sm leading-none">📉</span>
                <div className="min-w-0">
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">What's Changed Since Last Scan</p>
                  <p className="text-xs text-on-surface-variant">Asking price reduced by £750.</p>
                </div>
              </div>

              {/* Buttons: 1-column on mobile, 2-col on sm, 4-column on md+ */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                <Link
                  to="/opportunity"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90 active:opacity-75"
                >
                  Review Opportunity
                </Link>
                <button
                  onClick={() => setRecAction('saved')}
                  className="min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40"
                >
                  Save Opportunity
                </button>
                <button
                  onClick={() => setRecAction('dismissed')}
                  className="min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-error/40 hover:text-error"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setRecAction('reminded')}
                  className="min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-tertiary/40"
                >
                  Remind Me Tomorrow
                </button>
              </div>

              {/* Placeholder feedback */}
              {recAction === 'saved' && (
                <p className="mt-4 text-body-sm font-body-sm text-primary">✓ Saved to Watchlist (placeholder)</p>
              )}
              {recAction === 'dismissed' && (
                <p className="mt-4 text-body-sm font-body-sm text-on-surface-variant">✓ Opportunity dismissed (placeholder)</p>
              )}
              {recAction === 'reminded' && (
                <p className="mt-4 text-body-sm font-body-sm text-tertiary">✓ Reminder scheduled (placeholder)</p>
              )}
            </section>

            {/* ── Recent Opportunities ─────────────────────────────────── */}
            <section className="dashboard-border mb-8 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
              <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>

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
                        <td className="px-4 py-3 text-body-md font-body-md text-on-surface">{opportunity.estimatedProfitDisplay}</td>
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
                        <p className="text-sm font-medium text-on-surface">{opportunity.priceDisplay}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-1 text-xs uppercase tracking-widest text-on-surface-variant">Profit</p>
                        <p className="text-sm font-medium text-primary">{opportunity.estimatedProfitDisplay}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-1 text-xs uppercase tracking-widest text-on-surface-variant">Conf.</p>
                        <p className="text-sm font-medium text-on-surface">{opportunity.confidenceDisplay}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to="/opportunity"
                        className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75"
                      >
                        Review
                      </Link>
                      <button className="min-h-11 flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40">
                        Save
                      </button>
                      <button className="min-h-11 flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60">
                        Dismiss
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ── AI Search Missions ───────────────────────────────────── */}
            {openMoreMenu !== null && (
              <div className="fixed inset-0 z-10 md:hidden" onClick={() => setOpenMoreMenu(null)} aria-hidden="true" />
            )}
            <section className="dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">AI Search Missions</h2>
              <p className="mb-4 text-sm text-on-surface-variant">Search jobs currently being monitored by TICA.</p>
              <div className="space-y-3">
                {activeSearches.map((search, index) => {
                  const statusCfg = missionStatusConfig[search.status]
                  return (
                    <article
                      key={search.name}
                      className={`rounded-xl bg-surface-container-high p-4 transition-all ${highlightedMission === index ? 'mission-card-highlight' : ''}`}
                    >
                     {/* Collapsible card with action buttons */}
                     <div>
                        <button
                          onClick={() => toggleSearch(index)}
                          className="flex w-full items-center justify-between gap-3"
                          aria-expanded={expandedSearches[index]}
                        >
                          <div className="min-w-0 text-left">
                            <div className="flex items-center gap-2">
                              <span
                                className="mission-status-dot flex-shrink-0"
                                style={{ background: statusCfg.color, boxShadow: `0 0 6px ${statusCfg.glow}` }}
                              />
                              <p className="text-body-md font-body-md font-medium text-on-surface">{search.name}</p>
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 pl-4">
                              <p className="text-sm text-on-surface-variant">Last Scan: {search.lastScan}</p>
                              <p className="text-sm font-semibold text-primary">{search.opportunities} Opp.</p>
                            </div>
                          </div>
                          <span className="flex-shrink-0 text-on-surface-variant">
                            <ChevronIcon open={expandedSearches[index]} />
                          </span>
                        </button>

                        {expandedSearches[index] && (
                          <div className="mt-3 space-y-3">
                            {/* Detail list */}
                            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Vehicle Type</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.vehicleType}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Search Area</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.searchArea}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Budget</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.budget}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Status</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{statusCfg.emoji} {statusCfg.label}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Next Scan</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.nextScan}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Vehicles Analysed Today</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{counterFormatter.format(search.vehiclesAnalysedToday)}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Rejected Listings</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.rejectedListings}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Qualified Opportunities</dt>
                                <dd className="mt-0.5 text-sm font-semibold text-primary">{search.qualifiedOpportunities}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Today's Best Opp. Score</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.bestOpportunityScore}</dd>
                              </div>
                            </dl>
                            {/* Sources Being Scanned */}
                            <div>
                              <p className="mb-1.5 text-xs uppercase tracking-widest text-on-surface-variant">Sources Being Scanned</p>
                              <div className="flex flex-wrap gap-1.5">
                                {search.sources.map((src) => (
                                  <span key={src} className="rounded-md border border-outline-variant/30 bg-surface-container px-2 py-0.5 text-xs text-on-surface-variant">
                                    {src}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {/* Progress bar */}
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-xs uppercase tracking-widest text-on-surface-variant">Search Progress</span>
                                <span className="text-xs font-medium text-on-surface">{search.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${search.progress}%`, background: statusCfg.color, boxShadow: `0 0 4px ${statusCfg.glow}` }}
                                />
                              </div>
                            </div>
                            {/* Mission Update */}
                            <p className="text-xs text-on-surface-variant/60">
                              Mission Update — {search.missionUpdate}
                            </p>
                            {/* Live mission message */}
                            <p
                              className="text-xs font-medium text-primary/75"
                              style={{ opacity: missionMsgVisible[index] ? 1 : 0, transition: 'opacity 0.22s ease' }}
                            >
                              ⚡ {search.liveMessages[missionMsgIndices[index]]}
                            </p>
                            {/* Action buttons */}
                            <div className="flex gap-2">
                              <button className="min-h-11 flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75">
                                Run Now
                              </button>
                              <div className="relative">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setOpenMoreMenu(openMoreMenu === index ? null : index) }}
                                  className="min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container px-5 py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40"
                                  aria-haspopup="true"
                                  aria-expanded={openMoreMenu === index}
                                >
                                  More
                                </button>
                                {openMoreMenu === index && (
                                  <div className="absolute right-0 bottom-full z-20 mb-2 w-36 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-high shadow-lg">
                                    <button className="w-full px-4 py-3 text-left text-sm text-on-surface transition-colors hover:bg-surface-container-highest active:bg-surface-container-highest">Edit</button>
                                    <button className="w-full px-4 py-3 text-left text-sm text-on-surface-variant transition-colors hover:bg-surface-container-highest active:bg-surface-container-highest">Pause</button>
                                    <button className="w-full px-4 py-3 text-left text-sm text-red-400 transition-colors hover:bg-surface-container-highest active:bg-surface-container-highest">Delete</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
      </div>
    </PlatformShell>
  )
}
