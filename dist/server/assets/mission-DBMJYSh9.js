const MISSION_STORAGE_KEY = "tica_active_mission";
const MISSION_COUNTER_KEY = "tica_mission_counter";
const MISSION_STAGES = [
  "Mission Created",
  "Searching",
  "Analysing",
  "Ranking",
  "Report Ready"
];
const DEMO_STAGE_SCHEDULE = [
  {
    stage: "Mission Created",
    stageIndex: 0,
    startSeconds: 0,
    endSeconds: 4,
    progressStart: 0,
    progressEnd: 5,
    aiActivity: "Mission accepted. Awaiting AI validation.",
    status: "Mission Created"
  },
  {
    stage: "Searching",
    stageIndex: 1,
    startSeconds: 4,
    endSeconds: 13,
    progressStart: 5,
    progressEnd: 45,
    aiActivity: "Scanning marketplace sources across the UK.",
    status: "Running"
  },
  {
    stage: "Analysing",
    stageIndex: 2,
    startSeconds: 13,
    endSeconds: 22,
    progressStart: 45,
    progressEnd: 72,
    aiActivity: "Analysing vehicle history and market pricing.",
    status: "Running"
  },
  {
    stage: "Ranking",
    stageIndex: 3,
    startSeconds: 22,
    endSeconds: 30,
    progressStart: 72,
    progressEnd: 92,
    aiActivity: "Ranking opportunities by profit potential.",
    status: "Running"
  },
  {
    stage: "Report Ready",
    stageIndex: 4,
    startSeconds: 30,
    endSeconds: Infinity,
    progressStart: 92,
    progressEnd: 100,
    aiActivity: "Analysis complete. Buying report ready.",
    status: "Completed"
  }
];
function validateMissionInput(input) {
  const errors = [];
  const hasVehicleInfo = input.vehicleType !== "" || input.make.trim() !== "" || input.model.trim() !== "";
  if (!hasVehicleInfo) {
    errors.push({
      field: "vehicleType",
      message: "Select a vehicle type or enter a make / model to continue."
    });
  }
  if (!input.budget || Number(input.budget) <= 0) {
    errors.push({
      field: "budget",
      message: "Enter a budget so your AI knows the maximum purchase price."
    });
  }
  if (!input.buyingPriority) {
    errors.push({
      field: "buyingPriority",
      message: "Choose a buying priority so your AI knows how to rank results."
    });
  }
  return errors;
}
function generateMissionId() {
  const BASE = 1042;
  let counter = BASE;
  try {
    const stored = localStorage.getItem(MISSION_COUNTER_KEY);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      counter = isNaN(parsed) ? BASE : parsed + 1;
    }
    localStorage.setItem(MISSION_COUNTER_KEY, String(counter));
  } catch {
  }
  return `MSN-${counter}`;
}
function createMission(input) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    missionId: generateMissionId(),
    createdAt: now,
    lastUpdated: now,
    dealerName: "Demo Dealer",
    vehicleType: input.vehicleType,
    vehicleRequirements: {
      make: input.make,
      model: input.model,
      yearFrom: input.yearFrom,
      yearTo: input.yearTo,
      maxMileage: input.maxMileage,
      fuelType: input.fuelType,
      transmission: input.transmission,
      serviceHistory: input.serviceHistory
    },
    budget: input.budget,
    targetProfit: input.targetProfit,
    searchArea: "United Kingdom",
    buyingPriority: input.buyingPriority,
    selectedMarketplaces: input.selectedMarketplaces,
    notificationPreferences: input.notificationPreferences,
    searchFrequency: input.searchFrequency,
    status: "Mission Created",
    progress: 0,
    currentStage: MISSION_STAGES[0],
    currentStageIndex: 0,
    currentAiActivity: "Mission accepted. Awaiting AI validation.",
    estimatedTimeRemaining: "Calculating…",
    aiConfidence: "Pending"
  };
}
function getMissionStageIndex(stageName) {
  const idx = MISSION_STAGES.indexOf(stageName);
  return idx >= 0 ? idx : 0;
}
function saveMission(mission) {
  try {
    localStorage.setItem(MISSION_STORAGE_KEY, JSON.stringify(mission));
  } catch {
  }
}
function loadMission() {
  try {
    const raw = localStorage.getItem(MISSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      lastUpdated: parsed.createdAt ?? (/* @__PURE__ */ new Date()).toISOString(),
      currentStageIndex: getMissionStageIndex(parsed.currentStage ?? ""),
      currentAiActivity: "Mission accepted. Awaiting AI validation.",
      estimatedTimeRemaining: "—",
      searchFrequency: "Every 30 minutes",
      ...parsed
    };
  } catch {
    return null;
  }
}
function computeMissionProgress(mission) {
  const elapsedSeconds = (Date.now() - new Date(mission.createdAt).getTime()) / 1e3;
  const entry = DEMO_STAGE_SCHEDULE.find(
    (s) => elapsedSeconds >= s.startSeconds && elapsedSeconds < s.endSeconds
  ) ?? DEMO_STAGE_SCHEDULE[DEMO_STAGE_SCHEDULE.length - 1];
  let progress;
  if (entry.endSeconds === Infinity) {
    progress = entry.progressEnd;
  } else {
    const stageDuration = entry.endSeconds - entry.startSeconds;
    const stageElapsed = Math.max(0, elapsedSeconds - entry.startSeconds);
    const t = Math.min(stageElapsed / stageDuration, 1);
    progress = Math.round(entry.progressStart + (entry.progressEnd - entry.progressStart) * t);
  }
  let estimatedTimeRemaining;
  if (entry.stage === "Report Ready") {
    estimatedTimeRemaining = "—";
  } else {
    const lastEntry = DEMO_STAGE_SCHEDULE[DEMO_STAGE_SCHEDULE.length - 1];
    const secondsLeft = Math.max(0, lastEntry.startSeconds - elapsedSeconds);
    estimatedTimeRemaining = secondsLeft > 0 ? `~${Math.ceil(secondsLeft)}s` : "—";
  }
  return {
    ...mission,
    currentStage: entry.stage,
    currentStageIndex: entry.stageIndex,
    progress,
    status: entry.status,
    currentAiActivity: entry.aiActivity,
    estimatedTimeRemaining,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
  };
}
export {
  MISSION_STAGES as M,
  computeMissionProgress as a,
  createMission as c,
  loadMission as l,
  saveMission as s,
  validateMissionInput as v
};
