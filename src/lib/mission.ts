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
  'Searching',
  'Analysing',
  'Ranking',
  'Report Ready',
] as const

// ── Demo Progress Schedule ───────────────────────────────────────────────────
// Each entry defines when a stage becomes active (elapsedSeconds since createdAt),
// the progress % at its start and end, and the AI activity message shown while active.

export const DEMO_STAGE_SCHEDULE: Array<{
  stage: MissionStage
  stageIndex: number
  startSeconds: number
  endSeconds: number
  progressStart: number
  progressEnd: number
  aiActivity: string
  status: string
}> = [
  {
    stage: 'Mission Created',
    stageIndex: 0,
    startSeconds: 0,
    endSeconds: 4,
    progressStart: 0,
    progressEnd: 5,
    aiActivity: 'Mission accepted. Awaiting AI validation.',
    status: 'Mission Created',
  },
  {
    stage: 'Searching',
    stageIndex: 1,
    startSeconds: 4,
    endSeconds: 13,
    progressStart: 5,
    progressEnd: 45,
    aiActivity: 'Scanning marketplace sources across the UK.',
    status: 'Running',
  },
  {
    stage: 'Analysing',
    stageIndex: 2,
    startSeconds: 13,
    endSeconds: 22,
    progressStart: 45,
    progressEnd: 72,
    aiActivity: 'Analysing vehicle history and market pricing.',
    status: 'Running',
  },
  {
    stage: 'Ranking',
    stageIndex: 3,
    startSeconds: 22,
    endSeconds: 30,
    progressStart: 72,
    progressEnd: 92,
    aiActivity: 'Ranking opportunities by profit potential.',
    status: 'Running',
  },
  {
    stage: 'Report Ready',
    stageIndex: 4,
    startSeconds: 30,
    endSeconds: Infinity,
    progressStart: 92,
    progressEnd: 100,
    aiActivity: 'Analysis complete. Buying report ready.',
    status: 'Completed',
  },
]

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
  searchFrequency: string
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
  searchFrequency: string
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
    searchFrequency: input.searchFrequency,
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
      searchFrequency: 'Every 30 minutes',
      ...parsed,
    } as TicaMission
  } catch {
    return null
  }
}

/**
 * Compute the current stage, progress, and AI activity for a mission based on
 * how much time has elapsed since it was created.
 * Returns an updated copy of the mission — does not mutate the original.
 * This is deterministic: calling it twice at the same time yields the same result.
 */
export function computeMissionProgress(mission: TicaMission): TicaMission {
  const elapsedSeconds = (Date.now() - new Date(mission.createdAt).getTime()) / 1000

  // Find the current schedule entry
  const entry = DEMO_STAGE_SCHEDULE.find(
    (s) => elapsedSeconds >= s.startSeconds && elapsedSeconds < s.endSeconds,
  ) ?? DEMO_STAGE_SCHEDULE[DEMO_STAGE_SCHEDULE.length - 1]

  // Interpolate progress within the stage
  let progress: number
  if (entry.endSeconds === Infinity) {
    progress = entry.progressEnd
  } else {
    const stageDuration = entry.endSeconds - entry.startSeconds
    const stageElapsed = Math.max(0, elapsedSeconds - entry.startSeconds)
    const t = Math.min(stageElapsed / stageDuration, 1)
    progress = Math.round(entry.progressStart + (entry.progressEnd - entry.progressStart) * t)
  }

  // Estimate time remaining (only show when not yet complete)
  let estimatedTimeRemaining: string
  if (entry.stage === 'Report Ready') {
    estimatedTimeRemaining = '—'
  } else {
    const lastEntry = DEMO_STAGE_SCHEDULE[DEMO_STAGE_SCHEDULE.length - 1]
    const secondsLeft = Math.max(0, lastEntry.startSeconds - elapsedSeconds)
    estimatedTimeRemaining = secondsLeft > 0 ? `~${Math.ceil(secondsLeft)}s` : '—'
  }

  return {
    ...mission,
    currentStage: entry.stage,
    currentStageIndex: entry.stageIndex,
    progress,
    status: entry.status,
    currentAiActivity: entry.aiActivity,
    estimatedTimeRemaining,
    lastUpdated: new Date().toISOString(),
  }
}
