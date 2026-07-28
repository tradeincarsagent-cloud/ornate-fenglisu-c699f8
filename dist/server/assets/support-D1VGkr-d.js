import { jsx, jsxs } from "react/jsx-runtime";
import { P as PublicInfoCloseButton } from "./PublicInfoCloseButton-CUcRyI6Q.js";
import "@tanstack/react-router";
function SupportPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-surface text-on-surface", children: /* @__PURE__ */ jsxs("section", { className: "relative mx-auto flex w-full max-w-4xl flex-col gap-8 px-margin-mobile py-14 md:px-margin-desktop md:py-20", children: [
    /* @__PURE__ */ jsx(PublicInfoCloseButton, {}),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps uppercase tracking-widest text-primary", children: "Company" }),
      /* @__PURE__ */ jsx("h1", { className: "font-headline-lg text-headline-lg md:text-display-lg text-primary", children: "Support" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-headline-md text-headline-md text-primary", children: "Need Assistance?" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Email: tradeincarsagent@gmail.com" }),
      /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Include your dealership name and a brief issue summary so we can route your request quickly." })
    ] })
  ] }) });
}
export {
  SupportPage as component
};
