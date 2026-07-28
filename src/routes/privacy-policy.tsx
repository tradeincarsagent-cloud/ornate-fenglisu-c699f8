import { createFileRoute } from '@tanstack/react-router'
import { PublicInfoCloseButton } from '@/components/PublicInfoCloseButton'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <PublicInfoCloseButton />
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Legal</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-primary">Privacy Policy</h1>
        </div>

        <article className="space-y-8 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Trade in Cars Agent (TICA) respects your privacy and is committed to protecting your personal information.
          </p>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">Information We Collect</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              When you use TICA, we may collect information you choose to provide, including your name, email address, dealership details, account preferences and vehicle sourcing settings.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We may also collect technical information such as browser type, device information and anonymous website usage data to help improve the platform.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">How We Use Your Information</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Your information is used to:</p>
            <ul className="space-y-1 font-body-md text-body-md text-on-surface-variant list-none">
              <li>• Provide access to TICA services.</li>
              <li>• Personalise your AI buying experience.</li>
              <li>• Improve platform performance.</li>
              <li>• Respond to enquiries and support requests.</li>
              <li>• Send important account or service updates.</li>
            </ul>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We do not sell your personal information to third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">Data Security</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We take reasonable technical and organisational measures to protect your information from unauthorised access, misuse or disclosure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">Third-Party Services</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              TICA may use trusted third-party providers for services including payment processing, analytics, hosting and email delivery. These providers only receive information necessary to perform their services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">Cookies</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Our website may use cookies and similar technologies to improve your browsing experience and understand how the platform is used.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">Your Rights</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              You may request access to, correction of or deletion of your personal information by contacting us.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-title-lg text-title-lg text-on-surface">Contact</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              For any privacy-related questions, please contact:
            </p>
            <p className="font-body-md text-body-md">
              <a href="mailto:tradeincarsagent@gmail.com" className="text-primary hover:opacity-85 transition-all">
                tradeincarsagent@gmail.com
              </a>
            </p>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant border-t border-outline-variant/30 pt-6">
            We are committed to protecting your privacy while building the next generation of AI-powered vehicle sourcing tools for independent vehicle dealers.
          </p>
        </article>

      </section>
    </main>
  )
}
