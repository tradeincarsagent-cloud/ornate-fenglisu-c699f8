import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
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
    profit: "£3,850",
    priority: "High"
  }, {
    vehicle: "Range Rover Velar",
    source: "PistonHeads",
    profit: "£2,400",
    priority: "Medium"
  }, {
    vehicle: "Mercedes A45 AMG",
    source: "Motorway",
    profit: "£3,120",
    priority: "High"
  }, {
    vehicle: "Volkswagen Golf R",
    source: "eBay Motors",
    profit: "£1,980",
    priority: "Low"
  }, {
    vehicle: "Porsche Macan S",
    source: "Auto Trader",
    profit: "£4,450",
    priority: "High"
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
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false);
  const [aiSearchLive, setAiSearchLive] = useState(true);
  useEffect(() => {
    if (!aiSearchLive) return;
    let nextOpportunityIndex = 0;
    const scanInterval = setInterval(() => {
      setRadarDetectionGlow(true);
      setHighlightedOpportunity(nextOpportunityIndex);
      nextOpportunityIndex = (nextOpportunityIndex + 1) % recentOpportunities.length;
      setTimeout(() => setRadarDetectionGlow(false), 1100);
      setTimeout(() => setHighlightedOpportunity(null), 1700);
    }, 6200);
    return () => clearInterval(scanInterval);
  }, [recentOpportunities.length, aiSearchLive]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background text-on-surface", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-container-max", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 208 52", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full", style: {
          height: "52px",
          display: "block"
        }, "aria-label": "Trade in Cars Agent logo", children: [
          /* @__PURE__ */ jsx("rect", { x: "0.5", y: "0.5", width: "207", height: "51", rx: "8", stroke: "rgba(20,147,255,0.32)", strokeWidth: "1", fill: "rgba(20,147,255,0.05)" }),
          /* @__PURE__ */ jsx("rect", { x: "3.5", y: "3.5", width: "201", height: "45", rx: "6", stroke: "rgba(148,163,184,0.07)", strokeWidth: "0.5", fill: "none" }),
          /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "3", fill: "rgba(30,41,59,0.85)", stroke: "rgba(148,163,184,0.22)", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("path", { d: "M7.5 9 L10.5 9 M9 7.5 L9 10.5", stroke: "rgba(148,163,184,0.28)", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx("circle", { cx: "199", cy: "9", r: "3", fill: "rgba(30,41,59,0.85)", stroke: "rgba(148,163,184,0.22)", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("path", { d: "M197.5 9 L200.5 9 M199 7.5 L199 10.5", stroke: "rgba(148,163,184,0.28)", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx("circle", { cx: "9", cy: "43", r: "3", fill: "rgba(30,41,59,0.85)", stroke: "rgba(148,163,184,0.22)", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("path", { d: "M7.5 43 L10.5 43 M9 41.5 L9 44.5", stroke: "rgba(148,163,184,0.28)", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx("circle", { cx: "199", cy: "43", r: "3", fill: "rgba(30,41,59,0.85)", stroke: "rgba(148,163,184,0.22)", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("path", { d: "M197.5 43 L200.5 43 M199 41.5 L199 44.5", stroke: "rgba(148,163,184,0.28)", strokeWidth: "0.6" }),
          /* @__PURE__ */ jsx("path", { d: "M22 40 L22 33 Q22 31.5 23.5 31.5 L28 31.5 L33 21 Q34.5 17 39 17 L59 17 Q63.5 17 65 21 L70 31.5 L74.5 31.5 Q76 31.5 76 33 L76 40 Z", fill: "rgba(20,147,255,0.1)", stroke: "rgba(20,147,255,0.72)", strokeWidth: "1.3", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M35.5 17 L38.5 10 Q40 8 43 8 L55 8 Q58 8 59.5 10 L62.5 17", fill: "rgba(20,147,255,0.07)", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.3", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("line", { x1: "49", y1: "8.5", x2: "49", y2: "17", stroke: "rgba(20,147,255,0.35)", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("circle", { cx: "33.5", cy: "40", r: "6", fill: "rgba(12,19,36,0.9)", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.3" }),
          /* @__PURE__ */ jsx("circle", { cx: "33.5", cy: "40", r: "2", fill: "rgba(20,147,255,0.48)" }),
          /* @__PURE__ */ jsx("circle", { cx: "64.5", cy: "40", r: "6", fill: "rgba(12,19,36,0.9)", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.3" }),
          /* @__PURE__ */ jsx("circle", { cx: "64.5", cy: "40", r: "2", fill: "rgba(20,147,255,0.48)" }),
          /* @__PURE__ */ jsx("line", { x1: "90", y1: "20", x2: "104", y2: "20", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M100 16 L104 20 L100 24", fill: "none", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("line", { x1: "104", y1: "32", x2: "90", y2: "32", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M94 28 L90 32 L94 36", fill: "none", stroke: "rgba(20,147,255,0.62)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx("line", { x1: "118", y1: "12", x2: "118", y2: "40", stroke: "rgba(148,163,184,0.13)", strokeWidth: "1" }),
          /* @__PURE__ */ jsx("text", { x: "128", y: "26", fill: "rgba(20,147,255,0.92)", fontSize: "10", fontWeight: "700", fontFamily: "Inter, system-ui, -apple-system, sans-serif", letterSpacing: "2.5", children: "AI AGENT" }),
          /* @__PURE__ */ jsx("text", { x: "128", y: "38", fill: "rgba(148,163,184,0.52)", fontSize: "7.5", fontFamily: "Inter, system-ui, -apple-system, sans-serif", letterSpacing: "2", children: "VEH. SOURCING" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md font-semibold tracking-wide text-primary", children: "Trade in Cars" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary", children: "Dealer Command Centre" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [
      /* @__PURE__ */ jsx("header", { className: "border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Trade in Cars Agent" }) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 px-6 py-8 md:px-10", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-primary", children: "Dealer Command Centre" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-on-surface", children: "Good Morning, Jonathan" }),
        /* @__PURE__ */ jsxs("section", { className: "mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] xl:items-start", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Morning Intelligence Brief" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5", children: summaryCards.map((card) => /* @__PURE__ */ jsxs("article", { className: "dashboard-border rounded-xl bg-surface-container-high p-5", children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-3 text-body-md font-body-md text-on-surface-variant", children: [
                card.icon,
                " ",
                card.title
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-headline-lg font-headline-lg text-primary", children: card.value })
            ] }, card.title)) })
          ] }),
          /* @__PURE__ */ jsx("article", { className: "dashboard-border rounded-3xl bg-surface-container-high/70 p-6 backdrop-blur-sm md:p-8", children: /* @__PURE__ */ jsxs("div", { className: `radar-glass-panel ${radarDetectionGlow ? "radar-detection-glow" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "radar-container", children: [
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
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-1", style: {
                  animationPlayState: aiSearchLive ? "running" : "paused"
                } }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-2", style: {
                  animationPlayState: aiSearchLive ? "running" : "paused"
                } }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-3", style: {
                  animationPlayState: aiSearchLive ? "running" : "paused"
                } }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-4", style: {
                  animationPlayState: aiSearchLive ? "running" : "paused"
                } })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-headline-md font-headline-md text-on-surface", children: "Live AI Search Radar" }),
              /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-body-md font-body-md text-on-surface-variant", children: [
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
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `ai-switch-panel${aiSearchLive ? " ai-switch-panel-live" : " ai-switch-panel-paused"}`, role: "switch", "aria-checked": aiSearchLive, tabIndex: 0, onClick: () => setAiSearchLive((v) => !v), onKeyDown: (e) => {
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
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-body-md font-body-md text-on-surface-variant", children: '"Your latest AI search results will appear here."' }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[640px] border-separate border-spacing-y-2 text-left", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Vehicle" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Source" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Estimated Profit" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Priority" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: recentOpportunities.map((opportunity, index) => /* @__PURE__ */ jsxs("tr", { className: `rounded-xl bg-surface-container-high transition-all ${highlightedOpportunity === index ? "opportunity-row-highlight" : ""}`, children: [
              /* @__PURE__ */ jsx("td", { className: "rounded-l-xl px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.vehicle }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-body-md font-body-md text-on-surface-variant", children: opportunity.source }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.profit }),
              /* @__PURE__ */ jsx("td", { className: "rounded-r-xl px-4 py-3 text-body-md font-body-md text-on-surface", children: opportunity.priority })
            ] }, opportunity.vehicle)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "AI Recommendation of the Day" }),
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
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary hover:opacity-90 transition-opacity", children: "Review Opportunity" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface hover:border-primary/40 transition-colors", children: "Save Vehicle" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "My Active Searches" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: activeSearches.map((search) => /* @__PURE__ */ jsxs("article", { className: "flex flex-col gap-2 rounded-xl bg-surface-container-high p-4 md:flex-row md:items-center md:justify-between", children: [
            /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-primary", children: [
              search.matches,
              " matches"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-on-surface-variant", children: [
              "Updated ",
              search.updated
            ] })
          ] }, search.name)) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
