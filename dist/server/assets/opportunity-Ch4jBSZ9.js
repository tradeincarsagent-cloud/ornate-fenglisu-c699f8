import { jsx, jsxs } from "react/jsx-runtime";
function OpportunityPage() {
  const summaryItems = [{
    label: "Vehicle",
    value: "BMW M3 Competition"
  }, {
    label: "Year",
    value: "2022"
  }, {
    label: "Price",
    value: "£31,995"
  }, {
    label: "AI Verdict",
    value: "BUY"
  }, {
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
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background px-6 py-10 text-on-surface md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-container-max space-y-8", children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "AI Buying Report" }) }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: summaryItems.map((item) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("dt", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: item.label }),
      /* @__PURE__ */ jsx("dd", { className: "mt-1 text-body-lg font-body-lg text-on-surface", children: item.value })
    ] }, item.label)) }) }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "AI Opportunity Analysis" }) }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Vehicle Information" }) }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-2 text-headline-md font-headline-md text-on-surface", children: "Vehicle History & MOT Checks" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Powered by trusted vehicle data providers." })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Dealer Notes" }) }),
    /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "Actions" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-5 py-2.5 text-body-md font-body-md text-on-primary", children: "Save Opportunity" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant", children: "Ignore" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant", children: "Contact Seller" }),
        /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant", children: "Return to Dashboard" }),
        /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-5 py-2.5 text-body-md font-body-md text-on-surface-variant", children: "Explain Why" })
      ] })
    ] })
  ] }) });
}
export {
  OpportunityPage as component
};
