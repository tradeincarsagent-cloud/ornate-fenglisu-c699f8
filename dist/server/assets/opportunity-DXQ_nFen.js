import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { P as PlatformShell } from "./PlatformShell-I7_sbTZ6.js";
import { o as opportunityIntelligencePlaceholder } from "./opportunity-intelligence-CuGw1k3x.js";
import "react";
const {
  featuredOpportunity
} = opportunityIntelligencePlaceholder;
function ChevronRightIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) });
}
function OpportunityPage() {
  const keyMetrics = [{
    label: "Confidence",
    value: featuredOpportunity.confidenceDisplay
  }, {
    label: "Opportunity Score",
    value: featuredOpportunity.scoring.overallOpportunityScore.displayValue
  }, {
    label: "Estimated Retail Value",
    value: featuredOpportunity.estimatedRetailValueDisplay
  }, {
    label: "Estimated Gross Profit",
    value: featuredOpportunity.estimatedGrossProfitDisplay
  }, {
    label: "Demand Rating",
    value: featuredOpportunity.demandRatingDisplay
  }];
  const vehicleInfo = featuredOpportunity.vehicleInfo;
  const [buyingSummaryLead, buyingSummaryTail = ""] = featuredOpportunity.buyingSummary.split("BUY");
  return /* @__PURE__ */ jsx(PlatformShell, { navItems: [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Builder",
    href: "/search-builder"
  }, {
    label: "AI Buying Report",
    href: "/opportunity",
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
    label: "Settings",
    disabled: true
  }, {
    label: "Subscription",
    disabled: true
  }], children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-6 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("header", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
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
      /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "AI Buying Report" }),
        /* @__PURE__ */ jsxs("p", { className: "text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant", children: [
          "Vehicle Opportunity ID: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-on-surface", children: featuredOpportunity.id })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-5 text-headline-md font-headline-md text-on-surface", children: "AI Buying Verdict" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 lg:flex-row lg:items-stretch", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/50 bg-primary-container px-5 py-6 text-center sm:px-8 sm:py-8 lg:min-w-[320px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "traffic-light-shell", "aria-label": "AI buying verdict traffic light", children: [
            /* @__PURE__ */ jsx("div", { className: "traffic-light-lens traffic-light-lens-green-active", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("div", { className: "traffic-light-lens", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("div", { className: "traffic-light-lens", "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-primary-container/80", children: "Verdict" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[34px] font-bold leading-none tracking-tight text-on-primary-container sm:text-[46px]", children: featuredOpportunity.verdictDisplay })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full rounded-xl border border-outline-variant/35 bg-surface-container-high/70 px-4 py-3 text-left", children: /* @__PURE__ */ jsxs("p", { className: "text-body-xs font-body-sm leading-relaxed text-on-surface-variant", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4ade80]", children: "Green" }),
            " = Strong buying opportunity",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#f59e0b]", children: "Amber" }),
            " = Review further",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#ef4444]", children: "Red" }),
            " = Pass / avoid"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 grid w-full grid-cols-1 gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/30 bg-surface-container-high px-3 py-3 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: "Confidence" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-lg font-semibold text-primary", children: featuredOpportunity.confidenceDisplay })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: "Risk Level" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-lg font-semibold text-[#4ade80]", children: featuredOpportunity.riskLevel })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: "Est. Gross Profit" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-semibold text-on-surface", children: featuredOpportunity.estimatedGrossProfitDisplay })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high px-3 py-3 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: "Days to Sell" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-semibold text-on-surface", children: featuredOpportunity.daysToSellDisplay })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex min-w-0 flex-1 items-center rounded-2xl border border-outline-variant/30 bg-surface-container-high px-5 py-5 sm:px-6 sm:py-6", children: /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md leading-relaxed text-on-surface-variant", children: featuredOpportunity.verdictNarrative }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-5 sm:p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant", children: "Target Vehicle" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-headline-lg font-headline-lg text-on-surface", children: featuredOpportunity.vehicle }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-lg font-body-lg text-on-surface", children: [
          /* @__PURE__ */ jsx("span", { children: featuredOpportunity.year }),
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: featuredOpportunity.listPriceDisplay })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container", children: /* @__PURE__ */ jsx("img", { src: featuredOpportunity.heroImageSrc, alt: featuredOpportunity.heroImageAlt, className: "h-auto max-h-[280px] w-full object-cover" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-primary/40 bg-primary-container p-5 sm:p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.2em] text-on-primary-container/80", children: "AI Verdict" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[56px] font-semibold leading-none text-on-primary-container sm:text-[72px]", children: featuredOpportunity.verdict })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5", children: keyMetrics.map((metric) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
      /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: metric.label }),
      /* @__PURE__ */ jsx("dd", { className: "mt-2 text-body-lg font-body-lg text-on-surface", children: metric.value })
    ] }, metric.label)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "AI Opportunity Analysis" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant", children: featuredOpportunity.analysisSummary })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-5 text-headline-md font-headline-md text-on-surface", children: "AI Buying Checklist" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: featuredOpportunity.checklist.map((item) => {
        const statusToneClass = item.tone === "positive" ? "text-[#4ade80]" : item.tone === "warning" ? "text-[#facc15]" : "text-primary";
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
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-body-sm font-body-sm text-on-surface-variant/70 italic", children: "Complete vehicle history, MOT and verification services will be available through trusted data providers in a future release." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-5 text-headline-md font-headline-md text-on-surface", children: "AI Negotiation Advice" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Suggested Opening Offer" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-lg font-semibold text-on-surface", children: featuredOpportunity.negotiation.openingOfferDisplay })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Likely Acceptance Range" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-lg font-semibold text-on-surface", children: featuredOpportunity.negotiation.likelyAcceptanceRangeDisplay })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Negotiation Confidence" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-lg font-semibold text-primary", children: featuredOpportunity.negotiation.confidenceDisplay })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4 sm:col-span-2 lg:col-span-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: "Negotiation Advice" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-sm font-body-sm text-on-surface-variant leading-relaxed", children: featuredOpportunity.negotiation.advice })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-2", children: [
        /* @__PURE__ */ jsx("button", { disabled: true, className: "cursor-not-allowed rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant/50 opacity-50", children: "Future Feature: Simulate Deal" }),
        /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface-variant/60 italic", children: "Interactive deal simulation will be available in a future release." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "AI Buying Summary" }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-primary/30 bg-primary-container/20 px-6 py-5", children: /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md leading-relaxed text-on-surface-variant", children: [
        buyingSummaryLead,
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-on-surface", children: featuredOpportunity.verdict }),
        buyingSummaryTail
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Vehicle Information" }),
      /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", children: vehicleInfo.map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface-container-high p-4", children: [
        /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-[0.15em] text-on-surface-variant", children: item.label }),
        /* @__PURE__ */ jsx("dd", { className: "mt-1 text-body-md font-body-md text-on-surface", children: item.value })
      ] }, item.label)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Vehicle History & MOT Checks" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Powered by trusted vehicle data providers." }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-primary", children: "Status: Available soon." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Dealer Notes" }),
      /* @__PURE__ */ jsx("textarea", { placeholder: "Add internal notes, call outcomes, valuation observations, and next actions...", className: "h-44 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60 sm:h-40" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-5 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5", children: [
        /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Save Opportunity" }),
        /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Ignore" }),
        /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Contact Seller" }),
        /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Return to Dashboard" }),
        /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Create New AI Search" }),
        /* @__PURE__ */ jsx("button", { className: "min-h-11 rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Explain Why" })
      ] })
    ] })
  ] }) });
}
export {
  OpportunityPage as component
};
