import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/opportunity')({
  component: OpportunityPage,
})

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS'

const VEHICLE_OPPORTUNITY_ID = 'TCA-2026-00421'

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function OpportunityPage() {
  const keyMetrics = [
    { label: 'Confidence', value: '97%' },
    { label: 'Opportunity Score', value: '97 / 100' },
    { label: 'Estimated Retail Value', value: '£36,250' },
    { label: 'Estimated Gross Profit', value: '£4,255' },
    { label: 'Demand Rating', value: '★★★★★' },
  ]

  const vehicleInfo = [
    { label: 'Mileage', value: '47,820 miles' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Fuel', value: 'Petrol' },
    { label: 'Colour', value: 'Black Sapphire' },
    { label: 'Owners', value: '2 previous owners' },
    { label: 'Location', value: 'Manchester' },
    { label: 'Seller Type', value: 'Independent dealer' },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-8 text-on-surface sm:px-6 md:px-10">
      <div className="mx-auto w-full max-w-container-max space-y-6">
        <header className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6">
          {/* Logo + Return to Dashboard row */}
          <div className="flex items-center justify-between gap-4">
            <div className="logo-bezel w-36 rounded-lg p-1 sm:w-44">
              <img src={LOGO_SRC} alt="Trade In Cars Agent Logo" className="h-auto w-full object-contain logo-blend" />
            </div>
            <a
              href="/dashboard"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary"
            >
              Return to Dashboard
            </a>
          </div>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-4 flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant">
            <a href="/dashboard" className="transition-colors hover:text-primary">
              Dealer Command Centre
            </a>
            <ChevronRightIcon />
            <span className="text-on-surface">AI Buying Report</span>
          </nav>

          {/* Page title + Opportunity ID */}
          <div className="mt-3 space-y-1">
            <h1 className="text-headline-lg font-headline-lg text-primary">AI Buying Report</h1>
            <p className="text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant">
              Vehicle Opportunity ID: <span className="font-semibold text-on-surface">{VEHICLE_OPPORTUNITY_ID}</span>
            </p>
          </div>
        </header>

        <section className="dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Buying Verdict</h2>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/50 bg-primary-container px-8 py-8 text-center lg:min-w-[220px]">
              <span className="text-4xl">🟢</span>
              <p className="text-[42px] font-bold leading-none tracking-tight text-on-primary-container sm:text-[56px]">BUY NOW</p>
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <div className="rounded-xl border border-primary/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Confidence</p>
                  <p className="mt-1 text-body-lg font-semibold text-primary">97%</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Risk Level</p>
                  <p className="mt-1 text-body-lg font-semibold text-[#4ade80]">LOW</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Est. Gross Profit</p>
                  <p className="mt-1 text-body-md font-semibold text-on-surface">£4,255</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center">
                  <p className="text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant">Days to Sell</p>
                  <p className="mt-1 text-body-md font-semibold text-on-surface">9 Days</p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center rounded-2xl border border-outline-variant/30 bg-surface-container-high px-6 py-6">
              <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
                "This vehicle currently represents one of today's strongest buying opportunities based on market pricing, dealer demand and
                estimated resale margin. We recommend reviewing vehicle history and service records before proceeding."
              </p>
            </div>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-high p-5 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant">Target Vehicle</p>
              <h2 className="mt-3 text-headline-lg font-headline-lg text-on-surface">BMW M3 Competition</h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-lg font-body-lg text-on-surface">
                <span>2022</span>
                <span className="text-primary">£31,995</span>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-primary-container p-5 sm:p-6">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.2em] text-on-primary-container/80">AI Verdict</p>
              <p className="mt-4 text-[56px] font-semibold leading-none text-on-primary-container sm:text-[72px]">BUY</p>
            </div>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {keyMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                <dt className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">{metric.label}</dt>
                <dd className="mt-2 text-body-lg font-body-lg text-on-surface">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="text-headline-md font-headline-md text-on-surface">AI Opportunity Analysis</h2>
          <p className="mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant">
            This M3 Competition presents a strong margin profile with high market demand, stable retail velocity, and a purchase price
            positioned well below projected forecourt value. The pricing spread and demand indicators support a confident stock turn
            opportunity for premium performance inventory.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Buying Checklist</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">✅</span>
                <span className="text-body-md font-body-md text-on-surface">Market Price</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#4ade80]">Excellent Value</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">✅</span>
                <span className="text-body-md font-body-md text-on-surface">Estimated Profit</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#4ade80]">High Profit Potential</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🟡</span>
                <span className="text-body-md font-body-md text-on-surface">Vehicle History</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#facc15]">History Check Recommended</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🟡</span>
                <span className="text-body-md font-body-md text-on-surface">MOT History</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#facc15]">Review Required</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🟡</span>
                <span className="text-body-md font-body-md text-on-surface">Service History</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#facc15]">Verify Records</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🟢</span>
                <span className="text-body-md font-body-md text-on-surface">Mileage</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#86efac]">Appears Consistent</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🟢</span>
                <span className="text-body-md font-body-md text-on-surface">Seller Profile</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-[#86efac]">Trusted Listing</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔵</span>
                <span className="text-body-md font-body-md text-on-surface">Estimated Days to Sell</span>
              </div>
              <div className="text-right">
                <p className="text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant">Estimate</p>
                <p className="mt-0.5 text-body-sm font-body-sm text-primary">9 Days</p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-body-sm font-body-sm text-on-surface-variant/70 italic">
            Complete vehicle history, MOT and verification services will be available through trusted data providers in a future release.
          </p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">AI Negotiation Advice</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Suggested Opening Offer</p>
              <p className="mt-2 text-body-lg font-semibold text-on-surface">£30,750</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Likely Acceptance Range</p>
              <p className="mt-2 text-body-lg font-semibold text-on-surface">£31,250–£31,750</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Negotiation Confidence</p>
              <p className="mt-2 text-body-lg font-semibold text-primary">84%</p>
            </div>
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant">Negotiation Advice</p>
              <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                "This vehicle has been advertised for 18 days. Similar vehicles have recently sold below asking price. There may be room to
                negotiate."
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button
              disabled
              className="cursor-not-allowed rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant/50 opacity-50"
            >
              Future Feature: Simulate Deal
            </button>
            <p className="text-body-sm font-body-sm text-on-surface-variant/60 italic">
              Interactive deal simulation will be available in a future release.
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">AI Buying Summary</h2>
          <div className="rounded-xl border border-primary/30 bg-primary-container/20 px-6 py-5">
            <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant">
              This opportunity has been ranked as a <span className="font-semibold text-on-surface">BUY</span> because the asking price is below current market value, dealer demand is strong, and estimated resale margins are above average. Before purchasing, we recommend confirming MOT history, service records and vehicle history.
            </p>
          </div>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
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

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-3 text-headline-md font-headline-md text-on-surface">Vehicle History &amp; MOT Checks</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Powered by trusted vehicle data providers.</p>
          <p className="mt-2 text-body-md font-body-md text-primary">Status: Available soon.</p>
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-surface">Dealer Notes</h2>
          <textarea
            placeholder="Add internal notes, call outcomes, valuation observations, and next actions..."
            className="h-40 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60"
          />
        </section>

        <section className="dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8">
          <h2 className="mb-5 text-headline-md font-headline-md text-on-surface">Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <button className="rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110">
              Save Opportunity
            </button>
            <button className="rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Ignore
            </button>
            <button className="rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Contact Seller
            </button>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface"
            >
              Return to Dashboard
            </a>
            <button className="rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface">
              Explain Why
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
