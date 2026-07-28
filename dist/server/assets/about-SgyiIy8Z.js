import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function AboutPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Company" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg", children: "About Trade in Cars Agent (TICA)" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "BUILT TO CHANGE THE WAY DEALERS BUY VEHICLES" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Trade in Cars Agent (TICA) is an AI-powered vehicle sourcing platform built exclusively for independent vehicle dealers." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Our mission is simple." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Help dealers spend less time searching, reduce buying risk, and uncover more profitable opportunities through intelligent automation." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Rather than replacing the dealer, TICA works alongside them as a 24-hour AI buying assistant, continuously analysing markets, identifying opportunities, monitoring pricing, and learning how every dealership prefers to buy vehicles." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "We believe the future of vehicle sourcing is not more searching." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "It is better intelligence." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-headline-md text-headline-md", children: "OUR VISION" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "To become the world's most trusted AI operating system for independent vehicle dealers." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Every recommendation made by TICA is designed to save time, improve buying decisions, increase profitability, and give dealers a genuine competitive advantage in an increasingly fast-moving market." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "This is only the beginning." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "As TICA continues to evolve, new AI capabilities, intelligent sourcing tools, Trade Outs™, dealer collaboration features and marketplace integrations will continue to transform the way dealerships discover, evaluate and purchase vehicles." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "THE FUTURE DOESN'T SEARCH." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "IT FINDS." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "font-body-md text-body-md text-primary hover:opacity-85 transition-all", to: "/", children: "← Back to Home" }) })
  ] }) });
}
export {
  AboutPage as component
};
