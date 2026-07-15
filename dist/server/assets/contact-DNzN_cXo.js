import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function ContactPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Company" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg", children: "Contact" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "This is a launch-ready placeholder contact page. Final contact channels and team profiles will be published soon." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-headline-md text-headline-md", children: "General enquiries" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Email: contact@tradeincarsagent.com" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "We aim to respond within one business day." })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "font-body-md text-body-md text-primary hover:opacity-85 transition-all", to: "/", children: "← Back to Home" }) })
  ] }) });
}
export {
  ContactPage as component
};
