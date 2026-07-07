import { useCallback, useEffect, useRef, useState } from 'react'

const TICA_SHIELD_SRC = 'https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f'
const FIRST_VISIT_KEY = 'tica_shield_first_visit_v1'
const PULSE_INTERVAL_MS = 20_000

type PulseClass = '' | 'tica-shield-pulsing' | 'tica-shield-pulsing-triple'

/**
 * TicaShield — TICA Certified™ official trust mark.
 *
 * Shared component used on every authenticated page.
 * The popup uses position:fixed to avoid being clipped by overflow-x-hidden ancestors.
 * The shield aligns naturally with the right edge of the page content grid.
 *
 * Blue brand glow behaviour:
 *   • Always-on subtle outer glow (brand blue #1493ff).
 *   • First visit: three gentle pulses, then transitions to the regular cycle.
 *   • Regular cycle: one gentle pulse every 20 seconds.
 *   • Hover: glow brightens slightly, then the certification popup fades in.
 */
export function TicaShield() {
  const [open, setOpen] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; right: number } | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [pulseClass, setPulseClass] = useState<PulseClass>('')
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isFirstCycleRef = useRef(false)

  // Trigger a single pulse by clearing the class for one frame then re-applying it.
  const triggerPulse = useCallback((cls: PulseClass) => {
    setPulseClass('')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPulseClass(cls))
    })
  }, [])

  const startRegularCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => triggerPulse('tica-shield-pulsing'), PULSE_INTERVAL_MS)
  }, [triggerPulse])

  // Called when a pulse animation finishes — starts the regular 20 s cycle after first-visit triple.
  const handleGlowAnimationEnd = useCallback(() => {
    setPulseClass('')
    if (isFirstCycleRef.current) {
      isFirstCycleRef.current = false
      startRegularCycle()
    }
  }, [startRegularCycle])

  // First-visit detection & pulse scheduling
  useEffect(() => {
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY)
    if (!hasVisited) {
      localStorage.setItem(FIRST_VISIT_KEY, '1')
      isFirstCycleRef.current = true
      // Small initial delay so the page has settled before the pulses begin
      const t = setTimeout(() => triggerPulse('tica-shield-pulsing-triple'), 1500)
      return () => clearTimeout(t)
    }
    startRegularCycle()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startRegularCycle, triggerPulse])

  // Compute fixed popup position from button bounding rect
  const updatePopupPos = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPopupPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    })
  }

  const handleOpen = () => {
    updatePopupPos()
    setOpen(true)
  }

  const handleMouseEnter = () => {
    // Cancel any in-progress pulse so the hover glow takes over cleanly
    setPulseClass('')
    setIsHovered(true)
    handleOpen()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setIsHovered(false)
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
        className="flex flex-col items-center gap-1.5 rounded-xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60"
      >
        {/* Blue brand glow — wraps the shield image only */}
        <div
          className={['tica-shield-glow', pulseClass, isHovered ? 'tica-shield-hovered' : ''].join(' ')}
          onAnimationEnd={handleGlowAnimationEnd}
        >
          {/* w-14 sm:w-[4.5rem] md:w-24 — consistent size across all authenticated pages */}
          <img
            src={TICA_SHIELD_SRC}
            alt="TICA Certified shield"
            className="block h-auto w-14 sm:w-[4.5rem] md:w-24"
            decoding="async"
          />
        </div>
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
