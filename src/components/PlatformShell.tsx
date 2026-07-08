import { Link } from '@tanstack/react-router'
import { type ReactNode, useEffect, useState } from 'react'

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS'

type PlatformNavItem = {
  label: string
  href?: string
  active?: boolean
  disabled?: boolean
  isSectionLabel?: boolean
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function PlatformNav({ items, onNavigate }: { items: PlatformNavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="space-y-2">
      {items.map((item, index) => {
        if (item.isSectionLabel) {
          return (
            <p
              key={`section-${index}`}
              className="mt-4 mb-1 px-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant/50"
            >
              {item.label}
            </p>
          )
        }

        if (item.disabled) {
          return (
            <div
              key={item.href ?? item.label}
              className="flex items-center justify-between rounded-lg border border-transparent px-4 py-3 text-body-md font-body-md text-on-surface-variant/40 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              <span>{item.label}</span>
              <span className="ml-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant/50">
                Coming Soon
              </span>
            </div>
          )
        }

        if (item.active) {
          return (
            <div key={item.href} className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary">
              {item.label}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            to={item.href!}
            onClick={onNavigate}
            className="block rounded-lg border border-transparent px-4 py-3 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-primary/20 hover:bg-surface-container-high hover:text-on-surface"
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function PlatformShell({ children, navItems }: { children: ReactNode; navItems: PlatformNavItem[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="platform-shell bg-background text-on-surface">
      {sidebarOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside
            id="mobile-sidebar"
            className="platform-shell-drawer fixed inset-y-0 left-0 z-50 flex w-[min(20rem,86vw)] flex-col overflow-y-auto border-r border-outline-variant/25 bg-surface-container-low px-5 lg:hidden"
            aria-label="Navigation menu"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mb-8">
              <div className="logo-bezel rounded-lg p-1">
                <img src={LOGO_SRC} alt="Trade In Cars Agent Logo" className="h-auto w-full object-contain logo-blend" />
              </div>
            </div>
            <PlatformNav items={navItems} onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </>
      ) : null}

      <div className="platform-shell-layout mx-auto flex w-full max-w-container-max lg:min-h-screen">
        <aside className="hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col">
          <div className="mb-8">
            <div className="logo-bezel rounded-lg p-1">
              <img src={LOGO_SRC} alt="Trade In Cars Agent Logo" className="h-auto w-full object-contain logo-blend" />
            </div>
          </div>
          <PlatformNav items={navItems} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="platform-shell-header border-b border-outline-variant/25 bg-surface-container px-5 py-4 md:px-10">
            <div className="relative flex items-center lg:hidden">
              <div className="mx-auto logo-bezel w-40 rounded-lg p-1 sm:w-44">
                <img src={LOGO_SRC} alt="Trade In Cars Agent Logo" className="h-auto w-full object-contain logo-blend" />
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="absolute right-0 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container-high"
                aria-label="Open navigation menu"
                aria-expanded={sidebarOpen}
                aria-controls="mobile-sidebar"
              >
                <HamburgerIcon />
              </button>
            </div>
            <p className="hidden text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant lg:block">
              Trade In Cars Agent
            </p>
          </header>

          <main className="platform-shell-main flex-1 overflow-x-clip px-5 py-8 md:px-10">{children}</main>
          <footer className="platform-shell-footer border-t border-outline-variant/25 bg-surface-container-low px-5 py-4 md:px-10">
            <div className="mx-auto flex w-full max-w-container-max flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-body-sm font-body-sm text-on-surface">Trade in Cars Agent</p>
                <p className="text-xs text-on-surface-variant">Version 1.0 Beta</p>
                <p className="text-xs text-on-surface-variant">
                  System Status: <span className="text-on-surface">🟢 Operational</span>
                </p>
              </div>
              <nav aria-label="Application footer links" className="flex flex-nowrap items-center gap-0 text-xs text-on-surface-variant sm:gap-2">
                <a href="#" className="px-2 py-2 transition-colors hover:text-primary sm:rounded-lg sm:border sm:border-outline-variant/20 sm:bg-surface-container-high/45 sm:px-3">Support</a>
                <span className="text-on-surface-variant/30 sm:hidden" aria-hidden="true">|</span>
                <a href="#" className="px-2 py-2 transition-colors hover:text-primary sm:rounded-lg sm:border sm:border-outline-variant/20 sm:bg-surface-container-high/45 sm:px-3">Privacy</a>
                <span className="text-on-surface-variant/30 sm:hidden" aria-hidden="true">|</span>
                <a href="#" className="px-2 py-2 transition-colors hover:text-primary sm:rounded-lg sm:border sm:border-outline-variant/20 sm:bg-surface-container-high/45 sm:px-3">Terms</a>
                <span className="text-on-surface-variant/30 sm:hidden" aria-hidden="true">|</span>
                <a href="#" className="px-2 py-2 transition-colors hover:text-primary sm:rounded-lg sm:border sm:border-outline-variant/20 sm:bg-surface-container-high/45 sm:px-3">Contact</a>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
