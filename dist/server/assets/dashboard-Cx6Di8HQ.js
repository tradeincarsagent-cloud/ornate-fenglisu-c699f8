import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const LOGO_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS";
function HamburgerIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
  ] });
}
function CloseIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ] });
}
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
  const [radarDetectionGlow, setRadarDetectionGlow] = useState(false);
  const [aiSearchLive, setAiSearchLive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSearches, setExpandedSearches] = useState(() => Object.fromEntries(activeSearches.map((_, i) => [i, true])));
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
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  const toggleSearch = (index) => {
    setExpandedSearches((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-on-surface", children: [
    /* @__PURE__ */ jsx("div", { className: `fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`, onClick: () => setSidebarOpen(false), "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("aside", { className: `fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`, "aria-label": "Navigation menu", "aria-hidden": !sidebarOpen, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Menu" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setSidebarOpen(false), className: "flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high", "aria-label": "Close menu", children: /* @__PURE__ */ jsx(CloseIcon, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }) }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary", children: "Dealer Command Centre" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-container-max", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }) }),
        /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary", children: "Dealer Command Centre" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [
        /* @__PURE__ */ jsxs("header", { className: "border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between lg:hidden", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setSidebarOpen(true), className: "flex h-10 w-10 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container-high", "aria-label": "Open navigation menu", "aria-expanded": sidebarOpen, "aria-controls": "mobile-sidebar", children: /* @__PURE__ */ jsx(HamburgerIcon, {}) }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-1 justify-center px-3", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel w-44 rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "h-10 w-10", "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "hidden text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant lg:block", children: "Trade in Cars Agent" })
        ] }),
        /* @__PURE__ */ jsxs("main", { className: "flex-1 px-6 py-8 md:px-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-primary", children: "Dealer Command Centre" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-on-surface", children: "Good Morning, Jonathan" }),
          /* @__PURE__ */ jsxs("section", { className: "mb-10 space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Morning Intelligence Brief" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: summaryCards.map((card) => /* @__PURE__ */ jsxs("article", { className: "dashboard-border flex min-h-[152px] flex-col justify-between rounded-xl bg-surface-container-high p-5 text-center", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md text-on-surface-variant", children: [
                  card.icon,
                  " ",
                  card.title
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-headline-lg font-headline-lg text-primary", children: card.value })
              ] }, card.title)) })
            ] }),
            /* @__PURE__ */ jsx("article", { className: "dashboard-border mx-auto w-full max-w-5xl rounded-3xl bg-surface-container-high/70 p-6 backdrop-blur-sm md:p-8", children: /* @__PURE__ */ jsxs("div", { className: `radar-glass-panel flex flex-col ${radarDetectionGlow ? "radar-detection-glow" : ""}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "radar-container order-1", children: [
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
              /* @__PURE__ */ jsx("h3", { className: "order-2 mt-8 text-center text-headline-md font-headline-md text-on-surface", children: "Live AI Search Radar" }),
              /* @__PURE__ */ jsxs("div", { className: `ai-switch-panel order-3 md:order-4${aiSearchLive ? " ai-switch-panel-live" : " ai-switch-panel-paused"}`, role: "switch", "aria-checked": aiSearchLive, tabIndex: 0, onClick: () => setAiSearchLive((v) => !v), onKeyDown: (e) => {
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
              /* @__PURE__ */ jsxs("dl", { className: "order-4 md:order-3 mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-body-md font-body-md text-on-surface-variant", children: [
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
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-body-md font-body-md text-on-surface-variant", children: '"Your latest AI search results will appear here."' }),
            /* @__PURE__ */ jsx("div", { className: "hidden overflow-x-auto md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[640px] border-separate border-spacing-y-2 text-left", children: [
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
                /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 active:opacity-75", children: "Review" }),
                /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface transition-colors hover:border-primary/40", children: "Save" }),
                /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-lg border border-outline-variant/40 bg-surface-container py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:border-outline-variant/60", children: "Dismiss" })
              ] })
            ] }, opportunity.vehicle)) })
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
              /* @__PURE__ */ jsx("button", { className: "w-full rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90 md:w-auto", children: "Review Opportunity" }),
              /* @__PURE__ */ jsx("button", { className: "w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40 md:w-auto", children: "Save Vehicle" })
            ] })
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
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
