import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { P as PlatformShell } from "./PlatformShell-skJDeqy2.js";
import { o as opportunityIntelligencePlaceholder } from "./opportunity-intelligence-JxZmUpMV.js";
const missionStatusConfig = {
  Monitoring: {
    color: "rgba(74, 222, 128, 0.9)",
    glow: "rgba(74, 222, 128, 0.55)",
    label: "Monitoring",
    emoji: "🟢"
  },
  Waiting: {
    color: "rgba(251, 191, 36, 0.88)",
    glow: "rgba(251, 191, 36, 0.5)",
    label: "Waiting",
    emoji: "🟡"
  },
  Updating: {
    color: "rgba(56, 189, 248, 0.9)",
    glow: "rgba(56, 189, 248, 0.5)",
    label: "Updating",
    emoji: "🔵"
  }
};
const radarContacts = [{
  id: "contact-1",
  x: 0.63,
  y: 0.24,
  vehicleType: "car",
  opportunityIndex: 0,
  angleDeg: 35.8
}, {
  id: "contact-2",
  x: 0.29,
  y: 0.61,
  vehicleType: "pickup",
  opportunityIndex: 1,
  angleDeg: 239.7
}, {
  id: "contact-3",
  x: 0.74,
  y: 0.47,
  vehicleType: "van",
  opportunityIndex: 2,
  angleDeg: 85.2
}, {
  id: "contact-4",
  x: 0.57,
  y: 0.7,
  vehicleType: "motorcycle",
  opportunityIndex: 3,
  angleDeg: 161.6
}, {
  id: "contact-5",
  x: 0.18,
  y: 0.33,
  vehicleType: "car",
  opportunityIndex: 4,
  angleDeg: 208.1
}];
const timelineTemplates = [{
  id: "timeline-audi-rs5",
  message: "Audi RS5 Sportback detected below market price.",
  contactId: "contact-1",
  opportunityIndex: 0
}, {
  id: "timeline-range-rover",
  message: "Range Rover Velar price reduced by £850.",
  contactId: "contact-2",
  opportunityIndex: 1
}, {
  id: "timeline-mercedes-search",
  message: "Dealer Network search completed for Mercedes A45 AMG.",
  contactId: "contact-3",
  opportunityIndex: 2,
  missionIndex: 2
}, {
  id: "timeline-porsche-opportunity",
  message: "New Porsche Macan S opportunity added to Recent Opportunities.",
  contactId: "contact-5",
  opportunityIndex: 4
}, {
  id: "timeline-golf-mission",
  message: "AI Search Mission updated for Volkswagen Golf R.",
  contactId: "contact-4",
  opportunityIndex: 3,
  missionIndex: 0
}];
const initialTimelineEvents = [{
  ...timelineTemplates[0],
  eventId: "timeline-seed-1",
  time: "09:14"
}, {
  ...timelineTemplates[1],
  eventId: "timeline-seed-2",
  time: "09:11"
}, {
  ...timelineTemplates[2],
  eventId: "timeline-seed-3",
  time: "09:08"
}, {
  ...timelineTemplates[3],
  eventId: "timeline-seed-4",
  time: "09:05"
}, {
  ...timelineTemplates[4],
  eventId: "timeline-seed-5",
  time: "09:02"
}];
const aiStatusMessages = ["Searching UK Dealer Network…", "Scanning Auto Trader…", "Checking Dealer Websites…", "Monitoring Price Drops…", "Analysing New Listings…", "Ranking Opportunities…", "Updating Search Missions…"];
const topOpportunityComparison = [{
  vehicle: "BMW M3 Competition",
  opportunityScore: 94,
  estimatedProfit: "£4,255",
  ticaDecision: "BUY"
}, {
  vehicle: "BMW M3 Competition",
  opportunityScore: 89,
  estimatedProfit: "£3,620",
  ticaDecision: "REVIEW"
}, {
  vehicle: "BMW M3 Competition",
  opportunityScore: 74,
  estimatedProfit: "£1,980",
  ticaDecision: "PASS"
}];
const topOpportunityReasons = ["Highest opportunity score across this comparison set.", "Strongest estimated profit among available options.", "Aligned with current BUY threshold in the TICA model."];
const activityTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});
const counterFormatter = new Intl.NumberFormat("en-GB");
function ChevronIcon({
  open
}) {
  return /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", style: {
    transition: "transform 0.2s ease",
    transform: open ? "rotate(180deg)" : "rotate(0deg)"
  }, children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) });
}
function DashboardPage() {
  const {
    dashboardRecentOpportunities,
    featuredOpportunity
  } = opportunityIntelligencePlaceholder;
  const decisionModel = featuredOpportunity.decisionModel;
  const summaryCards = [{
    icon: "🚗",
    title: "New Vehicle Opportunities",
    value: "8"
  }, {
    icon: "📉",
    title: "Price Drops",
    value: "2"
  }, {
    icon: "⭐",
    title: "High-Profit Matches",
    value: "3"
  }, {
    icon: "🔔",
    title: "Auctions Ending Today",
    value: "1"
  }, {
    icon: "❤️",
    title: "Saved Vehicles Updated",
    value: "5"
  }];
  const dailyBriefingCards = [{
    label: "Listings Analysed",
    value: "18,462",
    detail: "Across your connected search sources"
  }, {
    label: "Matches Found",
    value: "24",
    detail: "5 passed your buying criteria today"
  }, {
    label: "Top Priority",
    value: featuredOpportunity.vehicle,
    detail: featuredOpportunity.scoring.estimatedProfitScore.status
  }];
  const recentOpportunities = dashboardRecentOpportunities;
  const activeSearches = [{
    name: "BMW M3 UK Search",
    status: "Monitoring",
    lastScan: "2 minutes ago",
    opportunities: 3,
    vehicleType: "Car",
    searchArea: "UK Nationwide",
    budget: "Up to £35,000",
    nextScan: "13 minutes",
    progress: 78
  }, {
    name: "SUVs under £28k",
    status: "Waiting",
    lastScan: "11 minutes ago",
    opportunities: 9,
    vehicleType: "SUV",
    searchArea: "South East England",
    budget: "Up to £28,000",
    nextScan: "4 minutes",
    progress: 42
  }, {
    name: "Low-mileage hybrids",
    status: "Updating",
    lastScan: "1 minute ago",
    opportunities: 6,
    vehicleType: "Hybrid / EV",
    searchArea: "UK Nationwide",
    budget: "Up to £22,000",
    nextScan: "19 minutes",
    progress: 61
  }];
  const recommendationEvidencePoints = [decisionModel.factors.overallOpportunityScore.summary, decisionModel.factors.dealerDemand.summary, decisionModel.factors.estimatedProfit.summary, decisionModel.factors.timeOnMarket.summary, decisionModel.factors.vehicleHistory.summary];
  const recommendationCautionPoints = ["Vehicle history has not yet been verified.", "Service history should be confirmed.", "Seller response time is currently unknown."];
  const [highlightedOpportunity, setHighlightedOpportunity] = useState(null);
  const [highlightedMission, setHighlightedMission] = useState(null);
  const [priorityContactId, setPriorityContactId] = useState(null);
  const [contactIntensity, setContactIntensity] = useState(() => radarContacts.map(() => 0.22));
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false);
  const [aiSearchLive, setAiSearchLive] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState(initialTimelineEvents);
  const [activeTimelineEventId, setActiveTimelineEventId] = useState(null);
  const [liveCounters, setLiveCounters] = useState({
    vehiclesCheckedToday: 12487,
    matchesFound: 27,
    highPriorityMatches: 3
  });
  const [expandedSearches, setExpandedSearches] = useState(() => Object.fromEntries(activeSearches.map((_, i) => [i, true])));
  const [openMoreMenu, setOpenMoreMenu] = useState(null);
  const [recAction, setRecAction] = useState(null);
  const [activeAiStatusMessage, setActiveAiStatusMessage] = useState(aiStatusMessages[0]);
  const [aiStatusMessageVisible, setAiStatusMessageVisible] = useState(true);
  const timelineCursorRef = useRef(initialTimelineEvents.length % timelineTemplates.length);
  useEffect(() => {
    if (!aiSearchLive) return;
    const sweepDurationMs = 3600;
    const sweepHeadOffsetDeg = 60;
    const sweepTrailDegrees = 128;
    const baseIntensity = 0.16;
    const updateSweep = () => {
      const elapsed = Date.now() % sweepDurationMs;
      const baseAngle = elapsed / sweepDurationMs * 360;
      const sweepHeadAngle = (baseAngle + sweepHeadOffsetDeg) % 360;
      setContactIntensity(radarContacts.map((contact) => {
        const trailingDelta = (sweepHeadAngle - contact.angleDeg + 360) % 360;
        if (trailingDelta > sweepTrailDegrees) return baseIntensity;
        const normalizedTrail = trailingDelta / sweepTrailDegrees;
        const trailFade = Math.exp(-normalizedTrail * 3.1);
        const beamHitFlash = Math.exp(-((trailingDelta / 8) ** 2));
        const nextIntensity = baseIntensity + trailFade * 0.66 + beamHitFlash * 0.24;
        return Math.min(1, nextIntensity);
      }));
    };
    updateSweep();
    const sweepInterval = setInterval(updateSweep, 60);
    return () => clearInterval(sweepInterval);
  }, [aiSearchLive]);
  useEffect(() => {
    if (!aiSearchLive) {
      setContactIntensity(radarContacts.map(() => 0.22));
      setPriorityContactId(null);
      setRadarDetectionGlow(false);
      setHighlightedOpportunity(null);
      setActiveTimelineEventId(null);
      return;
    }
  }, [aiSearchLive]);
  useEffect(() => {
    if (!aiSearchLive) return;
    let cancelled = false;
    const timeoutIds = [];
    const schedule = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timeoutIds.push(id);
    };
    const runTimelineActivity = () => {
      if (cancelled) return;
      const template = timelineTemplates[timelineCursorRef.current];
      const eventId = `${template.id}-${Date.now()}`;
      timelineCursorRef.current = (timelineCursorRef.current + 1) % timelineTemplates.length;
      setTimelineEvents((current) => [{
        ...template,
        eventId,
        time: activityTimeFormatter.format(/* @__PURE__ */ new Date())
      }, ...current].slice(0, 6));
      setPriorityContactId(template.contactId);
      setRadarDetectionGlow(true);
      setHighlightedOpportunity(template.opportunityIndex);
      setActiveTimelineEventId(eventId);
      if (template.missionIndex !== void 0) {
        setHighlightedMission(template.missionIndex);
      }
      schedule(() => setPriorityContactId(null), 1600);
      schedule(() => setRadarDetectionGlow(false), 1e3);
      schedule(() => setHighlightedOpportunity(null), 1700);
      schedule(() => setActiveTimelineEventId(null), 1900);
      if (template.missionIndex !== void 0) {
        schedule(() => setHighlightedMission(null), 1700);
      }
      schedule(runTimelineActivity, 11e3 + Math.random() * 4e3);
    };
    schedule(runTimelineActivity, 9e3);
    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [aiSearchLive]);
  useEffect(() => {
    if (!aiSearchLive) return;
    let cancelled = false;
    const timeoutIds = [];
    const schedule = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timeoutIds.push(id);
    };
    const advanceCounters = () => {
      if (cancelled) return;
      setLiveCounters((current) => {
        const matchesIncrement = Math.random() > 0.42 ? 1 : 0;
        const priorityIncrement = matchesIncrement > 0 && Math.random() > 0.76 ? 1 : 0;
        return {
          vehiclesCheckedToday: current.vehiclesCheckedToday + 8 + Math.floor(Math.random() * 17),
          matchesFound: current.matchesFound + matchesIncrement,
          highPriorityMatches: current.highPriorityMatches + priorityIncrement
        };
      });
      schedule(advanceCounters, 4500 + Math.random() * 2500);
    };
    schedule(advanceCounters, 4200);
    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [aiSearchLive]);
  useEffect(() => {
    if (!aiSearchLive) {
      setActiveAiStatusMessage("Monitoring paused — awaiting resume…");
      setAiStatusMessageVisible(true);
      return;
    }
    let messageIndex = 0;
    let fadeTimeoutId = null;
    setActiveAiStatusMessage(aiStatusMessages[0]);
    setAiStatusMessageVisible(true);
    const intervalId = window.setInterval(() => {
      setAiStatusMessageVisible(false);
      if (fadeTimeoutId !== null) {
        window.clearTimeout(fadeTimeoutId);
      }
      fadeTimeoutId = window.setTimeout(() => {
        messageIndex = (messageIndex + 1) % aiStatusMessages.length;
        setActiveAiStatusMessage(aiStatusMessages[messageIndex]);
        setAiStatusMessageVisible(true);
      }, 220);
    }, 3800);
    return () => {
      window.clearInterval(intervalId);
      if (fadeTimeoutId !== null) {
        window.clearTimeout(fadeTimeoutId);
      }
    };
  }, [aiSearchLive]);
  const toggleSearch = (index) => {
    setExpandedSearches((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
    setOpenMoreMenu(null);
  };
  const operationsPanelItems = [{
    label: "Status",
    value: aiSearchLive ? "Searching" : "Paused",
    tone: aiSearchLive ? "live" : "paused"
  }, {
    label: "Sources Active",
    value: "5"
  }, {
    label: "Vehicles Checked Today",
    value: counterFormatter.format(liveCounters.vehiclesCheckedToday)
  }, {
    label: "Matches Found",
    value: counterFormatter.format(liveCounters.matchesFound)
  }, {
    label: "High Priority Matches",
    value: counterFormatter.format(liveCounters.highPriorityMatches),
    tone: "accent"
  }, {
    label: "Last Scan",
    value: aiSearchLive ? "Moments ago" : "Paused"
  }];
  return /* @__PURE__ */ jsx(PlatformShell, { navItems: [{
    label: "Dealer Command Centre",
    href: "/dashboard",
    active: true
  }, {
    label: "AI Search Builder",
    href: "/search-builder"
  }, {
    label: "AI Buying Report",
    href: "/opportunity"
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
    label: "Settings",
    disabled: true
  }, {
    label: "Subscription",
    disabled: true
  }], children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max overflow-x-hidden", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-primary", children: "Dealer Command Centre" }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container-high/80 p-5 shadow-[0_22px_40px_rgba(2,6,23,0.28)] backdrop-blur-sm md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary/90", children: "AI Daily Briefing" }),
        /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Good Morning Jonathan," }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "5 vehicles need attention today. Start with your strongest profit opportunity." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-3", children: dailyBriefingCards.map((card) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/35 bg-surface/55 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/85", children: card.label }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-semibold text-on-surface", children: card.value }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-on-surface-variant", children: card.detail })
      ] }, card.label)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs tracking-[0.08em] text-on-surface-variant", children: "Voice AI briefing coming in a future release." }),
        /* @__PURE__ */ jsx("button", { type: "button", disabled: true, title: "Voice AI briefing coming in a future release.", className: "inline-flex min-h-10 items-center justify-center rounded-xl border border-outline-variant/35 bg-surface/40 px-4 py-2 text-sm font-medium text-on-surface-variant opacity-70", children: "🎤 Hear Today’s Briefing" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap", children: [
      /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Review Top Opportunity" }),
      /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary", children: "Create New Search" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-10 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Morning Intelligence Brief" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5", children: summaryCards.map((card, index) => /* @__PURE__ */ jsxs("article", { className: `dashboard-border flex flex-col justify-between rounded-xl bg-surface-container-high text-center min-h-20 p-3 md:min-h-[152px] md:p-5${index === 4 ? " col-span-2 mx-auto w-[calc(50%-8px)] lg:col-span-1 lg:w-auto lg:mx-0" : ""}`, children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs leading-snug text-on-surface-variant md:text-body-md md:font-body-md", children: [
            /* @__PURE__ */ jsx("span", { className: "block", children: card.icon }),
            /* @__PURE__ */ jsx("span", { children: card.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-2xl font-bold text-primary md:text-headline-lg md:font-headline-lg md:mt-0", children: card.value })
        ] }, card.title)) })
      ] }),
      /* @__PURE__ */ jsx("article", { className: "dashboard-border mx-auto w-full max-w-5xl rounded-3xl bg-surface-container-high/70 p-4 backdrop-blur-sm md:p-6 lg:p-8", children: /* @__PURE__ */ jsxs("div", { className: `radar-glass-panel flex flex-col ${radarDetectionGlow ? "radar-detection-glow" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-center text-headline-md font-headline-md text-on-surface", children: "Live AI Search Radar" }),
        /* @__PURE__ */ jsxs("div", { className: "radar-container mt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "radar-frame" }),
          /* @__PURE__ */ jsxs("div", { className: "radar-scope", children: [
            /* @__PURE__ */ jsx("div", { className: "radar-ring radar-ring-1" }),
            /* @__PURE__ */ jsx("div", { className: "radar-ring radar-ring-2" }),
            /* @__PURE__ */ jsx("div", { className: "radar-ring radar-ring-3" }),
            /* @__PURE__ */ jsx("div", { className: "radar-crosshair radar-crosshair-horizontal" }),
            /* @__PURE__ */ jsx("div", { className: "radar-crosshair radar-crosshair-vertical" }),
            /* @__PURE__ */ jsx("div", { className: "radar-sweep", style: {
              animationPlayState: aiSearchLive ? "running" : "paused"
            } }),
            radarContacts.map((contact, index) => /* @__PURE__ */ jsx("span", { className: `radar-contact${priorityContactId === contact.id ? " radar-contact-priority" : ""}`, "data-vehicle-type": contact.vehicleType, style: {
              top: `${contact.y * 100}%`,
              left: `${contact.x * 100}%`,
              "--radar-contact-intensity": `${contactIntensity[index] ?? 0.22}`
            } }, contact.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `ai-switch-panel mt-8${aiSearchLive ? " ai-switch-panel-live" : " ai-switch-panel-paused"}`, role: "switch", "aria-checked": aiSearchLive, tabIndex: 0, onClick: () => setAiSearchLive((v) => !v), onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setAiSearchLive((v) => !v);
          }
        }, children: [
          /* @__PURE__ */ jsx("span", { className: "ai-switch-screw ai-switch-screw-tl" }),
          /* @__PURE__ */ jsx("span", { className: "ai-switch-screw ai-switch-screw-tr" }),
          /* @__PURE__ */ jsx("span", { className: "ai-switch-screw ai-switch-screw-bl" }),
          /* @__PURE__ */ jsx("span", { className: "ai-switch-screw ai-switch-screw-br" }),
          /* @__PURE__ */ jsx("p", { className: "ai-switch-title", children: "AI Search Control" }),
          /* @__PURE__ */ jsxs("div", { className: "ai-switch-rockers", children: [
            /* @__PURE__ */ jsxs("div", { className: `ai-switch-rocker ai-switch-rocker-live${aiSearchLive ? " ai-switch-rocker-active" : ""}`, children: [
              /* @__PURE__ */ jsx("span", { className: `ai-switch-led${aiSearchLive ? " ai-switch-led-on-live" : ""}` }),
              /* @__PURE__ */ jsx("span", { className: "ai-switch-rocker-label", children: "LIVE" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `ai-switch-rocker ai-switch-rocker-paused${!aiSearchLive ? " ai-switch-rocker-active" : ""}`, children: [
              /* @__PURE__ */ jsx("span", { className: `ai-switch-led${!aiSearchLive ? " ai-switch-led-on-paused" : ""}` }),
              /* @__PURE__ */ jsx("span", { className: "ai-switch-rocker-label", children: "PAUSED" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-8 rounded-2xl border border-outline-variant/25 bg-surface-container-high/55 p-5 md:p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-center font-label-caps text-label-caps uppercase tracking-[0.18em] text-primary/85", children: "AI Operations Panel" }),
          /* @__PURE__ */ jsx("dl", { className: "mt-4 grid overflow-hidden rounded-xl border border-outline-variant/25 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.28))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:grid-cols-2 xl:grid-cols-3", children: operationsPanelItems.map((item, index) => /* @__PURE__ */ jsxs("div", { className: `flex min-h-[72px] flex-col justify-between gap-3 px-4 py-3 sm:min-h-[104px] sm:gap-4 sm:px-5 sm:py-4 ${index < operationsPanelItems.length - 1 ? "border-b border-outline-variant/18" : ""} ${index % 2 === 0 ? "sm:border-r sm:border-outline-variant/18" : ""} ${index >= operationsPanelItems.length - 2 ? "sm:border-b-0" : ""} ${index % 3 !== 2 ? "xl:border-r xl:border-outline-variant/18" : "xl:border-r-0"} ${index >= operationsPanelItems.length - 3 ? "xl:border-b-0" : ""}`, children: [
            /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant/90", children: item.label }),
            /* @__PURE__ */ jsxs("dd", { className: `flex items-center gap-2 text-[1.05rem] font-semibold tracking-[0.01em] text-on-surface ${item.tone === "accent" ? "text-primary" : ""}`, children: [
              item.tone === "live" ? /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.55)]", "aria-hidden": "true" }) : null,
              item.tone === "paused" ? /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.45)]", "aria-hidden": "true" }) : null,
              /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: item.value })
            ] })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "dashboard-border timeline-mobile-shell mt-6 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-headline-md font-headline-md text-on-surface", children: "AI Activity Timeline" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-body-md font-body-md text-on-surface-variant", children: "Live placeholder activity from the Dealer Command Centre AI operations flow." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "timeline-status-panel", children: [
              /* @__PURE__ */ jsx("p", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI Status" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: [
                /* @__PURE__ */ jsx("span", { className: "mr-2 text-emerald-400", children: "🟢" }),
                "Operational"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "radar-status-message mt-1 min-h-[1.35rem] text-sm text-on-surface-variant", children: /* @__PURE__ */ jsx("span", { className: `block transition-opacity duration-200 ${aiStatusMessageVisible ? "opacity-100" : "opacity-0"}`, children: activeAiStatusMessage }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "timeline-list mt-6", "aria-live": "polite", children: timelineEvents.map((event) => /* @__PURE__ */ jsxs("article", { className: `timeline-entry${activeTimelineEventId === event.eventId ? " timeline-entry-live" : ""}`, children: [
            /* @__PURE__ */ jsx("p", { className: "timeline-entry-time", children: event.time }),
            /* @__PURE__ */ jsx("div", { className: "timeline-entry-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("p", { className: "timeline-entry-message", children: event.message })
          ] }, event.eventId)) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-headline-md font-headline-md text-on-surface", children: "Today's Best Buy" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm text-on-surface-variant", children: "Chosen by TICA" }),
      /* @__PURE__ */ jsx("div", { className: "mb-5 md:hidden", children: /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary", children: "⭐ Today's AI Pick" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Vehicle" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: featuredOpportunity.vehicle })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Year" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: featuredOpportunity.year })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Price" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: featuredOpportunity.listPriceDisplay })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Estimated Profit" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: featuredOpportunity.dashboardEstimatedProfitDisplay })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI Confidence" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-2 w-32 overflow-hidden rounded-full bg-surface-container-high", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary", style: {
              width: `${decisionModel.weightedDecisionScore}%`
            } }) }),
            /* @__PURE__ */ jsxs("span", { className: "text-body-md font-body-md text-on-surface", children: [
              decisionModel.weightedDecisionScore,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-semibold text-primary", children: "High Confidence" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Reason" }),
          featuredOpportunity.dashboardReasonLines.map((reason) => /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: reason }, reason))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-3 text-body-md font-body-md font-medium text-on-surface", children: "Why TICA Chose This Vehicle" }),
        /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-2 text-sm text-on-surface-variant", children: recommendationEvidencePoints.map((point, index) => /* @__PURE__ */ jsxs("li", { children: [
          index === recommendationEvidencePoints.length - 1 ? "🟡" : "🟢",
          " ",
          point
        ] }, point)) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-3 border-t border-outline-variant/20 pt-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-2 text-body-sm font-body-sm font-medium text-on-surface", children: "Things to Consider" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 text-sm text-on-surface-variant", children: recommendationCautionPoints.map((point) => /* @__PURE__ */ jsxs("li", { children: [
            "⚠ ",
            point
          ] }, point)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-3 border-t border-outline-variant/20 pt-3", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Opportunity Score" }),
          /* @__PURE__ */ jsx("p", { className: "text-headline-sm font-headline-sm text-on-surface", children: "94 / 100" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-outline-variant/20 pt-3", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-0.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "TICA Decision" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md font-semibold text-on-surface", children: "🟢 BUY" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-body-md font-body-md font-medium text-on-surface", children: "Top Opportunity Comparison" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full text-left text-sm text-on-surface", children: [
          /* @__PURE__ */ jsx("thead", { className: "border-b border-outline-variant/30 text-xs uppercase tracking-widest text-on-surface-variant", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-0 py-2 font-label-caps", children: "Vehicle" }),
            /* @__PURE__ */ jsx("th", { className: "px-0 py-2 font-label-caps", children: "Opportunity Score" }),
            /* @__PURE__ */ jsx("th", { className: "px-0 py-2 font-label-caps", children: "Estimated Profit" }),
            /* @__PURE__ */ jsx("th", { className: "px-0 py-2 font-label-caps", children: "TICA Decision" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: topOpportunityComparison.map((row, index) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-outline-variant/20 last:border-b-0", children: [
            /* @__PURE__ */ jsx("td", { className: "py-2 pr-3", children: row.vehicle }),
            /* @__PURE__ */ jsx("td", { className: "py-2 pr-3", children: row.opportunityScore }),
            /* @__PURE__ */ jsx("td", { className: "py-2 pr-3", children: row.estimatedProfit }),
            /* @__PURE__ */ jsx("td", { className: "py-2 font-semibold", children: row.ticaDecision })
          ] }, `${row.vehicle}-${row.opportunityScore}-${index}`)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-outline-variant/20 pt-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "mb-2 text-sm font-semibold text-on-surface", children: "Why the top vehicle ranks first" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 text-sm text-on-surface-variant", children: topOpportunityReasons.map((reason) => /* @__PURE__ */ jsxs("li", { children: [
            "• ",
            reason
          ] }, reason)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90 active:opacity-75", children: "Review Opportunity" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setRecAction("saved"), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40", children: "Save Opportunity" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setRecAction("dismissed"), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-error/40 hover:text-error", children: "Dismiss" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setRecAction("reminded"), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-tertiary/40", children: "Remind Me Tomorrow" })
      ] }),
      recAction === "saved" && /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-sm font-body-sm text-primary", children: "✓ Saved to Watchlist (placeholder)" }),
      recAction === "dismissed" && /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-sm font-body-sm text-on-surface-variant", children: "✓ Opportunity dismissed (placeholder)" }),
      recAction === "reminded" && /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-sm font-body-sm text-tertiary", children: "✓ Reminder scheduled (placeholder)" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
      /* @__PURE__ */ jsx("div", { className: "hidden overflow-x-auto md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[640px] border-separate border-spacing-y-2 text-left", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Vehicle" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Source" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Estimated Profit" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Priority" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: recentOpportunities.map((opportunity, index) => /* @__PURE__ */ jsxs("tr", { className: `rounded-xl bg-surface-container-high transition-all ${highlightedOpportunity === index ? "opportunity-row-highlight" : ""}`, children: [
          /* @__PURE__ */ jsx("td", { className: "rounded-l-xl px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.vehicle }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-body-md font-body-md text-on-surface-variant", children: opportunity.source }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.estimatedProfitDisplay }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.priority }),
          /* @__PURE__ */ jsx("td", { className: "rounded-r-xl px-4 py-3", children: /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90", children: "Review" }) })
        ] }, opportunity.vehicle)) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3 md:hidden", children: recentOpportunities.map((opportunity, index) => /* @__PURE__ */ jsxs("article", { className: `rounded-xl bg-surface-container-high p-4 transition-all ${highlightedOpportunity === index ? "opportunity-row-highlight" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md font-medium text-on-surface", children: opportunity.vehicle }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: opportunity.source })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4 grid grid-cols-3 gap-2 rounded-lg bg-surface-container p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs uppercase tracking-widest text-on-surface-variant", children: "Price" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface", children: opportunity.priceDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs uppercase tracking-widest text-on-surface-variant", children: "Profit" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary", children: opportunity.estimatedProfitDisplay })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs uppercase tracking-widest text-on-surface-variant", children: "Conf." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface", children: opportunity.confidenceDisplay })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "flex flex-1 items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75", children: "Review" }),
          /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40", children: "Save" }),
          /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60", children: "Dismiss" })
        ] })
      ] }, opportunity.vehicle)) })
    ] }),
    openMoreMenu !== null && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-10 md:hidden", onClick: () => setOpenMoreMenu(null), "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-4 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-headline-md font-headline-md text-on-surface", children: "AI Search Missions" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-on-surface-variant", children: "Search jobs currently being monitored by TICA." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: activeSearches.map((search, index) => {
        const statusCfg = missionStatusConfig[search.status];
        return /* @__PURE__ */ jsxs("article", { className: `rounded-xl bg-surface-container-high p-4 transition-all ${highlightedMission === index ? "mission-card-highlight" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden md:block", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md font-semibold text-on-surface", children: search.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 gap-2", children: [
                /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75", children: "Run Now" }),
                /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-1.5 text-sm text-on-surface transition-colors hover:border-primary/40", children: "Edit" }),
                /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-1.5 text-sm text-on-surface-variant transition-colors hover:border-primary/40", children: "Pause" }),
                /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-1.5 text-sm text-red-400 transition-colors hover:border-red-400/40", children: "Delete" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("dl", { className: "mb-3 grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Vehicle Type" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.vehicleType })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Search Area" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.searchArea })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Budget" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.budget })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Status" }),
                /* @__PURE__ */ jsxs("dd", { className: "mt-0.5 flex items-center gap-1.5 text-sm text-on-surface", children: [
                  /* @__PURE__ */ jsx("span", { className: "mission-status-dot flex-shrink-0", style: {
                    background: statusCfg.color,
                    boxShadow: `0 0 6px ${statusCfg.glow}`
                  } }),
                  statusCfg.emoji,
                  " ",
                  statusCfg.label
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Last Scan" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.lastScan })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Opportunities Found" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm font-semibold text-primary", children: search.opportunities })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Next Scan" }),
                /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.nextScan })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Search Progress" }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-on-surface", children: [
                  search.progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full transition-all", style: {
                width: `${search.progress}%`,
                background: statusCfg.color,
                boxShadow: `0 0 4px ${statusCfg.glow}`
              } }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => toggleSearch(index), className: "flex w-full items-center justify-between gap-3", "aria-expanded": expandedSearches[index], children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-left", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "mission-status-dot flex-shrink-0", style: {
                    background: statusCfg.color,
                    boxShadow: `0 0 6px ${statusCfg.glow}`
                  } }),
                  /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md font-medium text-on-surface", children: search.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 pl-4", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-on-surface-variant", children: [
                    "Last Scan: ",
                    search.lastScan
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-primary", children: [
                    search.opportunities,
                    " Opp."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 text-on-surface-variant", children: /* @__PURE__ */ jsx(ChevronIcon, { open: expandedSearches[index] }) })
            ] }),
            expandedSearches[index] && /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-3", children: [
              /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-2 gap-x-4 gap-y-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Vehicle Type" }),
                  /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.vehicleType })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Search Area" }),
                  /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.searchArea })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Budget" }),
                  /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.budget })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Status" }),
                  /* @__PURE__ */ jsxs("dd", { className: "mt-0.5 text-sm text-on-surface", children: [
                    statusCfg.emoji,
                    " ",
                    statusCfg.label
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("dt", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Next Scan" }),
                  /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-on-surface", children: search.nextScan })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-on-surface-variant", children: "Search Progress" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-on-surface", children: [
                    search.progress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full", style: {
                  width: `${search.progress}%`,
                  background: statusCfg.color,
                  boxShadow: `0 0 4px ${statusCfg.glow}`
                } }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75", children: "Run Now" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    setOpenMoreMenu(openMoreMenu === index ? null : index);
                  }, className: "rounded-lg border border-outline-variant/40 bg-surface-container px-5 py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40", "aria-haspopup": "true", "aria-expanded": openMoreMenu === index, children: "More" }),
                  openMoreMenu === index && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 bottom-full z-20 mb-2 w-36 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-high shadow-lg", children: [
                    /* @__PURE__ */ jsx("button", { className: "w-full px-4 py-3 text-left text-sm text-on-surface transition-colors hover:bg-surface-container-highest active:bg-surface-container-highest", children: "Edit" }),
                    /* @__PURE__ */ jsx("button", { className: "w-full px-4 py-3 text-left text-sm text-on-surface-variant transition-colors hover:bg-surface-container-highest active:bg-surface-container-highest", children: "Pause" }),
                    /* @__PURE__ */ jsx("button", { className: "w-full px-4 py-3 text-left text-sm text-red-400 transition-colors hover:bg-surface-container-highest active:bg-surface-container-highest", children: "Delete" })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }, search.name);
      }) })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
