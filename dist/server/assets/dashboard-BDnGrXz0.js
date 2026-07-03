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
  const recentOpportunities = [{
    vehicle: "BMW M3 Competition",
    year: "2022",
    askingPrice: "£31,995",
    estimatedProfit: "£4,200",
    distance: "42 miles",
    source: "Auto Trader",
    confidence: 97,
    status: "New Today"
  }, {
    vehicle: "Mercedes E220 AMG Line",
    year: "2021",
    askingPrice: "£18,995",
    estimatedProfit: "£2,100",
    distance: "18 miles",
    source: "Dealer Network",
    confidence: 93,
    status: "Price Reduced"
  }, {
    vehicle: "Ford Ranger Wildtrak",
    year: "2023",
    askingPrice: "£23,995",
    estimatedProfit: "£3,600",
    distance: "65 miles",
    source: "Facebook Marketplace",
    confidence: 95,
    status: "New Listing"
  }, {
    vehicle: "VW Golf R",
    year: "2022",
    askingPrice: "£29,750",
    estimatedProfit: "£2,900",
    distance: "32 miles",
    source: "Motorway",
    confidence: 91,
    status: "Watch"
  }, {
    vehicle: "Harley-Davidson Fat Boy",
    year: "2020",
    askingPrice: "£12,995",
    estimatedProfit: "£1,800",
    distance: "55 miles",
    source: "Dealer Stock",
    confidence: 90,
    status: "New Today"
  }];
  const getConfidenceBadgeClasses = (confidence) => {
    if (confidence >= 95) {
      return "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30";
    }
    if (confidence >= 90) {
      return "bg-blue-500/15 text-blue-700 ring-blue-500/30";
    }
    return "bg-amber-500/20 text-amber-800 ring-amber-500/30";
  };
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
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-headline-md font-headline-md text-on-surface", children: "Recent Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-body-md font-body-md text-on-surface-variant", children: "New vehicles matching your saved searches." }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-separate border-spacing-0", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: [
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Vehicle" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Year" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Asking Price" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Estimated Profit" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Distance" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Source" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Confidence" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "border-b border-outline-variant/25 px-4 py-3", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: recentOpportunities.map((opportunity) => /* @__PURE__ */ jsxs("tr", { className: "text-body-md font-body-md text-on-surface", children: [
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: opportunity.vehicle }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: opportunity.year }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: opportunity.askingPrice }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: opportunity.estimatedProfit }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: opportunity.distance }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: opportunity.source }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex rounded-full px-2.5 py-1 text-label-caps font-label-caps tracking-wide ring-1 ${getConfidenceBadgeClasses(opportunity.confidence)}`, children: [
                opportunity.confidence,
                "%"
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4 text-on-surface-variant", children: opportunity.status }),
              /* @__PURE__ */ jsx("td", { className: "border-b border-outline-variant/15 px-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx("button", { className: "rounded-md bg-primary px-3 py-1.5 text-label-caps font-label-caps text-on-primary hover:opacity-90 transition-opacity", children: "Review" }),
                /* @__PURE__ */ jsx("button", { className: "rounded-md border border-outline-variant/40 bg-surface-container-high px-3 py-1.5 text-label-caps font-label-caps text-on-surface hover:border-primary/40 transition-colors", children: "Save" }),
                /* @__PURE__ */ jsx("button", { className: "rounded-md border border-outline-variant/40 bg-surface-container-high px-3 py-1.5 text-label-caps font-label-caps text-on-surface-variant hover:border-primary/40 transition-colors", children: "Ignore" })
              ] }) })
            ] }, opportunity.vehicle)) })
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
