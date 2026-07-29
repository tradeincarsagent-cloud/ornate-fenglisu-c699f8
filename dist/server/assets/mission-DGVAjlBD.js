const MISSION_STORAGE_KEY = "tica_active_mission";
const MISSION_COUNTER_KEY = "tica_mission_counter";
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
  return {
    missionId: generateMissionId(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
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
    status: "Mission Created",
    progress: 0,
    currentStage: "Mission Received",
    aiConfidence: "Pending"
  };
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
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
export {
  createMission as c,
  loadMission as l,
  saveMission as s,
  validateMissionInput as v
};
