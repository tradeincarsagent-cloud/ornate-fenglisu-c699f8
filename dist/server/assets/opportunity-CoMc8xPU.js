import { jsx, jsxs } from "react/jsx-runtime";
function OpportunityPage() {
  const vehicleInfo = [{
    label: "Mileage",
    value: "28,400 miles"
  }, {
    label: "Transmission",
    value: "Automatic"
  }, {
    label: "Fuel",
    value: "Petrol"
  }, {
    label: "Colour",
    value: "Isle of Man Green"
  }, {
    label: "Owners",
    value: "2"
  }, {
    label: "Location",
    value: "Manchester, M1"
  }, {
    label: "Seller Type",
    value: "Private Seller"
  }];
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background text-on-surface", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-container-max", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-primary", children: "Trade in Cars Agent" }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer", children: "Dealer Command Centre" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [
      /* @__PURE__ */ jsx("header", { className: "border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Trade in Cars Agent" }) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 px-6 py-8 md:px-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "BMW M3 Competition" }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/15 px-3 py-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "High Priority Opportunity" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-headline-md font-headline-md text-on-surface-variant", children: "2022  ·  £31,995" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "dashboard-border mb-8 flex h-72 items-center justify-center rounded-2xl bg-surface-container-high", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 text-4xl", children: "🚗" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Vehicle image placeholder" }),
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant/60", children: "BMW M3 Competition · 2022" })
        ] }) }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "AI Opportunity Analysis" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-2 gap-6 md:grid-cols-4", children: [
            /* @__PURE__ */ jsxs("article", { className: "dashboard-border rounded-xl bg-surface-container-high p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Opportunity Score" }),
              /* @__PURE__ */ jsxs("p", { className: "text-headline-lg font-headline-lg text-primary", children: [
                "97",
                /* @__PURE__ */ jsx("span", { className: "text-headline-md font-headline-md text-on-surface-variant", children: "/100" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "dashboard-border rounded-xl bg-surface-container-high p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Estimated Retail Value" }),
              /* @__PURE__ */ jsx("p", { className: "text-headline-lg font-headline-lg text-primary", children: "£36,250" })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "dashboard-border rounded-xl bg-surface-container-high p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Estimated Gross Profit" }),
              /* @__PURE__ */ jsx("p", { className: "text-headline-lg font-headline-lg text-primary", children: "£4,255" })
            ] }),
            /* @__PURE__ */ jsxs("article", { className: "dashboard-border rounded-xl bg-surface-container-high p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Demand Rating" }),
              /* @__PURE__ */ jsx("p", { className: "text-headline-lg font-headline-lg text-yellow-400", children: "★★★★★" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "AI Summary" }),
            /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: '"This vehicle appears to be priced below current market average and represents an excellent dealer opportunity."' })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "Vehicle Information" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4", children: vehicleInfo.map((item) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: item.label }),
            /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: item.value })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Vehicle History & MOT Checks" }),
          /* @__PURE__ */ jsxs("div", { className: "dashboard-border flex flex-col items-start gap-3 rounded-xl bg-surface-container-high p-5 md:flex-row md:items-center md:gap-6", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-outline-variant/40 px-4 py-1.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status: Available Soon" }),
            /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Future integration with trusted data providers." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-headline-md font-headline-md text-on-surface", children: "Dealer Notes" }),
          /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high", children: /* @__PURE__ */ jsx("textarea", { readOnly: true, placeholder: "Add your notes about this vehicle here…", rows: 6, className: "w-full resize-none rounded-xl bg-transparent p-5 text-body-md font-body-md text-on-surface-variant placeholder:text-on-surface-variant/50 focus:outline-none" }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90", children: "Save Opportunity" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40", children: "Contact Seller" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-outline-variant/70", children: "Ignore" }),
            /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-surface", children: "Return to Dashboard" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  OpportunityPage as component
};
