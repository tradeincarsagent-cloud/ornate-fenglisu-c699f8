import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type CSSProperties } from 'react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const pricingCheckoutLinks = {
  starter: 'https://buy.stripe.com/28EbIU9OB8yucva3Jp2cg0h',
  professional: 'https://buy.stripe.com/7sY9AMaSF7uqcvabbR2cg0f',
  enterprise: 'https://buy.stripe.com/28E3coe4R4ie9iYeo32cg0g',
} as const

type TrialPlan = keyof typeof pricingCheckoutLinks

const trialPlanLabels: Record<TrialPlan, string> = {
  starter: 'Starter',
  professional: 'Professional',
  enterprise: 'Enterprise',
}

const exampleCriteria = [
  { label: 'BMW 320d M Sport', lines: ['2019–2022', 'Under £17,000'] },
  { label: 'Audi A4 Black Edition', lines: ['2020+', 'Under £18,500'] },
  { label: 'Ford Ranger Wildtrak', lines: ['Double Cab', 'Under £22,000'] },
  { label: 'Mercedes C220d AMG Line', lines: ['2019+', 'Under £20,000'] },
  { label: 'Toyota Hilux Invincible X', lines: ['2018+', 'Under £24,000'] },
  { label: 'Land Rover Discovery Sport HSE', lines: ['2017–2021', 'Under £22,000'] },
]

const opportunityExamples = [
  { name: 'BMW M3 2020', askingPrice: '£31,995', confidence: '97%', estimatedProfit: '+£3,200', ticaCertified: true, detectedAt: '2 hours ago' },
  { name: 'VW Golf GTI 2021', askingPrice: '£18,450', confidence: '94%', estimatedProfit: '+£1,450', ticaCertified: true, detectedAt: '1 hour ago' },
  { name: 'Ford Ranger Wildtrak 2021', askingPrice: '£22,995', confidence: '93%', estimatedProfit: '+£2,100', ticaCertified: false, detectedAt: '4 hours ago' },
  { name: 'Toyota Hilux Invincible X 2020', askingPrice: '£24,750', confidence: '95%', estimatedProfit: '+£2,300', ticaCertified: true, detectedAt: '53 minutes ago' },
  { name: 'Mercedes E220 2019', askingPrice: '£18,495', confidence: '92%', estimatedProfit: '+£1,850', ticaCertified: false, detectedAt: '3 hours ago' },
  { name: 'Mercedes G-Class 2018', askingPrice: '£69,950', confidence: '91%', estimatedProfit: '+£4,400', ticaCertified: false, detectedAt: '5 hours ago' },
  { name: 'Harley-Davidson Fat Boy 2019', askingPrice: '£13,995', confidence: '90%', estimatedProfit: '+£1,200', ticaCertified: false, detectedAt: '2 hours ago' },
  { name: 'Ford Transit Custom 2022', askingPrice: '£19,995', confidence: '96%', estimatedProfit: '+£2,450', ticaCertified: true, detectedAt: '35 minutes ago' },
  { name: 'Porsche Cayman 2019', askingPrice: '£41,250', confidence: '94%', estimatedProfit: '+£3,100', ticaCertified: true, detectedAt: '27 minutes ago' },
]

type VehicleType = 'car' | 'van' | 'pickup' | 'motorcycle'
type NotificationTone = 'primary' | 'secondary' | 'accent'
type NotificationPosition = 'upper-right' | 'lower-left' | 'upper-left' | 'lower-right'

type RadarContact = {
  id: string
  x: number
  y: number
  label: string
  heading: string
  source: string
  type: VehicleType
}

type RadarNotification = {
  id: string
  title: string
  vehicle: string
  margin: string
  confidence: string
  stamp: string
  tone: NotificationTone
  position: NotificationPosition
}

type LiveNotification = RadarNotification & {
  uid: number
}

const radarContacts: RadarContact[] = [
  { id: 'bmw-m3', x: 31, y: 27, label: 'BMW M3', heading: '318°', source: 'Motorway feed', type: 'car' },
  { id: 'transit-custom', x: 72, y: 34, label: 'Transit Custom', heading: '058°', source: 'Fleet source', type: 'van' },
  { id: 'ranger', x: 65, y: 65, label: 'Ford Ranger', heading: '132°', source: 'Dealer trade', type: 'pickup' },
  { id: 'golf-gti', x: 41, y: 73, label: 'Golf GTI', heading: '214°', source: 'Retail listing', type: 'car' },
  { id: 'tracer', x: 23, y: 59, label: 'Tracer 9', heading: '254°', source: 'Bike network', type: 'motorcycle' },
]

const radarNotifications: RadarNotification[] = [
  { id: 'bmw', title: 'Opportunity Found', vehicle: 'BMW M3 Competition 2020', margin: '£3,200', confidence: '97%', stamp: 'LIVE • 12s', tone: 'primary', position: 'upper-right' },
  { id: 'ranger', title: 'Opportunity Found', vehicle: 'Ford Ranger Wildtrak 2021', margin: '£2,350', confidence: '93%', stamp: 'SYNC • 31s', tone: 'secondary', position: 'lower-left' },
  { id: 'transit', title: 'Opportunity Found', vehicle: 'Ford Transit Custom 2022', margin: '£2,450', confidence: '96%', stamp: 'UK • 44s', tone: 'accent', position: 'upper-left' },
  { id: 'golf', title: 'Opportunity Found', vehicle: 'VW Golf GTI 2021', margin: '£1,450', confidence: '94%', stamp: 'AI • 18s', tone: 'primary', position: 'lower-right' },
]

const radarRingInsets = [6, 14, 22, 30, 38, 46]
const radarGridAngles = Array.from({ length: 24 }, (_, index) => index * 15)
const degreeMarks = Array.from({ length: 12 }, (_, index) => index * 30)

function getContactBearing(x: number, y: number) {
  const radians = Math.atan2(x - 50, 50 - y)
  return (radians * 180 / Math.PI + 360) % 360
}

function getSweepIntensity(sweepAngle: number, contact: RadarContact) {
  const bearing = getContactBearing(contact.x, contact.y)
  const circularDifference = Math.abs(((sweepAngle - bearing + 540) % 360) - 180)
  const trailingDifference = (sweepAngle - bearing + 360) % 360
  const primaryGlow = Math.max(0, 1 - circularDifference / 24)
  const trailingGlow = trailingDifference <= 72 ? 1 - trailingDifference / 72 : 0

  return Math.min(1, 0.24 + primaryGlow * 0.64 + trailingGlow * 0.36)
}

function VehicleGlyph({ type }: { type: VehicleType }) {
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

  return (
    <svg aria-hidden="true" className="radar-vehicle-icon" viewBox="0 0 32 32">
      <path d="M5 18.5h2.6l2.4-4.7c.7-1.4 2.2-2.3 3.8-2.3h5.8c1.5 0 2.9.7 3.8 1.9l2 3H27c1.1 0 2 .9 2 2v3.1h-2.2a3 3 0 0 1-5.8 0h-10a3 3 0 0 1-5.8 0H5v-3Z" />
      <path d="M13.6 14h5.9c.7 0 1.4.3 1.8.9l1.2 1.6H11.8l.9-1.8c.2-.4.6-.7.9-.7Z" />
      <circle cx="8.8" cy="21.5" r="1.9" />
      <circle cx="23.6" cy="21.5" r="1.9" />
    </svg>
  )
}

function UnitedKingdomFlag() {
  return (
    <svg aria-label="United Kingdom marker" className="uk-flag-icon" viewBox="0 0 36 24">
      <rect width="36" height="24" rx="3" fill="#0A2B6B" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#E2434B" strokeWidth="2.4" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="7" />
      <path d="M18 0v24M0 12h36" stroke="#E2434B" strokeWidth="3.8" />
    </svg>
  )
}

// Country flag configuration — replace HeroCountryFlag with another flag component to change country
const HeroCountryFlag = UnitedKingdomFlag

function HeroRadar() {
  const [sweepAngle, setSweepAngle] = useState(0)
  const [notificationIndex, setNotificationIndex] = useState(0)
  const [activeNotifications, setActiveNotifications] = useState<LiveNotification[]>([])

  useEffect(() => {
    const sweepDurationMs = 5400
    const startedAt = performance.now()
    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - startedAt
      setSweepAngle((elapsed / sweepDurationMs * 360) % 360)
    }, 80)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    let notificationUid = 0
    const removalTimers: number[] = []

    const spawnNotification = () => {
      setNotificationIndex((index) => {
        const nextNotification = radarNotifications[index]
        const liveNotification = { ...nextNotification, uid: notificationUid++ }

        setActiveNotifications((current) => [...current.slice(-1), liveNotification])

        const removalTimer = window.setTimeout(() => {
          setActiveNotifications((current) => current.filter((item) => item.uid !== liveNotification.uid))
        }, 4600)

        removalTimers.push(removalTimer)
        return (index + 1) % radarNotifications.length
      })
    }

    spawnNotification()
    const intervalId = window.setInterval(spawnNotification, 2600)

    return () => {
      window.clearInterval(intervalId)
      removalTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return (
    <div className="radar-container glass-card rounded-full p-2 glow-border premium-radar-shell">
      <div className="radar-frame"></div>

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
            <span className="radar-bearing-tick" style={tickStyle}></span>
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
          ></span>
        ))}

        {radarRingInsets.map((inset, index) => (
          <span
            key={inset}
            aria-hidden="true"
            className={`radar-ring ${index % 2 === 0 ? 'radar-ring-major' : 'radar-ring-minor'}`}
            style={{ inset: `${inset}%` }}
          ></span>
        ))}

        <span aria-hidden="true" className="radar-crosshair radar-crosshair-horizontal"></span>
        <span aria-hidden="true" className="radar-crosshair radar-crosshair-vertical"></span>

        <div className="radar-flag-marker">
          <span className="radar-flag-pole"></span>
          <HeroCountryFlag />
        </div>

        <div className="radar-sweep" aria-hidden="true"></div>
        <div className="radar-sweep-glow" aria-hidden="true"></div>

        {radarContacts.map((contact) => {
          const intensity = getSweepIntensity(sweepAngle, contact)
          const contactStyle = {
            left: `${contact.x}%`,
            top: `${contact.y}%`,
            '--radar-contact-intensity': intensity.toFixed(3),
          } as CSSProperties

          return (
            <div
              key={contact.id}
              className={`radar-contact ${intensity > 0.84 ? 'radar-contact-priority' : ''}`}
              style={contactStyle}
            >
              <span className="radar-contact-halo"></span>
              <VehicleGlyph type={contact.type} />
              <span className="radar-contact-caption">
                <span className="radar-contact-title">{contact.label}</span>
                <span className="radar-contact-meta">{contact.heading} • {contact.source}</span>
              </span>
            </div>
          )
        })}

        <div className="radar-centre-point" aria-hidden="true"></div>
        <div className="radar-status-chip" aria-hidden="true">
          <span className="radar-status-dot"></span>
          🇬🇧 UK MARKET • LIVE SCAN
        </div>
      </div>

      {activeNotifications.map((notification) => (
        <div
          key={notification.uid}
          className={`radar-notification radar-notification-${notification.position} radar-notification-${notification.tone}`}
        >
          <div className="radar-notification-header">
            <span className="radar-notification-label">{notification.title}</span>
            <span className="radar-notification-stamp">{notification.stamp}</span>
          </div>
          <p className="radar-notification-vehicle">{notification.vehicle}</p>
          <div className="radar-notification-metrics">
            <div className="radar-notification-metric">
              <span className="radar-notification-metric-label">Estimated Margin</span>
              <span className="radar-notification-metric-value">{notification.margin}</span>
            </div>
            <div className="radar-notification-metric">
              <span className="radar-notification-metric-label">Confidence</span>
              <span className="radar-notification-metric-value">{notification.confidence}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<TrialPlan>('professional')
  const [submissionError, setSubmissionError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
  })
  const [criteriaIndex, setCriteriaIndex] = useState(0)
  const [criteriaVisible, setCriteriaVisible] = useState(true)
  const [opportunityIndex, setOpportunityIndex] = useState(0)
  const [opportunitiesVisible, setOpportunitiesVisible] = useState(true)
  const [trialOverlayVisible, setTrialOverlayVisible] = useState(false)
  const [trialOverlayShowing, setTrialOverlayShowing] = useState(false)

  function openModal(plan: TrialPlan) {
    setSelectedPlan(plan)
    setSubmissionError('')
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setModalOpen(false)
    document.body.style.overflow = ''
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleStartFreeTrial() {
    startTrialOverlay()
    setTimeout(() => {
      hideTrialOverlay()
      scrollToSection('pricing')
    }, 1000)
  }

  function handleHeroStartFreeTrial() {
    handleStartFreeTrial()
  }

  function startTrialOverlay() {
    setTrialOverlayShowing(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTrialOverlayVisible(true))
    })
  }

  function hideTrialOverlay() {
    setTrialOverlayVisible(false)
    setTimeout(() => setTrialOverlayShowing(false), 400)
  }

  function handleFormValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    setFormValues(current => ({ ...current, [name]: value }))
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return

    const data = new FormData()
    data.append('fullName', formValues.fullName)
    data.append('companyName', formValues.companyName)
    data.append('email', formValues.email)
    data.append('phone', formValues.phone)
    data.append('plan', trialPlanLabels[selectedPlan])

    setSubmissionError('')
    setSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mdarndrp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Unable to submit your details right now.')
      }

      startTrialOverlay()
      setModalOpen(false)
      document.body.style.overflow = ''

      const destination = pricingCheckoutLinks[selectedPlan]
      setTimeout(() => {
        hideTrialOverlay()
        window.location.assign(destination)
      }, 950)
    } catch {
      setSubmissionError('Something went wrong submitting your details. Please check your information and try again.')
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
    setCriteriaVisible(false)
    setTimeout(() => {
      setCriteriaIndex(i => (i + 1) % exampleCriteria.length)
      setCriteriaVisible(true)
    }, 450)
    }, 4800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined
    const id = setInterval(() => {
      setOpportunitiesVisible(false)
      fadeTimeout = setTimeout(() => {
        setOpportunityIndex(i => (i + 1) % opportunityExamples.length)
        setOpportunitiesVisible(true)
      }, 450)
    }, 6200)
    return () => {
      clearInterval(id)
      if (fadeTimeout) clearTimeout(fadeTimeout)
    }
  }, [])

  const visibleOpportunities = Array.from({ length: 3 }, (_, offset) => {
    return opportunityExamples[(opportunityIndex + offset) % opportunityExamples.length]
  })

  const processSteps = [
    { icon: 'rule', step: '1', title: 'Tell TICA What You\'re Looking For', desc: 'Choose your preferred makes, models, budget, mileage, location and buying criteria in just a few minutes.' },
    { icon: 'travel_explore', step: '2', title: 'Your AI Buying Employee Searches 24/7', desc: 'TICA continuously monitors connected vehicle marketplaces and trusted sources, learning your preferences over time.' },
    { icon: 'notifications_active', step: '3', title: 'Receive High-Confidence Buying Opportunities', desc: 'Receive instant alerts and daily intelligence briefings when high-confidence vehicles matching your criteria become available.' },
  ] as const

  return (
    <>
      {/* Start Free Trial Transition Overlay */}
      {trialOverlayShowing && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-none"
          style={{
            background: 'rgba(3,7,18,0.92)',
            backdropFilter: 'blur(8px)',
            transition: 'opacity 0.35s ease',
            opacity: trialOverlayVisible ? 1 : 0,
          }}
        >
          <div className="text-center space-y-4 px-6">
            <p className="font-display-lg text-display-lg text-white font-bold tracking-tight">
              🤖 Preparing Your AI Buying Employee...
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
              Connecting you to your subscription options...
            </p>
          </div>
        </div>
      )}
      {/* Lead Capture Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-4 md:pt-8 modal-overlay overflow-y-auto"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="relative w-full max-w-2xl glass-card rounded-2xl p-6 md:p-10 glow-border modal-enter mx-auto my-2 md:my-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <button
              className="absolute top-6 left-6 text-on-surface-variant hover:text-white transition-colors flex items-center gap-1"
              onClick={closeModal}
              type="button"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              <span className="text-xs uppercase tracking-widest font-bold">Back</span>
            </button>
            <button
              className="absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors"
              onClick={closeModal}
              type="button"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div>
              <div className="mb-8 pt-10">
                <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-2 uppercase">Beta Access</span>
                <h2 className="font-display-lg text-headline-lg text-white">Start Your Free 14-Day Trial</h2>
                <p className="text-on-surface-variant mt-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  Join early users exploring AI-assisted vehicle sourcing.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold">
                  Selected Plan: {trialPlanLabels[selectedPlan]}
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Full Name *</label>
                    <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="fullName" onChange={handleFormValueChange} placeholder="John Smith" required type="text" value={formValues.fullName} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Company Name *</label>
                    <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="companyName" onChange={handleFormValueChange} placeholder="Elite Motors Ltd" required type="text" value={formValues.companyName} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Email Address *</label>
                    <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="email" onChange={handleFormValueChange} placeholder="john@company.co.uk" required type="email" value={formValues.email} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mobile Number *</label>
                    <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="phone" onChange={handleFormValueChange} pattern="[+]?[0-9\s\-]{10,}" placeholder="+44 7000 000000" required type="tel" value={formValues.phone} />
                  </div>
                </div>
                {submissionError && (
                  <p className="text-sm text-red-300 bg-red-900/20 border border-red-500/40 rounded-lg px-4 py-3">
                    {submissionError}
                  </p>
                )}
                <div className="pt-4">
                  <button className="w-full engine-start-btn text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed" disabled={submitting} type="submit">
                    <span className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
                    {submitting ? 'Submitting...' : `Continue with ${trialPlanLabels[selectedPlan]}`}
                  </button>
                  <p className="text-center text-[11px] text-on-surface-variant mt-4 px-4 leading-relaxed">
                    Card required. No charge today. Cancel anytime before your trial ends. We will only use your details to contact you about your Trade in Cars Agent trial.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative w-full bg-background/80 border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-20 lg:h-36">
          <div className="flex items-center flex-shrink-0 gap-4">
            <div className="logo-bezel rounded-lg p-1">
              <img alt="Trade In Cars Agent Logo" className="h-12 lg:h-32 w-auto max-w-[140px] sm:max-w-none object-contain logo-blend" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 mx-6">
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#how-it-works">How It Works</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#ai-technology">AI Technology</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center ml-auto">
            <button className="engine-start-btn text-white px-3 sm:px-5 md:px-7 py-1.5 md:py-2 rounded-full font-bold text-xs active:scale-95 transition-all flex items-center gap-2 uppercase tracking-tighter" onClick={handleStartFreeTrial}>
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="whitespace-nowrap">Start Free Trial</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
          <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-gutter items-center relative z-10">
            <div className="space-y-6 md:space-y-8">
              <h1 className="font-display-lg text-display-lg leading-tight text-on-surface">
                Find Better Stock.{' '}
                <svg className="inline-block w-10 h-10 text-primary-container align-middle ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg><br />
                <span className="text-primary-container">Buy Better Vehicles.</span><br />
                Save Hours Every Week.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Trade In Cars Agent is your AI Buying Employee, working 24/7 to monitor the market, identify high-confidence buying opportunities and help you source better vehicles before the competition.
              </p>
              <div className="relative flex items-center justify-center overflow-visible pt-2 md:hidden">
                <HeroRadar />
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="engine-start-btn text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] uppercase tracking-wider" onClick={handleHeroStartFreeTrial}>
                    <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                    Start Free 14-Day Trial
                  </button>
                  <a className="border border-outline text-on-surface px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-variant transition-all" href="#how-it-works">
                    See How It Works
                  </a>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Built specifically for independent dealers, professional buyers and used vehicle specialists.
                </p>
                <p className="text-xs text-on-surface-variant flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  Card required. No charge today. Cancel anytime before your trial ends.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-8 border-t border-outline-variant/20">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-bright flex items-center justify-center text-[10px] font-bold">JD</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center text-[10px] font-bold">SL</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary-container flex items-center justify-center text-[10px] font-bold">EM</div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">Built for UK dealers, traders and sourcing professionals</p>
              </div>
            </div>

            <div className="relative hidden md:flex items-center justify-center overflow-visible">
              <HeroRadar />
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* AI Buying Employee Technologies */}
        <section className="py-24 max-md:py-14 bg-surface-container-low border-y border-outline-variant/10" id="ai-technology">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-14 max-md:mb-8">
              <h2 className="font-display-lg text-headline-lg mb-4 text-on-surface">Meet Your AI Buying Employee</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
                Four intelligent technologies working together to help you buy smarter, faster and more profitably.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'TICA Decision Engine™',
                  desc: 'Explains why a vehicle deserves your attention.',
                },
                {
                  icon: '🛡️',
                  title: 'TICA Certified™',
                  desc: 'Only the highest-confidence buying opportunities receive the TICA Certified™ badge.',
                },
                {
                  icon: '🧠',
                  title: 'TICA Smart Learning™',
                  desc: 'Learns your buying preferences and improves every search.',
                },
                {
                  icon: '📊',
                  title: 'Opportunity Intelligence™',
                  desc: 'Analyses pricing, demand and profit potential instantly.',
                },
              ].map(item => (
                <div key={item.title} className="glass-card rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-10 border border-outline-variant/20 transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]">
                  <div className="text-xl sm:text-2xl lg:text-3xl mb-1.5 lg:mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-xs sm:text-sm lg:font-headline-md lg:text-headline-md mb-1.5 lg:mb-4 text-on-surface leading-tight">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs lg:font-body-md lg:text-body-md text-on-surface-variant leading-snug lg:leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="py-12 max-md:py-8 bg-surface-container-lowest border-y border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'verified_user', title: 'Built for Independent Car Dealers', sub: 'Tailored for UK market dynamics' },
                { icon: 'bolt', title: 'Find Vehicle Opportunities Faster', sub: 'AI-assisted vehicle sourcing workflow' },
                { icon: 'schedule', title: 'Save Time and Focus on Selling', sub: 'Automate the manual search grind' },
              ].map(item => (
                <div key={item.icon} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-headline-md text-sm text-white uppercase tracking-wider">{item.title}</p>
                    <p className="text-on-surface-variant text-xs mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="py-24 max-md:py-14 bg-surface" id="live-demo">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16 max-md:mb-10">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Live Opportunity Feed</span>
              <h2 className="font-display-lg text-headline-lg mb-4">Today&apos;s AI Buying Opportunities</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Illustrative examples showing how your AI Buying Employee identifies high-confidence buying opportunities.
              </p>
            </div>
            <div className="max-w-2xl mx-auto mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-300/30 text-emerald-200 text-xs uppercase tracking-widest font-label-caps mb-2">
                <span className="animate-pulse" aria-hidden="true">🟢</span>
                <span>Live Market Monitoring</span>
              </div>
              <p className="text-xs text-on-surface-variant">Scanning connected marketplaces and trusted sources 24/7.</p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-gutter transition-all duration-500 ${opportunitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'}`}>
              {visibleOpportunities.map(car => (
                <div key={`${car.name}-${car.askingPrice}`}>
                  {/* Compact card — mobile + tablet (hidden on md+) */}
                  <div className="md:hidden glass-card rounded-xl p-3 border-l-4 border-primary transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="bg-primary/10 text-primary text-[9px] font-label-caps px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">Detected</span>
                      <span className="text-[9px] text-on-surface-variant flex items-center gap-0.5">
                        <span className="material-symbols-outlined" style={{fontSize:'10px'}}>schedule</span>
                        {car.detectedAt}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2 mb-1.5">
                      <h3 className="font-headline-md text-xs text-white leading-tight min-w-0">{car.name}</h3>
                      <p className="text-xs font-extrabold text-primary whitespace-nowrap">{car.askingPrice}</p>
                    </div>
                    <div className="flex gap-3 mb-1.5 flex-wrap">
                      <span className="text-[9px] text-on-surface-variant">AI Confidence: <span className="text-white font-semibold">{car.confidence}</span></span>
                      <span className="text-[9px] text-on-surface-variant">Est. Profit: <span className="text-primary font-semibold">{car.estimatedProfit}</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-on-surface-variant">{car.ticaCertified ? '✅ TICA Certified™' : 'TICA Review Queue'}</span>
                      <button type="button" className="text-[9px] text-primary/90 hover:text-primary transition-colors font-semibold whitespace-nowrap">View AI Analysis →</button>
                    </div>
                  </div>
                  {/* Desktop card — md+ (unchanged) */}
                  <div className="hidden md:block glass-card rounded-2xl p-6 border-l-4 border-primary transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]">
                    <div className="flex justify-between items-start mb-5">
                      <span className="bg-primary/10 text-primary text-[10px] font-label-caps px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wider">Detected</span>
                      <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span> {car.detectedAt}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-xl text-white mb-2">{car.name}</h3>
                    <p className="text-2xl font-extrabold text-primary mb-5">{car.askingPrice}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-label-caps">AI Confidence Score</p>
                        <p className="text-white font-bold">{car.confidence}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-label-caps">Estimated Profit</p>
                        <p className="text-primary font-bold">{car.estimatedProfit}</p>
                      </div>
                      <p className="text-sm text-on-surface-variant">{car.ticaCertified ? '✅ TICA Certified™' : 'TICA Review Queue'}</p>
                      <p className="text-xs text-on-surface-variant">Detected {car.detectedAt}</p>
                      <button type="button" className="text-xs text-primary/90 hover:text-primary transition-colors font-semibold">
                        View AI Analysis →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-24 max-md:py-14 bg-surface-container-low border-y border-outline-variant/10" id="dashboard-preview">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16 max-md:mb-10">
              <h2 className="font-display-lg text-headline-lg text-on-surface mb-4">Your AI Buying Command Centre</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">See how Trade in Cars Agent helps dealers track opportunities and manage vehicle sourcing.</p>
              <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-300/30 text-emerald-200 text-xs uppercase tracking-widest font-label-caps">
                <span aria-hidden="true">🟢</span>
                <span>Live Market Monitoring</span>
              </div>
            </div>
            {/* Compact stats row – mobile & tablet (hidden on lg+) */}
            <div className="lg:hidden mb-5">
              <div className="grid grid-cols-2 min-[480px]:grid-cols-3 bg-surface-bright/10 border border-outline-variant/20 rounded-xl overflow-hidden backdrop-blur-md">
                {[
                  { label: 'AI Buying Missions', value: '12 Active' },
                  { label: 'High-Confidence Opportunities', value: '7 Found Today' },
                  { label: 'Potential Monthly Profit', value: '£18,750' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={[
                      'py-3 px-2 text-center',
                      i === 1 ? 'border-l border-outline-variant/30' : '',
                      i === 2 ? 'col-span-2 border-t border-outline-variant/30 min-[480px]:col-span-1 min-[480px]:border-t-0 min-[480px]:border-l' : '',
                    ].join(' ')}
                  >
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant leading-tight mb-1">{stat.label}</p>
                    <p className="text-xl font-extrabold text-primary leading-none">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop stats cards – lg and above */}
            <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
              {[
                { label: 'AI Buying Missions', value: '12 Active' },
                { label: 'High-Confidence Opportunities', value: '7 Found Today' },
                { label: 'Potential Monthly Profit', value: '£18,750' },
              ].map(stat => (
                <div key={stat.label} className="bg-surface-bright/10 border border-outline-variant/20 rounded-xl p-6 text-center backdrop-blur-md">
                  <p className="text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-3xl lg:text-4xl font-extrabold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
            {/* Mobile / Tablet: Opportunity Cards (hidden on desktop) */}
            <div className="lg:hidden mb-6 space-y-3">
              {[
                { name: 'BMW M3', score: '97%', profit: '+£3,200', certified: true },
                { name: 'Ford Ranger', score: '94%', profit: '+£2,100', certified: false },
                { name: 'Mercedes E220', score: '92%', profit: '+£1,850', certified: false },
              ].map(row => (
                <div key={row.name} className="glass-card rounded-xl border border-outline-variant/20 px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight">{row.name}</p>
                    <p className="text-on-surface-variant text-xs mt-0.5">
                      AI Score: <span className="text-white font-semibold">{row.score}</span>
                      <span className="mx-1.5 opacity-40">·</span>
                      Profit: <span className="text-primary font-bold">{row.profit}</span>
                    </p>
                  </div>
                  {row.certified && (
                    <span className="shrink-0 text-[10px] text-primary font-bold uppercase tracking-wide border border-primary/40 rounded-full px-2 py-0.5">🛡️ TICA™</span>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: Table (hidden on mobile/tablet) */}
            <div className="hidden lg:block glass-card rounded-2xl overflow-hidden border border-outline-variant/20 mb-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-md">
                  <thead>
                    <tr className="bg-surface-variant/50 border-b border-outline-variant/20">
                      <th className="px-6 py-4 text-label-caps text-primary">Vehicle</th>
                      <th className="px-6 py-4 text-label-caps text-primary">AI Score</th>
                      <th className="px-6 py-4 text-label-caps text-primary">Estimated Profit</th>
                      <th className="px-6 py-4 text-label-caps text-primary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { name: 'BMW M3', score: '97%', profit: '+£3,200', status: 'TICA Certified™' },
                      { name: 'Ford Ranger', score: '94%', profit: '+£2,100', status: 'Watching' },
                      { name: 'Mercedes E220', score: '92%', profit: '+£1,850', status: 'New Opportunity' },
                    ].map(row => (
                      <tr key={row.name} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{row.name}</td>
                        <td className="px-6 py-4 text-on-surface-variant font-semibold">{row.score}</td>
                        <td className="px-6 py-4 text-primary font-bold">{row.profit}</td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 mb-6 lg:mb-12">
              {/* AI Recommendation */}
              <div className="glass-card rounded-2xl border border-outline-variant/20 p-4 lg:p-7 h-full">
                <p className="text-label-caps text-primary uppercase tracking-widest mb-1.5 lg:mb-3 text-[10px] lg:text-xs">AI Recommendation</p>
                <p className="text-white font-semibold text-base lg:text-xl mb-1.5 lg:mb-3">BMW M3</p>
                <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mb-0.5 lg:mb-2">Why TICA recommends it</p>
                <ul className="space-y-0 lg:space-y-2 text-on-surface-variant text-xs lg:text-sm">
                  <li>• High demand</li>
                  <li>• Low market supply</li>
                  <li>• Estimated profit £3,200</li>
                </ul>
                <div className="mt-1.5 lg:mt-4 pt-1.5 lg:pt-0 border-t border-outline-variant/20 lg:border-0">
                  <p className="text-xs lg:text-sm text-on-surface-variant"><span className="text-primary font-semibold">Recommended Action</span></p>
                  {/* Mobile: outline phone icon + bold text */}
                  <p className="lg:hidden text-white text-xs mt-0.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-white shrink-0" style={{fontSize:'13px'}}>phone</span>
                    <span className="font-bold">Contact seller immediately.</span>
                  </p>
                  {/* Desktop: unchanged */}
                  <p className="hidden lg:block text-white text-sm mt-0.5">📞 Contact seller immediately.</p>
                </div>
              </div>

              {/* Live AI Activity */}
              <div className="glass-card rounded-2xl border border-outline-variant/20 p-4 lg:p-7 h-full">
                <p className="text-label-caps text-primary uppercase tracking-widest mb-2 lg:mb-4 text-[10px] lg:text-xs">Live AI Activity</p>
                {/* Mobile/Tablet: compact dot-leader layout */}
                <ul className="lg:hidden space-y-1 font-mono text-xs">
                  {[
                    { label: 'Market Scans', value: '1,287' },
                    { label: 'Vehicles Analysed', value: '8,492' },
                    { label: 'High Confidence', value: '73' },
                  ].map(item => (
                    <li key={item.label} className="flex items-baseline gap-1">
                      <span className="text-on-surface-variant shrink-0">{item.label}</span>
                      <span className="flex-1 border-b border-dotted border-outline-variant/30 mx-1 mb-0.5" />
                      <span className="text-white font-semibold shrink-0">{item.value}</span>
                    </li>
                  ))}
                  <li className="flex items-start justify-between gap-1 pt-1 border-t border-outline-variant/20">
                    <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-sans">Status</span>
                    <div className="flex flex-col items-end">
                      <span className="text-emerald-300 font-semibold text-xs flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot-pulse shrink-0" />
                        AI Monitoring Live
                      </span>
                      <span className="text-[9px] text-on-surface-variant/50 mt-0.5 font-sans font-normal">Live • Updating continuously</span>
                    </div>
                  </li>
                </ul>
                {/* Desktop: original layout */}
                <ul className="hidden lg:block space-y-4">
                  <li className="flex items-baseline justify-between gap-4">
                    <span className="text-on-surface-variant text-sm">Market Scans Today</span>
                    <span className="text-white font-semibold text-lg">1,287</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4">
                    <span className="text-on-surface-variant text-sm">Vehicles Analysed</span>
                    <span className="text-white font-semibold text-lg">8,492</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4">
                    <span className="text-on-surface-variant text-sm">High-Confidence Opportunities</span>
                    <span className="text-white font-semibold text-lg">73</span>
                  </li>
                  <li className="pt-1 border-t border-outline-variant/20 flex items-center justify-between gap-4">
                    <span className="text-on-surface-variant text-sm">AI Status</span>
                    <span className="text-white font-semibold">🟢 Monitoring Live</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={() => scrollToSection('dashboard-preview')} className="preview-btn-glow border border-primary/50 text-primary px-6 py-3 lg:px-10 lg:py-4 rounded-full font-bold hover:bg-primary/10 transition-all uppercase tracking-widest text-sm active:scale-95 flex items-center gap-2">
                <span className="material-symbols-outlined lg:hidden shrink-0" style={{fontSize:'16px'}}>space_dashboard</span>
                Enter My AI Command Centre
              </button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-surface-container-lowest benefits-section">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center mb-16 max-md:mb-8">
            <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Why Dealers Need an AI Buying Employee</span>
            <div className="why-dealer-mobile-card">
              <h2 className="font-display-lg text-headline-lg mb-6">The most profitable dealers don't search harder—<span className="why-dealer-highlight">they search smarter.</span> Let TICA monitor the market while your team focuses on buying and selling vehicles.</h2>
            </div>
          </div>
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: 'timer_off', title: 'Save Hours Every Week', desc: 'Stop spending hours refreshing marketplaces and scrolling through listings. Your AI Buying Employee searches continuously so your team doesn\'t have to.' },
              { icon: 'notification_important', title: 'Never Miss Profitable Vehicles', desc: 'The best opportunities often disappear within minutes. TICA alerts you the moment high-confidence vehicles become available.' },
              { icon: 'psychology_alt', title: 'Buy With Greater Confidence', desc: 'Opportunity Intelligence™ helps prioritise stronger buying opportunities, giving you more confidence before contacting the seller.' },
            ].map(item => (
              <div key={item.icon} className="why-dealer-feature-card p-8 glass-card rounded-2xl border-l-4 border-error/50">
                <span className="why-dealer-feature-icon material-symbols-outlined text-error text-4xl mb-6 block">{item.icon}</span>
                <h3 className="why-dealer-feature-title font-headline-md text-headline-md mb-4">{item.title}</h3>
                <p className="why-dealer-feature-desc text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 relative overflow-hidden" id="how-it-works">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-md:mb-7 gap-8 max-md:gap-5">
              <div className="max-w-xl">
                <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 max-md:mb-2 uppercase">Our Process</span>
                <h2 className="how-it-works-heading font-display-lg text-headline-lg">How Your AI Buying Employee Works</h2>
                <p className="text-on-surface-variant mt-4 max-md:mt-2 leading-relaxed">Getting started takes just a few minutes. Your AI Buying Employee then searches continuously for vehicles that match your buying strategy.</p>
              </div>
              <div className="bg-surface-variant p-4 max-md:p-3 rounded-xl max-md:rounded-2xl border border-outline-variant/30 flex items-center gap-4 min-w-[220px]">
                <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                </div>
                <div style={{ minHeight: '3.5rem' }} className="how-it-works-criteria-inner flex flex-col justify-center">
                  <p className="text-xs font-label-caps text-on-surface-variant">EXAMPLE CRITERIA</p>
                  <div style={{ transition: 'opacity 0.45s ease, transform 0.45s ease', opacity: criteriaVisible ? 1 : 0, transform: criteriaVisible ? 'translateY(0)' : 'translateY(4px)' }}>
                    <p className="font-bold text-on-surface leading-snug">{exampleCriteria[criteriaIndex].label}</p>
                    {exampleCriteria[criteriaIndex].lines.map((line, i) => (
                      <p key={i} className="text-sm text-on-surface-variant leading-snug">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-md:gap-8 relative">
              <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>
              <div className="hidden md:flex pointer-events-none absolute inset-x-0 top-7 z-20 justify-center">
                <div className="w-full max-w-4xl px-20 flex items-center justify-between">
                  <span className="material-symbols-outlined how-it-works-arrow">east</span>
                  <span className="material-symbols-outlined how-it-works-arrow how-it-works-arrow-delay">east</span>
                </div>
              </div>
              {processSteps.map((item, index) => (
                <div key={item.step} className="relative z-10 text-center">
                  <div className={`w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 glow-border ${item.step === '2' ? 'how-it-works-scan-icon' : ''}`}>
                    <span className={`material-symbols-outlined text-on-primary-container text-3xl ${item.step === '3' ? 'how-it-works-bell' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md mb-4">{item.step}. {item.title}</h4>
                  <p className="text-on-surface-variant">{item.desc}</p>
                  {index < processSteps.length - 1 && (
                    <div className="md:hidden mt-8 flex justify-center">
                      <span className="material-symbols-outlined how-it-works-arrow-mobile">south</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-12 text-center text-sm text-on-surface-variant/85 max-w-2xl mx-auto">
              Your AI Buying Employee never stops searching. Update your buying criteria anytime.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 max-md:py-14 relative" id="pricing">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center mb-16 max-md:mb-10">
            <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Pricing</span>
            <h2 className="font-display-lg text-headline-lg mb-4">Hire Your AI Buying Employee</h2>
            <div className="flex items-start justify-center gap-2 text-on-surface-variant mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>
                <span className="block">Start with a full-featured 14-Day Professional Trial.</span>
                <span className="block mt-2">After your trial, choose the subscription that&apos;s right for your dealership.</span>
              </span>
            </div>
            <div className="glass-card rounded-2xl border border-outline-variant/20 bg-surface-container/60 px-4 py-3 mx-auto mb-4 max-w-3xl">
              <p className="text-sm text-on-surface-variant">
                ✅ Every new customer begins with a full Professional Trial, giving you complete access to TICA before choosing your subscription.
              </p>
            </div>
            <p className="text-[11px] text-on-surface-variant/70 uppercase tracking-widest">Card required. No charge today. Cancel anytime before your trial ends.</p>
          </div>
          <div className="pricing-plans-grid max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
            {/* Starter */}
            <div className="pricing-plan-card py-[1.85rem] px-8 md:py-[2.3rem] md:px-10 glass-card rounded-2xl flex flex-col h-full dashboard-border">
              <div className="pricing-plan-header mb-9 space-y-3">
                <h4 className="pricing-plan-title font-headline-md text-headline-md leading-tight text-primary-container">AI Buying Employee – Starter</h4>
                <p className="pricing-plan-description text-on-surface-variant text-sm leading-relaxed">Perfect for independent dealers starting with AI sourcing.</p>
                <div className="flex items-baseline gap-1">
                  <span className="pricing-plan-price text-[2.36rem] font-extrabold text-white">£49</span>
                  <span className="pricing-plan-mo text-xs text-on-surface-variant">/mo</span>
                </div>
              </div>
              <ul className="pricing-plan-features space-y-4 mb-10 flex-1 text-[15px] leading-relaxed">
                {['Up to 3 active buying briefs', 'Daily shortlist of margin-ready stock', 'One command centre for all opportunities'].map(f => (
                  <li key={f} className="pricing-plan-feature flex items-center gap-3">
                    <span className="pricing-plan-feature-icon material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="pricing-plan-cta w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95 text-center" onClick={() => openModal('starter')} type="button">Start My Starter Trial</button>
            </div>
            {/* Professional */}
            <div className="pricing-plan-card py-[1.85rem] px-8 md:py-[2.3rem] md:px-10 glass-card rounded-2xl flex flex-col h-full glow-border relative transform md:-translate-y-4 shadow-2xl">
              <div className="pricing-popular-badge absolute -top-[14px] left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-[3px] rounded-full text-xs font-bold uppercase tracking-wider">⭐ MOST POPULAR</div>
              <div className="pricing-plan-header mb-9 space-y-3">
                <h4 className="pricing-plan-title font-headline-md text-headline-md leading-tight text-primary-container">AI Buying Employee – Professional</h4>
                <p className="pricing-plan-description text-on-surface-variant text-sm leading-relaxed">For active dealers who need real-time opportunity flow.</p>
                <div className="flex items-baseline gap-1">
                  <span className="pricing-plan-price pricing-plan-price-featured text-[3.15rem] font-extrabold text-primary">£99</span>
                  <span className="pricing-plan-mo text-xs text-on-surface-variant">/mo</span>
                </div>
              </div>
              <ul className="pricing-plan-features space-y-4 mb-10 flex-1 text-[15px] leading-relaxed">
                {[
                  { text: 'Unlimited buying briefs', bold: true },
                  { text: 'Instant AI opportunity alerts', bold: true },
                  { text: 'Advanced AI buying intelligence', bold: false },
                  { text: 'Opportunity Intelligence™ insights', bold: false },
                ].map(f => (
                  <li key={f.text} className={`pricing-plan-feature flex items-center gap-3 ${f.bold ? 'font-bold' : ''}`}>
                    <span className="pricing-plan-feature-icon material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button className="pricing-plan-cta pricing-plan-cta-featured w-full engine-start-btn text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95 text-center" onClick={() => openModal('professional')} type="button">Start My Professional Trial</button>
            </div>
            {/* Enterprise */}
            <div className="pricing-plan-card py-[1.85rem] px-8 md:py-[2.3rem] md:px-10 glass-card rounded-2xl flex flex-col h-full dashboard-border">
              <div className="pricing-plan-header mb-9 space-y-3">
                <h4 className="pricing-plan-title font-headline-md text-headline-md leading-tight text-primary-container">AI Buying Employee – Enterprise</h4>
                <p className="pricing-plan-description text-on-surface-variant text-sm leading-relaxed">Designed for larger dealerships, buying teams and specialist vehicle sourcing companies.</p>
                <div className="flex items-baseline gap-1">
                  <span className="pricing-plan-price text-[2.36rem] font-extrabold text-white">£299</span>
                  <span className="pricing-plan-mo text-xs text-on-surface-variant">/mo</span>
                </div>
              </div>
              <ul className="pricing-plan-features space-y-4 mb-10 flex-1 text-[15px] leading-relaxed">
                {['Up to 10 dealership locations', 'Full team visibility & performance tracking', 'Dedicated account manager', 'White-label API access'].map(f => (
                  <li key={f} className="pricing-plan-feature flex items-center gap-3">
                    <span className="pricing-plan-feature-icon material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="pricing-plan-cta w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95 text-center" onClick={() => openModal('enterprise')} type="button">Start My Enterprise Trial</button>
            </div>
          </div>
          <div className="max-w-container-max mx-auto px-margin-desktop mt-8">
            <div className="trust-panel-card glass-card rounded-2xl p-5 border border-outline-variant/20">
              <ul className="trust-panel-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold text-on-surface-variant">
                {[
                  { label: 'Secure Stripe Checkout', emphasized: true },
                  { label: 'Cancel Anytime', emphasized: false },
                  { label: 'No Hidden Fees', emphasized: false },
                  { label: 'Upgrade Anytime', emphasized: false },
                ].map(item => (
                  <li key={item.label} className="trust-panel-item flex items-center justify-center text-center">
                    <span className="trust-panel-mobile-row md:hidden">
                      <span className="trust-panel-tick" aria-hidden="true">✔</span>
                      <span className={item.emphasized ? 'font-semibold' : 'font-normal'}>{item.label}</span>
                    </span>
                    <span className="hidden md:inline">{`✔ ${item.label}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24 max-md:pt-10 max-md:pb-6 bg-surface-container-lowest border-y border-outline-variant/10" id="version-2">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-16 max-md:mb-8">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block uppercase mb-4">Product Roadmap</span>
              <h2 className="font-display-lg text-headline-lg mb-6">Built for Today. Designed for Tomorrow.</h2>
              <p className="text-on-surface-variant text-lg">TICA is continuously evolving. Here's what you receive today, what's currently being developed, and where the platform is heading in the future.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {[
                {
                  version: 'Available Today',
                  description: 'Everything you need to start using your AI Buying Employee today.',
                  status: 'Available Now',
                  statusClass: 'bg-emerald-500/15 text-emerald-400',
                  iconClass: 'text-emerald-400',
                  icon: 'check_circle',
                  items: [
                    'AI Search Finder',
                    'Dealer Command Centre',
                    'Opportunity Intelligence',
                    'TICA Smart Learning™',
                    'TICA Decision Engine™',
                    'TICA Certified™',
                    'Saved Searches',
                    'Email Notifications',
                    '14-Day Free Trial',
                  ],
                },
                {
                  version: 'Coming Next',
                  description: 'Features already planned and actively being developed.',
                  status: 'In Development',
                  statusClass: 'bg-primary/20 text-primary',
                  iconClass: 'text-primary',
                  icon: 'schedule',
                  items: [
                    'Mobile App',
                    'Push Notifications',
                    'Motorcycle Support',
                    'Vans & Commercial Vehicles',
                    'International Search',
                    'Dealer Insights',
                    'Vehicle Watchlists',
                  ],
                },
                {
                  version: 'Future Vision',
                  description: 'Our long-term vision for the future of intelligent vehicle sourcing.',
                  status: 'Future Vision',
                  statusClass: 'bg-purple-500/15 text-purple-400',
                  iconClass: 'text-purple-400',
                  icon: 'rocket_launch',
                  items: [
                    'AI Negotiation Assistant',
                    'Price Prediction AI',
                    'Profit Estimator',
                    'Vehicle History Integration',
                    'Auction Integrations',
                    'API Integrations',
                    'Multi-language Support',
                    'Multi-user Dealer Accounts',
                  ],
                },
              ].map(phase => (
                <div key={phase.version} className="bg-surface-container p-8 rounded-2xl border border-outline-variant/20 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-headline-md text-headline-md">{phase.version}</h3>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${phase.statusClass}`}>{phase.status}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-6">{phase.description}</p>
                  <ul className="space-y-3">
                    {phase.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-on-surface-variant">
                        <span className={`material-symbols-outlined text-xl flex-shrink-0 ${phase.iconClass}`}>{phase.icon}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Future roadmap highlights */}
            <div className="mt-12 max-md:mt-4 glass-card rounded-2xl p-8 max-md:px-4 max-md:py-3.5 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6 max-md:mb-3">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <h3 className="font-headline-md text-headline-md">🚀 Future Roadmap</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-2.5">
                {[
                  { icon: 'search', text: 'AI Intelligence Engine', status: 'In Development', badgeClass: 'bg-primary/20 text-primary' },
                  { icon: 'fact_check', text: 'Vehicle History Checks', status: 'Planned', badgeClass: 'bg-amber-500/20 text-amber-300' },
                  { icon: 'gavel', text: 'Auction Integration', status: 'Coming Soon', badgeClass: 'bg-purple-500/20 text-purple-300' },
                  { icon: 'public', text: 'International Search', status: 'Planned', badgeClass: 'bg-amber-500/20 text-amber-300' },
                  { icon: 'query_stats', text: 'Dealer Insights', status: 'In Development', badgeClass: 'bg-primary/20 text-primary' },
                  { icon: 'notifications_active', text: 'TICA Smart Alerts™', status: 'Coming Soon', badgeClass: 'bg-purple-500/20 text-purple-300' },
                ].map(item => (
                  <div key={item.text} className="bg-surface-container p-4 max-md:p-3 rounded-xl border border-outline-variant/20">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="material-symbols-outlined text-primary-container max-md:text-[22px]">{item.icon}</span>
                        <span className="font-bold text-sm max-md:text-[13px]">{item.text}</span>
                      </div>
                      <span className={`hidden max-md:inline-flex items-center whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${item.badgeClass}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 max-md:pt-8 max-md:pb-14 bg-primary text-on-primary text-center">
          <div className="max-w-3xl mx-auto px-margin-desktop">
            <h2 className="font-display-lg text-display-lg mb-4">Ready to Hire Your AI Buying Employee?</h2>
            <p className="text-on-primary/80 text-lg mb-8">Join dealers using AI to discover better buying opportunities 24/7.</p>
            <div className="space-y-6">
              <button className="engine-start-btn text-white px-12 py-6 rounded-full font-bold text-2xl active:scale-95 transition-all shadow-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] uppercase tracking-widest" onClick={handleStartFreeTrial}>
                Start My 14-Day Trial
              </button>
              <p className="text-on-primary/80 flex items-center justify-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Secure Stripe checkout • No charge today • Cancel anytime during your 14-day trial.
              </p>
            </div>
          </div>
        </section>

        {/* Trust & Confidence Section */}
        <section className="py-24 max-md:py-12 bg-surface-container border-t border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <span className="font-label-caps text-label-caps text-primary tracking-widest block uppercase">THE TICA CERTIFIED™ STANDARD</span>
                <h2 className="font-display-lg text-headline-lg text-white">Why Dealers Trust TICA™</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                  Every recommendation made by TICA must first pass our AI confidence analysis. Only opportunities that meet our buying criteria receive the TICA Certified™ recommendation.
                </p>

                {/* Divider */}
                <div className="mt-12 mb-12 max-md:mt-6 max-md:mb-6 max-w-2xl mx-auto border-t border-outline-variant/15" />

                <div className="flex flex-col items-center gap-10 text-center">
                  <div className="flex flex-col items-center gap-5">
                    <span className="font-label-caps text-label-caps tracking-widest block uppercase text-on-surface-variant/80">
                      Trusted AI Certification
                    </span>
                    <img
                      src="https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f"
                      alt="TICA Certified shield"
                      className="tica-certified-shield h-auto w-36"
                      decoding="async"
                    />
                    <div className="space-y-2">
                      <p className="font-semibold text-xl text-white tracking-wide">Professional AI Buying Confidence</p>
                      <p className="text-on-surface-variant font-medium">Only opportunities that pass TICA's AI confidence analysis receive the TICA Certified™ badge before being recommended.</p>
                    </div>
                  </div>

                  <div className="grid w-full max-w-4xl grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                    {[
                      { icon: '🔒', label: 'Secure Stripe Checkout', desc: 'Your subscription is processed securely through Stripe.' },
                      { icon: '📅', label: '14-Day Professional Trial', desc: 'Full access to every Professional feature from day one.' },
                      { icon: '🧠', label: 'AI Confidence Analysis', desc: 'Every opportunity is analysed before being recommended.' },
                      { icon: '🚗', label: 'Built for Professional Dealers', desc: 'Designed specifically for independent dealers, traders and buying teams.' },
                    ].map(item => (
                      <div key={item.label} className="flex flex-col gap-2 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 px-5 py-4 text-left">
                        <div className="flex items-center gap-3">
                          <span className="text-xl leading-none">{item.icon}</span>
                          <span className="font-semibold text-sm text-white sm:text-base">{item.label}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <p className="pt-6 text-on-surface-variant font-medium max-w-2xl text-center">Start your Professional Trial today and discover why dealers trust TICA to identify better buying opportunities before anyone else.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest w-full py-20 border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <div className="logo-bezel rounded-lg p-1">
                <img alt="Trade In Cars Agent Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain logo-blend" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKabmcvwQji3POw6DCSvZmOlFghhxBc4xSqvnkr647RPhuwklQMj0qzeFAToJIwomZJ_vSqpJW-nFPicV6qwiERTB5gIicgsv858anTVXqtchn1gMvh_dyWm1Wvc7fEF3NQhc_WF3zkfzaB76Awi-HDvQvgxUkHQXX42Rei9TPDQU5c2GXIrC7Szkpm32QDSGvg8ix3zOZ635ai7fd7NGDqKODHr0HGWrWxgUo7hH_0BD9-CO2cITGXq8W7O_fFnhhCyFwBCHWmVHG" />
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              An AI-assisted vehicle sourcing platform for dealers, traders and sourcing professionals.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">© 2026 Trade in Cars Agent. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-primary">PLATFORM</span>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#how-it-works">How It Works</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#pricing">Pricing</a>
              {/* TODO: Remove preview links before production launch. */}
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm" href="/dashboard">Dealer Command Centre Preview</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm" href="/opportunity">AI Buying Report Preview</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm" href="/search-builder">AI Search Builder Preview</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">API Docs</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-primary">LEGAL &amp; SUPPORT</span>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">Privacy Policy</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">Terms of Service</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
