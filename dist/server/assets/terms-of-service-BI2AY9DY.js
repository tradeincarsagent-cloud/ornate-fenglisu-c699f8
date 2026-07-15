import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function TermsOfServicePage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Legal" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg", children: "Terms of Service" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Last updated: July 2026" })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "space-y-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "These Terms of Service placeholder terms define the expected contractual framework for access to the Trade in Cars Agent (TICA) platform." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "The final version will include account obligations, acceptable use, service limitations, intellectual property provisions, and liability terms." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "This placeholder will be replaced with approved legal text prior to final launch and commercial rollout." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "font-body-md text-body-md text-primary hover:opacity-85 transition-all", to: "/", children: "← Back to Home" }) })
  ] }) });
}
export {
  TermsOfServicePage as component
};
