import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'

export const Route = createFileRoute('/search-builder')({
  component: SearchBuilderPage,
})

const VEHICLE_TYPES = ['Cars', 'Pick-ups', 'Vans & Light Commercials'] as const
type VehicleType = (typeof VEHICLE_TYPES)[number]

const SEARCH_FREQUENCIES = [
  { label: 'Every 15 Minutes', value: '15min' },
  { label: 'Hourly', value: 'hourly' },
  { label: 'Every 6 Hours', value: '6h' },
  { label: 'Daily', value: 'daily' },
] as const

const PHASE_ONE_SOURCES = [
  'Auto Trader',
  'Dealer Network',
  'UK Public Vehicle Listings',
  'Dealer Websites',
  'Classified Vehicle Websites',
] as const
const PLANNED_INTEGRATIONS = [
  'Facebook Marketplace',
  'Auctions',
  'Private Sellers',
  'Trade Feeds',
  'Vehicle History Providers',
] as const

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function SearchBuilderPage() {
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null)
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [maxBudget, setMaxBudget] = useState('')
  const [maxMileage, setMaxMileage] = useState('')
  const [minProfit, setMinProfit] = useState('')
  const [frequency, setFrequency] = useState<string | null>(null)
  const [missionCreated, setMissionCreated] = useState(false)

  const selectedFrequency = SEARCH_FREQUENCIES.find((item) => item.value === frequency)?.label ?? 'Not selected'
  const missionNameBase = [make.trim(), model.trim()].filter(Boolean).join(' ')
  const missionName = missionNameBase || selectedVehicleType || 'Vehicle Search'

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Builder', href: '/search-builder', active: true },
        { label: 'AI Buying Report', href: '/opportunity' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Settings', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto max-w-container-max">
        {/* ── Page title ──────────────────────────────────────────────── */}
        <div className="mb-10">
          <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">AI Search Builder</p>
          <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">Create an AI Search in Under 60 Seconds</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Configure your search criteria and let the AI find matching vehicles 24/7.</p>
        </div>

        <div className="space-y-8">
          {/* ── Section 1: Vehicle Type ──────────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary">1</span>
              <h2 className="text-headline-md font-headline-md text-on-surface">Vehicle Type</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {VEHICLE_TYPES.map((type) => {
                const selected = selectedVehicleType === type
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedVehicleType(type)}
                    className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center transition-all duration-200 ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                        : 'border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                    aria-pressed={selected}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary">
                        <CheckIcon />
                      </span>
                    )}
                    <span className="text-2xl">
                      {type === 'Cars' ? '🚗' : type === 'Pick-ups' ? '🛻' : '🚐'}
                    </span>
                    <span className="text-body-md font-body-md font-semibold">{type}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Section 2: Vehicle Details ───────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary">2</span>
              <h2 className="text-headline-md font-headline-md text-on-surface">Vehicle Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="make">Make</label>
                <input
                  id="make"
                  type="text"
                  placeholder="e.g. BMW, Audi, Ford"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="model">Model</label>
                <input
                  id="model"
                  type="text"
                  placeholder="e.g. 3 Series, A4, Focus"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="year-from">Year From</label>
                <input
                  id="year-from"
                  type="number"
                  placeholder="e.g. 2018"
                  min="1990"
                  max="2030"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="year-to">Year To</label>
                <input
                  id="year-to"
                  type="number"
                  placeholder="e.g. 2024"
                  min="1990"
                  max="2030"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="max-budget">Maximum Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant">£</span>
                  <input
                    id="max-budget"
                    type="number"
                    placeholder="e.g. 30000"
                    min="0"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="max-mileage">Maximum Mileage</label>
                <input
                  id="max-mileage"
                  type="number"
                  placeholder="e.g. 60000"
                  min="0"
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(e.target.value)}
                  className="rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="min-profit">Minimum Estimated Profit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant">£</span>
                  <input
                    id="min-profit"
                    type="number"
                    placeholder="e.g. 1500"
                    min="0"
                    value={minProfit}
                    onChange={(e) => setMinProfit(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── Section 3: Search Sources ────────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary">3</span>
              <h2 className="text-headline-md font-headline-md text-on-surface">Search Sources</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary">Available / Phase 1</p>
                <div className="space-y-3">
                  {PHASE_ONE_SOURCES.map((source) => (
                    <div
                      key={source}
                      className="flex items-center gap-4 rounded-xl border border-primary/20 bg-surface-container-high px-5 py-4 shadow-sm shadow-primary/5"
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-primary bg-primary text-on-primary" aria-hidden="true">
                        <CheckIcon />
                      </span>
                      <span className="flex-1 text-body-md font-body-md text-on-surface">{source}</span>
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps text-primary">Phase 1</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Planned Integrations</p>
                <div className="space-y-3">
                  {PLANNED_INTEGRATIONS.map((source) => (
                    <div
                      key={source}
                      className="flex cursor-not-allowed items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container px-5 py-4 opacity-60"
                      aria-disabled="true"
                    >
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-outline-variant/40 bg-transparent"
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-body-md font-body-md text-on-surface-variant">{source}</span>
                      <span className="rounded-full border border-outline-variant/40 bg-surface-container-high px-3 py-1 text-label-caps font-label-caps text-on-surface-variant">Coming Soon</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Trade in Cars Agent is being designed to search connected marketplaces, dealer sources and trusted public vehicle listings. Some integrations will be released in later platform phases.
                </p>
              </div>
            </div>
          </section>

          {/* ── Section 4: Search Frequency ──────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary">4</span>
              <h2 className="text-headline-md font-headline-md text-on-surface">Search Frequency</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SEARCH_FREQUENCIES.map(({ label, value }) => {
                const selected = frequency === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFrequency(value)}
                    aria-pressed={selected}
                    className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-5 text-center transition-all duration-200 ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                        : 'border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary">
                        <CheckIcon />
                      </span>
                    )}
                    <span className="text-xl">
                      {value === '15min' ? '⚡' : value === 'hourly' ? '🔄' : value === '6h' ? '⏱️' : '📅'}
                    </span>
                    <span className="text-body-md font-body-md font-semibold leading-tight">{label}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Section 5: Activate ──────────────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 text-center md:p-10">
            <button
              type="button"
              onClick={() => setMissionCreated(true)}
              className="mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-headline-md font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <span>⚡</span>
              Start AI Search Mission
            </button>
            <p className="mt-4 text-body-md font-body-md text-on-surface-variant">
              Live AI scanning will be available in a future platform release.
            </p>
          </section>

          {missionCreated && (
            <section className="dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-6 md:p-8" aria-live="polite">
              <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Mission Created</p>
              <h2 className="mt-2 text-headline-lg font-headline-lg text-on-surface">AI Search Mission Created</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Mission Name</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{missionName}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Status</p>
                  <p className="mt-2 text-body-md font-body-md text-primary">Active</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Monitoring Frequency</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{selectedFrequency}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Search Sources</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{PHASE_ONE_SOURCES.join(', ')}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110"
                >
                  Return to Dealer Command Centre
                </Link>
                <Link
                  to="/opportunity"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary"
                >
                  View AI Buying Report
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </PlatformShell>
  )
}
