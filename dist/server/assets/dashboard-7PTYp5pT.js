import { jsxs, jsx } from "react/jsx-runtime";
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
  const radarStats = [{
    label: "Status",
    value: "Searching"
  }, {
    label: "Sources Checked Today",
    value: "12,487"
  }, {
    label: "Matches Found",
    value: "27"
  }, {
    label: "High Priority",
    value: "3"
  }, {
    label: "Last Scan",
    value: "12 seconds ago"
  }];
  const radarBlips = [{
    top: "18%",
    left: "64%",
    delay: "0s",
    size: "12px"
  }, {
    top: "31%",
    left: "28%",
    delay: "1.1s",
    size: "10px"
  }, {
    top: "49%",
    left: "72%",
    delay: "2.1s",
    size: "8px"
  }, {
    top: "62%",
    left: "38%",
    delay: "1.7s",
    size: "14px"
  }, {
    top: "74%",
    left: "58%",
    delay: "0.8s",
    size: "10px"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-on-surface", children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes radar-pulse {
          0%, 100% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(0.88);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes radar-value {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-container-max", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-primary", children: "Trade in Cars Agent" }),
        /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary", children: "Dealer Command Centre" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [
        /* @__PURE__ */ jsx("header", { className: "border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Trade in Cars Agent" }) }),
        /* @__PURE__ */ jsxs("main", { className: "flex-1 px-6 py-8 md:px-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-primary", children: "Dealer Command Centre" }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-headline-md font-headline-md text-on-surface", children: "Good Morning, Jonathan" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start", children: [
            /* @__PURE__ */ jsxs("section", { children: [
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
            /* @__PURE__ */ jsxs("aside", { className: "dashboard-border rounded-[28px] border border-emerald-400/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(5,12,24,0.98)_100%)] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative h-[280px] w-[280px] rounded-full border border-emerald-300/12 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14)_0%,rgba(10,18,28,0.94)_52%,rgba(2,6,23,1)_100%)] shadow-[inset_0_0_50px_rgba(16,185,129,0.08),0_0_50px_rgba(0,0,0,0.35)]", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-[18px] rounded-full border border-emerald-300/10" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-[56px] rounded-full border border-emerald-300/8" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-[94px] rounded-full border border-emerald-300/6" }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-[18px] h-[244px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-300/12 to-transparent" }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-[18px] top-1/2 h-px w-[244px] -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-300/12 to-transparent" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14)_0%,transparent_32%)]" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-[14px] rounded-full", style: {
                  animation: "radar-spin 9s linear infinite",
                  background: "conic-gradient(from 120deg, rgba(16,185,129,0) 0deg, rgba(16,185,129,0.06) 280deg, rgba(52,211,153,0.12) 320deg, rgba(110,231,183,0.55) 346deg, rgba(167,243,208,0.9) 360deg)",
                  filter: "drop-shadow(0 0 16px rgba(52, 211, 153, 0.3))",
                  maskImage: "radial-gradient(circle at center, transparent 0 18px, black 18px)",
                  WebkitMaskImage: "radial-gradient(circle at center, transparent 0 18px, black 18px)"
                } }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 h-[2px] w-[124px] origin-left rounded-full bg-gradient-to-r from-emerald-200/90 via-emerald-300/45 to-transparent", style: {
                  animation: "radar-spin 9s linear infinite"
                } }),
                radarBlips.map((blip, index) => /* @__PURE__ */ jsx("div", { className: "absolute rounded-full border border-emerald-200/25 bg-emerald-300/85 shadow-[0_0_18px_rgba(52,211,153,0.55)]", style: {
                  top: blip.top,
                  left: blip.left,
                  width: blip.size,
                  height: blip.size,
                  animation: `radar-pulse 2.6s ease-in-out ${blip.delay} infinite`,
                  boxShadow: index === 0 ? "0 0 24px rgba(110, 231, 183, 0.75)" : void 0
                } }, `${blip.top}-${blip.left}`)),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200 shadow-[0_0_18px_rgba(167,243,208,0.65)]" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "AI Opportunity Radar" }) }),
                radarStats.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4 border-b border-white/6 pb-3 last:border-b-0 last:pb-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-[0.24em] text-on-surface-variant", children: item.label }),
                  /* @__PURE__ */ jsx("p", { className: `text-right text-body-lg font-semibold ${item.label === "Status" || item.label === "High Priority" ? "text-emerald-300" : "text-on-surface"}`, style: {
                    animation: "radar-value 2.8s ease-in-out infinite"
                  }, children: item.value })
                ] }, item.label))
              ] })
            ] })
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
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
