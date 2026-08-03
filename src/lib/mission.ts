// ── Mission Model ────────────────────────────────────────────────────────────
// Shared data structure and helper functions for TICA AI Search Missions.
// Storage is currently localStorage; replace saveMission/loadMission to swap
// in a backend API without touching any other code.

export const MISSION_STORAGE_KEY = 'tica_active_mission'
const MISSION_COUNTER_KEY = 'tica_mission_counter'

// ── Mission Stages ───────────────────────────────────────────────────────────
// Single source of truth for all 8 canonical TICA mission stages.
// Pages should import this constant rather than defining their own stage lists.

export const MISSION_STAGES = [
  'Mission Created',
  'AI Validation',
  'Source Connection',
  'Market Search',
  'Opportunity Analysis',
  'Buying Report Generation',
  'Dealer Notification',
  'Completed',
] as const

export type MissionStage = (typeof MISSION_STAGES)[number]

// ── Types ────────────────────────────────────────────────────────────────────

export interface TicaMissionVehicleRequirements {
  make: string
  model: string
  yearFrom: string
  yearTo: string
  maxMileage: string
  fuelType: string
  transmission: string
  serviceHistory: string
}

export interface TicaMission {
  missionId: string
  createdAt: string
  lastUpdated: string
  dealerName: string
  vehicleType: string
  vehicleRequirements: TicaMissionVehicleRequirements
  budget: string
  targetProfit: string
  searchArea: string
  buyingPriority: string
  selectedMarketplaces: string[]
  notificationPreferences: string[]
  /** High-level mission status label, e.g. "Mission Created", "Running", "Completed". */
  status: string
  /** 0–100 progress percentage. */
  progress: number
  /** Name of the current pipeline stage — must be one of MISSION_STAGES. */
  currentStage: string
  /** Current stage index (0-based) within MISSION_STAGES. */
  currentStageIndex: number
  /** Short description of what the AI is doing right now. */
  currentAiActivity: string
  /** Human-readable time remaining, e.g. "~2 min", "Calculating…", "—". */
  estimatedTimeRemaining: string
  aiConfidence: string
}

export type ValidationField = 'vehicleType' | 'budget' | 'buyingPriority'

export interface ValidationError {
  field: ValidationField
  message: string
}

export interface MissionInput {
  vehicleType: string
  make: string
  model: string
  yearFrom: string
  yearTo: string
  maxMileage: string
  fuelType: string
  transmission: string
  serviceHistory: string
  budget: string
  targetProfit: string
  buyingPriority: string
  notificationPreferences: string[]
  selectedMarketplaces: string[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Validate the mission input fields.
 * Returns an array of errors; empty array means the input is valid.
 */
export function validateMissionInput(input: MissionInput): ValidationError[] {
  const errors: ValidationError[] = []

  const hasVehicleInfo =
    input.vehicleType !== '' ||
    input.make.trim() !== '' ||
    input.model.trim() !== ''

  if (!hasVehicleInfo) {
    errors.push({
      field: 'vehicleType',
      message: 'Select a vehicle type or enter a make / model to continue.',
    })
  }

  if (!input.budget || Number(input.budget) <= 0) {
    errors.push({
      field: 'budget',
      message: 'Enter a budget so your AI knows the maximum purchase price.',
    })
  }

  if (!input.buyingPriority) {
    errors.push({
      field: 'buyingPriority',
      message: 'Choose a buying priority so your AI knows how to rank results.',
    })
  }

  return errors
}

/**
 * Generate a unique mission ID in the format MSN-XXXX.
 * The counter is persisted in localStorage so IDs increase across sessions.
 */
export function generateMissionId(): string {
  const BASE = 1042
  let counter = BASE
  try {
    const stored = localStorage.getItem(MISSION_COUNTER_KEY)
    if (stored !== null) {
      const parsed = parseInt(stored, 10)
      counter = isNaN(parsed) ? BASE : parsed + 1
    }
    localStorage.setItem(MISSION_COUNTER_KEY, String(counter))
  } catch {
    // localStorage unavailable — use base value
  }
  return `MSN-${counter}`
}

/**
 * Build a TicaMission object from validated form input.
 * Uses fixed initial values for status, progress, stage and confidence.
 */
export function createMission(input: MissionInput): TicaMission {
  const now = new Date().toISOString()
  return {
    missionId: generateMissionId(),
    createdAt: now,
    lastUpdated: now,
    dealerName: 'Demo Dealer',
    vehicleType: input.vehicleType,
    vehicleRequirements: {
      make: input.make,
      model: input.model,
      yearFrom: input.yearFrom,
      yearTo: input.yearTo,
      maxMileage: input.maxMileage,
      fuelType: input.fuelType,
      transmission: input.transmission,
      serviceHistory: input.serviceHistory,
    },
    budget: input.budget,
    targetProfit: input.targetProfit,
    searchArea: 'United Kingdom',
    buyingPriority: input.buyingPriority,
    selectedMarketplaces: input.selectedMarketplaces,
    notificationPreferences: input.notificationPreferences,
    status: 'Mission Created',
    progress: 0,
    currentStage: MISSION_STAGES[0],
    currentStageIndex: 0,
    currentAiActivity: 'Mission accepted. Awaiting AI validation.',
    estimatedTimeRemaining: 'Calculating…',
    aiConfidence: 'Pending',
  }
}

/**
 * Return the 0-based index of a stage name within MISSION_STAGES.
 * Returns 0 if the stage name is not found (defaults to first stage).
 */
export function getMissionStageIndex(stageName: string): number {
  const idx = (MISSION_STAGES as readonly string[]).indexOf(stageName)
  return idx >= 0 ? idx : 0
}

/**
 * Persist a mission to localStorage.
 * Replace this function body to swap in a backend API call.
 */
export function saveMission(mission: TicaMission): void {
  try {
    localStorage.setItem(MISSION_STORAGE_KEY, JSON.stringify(mission))
  } catch {
    // localStorage unavailable
  }
}

/**
 * Load the stored mission from localStorage.
 * Applies forward-compatible defaults for fields added after v1.
 * Returns null when no mission has been saved or storage is unavailable.
 * Replace this function body to swap in a backend API call.
 */
export function loadMission(): TicaMission | null {
  try {
    const raw = localStorage.getItem(MISSION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<TicaMission> & Pick<TicaMission, 'missionId'>
    // Forward-compatibility: fill in any fields added by the Mission Engine v1
    return {
      lastUpdated: parsed.createdAt ?? new Date().toISOString(),
      currentStageIndex: getMissionStageIndex(parsed.currentStage ?? ''),
      currentAiActivity: 'Mission accepted. Awaiting AI validation.',
      estimatedTimeRemaining: '—',
      ...parsed,
    } as TicaMission
  } catch {
    return null
  }
}
