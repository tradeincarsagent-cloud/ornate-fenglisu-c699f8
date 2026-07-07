import { useEffect, useRef, useState } from 'react'

const TICA_SHIELD_SRC = 'https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f'

/**
 * TicaShield — TICA Certified™ official trust mark.
 *
 * Shared component used on every authenticated page.
 * The popup uses position:fixed to avoid being clipped by overflow-x-hidden ancestors.
 * The shield aligns naturally with the right edge of the page content grid.
 *
 * Desktop hover / mobile tap opens a premium glass-effect certification card.
 */
export function TicaShield() {
  const [open, setOpen] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; right: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Compute fixed position based on the button's bounding rect
  const updatePopupPos = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPopupPos({
      top: rect.bottom + 8,
      // right offset from viewport right edge
      right: window.innerWidth - rect.right,
    })
  }

  const handleOpen = () => {
    updatePopupPos()
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0"
      onMouseEnter={handleOpen}
      onMouseLeave={() => setOpen(false)}
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
        className="flex flex-col items-center gap-1.5 rounded-xl p-1 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60"
      >
        {/* w-14 sm:w-[4.5rem] md:w-24 — consistent size across all authenticated pages */}
        <img
          src={TICA_SHIELD_SRC}
          alt="TICA Certified shield"
          className="h-auto w-14 sm:w-[4.5rem] md:w-24"
          decoding="async"
        />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/80">
            TICA Certified™
          </span>
        </div>
      </button>

      {/* Premium glass certification popup — fixed positioning avoids overflow-hidden parent clipping */}
      {popupPos && (
        <div
          role="tooltip"
          aria-hidden={!open}
          style={{ top: popupPos.top, right: popupPos.right }}
          className={[
            'tica-popup',
            'fixed z-[9999] w-96 md:w-[441px]',
            'rounded-3xl border border-white/10',
            'bg-zinc-900/90 backdrop-blur-xl',
            'shadow-[0_20px_64px_rgba(0,0,0,0.75)]',
            'p-8',
            open ? 'tica-popup--visible' : 'tica-popup--hidden',
          ].join(' ')}
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src={TICA_SHIELD_SRC}
              alt="TICA Certified shield"
              className="h-auto w-44"
              decoding="async"
            />
            <div className="space-y-2">
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
