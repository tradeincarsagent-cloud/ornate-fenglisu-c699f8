import { jsx, jsxs } from "react/jsx-runtime";
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
        /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
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
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl border-2 border-primary/35 bg-gradient-to-br from-primary-container/35 via-surface-container to-surface-container-high p-6 shadow-[0_0_40px_rgba(58,77,255,0.12)] md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-lg font-headline-lg text-primary", children: "AI Recommendation of the Day" }),
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
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Current Price" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "£31,995" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Estimated Retail Value" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "£36,250" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Estimated Gross Profit" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "£4,255" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "AI Confidence" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "97%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Priority" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-primary", children: "★★★★★ High Priority" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Reason for Recommendation" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-body-md font-body-md text-on-surface-variant", children: [
                /* @__PURE__ */ jsx("li", { children: "• Recently reduced in price" }),
                /* @__PURE__ */ jsx("li", { children: "• Below current market average" }),
                /* @__PURE__ */ jsx("li", { children: "• Strong dealer demand" }),
                /* @__PURE__ */ jsx("li", { children: "• Excellent resale potential" }),
                /* @__PURE__ */ jsx("li", { children: "• Located only 42 miles away" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Recommended Action" }),
              /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: "Review this vehicle first today." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary hover:opacity-90 transition-opacity", children: "Review Opportunity" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface hover:border-primary/40 transition-colors", children: "Save to Watchlist" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-body-sm font-body-sm text-on-surface-variant", children: "AI recommendations are generated using pricing trends, vehicle demand and opportunity scoring. Live data will be connected in a future release." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "“Your latest AI search results will appear here.”" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
