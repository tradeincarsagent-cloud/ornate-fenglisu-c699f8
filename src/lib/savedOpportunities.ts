// ── Saved Opportunities ───────────────────────────────────────────────────────
// Helpers for persisting dealer-saved opportunities to localStorage.
// Structured for future Watchlist / Saved Opportunities page compatibility.
// Storage key: 'tica_saved_opportunities'

export const SAVED_OPPORTUNITIES_KEY = 'tica_saved_opportunities'

export interface SavedOpportunity {
  /** Stable identifier — derived from missionId (the report's unique key). */
  id: string
  missionId: string
  make: string
  model: string
  vehicleName: string
  vehicleType: string
  yearDisplay: string
  maxMileageDisplay: string
  fuelType: string
  transmission: string
  searchArea: string
  askingPrice: string
  retailValue: string
  projectedProfit: string
  aiVerdict: string
  confidence: string
  opportunityScore: number
  dateSaved: string // ISO 8601
}

function load(): SavedOpportunity[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(SAVED_OPPORTUNITIES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist(items: SavedOpportunity[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(SAVED_OPPORTUNITIES_KEY, JSON.stringify(items))
  } catch {
    // Silently ignore quota errors
  }
}

export function loadSavedOpportunities(): SavedOpportunity[] {
  return load()
}

export function isOpportunitySaved(id: string): boolean {
  return load().some((o) => o.id === id)
}

export function saveOpportunity(opportunity: SavedOpportunity): void {
  const existing = load()
  // Prevent duplicates — replace if already present
  const filtered = existing.filter((o) => o.id !== opportunity.id)
  persist([opportunity, ...filtered])
}

export function removeSavedOpportunity(id: string): void {
  const existing = load()
  persist(existing.filter((o) => o.id !== id))
}
