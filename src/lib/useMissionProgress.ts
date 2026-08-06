// ── useMissionProgress ────────────────────────────────────────────────────────
// React hook that loads the active mission from localStorage and auto-advances
// it through the demo stage schedule using timed polling.
// The hook saves updates back to localStorage so every page reflects the same
// live state even after a hard-reload.

import { useEffect, useState } from 'react'
import { computeMissionProgress, loadMission, saveMission, type TicaMission } from './mission'

const POLL_INTERVAL_MS = 1000

export interface MissionProgressResult {
  /** The active mission, or null when none has been saved. */
  mission: TicaMission | null
  /**
   * True after the first localStorage check has completed on the client.
   * Use this to distinguish "not yet checked" from "checked, no mission"
   * and avoid flashing an empty state during hydration.
   */
  initialized: boolean
}

export function useMissionProgress(): MissionProgressResult {
  const [mission, setMission] = useState<TicaMission | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Initial load + compute
    const initial = loadMission()
    if (initial) {
      const computed = computeMissionProgress(initial)
      setMission(computed)
      saveMission(computed)
    }
    // Mark as initialized after the first localStorage check
    setInitialized(true)

    // Poll every second so progress advances smoothly
    const id = window.setInterval(() => {
      const current = loadMission()
      if (!current) return
      const computed = computeMissionProgress(current)
      setMission((prev) => {
        // Only update state (and trigger re-render) when something meaningful changed
        if (
          prev &&
          prev.progress === computed.progress &&
          prev.currentStage === computed.currentStage
        ) {
          return prev
        }
        return computed
      })
      // Always persist the latest computed state
      saveMission(computed)
    }, POLL_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [])

  return { mission, initialized }
}
