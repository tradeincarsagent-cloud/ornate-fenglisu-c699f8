import { createFileRoute } from '@tanstack/react-router'
import { PublicInfoCloseButton } from '@/components/PublicInfoCloseButton'

export const Route = createFileRoute('/terms-of-service')({
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <PublicInfoCloseButton />
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Legal</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-primary">Terms of Service</h1>
        </div>

        <article className="space-y-8 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <div className="space-y-3">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Welcome to Trade in Cars Agent (TICA), the AI-powered vehicle sourcing platform built for independent vehicle dealers.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              By accessing or using the TICA platform, you agree to these Terms of Service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Use of the Platform</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              TICA is designed to assist vehicle dealers by providing AI-powered sourcing tools, market intelligence and buying recommendations. All buying decisions remain the responsibility of the user.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">User Accounts</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Users are responsible for maintaining the security of their account details and for all activity carried out under their account.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Acceptable Use</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Users agree not to misuse the platform, attempt unauthorised access, interfere with system performance or use TICA for unlawful activities.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">AI Recommendations</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              TICA provides intelligent recommendations based on available information, market analysis and user preferences. These recommendations are intended as decision-support tools and should not be regarded as guarantees of vehicle condition, value or future profitability.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Platform Availability</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We continually improve TICA and may update, modify or enhance features at any time to improve performance, reliability and user experience.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Limitation of Liability</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              While we strive to provide accurate and reliable information, Trade in Cars Agent (TICA) cannot guarantee the completeness or accuracy of third-party data and accepts no responsibility for business decisions made solely on platform recommendations.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Contact</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              For any questions regarding these Terms of Service, please contact:{' '}
              <a className="text-primary hover:opacity-85 transition-all" href="mailto:tradeincarsagent@gmail.com">
                tradeincarsagent@gmail.com
              </a>
            </p>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant border-t border-outline-variant/30 pt-6">
            By using Trade in Cars Agent (TICA), you acknowledge these Terms of Service and agree to use the platform responsibly, professionally and in accordance with applicable laws.
          </p>
        </article>

      </section>
    </main>
  )
}
