import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { P as PlatformShell } from "./PlatformShell-DqiuekGA.js";
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
}];
const aiStatusMessages = ["Searching UK Dealer Network…", "Scanning Auto Trader…", "Checking Dealer Websites…", "Analysing Price Changes…", "Ranking Opportunities…", "Monitoring Active Searches…"];
function ChevronIcon({
  open
}) {
  return /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", style: {
    transition: "transform 0.2s ease",
    transform: open ? "rotate(180deg)" : "rotate(0deg)"
  }, children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) });
}
function DashboardPage() {
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
  const recentOpportunities = [{
    vehicle: "Audi RS5 Sportback",
    source: "Auto Trader",
    price: "£37,500",
    profit: "£3,850",
    priority: "High",
    confidence: "94%"
  }, {
    vehicle: "Range Rover Velar",
    source: "PistonHeads",
    price: "£29,950",
    profit: "£2,400",
    priority: "Medium",
    confidence: "78%"
  }, {
    vehicle: "Mercedes A45 AMG",
    source: "Motorway",
    price: "£34,750",
    profit: "£3,120",
    priority: "High",
    confidence: "91%"
  }, {
    vehicle: "Volkswagen Golf R",
    source: "eBay Motors",
    price: "£24,200",
    profit: "£1,980",
    priority: "Low",
    confidence: "65%"
  }, {
    vehicle: "Porsche Macan S",
    source: "Auto Trader",
    price: "£42,000",
    profit: "£4,450",
    priority: "High",
    confidence: "97%"
  }];
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
  const [expandedSearches, setExpandedSearches] = useState(() => Object.fromEntries(activeSearches.map((_, i) => [i, true])));
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
      return;
    }
    let cancelled = false;
    const timeoutIds = [];
    const schedule = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timeoutIds.push(id);
    };
    const runDetection = () => {
      if (cancelled) return;
      const selected = radarContacts[Math.floor(Math.random() * radarContacts.length)];
      setPriorityContactId(selected.id);
      setRadarDetectionGlow(true);
      setHighlightedOpportunity(selected.opportunityIndex % recentOpportunities.length);
      schedule(() => setPriorityContactId(null), 1600);
      schedule(() => setRadarDetectionGlow(false), 1e3);
      schedule(() => setHighlightedOpportunity(null), 1700);
      schedule(runDetection, 15e3 + Math.random() * 5e3);
    };
    schedule(runDetection, 15e3 + Math.random() * 5e3);
    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [recentOpportunities.length, aiSearchLive]);
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
    /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-on-surface", children: "Good Morning, Jonathan" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap", children: [
      /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Create New AI Search" }),
      /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary", children: "View AI Buying Report" })
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
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: "12,487" }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Matches Found:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: "27" }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "High Priority Matches:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: "3" }),
          /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Last Scan:" }),
          /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: "12 seconds ago" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-center font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI status feed" }),
        /* @__PURE__ */ jsx("p", { className: "radar-status-message mt-2 text-center text-body-md font-body-md text-on-surface-variant", children: aiSearchLive ? aiStatusMessages[statusMessageIndex] : "Search paused — standing by…" }, aiSearchLive ? `status-${statusMessageIndex}` : "status-paused")
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "AI Recommendation of the Day" }),
      /* @__PURE__ */ jsx("div", { className: "mb-5 md:hidden", children: /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary", children: "⭐ Today's AI Pick" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Vehicle" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "BMW M3 Competition" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Year" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "2022" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Price" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "£31,995" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Estimated Profit" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "£4,200" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Confidence Score" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "97%" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Reason" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Recently reduced in price." }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Strong resale potential." }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Located only 42 miles away." })
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
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.profit }),
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
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface", children: opportunity.price })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs uppercase tracking-widest text-on-surface-variant", children: "Profit" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary", children: opportunity.profit })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs uppercase tracking-widest text-on-surface-variant", children: "Confidence" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface", children: opportunity.confidence })
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
