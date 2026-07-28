import { createFileRoute } from '@tanstack/react-router'
import { PublicInfoCloseButton } from '@/components/PublicInfoCloseButton'

export const Route = createFileRoute('/cookie-policy')({
  component: CookiePolicyPage,
})

function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <section className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20">
        <PublicInfoCloseButton />
        <div className="space-y-3">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">Legal</span>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-primary">Cookie Policy</h1>
        </div>

        <article className="space-y-6 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Trade in Cars Agent (TICA) uses cookies and similar technologies to improve your experience, enhance platform performance and better understand how our website is used.
          </p>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">What Are Cookies?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Cookies are small text files stored on your device that help websites remember information such as your preferences and browsing activity.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">How We Use Cookies</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">We use cookies to:</p>
            <ul className="space-y-1 pl-4 font-body-md text-body-md text-on-surface-variant">
              <li>• Keep you signed in to your account.</li>
              <li>• Remember your preferences and settings.</li>
              <li>• Improve website performance and reliability.</li>
              <li>• Analyse anonymous website traffic and usage.</li>
              <li>• Enhance security and protect user accounts.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Third-Party Services</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Some trusted third-party services used by TICA, such as analytics, payment providers and hosting services, may also use cookies where necessary to deliver their services.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Managing Cookies</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Most web browsers allow you to control or disable cookies through your browser settings. Please note that disabling certain cookies may affect how parts of the TICA platform function.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Our Commitment</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Trade in Cars Agent (TICA) is committed to using cookies responsibly and only where they improve the security, functionality and performance of the platform.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-title-md text-title-md text-on-surface">Contact</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              If you have any questions regarding our Cookie Policy, please contact:{' '}
              <a href="mailto:tradeincarsagent@gmail.com" className="text-primary hover:opacity-85 transition-all">
                tradeincarsagent@gmail.com
              </a>
            </p>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Our goal is to provide a secure, transparent and professional AI-powered platform that respects your privacy while delivering the best possible experience.
          </p>
        </article>

      </section>
    </main>
  )
}
