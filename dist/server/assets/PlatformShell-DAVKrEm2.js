import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
const LOGO_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS";
function HamburgerIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
    /* @__PURE__ */ jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
    /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
  ] });
}
function CloseIcon() {
  return /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ] });
}
function PlatformNav({ items, onNavigate }) {
  return /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: items.map((item, index) => {
    if (item.isSectionLabel) {
      return /* @__PURE__ */ jsx(
        "p",
        {
          className: "mt-4 mb-1 px-1 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant/50",
          children: item.label
        },
        `section-${index}`
      );
    }
    if (item.disabled) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center justify-between rounded-lg border border-transparent px-4 py-3 text-body-md font-body-md text-on-surface-variant/40 cursor-not-allowed select-none",
          "aria-disabled": "true",
          children: [
            /* @__PURE__ */ jsx("span", { children: item.label }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant/50", children: "Coming Soon" })
          ]
        },
        item.href ?? item.label
      );
    }
    if (item.active) {
      return /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-body-md font-body-md text-primary", children: item.label }, item.href);
    }
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: item.href,
        onClick: onNavigate,
        className: "block rounded-lg border border-transparent px-4 py-3 text-body-md font-body-md text-on-surface-variant transition-colors hover:border-primary/20 hover:bg-surface-container-high hover:text-on-surface",
        children: item.label
      },
      item.href
    );
  }) });
}
function PlatformShell({ children, navItems }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-on-surface", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`,
        onClick: () => setSidebarOpen(false),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        id: "mobile-sidebar",
        className: `fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
        "aria-label": "Navigation menu",
        "aria-hidden": !sidebarOpen,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Menu" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSidebarOpen(false),
                className: "flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high",
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsx(CloseIcon, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }) }),
          /* @__PURE__ */ jsx(PlatformNav, { items: navItems, onNavigate: () => setSidebarOpen(false) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen max-w-container-max", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }) }),
        /* @__PURE__ */ jsx(PlatformNav, { items: navItems })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [
        /* @__PURE__ */ jsxs("header", { className: "border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between lg:hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "logo-bezel w-44 rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSidebarOpen(true),
                className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container-high",
                "aria-label": "Open navigation menu",
                "aria-expanded": sidebarOpen,
                "aria-controls": "mobile-sidebar",
                children: /* @__PURE__ */ jsx(HamburgerIcon, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "hidden text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant lg:block", children: "Trade In Cars Agent" })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "flex-1 px-6 py-8 md:px-10", children }),
        /* @__PURE__ */ jsx("footer", { className: "border-t border-outline-variant/25 bg-surface-container-low px-6 py-4 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full max-w-container-max flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface", children: "Trade in Cars Agent" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-on-surface-variant", children: "Version 1.0 Beta" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-on-surface-variant", children: [
              "System Status: ",
              /* @__PURE__ */ jsx("span", { className: "text-on-surface", children: "🟢 Operational" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { "aria-label": "Application footer links", className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "Support" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "Privacy" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "Terms" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-primary", children: "Contact" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  PlatformShell as P
};
