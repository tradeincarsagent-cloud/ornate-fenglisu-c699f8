import { createFileRoute } from '@tanstack/react-router'
import { PublicInfoCloseButton } from '@/components/PublicInfoCloseButton'

export const Route = createFileRoute('/support')({
  component: SupportPage,
})

function SupportPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <PublicInfoCloseButton />
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Company</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-primary">Support</h1>
        </div>

        <div className="space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <h2 className="font-headline-md text-headline-md text-primary">Need Assistance?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Email: tradeincarsagent@gmail.com
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Include your dealership name and a brief issue summary so we can route your request quickly.
          </p>
        </div>

      </section>
    </main>
  )
}
