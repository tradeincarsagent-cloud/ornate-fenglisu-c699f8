import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-CoJ8XGWI.js";
import { o as opportunityIntelligencePlaceholder } from "./opportunity-intelligence-ZRinpF5O.js";
import { l as loadMission, M as MISSION_STAGES } from "./mission-BlUhdbKx.js";
const {
  featuredOpportunity
} = opportunityIntelligencePlaceholder;
function ChevronRightIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) });
}
function OpportunityPage() {
  const decisionModel = featuredOpportunity.decisionModel;
  const decisionAction = decisionModel.recommendedAction;
  const decisionActionDisplay = decisionModel.recommendedActionDisplay;
  const normalizedDecisionAction = decisionActionDisplay.toUpperCase();
  const isBuyVerdict = normalizedDecisionAction === "BUY";
  const isReviewVerdict = normalizedDecisionAction === "REVIEW";
  const isPassVerdict = normalizedDecisionAction === "PASS";
  const decisionVerdictClassName = isBuyVerdict ? "tica-decision-buy" : isReviewVerdict ? "tica-decision-review" : isPassVerdict ? "tica-decision-pass" : "text-on-surface";
  const decisionVerdictGlowClassName = isBuyVerdict ? "tica-decision-buy-glow" : "";
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
  const [buyingSummaryLead, buyingSummaryTail = ""] = featuredOpportunity.buyingSummary.split(decisionAction);
  const confidencePercent = parseFloat(featuredOpportunity.confidenceDisplay);
  const meterZone = confidencePercent >= 67 ? "buy" : confidencePercent >= 34 ? "review" : "pass";
  const meterLabel = meterZone === "buy" ? "BUY NOW" : meterZone === "review" ? "REVIEW" : "PASS";
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
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: activeMission.currentStage || MISSION_STAGES[0] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Progress" }),
            /* @__PURE__ */ jsxs("dd", { className: "mt-0.5 font-medium text-on-surface", children: [
              activeMission.progress ?? 0,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "AI Activity" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: activeMission.currentAiActivity || "—" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Est. Time Remaining" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-0.5 font-medium text-on-surface", children: activeMission.estimatedTimeRemaining || "—" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Executive Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-primary/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "AI Verdict" }),
            /* @__PURE__ */ jsx("p", { className: `mt-2 text-[28px] font-semibold leading-none sm:text-[32px] ${decisionVerdictClassName} ${decisionVerdictGlowClassName}`, children: normalizedDecisionAction })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-outline-variant/25 bg-surface-container-high px-3 py-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.12em] text-on-surface-variant", children: "Confidence" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[28px] font-semibold leading-none text-primary sm:text-[32px]", children: featuredOpportunity.confidenceDisplay })
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
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "TICA analysis status", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx("span", { className: `inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--tica-decision-buy)] ${dotPulsing ? "tica-status-dot-pulse" : ""}`, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps font-semibold uppercase tracking-widest text-on-surface", children: "TICA Analysis Complete" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2 pl-5", children: ["Market Analysis", "Pricing Validation", "Demand Analysis", "Profit Projection", "Risk Assessment"].map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant", style: {
          opacity: analysisStep > index ? 1 : 0,
          transform: analysisStep > index ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.35s ease-out, transform 0.35s ease-out"
        }, children: [
          /* @__PURE__ */ jsx("span", { className: "tica-decision-buy font-semibold", children: "✓" }),
          /* @__PURE__ */ jsx("span", { children: step })
        ] }, step)) }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 pl-5 text-body-sm font-body-sm text-on-surface-variant/70", style: {
          opacity: analysisStep >= 5 ? 1 : 0,
          transition: "opacity 0.4s ease-out"
        }, children: "Completed in 12.4 seconds" }),
        analysisComplete && /* @__PURE__ */ jsxs("div", { className: "tica-analysis-complete-reveal mt-3 flex items-center gap-2 pl-5", children: [
          /* @__PURE__ */ jsx("span", { className: "tica-decision-buy font-semibold", children: "✔" }),
          /* @__PURE__ */ jsx("span", { className: "text-body-sm font-semibold text-on-surface", children: "Analysis Complete" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5", "aria-label": "Dealer Decision Meter", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Dealer Decision Meter" }),
        /* @__PURE__ */ jsx("div", { className: "mb-5 flex flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "TICA Recommendation" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-[32px] font-semibold leading-none sm:text-[38px]", style: {
            color: meterZone === "buy" ? "var(--tica-decision-buy)" : meterZone === "review" ? "var(--tica-decision-review)" : "var(--tica-decision-pass)",
            textShadow: meterZone === "buy" ? "0 0 12px rgba(24,168,107,0.35)" : meterZone === "review" ? "0 0 12px rgba(212,165,55,0.35)" : "0 0 12px rgba(179,58,63,0.35)"
          }, children: meterLabel }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-body-sm font-body-sm text-on-surface-variant", children: [
            featuredOpportunity.confidenceDisplay,
            " Confidence"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "ddm-bar-wrapper", children: [
          /* @__PURE__ */ jsxs("div", { className: "ddm-zone-labels", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("span", { className: "ddm-zone-label ddm-zone-label-pass", children: "PASS" }),
            /* @__PURE__ */ jsx("span", { className: "ddm-zone-label ddm-zone-label-review", children: "REVIEW" }),
            /* @__PURE__ */ jsx("span", { className: "ddm-zone-label ddm-zone-label-buy", children: "BUY NOW" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ddm-bar-track", role: "meter", "aria-label": `Decision meter: ${meterLabel} at ${featuredOpportunity.confidenceDisplay} confidence`, "aria-valuenow": confidencePercent, "aria-valuemin": 0, "aria-valuemax": 100, children: /* @__PURE__ */ jsxs("div", { className: "ddm-indicator", style: {
            left: meterAnimated ? `${confidencePercent}%` : "0%",
            transition: meterAnimated ? "left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none"
          }, "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("div", { className: "ddm-indicator-pin" }),
            /* @__PURE__ */ jsx("div", { className: "ddm-indicator-label", style: {
              color: meterZone === "buy" ? "var(--tica-decision-buy)" : meterZone === "review" ? "var(--tica-decision-review)" : "var(--tica-decision-pass)"
            }, children: featuredOpportunity.confidenceDisplay })
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
          /* @__PURE__ */ jsxs("div", { className: "verdict-card-premium flex flex-col items-center justify-center gap-2.5 rounded-2xl px-4 py-4 text-center sm:px-5 sm:py-5 lg:min-w-[300px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "traffic-light-shell", "aria-label": "AI buying verdict traffic light", children: [
              /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${isBuyVerdict ? "traffic-light-lens-buy-active" : ""}`, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${isReviewVerdict ? "traffic-light-lens-review-active" : ""}`, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("div", { className: `traffic-light-lens ${isPassVerdict ? "traffic-light-lens-pass-active" : ""}`, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.18em] text-primary/80", children: "AI Buying Verdict" }),
              /* @__PURE__ */ jsx("p", { className: `text-[30px] font-semibold leading-none tracking-[0.02em] ${decisionVerdictClassName} ${decisionVerdictGlowClassName} sm:text-[40px]`, children: decisionActionDisplay }),
              /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm uppercase tracking-[0.14em] text-on-surface-variant", children: "Recommended by TICA" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full rounded-xl border border-primary/15 bg-surface-container-high/70 px-3 py-2.5 text-left", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", "aria-label": "Verdict colour key", children: [
              /* @__PURE__ */ jsxs("div", { className: "legend-traffic-light shrink-0", children: [
                /* @__PURE__ */ jsx("div", { className: "legend-traffic-light-lens legend-lens-green", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("div", { className: "legend-traffic-light-lens legend-lens-amber", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("div", { className: "legend-traffic-light-lens legend-lens-red", "aria-hidden": "true" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[5px] py-[5px] text-xs font-semibold leading-none", children: [
                /* @__PURE__ */ jsx("span", { className: "tica-decision-buy flex h-[26px] items-center", children: "BUY" }),
                /* @__PURE__ */ jsx("span", { className: "tica-decision-review flex h-[26px] items-center", children: "REVIEW" }),
                /* @__PURE__ */ jsx("span", { className: "tica-decision-pass flex h-[26px] items-center", children: "PASS" })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-high px-4 py-4 sm:px-5 sm:py-5", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Why TICA Recommends This" }),
            /* @__PURE__ */ jsxs("ul", { className: "flex-1 space-y-2", children: [
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
            /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-outline-variant/25 pt-4", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Recommended Action" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-semibold text-on-surface", children: "Contact the seller today." })
            ] })
          ] })
        ] })
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
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container sm:w-52 md:w-60", children: /* @__PURE__ */ jsx("img", { src: featuredOpportunity.heroImageSrc, alt: featuredOpportunity.heroImageAlt, className: "h-auto max-h-[160px] w-full object-cover sm:max-h-[130px] md:max-h-[120px]" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Opportunity Analysis" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant", children: featuredOpportunity.analysisSummary })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "AI Buying Checklist" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: featuredOpportunity.checklist.map((item) => {
          const statusToneClass = item.tone === "positive" ? "tica-decision-buy" : item.tone === "warning" ? "tica-decision-review" : "text-primary";
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl", children: item.icon }),
              /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: item.label })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: item.tone === "info" ? "Estimate" : "Status" }),
              /* @__PURE__ */ jsx("p", { className: `mt-0.5 text-body-sm font-body-sm ${statusToneClass}`, children: item.statusLabel })
            ] })
          ] }, item.label);
        }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-sm font-body-sm text-on-surface-variant/70 italic", children: "Complete vehicle history, MOT and verification services will be available through trusted data providers in a future release." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Negotiation Advice" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Opening Offer" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-lg font-semibold text-on-surface", children: featuredOpportunity.negotiation.openingOfferDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Acceptance Range" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-lg font-semibold text-on-surface", children: featuredOpportunity.negotiation.likelyAcceptanceRangeDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Confidence" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-lg font-semibold text-primary", children: featuredOpportunity.negotiation.confidenceDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4 sm:col-span-2 lg:col-span-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Advice" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-sm font-body-sm text-on-surface-variant leading-relaxed", children: featuredOpportunity.negotiation.advice })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-2", children: [
          /* @__PURE__ */ jsx("button", { disabled: true, className: "min-h-11 cursor-not-allowed rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant/50 opacity-50", children: "Future Feature: Simulate Deal" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface-variant/60 italic", children: "Interactive deal simulation will be available in a future release." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Buying Summary" }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-primary/30 bg-primary-container/20 px-4 py-4", children: /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md leading-relaxed text-on-surface-variant", children: [
          buyingSummaryLead,
          /* @__PURE__ */ jsx("span", { className: `font-semibold ${decisionVerdictClassName}`, children: decisionAction }),
          buyingSummaryTail
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Vehicle Information" }),
        /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: vehicleInfo.map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high p-4", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: item.label }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-body-md font-body-md text-on-surface", children: item.value })
        ] }, item.label)) })
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
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Dealer Notes" }),
        /* @__PURE__ */ jsx("textarea", { placeholder: "Add internal notes, call outcomes, valuation observations, and next actions...", className: "h-44 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-40" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5", children: [
          /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Save Opportunity" }),
          /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Ignore" }),
          /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Contact Seller" }),
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Return to Dashboard" }),
          /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Create New AI Search" }),
          /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Explain Why" })
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
