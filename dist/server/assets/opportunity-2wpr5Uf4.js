import { jsx, jsxs } from "react/jsx-runtime";
function OpportunityPage() {
  const keyMetrics = [{
    label: "Confidence",
    value: "97%"
  }, {
    label: "Opportunity Score",
    value: "97 / 100"
  }, {
    label: "Estimated Retail Value",
    value: "£36,250"
  }, {
    label: "Estimated Gross Profit",
    value: "£4,255"
  }, {
    label: "Demand Rating",
    value: "★★★★★"
  }];
  const vehicleInfo = [{
    label: "Mileage",
    value: "47,820 miles"
  }, {
    label: "Transmission",
    value: "Automatic"
  }, {
    label: "Fuel",
    value: "Petrol"
  }, {
    label: "Colour",
    value: "Black Sapphire"
  }, {
    label: "Owners",
    value: "2 previous owners"
  }, {
    label: "Location",
    value: "Manchester"
  }, {
    label: "Seller Type",
    value: "Independent dealer"
  }];
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen overflow-x-hidden bg-background px-4 py-8 text-on-surface sm:px-6 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "AI Buying Report" }),
        /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm uppercase tracking-[0.2em] text-on-surface-variant", children: "Premium Opportunity Review" })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "inline-flex w-full items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary sm:w-auto", children: "Return to Dashboard" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high p-5 sm:p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant", children: "Target Vehicle" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 text-headline-lg font-headline-lg text-on-surface", children: "BMW M3 Competition" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-lg font-body-lg text-on-surface", children: [
          /* @__PURE__ */ jsx("span", { children: "2022" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "£31,995" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-primary/40 bg-primary-container p-5 sm:p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.2em] text-on-primary-container/80", children: "AI Verdict" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-[56px] font-semibold leading-none text-on-primary-container sm:text-[72px]", children: "BUY" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5", children: keyMetrics.map((metric) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
      /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-[0.16em] text-on-surface-variant", children: metric.label }),
      /* @__PURE__ */ jsx("dd", { className: "mt-2 text-body-lg font-body-lg text-on-surface", children: metric.value })
    ] }, metric.label)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "AI Opportunity Analysis" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-body-md font-body-md text-on-surface-variant", children: "This M3 Competition presents a strong margin profile with high market demand, stable retail velocity, and a purchase price positioned well below projected forecourt value. The pricing spread and demand indicators support a confident stock turn opportunity for premium performance inventory." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-5 text-headline-md font-headline-md text-on-surface", children: "AI Buying Checklist" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✅" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Market Price" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#4ade80]", children: "Excellent Value" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✅" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Estimated Profit" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#4ade80]", children: "High Profit Potential" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🟡" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Vehicle History" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#facc15]", children: "History Check Recommended" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🟡" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "MOT History" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#facc15]", children: "Review Required" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🟡" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Service History" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#facc15]", children: "Verify Records" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🟢" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Mileage" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#86efac]", children: "Appears Consistent" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🟢" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Seller Profile" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-[#86efac]", children: "Trusted Listing" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-high px-5 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🔵" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md text-on-surface", children: "Estimated Days to Sell" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.14em] text-on-surface-variant", children: "Estimate" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-body-sm font-body-sm text-primary", children: "9 Days" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-body-sm font-body-sm text-on-surface-variant/70 italic", children: "Complete vehicle history, MOT and verification services will be available through trusted data providers in a future release." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "AI Buying Summary" }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-primary/30 bg-primary-container/20 px-6 py-5", children: /* @__PURE__ */ jsxs("p", { className: "text-body-md font-body-md leading-relaxed text-on-surface-variant", children: [
        "This opportunity has been ranked as a ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-on-surface", children: "BUY" }),
        " because the asking price is below current market value, dealer demand is strong, and estimated resale margins are above average. Before purchasing, we recommend confirming MOT history, service records and vehicle history."
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
      /* @__PURE__ */ jsx("textarea", { placeholder: "Add internal notes, call outcomes, valuation observations, and next actions...", className: "h-40 w-full resize-y rounded-xl border border-outline-variant/35 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary/60" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-5 sm:p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-5 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5", children: [
        /* @__PURE__ */ jsx("button", { className: "rounded-xl bg-primary px-5 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Save Opportunity" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Ignore" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Contact Seller" }),
        /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "inline-flex items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Return to Dashboard" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-xl border border-outline-variant/40 bg-surface-container-high px-5 py-3 text-body-md font-body-md text-on-surface-variant transition-all hover:text-on-surface", children: "Explain Why" })
      ] })
    ] })
  ] }) });
}
export {
  OpportunityPage as component
};
