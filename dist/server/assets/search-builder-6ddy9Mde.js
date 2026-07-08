import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-DBXDg_m-.js";
const VEHICLE_TYPES = ["Cars", "Pick-ups", "Vans & Light Commercials"];
const SEARCH_FREQUENCIES = [{
  label: "Every 15 Minutes",
  value: "15min"
}, {
  label: "Hourly",
  value: "hourly"
}, {
  label: "Every 6 Hours",
  value: "6h"
}, {
  label: "Daily",
  value: "daily"
}];
const PHASE_ONE_SOURCES = ["Auto Trader", "Dealer Network", "UK Public Vehicle Listings", "Dealer Websites", "Classified Vehicle Websites"];
const PLANNED_INTEGRATIONS = ["Facebook Marketplace", "Auctions", "Private Sellers", "Trade Feeds", "Vehicle History Providers"];
function CheckIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) });
}
function SearchBuilderPage() {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [minProfit, setMinProfit] = useState("");
  const [frequency, setFrequency] = useState(null);
  const [missionCreated, setMissionCreated] = useState(false);
  const selectedFrequency = SEARCH_FREQUENCIES.find((item) => item.value === frequency)?.label ?? "Not selected";
  const missionNameBase = [make.trim(), model.trim()].filter(Boolean).join(" ");
  const missionName = missionNameBase || selectedVehicleType || "Vehicle Search";
  return /* @__PURE__ */ jsx(PlatformShell, { navItems: [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Finder",
    href: "/search-builder",
    active: true
  }, {
    label: "AI Buying Report",
    href: "/opportunity"
  }, {
    label: "Settings",
    isSectionLabel: true
  }, {
    label: "Notification Preferences",
    href: "/settings"
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
  }], children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5 md:mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "AI Search Finder" }),
        /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx(TicaShield, {}) })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-on-surface", children: "Create Your AI Search in Under 60 Seconds" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Tell TICA exactly what you're looking for and let your AI Search Finder work 24/7 to discover the best buying opportunities before everyone else." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-5 sm:space-y-8", children: [
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "1" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Vehicle Type" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: VEHICLE_TYPES.map((type) => {
          const selected = selectedVehicleType === type;
          return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedVehicleType(type), className: `group relative flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border p-5 text-center transition-all duration-200 sm:min-h-32 sm:p-6 ${selected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-high hover:text-on-surface"}`, "aria-pressed": selected, children: [
            selected && /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: type === "Cars" ? "🚗" : type === "Pick-ups" ? "🛻" : "🚐" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md font-semibold", children: type })
          ] }, type);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "2" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Vehicle Details" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "make", children: "Make" }),
            /* @__PURE__ */ jsx("input", { id: "make", type: "text", placeholder: "e.g. BMW, Audi, Ford", value: make, onChange: (e) => setMake(e.target.value), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "model", children: "Model" }),
            /* @__PURE__ */ jsx("input", { id: "model", type: "text", placeholder: "e.g. 3 Series, A4, Focus", value: model, onChange: (e) => setModel(e.target.value), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "year-from", children: "Year From" }),
            /* @__PURE__ */ jsx("input", { id: "year-from", type: "number", placeholder: "e.g. 2018", min: "1990", max: "2030", value: yearFrom, onChange: (e) => setYearFrom(e.target.value), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "year-to", children: "Year To" }),
            /* @__PURE__ */ jsx("input", { id: "year-to", type: "number", placeholder: "e.g. 2024", min: "1990", max: "2030", value: yearTo, onChange: (e) => setYearTo(e.target.value), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "max-budget", children: "Maximum Budget" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant", children: "£" }),
              /* @__PURE__ */ jsx("input", { id: "max-budget", type: "number", placeholder: "e.g. 30000", min: "0", value: maxBudget, onChange: (e) => setMaxBudget(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "max-mileage", children: "Maximum Mileage" }),
            /* @__PURE__ */ jsx("input", { id: "max-mileage", type: "number", placeholder: "e.g. 60000", min: "0", value: maxMileage, onChange: (e) => setMaxMileage(e.target.value), className: "min-h-11 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:col-span-2 lg:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "min-profit", children: "Minimum Estimated Profit" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant", children: "£" }),
              /* @__PURE__ */ jsx("input", { id: "min-profit", type: "number", placeholder: "e.g. 1500", min: "0", value: minProfit, onChange: (e) => setMinProfit(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "3" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Search Sources" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Available / Phase 1" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PHASE_ONE_SOURCES.map((source) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-primary/20 bg-surface-container-high px-4 py-3.5 shadow-sm shadow-primary/5", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-primary bg-primary text-on-primary", "aria-hidden": "true", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
              /* @__PURE__ */ jsx("span", { className: "flex-1 text-body-md font-body-md text-on-surface", children: source }),
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps text-primary", children: "Phase 1" })
            ] }, source)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Planned Integrations" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PLANNED_INTEGRATIONS.map((source) => /* @__PURE__ */ jsxs("div", { className: "flex cursor-not-allowed items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container px-4 py-3.5 opacity-60", "aria-disabled": "true", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-outline-variant/40 bg-transparent", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "flex-1 text-body-md font-body-md text-on-surface-variant", children: source }),
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 rounded-full border border-outline-variant/40 bg-surface-container-high px-3 py-1 text-label-caps font-label-caps text-on-surface-variant", children: "Coming Soon" })
            ] }, source)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3.5", children: /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Trade in Cars Agent is being designed to search connected marketplaces, dealer sources and trusted public vehicle listings. Some integrations will be released in later platform phases." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "4" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Search Frequency" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: SEARCH_FREQUENCIES.map(({
          label,
          value
        }) => {
          const selected = frequency === value;
          return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFrequency(value), "aria-pressed": selected, className: `relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border px-4 py-4 text-center transition-all duration-200 sm:py-5 ${selected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface"}`, children: [
            selected && /* @__PURE__ */ jsx("span", { className: "absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: value === "15min" ? "⚡" : value === "hourly" ? "🔄" : value === "6h" ? "⏱️" : "📅" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md font-semibold leading-tight", children: label })
          ] }, value);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 text-center sm:p-6 md:p-10", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setMissionCreated(true), className: "mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 sm:py-5 text-headline-md font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("span", { children: "⚡" }),
          "Start AI Search Mission"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-md font-body-md text-on-surface-variant", children: "Live AI scanning will be available in a future platform release." })
      ] }),
      missionCreated && /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-6 md:p-8", "aria-live": "polite", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Mission Created" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 text-headline-lg font-headline-lg text-on-surface", children: "AI Search Mission Created" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Mission Name" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: missionName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-primary", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Monitoring Frequency" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: selectedFrequency })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Search Sources" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: PHASE_ONE_SOURCES.join(", ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Return to Dealer Command Centre" }),
          /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary", children: "View AI Buying Report" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SearchBuilderPage as component
};
