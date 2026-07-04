import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
const LOGO_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS";
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-on-surface", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-container-max items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "logo-bezel w-36 rounded-lg p-1 sm:w-44", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }),
      /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-2 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary", children: "← Dashboard" })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-container-max px-6 py-10 md:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "AI Search Builder" }),
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-on-surface", children: "Create an AI Search in Under 60 Seconds" }),
        /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Configure your search criteria and let the AI find matching vehicles 24/7." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "1" }),
            /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Vehicle Type" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: VEHICLE_TYPES.map((type) => {
            const selected = selectedVehicleType === type;
            return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedVehicleType(type), className: `group relative flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center transition-all duration-200 ${selected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-high hover:text-on-surface"}`, "aria-pressed": selected, children: [
              selected && /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: type === "Cars" ? "🚗" : type === "Pick-ups" ? "🛻" : "🚐" }),
              /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md font-semibold", children: type })
            ] }, type);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "2" }),
            /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Vehicle Details" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "make", children: "Make" }),
              /* @__PURE__ */ jsx("input", { id: "make", type: "text", placeholder: "e.g. BMW, Audi, Ford", value: make, onChange: (e) => setMake(e.target.value), className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "model", children: "Model" }),
              /* @__PURE__ */ jsx("input", { id: "model", type: "text", placeholder: "e.g. 3 Series, A4, Focus", value: model, onChange: (e) => setModel(e.target.value), className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "year-from", children: "Year From" }),
              /* @__PURE__ */ jsx("input", { id: "year-from", type: "number", placeholder: "e.g. 2018", min: "1990", max: "2030", value: yearFrom, onChange: (e) => setYearFrom(e.target.value), className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "year-to", children: "Year To" }),
              /* @__PURE__ */ jsx("input", { id: "year-to", type: "number", placeholder: "e.g. 2024", min: "1990", max: "2030", value: yearTo, onChange: (e) => setYearTo(e.target.value), className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "max-budget", children: "Maximum Budget" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant", children: "£" }),
                /* @__PURE__ */ jsx("input", { id: "max-budget", type: "number", placeholder: "e.g. 30000", min: "0", value: maxBudget, onChange: (e) => setMaxBudget(e.target.value), className: "w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "max-mileage", children: "Maximum Mileage" }),
              /* @__PURE__ */ jsx("input", { id: "max-mileage", type: "number", placeholder: "e.g. 60000", min: "0", value: maxMileage, onChange: (e) => setMaxMileage(e.target.value), className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:col-span-2 lg:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "min-profit", children: "Minimum Estimated Profit" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant", children: "£" }),
                /* @__PURE__ */ jsx("input", { id: "min-profit", type: "number", placeholder: "e.g. 1500", min: "0", value: minProfit, onChange: (e) => setMinProfit(e.target.value), className: "w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "3" }),
            /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Search Sources" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Available / Phase 1" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PHASE_ONE_SOURCES.map((source) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-primary/20 bg-surface-container-high px-5 py-4 shadow-sm shadow-primary/5", children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-primary bg-primary text-on-primary", "aria-hidden": "true", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
                /* @__PURE__ */ jsx("span", { className: "flex-1 text-body-md font-body-md text-on-surface", children: source }),
                /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps text-primary", children: "Phase 1" })
              ] }, source)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Planned Integrations" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PLANNED_INTEGRATIONS.map((source) => /* @__PURE__ */ jsxs("div", { className: "flex cursor-not-allowed items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container px-5 py-4 opacity-60", "aria-disabled": "true", children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-outline-variant/40 bg-transparent", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("span", { className: "flex-1 text-body-md font-body-md text-on-surface-variant", children: source }),
                /* @__PURE__ */ jsx("span", { className: "rounded-full border border-outline-variant/40 bg-surface-container-high px-3 py-1 text-label-caps font-label-caps text-on-surface-variant", children: "Coming Soon" })
              ] }, source)) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Trade in Cars Agent is being designed to search connected marketplaces, dealer sources and trusted public vehicle listings. Some integrations will be released in later platform phases." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-label-caps font-label-caps text-primary", children: "4" }),
            /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Search Frequency" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: SEARCH_FREQUENCIES.map(({
            label,
            value
          }) => {
            const selected = frequency === value;
            return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFrequency(value), "aria-pressed": selected, className: `relative flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-5 text-center transition-all duration-200 ${selected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface"}`, children: [
              selected && /* @__PURE__ */ jsx("span", { className: "absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
              /* @__PURE__ */ jsx("span", { className: "text-xl", children: value === "15min" ? "⚡" : value === "hourly" ? "🔄" : value === "6h" ? "⏱️" : "📅" }),
              /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md font-semibold leading-tight", children: label })
            ] }, value);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 text-center md:p-10", children: [
          /* @__PURE__ */ jsxs("button", { type: "button", className: "mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-headline-md font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]", children: [
            /* @__PURE__ */ jsx("span", { children: "⚡" }),
            "Activate AI Search"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-md font-body-md text-on-surface-variant", children: "Live AI scanning will be available in a future platform release." })
        ] })
      ] })
    ] })
  ] });
}
export {
  SearchBuilderPage as component
};
