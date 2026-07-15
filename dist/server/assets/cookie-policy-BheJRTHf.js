import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function CookiePolicyPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Legal" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg", children: "Cookie Policy" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Last updated: July 2026" })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "space-y-5 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "This Cookie Policy placeholder outlines how cookies and similar technologies may be used on Trade in Cars Agent (TICA) web properties." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "The final policy will document cookie categories, purposes, storage durations, and user choices for consent and preference management." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Updated legal language and controls will be published here before the final release process is completed." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "font-body-md text-body-md text-primary hover:opacity-85 transition-all", to: "/", children: "← Back to Home" }) })
  ] }) });
}
export {
  CookiePolicyPage as component
};
