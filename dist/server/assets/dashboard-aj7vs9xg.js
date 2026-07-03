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
  const activeSearches = [{
    vehicle: "BMW M3 Competition",
    budget: "Up to £35,000",
    radius: "200 miles",
    lastScan: "3 minutes ago",
    status: "Monitoring"
  }, {
    vehicle: "Mercedes E220 AMG Line",
    budget: "Up to £24,500",
    radius: "150 miles",
    lastScan: "11 minutes ago",
    status: "Monitoring"
  }, {
    vehicle: "Ford Ranger Wildtrak",
    budget: "Up to £29,995",
    radius: "100 miles",
    lastScan: "18 minutes ago",
    status: "Monitoring"
  }, {
    vehicle: "VW Golf R",
    budget: "Up to £27,000",
    radius: "175 miles",
    lastScan: "7 minutes ago",
    status: "Monitoring"
  }, {
    vehicle: "Ford Transit Custom",
    budget: "Up to £21,000",
    radius: "120 miles",
    lastScan: "22 minutes ago",
    status: "Monitoring"
  }, {
    vehicle: "Toyota Hilux Invincible",
    budget: "Up to £33,500",
    radius: "250 miles",
    lastScan: "5 minutes ago",
    status: "Monitoring"
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
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border mb-8 rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-headline-md font-headline-md text-on-surface", children: "Today’s Best Opportunity" }),
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
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-6 py-3 text-body-md font-body-md text-on-primary hover:opacity-90 transition-opacity", children: "Review Opportunity" }),
            /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface hover:border-primary/40 transition-colors", children: "Save Vehicle" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl bg-surface-container p-6 md:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "“Your latest AI search results will appear here.”" })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-2 text-headline-md font-headline-md text-on-surface", children: "My Active Searches" }),
            /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Vehicles currently being monitored by Trade in Cars Agent." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: activeSearches.map((search) => /* @__PURE__ */ jsxs("article", { className: "dashboard-border rounded-2xl bg-surface-container-high p-6 shadow-[0_18px_45px_rgba(3,8,20,0.28)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Vehicle Search" }),
                /* @__PURE__ */ jsx("h3", { className: "text-headline-sm font-headline-md text-on-surface", children: search.vehicle })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: search.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Maximum Budget" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.budget })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Search Radius" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.radius })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Last Scan" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.lastScan })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status" }),
                /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface", children: search.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40", children: "Pause" }),
              /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40", children: "Edit" }),
              /* @__PURE__ */ jsx("button", { className: "rounded-lg bg-primary px-4 py-2 text-body-md font-body-md text-on-primary transition-opacity hover:opacity-90", children: "Run Search Now" }),
              /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-body-md font-body-md text-on-surface transition-colors hover:border-primary/40", children: "Delete" })
            ] })
          ] }, search.vehicle)) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
