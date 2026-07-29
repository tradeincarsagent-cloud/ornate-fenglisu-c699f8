import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-CoJ8XGWI.js";
import "@tanstack/react-router";
const opportunityCards = [{
  title: "Best Opportunity Today",
  vehicle: "2021 Porsche Macan S",
  estimatedMargin: "£4,260",
  confidence: "96%",
  recommendation: "Escalate to buyer review before midday.",
  note: "Retail demand is holding while trade supply is narrowing."
}, {
  title: "Fastest Moving Market",
  vehicle: "2022 Volkswagen Golf GTI Clubsport",
  estimatedMargin: "£2,180",
  confidence: "94%",
  recommendation: "Increase alert frequency on GTI searches.",
  note: "Average time-to-sale has shortened by 1.8 days week-on-week."
}, {
  title: "Highest Estimated Margin",
  vehicle: "2020 Land Rover Defender 110 HSE",
  estimatedMargin: "£5,480",
  confidence: "82%",
  recommendation: "Proceed selectively and verify acquisition costs.",
  note: "Margin is attractive, but pricing volatility remains elevated."
}, {
  title: "Highest Confidence Match",
  vehicle: "2023 Ford Ranger Wildtrak",
  estimatedMargin: "£2,940",
  confidence: "98%",
  recommendation: "Keep live monitoring active across fleet channels.",
  note: "Dealer demand and buyer conversion patterns remain consistently strong."
}];
const marketCards = [{
  name: "Performance Cars",
  demand: "High",
  supply: "Tightening",
  margin: "£3,420",
  trend: "Rising",
  confidence: "95%"
}, {
  name: "Classics",
  demand: "Stable",
  supply: "Selective",
  margin: "£4,850",
  trend: "Firm",
  confidence: "79%"
}, {
  name: "SUVs",
  demand: "High",
  supply: "Balanced",
  margin: "£2,680",
  trend: "Positive",
  confidence: "91%"
}, {
  name: "Pick-ups",
  demand: "High",
  supply: "Constrained",
  margin: "£2,940",
  trend: "Rising",
  confidence: "93%"
}, {
  name: "Electric Vehicles",
  demand: "Mixed",
  supply: "Heavy",
  margin: "£1,260",
  trend: "Softening",
  confidence: "84%"
}, {
  name: "Vans",
  demand: "Reliable",
  supply: "Improving",
  margin: "£2,140",
  trend: "Steady",
  confidence: "89%"
}];
const learningMetrics = [{
  label: "Vehicles Analysed Today",
  value: "84,312",
  detail: "Across 6 connected intelligence sources",
  tone: "primary"
}, {
  label: "Patterns Learned",
  value: "318",
  detail: "Fresh pricing, stocking and demand patterns detected",
  tone: "success"
}, {
  label: "Dealer Behaviour Signals",
  value: "47",
  detail: "Search and bid urgency changes across active dealers"
}, {
  label: "Pricing Trends Detected",
  value: "126",
  detail: "Above historical daily average of 101",
  tone: "primary"
}, {
  label: "Mission Success Rate",
  value: "92.4%",
  detail: "Successful surfaced opportunities versus target profile matches",
  tone: "success"
}, {
  label: "Average AI Confidence",
  value: "89.1%",
  detail: "Weighted across all overnight analysis batches"
}];
const predictionGroups = [{
  title: "Likely Rising Markets",
  tone: "success",
  items: ["Volkswagen Golf GTI / Clubsport", "Porsche Macan petrol models", "Ford Ranger Wildtrak", "Toyota Hilux Invincible X"]
}, {
  title: "Likely Falling Markets",
  tone: "warning",
  items: ["BMW M3 Competition", "Tesla Model 3 Long Range", "Audi e-tron 55", "Large diesel executive saloons"]
}, {
  title: "Best Vehicles To Buy Next 30 Days",
  tone: "primary",
  items: ["Porsche Cayenne Coupe", "Volkswagen Golf R", "Ford Transit Custom Limited", "Mercedes GLC 300d AMG Line"]
}, {
  title: "High Risk Purchases",
  tone: "critical",
  items: ["Late-shape Defender 110 above guide", "High-mileage Tesla Model Y", "Older BMW M5 with inconsistent history", "EV stock over 120 days old"]
}, {
  title: "Emerging Opportunities",
  tone: "primary",
  items: ["Dealer group de-fleeted SUVs", "Nearly-new premium hybrids", "Low-owner facelift Macans", "Network part-ex pick-up stock"]
}];
const sourceCards = [{
  name: "Auto Trader",
  status: "Connected",
  quality: "98/100",
  lastUpdate: "2 min ago",
  detail: "Primary retail pricing and stock depth feed is healthy."
}, {
  name: "Motorway",
  status: "Connected",
  quality: "94/100",
  lastUpdate: "4 min ago",
  detail: "Trade supply signal remains strong for prestige and 4x4 stock."
}, {
  name: "Dealer Networks",
  status: "Connected",
  quality: "91/100",
  lastUpdate: "7 min ago",
  detail: "Inter-dealer demand is accelerating for GTI and Macan searches."
}, {
  name: "Fleet Disposal",
  status: "Monitoring",
  quality: "87/100",
  lastUpdate: "12 min ago",
  detail: "Good quality pipeline, but lower match volume this morning."
}, {
  name: "Auction Sources",
  status: "Delayed",
  quality: "78/100",
  lastUpdate: "43 min ago",
  detail: "One overnight batch landed late; confidence adjusted automatically."
}, {
  name: "Future Integrations",
  status: "Planned",
  quality: "—",
  lastUpdate: "Roadmap",
  detail: "Insurance write-off, OEM remarketing and finance returns are queued."
}];
const decisionItems = [{
  action: "Increase monitoring of Golf GTI searches.",
  priority: "Immediate",
  rationale: "Retail demand is rising faster than incoming supply, improving buy-speed advantage for connected dealers."
}, {
  action: "Reduce Defender buying confidence on any stock above guide.",
  priority: "Today",
  rationale: "Headline margin is attractive, but the model is showing broader price dispersion and slower days-to-sale."
}, {
  action: "Increase Porsche Macan search priority.",
  priority: "Today",
  rationale: "Consistent demand, cleaner part-ex stock and strong resale velocity make Macan the best balanced target today."
}, {
  action: "Watch BMW M3 pricing closely.",
  priority: "Monitor",
  rationale: "Softening retail prices suggest a near-term reset; only best-spec cars should be surfaced aggressively."
}];
const predictionToneClasses = {
  primary: "border-primary/20 bg-primary/5",
  warning: "border-amber-400/20 bg-amber-400/5",
  success: "border-emerald-400/20 bg-emerald-400/5",
  critical: "border-red-400/20 bg-red-400/5"
};
const predictionLabelClasses = {
  primary: "text-primary",
  warning: "text-amber-300",
  success: "text-emerald-300",
  critical: "text-red-300"
};
const metricValueClasses = {
  default: "text-on-surface",
  primary: "text-primary",
  success: "text-emerald-300"
};
const sourceStatusClasses = {
  Connected: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  Monitoring: "border-primary/25 bg-primary/10 text-primary",
  Delayed: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  Planned: "border-outline-variant/25 bg-surface/40 text-on-surface-variant"
};
const decisionPriorityClasses = {
  Immediate: "border-red-400/25 bg-red-400/10 text-red-300",
  Today: "border-primary/25 bg-primary/10 text-primary",
  Monitor: "border-amber-400/25 bg-amber-400/10 text-amber-300"
};
function SectionCard({
  title,
  eyebrow,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high/80 shadow-[0_8px_32px_rgba(2,6,23,0.22)] backdrop-blur-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b border-outline-variant/20 px-5 py-4 md:px-6", children: [
      eyebrow ? /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80", children: eyebrow }) : null,
      /* @__PURE__ */ jsx("h2", { className: "mt-1 text-body-lg font-semibold text-on-surface", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-5 py-4 md:px-6", children })
  ] });
}
function LiveClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(() => /* @__PURE__ */ new Date());
  const intervalRef = useRef(null);
  useEffect(() => {
    setMounted(true);
    setTime(/* @__PURE__ */ new Date());
    intervalRef.current = window.setInterval(() => {
      setTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx("span", { suppressHydrationWarning: true, className: "tabular-nums text-on-surface text-sm font-medium", children: mounted ? time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : "--:--:--" });
}
function OwnerIntelligencePage() {
  const [showBackTop, setShowBackTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const navItems = [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Missions",
    href: "/search-builder"
  }, {
    label: "AI Buying Report",
    href: "/opportunity"
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
    label: "Owner Command Centre",
    href: "/owner"
  }, {
    label: "🧠 TICA Intelligence",
    href: "/owner/intelligence",
    active: true
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
  return /* @__PURE__ */ jsx(PlatformShell, { navItems, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-on-surface-variant/50", children: [
      /* @__PURE__ */ jsx("span", { children: "Operations Centre" }),
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "/" }),
      /* @__PURE__ */ jsx("span", { children: "Intelligence" })
    ] }),
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Private" }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary", children: "Owner Only" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "TICA Intelligence" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-on-surface md:text-body-md", children: "Strategic AI Analysis & Market Intelligence" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-body-md text-on-surface-variant", children: "What TICA is learning, what is changing in the market, and what the ownership team should do next." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-emerald-400/20 bg-surface-container-high/65 px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "relative flex h-2.5 w-2.5", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-emerald-400/45 animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "relative h-2.5 w-2.5 rounded-full bg-emerald-300" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300", children: "TICA Live" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "hidden h-4 w-px bg-outline-variant/30 sm:block", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-on-surface-variant", children: "Overall AI confidence remains high" }),
            /* @__PURE__ */ jsx("span", { className: "hidden h-4 w-px bg-outline-variant/30 md:block", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-on-surface-variant", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant/80", children: "Local Time" }),
              /* @__PURE__ */ jsx(LiveClock, {})
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-high/40 px-4 py-2.5 sm:grid-cols-3 sm:gap-x-6", children: [{
            label: "Vehicles Analysed",
            value: "84,312"
          }, {
            label: "High-Confidence Opportunities",
            value: "3"
          }, {
            label: "Sources with Delays",
            value: "1"
          }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold tabular-nums text-on-surface", children: stat.value }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-on-surface-variant/60", children: stat.label })
          ] }, stat.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col items-center gap-2 md:items-end", children: [
          /* @__PURE__ */ jsx(TicaShield, {}),
          /* @__PURE__ */ jsxs("div", { className: "text-center md:text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/50", children: "Platform Status" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center justify-center gap-1.5 md:justify-end", children: [
              /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-emerald-300", children: "Production" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[10px] text-on-surface-variant/40", children: "Version 1.0" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "rounded-[1.75rem] border border-primary/20 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(17,24,39,0.82))] p-5 shadow-[0_18px_50px_rgba(2,6,23,0.35)] sm:p-6 lg:p-7", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(16rem,0.95fr)] lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80", children: "Executive AI Briefing" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-8 text-on-surface sm:text-[1.4rem] sm:leading-9", children: "Good afternoon, Jonathan. Overnight TICA analysed 84,312 vehicles across connected sources. Demand for Volkswagen Golf GTI models continues to rise while BMW M3 prices have softened. Three high-confidence buying opportunities require review today. One data source experienced intermittent delays overnight. Overall AI confidence remains high." }),
          /* @__PURE__ */ jsx("p", { className: "max-w-3xl text-sm leading-7 text-on-surface-variant", children: "The strongest signal this morning is the continued compression in performance hatchback supply while retailer search intent remains elevated. TICA is also detecting a cleaner acquisition window for Porsche Macan petrol stock and stronger-than-usual margin protection in premium pick-ups." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/70", children: "Morning highlights" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: ["Golf GTI search demand up 14% week-on-week", "Macan petrol stock now retailing 2.1 days faster", "Auction-source delay contained with no critical data loss"].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-xl border border-outline-variant/15 bg-surface/25 px-3 py-3", children: [
          /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-primary", children: "•" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: item })
        ] }, item)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(SectionCard, { title: "Opportunity Radar", eyebrow: "What looks strongest right now", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: opportunityCards.map((card) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/20 bg-surface/35 p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80", children: card.title }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-base font-semibold text-on-surface", children: card.vehicle }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Estimated Margin" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-base font-bold text-primary", children: card.estimatedMargin })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "AI Confidence" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-base font-bold text-emerald-300", children: card.confidence })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-on-surface", children: card.recommendation }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-6 text-on-surface-variant", children: card.note })
    ] }, card.title)) }) }),
    /* @__PURE__ */ jsx(SectionCard, { title: "Market Intelligence", eyebrow: "Segment-level reading", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: marketCards.map((card) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/20 bg-surface/35 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-on-surface", children: card.name }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary", children: card.trend })
      ] }),
      /* @__PURE__ */ jsxs("dl", { className: "mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Market Demand" }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-on-surface", children: card.demand })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Supply" }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-on-surface", children: card.supply })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Estimated Margin" }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-primary font-semibold", children: card.margin })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "AI Confidence" }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-emerald-300 font-semibold", children: card.confidence })
        ] })
      ] })
    ] }, card.name)) }) }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "AI Learning Centre", eyebrow: "How the model is improving today", children: [
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: learningMetrics.map((metric) => {
        const tone = metric.tone ?? "default";
        return /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/20 bg-surface/35 p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: metric.label }),
          /* @__PURE__ */ jsx("p", { className: `mt-2 text-2xl font-bold ${metricValueClasses[tone]}`, children: metric.value }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-on-surface-variant", children: metric.detail })
        ] }, metric.label);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80", children: "Learning Progress" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-base font-semibold text-on-surface", children: "Signal confidence has improved throughout the morning batch cycle." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-primary", children: "76%" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 h-3 overflow-hidden rounded-full bg-surface-container-high", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-[linear-gradient(90deg,rgba(20,147,255,0.65),rgba(74,222,128,0.78))]", style: {
          width: "76%"
        } }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-on-surface-variant", children: "TICA has already completed 76% of today’s scheduled learning passes across pricing, demand and dealer behaviour models." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SectionCard, { title: "Prediction Engine", eyebrow: "Where the market is heading next", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: predictionGroups.map((group) => /* @__PURE__ */ jsxs("article", { className: `rounded-2xl border p-4 ${predictionToneClasses[group.tone]}`, children: [
      /* @__PURE__ */ jsx("h3", { className: `text-base font-semibold ${predictionLabelClasses[group.tone]}`, children: group.title }),
      /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2", children: group.items.map((item) => /* @__PURE__ */ jsx("li", { className: "rounded-xl border border-outline-variant/15 bg-surface/25 px-3 py-2.5 text-sm text-on-surface-variant", children: item }, item)) })
    ] }, group.title)) }) }),
    /* @__PURE__ */ jsx(SectionCard, { title: "Connected Intelligence Sources", eyebrow: "Feed health and confidence", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3", children: sourceCards.map((source) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-outline-variant/20 bg-surface/35 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-on-surface", children: source.name }),
        /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${sourceStatusClasses[source.status]}`, children: source.status })
      ] }),
      /* @__PURE__ */ jsxs("dl", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Quality Score" }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-on-surface", children: source.quality })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { className: "text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/60", children: "Last Update" }),
          /* @__PURE__ */ jsx("dd", { className: "mt-1 text-on-surface", children: source.lastUpdate })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-6 text-on-surface-variant", children: source.detail })
    ] }, source.name)) }) }),
    /* @__PURE__ */ jsx(SectionCard, { title: "AI Decision Engine", eyebrow: "What TICA recommends next", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: decisionItems.map((item) => /* @__PURE__ */ jsx("article", { className: "rounded-2xl border border-outline-variant/20 bg-surface/35 p-4 sm:p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-on-surface", children: item.action }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-7 text-on-surface-variant", children: item.rationale })
      ] }),
      /* @__PURE__ */ jsx("span", { className: `inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${decisionPriorityClasses[item.priority]}`, children: item.priority })
    ] }) }, item.action)) }) }),
    /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-outline-variant/20 bg-surface-container-high/60 px-5 py-4 text-sm leading-7 text-on-surface-variant shadow-[0_8px_28px_rgba(2,6,23,0.16)]", children: "TICA Intelligence continuously analyses connected market data to identify buying opportunities and improve dealer search performance." }),
    showBackTop ? /* @__PURE__ */ jsx("button", { type: "button", onClick: scrollToTop, className: "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface-container-high text-primary shadow-[0_4px_16px_rgba(2,6,23,0.4)] transition-all hover:bg-primary/10", "aria-label": "Back to top", children: "↑" }) : null
  ] }) });
}
export {
  OwnerIntelligencePage as component
};
