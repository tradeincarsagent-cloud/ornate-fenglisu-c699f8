import { jsx, jsxs } from "react/jsx-runtime";
function DashboardPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background text-on-surface p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary mb-1", children: "Dealer Command Centre" }),
    /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2", children: "Development Preview" }),
    /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant mb-8", children: "This page is under construction." }),
    /* @__PURE__ */ jsxs("div", { className: "bg-surface-container-high rounded-xl p-6 max-w-xs", children: [
      /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-3", children: "Today's Best Opportunity" }),
      /* @__PURE__ */ jsx("p", { className: "text-headline-md font-headline-md text-on-surface", children: "BMW M3 Competition" }),
      /* @__PURE__ */ jsx("p", { className: "text-headline-lg font-headline-lg text-primary mt-1", children: "£31,995" })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
