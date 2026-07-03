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
  const [highlightedOpportunity, setHighlightedOpportunity] = useState(null);
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false);
  useEffect(() => {
    let nextOpportunityIndex = 0;
    const scanInterval = setInterval(() => {
      setRadarDetectionGlow(true);
      setHighlightedOpportunity(nextOpportunityIndex);
      nextOpportunityIndex = (nextOpportunityIndex + 1) % recentOpportunities.length;
      setTimeout(() => setRadarDetectionGlow(false), 1100);
      setTimeout(() => setHighlightedOpportunity(null), 1700);
    }, 6200);
    return () => clearInterval(scanInterval);
  }, [recentOpportunities.length]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background text-on-surface", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-container-max", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-primary", children: "Trade in Cars Agent" }),
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
                /* @__PURE__ */ jsx("div", { className: "radar-sweep" }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-1" }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-2" }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-3" }),
                /* @__PURE__ */ jsx("span", { className: "radar-blip radar-blip-4" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-headline-md font-headline-md text-on-surface", children: "Live AI Search Radar" }),
              /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-body-md font-body-md text-on-surface-variant", children: [
                /* @__PURE__ */ jsx("dt", { className: "font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status:" }),
                /* @__PURE__ */ jsx("dd", { className: "text-on-surface", children: "🟢 Searching" }),
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
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-body-md font-body-md text-on-surface-variant", children: "“Your latest AI search results will appear here.”" }),
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
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "Today’s Best Opportunity" }),
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
        ] })
      ] })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
