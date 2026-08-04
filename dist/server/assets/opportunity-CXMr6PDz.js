import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-CoJ8XGWI.js";
import { o as opportunityIntelligencePlaceholder } from "./opportunity-intelligence-D9QzETEO.js";
import { l as loadMission } from "./mission-BlUhdbKx.js";
const {
  featuredOpportunity
} = opportunityIntelligencePlaceholder;
const ticaVehicleIntelligence = {
  modelIssues: [{
    tone: "warning",
    title: "Wet timing belt fitted on some engine variants.",
    detail: "Inspect service invoices for evidence of the correct belt kit and oil-spec maintenance."
  }, {
    tone: "high",
    title: "Check for evidence of timing belt replacement.",
    detail: "High priority if mileage or age suggests the interval is due or recently exceeded."
  }, {
    tone: "warning",
    title: "Water pump commonly replaced with timing belt.",
    detail: "Confirm whether the pump, tensioners and coolant refresh were completed together."
  }, {
    tone: "info",
    title: "Oil dilution can occur if used mainly for short journeys.",
    detail: "Review service frequency and ask about repeated DPF regenerations or frequent top-ups."
  }],
  inspectionChecklist: [{
    category: "Exterior",
    items: [{
      label: "Paint consistency",
      status: "verified"
    }, {
      label: "Panel alignment",
      status: "check"
    }, {
      label: "Corrosion / rust inspection",
      status: "check"
    }, {
      label: "Glass and lighting",
      status: "verified"
    }, {
      label: "Alloy wheel condition",
      status: "check"
    }, {
      label: "Tyre wear pattern",
      status: "high"
    }]
  }, {
    category: "Mechanical",
    items: [{
      label: "Cold engine start",
      status: "verified"
    }, {
      label: "Timing belt / chain evidence",
      status: "high"
    }, {
      label: "Oil leaks",
      status: "check"
    }, {
      label: "Coolant condition",
      status: "check"
    }, {
      label: "Suspension noises",
      status: "check"
    }, {
      label: "Gearbox operation",
      status: "verified"
    }]
  }, {
    category: "Interior",
    items: [{
      label: "Dashboard warning lights",
      status: "verified"
    }, {
      label: "Air conditioning",
      status: "check"
    }, {
      label: "Electrical equipment",
      status: "check"
    }, {
      label: "Seat wear versus mileage",
      status: "check"
    }, {
      label: "Spare key present",
      status: "notAvailable"
    }, {
      label: "Service book available",
      status: "verified"
    }]
  }, {
    category: "Documentation",
    items: [{
      label: "VIN matches paperwork",
      status: "verified"
    }, {
      label: "MOT history reviewed",
      status: "verified"
    }, {
      label: "Service invoices checked",
      status: "high"
    }, {
      label: "Outstanding finance check",
      status: "notAvailable"
    }, {
      label: "Recall status",
      status: "check"
    }, {
      label: "Number of owners confirmed",
      status: "verified"
    }]
  }],
  inspectionAdvice: "Pay particular attention to the timing belt replacement history and inspect for evidence of regular servicing. These checks are likely to have the greatest impact on long-term ownership costs.",
  dealerVerdict: {
    strengths: ["Strong retail demand", "ULEZ compliant", "Competitive running costs", "Good fuel economy", "Attractive projected margin", "Seller location is practical for collection"],
    verificationItems: [{
      label: "Wet timing belt replacement invoice",
      tone: "high"
    }, {
      label: "Water-pump and tensioner history",
      tone: "warning"
    }, {
      label: "Complete service invoices",
      tone: "high"
    }, {
      label: "Recall status",
      tone: "warning"
    }, {
      label: "Outstanding finance check",
      tone: "high"
    }],
    commercialDecision: [{
      label: "Recommended Offer",
      value: "£30,750",
      tone: "review"
    }, {
      label: "Expected Purchase Range",
      value: "£31,250–£31,750",
      tone: "default"
    }, {
      label: "Walk-Away Price",
      value: "£32,000",
      tone: "pass"
    }, {
      label: "Preparation Allowance",
      value: "£850",
      tone: "default"
    }, {
      label: "Estimated Retail Value",
      value: "£36,250",
      tone: "buy"
    }, {
      label: "Projected Gross Profit",
      value: "£3,650–£4,150",
      tone: "buy"
    }],
    finalAdvice: "Proceed only after confirming the wet-belt replacement history, service invoices and finance status. If satisfactory, contact the seller today and begin negotiations at £30,750."
  },
  runningCosts: [{
    label: "Typical Annual Service Cost",
    value: "£390–£540",
    tone: "info"
  }, {
    label: "Timing Belt / Chain",
    value: "Wet belt — invoice recommended",
    tone: "warning"
  }, {
    label: "Insurance Group",
    value: "Group 19",
    tone: "info"
  }, {
    label: "Fuel Economy",
    value: "52 MPG combined",
    tone: "info"
  }, {
    label: "Road Tax Band",
    value: "£190 standard rate",
    tone: "info"
  }, {
    label: "ULEZ Status",
    value: "Compliant",
    tone: "info"
  }, {
    label: "Known High Cost Repairs",
    value: "Turbo / belt-related work",
    tone: "high"
  }, {
    label: "Dealer Demand Rating",
    value: "Strong retail demand",
    tone: "info"
  }, {
    label: "Typical Parts Availability",
    value: "Good",
    tone: "info"
  }],
  ownershipRisk: {
    level: "Medium",
    description: "Based on known reliability patterns and ownership trends."
  },
  sellerQuestions: {
    questions: [{
      id: 1,
      text: "Has the wet timing belt been replaced, and is there an invoice?",
      priority: "high"
    }, {
      id: 2,
      text: "Was the water pump, tensioners and coolant replaced at the same time?",
      priority: "high"
    }, {
      id: 3,
      text: "Which engine oil specification has been used during servicing?",
      priority: "important"
    }, {
      id: 4,
      text: "Has the vehicle required frequent oil top-ups between services?",
      priority: "important"
    }, {
      id: 5,
      text: "Have there been any DPF, emissions or engine warning lights?",
      priority: "important"
    }, {
      id: 6,
      text: "Is the complete service history available with supporting invoices?",
      priority: "high"
    }, {
      id: 7,
      text: "Have all manufacturer recalls and service campaigns been completed?",
      priority: "important"
    }, {
      id: 8,
      text: "Are both keys, the handbook pack and the locking-wheel key present?",
      priority: "general"
    }],
    dealerTip: "Ask for photographs of service invoices and supporting documents before travelling to inspect the vehicle."
  }
};
function ChevronRightIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) });
}
function OpportunityPage() {
  const decisionModel = featuredOpportunity.decisionModel;
  const unifiedRecommendation = "BUY";
  const unifiedConfidence = "97%";
  const normalizedDecisionAction = unifiedRecommendation;
  const decisionVerdictClassName = "tica-decision-buy";
  const decisionVerdictGlowClassName = "tica-decision-buy-glow";
  const investigationTimeline = [{
    time: "09:02",
    message: "✓ Price reduced by £850 (from £32,845 to £31,995)."
  }, {
    time: "09:04",
    message: "↑ Dealer demand increased (+12% buyer interest in 24 hours)."
  }, {
    time: "09:06",
    message: "✓ Opportunity Score increased from 91 to 94."
  }, {
    time: "09:08",
    message: "🟢 BUY threshold reached (confidence steady at 97%)."
  }];
  const vehicleInfo = featuredOpportunity.vehicleInfo;
  const ownershipRiskToneClass = "tica-decision-review";
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
  const confidencePercent = parseFloat(featuredOpportunity.confidenceDisplay);
  const meterZone = confidencePercent >= 67 ? "buy" : confidencePercent >= 34 ? "review" : "pass";
  const meterLabel = unifiedRecommendation;
  const meterSentence = meterZone === "buy" ? "TICA considers this one of today's strongest buying opportunities based on pricing, resale demand and projected profit." : meterZone === "review" ? "TICA flags this opportunity for further review — some indicators are positive but caution is advised before committing." : "TICA does not recommend this vehicle at current pricing — margins and demand indicators fall below buying thresholds.";
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dotPulsing, setDotPulsing] = useState(true);
  const [meterAnimated, setMeterAnimated] = useState(false);
  const [activeMission, setActiveMission] = useState(null);
  useEffect(() => {
    setActiveMission(loadMission());
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
  useEffect(() => {
    const timers = [];
    for (let i = 0; i < 5; i++) {
      timers.push(setTimeout(() => setAnalysisStep(i + 1), 200 + i * 400));
    }
    timers.push(setTimeout(() => setAnalysisComplete(true), 200 + 4 * 400 + 600));
    timers.push(setTimeout(() => setDotPulsing(false), 2500));
    timers.push(setTimeout(() => setMeterAnimated(true), 120));
    return () => timers.forEach(clearTimeout);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(PlatformShell, { navItems: [{
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
  }], children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsxs("header", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Trade In Cars Agent" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-3 sm:w-auto sm:flex-row", children: [
            /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary sm:w-auto", children: "Return to Dashboard" }),
            /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-body-md font-body-md text-on-primary transition-all hover:brightness-110 sm:w-auto", children: "Create New AI Search" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mt-4 flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "transition-colors hover:text-primary", children: "Dealer Command Centre" }),
          /* @__PURE__ */ jsx(ChevronRightIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "text-on-surface", children: "AI Buying Report" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "AI Buying Report" }),
            /* @__PURE__ */ jsxs("p", { className: "text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant", children: [
              "Vehicle Opportunity ID: ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-on-surface", children: featuredOpportunity.id })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "self-end sm:self-auto", children: /* @__PURE__ */ jsx(TicaShield, { size: "lg" }) })
        ] })
      ] }),
      activeMission && /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "Mission status", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80", children: "Mission Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm font-semibold text-on-surface", children: activeMission.missionId })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary", children: activeMission.status || "Mission Created" })
        ] }),
        /* @__PURE__ */ jsxs("dl", { className: "mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Current Stage" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: "Analysis Complete" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Progress" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: "100%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Completed In" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: "12.4 seconds" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Mission Status" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: "Completed Successfully" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Executive Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-primary/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "TICA Recommendation™" }),
            /* @__PURE__ */ jsx("p", { className: `mt-2 text-[28px] font-semibold leading-none sm:text-[32px] ${decisionVerdictClassName} ${decisionVerdictGlowClassName}`, children: normalizedDecisionAction })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Confidence" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[28px] font-semibold leading-none text-primary sm:text-[32px]", children: unifiedConfidence })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Gross Profit" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[28px] font-semibold leading-none text-on-surface sm:text-[32px]", children: featuredOpportunity.estimatedGrossProfitDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Retail Value" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[28px] font-semibold leading-none text-on-surface sm:text-[32px]", children: featuredOpportunity.estimatedRetailValueDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Opportunity Score" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[28px] font-semibold leading-none text-primary sm:text-[32px]", children: decisionModel.factors.overallOpportunityScore.displayValue })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Days to Sell" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[28px] font-semibold leading-none text-on-surface sm:text-[32px]", children: featuredOpportunity.daysToSellDisplay })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-primary/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "TICA Opportunity Ranking", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "TICA Opportunity Ranking™" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[22px] leading-none", "aria-label": "5 stars", children: "★★★★★" }),
              /* @__PURE__ */ jsx("span", { className: "text-body-md font-semibold text-on-surface", children: "Gold Opportunity" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/25 bg-primary/10 px-4 py-2 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-primary", children: "Today's Ranking" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-lg font-semibold text-on-surface", children: "#3 Best Opportunity Found Today" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Dealer Confidence" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[22px] font-semibold leading-none text-primary", children: "97%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Profit Potential" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[18px] leading-none tica-decision-buy", "aria-label": "5 stars", children: "★★★★★" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Market Demand" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[18px] leading-none tica-decision-buy", "aria-label": "5 stars", children: "★★★★★" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Risk Rating" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[18px] leading-none", "aria-label": "2 out of 5 stars", children: [
              /* @__PURE__ */ jsx("span", { className: "tica-decision-pass", children: "★★" }),
              /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant/30", children: "☆☆☆" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-2.5 text-center sm:col-span-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Est. Days To Sell" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[22px] font-semibold leading-none text-on-surface", children: "9 Days" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 sm:px-5", "aria-label": "TICA analysis status", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx("span", { className: `inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--tica-decision-buy)] ${dotPulsing ? "tica-status-dot-pulse" : ""}`, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps font-semibold uppercase tracking-widest text-on-surface", children: "AI Analysis Complete" })
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
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "Dealer Decision Meter", children: [
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
        /* @__PURE__ */ jsxs("div", { className: "ddm-bar-wrapper", children: [
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
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "AI Buying Verdict" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "verdict-card-premium flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-center sm:px-4.5 sm:py-4 lg:min-w-[250px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "traffic-light-shell", "aria-label": "AI buying verdict traffic light", children: [
              /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${"traffic-light-lens-buy-active"}`, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${""}`, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${""}`, "aria-hidden": "true" })
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
            /* @__PURE__ */ jsxs("ul", { className: "flex-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-body-sm font-body-sm text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-px shrink-0 font-semibold", children: "✓" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Asking price ",
                  featuredOpportunity.listPriceDisplay,
                  " below estimated market value (",
                  featuredOpportunity.estimatedRetailValueDisplay,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-body-sm font-body-sm text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-px shrink-0 font-semibold", children: "✓" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Estimated profit ",
                  featuredOpportunity.estimatedGrossProfitDisplay,
                  " exceeds target"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-body-sm font-body-sm text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-px shrink-0 font-semibold", children: "✓" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Strong current market demand — ",
                  featuredOpportunity.demandRatingDisplay
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-body-sm font-body-sm text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-px shrink-0 font-semibold", children: "✓" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Low overall buying risk — ",
                  featuredOpportunity.riskLevel
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-body-sm font-body-sm text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-px shrink-0 font-semibold", children: "✓" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Estimated retail margin is excellent — ",
                  featuredOpportunity.scoring.estimatedProfitScore.status
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 border-t border-outline-variant/25 pt-3", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Recommended Action" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1.5 text-body-sm font-body-sm leading-6 text-on-surface", children: [
                /* @__PURE__ */ jsx("li", { children: "Contact the seller today." }),
                /* @__PURE__ */ jsx("li", { children: "Request MOT history." }),
                /* @__PURE__ */ jsx("li", { children: "Confirm service records before placing an offer." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-headline-md font-headline-md text-on-surface", children: "Dealer Notes" }),
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-body-sm font-body-sm text-on-surface-variant", children: "Record your offer price, call outcomes, next actions and observations." }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "e.g. Offer price: £30,750 · Call seller Monday · Await HPI · Reserve vehicle...", className: "h-36 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-32" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl border border-outline-variant/30 bg-surface-container-high p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant", children: "Target Vehicle" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-headline-lg font-headline-lg text-on-surface", children: featuredOpportunity.vehicle }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Year" }),
                /* @__PURE__ */ jsx("span", { className: "mt-1 block text-body-lg font-body-lg text-on-surface", children: featuredOpportunity.year })
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Asking Price" }),
                /* @__PURE__ */ jsx("span", { className: "mt-1 block text-body-lg font-body-lg text-primary", children: featuredOpportunity.listPriceDisplay })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 sm:w-56 md:w-64", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container", children: /* @__PURE__ */ jsx("img", { src: featuredOpportunity.heroImageSrc, alt: featuredOpportunity.heroImageAlt, className: "h-[160px] w-full object-cover sm:h-[140px]" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-1.5 grid grid-cols-4 gap-1.5", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] rounded-lg border border-outline-variant/30 bg-surface-container-high flex items-center justify-center overflow-hidden", "aria-label": `Vehicle photo ${n + 1}`, children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-on-surface-variant/25", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3.75 18.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5z" }) }) }, n)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Vehicle Information" }),
        /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: vehicleInfo.map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high p-4", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: item.label }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-body-md font-body-md text-on-surface", children: item.value })
        ] }, item.label)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-2.5 sm:p-3.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 border-b border-outline-variant/25 pb-2.5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "TICA Vehicle Intelligence™" }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "TICA Vehicle Intelligence™" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: "AI-powered model knowledge based on known ownership issues, manufacturer data, technician experience and real-world reliability trends." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2.5 grid grid-cols-1 items-start gap-4 xl:grid-cols-[1.45fr_0.95fr]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "Professional Intelligence Card" }),
                  /* @__PURE__ */ jsx("h3", { className: "mt-1.5 text-title-lg font-semibold text-on-surface", children: "⚠ Known Model Issues" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "rounded-full border border-outline-variant/30 bg-surface-container px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "AI model knowledge" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: ticaVehicleIntelligence.modelIssues.map((issue) => {
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
              /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2", children: ticaVehicleIntelligence.inspectionChecklist.map((section) => /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
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
                /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm leading-relaxed text-on-surface", children: ticaVehicleIntelligence.inspectionAdvice })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5 xl:block", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 border-b border-outline-variant/25 pb-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "TICA Dealer Verdict™" }),
                  /* @__PURE__ */ jsx("h3", { className: "mt-1 text-title-lg font-semibold text-on-surface", children: "TICA Recommendation™" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-full border border-[rgba(var(--tica-decision-buy-rgb),0.28)] bg-[rgba(var(--tica-decision-buy-rgb),0.14)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] tica-decision-buy", children: [
                  "Confidence ",
                  unifiedConfidence
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-[rgba(var(--tica-decision-buy-rgb),0.24)] bg-[rgba(var(--tica-decision-buy-rgb),0.08)] px-3 py-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Main Recommendation" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-body-lg font-semibold tracking-[0.01em] tica-decision-buy", children: unifiedRecommendation }),
                  /* @__PURE__ */ jsx("div", { className: "h-3 w-3 shrink-0 rounded-full bg-[var(--tica-decision-buy)] shadow-[0_0_12px_rgba(var(--tica-decision-buy-rgb),0.5)]", "aria-hidden": "true" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Strengths" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-x-3 gap-y-2", children: ticaVehicleIntelligence.dealerVerdict.strengths.map((strength) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mt-0.5 text-[11px] font-semibold", children: "●" }),
                    /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm leading-snug text-on-surface", children: strength })
                  ] }, strength)) })
                ] }),
                /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-outline-variant/25 bg-surface-container p-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Items to Verify" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: ticaVehicleIntelligence.dealerVerdict.verificationItems.map((item) => {
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
                /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-2.5", children: ticaVehicleIntelligence.dealerVerdict.commercialDecision.map((item) => {
                  const valueClassName = item.tone === "buy" ? "tica-decision-buy" : item.tone === "review" ? "tica-decision-review" : item.tone === "pass" ? "tica-decision-pass" : "text-on-surface";
                  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/20 bg-surface-container-high px-3 py-2.5", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant", children: item.label }),
                    /* @__PURE__ */ jsx("p", { className: `mt-1 text-body-sm font-semibold ${valueClassName}`, children: item.value })
                  ] }, item.label);
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-primary/20 bg-primary-container/10 px-3 py-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-primary", children: "Final TICA Advice" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-body-sm font-body-sm leading-relaxed text-on-surface", children: ticaVehicleIntelligence.dealerVerdict.finalAdvice })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2.5", children: [
                /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-10 rounded-xl border border-primary/30 bg-primary px-4 py-2 text-body-sm font-semibold text-on-primary transition hover:bg-primary/90", children: "Save Opportunity" }),
                /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-10 rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-2 text-body-sm font-semibold text-on-surface-variant", children: "Generate Dealer Report" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
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
                      "🟡 ",
                      ticaVehicleIntelligence.ownershipRisk.level
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-3.5 w-3.5 rounded-full bg-[var(--tica-decision-review)] shadow-[0_0_10px_rgba(212,165,55,0.45)]", "aria-hidden": "true" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-body-sm font-body-sm leading-relaxed text-on-surface-variant", children: ticaVehicleIntelligence.ownershipRisk.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-primary", children: "Running Cost Intelligence" }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2", children: ticaVehicleIntelligence.runningCosts.map((item) => {
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
              }, children: /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full bg-[#e8eaed]", "aria-label": "Map placeholder – Google Maps will load here", children: [
                /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 h-full w-full", xmlns: "http://www.w3.org/2000/svg", children: [
                  /* @__PURE__ */ jsx("line", { x1: "0", y1: "100", x2: "100%", y2: "100", stroke: "#fff", strokeWidth: "8", opacity: "0.9" }),
                  /* @__PURE__ */ jsx("line", { x1: "0", y1: "140", x2: "100%", y2: "140", stroke: "#fff", strokeWidth: "5", opacity: "0.7" }),
                  /* @__PURE__ */ jsx("line", { x1: "0", y1: "60", x2: "100%", y2: "60", stroke: "#fff", strokeWidth: "4", opacity: "0.6" }),
                  /* @__PURE__ */ jsx("line", { x1: "120", y1: "0", x2: "120", y2: "100%", stroke: "#fff", strokeWidth: "7", opacity: "0.9" }),
                  /* @__PURE__ */ jsx("line", { x1: "220", y1: "0", x2: "220", y2: "100%", stroke: "#fff", strokeWidth: "4", opacity: "0.6" }),
                  /* @__PURE__ */ jsx("line", { x1: "60", y1: "0", x2: "60", y2: "100%", stroke: "#fff", strokeWidth: "3", opacity: "0.5" }),
                  /* @__PURE__ */ jsx("line", { x1: "0", y1: "200", x2: "180", y2: "0", stroke: "#fff", strokeWidth: "5", opacity: "0.65" }),
                  /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "55", height: "55", fill: "#d4d8d0", opacity: "0.5" }),
                  /* @__PURE__ */ jsx("rect", { x: "125", y: "0", width: "90", height: "55", fill: "#d4d8d0", opacity: "0.5" }),
                  /* @__PURE__ */ jsx("rect", { x: "225", y: "0", width: "120", height: "95", fill: "#d4d8d0", opacity: "0.4" }),
                  /* @__PURE__ */ jsx("rect", { x: "0", y: "105", width: "115", height: "30", fill: "#c8e6c9", opacity: "0.4" }),
                  /* @__PURE__ */ jsx("rect", { x: "125", y: "105", width: "90", height: "30", fill: "#d4d8d0", opacity: "0.4" }),
                  /* @__PURE__ */ jsx("rect", { x: "0", y: "145", width: "55", height: "55", fill: "#d4d8d0", opacity: "0.5" }),
                  /* @__PURE__ */ jsx("rect", { x: "125", y: "145", width: "90", height: "55", fill: "#d4d8d0", opacity: "0.4" }),
                  /* @__PURE__ */ jsx("rect", { x: "225", y: "105", width: "120", height: "95", fill: "#c8e6c9", opacity: "0.35" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full", style: {
                  marginTop: "-8px"
                }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "h-4 w-4 text-on-primary", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.008a6.79 6.79 0 00-6.79-6.79 6.79 6.79 0 00-6.79 6.79c0 3.311 1.556 6.005 3.5 8.008a19.579 19.579 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z", clipRule: "evenodd" }) }) }),
                  /* @__PURE__ */ jsx("div", { className: "mt-0.5 h-2 w-0.5 bg-primary opacity-80" }),
                  /* @__PURE__ */ jsx("div", { className: "h-1 w-1 rounded-full bg-primary opacity-50" })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[58%] -translate-x-1/2", children: /* @__PURE__ */ jsx("div", { className: "rounded-md bg-white px-2 py-0.5 shadow-md", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold text-gray-800", children: "Manchester" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 rounded bg-white px-1.5 py-0.5 shadow-sm opacity-80", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold tracking-tight text-gray-500", children: "Map · Google Maps" }) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute right-2 top-2 flex flex-col overflow-hidden rounded border border-outline-variant/30 bg-white shadow-sm", children: [
                  /* @__PURE__ */ jsx("button", { className: "flex h-6 w-6 items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-100", "aria-label": "Zoom in", children: "+" }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-outline-variant/30" }),
                  /* @__PURE__ */ jsx("button", { className: "flex h-6 w-6 items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-100", "aria-label": "Zoom out", children: "−" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-2 gap-1.5", children: [{
                icon: "📍",
                label: "Vehicle Location",
                value: "Manchester"
              }, {
                icon: "🚗",
                label: "Distance",
                value: "184 miles"
              }, {
                icon: "🕒",
                label: "Estimated Drive",
                value: "3 hr 20 min"
              }, {
                icon: "⛽",
                label: "Estimated Fuel Cost",
                value: "£68"
              }, {
                icon: "✈",
                label: "Nearest Airport",
                value: "Manchester Airport"
              }, {
                icon: "🚆",
                label: "Nearest Railway",
                value: "Manchester Piccadilly"
              }].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-outline-variant/20 bg-surface-container px-2.5 py-2", children: [
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
                  value: "M6 North"
                }, {
                  label: "Collection difficulty",
                  value: "Easy"
                }, {
                  label: "Traffic risk",
                  value: "Low"
                }, {
                  label: "Estimated transport cost",
                  value: "£165"
                }, {
                  label: "Best collection day",
                  value: "Tuesday"
                }].map((row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
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
              /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-2", children: [{
                status: "clear",
                icon: "💳",
                label: "Finance Check",
                value: "Clear",
                detail: "No outstanding finance recorded"
              }, {
                status: "clear",
                icon: "🚔",
                label: "Police Stolen Check",
                value: "No Record Found",
                detail: "Not listed as stolen on PNC"
              }, {
                status: "clear",
                icon: "🛡",
                label: "Insurance Write-Off",
                value: "None Recorded",
                detail: "No Cat A, B, S or N markers"
              }, {
                status: "clear",
                icon: "📏",
                label: "Mileage Verification",
                value: "Consistent",
                detail: "Mileage aligns with MOT and service history"
              }, {
                status: "clear",
                icon: "🔎",
                label: "VIN Verification",
                value: "Matches DVLA Records",
                detail: "VIN matches official DVLA registration"
              }, {
                status: "attention",
                icon: "⚠️",
                label: "Outstanding Recalls",
                value: "1 Recall Outstanding",
                detail: "Contact manufacturer before purchase"
              }, {
                status: "attention",
                icon: "👤",
                label: "Previous Owners",
                value: "3 Registered Keepers",
                detail: "Within expected range for age and mileage"
              }, {
                status: "clear",
                icon: "🌍",
                label: "Import / Export Status",
                value: "UK Supplied",
                detail: "No import or export flags recorded"
              }].map((item) => {
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
              /* @__PURE__ */ jsx("div", { className: "mt-2.5 space-y-1.5", children: ticaVehicleIntelligence.sellerQuestions.questions.map((q) => {
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
                /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm leading-snug text-on-surface-variant", children: ticaVehicleIntelligence.sellerQuestions.dealerTip })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border timeline-mobile-shell rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Investigation Timeline" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 max-w-2xl text-body-md font-body-md text-on-surface-variant", children: "The AI reasoning process behind this recommendation." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "timeline-status-panel", children: [
            /* @__PURE__ */ jsx("p", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI Reasoning" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: [
              /* @__PURE__ */ jsx("span", { className: "tica-decision-buy mr-2", children: "🟢" }),
              "BUY signal confirmed"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-on-surface-variant", children: "Placeholder investigation checkpoints shown in decision order." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "timeline-list mt-4", "aria-label": "AI investigation timeline", children: investigationTimeline.map((event) => /* @__PURE__ */ jsxs("article", { className: "timeline-entry", children: [
          /* @__PURE__ */ jsx("p", { className: "timeline-entry-time", children: event.time }),
          /* @__PURE__ */ jsx("div", { className: "timeline-entry-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("p", { className: "timeline-entry-message", children: event.message })
        ] }, `${event.time}-${event.message}`)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-12 rounded-xl bg-primary px-5 py-3 text-body-md font-semibold text-on-primary transition-all hover:brightness-110 active:scale-[0.98]", children: "Save Opportunity" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-12 rounded-xl border border-primary/40 bg-surface-container-high px-5 py-3 text-body-md font-semibold text-on-surface transition-all hover:border-primary/70 hover:text-primary active:scale-[0.98]", children: "Contact Seller" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-12 rounded-xl border border-primary/40 bg-surface-container-high px-5 py-3 text-body-md font-semibold text-on-surface transition-all hover:border-primary/70 hover:text-primary active:scale-[0.98]", children: "Generate Dealer Report (PDF)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-body-sm font-body-sm text-on-surface-variant transition-all hover:text-on-surface active:scale-[0.98]", children: "Run Live Vehicle History Check" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-body-sm font-body-sm text-on-surface-variant transition-all hover:text-on-surface active:scale-[0.98]", children: "Add to Watchlist" }),
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-body-sm font-body-sm text-on-surface-variant transition-all hover:text-on-surface active:scale-[0.98]", children: "Return to Dashboard" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { "aria-label": "Back to top", className: "back-to-top-btn", onClick: scrollToTop, style: {
      opacity: showBackToTop ? 1 : 0,
      pointerEvents: showBackToTop ? "auto" : "none"
    }, type: "button", children: /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", fill: "none", height: "26", viewBox: "0 0 24 24", width: "26", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M5 15l7-7 7 7", stroke: "white", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5" }) }) })
  ] });
}
export {
  OpportunityPage as component
};
