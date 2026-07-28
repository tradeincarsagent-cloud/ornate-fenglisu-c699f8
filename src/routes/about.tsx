import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Company</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg">About Trade in Cars Agent (TICA)</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Built for Dealers. Powered by AI. Focused on Finding Better Vehicles.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Trade in Cars Agent (TICA) is an AI-powered vehicle sourcing platform built exclusively for independent vehicle dealers.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">Our mission is simple.</p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Help dealers spend less time searching, reduce buying risk, and uncover more profitable opportunities through intelligent automation.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Rather than replacing the dealer, TICA works alongside them as a 24-hour AI buying assistant, continuously analysing markets, identifying opportunities, monitoring pricing, and learning how every dealership prefers to buy vehicles.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We believe the future of vehicle sourcing isn't about searching harder—it's about finding smarter.
          </p>
        </div>

        <div className="space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <h2 className="font-headline-md text-headline-md">OUR VISION</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            To become the world's most trusted AI operating system for independent vehicle dealers.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Every recommendation made by TICA is designed to save time, improve buying decisions, increase profitability, and give dealers a genuine competitive advantage in an increasingly fast-moving market.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">This is only the beginning.</p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            As TICA continues to evolve, new AI capabilities, intelligent sourcing tools, Trade Outs™, dealer collaboration features and marketplace integrations will continue to transform the way dealerships discover, evaluate and purchase vehicles.
          </p>
          <p className="font-headline-md text-headline-md md:text-headline-lg font-bold text-on-surface">The Future Doesn't Search. It Finds.</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Welcome to the next generation of AI-powered vehicle sourcing.</p>
        </div>

        <div>
          <Link className="font-body-md text-body-md text-primary hover:opacity-85 transition-all" to="/">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
