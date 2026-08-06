const MISSION_STORAGE_KEY = "tica_active_mission";
const MISSION_COUNTER_KEY = "tica_mission_counter";
const MISSION_STAGES = [
  "Mission Created",
  "AI Validation",
  "Source Connection",
  "Market Search",
  "Opportunity Analysis",
  "Buying Report Generation",
  "Dealer Notification",
  "Completed"
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
export {
  MISSION_STAGES as M,
  createMission as c,
  loadMission as l,
  saveMission as s,
  validateMissionInput as v
};
