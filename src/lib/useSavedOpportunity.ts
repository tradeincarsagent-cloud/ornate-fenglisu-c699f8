// ── useSavedOpportunity ───────────────────────────────────────────────────────
// React hook that tracks whether a specific opportunity is saved, and exposes
// save / remove helpers. State is persisted to localStorage and survives reload.

import { useCallback, useEffect, useState } from 'react'
import {
  type SavedOpportunity,
  isOpportunitySaved,
  saveOpportunity,
  removeSavedOpportunity,
} from './savedOpportunities'

export function useSavedOpportunity(id: string | undefined) {
  const [saved, setSaved] = useState(false)

  // Initialise from localStorage after mount (SSR safe)
  useEffect(() => {
    if (!id) return
    setSaved(isOpportunitySaved(id))
  }, [id])

  const save = useCallback(
    (opportunity: SavedOpportunity) => {
      if (!id) return
      saveOpportunity(opportunity)
      setSaved(true)
    },
    [id],
  )

  const remove = useCallback(() => {
    if (!id) return
    removeSavedOpportunity(id)
    setSaved(false)
  }, [id])

  return { saved, save, remove }
}
