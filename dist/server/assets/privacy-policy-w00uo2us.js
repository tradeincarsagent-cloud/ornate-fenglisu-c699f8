import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function PrivacyPolicyPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Legal" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Last updated: July 2026" })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "space-y-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "This Privacy Policy placeholder explains the structure of how Trade in Cars Agent (TICA) intends to collect, use, and safeguard personal data." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "We plan to provide complete details about data categories, processing purposes, lawful bases, retention timelines, and user rights before full production launch." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Final legal wording will be reviewed and published in this location. Continued use after publication will be subject to the updated policy." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "font-body-md text-body-md text-primary hover:opacity-85 transition-all", to: "/", children: "← Back to Home" }) })
  ] }) });
}
export {
  PrivacyPolicyPage as component
};
