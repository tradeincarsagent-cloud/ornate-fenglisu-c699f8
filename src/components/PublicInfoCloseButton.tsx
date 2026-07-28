import { useNavigate } from '@tanstack/react-router'

function isSameOriginReferrer() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.referrer) {
    return false
  }

  try {
    return new URL(document.referrer).origin === window.location.origin
  } catch {
    return false
  }
}

export function PublicInfoCloseButton() {
  const navigate = useNavigate()

  const handleClose = () => {
    if (typeof window === 'undefined') {
      void navigate({ to: '/' })
      return
    }

    const stateIndex = typeof window.history.state?.__TSR_index === 'number' ? window.history.state.__TSR_index : 0
    const canGoBack = window.history.length > 1 && (stateIndex > 0 || isSameOriginReferrer())

    if (canGoBack) {
      window.history.back()
      return
    }

    void navigate({ to: '/' })
  }

  return (
    <button
      aria-label="Close page"
      className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-surface-container-high text-primary shadow-[0_10px_22px_rgba(0,0,0,0.32)] transition-all hover:bg-primary hover:text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:right-6 md:top-6"
      onClick={handleClose}
      type="button"
    >
      <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  )
}
