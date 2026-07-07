import { useEffect, useRef, useState } from 'react'

const TICA_SHIELD_SRC = 'https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f'

export function TicaShield() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="TICA Trusted Buying AI trust mark"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center gap-1.5 rounded-xl p-1 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60"
      >
        <img
          src={TICA_SHIELD_SRC}
          alt="TICA Trusted Buying AI shield"
          className="h-auto w-12 sm:w-16 md:w-20"
          decoding="async"
        />
        <span className="text-center text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant/70">
          Trusted AI
        </span>
      </button>

      {open ? (
        <div
          role="tooltip"
          className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-zinc-900/90 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src={TICA_SHIELD_SRC}
              alt="TICA Trusted Buying AI shield"
              className="h-auto w-28"
              decoding="async"
            />
            <div>
              <p className="text-sm font-bold tracking-wide text-white">TICA Trusted Buying AI</p>
              <p className="mt-1.5 text-xs text-zinc-400">Recommends. You Decide.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
