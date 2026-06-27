import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-headline-lg font-headline-lg text-primary mb-1">
          Dealer Command Centre
        </h1>
        <p className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
          Development Preview
        </p>
        <p className="text-body-md font-body-md text-on-surface-variant mb-8">
          This page is under construction.
        </p>

        <div className="bg-surface-container-high rounded-xl p-6 max-w-xs">
          <p className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-3">
            Today's Best Opportunity
          </p>
          <p className="text-headline-md font-headline-md text-on-surface">
            BMW M3 Competition
          </p>
          <p className="text-headline-lg font-headline-lg text-primary mt-1">
            £31,995
          </p>
        </div>
      </div>
    </div>
  )
}
