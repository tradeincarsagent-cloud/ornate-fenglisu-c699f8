import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

type NotificationChannel = 'email' | 'push' | 'sms'
type NotificationEvent = 'bestBuy' | 'opportunityScore' | 'estimatedProfit' | 'priceReduction' | 'vehicleHistory'
type PriorityLevel = 'highPriority' | 'dailySummary' | 'off'
type DealerProfileFieldKey =
  | 'businessName'
  | 'country'
  | 'preferredCurrency'
  | 'buyingExperience'
  | 'currentStockCapacity'
type BuyingStyle = 'aggressiveBuyer' | 'balancedBuyer' | 'conservativeBuyer'

type ChannelPrefs = Record<NotificationChannel, PriorityLevel>
type EventPrefs = Record<NotificationEvent, PriorityLevel>
type DealerProfile = Record<DealerProfileFieldKey, string>

const CHANNELS: Array<{ id: NotificationChannel; label: string; description: string; badge?: string }> = [
  { id: 'email', label: 'Email Notifications', description: 'Receive alerts to your registered email address.' },
  { id: 'push', label: 'Push Notifications', description: 'Browser and mobile push alerts.', badge: 'Placeholder' },
  { id: 'sms', label: 'SMS Notifications', description: 'Text message alerts to your phone.', badge: 'Placeholder' },
]

const EVENTS: Array<{ id: NotificationEvent; label: string; description: string }> = [
  {
    id: 'bestBuy',
    label: "New Today's Best Buy is found",
    description: "Get notified when TICA identifies a new Best Buy opportunity.",
  },
  {
    id: 'opportunityScore',
    label: 'Opportunity Score exceeds chosen threshold',
    description: 'Alert when any vehicle opportunity score surpasses your set threshold.',
  },
  {
    id: 'estimatedProfit',
    label: 'Estimated Profit exceeds chosen threshold',
    description: 'Alert when estimated gross profit on a vehicle exceeds your set threshold.',
  },
  {
    id: 'priceReduction',
    label: 'Price reduction detected',
    description: 'Notify when a price drop is detected on a tracked or matching vehicle.',
  },
  {
    id: 'vehicleHistory',
    label: 'Vehicle History issue detected',
    description: 'Alert when a vehicle history check surfaces a flag or concern.',
  },
]

const PRIORITY_OPTIONS: Array<{ id: PriorityLevel; label: string }> = [
  { id: 'highPriority', label: '🟢 High Priority' },
  { id: 'dailySummary', label: '🟡 Daily Summary' },
  { id: 'off', label: '🔴 Off' },
]

const DEALER_PROFILE_FIELDS: Array<{
  key: DealerProfileFieldKey
  label: string
  placeholder: string
  type?: 'text' | 'number'
}> = [
  { key: 'businessName', label: 'Business Name', placeholder: 'e.g. Trade Motors UK' },
  { key: 'country', label: 'Country', placeholder: 'e.g. United Kingdom' },
  { key: 'preferredCurrency', label: 'Preferred Currency', placeholder: 'e.g. GBP' },
  { key: 'buyingExperience', label: 'Buying Experience', placeholder: 'e.g. 12 years in used vehicles' },
  { key: 'currentStockCapacity', label: 'Current Stock Capacity', placeholder: 'e.g. 85', type: 'number' },
]

const BUYING_STYLE_OPTIONS: Array<{
  id: BuyingStyle
  label: string
  description: string
  badge?: string
}> = [
  {
    id: 'aggressiveBuyer',
    label: 'Aggressive Buyer',
    description: 'Moves quickly on high-potential stock to win more buying opportunities.',
  },
  {
    id: 'balancedBuyer',
    label: 'Balanced Buyer',
    description: 'Balances speed, margin, and risk for steady buying decisions.',
    badge: 'Recommended',
  },
  {
    id: 'conservativeBuyer',
    label: 'Conservative Buyer',
    description: 'Focuses on lower-risk vehicles with stronger margin protection.',
  },
]

const LEARNING_ITEMS = [
  'Buying Style',
  'Preferred Vehicle Types',
  'Average Buying Budget',
  'Preferred Profit Margin',
  'Buying Locations',
  'Seasonal Buying Trends',
]

const LEARNING_PROGRESS = 82

function BottomSheet({
  value,
  onChange,
  onClose,
}: {
  value: PriorityLevel
  onChange: (v: PriorityLevel) => void
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = ''
    }
  }, [])

  function dismiss() {
    setVisible(false)
    setTimeout(onClose, 270)
  }

  function handleSelect(v: PriorityLevel) {
    onChange(v)
    setVisible(false)
    setTimeout(onClose, 270)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Select notification level"
      className={`settings-sheet-overlay sm:hidden ${visible ? 'settings-sheet-overlay--visible' : ''}`}
    >
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div className={`settings-sheet-panel ${visible ? 'settings-sheet-panel--visible' : ''}`}>
        <div className="mx-auto mt-3 h-1 w-9 rounded-full bg-outline-variant/40" aria-hidden="true" />
        <p className="px-6 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/70">
          Notification Level
        </p>
        <div className="settings-sheet-scroll" role="listbox" aria-label="Notification level options">
          {PRIORITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={value === option.id}
              onClick={() => handleSelect(option.id)}
              className={`flex min-h-[60px] w-full items-center gap-3 px-6 py-4 text-left text-[15px] transition-colors active:bg-white/5 ${
                value === option.id ? 'font-semibold text-primary' : 'font-normal text-on-surface'
              }`}
            >
              <span className="flex-1">{option.label}</span>
              {value === option.id && (
                <span className="text-[18px] text-primary" aria-hidden="true">✓</span>
              )}
            </button>
          ))}
        </div>
        <div className="mx-6 my-3 h-px bg-outline-variant/30" aria-hidden="true" />
        <button
          type="button"
          onClick={dismiss}
          className="flex min-h-[56px] w-full items-center justify-center text-[15px] font-semibold text-on-surface-variant active:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function PrioritySelector({
  value,
  onChange,
  id,
  disabled,
}: {
  value: PriorityLevel
  onChange: (value: PriorityLevel) => void
  id: string
  disabled?: boolean
}) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const currentOption = PRIORITY_OPTIONS.find((o) => o.id === value)!

  return (
    <>
      {/* Mobile: pill trigger that opens bottom sheet */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setSheetOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={sheetOpen}
        className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-2.5 text-sm font-medium text-on-surface transition-colors active:bg-surface-container-high focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        <span className="flex-1 text-left">{currentOption.label}</span>
        <svg
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-on-surface-variant"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop: 3-button segmented control */}
      <div
        role="radiogroup"
        aria-disabled={disabled}
        className={`hidden w-full max-w-[18rem] grid-cols-3 gap-1 rounded-xl border border-outline-variant/30 bg-surface-container p-1 sm:grid ${
          disabled ? 'opacity-50' : ''
        }`}
      >
        {PRIORITY_OPTIONS.map((option) => {
          const selected = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(option.id)}
              className={`min-h-10 rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                option.id === 'off'
                  ? selected
                    ? 'bg-red-500/15 text-red-700'
                    : 'text-red-600 hover:bg-red-500/10 hover:text-red-700'
                  : selected
                    ? 'bg-primary/15 text-on-surface'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {sheetOpen && (
        <BottomSheet
          value={value}
          onChange={onChange}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  )
}

function SettingsPage() {
  const [channelPrefs, setChannelPrefs] = useState<ChannelPrefs>({
    email: 'highPriority',
    push: 'dailySummary',
    sms: 'off',
  })

  const [eventPrefs, setEventPrefs] = useState<EventPrefs>({
    bestBuy: 'highPriority',
    opportunityScore: 'dailySummary',
    estimatedProfit: 'dailySummary',
    priceReduction: 'highPriority',
    vehicleHistory: 'off',
  })

  const [dealerProfile, setDealerProfile] = useState<DealerProfile>({
    businessName: '',
    country: '',
    preferredCurrency: '',
    buyingExperience: '',
    currentStockCapacity: '',
  })
  const [buyingStyle, setBuyingStyle] = useState<BuyingStyle>('balancedBuyer')
  const [profileReviewRequested, setProfileReviewRequested] = useState(false)

  const [saved, setSaved] = useState(false)

  function handleChannelChange(id: NotificationChannel, value: PriorityLevel) {
    setChannelPrefs((prev) => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  function handleEventChange(id: NotificationEvent, value: PriorityLevel) {
    setEventPrefs((prev) => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  function handleDealerProfileChange(id: DealerProfileFieldKey, value: string) {
    setDealerProfile((prev) => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  function handleBuyingStyleChange(value: BuyingStyle) {
    setBuyingStyle(value)
    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
  }

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Builder', href: '/search-builder' },
        { label: 'AI Buying Report', href: '/opportunity' },
        { label: 'Settings', isSectionLabel: true },
        { label: 'TICA Preferences', href: '/settings', active: true },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max space-y-6 sm:space-y-8">
        <header>
          <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">Settings</p>
          <div className="mb-3 flex items-start justify-between gap-4">
            <h1 className="min-w-0 flex-1 text-headline-lg font-headline-lg text-on-surface">TICA Preferences</h1>
            <div className="shrink-0">
              <TicaShield />
            </div>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Teach TICA how you like to buy vehicles.
          </p>
        </header>

        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <span className="mt-0.5 text-lg" aria-hidden="true">🧠</span>
          <div>
            <p className="text-sm font-semibold text-on-surface">Teach mode is active</p>
            <p className="mt-0.5 text-sm text-on-surface-variant">
              These controls are placeholders for now. Use them to define how TICA should prioritize opportunities and
              where to focus your buying strategy.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Notification Channels</h2>
          <p className="mb-5 text-sm text-on-surface-variant">
            Tell TICA the urgency level for each channel.
          </p>

          <div className="space-y-4">
            {CHANNELS.map((channel) => {
              return (
                <div
                  key={channel.id}
                  className="flex flex-col gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor={`channel-${channel.id}`}
                        className="cursor-pointer text-sm font-semibold text-on-surface [text-wrap:balance]"
                      >
                        {channel.label}
                      </label>
                      {channel.badge && (
                        <span className="rounded-full border border-outline-variant/30 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant/50">
                          {channel.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-on-surface-variant">{channel.description}</p>
                  </div>
                  <PrioritySelector
                    id={`channel-${channel.id}`}
                    value={channelPrefs[channel.id]}
                    onChange={(v) => handleChannelChange(channel.id, v)}
                  />
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Opportunity Notification Rules</h2>
          <p className="mb-5 text-sm text-on-surface-variant">
            Set how urgently TICA should surface each signal.
          </p>

          <div className="space-y-4">
            {EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`event-${event.id}`}
                    className="text-sm font-semibold text-on-surface cursor-pointer [text-wrap:balance]"
                  >
                    {event.label}
                  </label>
                  <p className="mt-0.5 text-xs text-on-surface-variant">{event.description}</p>
                </div>
                <PrioritySelector
                  id={`event-${event.id}`}
                  value={eventPrefs[event.id]}
                  onChange={(v) => handleEventChange(event.id, v)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-primary/30 bg-surface-container-low p-5 sm:p-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-outline-variant/25 bg-surface-container-high/40 p-5">
            <div>
              <p className="text-title-md font-title-md text-on-surface">Future Email Notifications</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                Placeholder only — reserve this header space for notification emails.
              </p>
            </div>
            <div className="max-w-sm rounded-2xl border border-outline-variant/25 bg-surface-container px-4 py-5">
              <div className="rounded-xl border border-dashed border-primary/35 bg-primary/5 px-4 py-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  TICA shield reserved here
                </p>
              </div>
              <p className="mt-4 text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant">
                Today&apos;s Best Buy
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Dealer Profile</h2>
          <p className="mb-5 text-sm text-on-surface-variant">
            Placeholder fields to begin teaching TICA how your dealership buys vehicles.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {DEALER_PROFILE_FIELDS.map((field) => (
              <label
                key={field.key}
                className="space-y-2 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4"
              >
                <span className="text-sm font-semibold text-on-surface">{field.label}</span>
                <input
                  type={field.type ?? 'text'}
                  value={dealerProfile[field.key]}
                  placeholder={field.placeholder}
                  onChange={(event) => handleDealerProfileChange(field.key, event.target.value)}
                  className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary/60 focus:outline-none"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Buying Style</h2>
          <p className="mb-5 text-sm text-on-surface-variant">
            Choose one premium placeholder profile so TICA can learn your preferred buying posture.
          </p>

          <div role="radiogroup" aria-label="Buying Style" className="grid gap-4 md:grid-cols-3">
            {BUYING_STYLE_OPTIONS.map((option) => {
              const selected = buyingStyle === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => handleBuyingStyleChange(option.id)}
                  className={`min-h-40 rounded-2xl border p-5 text-left shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    selected
                      ? 'border-primary/50 bg-linear-to-br from-primary/10 via-surface-container-high to-surface-container shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
                      : 'border-outline-variant/25 bg-linear-to-br from-surface-container-high/80 to-surface-container hover:border-outline-variant/40 hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{option.label}</p>
                      <p className="mt-2 text-xs leading-5 text-on-surface-variant">{option.description}</p>
                    </div>
                    {option.badge && (
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">{selected ? 'Selected buying posture' : 'Tap to select'}</span>
                    <span className={`font-semibold ${selected ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {selected ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <div className="rounded-2xl border border-primary/15 bg-linear-to-br from-primary/5 via-surface-container-high/60 to-surface-container p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-title-md font-title-md text-on-surface">TICA Learning</h2>
                <p className="mt-1 text-sm text-on-surface-variant">Learning Progress</p>
              </div>
              <div className="rounded-xl border border-primary/15 bg-surface-container px-4 py-3 text-right">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-on-surface-variant">Progress</p>
                <p className="mt-1 text-2xl font-semibold text-on-surface">{LEARNING_PROGRESS}%</p>
              </div>
            </div>

            <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${LEARNING_PROGRESS}%` }}
                aria-label="Learning Progress"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={LEARNING_PROGRESS}
              />
            </div>

            <div className="mt-5 space-y-3">
              {LEARNING_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-outline-variant/25 bg-surface-container-high/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                    >
                      ✓
                    </span>
                    <span className="text-sm font-medium text-on-surface">{item}</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                    Placeholder
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setProfileReviewRequested(true)}
                className="min-h-11 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Review My Buying Profile
              </button>
              {profileReviewRequested && (
                <p className="text-xs text-on-surface-variant">Placeholder only — no backend actions yet.</p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col items-stretch justify-between gap-3 pb-2 sm:flex-row sm:items-center sm:gap-4 sm:pb-4">
          {saved ? (
            <p className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span className="text-base" aria-hidden="true">✅</span>
              Preferences captured (placeholder only — no backend actions yet).
            </p>
          ) : (
            <p className="text-sm text-on-surface-variant/50">Unsaved changes</p>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="min-h-11 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </PlatformShell>
  )
}
