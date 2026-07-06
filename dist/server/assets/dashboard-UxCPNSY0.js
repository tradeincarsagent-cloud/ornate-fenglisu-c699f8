import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { P as PlatformShell } from "./PlatformShell-DqiuekGA.js";
import { o as opportunityIntelligencePlaceholder } from "./opportunity-intelligence-CuGw1k3x.js";
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
const aiStatusMessages = ["Searching UK Dealer Network…", "Scanning Auto Trader…", "Checking Dealer Websites…", "Analysing Price Changes…", "Ranking Opportunities…", "Monitoring Active Searches…"];
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
  opportunityIndex: 2
}, {
  id: "timeline-porsche-opportunity",
  message: "New Porsche Macan S opportunity added to Recent Opportunities.",
  contactId: "contact-5",
  opportunityIndex: 4
}, {
  id: "timeline-golf-mission",
  message: "AI Search Mission updated for Volkswagen Golf R.",
  contactId: "contact-4",
  opportunityIndex: 3
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
    detail: "Highest estimated profit margin"
  }];
  const recentOpportunities = dashboardRecentOpportunities;
  const activeSearches = [{
    name: "Performance Saloons (2019+)",
    matches: "14",
    updated: "3 mins ago"
  }, {
    name: "SUVs under £28k",
    matches: "9",
    updated: "11 mins ago"
  }, {
    name: "Low-mileage hybrids",
    matches: "6",
    updated: "19 mins ago"
  }];
  const [highlightedOpportunity, setHighlightedOpportunity] = useState(null);
  const [priorityContactId, setPriorityContactId] = useState(null);
  const [contactIntensity, setContactIntensity] = useState(() => radarContacts.map(() => 0.22));
  const [statusMessageIndex, setStatusMessageIndex] = useState(0);
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
      schedule(() => setPriorityContactId(null), 1600);
      schedule(() => setRadarDetectionGlow(false), 1e3);
      schedule(() => setHighlightedOpportunity(null), 1700);
      schedule(() => setActiveTimelineEventId(null), 1900);
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
    if (!aiSearchLive) return;
    const statusRotation = setInterval(() => {
      setStatusMessageIndex((current) => (current + 1) % aiStatusMessages.length);
    }, 3400);
    return () => clearInterval(statusRotation);
  }, [aiSearchLive]);
  const toggleSearch = (index) => {
    setExpandedSearches((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return /* @__PURE__ */ jsxs(PlatformShell, { navItems: [{
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
  }], children: [
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
      /* @__PURE__ */ jsx("article", { className: "dashboard-border mx-auto w-full max-w-5xl rounded-3xl bg-surface-container-high/70 p-6 backdrop-blur-sm md:p-8", children: /* @__PURE__ */ jsxs("div", { className: `radar-glass-panel flex flex-col ${radarDetectionGlow ? "radar-detection-glow" : ""}`, children: [
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
        /* @__PURE__ */ jsxs("dl", { className: "mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-body-md font-body-md text-on-surface-variant", children: [
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: aiSearchLive ? "🟢 Searching" : "⏸ Paused" }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Sources Active:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: "5" }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Vehicles Checked Today:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: counterFormatter.format(liveCounters.vehiclesCheckedToday) }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Matches Found:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: counterFormatter.format(liveCounters.matchesFound) }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "High Priority Matches:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: counterFormatter.format(liveCounters.highPriorityMatches) }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Last Scan:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: aiSearchLive ? "Moments ago" : "Paused" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-center font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI status feed" }),
        /* @__PURE__ */ jsx("p", { className: "radar-status-message mt-2 text-center text-body-md font-body-md text-on-surface-variant", children: aiSearchLive ? aiStatusMessages[statusMessageIndex] : "Search paused — standing by…" }, aiSearchLive ? `status-${statusMessageIndex}` : "status-paused")
      ] }) }),
      /* @__PURE__ */ jsxs("article", { className: "dashboard-border mx-auto w-full max-w-5xl rounded-2xl bg-surface-container p-6 md:p-8", children: [
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
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-on-surface-variant", children: "Monitoring 5 Active Search Missions" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "timeline-list mt-6", "aria-live": "polite", children: timelineEvents.map((event) => /* @__PURE__ */ jsxs("article", { className: `timeline-entry${activeTimelineEventId === event.eventId ? " timeline-entry-live" : ""}`, children: [
          /* @__PURE__ */ jsx("p", { className: "timeline-entry-time", children: event.time }),
          /* @__PURE__ */ jsx("div", { className: "timeline-entry-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("p", { className: "timeline-entry-message", children: event.message })
        ] }, event.eventId)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "AI Recommendation of the Day" }),
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
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Confidence Score" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: featuredOpportunity.confidenceDisplay })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Reason" }),
          featuredOpportunity.dashboardReasonLines.map((reason) => /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: reason }, reason))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90 md:w-auto", children: "Review Opportunity" }),
        /* @__PURE__ */ jsx("button", { className: "w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40 md:w-auto", children: "Save Vehicle" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
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
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs uppercase tracking-widest text-on-surface-variant", children: "Confidence" }),
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
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "My Active Searches" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: activeSearches.map((search, index) => /* @__PURE__ */ jsxs("article", { className: "rounded-xl bg-surface-container-high p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden gap-2 md:flex md:flex-row md:items-center md:justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-primary", children: [
            search.matches,
            " matches"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-on-surface-variant", children: [
            "Updated ",
            search.updated
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => toggleSearch(index), className: "flex w-full items-center justify-between gap-3", "aria-expanded": expandedSearches[index], children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-left", children: [
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.name }),
              /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-sm text-primary", children: [
                search.matches,
                " matches · Updated ",
                search.updated
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 text-on-surface-variant", children: /* @__PURE__ */ jsx(ChevronIcon, { open: expandedSearches[index] }) })
          ] }),
          expandedSearches[index] && /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75", children: "Run Now" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40", children: "Edit" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60", children: "Pause" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-red-500/30 bg-surface-container py-2.5 text-sm font-medium text-red-400 transition-colors hover:border-red-500/50", children: "Delete" })
          ] })
        ] })
      ] }, search.name)) })
    ] })
  ] });
}
export {
  DashboardPage as component
};
