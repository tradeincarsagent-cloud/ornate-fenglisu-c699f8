import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'

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

const BUYING_STYLE_OPTIONS: Array<{ id: BuyingStyle; label: string; description: string }> = [
  {
    id: 'aggressiveBuyer',
    label: 'Aggressive Buyer',
    description: 'Prioritises speed and volume, accepts tighter margins to secure stock quickly.',
  },
  {
    id: 'balancedBuyer',
    label: 'Balanced Buyer',
    description: 'Balances margin, risk, and stock turn for steady and sustainable growth.',
  },
  {
    id: 'conservativeBuyer',
    label: 'Conservative Buyer',
    description: 'Focuses on lower-risk stock with stronger confidence and margin protection.',
  },
]

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
  return (
    <div
      id={id}
      role="radiogroup"
      aria-disabled={disabled}
      className={`grid w-full max-w-[18rem] grid-cols-1 gap-1 rounded-xl border border-outline-variant/30 bg-surface-container p-1 sm:grid-cols-3 ${
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
            className={`rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              selected
                ? 'bg-primary/15 text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
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
      <div className="mx-auto w-full max-w-container-max space-y-8 overflow-x-hidden">
        <header>
          <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">Settings</p>
          <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">TICA Preferences</h1>
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
                  className="flex items-center justify-between gap-4 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor={`channel-${channel.id}`}
                        className="cursor-pointer text-sm font-semibold text-on-surface"
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
                className="flex items-center justify-between gap-4 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4"
              >
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`event-${event.id}`}
                    className="text-sm font-semibold text-on-surface cursor-pointer"
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
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary/60 focus:outline-none"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Buying Style</h2>
          <p className="mb-5 text-sm text-on-surface-variant">
            Choose one placeholder profile so TICA can learn your preferred buying posture.
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
                  className={`rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    selected
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-outline-variant/25 bg-surface-container-high/50 hover:bg-surface-container-high'
                  }`}
                >
                  <p className="text-sm font-semibold text-on-surface">{option.label}</p>
                  <p className="mt-2 text-xs text-on-surface-variant">{option.description}</p>
                </button>
              )
            })}
          </div>
        </section>

        <div className="flex items-center justify-between gap-4 pb-4">
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
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </PlatformShell>
  )
}
