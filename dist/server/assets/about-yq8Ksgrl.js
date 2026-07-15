import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function AboutPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Company" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg", children: "About Trade in Cars Agent (TICA)" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "TICA is built for modern vehicle dealers who need faster, smarter sourcing decisions. This page is a launch placeholder and will be replaced with final company information." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-headline-md text-headline-md", children: "What to expect" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "We are preparing a full company profile including our mission, leadership background, roadmap, and partner network." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "For now, please use the Contact and Support pages for any immediate questions while this content is finalized." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "font-body-md text-body-md text-primary hover:opacity-85 transition-all", to: "/", children: "← Back to Home" }) })
  ] }) });
}
export {
  AboutPage as component
};
