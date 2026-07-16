import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'
import { opportunityIntelligencePlaceholder } from '../data/opportunity-intelligence'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

type RadarContactType = 'car' | 'pickup' | 'van' | 'motorcycle' | 'suv'

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

const radarRingInsets = [6, 14, 22, 30, 38, 46]
const radarGridAngles = Array.from({ length: 24 }, (_, index) => index * 15)
const degreeMarks = Array.from({ length: 12 }, (_, index) => index * 30)

const radarContacts: Array<{
  id: string
  x: number
  y: number
  vehicleType: RadarContactType
  opportunityIndex: number
  angleDeg: number
  label: string
  heading: string
  source: string
  labelPosition?: 'left'
}> = [
  { id: 'contact-1', x: 0.41, y: 0.32, vehicleType: 'car', opportunityIndex: 0, angleDeg: 35.8, label: 'Audi RS5', heading: '036°', source: 'Auto Trader', labelPosition: 'left' },
  { id: 'contact-2', x: 0.29, y: 0.61, vehicleType: 'pickup', opportunityIndex: 1, angleDeg: 239.7, label: 'Range Rover', heading: '240°', source: 'Motorway' },
  { id: 'contact-3', x: 0.7, y: 0.47, vehicleType: 'van', opportunityIndex: 2, angleDeg: 85.2, label: 'Mercedes A45', heading: '085°', source: 'Dealer trade', labelPosition: 'left' },
  { id: 'contact-4', x: 0.57, y: 0.7, vehicleType: 'motorcycle', opportunityIndex: 3, angleDeg: 161.6, label: 'Golf R', heading: '162°', source: 'Retail listing' },
  { id: 'contact-5', x: 0.18, y: 0.33, vehicleType: 'suv', opportunityIndex: 4, angleDeg: 208.1, label: 'Porsche Macan', heading: '208°', source: 'Fleet source' },
]

const radarOpportunities = [
  { vehicle: 'BMW M3 Competition 2020', margin: '£3,200', confidence: '97%', timerStart: 12 },
  { vehicle: 'Audi RS5 Sportback 2021', margin: '£2,850', confidence: '91%', timerStart: 8 },
  { vehicle: 'Mercedes A45 AMG 2022', margin: '£1,950', confidence: '85%', timerStart: 6 },
  { vehicle: 'Porsche Macan S 2021', margin: '£4,100', confidence: '93%', timerStart: 15 },
  { vehicle: 'Volkswagen Golf R 2023', margin: '£1,420', confidence: '78%', timerStart: 11 },
] as const

function getSweepIntensity(sweepAngle: number, angleDeg: number) {
  const circularDifference = Math.abs(((sweepAngle - angleDeg + 540) % 360) - 180)
  const trailingDifference = (sweepAngle - angleDeg + 360) % 360
  const primaryGlow = Math.max(0, 1 - circularDifference / 24)
  const trailingGlow = trailingDifference <= 72 ? 1 - trailingDifference / 72 : 0
  return Math.min(1, 0.24 + primaryGlow * 0.64 + trailingGlow * 0.36)
}

function UnitedKingdomFlag() {
  return (
    <svg aria-hidden="true" className="uk-flag-icon" viewBox="0 0 36 24">
      <rect width="36" height="24" rx="3" fill="#0A2B6B" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#E2434B" strokeWidth="2.4" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="7" />
      <path d="M18 0v24M0 12h36" stroke="#E2434B" strokeWidth="3.8" />
    </svg>
  )
}

function VehicleGlyph({ type }: { type: RadarContactType }) {
  if (type === 'van') {
    return (
      <svg aria-hidden="true" className="radar-vehicle-icon" viewBox="0 0 32 32">
        <path d="M5 18.5h3.1l2.7-6.1c.5-1.1 1.5-1.9 2.7-1.9H21c1.2 0 2.2.6 2.8 1.5l2.9 4.5H29a1 1 0 0 1 1 1v4h-2.2a2.8 2.8 0 0 1-5.5 0h-9.8a2.8 2.8 0 0 1-5.5 0H5v-3Z" />
        <path d="M14.5 13h5.4c.8 0 1.5.4 1.9 1l1.7 2.8H12.4l1-2.2c.2-.4.6-.6 1.1-.6Z" />
        <circle cx="9.5" cy="21.5" r="1.8" />
        <circle cx="24.8" cy="21.5" r="1.8" />
      </svg>
    )
  }
  if (type === 'pickup') {
    return (
      <svg aria-hidden="true" className="radar-vehicle-icon" viewBox="0 0 32 32">
        <path d="M4.5 18.4h3.4l2.1-4.3c.6-1.1 1.6-1.8 2.8-1.8h5.4c1.1 0 2.1.5 2.8 1.4l1.6 2.2h2.6c.9 0 1.6.7 1.6 1.6v4h-2.2a2.8 2.8 0 0 1-5.5 0H12a2.8 2.8 0 0 1-5.5 0H4.5v-3.1Z" />
        <path d="M13 14.8h6.3l1.4 1.9H12l.4-.8c.2-.7.9-1.1 1.6-1.1Z" />
        <circle cx="9.2" cy="21.6" r="1.8" />
        <circle cx="23.7" cy="21.6" r="1.8" />
      </svg>
    )
  }
  if (type === 'motorcycle') {
    return (
      <svg aria-hidden="true" className="radar-vehicle-icon" viewBox="0 0 32 32">
        <circle cx="9.3" cy="22" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="23" cy="22" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m11.5 22 5.2-7.8h4.1l2.4 3.8H18l-2.5 4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="m15.2 14.2 2.3 3.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }
  if (type === 'suv') {
    return (
      <svg aria-hidden="true" className="radar-vehicle-icon" viewBox="0 0 32 32">
        <path d="M4 18h2.8l2-4.8c.5-1.2 1.7-2 3-2h8.9c1.2 0 2.3.6 2.9 1.6l2.2 3.8.2.6H29a1 1 0 0 1 1 1v3.8h-2.1a3 3 0 0 1-5.8 0H10.2a3 3 0 0 1-5.8 0H3v-4Z" />
        <path d="M12.5 12.8h7.1c.8 0 1.5.4 1.9 1.1l1.4 2.4H10.4l1-2.3c.3-.7.6-1.2 1.1-1.2Z" />
        <circle cx="7.8" cy="21.7" r="1.9" />
        <circle cx="24.6" cy="21.7" r="1.9" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" className="radar-vehicle-icon" viewBox="0 0 32 32">
      <path d="M5 18.5h2.6l2.4-4.7c.7-1.4 2.2-2.3 3.8-2.3h5.8c1.5 0 2.9.7 3.8 1.9l2 3H27c1.1 0 2 .9 2 2v3.1h-2.2a3 3 0 0 1-5.8 0h-10a3 3 0 0 1-5.8 0H5v-3Z" />
      <path d="M13.6 14h5.9c.7 0 1.4.3 1.8.9l1.2 1.6H11.8l.9-1.8c.2-.4.6-.7.9-.7Z" />
      <circle cx="8.8" cy="21.5" r="1.9" />
      <circle cx="23.6" cy="21.5" r="1.9" />
    </svg>
  )
}

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
  'TICA analysed 18,462 vehicles overnight.',
  '5 vehicles require your attention today.',
  'One monitored vehicle has reduced in price.',
  'Your top search mission found 3 new matches.',
  'Market prices shifted on 14 vehicles overnight.',
]

const topOpportunityComparison = [
  { vehicle: 'BMW M3 Competition', opportunityScore: 94, estimatedProfit: '£4,255', daysToSell: '22 days', ticaDecision: 'BUY' },
  { vehicle: 'Audi RS5 Sportback', opportunityScore: 89, estimatedProfit: '£3,620', daysToSell: '27 days', ticaDecision: 'REVIEW' },
  { vehicle: 'Mercedes-AMG C63', opportunityScore: 74, estimatedProfit: '£1,980', daysToSell: '41 days', ticaDecision: 'PASS' },
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
  const [sweepAngle, setSweepAngle] = useState(0)
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false)
  const [soundOn, setSoundOn] = useState(() => {
    try { return localStorage.getItem('tica-sound-on') === '1' } catch { return false }
  })
  const audioCtxRef = useRef<AudioContext | null>(null)
  const soundOnRef = useRef(soundOn)
  const pingSkipFirstRef = useRef(true)
  const [timelineEvents, setTimelineEvents] = useState(initialTimelineEvents)
  const [activeTimelineEventId, setActiveTimelineEventId] = useState<string | null>(null)
  const [liveCounters, setLiveCounters] = useState({
    vehiclesCheckedToday: 18462,
    matchesFound: 24,
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
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [radarOpportunityVisible, setRadarOpportunityVisible] = useState(false)
  const [radarOpportunityKey, setRadarOpportunityKey] = useState(0)
  const [radarOpportunityIndex, setRadarOpportunityIndex] = useState(0)
  const [radarOpportunityTimer, setRadarOpportunityTimer] = useState(0)

  const timelineCursorRef = useRef(initialTimelineEvents.length % timelineTemplates.length)
  const radarOpportunityCursorRef = useRef(0)

  useEffect(() => {
    soundOnRef.current = soundOn
  }, [soundOn])

  useEffect(() => {
    const sweepDurationMs = 5400
    const startedAt = performance.now()
    const intervalId = window.setInterval(() => {
      setSweepAngle(((performance.now() - startedAt) / sweepDurationMs * 360) % 360)
    }, 80)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
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

      const oppIdx = radarOpportunityCursorRef.current
      radarOpportunityCursorRef.current = (radarOpportunityCursorRef.current + 1) % radarOpportunities.length
      setRadarOpportunityIndex(oppIdx)
      setRadarOpportunityTimer(radarOpportunities[oppIdx].timerStart)
      setRadarOpportunityKey((k) => k + 1)
      setRadarOpportunityVisible(true)

      schedule(() => setPriorityContactId(null), 1600)
      schedule(() => setRadarDetectionGlow(false), 1000)
      schedule(() => setHighlightedOpportunity(null), 1700)
      schedule(() => setActiveTimelineEventId(null), 1900)
      if (template.missionIndex !== undefined) {
        schedule(() => setHighlightedMission(null), 1700)
      }
      schedule(() => setRadarOpportunityVisible(false), 7100)
      schedule(runTimelineActivity, 11000 + Math.random() * 4000)
    }

    schedule(runTimelineActivity, 9000)
    return () => {
      cancelled = true
      timeoutIds.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
  }, [])

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

  useEffect(() => {
    if (!radarOpportunityVisible) return
    const intervalId = window.setInterval(() => {
      setRadarOpportunityTimer((t) => t + 1)
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [radarOpportunityVisible])

  useEffect(() => {
    if (pingSkipFirstRef.current) {
      pingSkipFirstRef.current = false
      return
    }
    if (!soundOnRef.current) return
    const ctx = audioCtxRef.current
    if (!ctx || ctx.state !== 'running') return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1047, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.18)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.35)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radarOpportunityKey])

  const toggleSound = () => {
    const newSoundOn = !soundOn
    if (newSoundOn) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
    }
    setSoundOn(newSoundOn)
    try { localStorage.setItem('tica-sound-on', newSoundOn ? '1' : '0') } catch { /* ignore */ }
  }

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleSearch = (index: number) => {
    setExpandedSearches((prev) => ({ ...prev, [index]: !prev[index] }))
    setOpenMoreMenu(null)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const operationsPanelItems = [
    { label: 'Status', value: 'Searching', tone: 'live' },
    { label: 'Sources Active', value: '5' },
    { label: 'Vehicles Checked Today', value: counterFormatter.format(liveCounters.vehiclesCheckedToday) },
    { label: 'Matches Found', value: counterFormatter.format(liveCounters.matchesFound) },
    { label: 'High Priority Matches', value: counterFormatter.format(liveCounters.highPriorityMatches), tone: 'accent' },
    { label: 'Last Scan', value: 'Moments ago' },
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
            <div className="dashboard-hero-header flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h1 className="dashboard-hero-h1 text-headline-lg font-headline-lg text-primary">Dealer Command Centre</h1>
              <div className="shrink-0 self-start sm:self-auto">
                <TicaShield />
              </div>
            </div>
            <section className="dashboard-border mb-4 sm:mb-6 rounded-2xl bg-surface-container-high/80 p-5 shadow-[0_22px_40px_rgba(2,6,23,0.28)] backdrop-blur-sm md:p-6">
              <div className="flex flex-col gap-5">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">AI Daily Briefing</p>
                  <h2 className="text-headline-md font-headline-md text-on-surface">Good Morning Jonathan,</h2>
                  <p className="text-sm text-on-surface-variant">5 vehicles need attention today. Start with your strongest profit opportunity.</p>
                </div>

                <div className="grid gap-2.5 md:grid-cols-3">
                  {dailyBriefingCards.map((card) => (
                    <article
                      key={card.label}
                      className="rounded-2xl border border-outline-variant/35 bg-surface/55 p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/85">{card.label}</p>
                      <p className="mt-1.5 text-xl font-bold text-on-surface">{card.value}</p>
                      <p className="mt-0.5 text-sm text-on-surface-variant">{card.detail}</p>
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

            {/* ── Morning Intelligence ─────────────────────────────────── */}
            <section className="dashboard-mobile-radar-flow mb-5 sm:mb-8 flex flex-col gap-6 sm:gap-8">
              {/* CTA buttons — on mobile these render between radar (order 1) and intel brief (order 3) */}
              <div className="dashboard-cta-buttons flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

              <div className="dashboard-intelligence-brief">
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
                <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-5">
                  {summaryCards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`dashboard-border flex min-h-[44px] flex-col justify-between rounded-xl bg-surface-container-high p-3 text-left sm:min-h-[120px] sm:p-4 sm:text-center md:min-h-[152px] md:p-5${index === 4 ? ' hidden sm:flex sm:col-span-2 sm:mx-auto sm:w-[calc(50%-8px)] lg:col-span-1 lg:w-auto lg:mx-0' : ''}`}
                    >
                      <p className="text-xs leading-snug text-on-surface-variant md:text-body-md md:font-body-md">
                        <span className="block">{card.icon}</span>
                        <span>{card.title}</span>
                      </p>
                      <p className="mt-0.5 text-[1.65rem] leading-tight font-bold text-primary sm:text-[1.4rem] md:mt-0 md:text-headline-lg md:font-headline-lg">{card.value}</p>
                    </article>
                  ))}
                </div>

                {/* ── Mobile: Today's Best Buy featured card ────────────── */}
                <article className="best-buy-mobile-accent dashboard-border mt-1.5 rounded-xl bg-surface-container-high p-3.5 sm:hidden">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">🏆 Today's Best Buy</p>
                    <span className="rounded-full border border-primary/30 bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">⭐ AI Pick</span>
                  </div>
                  <p className="mb-2 text-body-md font-body-md font-semibold text-on-surface">{featuredOpportunity.vehicle}</p>
                  <div className="mb-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                    <div>
                      <span className="uppercase tracking-widest">Price</span>
                      <p className="text-sm font-bold text-on-surface">{featuredOpportunity.listPriceDisplay}</p>
                    </div>
                    <div>
                      <span className="uppercase tracking-widest">Est. Profit</span>
                      <p className="text-sm font-bold text-primary">{featuredOpportunity.dashboardEstimatedProfitDisplay}</p>
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
              <article className="dashboard-radar-section dashboard-border mx-auto w-full max-w-5xl rounded-3xl bg-surface-container-high/70 p-4 backdrop-blur-sm md:p-6 lg:p-8">
                <div className={`dashboard-radar-panel flex flex-col ${radarDetectionGlow ? 'radar-detection-glow' : ''}`}>
                <h3 className="dashboard-radar-title text-center text-headline-md font-headline-md text-on-surface">Live AI Search Radar</h3>

                <div className="dashboard-radar-container radar-container mt-6 glass-card rounded-full p-2 glow-border premium-radar-shell">
                  <div className="dashboard-radar-fit">
                    <div className="radar-frame" />

                    {degreeMarks.map((degree) => {
                      const labelStyle: CSSProperties = {
                        transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(calc(var(--radar-bearing-radius) * -1)) rotate(${-degree}deg)`,
                      }
                      const tickStyle: CSSProperties = {
                        transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(calc(var(--radar-tick-radius) * -1))`,
                      }
                      return (
                        <div key={degree}>
                          <span className="radar-bearing-label" style={labelStyle}>{degree}°</span>
                          <span className="radar-bearing-tick" style={tickStyle} />
                        </div>
                      )
                    })}

                    <div className="radar-scope premium-radar-scope">
                    <div className="radar-map-overlay" aria-hidden="true">
                      <svg viewBox="0 0 320 320">
                        <path className="radar-map-path" d="M50 114c16-17 36-28 60-29 13-1 24 3 36 1 18-3 28-18 43-22 19-5 45 6 60 24-7 9-12 17-13 27-1 11 9 18 18 24 9 7 15 16 17 29-22 6-48 2-66 14-17 11-24 33-43 40-17 6-35-4-52-10-21-8-46-10-58-29-10-14-8-33-1-49 7-18 20-32 33-44 6-5 12-10 16-16-19 1-37 16-50 40-9-9-9-20 0-30Z" />
                        <path className="radar-map-path" d="M214 90c8-10 20-16 33-16 10 0 18 4 24 11-5 10-16 17-26 23-10 5-22 7-31 2 1-8-2-14 0-20Z" />
                        <path className="radar-map-path" d="M116 193c14-5 29-5 40 1 9 4 17 12 19 22-13 3-25 10-31 21-16 0-30-11-37-24-5-8-4-15 9-20Z" />
                        <g className="radar-road-network">
                          <line x1="157" y1="222" x2="140" y2="182" strokeWidth="0.9" />
                          <line x1="140" y1="182" x2="138" y2="152" strokeWidth="0.9" />
                          <line x1="138" y1="152" x2="130" y2="94" strokeWidth="0.8" />
                          <line x1="157" y1="222" x2="112" y2="210" strokeWidth="0.8" />
                          <line x1="157" y1="222" x2="153" y2="155" strokeWidth="0.8" />
                          <line x1="140" y1="182" x2="153" y2="155" strokeWidth="0.7" />
                          <line x1="138" y1="152" x2="153" y2="155" strokeWidth="0.7" />
                        </g>
                        <g className="radar-data-points">
                          <circle cx="157" cy="222" r="3" />
                          <circle cx="140" cy="182" r="2.2" />
                          <circle cx="138" cy="152" r="2.2" />
                          <circle cx="130" cy="94" r="2" />
                          <circle cx="112" cy="210" r="2" />
                          <circle cx="153" cy="155" r="2" />
                        </g>
                      </svg>
                    </div>

                    {radarGridAngles.map((angle) => (
                      <span
                        key={angle}
                        aria-hidden="true"
                        className="radar-grid-line"
                        style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                      />
                    ))}

                    {radarRingInsets.map((inset, index) => (
                      <span
                        key={inset}
                        aria-hidden="true"
                        className={`radar-ring ${index % 2 === 0 ? 'radar-ring-major' : 'radar-ring-minor'}`}
                        style={{ inset: `${inset}%` }}
                      />
                    ))}

                    <span aria-hidden="true" className="radar-crosshair radar-crosshair-horizontal" />
                    <span aria-hidden="true" className="radar-crosshair radar-crosshair-vertical" />

                    <div
                      className="radar-sweep"
                      aria-hidden="true"
                      style={{ animationPlayState: 'running' }}
                    />
                    <div
                      className="radar-sweep-glow"
                      aria-hidden="true"
                      style={{ animationPlayState: 'running' }}
                    />

                    <div className="radar-flag-marker" aria-hidden="true">
                      <span className="radar-flag-pole" />
                      <UnitedKingdomFlag />
                    </div>

                    {radarContacts.map((contact) => {
                      const intensity = getSweepIntensity(sweepAngle, contact.angleDeg)
                      const contactStyle = {
                        left: `${contact.x * 100}%`,
                        top: `${contact.y * 100}%`,
                        '--radar-contact-intensity': intensity.toFixed(3),
                      } as CSSProperties
                      return (
                        <div
                          key={contact.id}
                          className={`radar-contact${contact.labelPosition === 'left' ? ' radar-contact-label-left' : ''}${priorityContactId === contact.id ? ' radar-contact-priority' : ''}`}
                          style={contactStyle}
                        >
                          <span className="radar-contact-halo" />
                          <VehicleGlyph type={contact.vehicleType} />
                          <span className="radar-contact-caption">
                            <span className="radar-contact-title">{contact.label}</span>
                            <span className="radar-contact-meta">{contact.heading} • {contact.source}</span>
                          </span>
                        </div>
                      )
                    })}

                    <div className="radar-centre-point" aria-hidden="true" />
                    <div className="radar-status-chip" aria-hidden="true">
                      <span className="radar-status-dot" />
                      {'🇬🇧 UK MARKET • LIVE SCAN'}
                    </div>
                    </div>

                    {radarOpportunityVisible && (
                      <div
                        key={radarOpportunityKey}
                        className="radar-notification radar-notification-upper-right radar-notification-primary dashboard-radar-notification"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        <div className="radar-notification-header">
                          <span className="radar-notification-label">Opportunity Found</span>
                          <span className="radar-notification-stamp">Live • {radarOpportunityTimer}s</span>
                        </div>
                        <p className="radar-notification-vehicle">{radarOpportunities[radarOpportunityIndex].vehicle}</p>
                        <div className="radar-notification-metrics">
                          <div className="radar-notification-metric">
                            <span className="radar-notification-metric-label">Estimated Margin</span>
                            <span className="radar-notification-metric-value">{radarOpportunities[radarOpportunityIndex].margin}</span>
                          </div>
                          <div className="radar-notification-metric">
                            <span className="radar-notification-metric-label">Confidence</span>
                            <span className="radar-notification-metric-value">{radarOpportunities[radarOpportunityIndex].confidence}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`dashboard-radar-control ai-switch-panel mt-8${soundOn ? ' ai-switch-panel-sound-on' : ' ai-switch-panel-sound-off'}`}
                    role="switch"
                    aria-checked={soundOn}
                    aria-label="Opportunity notification sound"
                    tabIndex={0}
                    onClick={toggleSound}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleSound()
                      }
                    }}
                  >
                    <span className="ai-switch-screw ai-switch-screw-tl" />
                    <span className="ai-switch-screw ai-switch-screw-tr" />
                    <span className="ai-switch-screw ai-switch-screw-bl" />
                    <span className="ai-switch-screw ai-switch-screw-br" />
                    <p className="ai-switch-title">AI Search Control</p>
                    <div className="ai-switch-rockers">
                      <div className={`ai-switch-rocker ai-switch-rocker-sound-on${soundOn ? ' ai-switch-rocker-active' : ''}`}>
                        <span className={`ai-switch-led${soundOn ? ' ai-switch-led-on-sound-on' : ''}`} />
                        <svg className="ai-switch-rocker-icon" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 3.5a.5.5 0 0 0-.8-.4L4.8 6.5H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.8l3.9 3.4a.5.5 0 0 0 .8-.4V3.5Z"/>
                          <path d="M13.3 6.7a.75.75 0 0 1 1.06 0A6 6 0 0 1 16 10.5a6 6 0 0 1-1.64 4.14.75.75 0 0 1-1.06-1.06A4.5 4.5 0 0 0 14.5 10.5a4.5 4.5 0 0 0-1.2-3.06.75.75 0 0 1 0-1.06Z"/>
                          <path d="M11.3 8.7a.75.75 0 0 1 1.06 0A3.25 3.25 0 0 1 13.25 10.5a3.25 3.25 0 0 1-.89 2.22.75.75 0 0 1-1.06-1.06 1.75 1.75 0 0 0 .45-1.16 1.75 1.75 0 0 0-.45-1.19.75.75 0 0 1 0-1.06Z" fillOpacity="0.7"/>
                        </svg>
                        <span className="ai-switch-rocker-label">SOUND ON</span>
                      </div>
                      <div className={`ai-switch-rocker ai-switch-rocker-sound-off${!soundOn ? ' ai-switch-rocker-active' : ''}`}>
                        <span className={`ai-switch-led${!soundOn ? ' ai-switch-led-on-sound-off' : ''}`} />
                        <svg className="ai-switch-rocker-icon" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 3.5a.5.5 0 0 0-.8-.4L4.8 6.5H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.8l3.9 3.4a.5.5 0 0 0 .8-.4V3.5Z"/>
                          <path d="M14.03 8.47a.75.75 0 0 0-1.06 1.06L14.44 11l-1.47 1.47a.75.75 0 1 0 1.06 1.06L15.5 12.06l1.47 1.47a.75.75 0 1 0 1.06-1.06L16.56 11l1.47-1.47a.75.75 0 0 0-1.06-1.06L15.5 9.94l-1.47-1.47Z" fillOpacity="0.85"/>
                        </svg>
                        <span className="ai-switch-rocker-label">SOUND OFF</span>
                      </div>
                    </div>
                  </div>

                  <section className="dashboard-radar-operations mt-6 rounded-2xl border border-outline-variant/25 bg-surface-container-high/55 p-4 md:p-6">
                    <p className="text-center font-label-caps text-label-caps uppercase tracking-[0.18em] text-primary/85">AI Operations Panel</p>
                    <dl className="dashboard-radar-operations-grid mt-3 grid overflow-hidden rounded-xl border border-outline-variant/25 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.28))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:grid-cols-2 xl:grid-cols-3">
                      {operationsPanelItems.map((item, index) => (
                        <div
                          key={item.label}
                          className={`flex min-h-[64px] flex-col justify-between gap-2.5 px-4 py-2.5 sm:min-h-[104px] sm:gap-4 sm:px-5 sm:py-4 ${
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
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/80">{item.label}</dt>
                          <dd
                            className={`flex items-center gap-2 text-[1.1rem] font-bold tracking-[0.01em] text-on-surface ${
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
                    <p className="dashboard-radar-operations-note mt-2.5 text-center text-xs text-on-surface-variant/55">
                      Demonstration data — live source connections coming soon.
                    </p>
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
            <section className="best-buy-mobile-accent dashboard-border mb-5 sm:mb-8 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Today's Best Buy</h2>
              <p className="mb-3 max-w-[20rem] text-sm text-on-surface-variant">Certified by the TICA Decision Engine.</p>

              {/* Mobile premium badge */}
              <div className="mb-3 md:hidden">
                <span className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  ⭐ Today's AI Pick
                </span>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-3 md:mb-8 md:grid-cols-2">
                <div>
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Vehicle</p>
                  <p className="text-body-md font-body-md text-on-surface">{featuredOpportunity.vehicle}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Year</p>
                  <p className="text-body-md font-body-md text-on-surface">{featuredOpportunity.year}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Price</p>
                  <p className="text-body-md font-body-md font-semibold text-on-surface">{featuredOpportunity.listPriceDisplay}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Estimated Profit</p>
                  <p className="text-[1.1rem] font-bold text-primary">{featuredOpportunity.dashboardEstimatedProfitDisplay}</p>
                </div>
                <div>
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">AI Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-container-high">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${decisionModel.weightedDecisionScore}%` }}
                      />
                    </div>
                    <span className="text-body-md font-body-md font-semibold text-on-surface">{decisionModel.weightedDecisionScore}%</span>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-primary">High Confidence</p>
                </div>
                <div>
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Reason</p>
                  {featuredOpportunity.dashboardReasonLines.map((reason) => (
                    <p key={reason} className="text-body-md font-body-md text-on-surface-variant">{reason}</p>
                  ))}
                </div>
              </div>

              <div className="mb-5 sm:mb-8 rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <h3 className="mb-2.5 text-body-md font-body-md font-medium text-on-surface">Why TICA Chose This Vehicle</h3>
                <ul className="mb-3 space-y-1.5 text-sm text-on-surface-variant">
                  {recommendationEvidencePoints.map((point, index) => (
                    <li key={point}>{index === recommendationEvidencePoints.length - 1 ? '🟡' : '🟢'} {point}</li>
                  ))}
                </ul>
                <div className="mb-2.5 border-t border-outline-variant/20 pt-2.5">
                  <h4 className="mb-1.5 text-body-sm font-body-sm font-medium text-on-surface">Things to Consider</h4>
                  <ul className="space-y-1.5 text-sm text-on-surface-variant">
                    {recommendationCautionPoints.map((point) => (
                      <li key={point}>⚠ {point}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2.5 border-t border-outline-variant/20 pt-2.5">
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Opportunity Score</p>
                  <p className="text-[1.4rem] font-bold text-primary">94 <span className="text-sm font-normal text-on-surface-variant">/ 100</span></p>
                </div>
                <div className="border-t border-outline-variant/20 pt-2.5">
                  <p className="mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">TICA Decision</p>
                  <p className="text-body-md font-body-md font-bold text-on-surface">🟢 BUY</p>
                </div>
              </div>

              <div className="mb-5 sm:mb-8 rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <h3 className="mb-2.5 text-body-md font-body-md font-medium text-on-surface sm:mb-4">Top Opportunity Comparison</h3>
                <div className="hidden overflow-x-auto lg:block">
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
                <div className="space-y-2 lg:hidden">
                  {topOpportunityComparison.map((row, index) => (
                    <article key={`${row.vehicle}-${row.opportunityScore}-${index}`} className="rounded-xl border border-outline-variant/25 bg-surface-container px-3.5 py-3">
                      <dl className="grid grid-cols-1 gap-2">
                        <div>
                          <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Vehicle Name</dt>
                          <dd className="mt-0.5 break-words text-body-md font-body-md text-on-surface">{row.vehicle}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                          <div>
                            <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Opportunity Score</dt>
                            <dd className="mt-0.5 text-sm font-bold text-primary">{row.opportunityScore}</dd>
                          </div>
                          <div>
                            <dt className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Estimated Profit</dt>
                            <dd className="mt-0.5 text-sm font-bold text-primary">{row.estimatedProfit}</dd>
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

                <div className="mt-3 border-t border-outline-variant/20 pt-3">
                  <h4 className="mb-1.5 text-sm font-semibold text-on-surface">Why the top vehicle ranks first</h4>
                  <ul className="space-y-1.5 text-sm text-on-surface-variant">
                    {topOpportunityReasons.map((reason) => (
                      <li key={reason}>• {reason}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Opportunity History ───────────────────────────────── */}
              <div className="mb-4 sm:mb-6 rounded-xl border border-outline-variant/30 bg-surface-container-high">
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
            <section className="dashboard-border mb-5 sm:mb-8 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8">
              <h2 className="mb-2.5 text-headline-md font-headline-md text-on-surface">Recent Opportunities</h2>

              {/* Desktop table (unchanged, hidden on mobile) */}
              <div className="hidden overflow-x-auto lg:block">
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
              <div className="space-y-2.5 lg:hidden">
                {recentOpportunities.map((opportunity, index) => (
                  <article
                    key={opportunity.vehicle}
                    className={`rounded-xl bg-surface-container-high p-3.5 transition-all ${
                      highlightedOpportunity === index ? 'opportunity-row-highlight' : ''
                    }`}
                  >
                    <div className="mb-2.5">
                      <p className="break-words text-body-md font-body-md font-medium text-on-surface">{opportunity.vehicle}</p>
                      <p className="break-words text-sm text-on-surface-variant">{opportunity.source}</p>
                    </div>
                    <div className="mb-3 grid grid-cols-1 gap-1.5 rounded-lg bg-surface-container p-2.5 min-[420px]:grid-cols-3">
                      <div className="text-center">
                        <p className="mb-0.5 text-xs uppercase tracking-widest text-on-surface-variant">Price</p>
                        <p className="text-sm font-semibold text-on-surface">{opportunity.priceDisplay}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-0.5 text-xs uppercase tracking-widest text-on-surface-variant">Profit</p>
                        <p className="text-sm font-bold text-primary">{opportunity.estimatedProfitDisplay}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-0.5 text-xs uppercase tracking-widest text-on-surface-variant">Conf.</p>
                        <p className="text-sm font-semibold text-on-surface">{opportunity.confidenceDisplay}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-[420px]:grid min-[420px]:grid-cols-3">
                      <Link
                        to="/opportunity"
                        className="flex min-h-11 items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75"
                      >
                        Review
                      </Link>
                      <button className="min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40">
                        Save
                      </button>
                      <button className="min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60">
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
              <p className="mb-3 text-sm text-on-surface-variant">Search jobs currently being monitored by TICA.</p>
              <div className="space-y-2.5">
                {activeSearches.map((search, index) => {
                  const statusCfg = missionStatusConfig[search.status]
                  return (
                    <article
                      key={search.name}
                      className={`rounded-xl bg-surface-container-high p-3.5 transition-all ${highlightedMission === index ? 'mission-card-highlight' : ''}`}
                    >
                     {/* Collapsible card with action buttons */}
                     <div>
                        <button
                          onClick={() => toggleSearch(index)}
                          className="flex w-full items-center justify-between gap-3"
                          aria-expanded={expandedSearches[index]}
                        >
                          <div className="min-w-0 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className="mission-status-dot flex-shrink-0"
                                style={{ background: statusCfg.color, boxShadow: `0 0 6px ${statusCfg.glow}` }}
                              />
                              <p className="break-words text-body-md font-body-md font-medium text-on-surface">{search.name}</p>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 pl-4">
                              <p className="text-sm text-on-surface-variant">Last Scan: {search.lastScan}</p>
                              <p className="text-sm font-bold text-primary">{search.opportunities} Opp.</p>
                            </div>
                          </div>
                          <span className="flex-shrink-0 text-on-surface-variant">
                            <ChevronIcon open={expandedSearches[index]} />
                          </span>
                        </button>

                        {expandedSearches[index] && (
                          <div className="mt-2.5 space-y-2.5">
                            {/* Detail list */}
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
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
                                <dd className="mt-0.5 text-sm font-semibold text-on-surface">{counterFormatter.format(search.vehiclesAnalysedToday)}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Rejected Listings</dt>
                                <dd className="mt-0.5 text-sm text-on-surface">{search.rejectedListings}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Qualified Opportunities</dt>
                                <dd className="mt-0.5 text-sm font-bold text-primary">{search.qualifiedOpportunities}</dd>
                              </div>
                              <div>
                                <dt className="text-xs uppercase tracking-widest text-on-surface-variant">Today's Best Opp. Score</dt>
                                <dd className="mt-0.5 text-sm font-semibold text-on-surface">{search.bestOpportunityScore}</dd>
                              </div>
                            </dl>
                            {/* Sources Being Scanned */}
                            <div>
                              <p className="mb-1 text-xs uppercase tracking-widest text-on-surface-variant">Sources Being Scanned</p>
                              <div className="flex flex-wrap gap-1">
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
                                <span className="text-xs font-semibold text-on-surface">{search.progress}%</span>
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
                            <div className="flex flex-col gap-2 min-[420px]:flex-row">
                              <button className="min-h-11 rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75 min-[420px]:flex-1">
                                Run Now
                              </button>
                              <div className="relative">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setOpenMoreMenu(openMoreMenu === index ? null : index) }}
                                  className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-5 py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40 min-[420px]:w-auto"
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
