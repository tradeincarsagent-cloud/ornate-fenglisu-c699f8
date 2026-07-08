import { useEffect, useRef, useState } from 'react'

const TICA_SHIELD_SRC = 'https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f'

/**
 * TicaShield — TICA Certified™ official trust mark.
 *
 * Shared component used on every authenticated page.
 * The popup uses position:fixed to avoid being clipped by overflow-x-hidden ancestors.
 * The shield aligns naturally with the right edge of the page content grid.
 *
 * Blue brand glow behaviour:
 *   • Stronger permanent ambient outer glow (brand blue #1493ff) — clearly visible at all times.
 *   • Slow repeating blue pulse until the user opens the popup for the first time.
 *   • After first open: pulse stops; steady ambient glow remains.
 *   • Hover / tap: glow brightens smoothly, certification popup fades in.
 *   • On close: returns to ambient (or steady, if already opened) glow.
 */
export function TicaShield() {
  const [open, setOpen] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; right: number; left?: number } | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Compute fixed popup position from button bounding rect
  const updatePopupPos = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const safeTop = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-safe-area-top')) || 0
    const horizontalGap = 12
    const popupWidth = Math.min(441, window.innerWidth - horizontalGap * 2)
    const preferredRight = Math.max(horizontalGap, window.innerWidth - rect.right)
    const maxRight = Math.max(horizontalGap, window.innerWidth - popupWidth - horizontalGap)
    const clampedRight = Math.min(preferredRight, maxRight)
    const nextTop = Math.max(rect.bottom + 8, safeTop + 8)

    setPopupPos({
      top: nextTop,
      right: clampedRight,
    })
  }

  const handleOpen = () => {
    updatePopupPos()
    setOpen(true)
    setHasOpened(true)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    handleOpen()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const handleWindowChange = () => updatePopupPos()
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setIsHovered(false)
      }
    }
    window.addEventListener('resize', handleWindowChange)
    window.addEventListener('scroll', handleWindowChange, { passive: true })
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      window.removeEventListener('resize', handleWindowChange)
      window.removeEventListener('scroll', handleWindowChange)
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-label="TICA Certified trust mark"
        aria-expanded={open}
        onClick={() => {
          if (!open) {
            handleOpen()
          } else {
            setOpen(false)
          }
        }}
        className="flex min-h-11 min-w-11 flex-col items-center gap-1 rounded-xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60"
      >
        {/* Blue brand glow — wraps the shield image only */}
        <div className={[
          'tica-shield-glow',
          !hasOpened && !isHovered ? 'tica-shield-pulsing' : '',
          isHovered ? 'tica-shield-hovered' : '',
        ].join(' ').trim()}>
          {/* w-14 sm:w-[4.5rem] md:w-24 — consistent size across all authenticated pages */}
          <img
            src={TICA_SHIELD_SRC}
            alt="TICA Certified shield"
            className="block h-auto w-12 sm:w-[4.5rem] md:w-24"
            decoding="async"
          />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="tica-certified-text text-center text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant/80">
            TICA Certified™
          </span>
        </div>
      </button>

      {/* Premium glass certification popup — fixed positioning avoids overflow-hidden parent clipping */}
      {popupPos && (
        <div
          role="tooltip"
          aria-hidden={!open}
          style={{ top: popupPos.top, right: popupPos.right, left: popupPos.left }}
          className={[
            'tica-popup',
            'fixed z-[9999] w-[min(22rem,calc(100vw-1.5rem))] sm:w-[22rem] md:w-[441px]',
            'rounded-2xl sm:rounded-3xl border border-white/10',
            'bg-zinc-900/90 backdrop-blur-xl',
            'shadow-[0_20px_64px_rgba(0,0,0,0.75)]',
            'p-4 sm:p-8',
            open ? 'tica-popup--visible' : 'tica-popup--hidden',
          ].join(' ')}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            <img
              src={TICA_SHIELD_SRC}
              alt="TICA Certified shield"
              className="h-auto w-28 sm:w-44"
              decoding="async"
            />
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-base font-bold tracking-wide text-white">🛡 TICA Certified™</p>
              <p className="text-[12px] text-zinc-400 leading-snug">Powered by the TICA Decision Engine</p>
              <p className="text-[12px] font-semibold text-primary/90 tracking-wide">Recommends. You Decide.</p>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Every TICA Certified recommendation has been analysed using the TICA Opportunity Intelligence Engine and
              TICA Decision Engine to help dealers make informed buying decisions.
            </p>
            <div className="w-full rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                Official Trust Mark · Trade in Cars Agent
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
