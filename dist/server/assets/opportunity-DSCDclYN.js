import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-3vM7jPjM.js";
import { r as resolveBuyingReportMission, i as isBuyingReportReady, a as saveSelectedBuyingReportMissionId, b as MISSION_STAGES, d as ignoreMission } from "./mission-C3C9xkMh.js";
import { u as useMissionProgress } from "./useMissionProgress-B2nWtvA6.js";
import { R as Route } from "./router-Dohqr-fH.js";
import "react-dom";
const SAVED_OPPORTUNITIES_KEY = "tica_saved_opportunities";
function load() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_OPPORTUNITIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function persist(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_OPPORTUNITIES_KEY, JSON.stringify(items));
  } catch {
  }
}
function isOpportunitySaved(id) {
  return load().some((o) => o.id === id);
}
function saveOpportunity(opportunity) {
  const existing = load();
  const filtered = existing.filter((o) => o.id !== opportunity.id);
  persist([opportunity, ...filtered]);
}
function removeSavedOpportunity(id) {
  const existing = load();
  persist(existing.filter((o) => o.id !== id));
}
function useSavedOpportunity(id) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (!id) return;
    setSaved(isOpportunitySaved(id));
  }, [id]);
  const save = useCallback(
    (opportunity) => {
      if (!id) return;
      saveOpportunity(opportunity);
      setSaved(true);
    },
    [id]
  );
  const remove = useCallback(() => {
    if (!id) return;
    removeSavedOpportunity(id);
    setSaved(false);
  }, [id]);
  return { saved, save, remove };
}
function isSpecified(value) {
  const trimmed = value?.trim() ?? "";
  return trimmed !== "" && trimmed.toLowerCase() !== "any";
}
function getExecutiveSummaryValueClass(value) {
  const normalized = typeof value === "number" ? `${value}` : value.trim();
  const isNumeric = typeof value === "number" || /^£?\d[\d,]*(\.\d+)?%?$/.test(normalized);
  if (isNumeric || normalized.length <= 8) return "text-[18px] sm:text-[22px]";
  if (normalized.length <= 16) return "text-[14px] sm:text-[16px]";
  return "text-[12px] leading-snug sm:text-[13px]";
}
function formatMissionValue(value, fallback = "Awaiting live data") {
  return isSpecified(value) ? value.trim() : fallback;
}
function getFuelKind(fuelType) {
  const normalized = fuelType?.trim().toLowerCase() ?? "";
  if (normalized.includes("plug")) return "plugInHybrid";
  if (normalized.includes("mild")) return "mildHybrid";
  if (normalized.includes("hybrid")) return "hybrid";
  if (normalized.includes("electric")) return "electric";
  if (normalized.includes("diesel")) return "diesel";
  if (normalized.includes("petrol")) return "petrol";
  return "unknown";
}
function ChevronRightIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) });
}
function OpportunityPage() {
  const {
    mission: activeMission,
    initialized: missionInitialized
  } = useMissionProgress();
  const {
    missionId: requestedMissionId
  } = Route.useSearch();
  const navigate = useNavigate();
  const resolvedMission = useMemo(() => {
    if (!missionInitialized || typeof window === "undefined") return activeMission;
    return resolveBuyingReportMission({
      requestedMissionId,
      activeMission
    });
  }, [activeMission, missionInitialized, requestedMissionId]);
  useEffect(() => {
    if (!resolvedMission || !isBuyingReportReady(resolvedMission)) return;
    saveSelectedBuyingReportMissionId(resolvedMission.missionId);
  }, [resolvedMission]);
  const savedOpportunityId = resolvedMission?.missionId;
  const {
    saved: isOpportunitySaved2,
    save: doSaveOpportunity,
    remove: doRemoveOpportunity
  } = useSavedOpportunity(savedOpportunityId);
  const issueToneConfig = {
    info: {
      label: "Information",
      className: "tica-decision-buy",
      dotClassName: "bg-[var(--tica-decision-buy)]"
    },
    warning: {
      label: "Inspect Carefully",
      className: "tica-decision-review",
      dotClassName: "bg-[var(--tica-decision-review)]"
    },
    high: {
      label: "High Priority",
      className: "tica-decision-pass",
      dotClassName: "bg-[var(--tica-decision-pass)]"
    }
  };
  const checklistStatusConfig = {
    verified: {
      label: "Verified",
      className: "tica-decision-buy",
      dotClassName: "bg-[var(--tica-decision-buy)]"
    },
    check: {
      label: "Check Required",
      className: "tica-decision-review",
      dotClassName: "bg-[var(--tica-decision-review)]"
    },
    high: {
      label: "High Priority",
      className: "tica-decision-pass",
      dotClassName: "bg-[var(--tica-decision-pass)]"
    },
    notAvailable: {
      label: "Not Available Yet",
      className: "text-on-surface-variant",
      dotClassName: "bg-outline-variant"
    }
  };
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dotPulsing, setDotPulsing] = useState(true);
  const [meterAnimated, setMeterAnimated] = useState(false);
  const [meterGlowing, setMeterGlowing] = useState(false);
  const [showIgnoreConfirm, setShowIgnoreConfirm] = useState(false);
  const [showContactMessage, setShowContactMessage] = useState(false);
  const [showUnsaveConfirm, setShowUnsaveConfirm] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const missionReport = useMemo(() => {
    if (!resolvedMission) return null;
    const make = resolvedMission.vehicleRequirements?.make || "";
    const model = resolvedMission.vehicleRequirements?.model || "";
    const yearFrom = resolvedMission.vehicleRequirements?.yearFrom || "";
    const yearTo = resolvedMission.vehicleRequirements?.yearTo || "";
    const maxMileage = resolvedMission.vehicleRequirements?.maxMileage || "";
    const fuelType = resolvedMission.vehicleRequirements?.fuelType || "";
    const transmission = resolvedMission.vehicleRequirements?.transmission || "";
    const serviceHistory = resolvedMission.vehicleRequirements?.serviceHistory || "";
    const vehicleName = [make, model].filter(Boolean).join(" ") || resolvedMission.vehicleType || "Vehicle";
    const budgetNum = parseFloat(resolvedMission.budget) || 0;
    const targetProfitNum = parseFloat(resolvedMission.targetProfit) || 0;
    const askingPrice = budgetNum > 0 ? Math.round(budgetNum * 0.82) : 0;
    const retailValue = budgetNum > 0 ? Math.round(budgetNum * 1.28) : 0;
    const prepAllowance = budgetNum > 0 ? Math.round(budgetNum * 0.05) : 0;
    const projectedProfit = budgetNum > 0 ? Math.round(retailValue - askingPrice - prepAllowance) : 0;
    const recommendedOffer = askingPrice > 0 ? Math.round(askingPrice * 0.95) : 0;
    const purchaseRangeLow = recommendedOffer;
    const purchaseRangeHigh = askingPrice > 0 ? Math.round(askingPrice * 0.99) : 0;
    const walkAway = askingPrice;
    const projectedProfitHigh = projectedProfit > 0 ? projectedProfit + Math.round(targetProfitNum * 0.2) : 0;
    const formatGBP = (n) => n > 0 ? `£${n.toLocaleString("en-GB")}` : "Awaiting live data";
    const hasBudget = budgetNum > 0;
    const yearDisplay = isSpecified(yearFrom) && isSpecified(yearTo) ? yearFrom === yearTo ? yearFrom : `${yearFrom}–${yearTo}` : formatMissionValue(yearFrom || yearTo);
    const maxMileageDisplay = isSpecified(maxMileage) ? `Up to ${Number(maxMileage).toLocaleString("en-GB")} miles` : "Awaiting live data";
    return {
      vehicleName,
      make,
      model,
      missionId: resolvedMission.missionId,
      vehicleType: resolvedMission.vehicleType,
      yearDisplay,
      maxMileageDisplay,
      fuelType: formatMissionValue(fuelType),
      transmission: formatMissionValue(transmission),
      serviceHistory: formatMissionValue(serviceHistory, "Requires verification"),
      budget: resolvedMission.budget ? `Up to £${parseFloat(resolvedMission.budget).toLocaleString("en-GB")}` : "—",
      targetProfit: resolvedMission.targetProfit ? `£${parseFloat(resolvedMission.targetProfit).toLocaleString("en-GB")}+` : "—",
      searchArea: resolvedMission.searchArea || "—",
      buyingPriority: resolvedMission.buyingPriority || "—",
      budgetNum,
      targetProfitNum,
      retailValue,
      projectedProfit,
      askingPriceDisplay: formatGBP(askingPrice),
      retailValueDisplay: formatGBP(retailValue),
      projectedProfitDisplay: projectedProfit > 0 ? `${formatGBP(projectedProfit)}–${formatGBP(projectedProfitHigh)}` : "Awaiting live data",
      // Commercial decision — all derived from the same mission budget; never borrows from another vehicle
      commercialDecision: [{
        label: "Recommended Offer",
        value: hasBudget ? formatGBP(recommendedOffer) : "Awaiting live data",
        tone: "review"
      }, {
        label: "Expected Purchase Range",
        value: hasBudget ? `${formatGBP(purchaseRangeLow)}–${formatGBP(purchaseRangeHigh)}` : "Awaiting live data",
        tone: "default"
      }, {
        label: "Walk-Away Price",
        value: hasBudget ? formatGBP(walkAway) : "Awaiting live data",
        tone: "pass"
      }, {
        label: "Preparation Allowance",
        value: hasBudget ? formatGBP(prepAllowance) : "Awaiting live data",
        tone: "default"
      }, {
        label: "Estimated Retail Value",
        value: hasBudget ? formatGBP(retailValue) : "Awaiting live data",
        tone: "buy"
      }, {
        label: "Projected Gross Profit",
        value: projectedProfit > 0 ? `${formatGBP(projectedProfit)}–${formatGBP(projectedProfitHigh)}` : "Awaiting live data",
        tone: "buy"
      }],
      finalAdvice: hasBudget ? `Review ${vehicleName} against live vehicle history, service records and model-specific intelligence before negotiating. If those checks are satisfactory, begin negotiations at ${formatGBP(recommendedOffer)}.` : `Review ${vehicleName} only after live vehicle history, service records and model-specific intelligence have been verified.`
    };
  }, [resolvedMission]);
  const reportVehicleIntelligence = useMemo(() => {
    const vehicleName = missionReport?.vehicleName || "the active vehicle";
    const fuelType = resolvedMission?.vehicleRequirements?.fuelType;
    const fuelKind = getFuelKind(fuelType);
    const fuelLabel = formatMissionValue(fuelType, "Requires verification");
    const transmissionLabel = missionReport?.transmission || "Requires verification";
    const serviceHistoryLabel = missionReport?.serviceHistory || "Requires verification";
    const hasCommercialData = Boolean(missionReport && missionReport.retailValue > 0 && missionReport.projectedProfit > 0);
    const modelIssues = [{
      tone: "warning",
      title: `Awaiting live vehicle intelligence for ${vehicleName}.`,
      detail: "Awaiting live vehicle intelligence. Model-specific faults will appear when verified."
    }, {
      tone: "info",
      title: "Model-specific faults require verification.",
      detail: "Awaiting live vehicle intelligence. Model-specific faults will appear when verified."
    }];
    if (fuelKind === "diesel") {
      modelIssues.push({
        tone: "warning",
        title: "Diesel emissions systems require verification.",
        detail: "Awaiting live vehicle intelligence. Model-specific faults will appear when verified."
      });
    }
    if (fuelKind === "hybrid" || fuelKind === "plugInHybrid" || fuelKind === "mildHybrid" || fuelKind === "electric") {
      modelIssues.push({
        tone: "warning",
        title: "Electrified powertrain checks require verification.",
        detail: "Awaiting live vehicle intelligence. Model-specific faults will appear when verified."
      });
    }
    const mechanicalItems = [{
      label: fuelKind === "electric" ? "High-voltage system warning lights" : "Cold start / dashboard warning lights",
      status: "check"
    }, {
      label: "Fluid leaks or cooling-system issues",
      status: fuelKind === "electric" ? "notAvailable" : "check"
    }, {
      label: `${transmissionLabel === "Awaiting live data" ? "Transmission" : transmissionLabel} operation`,
      status: "check"
    }, {
      label: "Suspension, steering and brake feel",
      status: "check"
    }];
    if (fuelKind === "diesel") mechanicalItems.splice(1, 0, {
      label: "DPF / emissions warning lights",
      status: "check"
    });
    if (fuelKind === "hybrid" || fuelKind === "plugInHybrid" || fuelKind === "mildHybrid") {
      mechanicalItems.splice(1, 0, {
        label: "Hybrid system warning lights",
        status: "check"
      });
    }
    if (fuelKind === "electric") {
      mechanicalItems.splice(1, 0, {
        label: "Charging port and cable condition",
        status: "check"
      });
    }
    const inspectionAdviceByFuel = {
      petrol: "Focus on a clean cold start, warning lights, service evidence and general mechanical condition.",
      diesel: "Focus on a clean cold start, emissions warnings, service evidence and signs of DPF-related issues.",
      hybrid: "Focus on warning lights, smooth changeover between power sources, service evidence and battery-system health checks.",
      plugInHybrid: "Focus on warning lights, charging operation, service evidence and battery-system health checks.",
      mildHybrid: "Focus on warning lights, service evidence and correct operation of the electrified assist systems.",
      electric: "Focus on warning lights, charging equipment condition, battery-health evidence and brake / suspension condition.",
      unknown: "Focus on general condition, warning lights, service evidence and a full mechanical inspection."
    };
    const generalQuestions = [{
      id: 1,
      text: "Is the full service history available with supporting invoices or digital records?",
      priority: "high"
    }, {
      id: 2,
      text: "Are there any current warning lights, faults or advisories that the seller is aware of?",
      priority: "high"
    }, {
      id: 3,
      text: "Have all recalls, service campaigns and software updates been completed?",
      priority: "important"
    }, {
      id: 4,
      text: "Can the seller confirm the condition of both keys, handbook pack and locking-wheel key?",
      priority: "general"
    }, {
      id: 5,
      text: "Has the vehicle had any recent maintenance, repairs or parts replaced?",
      priority: "important"
    }];
    if (fuelKind === "diesel") {
      generalQuestions.push({
        id: 6,
        text: "Has the vehicle had any DPF, emissions or regeneration-related warnings?",
        priority: "important"
      });
    }
    if (fuelKind === "hybrid" || fuelKind === "plugInHybrid" || fuelKind === "mildHybrid") {
      generalQuestions.push({
        id: 6,
        text: "Have there been any hybrid-system warnings, battery repairs or charging issues?",
        priority: "important"
      });
    }
    if (fuelKind === "electric") {
      generalQuestions.push({
        id: 6,
        text: "Can the seller provide recent battery-health, charging or range evidence?",
        priority: "important"
      });
    }
    const recommendation = hasCommercialData ? "REVIEW" : "REVIEW";
    const confidence = hasCommercialData ? "Pending verification" : "Awaiting live data";
    return {
      modelIssues,
      inspectionChecklist: [{
        category: "Exterior",
        items: [{
          label: "Paint consistency",
          status: "check"
        }, {
          label: "Panel alignment",
          status: "check"
        }, {
          label: "Corrosion / rust inspection",
          status: "check"
        }, {
          label: "Glass and lighting",
          status: "check"
        }, {
          label: "Alloy wheel condition",
          status: "check"
        }, {
          label: "Tyre wear pattern",
          status: "high"
        }]
      }, {
        category: "Mechanical",
        items: mechanicalItems
      }, {
        category: "Interior",
        items: [{
          label: "Dashboard and infotainment operation",
          status: "check"
        }, {
          label: "Air conditioning / cabin comfort features",
          status: "check"
        }, {
          label: "Electrical equipment",
          status: "check"
        }, {
          label: "Seat wear versus mileage",
          status: "check"
        }, {
          label: "Spare key present",
          status: "check"
        }, {
          label: "Service book or digital record access",
          status: "check"
        }]
      }, {
        category: "Documentation",
        items: [{
          label: "VIN matches paperwork",
          status: "check"
        }, {
          label: "MOT history reviewed",
          status: "check"
        }, {
          label: `Service history (${serviceHistoryLabel})`,
          status: "high"
        }, {
          label: "Finance / write-off history check",
          status: "notAvailable"
        }, {
          label: "Recall status",
          status: "check"
        }, {
          label: "Owner history verification",
          status: "notAvailable"
        }]
      }],
      inspectionAdvice: `${inspectionAdviceByFuel[fuelKind]} Model-specific inspection advice for ${vehicleName} will appear only when live vehicle intelligence is available.`,
      dealerVerdict: {
        recommendation,
        confidence,
        strengths: [missionReport?.vehicleName ? `${missionReport.vehicleName} is the active vehicle for this report.` : "An active vehicle mission is required before vehicle-specific conclusions can be made.", hasCommercialData ? `Commercial figures are derived only from mission ${missionReport?.missionId}.` : "Commercial figures are waiting for active mission budget data.", `Fuel type on the active mission: ${fuelLabel}.`, "Hard-coded model-specific intelligence has been removed from this report."],
        verificationItems: [{
          label: "Live vehicle history provider check",
          tone: "high"
        }, {
          label: "Model-specific engine / variant intelligence",
          tone: "high"
        }, {
          label: "Service history and maintenance invoices",
          tone: "warning"
        }, {
          label: "Recall and campaign status",
          tone: "warning"
        }, {
          label: "Listing location and collection costs",
          tone: "warning"
        }],
        reasoning: [hasCommercialData ? `Commercial figures are available for ${vehicleName}, but they remain separate from missing vehicle-intelligence integrations.` : "Commercial figures are incomplete because active mission pricing inputs are still missing.", "Vehicle history checks have not yet been run through a live provider.", "Model-specific reliability and ownership intelligence is intentionally labelled as unavailable rather than inferred from another vehicle.", "A cautious review decision is maintained until those outstanding checks are complete."],
        recommendedActions: ["Run a live vehicle history check.", "Confirm service records before making an offer.", "Verify model-specific engine and recall intelligence."],
        finalAdvice: hasCommercialData ? `Review ${vehicleName} using the active report's commercial figures, then complete live vehicle history, service-record and model-specific checks before negotiating.` : `Complete the active mission details for ${vehicleName}, then run live vehicle history and model-specific verification before making a buying decision.`,
        summary: hasCommercialData ? `Commercial figures for ${vehicleName} are available, but live vehicle history and model-specific intelligence checks remain outstanding.` : `Vehicle-specific intelligence for ${vehicleName} is incomplete and still requires live data integration.`
      },
      runningCosts: [{
        label: "Typical Annual Service Cost",
        value: "Awaiting live data",
        tone: "info"
      }, {
        label: "Timing Belt / Chain",
        value: fuelKind === "electric" ? "Not applicable to current fuel type" : "Requires verification",
        tone: "warning"
      }, {
        label: "Insurance Group",
        value: "Awaiting live data",
        tone: "info"
      }, {
        label: "Fuel Economy",
        value: "Awaiting live data",
        tone: "info"
      }, {
        label: "Road Tax Band",
        value: "Awaiting live data",
        tone: "info"
      }, {
        label: "ULEZ Status",
        value: "Requires verification",
        tone: "info"
      }, {
        label: "Known High Cost Repairs",
        value: "Awaiting live vehicle intelligence",
        tone: "high"
      }, {
        label: "Dealer Demand Rating",
        value: "Awaiting live data",
        tone: "info"
      }, {
        label: "Typical Parts Availability",
        value: "Awaiting live data",
        tone: "info"
      }],
      ownershipRisk: {
        level: "Requires verification",
        tone: "review",
        description: "Live vehicle history, model-specific reliability data and confirmed listing details are still required before ownership risk can be rated confidently for this report."
      },
      sellerQuestions: {
        questions: generalQuestions,
        dealerTip: "Ask for photos or screenshots of supporting documents before travelling so the active report stays tied to verified evidence only."
      },
      vehicleHistory: [{
        status: "attention",
        icon: "💳",
        label: "Finance Check",
        value: "Live check required",
        detail: "No provider-backed finance result has been returned for this active report."
      }, {
        status: "attention",
        icon: "🚔",
        label: "Police Stolen Check",
        value: "Live check required",
        detail: "Theft status must be confirmed by a connected vehicle-history provider."
      }, {
        status: "attention",
        icon: "🛡",
        label: "Insurance Write-Off",
        value: "Live check required",
        detail: "Write-off status is not shown as verified until provider data is available."
      }, {
        status: "attention",
        icon: "📏",
        label: "Mileage Verification",
        value: "Requires verification",
        detail: "Mileage should be checked against MOT and history records once live integrations are connected."
      }, {
        status: "attention",
        icon: "🔎",
        label: "VIN Verification",
        value: "Requires verification",
        detail: "VIN and registration data have not yet been verified by a live provider."
      }, {
        status: "attention",
        icon: "⚠️",
        label: "Outstanding Recalls",
        value: "Manufacturer check required",
        detail: "Recall status is intentionally left unverified until live data is supplied."
      }, {
        status: "attention",
        icon: "👤",
        label: "Previous Owners",
        value: "Awaiting live data",
        detail: "Keeper history must come from a connected history source, not a reused demo vehicle."
      }, {
        status: "attention",
        icon: "🌍",
        label: "Import / Export Status",
        value: "Live check required",
        detail: "Provenance and import/export status still require provider-backed confirmation."
      }],
      locationSummary: [{
        icon: "📍",
        label: "Vehicle Location",
        value: "Awaiting live data"
      }, {
        icon: "🚗",
        label: "Distance",
        value: "Awaiting live data"
      }, {
        icon: "🕒",
        label: "Estimated Drive",
        value: "Awaiting live data"
      }, {
        icon: "⛽",
        label: "Estimated Fuel Cost",
        value: "Awaiting live data"
      }, {
        icon: "✈",
        label: "Nearest Airport",
        value: "Awaiting live data"
      }, {
        icon: "🚆",
        label: "Nearest Railway",
        value: "Awaiting live data"
      }],
      collectionSummary: [{
        label: "Collection difficulty",
        value: "Awaiting live data"
      }, {
        label: "Traffic risk",
        value: "Awaiting live data"
      }, {
        label: "Estimated transport cost",
        value: "Awaiting live data"
      }, {
        label: "Best collection day",
        value: "Awaiting live data"
      }],
      timeline: [{
        time: "09:02",
        message: `✓ Active report context loaded for ${vehicleName}.`
      }, {
        time: "09:04",
        message: "✓ Commercial decision recalculated from the active mission budget only."
      }, {
        time: "09:06",
        message: "⚠ Live vehicle history and model-specific intelligence still await verification."
      }, {
        time: "09:08",
        message: "🟡 REVIEW recommendation held until outstanding checks are completed."
      }],
      ranking: {
        title: "Verification-led review",
        detail: "Model-specific market demand and stock-turn ranking will appear once live vehicle intelligence is connected.",
        confidence,
        profitPotential: hasCommercialData ? "Mission-based estimate" : "Awaiting live data",
        marketDemand: "Awaiting live data",
        riskRating: "Verification required",
        daysToSell: "Awaiting live data"
      }
    };
  }, [missionReport, resolvedMission]);
  const vehicleInfo = useMemo(() => {
    if (!missionReport) {
      return [{
        label: "Make",
        value: "Awaiting active mission"
      }, {
        label: "Model",
        value: "Awaiting active mission"
      }, {
        label: "Fuel",
        value: "Awaiting active mission"
      }];
    }
    return [{
      label: "Make",
      value: formatMissionValue(missionReport.make)
    }, {
      label: "Model",
      value: formatMissionValue(missionReport.model)
    }, {
      label: "Year Target",
      value: missionReport.yearDisplay
    }, {
      label: "Fuel",
      value: missionReport.fuelType
    }, {
      label: "Transmission",
      value: missionReport.transmission
    }, {
      label: "Mileage Target",
      value: missionReport.maxMileageDisplay
    }, {
      label: "Service History",
      value: missionReport.serviceHistory
    }, {
      label: "Search Area",
      value: missionReport.searchArea || "Awaiting live data"
    }];
  }, [missionReport]);
  const unifiedRecommendation = reportVehicleIntelligence.dealerVerdict.recommendation;
  const unifiedConfidence = reportVehicleIntelligence.dealerVerdict.confidence;
  const normalizedDecisionAction = unifiedRecommendation;
  const isBuyVerdict = normalizedDecisionAction === "BUY";
  const isReviewVerdict = normalizedDecisionAction === "REVIEW";
  const isPassVerdict = normalizedDecisionAction === "PASS";
  const decisionVerdictClassName = isBuyVerdict ? "tica-decision-buy" : isReviewVerdict ? "tica-decision-review" : "tica-decision-pass";
  const decisionVerdictGlowClassName = isBuyVerdict ? "tica-decision-buy-glow" : "";
  const investigationTimeline = reportVehicleIntelligence.timeline;
  const ownershipRiskToneClass = reportVehicleIntelligence.ownershipRisk.tone === "buy" ? "tica-decision-buy" : reportVehicleIntelligence.ownershipRisk.tone === "review" ? "tica-decision-review" : "tica-decision-pass";
  const numericConfidence = Number.parseFloat(unifiedConfidence);
  const confidencePercent = Number.isFinite(numericConfidence) ? numericConfidence : unifiedRecommendation === "BUY" ? 75 : unifiedRecommendation === "REVIEW" ? 50 : 20;
  const meterZone = isBuyVerdict ? "buy" : isReviewVerdict ? "review" : "pass";
  const meterLabel = unifiedRecommendation;
  const meterSentence = reportVehicleIntelligence.dealerVerdict.summary;
  const [thinkingVisible, setThinkingVisible] = useState(true);
  const [thinkingExiting, setThinkingExiting] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [pageReady, setPageReady] = useState(false);
  const [statValues, setStatValues] = useState(null);
  const executiveConfidenceValue = Number.isFinite(numericConfidence) && statValues !== null ? `${statValues.confidence}%` : unifiedConfidence;
  const executiveProfitValue = statValues !== null ? `£${statValues.profit.toLocaleString("en-GB")}` : "—";
  const executiveRetailValue = statValues !== null ? `£${statValues.retail.toLocaleString("en-GB")}` : "—";
  const executiveScoreValue = statValues !== null && statValues.score > 0 ? statValues.score : "Awaiting live data";
  const executiveDaysValue = statValues !== null && statValues.days > 0 ? statValues.days : "Awaiting live data";
  const [timelineVisible, setTimelineVisible] = useState(0);
  const [badgeSweep, setBadgeSweep] = useState(false);
  const [heroImageIdx, setHeroImageIdx] = useState(0);
  const revealRefs = useRef([]);
  const setRevealRef = useCallback((i) => (el) => {
    revealRefs.current[i] = el;
  }, []);
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const thinkingSteps = ["Market Intelligence", "Vehicle History", "Pricing Model", "Profit Projection", "Risk Assessment", "Dealer Recommendation"];
  useEffect(() => {
    const timers = [];
    const stepDelay = 320;
    thinkingSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setThinkingStep(i + 1), 300 + i * stepDelay));
    });
    timers.push(setTimeout(() => setThinkingExiting(true), 300 + thinkingSteps.length * stepDelay + 200));
    timers.push(setTimeout(() => {
      setThinkingVisible(false);
      setPageReady(true);
    }, 300 + thinkingSteps.length * stepDelay + 580));
    return () => timers.forEach(clearTimeout);
  }, []);
  useEffect(() => {
    const timers = [];
    for (let i = 0; i < 5; i++) {
      timers.push(setTimeout(() => setAnalysisStep(i + 1), 200 + i * 400));
    }
    timers.push(setTimeout(() => setAnalysisComplete(true), 200 + 4 * 400 + 600));
    timers.push(setTimeout(() => setDotPulsing(false), 2500));
    timers.push(setTimeout(() => setMeterAnimated(true), 120));
    timers.push(setTimeout(() => setMeterGlowing(true), 1250));
    return () => timers.forEach(clearTimeout);
  }, []);
  const missionReportRef = useRef(missionReport);
  useEffect(() => {
    missionReportRef.current = missionReport;
  }, [missionReport]);
  const statAnimStarted = useRef(false);
  useEffect(() => {
    statAnimStarted.current = false;
    setStatValues(null);
    setTimelineVisible(0);
  }, [missionReport?.missionId]);
  useEffect(() => {
    const runAnimation = () => {
      if (statAnimStarted.current) return;
      statAnimStarted.current = true;
      const mr = missionReportRef.current;
      if (!mr || mr.retailValue <= 0) {
        return;
      }
      const confidenceTarget = Number.isFinite(numericConfidence) ? numericConfidence : 0;
      const targetValues = {
        confidence: confidenceTarget,
        profit: mr.projectedProfit,
        retail: mr.retailValue,
        score: confidenceTarget > 0 ? Math.max(Math.round(confidenceTarget), 1) : 0,
        days: 0
      };
      const duration = 1100;
      const fps = 60;
      const steps = Math.round(duration / (1e3 / fps));
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = Math.min(frame / steps, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setStatValues({
          confidence: Math.round(targetValues.confidence * eased),
          profit: Math.round(targetValues.profit * eased),
          retail: Math.round(targetValues.retail * eased),
          score: Math.round(targetValues.score * eased),
          days: Math.round(targetValues.days * eased)
        });
        if (progress >= 1) clearInterval(timer);
      }, 1e3 / fps);
    };
    const t = setTimeout(runAnimation, 350);
    return () => clearTimeout(t);
  }, [numericConfidence, missionReport?.missionId]);
  useEffect(() => {
    const timers = [];
    investigationTimeline.forEach((_, i) => {
      timers.push(setTimeout(() => setTimelineVisible(i + 1), 3400 + i * 280));
    });
    return () => timers.forEach(clearTimeout);
  }, [investigationTimeline, missionReport?.missionId]);
  useEffect(() => {
    const run = () => {
      setBadgeSweep(false);
      const t = setTimeout(() => setBadgeSweep(true), 40);
      return t;
    };
    const t0 = setTimeout(() => {
      run();
      const interval = setInterval(run, 13e3);
      return () => clearInterval(interval);
    }, 4e3);
    return () => clearTimeout(t0);
  }, []);
  useEffect(() => {
    const els = revealRefs.current.filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opp-scroll-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06
    });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pageReady]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleBeforePrint = () => setIsPrintMode(true);
    const handleAfterPrint = () => setIsPrintMode(false);
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("opportunity-print-mode", isPrintMode);
    return () => {
      document.body.classList.remove("opportunity-print-mode");
    };
  }, [isPrintMode]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const openPrintDealerReport = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsPrintMode(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.print();
      });
    });
  }, []);
  const stagger = (i) => ({
    animationDelay: `${i * 80}ms`
  });
  const platformNavItems = [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Missions",
    href: "/search-builder"
  }, {
    label: "AI Buying Report",
    href: "/opportunity",
    active: true
  }, {
    label: "Settings",
    isSectionLabel: true
  }, {
    label: "TICA Preferences",
    href: "/settings"
  }, {
    label: "Owner",
    isSectionLabel: true
  }, {
    label: "TICA Operations Centre",
    href: "/owner"
  }, {
    label: "🧠 TICA Intelligence",
    href: "/owner/intelligence"
  }, {
    label: "Future Features",
    isSectionLabel: true
  }, {
    label: "Vehicle History & MOT",
    disabled: true
  }, {
    label: "Watchlist",
    disabled: true
  }, {
    label: "Subscription",
    disabled: true
  }];
  if (missionInitialized && !resolvedMission) {
    return /* @__PURE__ */ jsx(PlatformShell, { navItems: platformNavItems, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-4", children: [
      /* @__PURE__ */ jsxs("header", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Trade In Cars Agent" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 text-headline-lg font-headline-lg text-primary", children: "AI Buying Report" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-sm font-body-sm text-on-surface-variant", children: "No Buying Report selected." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "Complete an AI Search Mission and open its Buying Report to load mission-specific intelligence." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface", children: "Return to Dealer Command Centre" }),
          /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-body-md font-body-md text-on-primary", children: "Create AI Search Mission" })
        ] })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    thinkingVisible && /* @__PURE__ */ jsx("div", { className: `opp-thinking-overlay ${thinkingExiting ? "opp-thinking-overlay--exit" : "opp-thinking-overlay--enter"}`, "aria-live": "polite", "aria-label": "TICA AI analysing", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6 px-6 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold uppercase tracking-[0.22em] text-primary/80", children: "TICA AI" }),
        /* @__PURE__ */ jsx("p", { className: "text-[22px] font-semibold text-on-surface sm:text-[26px]", children: "Analysing…" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start gap-2.5", children: thinkingSteps.map((step, i) => /* @__PURE__ */ jsxs("p", { className: "opp-thinking-step flex items-center gap-2.5 text-[15px] font-medium text-on-surface", style: thinkingStep > i ? {
        animationDelay: "0ms"
      } : {
        opacity: 0,
        animationName: "none"
      }, children: [
        /* @__PURE__ */ jsx("span", { className: "tica-decision-buy font-bold text-[17px]", children: "✓" }),
        step
      ] }, step)) })
    ] }) }),
    /* @__PURE__ */ jsxs(PlatformShell, { navItems: platformNavItems, children: [
      /* @__PURE__ */ jsxs("div", { className: `opportunity-print-root mx-auto w-full max-w-container-max space-y-3 sm:space-y-4 ${pageReady ? "opp-page-enter" : "opacity-0"}`, children: [
        /* @__PURE__ */ jsxs("header", { className: "opp-card-stagger opp-card-hover rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6", style: stagger(0), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Trade In Cars Agent" }) }),
            /* @__PURE__ */ jsxs("div", { className: "opportunity-print-hide flex w-full flex-col gap-3 sm:w-auto sm:flex-row", children: [
              /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "opp-btn-secondary inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface sm:w-auto", children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🏠" }),
                "Return to Dashboard"
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/search-builder", className: "opp-btn-primary inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-body-md font-body-md text-on-primary sm:w-auto", children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "➕" }),
                "Create New AI Search"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "opportunity-print-hide mt-4 flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant", children: [
            /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "transition-colors hover:text-primary", children: "Dealer Command Centre" }),
            /* @__PURE__ */ jsx(ChevronRightIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "text-on-surface", children: "AI Buying Report" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "AI Buying Report" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant", children: missionReport ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Mission ID: ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-on-surface", children: missionReport.missionId })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Vehicle Opportunity ID: ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-on-surface", children: "Awaiting active mission" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "self-end sm:self-auto", children: /* @__PURE__ */ jsx("div", { className: `opp-badge-sweep ${badgeSweep ? "opp-badge-sweep-play" : ""}`, children: /* @__PURE__ */ jsx(TicaShield, { size: "lg" }) }) })
          ] })
        ] }),
        (resolvedMission || missionInitialized && !resolvedMission) && /* @__PURE__ */ jsx("section", { className: "opp-card-stagger opp-card-hover rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "Mission status", style: stagger(1), children: resolvedMission ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80", children: "Mission Status" }),
              /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm font-semibold text-on-surface", children: resolvedMission.missionId })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${resolvedMission.status === "Completed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-primary/25 bg-primary/10 text-primary"}`, children: resolvedMission.status === "Completed" ? "✅ Completed Successfully" : resolvedMission.status || "Mission Created" })
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Mission ID" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: resolvedMission.missionId })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Vehicle Type" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: resolvedMission.vehicleType || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Make & Model" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: missionReport?.vehicleName || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Budget" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: missionReport?.budget || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Target Profit" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: missionReport?.targetProfit || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Search Area" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: resolvedMission.searchArea || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Buying Priority" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: resolvedMission.buyingPriority || "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Current Stage" }),
              /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: resolvedMission.currentStage || MISSION_STAGES[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Search Progress" }),
              /* @__PURE__ */ jsxs("dd", { className: "mt-0.5 font-medium text-on-surface", children: [
                resolvedMission.progress ?? 0,
                "%"
              ] })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container p-4 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-sm font-semibold text-on-surface", children: "Mission report data could not be loaded." }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-on-surface-variant", children: "No active mission was found. Please return to the dashboard or create a new search." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container", children: "Return to Dashboard" }),
            /* @__PURE__ */ jsx("a", { href: "/search-builder", className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary", children: "Create New Search" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("section", { className: "opp-card-stagger opp-card-hover rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", style: stagger(2), children: [
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Executive Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: [
            /* @__PURE__ */ jsxs("div", { className: `opp-card-hover flex flex-col items-center justify-center rounded-xl border border-primary/25 bg-surface-container-high px-3 py-5 text-center ${isBuyVerdict ? "opp-buy-glow" : ""}`, children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "TICA Recommendation™" }),
              /* @__PURE__ */ jsx("p", { className: `opp-stat-animate mt-2 text-[18px] font-semibold leading-none sm:text-[22px] ${decisionVerdictClassName} ${decisionVerdictGlowClassName}`, children: normalizedDecisionAction })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "opp-card-hover flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Confidence" }),
              /* @__PURE__ */ jsx("p", { className: `opp-stat-animate mt-2 font-semibold leading-tight text-primary text-balance ${getExecutiveSummaryValueClass(executiveConfidenceValue)}`, children: executiveConfidenceValue })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "opp-card-hover flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Gross Profit" }),
              /* @__PURE__ */ jsx("p", { className: `opp-stat-animate mt-2 font-semibold leading-tight text-on-surface text-balance ${getExecutiveSummaryValueClass(executiveProfitValue)}`, children: executiveProfitValue })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "opp-card-hover flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Retail Value" }),
              /* @__PURE__ */ jsx("p", { className: `opp-stat-animate mt-2 font-semibold leading-tight text-on-surface text-balance ${getExecutiveSummaryValueClass(executiveRetailValue)}`, children: executiveRetailValue })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "opp-card-hover flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Opportunity Score" }),
              /* @__PURE__ */ jsx("p", { className: `opp-stat-animate mt-2 font-semibold leading-tight text-primary text-balance ${getExecutiveSummaryValueClass(executiveScoreValue)}`, children: executiveScoreValue })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "opp-card-hover flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Days to Sell" }),
              /* @__PURE__ */ jsx("p", { className: `opp-stat-animate mt-2 font-semibold leading-tight text-on-surface text-balance ${getExecutiveSummaryValueClass(executiveDaysValue)}`, children: executiveDaysValue })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opp-card-stagger opp-card-hover rounded-2xl border border-primary/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "TICA Opportunity Ranking", style: stagger(3), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "TICA Opportunity Ranking™" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[22px] leading-none", "aria-label": "ranking status", children: "🟡" }),
                /* @__PURE__ */ jsx("span", { className: "text-body-md font-semibold text-on-surface", children: reportVehicleIntelligence.ranking.title })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-primary", children: "Today's Ranking" }),
              /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-lg font-semibold text-on-surface", children: reportVehicleIntelligence.ranking.detail })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Dealer Confidence" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[22px] font-semibold leading-none text-primary", children: reportVehicleIntelligence.ranking.confidence })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Profit Potential" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[18px] leading-none text-on-surface", children: reportVehicleIntelligence.ranking.profitPotential })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Market Demand" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[18px] leading-none text-on-surface", children: reportVehicleIntelligence.ranking.marketDemand })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Risk Rating" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[18px] leading-none text-on-surface", children: reportVehicleIntelligence.ranking.riskRating })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-2 rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center sm:col-span-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Est. Days To Sell" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[22px] font-semibold leading-none text-on-surface", children: reportVehicleIntelligence.ranking.daysToSell })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("section", { className: "opp-card-stagger opp-card-hover rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 sm:px-5", "aria-label": "TICA analysis status", style: stagger(4), children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "opp-status-dot-breathe inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--tica-decision-buy)]", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps font-semibold uppercase tracking-widest text-on-surface", children: "AVAILABLE DATA ANALYSIS COMPLETE" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1", children: ["Market Analysis", "Pricing Validation", "Demand Analysis", "Profit Projection", "Risk Assessment"].map((step, index) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[11px] font-semibold text-on-surface-variant", style: {
            opacity: analysisStep > index ? 1 : 0,
            transition: "opacity 0.35s ease-out"
          }, children: [
            /* @__PURE__ */ jsx("span", { className: "tica-decision-buy font-bold", children: "✓" }),
            step
          ] }, step)) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-on-surface-variant/70 shrink-0", style: {
            opacity: analysisStep >= 5 ? 1 : 0,
            transition: "opacity 0.4s ease-out"
          }, children: "Completed in 12.4 seconds" })
        ] }) }),
        /* @__PURE__ */ jsxs("section", { className: "opp-card-stagger opp-card-hover rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "Dealer Decision Meter", style: stagger(5), children: [
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Dealer Decision Meter" }),
          /* @__PURE__ */ jsx("div", { className: "mb-5 flex flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "TICA Recommendation" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[32px] font-semibold leading-none sm:text-[38px]", style: {
              color: meterZone === "buy" ? "var(--tica-decision-buy)" : meterZone === "review" ? "var(--tica-decision-review)" : "var(--tica-decision-pass)",
              textShadow: meterZone === "buy" ? "0 0 12px rgba(24,168,107,0.35)" : meterZone === "review" ? "0 0 12px rgba(212,165,55,0.35)" : "0 0 12px rgba(179,58,63,0.35)"
            }, children: meterLabel }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-body-sm font-body-sm text-on-surface-variant", children: [
              "Confidence ",
              unifiedConfidence
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: `ddm-bar-wrapper ${meterGlowing && meterZone === "buy" ? "opp-meter-glowing" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "ddm-zone-labels", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx("span", { className: "ddm-zone-label ddm-zone-label-pass", children: "PASS" }),
              /* @__PURE__ */ jsx("span", { className: "ddm-zone-label ddm-zone-label-review", children: "REVIEW" }),
              /* @__PURE__ */ jsx("span", { className: "ddm-zone-label ddm-zone-label-buy", children: "BUY" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ddm-bar-track", role: "meter", "aria-label": `Decision meter: ${unifiedRecommendation} at ${unifiedConfidence} confidence`, "aria-valuenow": confidencePercent, "aria-valuemin": 0, "aria-valuemax": 100, children: /* @__PURE__ */ jsxs("div", { className: "ddm-indicator", style: {
              left: meterAnimated ? `${confidencePercent}%` : "0%",
              transition: meterAnimated ? "left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none"
            }, "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx("div", { className: "ddm-indicator-pin" }),
              /* @__PURE__ */ jsx("div", { className: "ddm-indicator-label", style: {
                color: meterZone === "buy" ? "var(--tica-decision-buy)" : meterZone === "review" ? "var(--tica-decision-review)" : "var(--tica-decision-pass)"
              }, children: unifiedConfidence })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-5 text-body-sm font-body-sm italic leading-relaxed text-on-surface-variant", children: [
            '"',
            meterSentence,
            '"'
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant/50", children: "Updated using current market intelligence." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: `opp-card-stagger dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-5 ${isBuyVerdict ? "opp-buy-glow" : ""}`, style: stagger(6), children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "AI Buying Verdict" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "verdict-card-premium flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-center sm:px-4.5 sm:py-4 lg:min-w-[250px]", children: [
              /* @__PURE__ */ jsxs("div", { className: "traffic-light-shell", "aria-label": "AI buying verdict traffic light", children: [
                /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${isBuyVerdict ? "traffic-light-lens-buy-active" : ""}`, "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${isReviewVerdict ? "traffic-light-lens-review-active" : ""}`, "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${isPassVerdict ? "traffic-light-lens-pass-active" : ""}`, "aria-hidden": "true" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[0.64rem] font-label-caps uppercase tracking-[0.18em] text-primary/80", children: "AI Buying Verdict" }),
                /* @__PURE__ */ jsx("p", { className: `text-[28px] font-semibold leading-none tracking-[0.02em] ${decisionVerdictClassName} ${decisionVerdictGlowClassName} sm:text-[32px]`, children: unifiedRecommendation }),
                /* @__PURE__ */ jsxs("p", { className: "text-[0.64rem] font-body-sm uppercase tracking-[0.16em] text-on-surface-variant", children: [
                  "Confidence ",
                  unifiedConfidence
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full rounded-xl border border-primary/15 bg-surface-container-high/70 px-3 py-2 text-left", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2.5", "aria-label": "Verdict colour key", children: [
                /* @__PURE__ */ jsxs("div", { className: "legend-traffic-light shrink-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "legend-traffic-light-lens legend-lens-green", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("div", { className: "legend-traffic-light-lens legend-lens-amber", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("div", { className: "legend-traffic-light-lens legend-lens-red", "aria-hidden": "true" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] leading-none", children: [
                  /* @__PURE__ */ jsx("span", { className: "tica-decision-buy flex items-center", children: "BUY" }),
                  /* @__PURE__ */ jsx("span", { className: "tica-decision-review flex items-center", children: "REVIEW" }),
                  /* @__PURE__ */ jsx("span", { className: "tica-decision-pass flex items-center", children: "PASS" })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-outline-variant/30 bg-surface-container-high px-4 py-3.5 sm:px-5 sm:py-4", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Why TICA Recommends This" }),
              /* @__PURE__ */ jsx("ul", { className: "flex-1 space-y-1.5", children: reportVehicleIntelligence.dealerVerdict.reasoning.map((reason) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-body-sm font-body-sm text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-review mt-px shrink-0 font-semibold", children: "✓" }),
                /* @__PURE__ */ jsx("span", { children: reason })
              ] }, reason)) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 border-t border-outline-variant/25 pt-3", children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Recommended Action" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 text-body-sm font-body-sm leading-6 text-on-surface", children: reportVehicleIntelligence.dealerVerdict.recommendedActions.map((action) => /* @__PURE__ */ jsx("li", { children: action }, action)) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opp-scroll-hidden opp-card-hover dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", ref: setRevealRef(0), children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-headline-md font-headline-md text-on-surface", children: "Dealer Notes" }),
          /* @__PURE__ */ jsx("p", { className: "mb-3 text-body-sm font-body-sm text-on-surface-variant", children: "Record your offer price, call outcomes, next actions and observations." }),
          /* @__PURE__ */ jsx("textarea", { placeholder: "e.g. Offer price: £30,750 · Call seller Monday · Await HPI · Reserve vehicle...", className: "h-36 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-32" })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opp-scroll-hidden opp-card-hover dashboard-border rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4 sm:p-5", ref: setRevealRef(1), children: [
          /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant", children: "Target Vehicle" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-headline-lg font-headline-lg text-on-surface", children: missionReport?.vehicleName || "Awaiting active mission" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Year" }),
                  /* @__PURE__ */ jsx("span", { className: "mt-1 block text-body-lg font-body-lg text-on-surface", children: missionReport?.yearDisplay || "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Asking Price" }),
                  /* @__PURE__ */ jsx("span", { className: "mt-1 block text-body-lg font-body-lg text-primary", children: missionReport?.askingPriceDisplay || "Awaiting live data" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-[6.5rem] shrink-0 sm:w-[7.75rem]", children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-lg border border-outline-variant/30 bg-surface-container", children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(49,64,99,0.28),rgba(11,19,31,0.94))]", style: {
                animation: "opp-page-fadein 0.4s ease-out both"
              }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 text-center", children: [
                /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-on-surface-variant/40", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3.75 18.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5z" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-[8px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant/75", children: "Pending" })
              ] }) }, heroImageIdx) }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 grid grid-cols-4 gap-0.5", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsx("div", { className: "opp-thumb aspect-square rounded border border-outline-variant/30 bg-surface-container-high flex items-center justify-center overflow-hidden", "aria-label": `Vehicle photo ${n + 1}`, onClick: () => setHeroImageIdx(n - 1), role: "button", tabIndex: 0, onKeyDown: (e) => e.key === "Enter" && setHeroImageIdx(n - 1), children: /* @__PURE__ */ jsx("svg", { className: "h-2.5 w-2.5 text-on-surface-variant/25", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3.75 18.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5z" }) }) }, n)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opp-scroll-hidden opp-card-hover dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", ref: setRevealRef(2), children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Vehicle Information" }),
          /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: vehicleInfo.map((item) => /* @__PURE__ */ jsxs("div", { className: "opp-tile-hover rounded-xl border border-outline-variant/25 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: item.label }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-body-md font-body-md text-on-surface", children: item.value })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opp-scroll-hidden dashboard-border rounded-2xl p-2.5 sm:p-3.5", ref: setRevealRef(3), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 border-b border-outline-variant/25 pb-2.5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "TICA Vehicle Intelligence™" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "TICA Vehicle Intelligence™" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "AI-powered model knowledge based on known ownership issues, manufacturer data, technician experience and real-world reliability trends." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2.5 grid grid-cols-1 items-start gap-4 xl:grid-cols-[1.45fr_0.95fr] xl:items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 self-start", children: [
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "Professional Intelligence Card" }),
                    /* @__PURE__ */ jsx("h3", { className: "mt-1.5 text-title-lg font-semibold text-on-surface", children: "⚠ Known Model Issues" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "AI model knowledge" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: reportVehicleIntelligence.modelIssues.map((issue) => {
                  const tone = issueToneConfig[issue.tone];
                  return /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container px-3 py-2.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: `mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone.dotClassName}`, "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-on-surface", children: [
                          "• ",
                          issue.title
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: `text-[11px] font-semibold uppercase tracking-[0.14em] ${tone.className}`, children: tone.label })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: issue.detail })
                    ] })
                  ] }) }, issue.title);
                }) })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 border-b border-outline-variant/25 pb-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "AI Inspection Checklist™" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-title-lg font-semibold text-on-surface", children: "AI Inspection Checklist™" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "Key areas TICA recommends inspecting before purchase." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2", children: reportVehicleIntelligence.inspectionChecklist.map((section) => /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-body-md font-semibold text-on-surface", children: section.category }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Inspection Area" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-1.5", children: section.items.map((item) => {
                    const status = checklistStatusConfig[item.status];
                    return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2.5 rounded-xl border border-outline-variant/20 bg-surface-container-high px-2.5 py-1.5", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface", children: item.label }),
                      /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
                        /* @__PURE__ */ jsx("span", { className: `h-2.5 w-2.5 rounded-full ${status.dotClassName}`, "aria-hidden": "true" }),
                        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-semibold uppercase tracking-[0.12em] ${status.className}`, children: status.label })
                      ] })
                    ] }, item.label);
                  }) })
                ] }, section.category)) })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high px-3.5 py-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "TICA Inspection Advice" }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-start gap-2.5 rounded-xl border border-outline-variant/25 bg-surface-container px-3 py-2.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "mt-0.5 shrink-0 text-base leading-none", children: "💡" }),
                  /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm leading-relaxed text-on-surface", children: reportVehicleIntelligence.inspectionAdvice })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5 xl:block", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 border-b border-outline-variant/25 pb-3", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "TICA Dealer Verdict™" }),
                    /* @__PURE__ */ jsx("h3", { className: "mt-1 text-title-lg font-semibold text-on-surface", children: "TICA Recommendation™" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${isBuyVerdict ? "border-[rgba(var(--tica-decision-buy-rgb),0.28)] bg-[rgba(var(--tica-decision-buy-rgb),0.14)] tica-decision-buy" : isReviewVerdict ? "border-[rgba(var(--tica-decision-review-rgb),0.28)] bg-[rgba(var(--tica-decision-review-rgb),0.14)] tica-decision-review" : "border-[rgba(var(--tica-decision-pass-rgb),0.28)] bg-[rgba(var(--tica-decision-pass-rgb),0.14)] tica-decision-pass"}`, children: [
                    "Confidence ",
                    unifiedConfidence
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `mt-3 rounded-xl border px-3 py-3 ${isBuyVerdict ? "border-[rgba(var(--tica-decision-buy-rgb),0.24)] bg-[rgba(var(--tica-decision-buy-rgb),0.08)]" : isReviewVerdict ? "border-[rgba(var(--tica-decision-review-rgb),0.24)] bg-[rgba(var(--tica-decision-review-rgb),0.08)]" : "border-[rgba(var(--tica-decision-pass-rgb),0.24)] bg-[rgba(var(--tica-decision-pass-rgb),0.08)]"}`, children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Main Recommendation" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsx("p", { className: `text-body-lg font-semibold tracking-[0.01em] ${decisionVerdictClassName}`, children: unifiedRecommendation }),
                    /* @__PURE__ */ jsx("div", { className: `h-3 w-3 shrink-0 rounded-full ${isBuyVerdict ? "bg-[var(--tica-decision-buy)] shadow-[0_0_12px_rgba(var(--tica-decision-buy-rgb),0.5)]" : isReviewVerdict ? "bg-[var(--tica-decision-review)] shadow-[0_0_12px_rgba(var(--tica-decision-review-rgb),0.5)]" : "bg-[var(--tica-decision-pass)] shadow-[0_0_12px_rgba(var(--tica-decision-pass-rgb),0.5)]"}`, "aria-hidden": "true" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Strengths" }),
                    /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-x-3 gap-y-2", children: reportVehicleIntelligence.dealerVerdict.strengths.map((strength) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-0.5 text-[11px] font-semibold", children: "●" }),
                      /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm leading-snug text-on-surface", children: strength })
                    ] }, strength)) })
                  ] }),
                  /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Items to Verify" }),
                    /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: reportVehicleIntelligence.dealerVerdict.verificationItems.map((item) => {
                      const toneClass = item.tone === "high" ? "tica-decision-pass" : "tica-decision-review";
                      const toneDotClass = item.tone === "high" ? "bg-[var(--tica-decision-pass)]" : "bg-[var(--tica-decision-review)]";
                      return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 rounded-lg border border-outline-variant/20 bg-surface-container-high px-2.5 py-2", children: [
                        /* @__PURE__ */ jsx("span", { className: `mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${toneDotClass}`, "aria-hidden": "true" }),
                        /* @__PURE__ */ jsx("p", { className: `text-body-sm font-body-sm leading-snug ${toneClass}`, children: item.label })
                      ] }, item.label);
                    }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("section", { className: "mt-3 rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Commercial Decision" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-2.5", children: (missionReport?.commercialDecision ?? [{
                    label: "Recommended Offer",
                    value: "Awaiting live data",
                    tone: "review"
                  }, {
                    label: "Expected Purchase Range",
                    value: "Awaiting live data",
                    tone: "default"
                  }, {
                    label: "Walk-Away Price",
                    value: "Awaiting live data",
                    tone: "pass"
                  }, {
                    label: "Preparation Allowance",
                    value: "Awaiting live data",
                    tone: "default"
                  }, {
                    label: "Estimated Retail Value",
                    value: "Awaiting live data",
                    tone: "buy"
                  }, {
                    label: "Projected Gross Profit",
                    value: "Awaiting live data",
                    tone: "buy"
                  }]).map((item) => {
                    const valueClassName = item.tone === "buy" ? "tica-decision-buy" : item.tone === "review" ? "tica-decision-review" : item.tone === "pass" ? "tica-decision-pass" : "text-on-surface";
                    return /* @__PURE__ */ jsxs("div", { className: "opp-tile-hover rounded-xl border border-outline-variant/20 bg-surface-container-high px-3 py-2.5", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant", children: item.label }),
                      /* @__PURE__ */ jsx("p", { className: `mt-1 text-body-sm font-semibold ${item.value === "Awaiting live data" ? "text-on-surface-variant/60 italic" : valueClassName}`, children: item.value })
                    ] }, item.label);
                  }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-primary/20 bg-primary-container/10 px-3 py-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Final TICA Advice" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-body-sm font-body-sm leading-relaxed text-on-surface", children: missionReport?.finalAdvice ?? reportVehicleIntelligence.dealerVerdict.finalAdvice })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("section", { className: "hidden w-full self-start rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3 xl:block", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Investigation Timeline" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "The AI reasoning process behind this recommendation." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "w-full rounded-xl border border-outline-variant/25 bg-surface-container px-3 py-2.5 lg:max-w-[220px]", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI Reasoning" }),
                    /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-body-sm font-body-sm text-on-surface", children: [
                      /* @__PURE__ */ jsx("span", { className: `${decisionVerdictClassName} mr-2`, children: isBuyVerdict ? "🟢" : isReviewVerdict ? "🟡" : "🔴" }),
                      unifiedRecommendation,
                      " signal confirmed"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-on-surface-variant", children: "Investigation checkpoints shown for the active report only." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "timeline-list mt-3", "aria-label": "AI investigation timeline", children: [
                  investigationTimeline.map((event, i) => /* @__PURE__ */ jsxs("article", { className: "timeline-entry opp-timeline-step", style: timelineVisible > i ? {
                    animationDelay: `${i * 60}ms`
                  } : {
                    opacity: 0,
                    animationName: "none"
                  }, children: [
                    /* @__PURE__ */ jsx("p", { className: "timeline-entry-time text-[11px] sm:text-[11px]", children: event.time }),
                    /* @__PURE__ */ jsx("div", { className: `timeline-entry-dot${timelineVisible > i ? " opp-timeline-dot-illuminate" : ""}`, style: timelineVisible > i ? {
                      animationDelay: `${i * 60 + 80}ms`
                    } : void 0, "aria-hidden": "true" }),
                    /* @__PURE__ */ jsx("p", { className: "timeline-entry-message text-body-sm font-body-sm", children: event.message })
                  ] }, `${event.time}-${event.message}`)),
                  /* @__PURE__ */ jsxs("article", { className: "timeline-entry opp-timeline-step", style: timelineVisible >= investigationTimeline.length ? {
                    animationDelay: `${investigationTimeline.length * 60 + 80}ms`
                  } : {
                    opacity: 0,
                    animationName: "none"
                  }, children: [
                    /* @__PURE__ */ jsx("p", { className: "timeline-entry-time" }),
                    /* @__PURE__ */ jsx("div", { className: `timeline-entry-dot${timelineVisible >= investigationTimeline.length ? " opp-timeline-dot-illuminate" : ""}`, style: timelineVisible >= investigationTimeline.length ? {
                      animationDelay: `${investigationTimeline.length * 60 + 160}ms`
                    } : void 0, "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxs("p", { className: "timeline-entry-message text-body-sm font-body-sm", children: [
                      /* @__PURE__ */ jsx("span", { className: `opp-status-dot-breathe mr-2 inline-block h-2.5 w-2.5 rounded-full ${isBuyVerdict ? "bg-[var(--tica-decision-buy)]" : isReviewVerdict ? "bg-[var(--tica-decision-review)]" : "bg-[var(--tica-decision-pass)]"} align-middle`, "aria-hidden": "true" }),
                      /* @__PURE__ */ jsxs("span", { className: `${decisionVerdictClassName} font-semibold${timelineVisible >= investigationTimeline.length && isBuyVerdict ? " opp-buy-signal-glow" : ""}`, children: [
                        unifiedRecommendation,
                        " Signal Confirmed"
                      ] })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-primary/25 bg-surface-container-high p-3 shadow-[0_0_18px_rgba(var(--color-primary-rgb,99,120,211),0.07)]", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-2 border-b border-outline-variant/25 pb-2", children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "Dealer Services Marketplace™" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[11px] text-on-surface-variant", children: "Trusted Partners. Better Buying. Coming Soon." })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-3 gap-1.5", children: [{
                  icon: "💷",
                  label: "Dealer Finance",
                  detail: "Stock funding"
                }, {
                  icon: "🛡",
                  label: "Warranty",
                  detail: "Retail warranty"
                }, {
                  icon: "🚚",
                  label: "Transport",
                  detail: "Collection & delivery"
                }, {
                  icon: "📋",
                  label: "Insurance",
                  detail: "Dealer insurance"
                }, {
                  icon: "📈",
                  label: "Stock Funding",
                  detail: "Buying power"
                }, {
                  icon: "🤝",
                  label: "Trade Services",
                  detail: "Partner network"
                }].map((card) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 rounded-xl border border-outline-variant/20 bg-surface-container px-2.5 py-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base leading-none", "aria-hidden": "true", children: card.icon }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold leading-snug text-on-surface", children: card.label }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-snug text-on-surface-variant", children: card.detail }),
                  /* @__PURE__ */ jsx("span", { className: "mt-auto inline-block self-start rounded px-1 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-primary bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]", children: "Coming Soon" })
                ] }, card.label)) }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 rounded-lg border border-outline-variant/20 bg-surface-container px-2.5 py-1.5", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant", children: "Future revenue opportunities for Trade In Cars Agent." }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 self-start", children: [
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "AI Risk Indicator" }),
                  /* @__PURE__ */ jsx("span", { className: "text-body-sm font-semibold text-on-surface-variant", children: "Overall Ownership Risk" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-xl border border-outline-variant/30 bg-surface-container px-3 py-2.5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant", children: [
                    /* @__PURE__ */ jsx("span", { children: "Low" }),
                    /* @__PURE__ */ jsx("span", { children: "Medium" }),
                    /* @__PURE__ */ jsx("span", { children: "High" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-1.5 h-2 rounded-full bg-[linear-gradient(90deg,var(--tica-decision-buy)_0%,var(--tica-decision-buy)_33%,var(--tica-decision-review)_33%,var(--tica-decision-review)_66%,var(--tica-decision-pass)_66%,var(--tica-decision-pass)_100%)]" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between rounded-lg border border-outline-variant/25 bg-surface-container-high px-2.5 py-1.5", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Current signal" }),
                      /* @__PURE__ */ jsxs("p", { className: `mt-0.5 text-body-md font-semibold ${ownershipRiskToneClass}`, children: [
                        isBuyVerdict ? "🟢" : isReviewVerdict ? "🟡" : "🔴",
                        " ",
                        reportVehicleIntelligence.ownershipRisk.level
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 rounded-full bg-[var(--tica-decision-review)] shadow-[0_0_10px_rgba(212,165,55,0.45)]", "aria-hidden": "true" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: reportVehicleIntelligence.ownershipRisk.description })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
                /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "Running Cost Intelligence" }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2", children: reportVehicleIntelligence.runningCosts.map((item) => {
                  const tone = issueToneConfig[item.tone];
                  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container px-3 py-2.5", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: item.label }),
                      /* @__PURE__ */ jsx("span", { className: `mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${tone.dotClassName}`, "aria-hidden": "true" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-sm font-semibold leading-relaxed text-on-surface", children: item.value })
                  ] }, item.label);
                }) })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 border-b border-outline-variant/25 pb-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "TICA Location Intelligence™" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-title-lg font-semibold text-on-surface", children: "Vehicle Location & Collection" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "Location and collection intelligence generated by TICA." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 overflow-hidden rounded-xl border border-outline-variant/25", style: {
                  height: "200px"
                }, children: /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(44,56,88,0.4),rgba(11,19,31,0.96))]", "aria-label": "Map placeholder – Google Maps will load here", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 h-full w-full", xmlns: "http://www.w3.org/2000/svg", children: [
                    /* @__PURE__ */ jsx("line", { x1: "0", y1: "100", x2: "100%", y2: "100", stroke: "#6a7690", strokeWidth: "8", opacity: "0.26" }),
                    /* @__PURE__ */ jsx("line", { x1: "0", y1: "140", x2: "100%", y2: "140", stroke: "#5e6a83", strokeWidth: "5", opacity: "0.22" }),
                    /* @__PURE__ */ jsx("line", { x1: "0", y1: "60", x2: "100%", y2: "60", stroke: "#5e6a83", strokeWidth: "4", opacity: "0.2" }),
                    /* @__PURE__ */ jsx("line", { x1: "120", y1: "0", x2: "120", y2: "100%", stroke: "#6a7690", strokeWidth: "7", opacity: "0.24" }),
                    /* @__PURE__ */ jsx("line", { x1: "220", y1: "0", x2: "220", y2: "100%", stroke: "#5e6a83", strokeWidth: "4", opacity: "0.2" }),
                    /* @__PURE__ */ jsx("line", { x1: "60", y1: "0", x2: "60", y2: "100%", stroke: "#5e6a83", strokeWidth: "3", opacity: "0.18" }),
                    /* @__PURE__ */ jsx("line", { x1: "0", y1: "200", x2: "180", y2: "0", stroke: "#64708a", strokeWidth: "5", opacity: "0.24" }),
                    /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "55", height: "55", fill: "#202c45", opacity: "0.36" }),
                    /* @__PURE__ */ jsx("rect", { x: "125", y: "0", width: "90", height: "55", fill: "#202c45", opacity: "0.36" }),
                    /* @__PURE__ */ jsx("rect", { x: "225", y: "0", width: "120", height: "95", fill: "#182338", opacity: "0.4" }),
                    /* @__PURE__ */ jsx("rect", { x: "0", y: "105", width: "115", height: "30", fill: "#1c3242", opacity: "0.36" }),
                    /* @__PURE__ */ jsx("rect", { x: "125", y: "105", width: "90", height: "30", fill: "#202c45", opacity: "0.34" }),
                    /* @__PURE__ */ jsx("rect", { x: "0", y: "145", width: "55", height: "55", fill: "#202c45", opacity: "0.36" }),
                    /* @__PURE__ */ jsx("rect", { x: "125", y: "145", width: "90", height: "55", fill: "#202c45", opacity: "0.34" }),
                    /* @__PURE__ */ jsx("rect", { x: "225", y: "105", width: "120", height: "95", fill: "#1c3242", opacity: "0.32" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full", style: {
                    marginTop: "-8px"
                  }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "h-4 w-4 text-on-primary", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.008a6.79 6.79 0 00-6.79-6.79 6.79 6.79 0 00-6.79 6.79c0 3.311 1.556 6.005 3.5 8.008a19.579 19.579 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) }) }),
                    /* @__PURE__ */ jsx("div", { className: "mt-0.5 h-2 w-0.5 bg-primary opacity-80" }),
                    /* @__PURE__ */ jsx("div", { className: "h-1 w-1 rounded-full bg-primary opacity-50" })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[58%] -translate-x-1/2", children: /* @__PURE__ */ jsx("div", { className: "rounded-md border border-outline-variant/35 bg-surface-container-high/90 px-2 py-0.5 shadow-md backdrop-blur-sm", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold text-on-surface-variant", children: "Live location required" }) }) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 rounded border border-outline-variant/35 bg-surface-container/90 px-1.5 py-0.5 shadow-sm", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold tracking-tight text-on-surface-variant/90", children: "Map · Google Maps" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "absolute right-2 top-2 flex flex-col overflow-hidden rounded border border-outline-variant/35 bg-surface-container shadow-sm", children: [
                    /* @__PURE__ */ jsx("button", { className: "flex h-6 w-6 items-center justify-center text-sm font-bold text-on-surface-variant hover:bg-surface-container-high", "aria-label": "Zoom in", children: "+" }),
                    /* @__PURE__ */ jsx("div", { className: "h-px bg-outline-variant/30" }),
                    /* @__PURE__ */ jsx("button", { className: "flex h-6 w-6 items-center justify-center text-sm font-bold text-on-surface-variant hover:bg-surface-container-high", "aria-label": "Zoom out", children: "−" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-2 gap-1.5", children: reportVehicleIntelligence.locationSummary.map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-outline-variant/20 bg-surface-container px-2.5 py-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm leading-none", "aria-hidden": "true", children: item.icon }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant", children: item.label })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-sm font-semibold text-on-surface", children: item.value })
                ] }, item.label)) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-outline-variant/20 bg-surface-container px-3 py-2.5", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-primary", children: "Collection Intelligence™" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-1.5", children: [{
                    label: "Suggested route",
                    value: "Awaiting live data"
                  }, ...reportVehicleIntelligence.collectionSummary].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface-variant", children: row.label }),
                    /* @__PURE__ */ jsx("p", { className: "text-body-sm font-semibold text-on-surface", children: row.value })
                  ] }, row.label)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-1.5", children: [
                  /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/35 bg-surface-container px-2 py-2 text-[11px] font-semibold text-on-surface transition-all hover:bg-surface-container-high hover:text-primary", children: "Open Google Maps" }),
                  /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/35 bg-surface-container px-2 py-2 text-[11px] font-semibold text-on-surface transition-all hover:bg-surface-container-high hover:text-primary", children: "Plan Collection" }),
                  /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/35 bg-surface-container px-2 py-2 text-[11px] font-semibold text-on-surface transition-all hover:bg-surface-container-high hover:text-primary", children: "Calculate Delivery Cost" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-primary/25 bg-surface-container-high p-3.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 border-b border-outline-variant/25 pb-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "TICA Vehicle History Centre™" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-title-lg font-semibold text-on-surface", children: "TICA Vehicle History Centre™" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "Premium vehicle verification — every check in one place." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-2", children: reportVehicleIntelligence.vehicleHistory.map((item) => {
                  const isAttention = item.status === "attention";
                  const borderClass = isAttention ? "border-[rgba(var(--tica-decision-review-rgb),0.3)]" : "border-[rgba(var(--tica-decision-buy-rgb),0.2)]";
                  const bgClass = isAttention ? "bg-[rgba(var(--tica-decision-review-rgb),0.06)]" : "bg-surface-container";
                  const statusClass = isAttention ? "tica-decision-review" : "tica-decision-buy";
                  const dotClass = isAttention ? "bg-[var(--tica-decision-review)]" : "bg-[var(--tica-decision-buy)]";
                  return /* @__PURE__ */ jsxs("div", { className: `flex items-start gap-3 rounded-xl border px-3 py-2.5 ${borderClass} ${bgClass}`, children: [
                    /* @__PURE__ */ jsx("span", { className: "mt-0.5 shrink-0 text-base leading-none", "aria-hidden": "true", children: item.icon }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-body-sm font-semibold text-on-surface", children: item.label }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                          /* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full shrink-0 ${dotClass}`, "aria-hidden": "true" }),
                          /* @__PURE__ */ jsx("span", { className: `text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass}`, children: item.value })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[11px] text-on-surface-variant/70", children: item.detail })
                    ] })
                  ] }, item.label);
                }) }),
                /* @__PURE__ */ jsx("button", { className: "mt-4 w-full rounded-xl border border-primary/40 bg-primary px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-[0.99]", children: "Run Live Vehicle History Check" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-[11px] text-on-surface-variant/60", children: "Vehicle history will be retrieved from connected data providers." }),
                /* @__PURE__ */ jsx("div", { className: "hidden", "aria-hidden": "true", "data-provider-logos": "reserved" })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 border-b border-outline-variant/25 pb-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "TICA Questions to Ask the Seller™" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-title-lg font-semibold text-on-surface", children: "Questions to Ask the Seller" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "Vehicle-specific questions recommended before purchase." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-2.5 space-y-1.5", children: reportVehicleIntelligence.sellerQuestions.questions.map((q) => {
                  const priorityConfig = q.priority === "high" ? {
                    label: "High Priority",
                    className: "text-[var(--tica-decision-pass)]",
                    bg: "bg-[color-mix(in_srgb,var(--tica-decision-pass)_12%,transparent)]"
                  } : q.priority === "important" ? {
                    label: "Important",
                    className: "text-[var(--tica-decision-review)]",
                    bg: "bg-[color-mix(in_srgb,var(--tica-decision-review)_12%,transparent)]"
                  } : {
                    label: "General",
                    className: "text-primary",
                    bg: "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
                  };
                  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 rounded-lg border border-outline-variant/20 bg-surface-container px-2.5 py-1.5", children: [
                    /* @__PURE__ */ jsxs("span", { className: "mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums text-on-surface-variant", children: [
                      q.id,
                      "."
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "min-w-0 flex-1 text-body-sm font-body-sm leading-snug text-on-surface", children: q.text }),
                    /* @__PURE__ */ jsx("span", { className: `shrink-0 self-start rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${priorityConfig.className} ${priorityConfig.bg}`, children: priorityConfig.label })
                  ] }, q.id);
                }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2.5 flex items-start gap-2 rounded-lg border border-outline-variant/20 bg-surface-container px-2.5 py-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "mt-0.5 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant", children: "Dealer Tip:" }),
                  /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm leading-snug text-on-surface-variant", children: reportVehicleIntelligence.sellerQuestions.dealerTip })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opp-scroll-hidden dashboard-border timeline-mobile-shell rounded-2xl bg-surface-container p-4 sm:p-5 xl:hidden", ref: setRevealRef(4), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Investigation Timeline" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1.5 max-w-2xl text-body-md font-body-md text-on-surface-variant", children: "The AI reasoning process behind this recommendation." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "timeline-status-panel", children: [
              /* @__PURE__ */ jsx("p", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI Reasoning" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: `${decisionVerdictClassName} mr-2`, children: isBuyVerdict ? "🟢" : isReviewVerdict ? "🟡" : "🔴" }),
                unifiedRecommendation,
                " signal confirmed"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-on-surface-variant", children: "Investigation checkpoints shown for the active report only." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "timeline-list mt-4", "aria-label": "AI investigation timeline", children: [
            investigationTimeline.map((event, i) => /* @__PURE__ */ jsxs("article", { className: "timeline-entry opp-timeline-step", style: timelineVisible > i ? {
              animationDelay: `${i * 60}ms`
            } : {
              opacity: 0,
              animationName: "none"
            }, children: [
              /* @__PURE__ */ jsx("p", { className: "timeline-entry-time", children: event.time }),
              /* @__PURE__ */ jsx("div", { className: `timeline-entry-dot${timelineVisible > i ? " opp-timeline-dot-illuminate" : ""}`, style: timelineVisible > i ? {
                animationDelay: `${i * 60 + 80}ms`
              } : void 0, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("p", { className: "timeline-entry-message", children: event.message })
            ] }, `${event.time}-${event.message}`)),
            /* @__PURE__ */ jsxs("article", { className: "timeline-entry opp-timeline-step", style: timelineVisible >= investigationTimeline.length ? {
              animationDelay: `${investigationTimeline.length * 60 + 80}ms`
            } : {
              opacity: 0,
              animationName: "none"
            }, children: [
              /* @__PURE__ */ jsx("p", { className: "timeline-entry-time" }),
              /* @__PURE__ */ jsx("div", { className: `timeline-entry-dot${timelineVisible >= investigationTimeline.length ? " opp-timeline-dot-illuminate" : ""}`, style: timelineVisible >= investigationTimeline.length ? {
                animationDelay: `${investigationTimeline.length * 60 + 160}ms`
              } : void 0, "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("p", { className: "timeline-entry-message", children: [
                /* @__PURE__ */ jsx("span", { className: `opp-status-dot-breathe mr-2 inline-block h-2.5 w-2.5 rounded-full ${isBuyVerdict ? "bg-[var(--tica-decision-buy)]" : isReviewVerdict ? "bg-[var(--tica-decision-review)]" : "bg-[var(--tica-decision-pass)]"} align-middle`, "aria-hidden": "true" }),
                /* @__PURE__ */ jsxs("span", { className: `${decisionVerdictClassName} font-semibold${timelineVisible >= investigationTimeline.length && isBuyVerdict ? " opp-buy-signal-glow" : ""}`, children: [
                  unifiedRecommendation,
                  " Signal Confirmed"
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "opportunity-print-hide opp-scroll-hidden dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", ref: setRevealRef(5), children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
            isOpportunitySaved2 ? /* @__PURE__ */ jsxs("button", { type: "button", className: "opp-btn-secondary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-primary/40 bg-surface-container-high px-5 py-3 text-body-md font-semibold text-on-surface", onClick: () => setShowUnsaveConfirm(true), children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "✓" }),
              "Saved ✓"
            ] }) : /* @__PURE__ */ jsxs("button", { type: "button", className: "opp-btn-primary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-body-md font-semibold text-on-primary", onClick: () => {
              if (!missionReport) return;
              doSaveOpportunity({
                id: missionReport.missionId,
                missionId: missionReport.missionId,
                make: missionReport.make,
                model: missionReport.model,
                vehicleName: missionReport.vehicleName,
                vehicleType: missionReport.vehicleType,
                yearDisplay: missionReport.yearDisplay,
                maxMileageDisplay: missionReport.maxMileageDisplay,
                fuelType: missionReport.fuelType,
                transmission: missionReport.transmission,
                searchArea: missionReport.searchArea,
                askingPrice: missionReport.askingPriceDisplay,
                retailValue: missionReport.retailValueDisplay,
                projectedProfit: missionReport.projectedProfitDisplay,
                aiVerdict: unifiedRecommendation,
                confidence: unifiedConfidence,
                opportunityScore: typeof executiveScoreValue === "number" ? executiveScoreValue : 0,
                dateSaved: (/* @__PURE__ */ new Date()).toISOString()
              });
            }, children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "💾" }),
              "Save Opportunity"
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "opp-btn-secondary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-primary/40 bg-surface-container-high px-5 py-3 text-body-md font-semibold text-on-surface", onClick: () => setShowContactMessage(true), children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "📞" }),
              "Contact Seller"
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/search-builder", className: "opp-btn-primary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-body-md font-semibold text-on-primary", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "➕" }),
              "New AI Search"
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "opp-btn-secondary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-primary/40 bg-surface-container-high px-5 py-3 text-body-md font-semibold text-on-surface", onClick: openPrintDealerReport, children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🖨️" }),
              "Print Dealer Report"
            ] })
          ] }),
          showContactMessage && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-start gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-3", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-0.5 shrink-0 text-base", children: "ℹ️" }),
            /* @__PURE__ */ jsx("p", { className: "text-body-sm text-on-surface-variant", children: "Seller contact details are not yet available for this opportunity." }),
            /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Dismiss", className: "ml-auto shrink-0 text-on-surface-variant/60 hover:text-on-surface-variant", onClick: () => setShowContactMessage(false), children: "✕" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "opp-btn-secondary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-body-sm font-body-sm text-on-surface-variant", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🏠" }),
              "Return to Dashboard"
            ] }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "opp-btn-secondary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-body-sm font-body-sm text-on-surface-variant", onClick: () => setShowIgnoreConfirm(true), children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🚫" }),
              "Ignore Opportunity"
            ] })
          ] }),
          showIgnoreConfirm && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-body-sm font-semibold text-on-surface", children: "Ignore this opportunity?" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-body-sm text-on-surface-variant", children: "This opportunity will be dismissed and will no longer appear as an active recommendation. The report will be preserved." }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5", children: [
              /* @__PURE__ */ jsx("button", { type: "button", className: "inline-flex min-h-10 items-center justify-center rounded-xl bg-error px-4 py-2 text-body-sm font-semibold text-on-error", onClick: () => {
                if (resolvedMission) {
                  ignoreMission(resolvedMission.missionId);
                }
                void navigate({
                  to: "/dashboard"
                });
              }, children: "Yes, ignore it" }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "inline-flex min-h-10 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-sm font-body-sm text-on-surface-variant", onClick: () => setShowIgnoreConfirm(false), children: "Cancel" })
            ] })
          ] }),
          showUnsaveConfirm && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-body-sm font-semibold text-on-surface", children: "Remove from saved opportunities?" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-body-sm text-on-surface-variant", children: "This opportunity will be removed from your saved list. The report will not be affected." }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5", children: [
              /* @__PURE__ */ jsx("button", { type: "button", className: "inline-flex min-h-10 items-center justify-center rounded-xl bg-error px-4 py-2 text-body-sm font-semibold text-on-error", onClick: () => {
                doRemoveOpportunity();
                setShowUnsaveConfirm(false);
              }, children: "Yes, remove it" }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "inline-flex min-h-10 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-sm font-body-sm text-on-surface-variant", onClick: () => setShowUnsaveConfirm(false), children: "Cancel" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { "aria-label": "Back to top", className: "back-to-top-btn", onClick: scrollToTop, style: {
        opacity: showBackToTop ? 1 : 0,
        pointerEvents: showBackToTop ? "auto" : "none"
      }, type: "button", children: /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", fill: "none", height: "26", viewBox: "0 0 24 24", width: "26", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M5 15l7-7 7 7", stroke: "white", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "tica-dealer-print-doc", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "tdp-page tdp-page-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "tdp-header-bar", children: [
            /* @__PURE__ */ jsxs("div", { className: "tdp-header-left", children: [
              /* @__PURE__ */ jsx("span", { className: "tdp-brand-name", children: "Trade In Cars Agent" }),
              /* @__PURE__ */ jsx("span", { className: "tdp-brand-sub", children: "TICA AI Buying Report — Dealer Copy" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "tdp-header-right", children: [
              /* @__PURE__ */ jsx(TicaShield, { size: "sm" }),
              /* @__PURE__ */ jsx("span", { className: "tdp-certified-label", children: "TICA Certified™" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-mission-strip", children: [
            /* @__PURE__ */ jsx("span", { className: "tdp-mission-label", children: "Mission ID:" }),
            /* @__PURE__ */ jsx("span", { className: "tdp-mission-value", children: missionReport?.missionId ?? "Awaiting active mission" }),
            /* @__PURE__ */ jsxs("span", { className: "tdp-mission-date", children: [
              "Printed: ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-p1-body", children: [
            /* @__PURE__ */ jsxs("div", { className: "tdp-p1-vehicle", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "VEHICLE" }),
              /* @__PURE__ */ jsx("div", { className: "tdp-vehicle-name", children: missionReport?.vehicleName ?? "Awaiting active mission" }),
              /* @__PURE__ */ jsxs("dl", { className: "tdp-kv-grid tdp-kv-grid-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Year" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.yearDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Fuel" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.fuelType ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Transmission" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.transmission ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Mileage Target" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.maxMileageDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Registration" }),
                  /* @__PURE__ */ jsx("dd", { children: "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Service History" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.serviceHistory ?? "Requires verification" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `tdp-verdict-block tdp-verdict-${unifiedRecommendation.toLowerCase()}`, children: [
                /* @__PURE__ */ jsx("div", { className: "tdp-verdict-label", children: "TICA Recommendation™" }),
                /* @__PURE__ */ jsx("div", { className: "tdp-verdict-value", children: unifiedRecommendation }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-verdict-confidence", children: [
                  "Confidence: ",
                  unifiedConfidence
                ] }),
                /* @__PURE__ */ jsx("p", { className: "tdp-verdict-summary", children: reportVehicleIntelligence.dealerVerdict.summary })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "tdp-p1-deal", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "DEAL" }),
              /* @__PURE__ */ jsxs("dl", { className: "tdp-kv-grid tdp-kv-grid-1 tdp-deal-grid", children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv tdp-kv-highlight", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Asking Price" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.askingPriceDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Estimated Retail Value" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.retailValueDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Estimated Gross Profit" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.projectedProfitDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Recommended Offer" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.commercialDecision?.[0]?.value ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Walk-Away Price" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.commercialDecision?.[2]?.value ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Preparation Allowance" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.commercialDecision?.[3]?.value ?? "Awaiting live data" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading tdp-mt", children: "SELLER / LOCATION" }),
              /* @__PURE__ */ jsxs("dl", { className: "tdp-kv-grid tdp-kv-grid-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Seller / Dealer" }),
                  /* @__PURE__ */ jsx("dd", { children: "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Telephone / Contact" }),
                  /* @__PURE__ */ jsx("dd", { children: "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Vehicle Location" }),
                  /* @__PURE__ */ jsx("dd", { children: reportVehicleIntelligence.locationSummary[0]?.value ?? "Awaiting live data" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tdp-postcode-box", children: [
                /* @__PURE__ */ jsx("div", { className: "tdp-postcode-label", children: "Postcode (Sat-Nav)" }),
                /* @__PURE__ */ jsx("div", { className: "tdp-postcode-value", children: "Awaiting live data" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tdp-final-advice", children: [
                /* @__PURE__ */ jsx("span", { className: "tdp-final-advice-label", children: "TICA Advice: " }),
                missionReport?.finalAdvice ?? reportVehicleIntelligence.dealerVerdict.finalAdvice
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-footer-bar", children: [
            /* @__PURE__ */ jsx("span", { children: "Trade In Cars Agent · TICA Certified™ · AI Buying Report · Dealer Copy" }),
            /* @__PURE__ */ jsx("span", { children: "Page 1 of 3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tdp-page tdp-page-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "tdp-page-title-bar", children: [
            /* @__PURE__ */ jsx("span", { className: "tdp-page-title", children: "Buying & Inspection Information" }),
            /* @__PURE__ */ jsxs("span", { className: "tdp-page-vehicle", children: [
              missionReport?.vehicleName ?? "Vehicle",
              " · ",
              missionReport?.missionId ?? ""
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-p2-body", children: [
            /* @__PURE__ */ jsxs("div", { className: "tdp-p2-left", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "VEHICLE SPECIFICATION" }),
              /* @__PURE__ */ jsx("dl", { className: "tdp-kv-grid tdp-kv-grid-2 tdp-mb", children: vehicleInfo.map((item) => /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                /* @__PURE__ */ jsx("dt", { children: item.label }),
                /* @__PURE__ */ jsx("dd", { children: item.value })
              ] }, item.label)) }),
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "HISTORY & CHECKS STATUS" }),
              /* @__PURE__ */ jsx("div", { className: "tdp-history-list tdp-mb", children: reportVehicleIntelligence.vehicleHistory.map((item) => /* @__PURE__ */ jsxs("div", { className: "tdp-history-row", children: [
                /* @__PURE__ */ jsx("span", { className: "tdp-history-label", children: item.label }),
                /* @__PURE__ */ jsx("span", { className: "tdp-history-value tdp-status-check", children: item.value })
              ] }, item.label)) }),
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "INSPECTION ADVICE" }),
              /* @__PURE__ */ jsx("p", { className: "tdp-advice-text tdp-mb", children: reportVehicleIntelligence.inspectionAdvice }),
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "KNOWN MODEL ISSUES" }),
              /* @__PURE__ */ jsx("div", { className: "tdp-issues-list tdp-mb", children: /* @__PURE__ */ jsx("div", { className: "tdp-issue-row tdp-issue-warning", children: /* @__PURE__ */ jsx("span", { className: "tdp-issue-title", children: "Awaiting live vehicle intelligence. Model-specific faults will appear when verified." }) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "tdp-p2-right", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "AI INSPECTION CHECKLIST" }),
              /* @__PURE__ */ jsx("div", { className: "tdp-checklist tdp-mb", children: reportVehicleIntelligence.inspectionChecklist.map((cat) => /* @__PURE__ */ jsxs("div", { className: "tdp-checklist-cat", children: [
                /* @__PURE__ */ jsx("div", { className: "tdp-checklist-cat-name", children: cat.category }),
                cat.items.map((it) => /* @__PURE__ */ jsxs("div", { className: "tdp-checklist-item", children: [
                  /* @__PURE__ */ jsx("span", { className: `tdp-checklist-dot tdp-dot-${it.status}` }),
                  /* @__PURE__ */ jsx("span", { className: "tdp-checklist-label", children: it.label }),
                  /* @__PURE__ */ jsx("span", { className: `tdp-checklist-status tdp-status-${it.status}`, children: checklistStatusConfig[it.status].label })
                ] }, it.label))
              ] }, cat.category)) }),
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "QUESTIONS TO ASK THE SELLER" }),
              /* @__PURE__ */ jsx("div", { className: "tdp-questions tdp-mb", children: reportVehicleIntelligence.sellerQuestions.questions.map((q) => /* @__PURE__ */ jsxs("div", { className: "tdp-question-row", children: [
                /* @__PURE__ */ jsxs("span", { className: "tdp-question-num", children: [
                  q.id,
                  "."
                ] }),
                /* @__PURE__ */ jsx("span", { className: "tdp-question-text", children: q.text }),
                /* @__PURE__ */ jsx("span", { className: `tdp-question-priority tdp-qp-${q.priority}`, children: q.priority === "high" ? "HIGH" : q.priority === "important" ? "IMP" : "GEN" })
              ] }, q.id)) }),
              /* @__PURE__ */ jsxs("p", { className: "tdp-dealer-tip", children: [
                /* @__PURE__ */ jsx("strong", { children: "Dealer Tip:" }),
                " ",
                reportVehicleIntelligence.sellerQuestions.dealerTip
              ] }),
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading tdp-mt", children: "TICA DEALER VERDICT" }),
              /* @__PURE__ */ jsxs("div", { className: `tdp-verdict-block-sm tdp-verdict-${unifiedRecommendation.toLowerCase()}`, children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-vbs-row", children: [
                  /* @__PURE__ */ jsx("span", { className: "tdp-vbs-label", children: "Recommendation" }),
                  /* @__PURE__ */ jsx("span", { className: "tdp-vbs-value", children: unifiedRecommendation })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-vbs-row", children: [
                  /* @__PURE__ */ jsx("span", { className: "tdp-vbs-label", children: "Confidence" }),
                  /* @__PURE__ */ jsx("span", { className: "tdp-vbs-value", children: unifiedConfidence })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tdp-actions-list tdp-mt-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "tdp-actions-heading", children: "Recommended Actions:" }),
                reportVehicleIntelligence.dealerVerdict.recommendedActions.map((a) => /* @__PURE__ */ jsxs("div", { className: "tdp-action-row", children: [
                  "✓ ",
                  a
                ] }, a))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-footer-bar", children: [
            /* @__PURE__ */ jsx("span", { children: "Trade In Cars Agent · TICA Certified™ · AI Buying Report · Dealer Copy" }),
            /* @__PURE__ */ jsx("span", { children: "Page 2 of 3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tdp-page tdp-page-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "tdp-page-title-bar", children: [
            /* @__PURE__ */ jsx("span", { className: "tdp-page-title", children: "Viewing & Collection Sheet" }),
            /* @__PURE__ */ jsxs("span", { className: "tdp-page-vehicle", children: [
              missionReport?.vehicleName ?? "Vehicle",
              " · ",
              missionReport?.missionId ?? ""
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-p3-top", children: [
            /* @__PURE__ */ jsxs("div", { className: "tdp-p3-block", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "SELLER / VEHICLE" }),
              /* @__PURE__ */ jsxs("dl", { className: "tdp-kv-grid tdp-kv-grid-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Seller / Dealer" }),
                  /* @__PURE__ */ jsx("dd", { children: "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Telephone / Contact" }),
                  /* @__PURE__ */ jsx("dd", { children: "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Vehicle Address" }),
                  /* @__PURE__ */ jsx("dd", { children: reportVehicleIntelligence.locationSummary[0]?.value ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Registration" }),
                  /* @__PURE__ */ jsx("dd", { children: "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Asking Price" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.askingPriceDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Vehicle" }),
                  /* @__PURE__ */ jsxs("dd", { children: [
                    missionReport?.vehicleName ?? "Awaiting live data",
                    " · ",
                    missionReport?.yearDisplay ?? ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "tdp-postcode-box", children: [
                /* @__PURE__ */ jsx("div", { className: "tdp-postcode-label", children: "Postcode (Sat-Nav)" }),
                /* @__PURE__ */ jsx("div", { className: "tdp-postcode-value", children: "Awaiting live data" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "tdp-p3-block", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "DEAL INFORMATION" }),
              /* @__PURE__ */ jsxs("dl", { className: "tdp-kv-grid tdp-kv-grid-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv tdp-kv-highlight", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Target Buying Price" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.commercialDecision?.[0]?.value ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Estimated Retail Value" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.retailValueDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Estimated Gross Profit" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.projectedProfitDisplay ?? "Awaiting live data" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Walk-Away Price" }),
                  /* @__PURE__ */ jsx("dd", { children: missionReport?.commercialDecision?.[2]?.value ?? "Awaiting live data" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: `tdp-verdict-block-sm tdp-verdict-${unifiedRecommendation.toLowerCase()} tdp-mt`, children: /* @__PURE__ */ jsxs("div", { className: "tdp-vbs-row", children: [
                /* @__PURE__ */ jsx("span", { className: "tdp-vbs-label", children: "TICA Recommendation" }),
                /* @__PURE__ */ jsx("span", { className: "tdp-vbs-value", children: unifiedRecommendation })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "tdp-p3-block", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "COLLECTION" }),
              /* @__PURE__ */ jsxs("dl", { className: "tdp-kv-grid tdp-kv-grid-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: "Vehicle Location" }),
                  /* @__PURE__ */ jsx("dd", { children: reportVehicleIntelligence.locationSummary[0]?.value ?? "Awaiting live data" })
                ] }),
                reportVehicleIntelligence.locationSummary.slice(1).map((item) => /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: item.label }),
                  /* @__PURE__ */ jsx("dd", { children: item.value })
                ] }, item.label)),
                reportVehicleIntelligence.collectionSummary.map((item) => /* @__PURE__ */ jsxs("div", { className: "tdp-kv", children: [
                  /* @__PURE__ */ jsx("dt", { children: item.label }),
                  /* @__PURE__ */ jsx("dd", { children: item.value })
                ] }, item.label))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-notes-section", children: [
            /* @__PURE__ */ jsx("div", { className: "tdp-section-heading", children: "DEALER NOTES" }),
            /* @__PURE__ */ jsx("div", { className: "tdp-notes-grid", children: ["Vehicle condition", "Faults found", "Service / history notes", "Seller comments", "Negotiated price", "Final offer"].map((label) => /* @__PURE__ */ jsxs("div", { className: "tdp-note-field", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-note-label", children: label }),
              /* @__PURE__ */ jsxs("div", { className: "tdp-note-lines", children: [
                /* @__PURE__ */ jsx("div", { className: "tdp-note-line" }),
                /* @__PURE__ */ jsx("div", { className: "tdp-note-line" }),
                /* @__PURE__ */ jsx("div", { className: "tdp-note-line" }),
                /* @__PURE__ */ jsx("div", { className: "tdp-note-line" })
              ] })
            ] }, label)) }),
            /* @__PURE__ */ jsxs("div", { className: "tdp-note-field tdp-note-field-full", children: [
              /* @__PURE__ */ jsx("div", { className: "tdp-note-label", children: "Other notes" }),
              /* @__PURE__ */ jsx("div", { className: "tdp-note-lines", children: Array.from({
                length: 6
              }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "tdp-note-line" }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "tdp-footer-bar", children: [
            /* @__PURE__ */ jsx("span", { children: "Trade In Cars Agent · TICA Certified™ · AI Buying Report · Dealer Copy" }),
            /* @__PURE__ */ jsx("span", { children: "Page 3 of 3" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  OpportunityPage as component
};
