import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

type NotificationChannel = 'email' | 'push' | 'sms'
type NotificationEvent = 'bestBuy' | 'opportunityScore' | 'estimatedProfit' | 'priceReduction' | 'vehicleHistory'

type ChannelPrefs = Record<NotificationChannel, boolean>
type EventPrefs = Record<NotificationEvent, boolean>

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

function ToggleSwitch({
  checked,
  onChange,
  id,
  disabled,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  id: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        disabled
          ? 'cursor-not-allowed opacity-40'
          : checked
            ? 'bg-primary'
            : 'bg-surface-container-high'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function SettingsPage() {
  const [channelPrefs, setChannelPrefs] = useState<ChannelPrefs>({
    email: true,
    push: false,
    sms: false,
  })

  const [eventPrefs, setEventPrefs] = useState<EventPrefs>({
    bestBuy: true,
    opportunityScore: true,
    estimatedProfit: false,
    priceReduction: true,
    vehicleHistory: true,
  })

  const [saved, setSaved] = useState(false)

  function handleChannelChange(id: NotificationChannel, value: boolean) {
    setChannelPrefs((prev) => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  function handleEventChange(id: NotificationEvent, value: boolean) {
    setEventPrefs((prev) => ({ ...prev, [id]: value }))
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
        { label: 'Notification Preferences', href: '/settings', active: true },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max space-y-8 overflow-x-hidden">
        {/* Page header */}
        <header>
          <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">Settings</p>
          <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">Notification Preferences</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Control how and when Trade In Cars Agent alerts you to new opportunities. All notifications are currently in
            placeholder mode — no messages will be sent until connected.
          </p>
        </header>

        {/* Placeholder notice */}
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <span className="mt-0.5 text-lg" aria-hidden="true">🔔</span>
          <div>
            <p className="text-sm font-semibold text-on-surface">Preparing for Intelligent Notifications</p>
            <p className="mt-0.5 text-sm text-on-surface-variant">
              Your preferences will be saved and applied when notification services are connected. Push and SMS channels
              are coming in a future release.
            </p>
          </div>
        </div>

        {/* Notification Channels */}
        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Notification Channels</h2>
          <p className="mb-5 text-sm text-on-surface-variant">Choose how you want to receive alerts.</p>

          <div className="space-y-4">
            {CHANNELS.map((channel) => {
              const isDisabled = channel.id !== 'email'
              return (
                <div
                  key={channel.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <label
                        htmlFor={`channel-${channel.id}`}
                        className={`text-sm font-semibold ${isDisabled ? 'text-on-surface-variant/60' : 'text-on-surface'} cursor-pointer`}
                      >
                        {channel.label}
                      </label>
                      {channel.badge && (
                        <span className="rounded-full border border-outline-variant/30 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant/50">
                          {channel.badge}
                        </span>
                      )}
                    </div>
                    <p className={`mt-0.5 text-xs ${isDisabled ? 'text-on-surface-variant/40' : 'text-on-surface-variant'}`}>
                      {channel.description}
                    </p>
                  </div>
                  <ToggleSwitch
                    id={`channel-${channel.id}`}
                    checked={channelPrefs[channel.id]}
                    onChange={(v) => handleChannelChange(channel.id, v)}
                    disabled={isDisabled}
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Notify me when */}
        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          <h2 className="mb-1 text-title-md font-title-md text-on-surface">Notify Me When…</h2>
          <p className="mb-5 text-sm text-on-surface-variant">Select the events that should trigger a notification.</p>

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
                <ToggleSwitch
                  id={`event-${event.id}`}
                  checked={eventPrefs[event.id]}
                  onChange={(v) => handleEventChange(event.id, v)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center justify-between gap-4 pb-4">
          {saved ? (
            <p className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span className="text-base" aria-hidden="true">✅</span>
              Preferences saved (placeholder — no messages will be sent yet).
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
