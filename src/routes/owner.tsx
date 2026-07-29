import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'

export const Route = createFileRoute('/owner')({
  component: OwnerPage,
})

// ─── Types ────────────────────────────────────────────────────────────────────

type KpiTone = 'default' | 'accent' | 'warning' | 'success' | 'critical'

type KpiCard = {
  label: string
  value: string
  detail: string
  icon: string
  tone: KpiTone
}

type CustomerRow = {
  name: string
  plan: string
  status: 'Trial' | 'Subscriber' | 'Churned'
  joined: string
  lastActive: string
  missions: number
}

type MissionRow = {
  id: string
  dealer: string
  make: string
  budget: string
  status: 'Running' | 'Paused' | 'Completed'
  found: number
  lastHit: string
}

type AlertRow = {
  level: 'info' | 'warning' | 'critical'
  title: string
  detail: string
  time: string
}

type SupportRow = {
  id: string
  dealer: string
  subject: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Open' | 'In Progress' | 'Resolved'
  created: string
}

// ─── Demo data ─────────────────────────────────────────────────────────────────

const kpiCards: KpiCard[] = [
  { label: 'Total Dealers', value: '142', detail: '+8 this month', icon: '🏢', tone: 'default' },
  { label: 'Active Trials', value: '31', detail: '12 expire in 7 days', icon: '🧪', tone: 'warning' },
  { label: 'Active Subscribers', value: '94', detail: '66% conversion rate', icon: '✅', tone: 'success' },
  { label: 'Active Search Missions', value: '218', detail: 'Across all dealers', icon: '🎯', tone: 'accent' },
  { label: 'Opportunities Found Today', value: '1,047', detail: '↑ 12% vs yesterday', icon: '💡', tone: 'accent' },
  { label: 'AI Searches Running', value: '34', detail: 'Live right now', icon: '⚙️', tone: 'default' },
  { label: 'Support Requests', value: '7', detail: '3 awaiting reply', icon: '💬', tone: 'warning' },
  { label: 'System Health', value: '100%', detail: 'All systems operational', icon: '🟢', tone: 'success' },
]

const customerRows: CustomerRow[] = [
  { name: 'Apex Motors Leeds', plan: 'Pro', status: 'Subscriber', joined: '14 Jan 2025', lastActive: 'Today', missions: 12 },
  { name: 'Premier Auto Group', plan: 'Pro', status: 'Subscriber', joined: '02 Feb 2025', lastActive: 'Today', missions: 8 },
  { name: 'Silverstone Prestige', plan: 'Starter', status: 'Trial', joined: '22 Jul 2025', lastActive: 'Yesterday', missions: 3 },
  { name: 'North Star Cars', plan: 'Pro', status: 'Subscriber', joined: '09 Mar 2025', lastActive: '2 days ago', missions: 17 },
  { name: 'City Drive Manchester', plan: 'Starter', status: 'Trial', joined: '25 Jul 2025', lastActive: 'Today', missions: 2 },
  { name: 'Westgate Motors', plan: 'Pro', status: 'Subscriber', joined: '18 Apr 2025', lastActive: 'Today', missions: 9 },
  { name: 'Pinnacle Automotive', plan: 'Starter', status: 'Churned', joined: '11 May 2025', lastActive: '14 days ago', missions: 0 },
]

const missionRows: MissionRow[] = [
  { id: 'MSN-1042', dealer: 'Apex Motors Leeds', make: 'BMW M3 / M4', budget: '£45,000', status: 'Running', found: 4, lastHit: '4 min ago' },
  { id: 'MSN-1038', dealer: 'North Star Cars', make: 'Porsche Macan', budget: '£55,000', status: 'Running', found: 2, lastHit: '11 min ago' },
  { id: 'MSN-1031', dealer: 'Premier Auto Group', make: 'Audi RS5 / RS6', budget: '£60,000', status: 'Running', found: 7, lastHit: '23 min ago' },
  { id: 'MSN-1019', dealer: 'Westgate Motors', make: 'Mercedes C63', budget: '£40,000', status: 'Paused', found: 1, lastHit: '2 hrs ago' },
  { id: 'MSN-0998', dealer: 'City Drive Manchester', make: 'VW Golf R', budget: '£28,000', status: 'Running', found: 3, lastHit: '1 min ago' },
]

const alertRows: AlertRow[] = [
  { level: 'info', title: 'AI Batch Scan Completed', detail: 'Nightly scan of 94 active dealer feeds completed successfully.', time: '06:00 today' },
  { level: 'warning', title: 'Trial Expiry — 12 Dealers', detail: '12 trial accounts expire within 7 days. Consider automated reminder.', time: '06:00 today' },
  { level: 'info', title: 'New Dealer Onboarded', detail: 'City Drive Manchester completed onboarding and activated first mission.', time: 'Yesterday' },
  { level: 'warning', title: 'Formspree Quota at 78%', detail: 'Lead form submissions approaching monthly quota. Monitor usage.', time: '2 days ago' },
  { level: 'critical', title: 'Mission Failure — MSN-0982', detail: 'Auto Trader API throttled for dealer Pinnacle Automotive. Mission paused.', time: '3 days ago' },
]

const supportRows: SupportRow[] = [
  { id: 'SUP-0091', dealer: 'Apex Motors Leeds', subject: 'Cannot find export button for opportunities', priority: 'Medium', status: 'In Progress', created: 'Today' },
  { id: 'SUP-0090', dealer: 'Silverstone Prestige', subject: 'How do I add a second search mission?', priority: 'Low', status: 'Open', created: 'Today' },
  { id: 'SUP-0088', dealer: 'North Star Cars', subject: 'Opportunity score not matching expected range', priority: 'High', status: 'Open', created: 'Yesterday' },
  { id: 'SUP-0085', dealer: 'Premier Auto Group', subject: 'Request to update notification email address', priority: 'Low', status: 'Resolved', created: '3 days ago' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

const toneBorder: Record<KpiTone, string> = {
  default: 'border-outline-variant/30',
  accent: 'border-primary/30',
  warning: 'border-amber-400/30',
  success: 'border-emerald-400/30',
  critical: 'border-red-400/30',
}

const toneLabel: Record<KpiTone, string> = {
  default: 'text-on-surface-variant',
  accent: 'text-primary/90',
  warning: 'text-amber-400',
  success: 'text-emerald-400',
  critical: 'text-red-400',
}

const toneValue: Record<KpiTone, string> = {
  default: 'text-on-surface',
  accent: 'text-primary',
  warning: 'text-amber-300',
  success: 'text-emerald-300',
  critical: 'text-red-300',
}

function KpiCardBlock({ card }: { card: KpiCard }) {
  return (
    <article
      className={`rounded-2xl border ${toneBorder[card.tone]} bg-surface-container-high/70 p-4 shadow-[0_4px_20px_rgba(2,6,23,0.22)] backdrop-blur-sm transition-shadow hover:shadow-[0_6px_28px_rgba(2,6,23,0.32)]`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${toneLabel[card.tone]}`}>{card.label}</p>
        <span className="text-lg" aria-hidden="true">{card.icon}</span>
      </div>
      <p className={`mt-2 text-3xl font-bold ${toneValue[card.tone]}`}>{card.value}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{card.detail}</p>
    </article>
  )
}

const statusBadgeCustomer: Record<CustomerRow['status'], string> = {
  Trial: 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  Subscriber: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25',
  Churned: 'bg-red-400/15 text-red-300 border-red-400/25',
}

const statusBadgeMission: Record<MissionRow['status'], string> = {
  Running: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25',
  Paused: 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  Completed: 'bg-primary/15 text-primary border-primary/25',
}

const statusBadgeSupport: Record<SupportRow['status'], string> = {
  Open: 'bg-red-400/15 text-red-300 border-red-400/25',
  'In Progress': 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  Resolved: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25',
}

const alertLevelStyle: Record<AlertRow['level'], { border: string; icon: string; title: string }> = {
  info: { border: 'border-primary/25 bg-primary/5', icon: 'ℹ️', title: 'text-primary' },
  warning: { border: 'border-amber-400/30 bg-amber-400/5', icon: '⚠️', title: 'text-amber-300' },
  critical: { border: 'border-red-400/30 bg-red-400/5', icon: '🔴', title: 'text-red-300' },
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-high/80 shadow-[0_8px_32px_rgba(2,6,23,0.22)] backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-3 border-b border-outline-variant/20 px-5 py-4 md:px-6">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <h2 className="text-body-md font-semibold text-on-surface">{title}</h2>
      </div>
      <div className="px-5 py-4 md:px-6">{children}</div>
    </section>
  )
}

function PlaceholderTableRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-outline-variant/15 bg-surface/30 p-3.5">
      <div className="h-2 w-2 rounded-full bg-primary/40" />
      <span className="text-sm text-on-surface-variant">{label}</span>
    </div>
  )
}

// ─── Live clock ───────────────────────────────────────────────────────────────

function LiveClock() {
  const [time, setTime] = useState(() => new Date())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let last = 0
    function tick(ts: number) {
      if (ts - last >= 1000) {
        setTime(new Date())
        last = ts
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <span className="tabular-nums text-on-surface text-sm font-medium">
      {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

function OwnerPage() {
  const [showBackTop, setShowBackTop] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShowBackTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { label: 'Dealer Command Centre', href: '/dashboard' },
    { label: 'AI Search Missions', href: '/search-builder' },
    { label: 'AI Buying Report', href: '/opportunity' },
    { label: 'Settings', isSectionLabel: true },
    { label: 'TICA Preferences', href: '/settings' },
    { label: 'Owner', isSectionLabel: true },
    { label: 'Owner Command Centre', href: '/owner', active: true },
    { label: 'Future Features', isSectionLabel: true },
    { label: 'Vehicle History & MOT', disabled: true },
    { label: 'Watchlist', disabled: true },
    { label: 'Subscription', disabled: true },
  ]

  return (
    <PlatformShell navItems={navItems}>
      <div className="mx-auto w-full max-w-container-max space-y-6 sm:space-y-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <header>
          <div className="mb-1 flex items-center gap-2">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Private</p>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
              Owner Only
            </span>
          </div>
          <div className="mb-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="text-headline-lg font-headline-lg text-primary">TICA Operations Centre</h1>
              <p className="mt-1 text-sm font-semibold text-on-surface md:text-body-md">
                Owner Dashboard — Jonathan Huber
              </p>
              <p className="mt-1 text-body-md font-body-md text-on-surface-variant">
                Managing the Trade in Cars Agent Platform
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-emerald-400/20 bg-surface-container-high/65 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/45 animate-pulse" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    TICA Live
                  </span>
                </div>
                <span className="hidden h-4 w-px bg-outline-variant/30 sm:block" aria-hidden="true" />
                <span className="text-sm text-on-surface-variant">All Systems Operational</span>
                <span className="hidden h-4 w-px bg-outline-variant/30 md:block" aria-hidden="true" />
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span className="uppercase tracking-[0.14em] text-[11px] font-semibold text-on-surface-variant/80">Local Time</span>
                  <LiveClock />
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-start md:justify-end">
              <TicaShield />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
            <span className="text-lg" aria-hidden="true">🔐</span>
            <p className="text-sm text-on-surface-variant">
              This page is restricted to TICA administrators. It is not linked from the public website or customer navigation.
            </p>
          </div>
        </header>

        {/* ── KPI Cards ──────────────────────────────────────────────── */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/60">Business Overview</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {kpiCards.map((card) => (
              <KpiCardBlock key={card.label} card={card} />
            ))}
          </div>
        </div>

        {/* ── Customer Management ────────────────────────────────────── */}
        <SectionCard title="Customer Management" icon="👥">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-on-surface-variant">142 registered dealers — 94 active subscribers · 31 on trial</p>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 rounded-xl border border-outline-variant/30 bg-surface/40 px-3 py-2 text-xs font-medium text-on-surface-variant opacity-60"
            >
              ＋ Invite Dealer <span className="text-[10px]">(coming soon)</span>
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/20">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container/60">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Dealer</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Plan</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Status</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Joined</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Last Active</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Missions</th>
                </tr>
              </thead>
              <tbody>
                {customerRows.map((row, i) => (
                  <tr
                    key={row.name}
                    className={`border-b border-outline-variant/10 transition-colors hover:bg-surface-container/40 ${i === customerRows.length - 1 ? 'border-0' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-on-surface">{row.name}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.plan}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeCustomer[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.joined}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.lastActive}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-on-surface">{row.missions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-on-surface-variant/60">Showing 7 of 142 dealers. Full CRM integration planned.</p>
        </SectionCard>

        {/* ── Mission Control ────────────────────────────────────────── */}
        <SectionCard title="Mission Control" icon="🎯">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-on-surface-variant">218 active missions across all dealers · 34 running live AI scans</p>
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">AI Engine Running</span>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/20">
            <table className="w-full min-w-[540px] text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container/60">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Mission ID</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Dealer</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Vehicle</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Budget</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Status</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Opps Found</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Last Hit</th>
                </tr>
              </thead>
              <tbody>
                {missionRows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-outline-variant/10 transition-colors hover:bg-surface-container/40 ${i === missionRows.length - 1 ? 'border-0' : ''}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-primary">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-on-surface">{row.dealer}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.make}</td>
                    <td className="px-4 py-3 tabular-nums text-on-surface-variant">{row.budget}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeMission[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-on-surface">{row.found}</td>
                    <td className="px-4 py-3 text-right text-on-surface-variant">{row.lastHit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-on-surface-variant/60">Showing top 5 of 218 active missions. Full mission management coming soon.</p>
        </SectionCard>

        {/* ── AI Operations ──────────────────────────────────────────── */}
        <SectionCard title="AI Operations" icon="⚙️">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-outline-variant/25 bg-surface/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">AI Engine Status</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                <p className="text-xl font-bold text-emerald-300">Operational</p>
              </div>
              <p className="mt-1 text-xs text-on-surface-variant">All scan workers healthy · 34 active threads</p>
            </article>
            <article className="rounded-xl border border-outline-variant/25 bg-surface/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">Vehicles Scanned Today</p>
              <p className="mt-2 text-xl font-bold text-on-surface">84,312</p>
              <p className="mt-1 text-xs text-on-surface-variant">Across Auto Trader, Motorway, dealer feeds</p>
            </article>
            <article className="rounded-xl border border-outline-variant/25 bg-surface/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">Opportunities Surfaced</p>
              <p className="mt-2 text-xl font-bold text-primary">1,047</p>
              <p className="mt-1 text-xs text-on-surface-variant">↑ 12% vs yesterday's 934</p>
            </article>
            <article className="rounded-xl border border-outline-variant/25 bg-surface/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">Avg Scan Latency</p>
              <p className="mt-2 text-xl font-bold text-on-surface">1.4s</p>
              <p className="mt-1 text-xs text-on-surface-variant">Target: &lt;2s · Last 24 hrs avg</p>
            </article>
            <article className="rounded-xl border border-outline-variant/25 bg-surface/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">AI Model</p>
              <p className="mt-2 text-xl font-bold text-on-surface">TICA-1</p>
              <p className="mt-1 text-xs text-on-surface-variant">Scoring v2.3 · Last retrained 14 Jul 2025</p>
            </article>
            <article className="rounded-xl border border-outline-variant/25 bg-surface/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">API Health</p>
              <div className="mt-2 space-y-1.5">
                {[
                  { name: 'Auto Trader', ok: true },
                  { name: 'Motorway', ok: true },
                  { name: 'Formspree', ok: true },
                ].map((api) => (
                  <div key={api.name} className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{api.name}</span>
                    <span className={`text-xs font-medium ${api.ok ? 'text-emerald-300' : 'text-red-300'}`}>{api.ok ? '🟢 OK' : '🔴 Down'}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <p className="mt-4 text-xs text-on-surface-variant/60">Real-time AI metrics integration planned. Values are demo data.</p>
        </SectionCard>

        {/* ── Opportunity Oversight ──────────────────────────────────── */}
        <SectionCard title="Opportunity Oversight" icon="💡">
          <div className="mb-4">
            <p className="text-sm text-on-surface-variant">Platform-wide view of high-value opportunities across all active dealers.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { vehicle: 'BMW M3 Competition 2020', dealer: 'Apex Motors Leeds', margin: '£3,200', score: '97%', source: 'Auto Trader' },
              { vehicle: 'Porsche Macan S 2021', dealer: 'North Star Cars', margin: '£4,100', score: '93%', source: 'Motorway' },
              { vehicle: 'Audi RS5 Sportback 2021', dealer: 'Premier Auto Group', margin: '£2,850', score: '91%', source: 'Auto Trader' },
              { vehicle: 'Mercedes C63 AMG 2022', dealer: 'Westgate Motors', margin: '£3,600', score: '89%', source: 'Dealer trade' },
              { vehicle: 'Range Rover Sport 2021', dealer: 'North Star Cars', margin: '£5,200', score: '88%', source: 'Fleet source' },
              { vehicle: 'VW Golf R 2023', dealer: 'City Drive Manchester', margin: '£1,420', score: '78%', source: 'Retail listing' },
            ].map((opp) => (
              <article key={opp.vehicle} className="rounded-xl border border-outline-variant/20 bg-surface/35 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/80">{opp.source}</p>
                <p className="mt-1 text-sm font-semibold text-on-surface">{opp.vehicle}</p>
                <p className="mt-0.5 text-xs text-on-surface-variant">{opp.dealer}</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider">Est. Margin</p>
                    <p className="text-base font-bold text-primary">{opp.margin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider">Score</p>
                    <p className="text-base font-bold text-emerald-300">{opp.score}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-on-surface-variant/60">Cross-dealer opportunity aggregation and filtering planned.</p>
        </SectionCard>

        {/* ── Support Centre ─────────────────────────────────────────── */}
        <SectionCard title="Support Centre" icon="💬">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-on-surface-variant">7 open requests · 3 awaiting reply</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
              ⚠️ 3 need attention
            </span>
          </div>
          <div className="space-y-2">
            {supportRows.map((row) => (
              <article key={row.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl border border-outline-variant/15 bg-surface/30 p-4 sm:grid-cols-[auto_1fr_auto_auto]">
                <p className="font-mono text-xs text-primary">{row.id}</p>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface">{row.subject}</p>
                  <p className="mt-0.5 text-xs text-on-surface-variant">{row.dealer} · {row.created}</p>
                </div>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeSupport[row.status]}`}>
                  {row.status}
                </span>
                <span className={`hidden sm:inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                  row.priority === 'High' ? 'border-red-400/25 bg-red-400/10 text-red-300' :
                  row.priority === 'Medium' ? 'border-amber-400/25 bg-amber-400/10 text-amber-300' :
                  'border-outline-variant/25 bg-surface/30 text-on-surface-variant'
                }`}>
                  {row.priority}
                </span>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-on-surface-variant/60">Full helpdesk integration and ticket management planned.</p>
        </SectionCard>

        {/* ── System Alerts ──────────────────────────────────────────── */}
        <SectionCard title="System Alerts" icon="🔔">
          <div className="space-y-3">
            {alertRows.map((alert, i) => {
              const style = alertLevelStyle[alert.level]
              return (
                <article key={i} className={`flex items-start gap-3 rounded-xl border ${style.border} p-4`}>
                  <span className="mt-0.5 text-base" aria-hidden="true">{style.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${style.title}`}>{alert.title}</p>
                    <p className="mt-0.5 text-xs text-on-surface-variant">{alert.detail}</p>
                  </div>
                  <p className="shrink-0 text-xs text-on-surface-variant/60">{alert.time}</p>
                </article>
              )
            })}
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant/50">Coming Soon</p>
            {[
              'Automated dealer health scoring',
              'AI failure alerts via webhook',
              'Daily digest email to owner',
            ].map((item) => (
              <PlaceholderTableRow key={item} label={item} />
            ))}
          </div>
        </SectionCard>

        {/* ── Back to top ────────────────────────────────────────────── */}
        {showBackTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface-container-high shadow-[0_4px_16px_rgba(2,6,23,0.4)] text-primary transition-all hover:bg-primary/10"
            aria-label="Back to top"
          >
            ↑
          </button>
        )}
      </div>
    </PlatformShell>
  )
}
