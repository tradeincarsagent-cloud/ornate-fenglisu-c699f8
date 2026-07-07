import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  return /* @__PURE__ */ jsxs("div", { className: "platform-shell bg-background text-on-surface", children: [
    sidebarOpen ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden",
          onClick: () => setSidebarOpen(false),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxs(
        "aside",
        {
          id: "mobile-sidebar",
          className: "platform-shell-drawer fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-outline-variant/25 bg-surface-container-low px-6 lg:hidden",
          "aria-label": "Navigation menu",
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
      )
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "platform-shell-layout mx-auto flex w-full max-w-container-max lg:min-h-screen", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-outline-variant/25 bg-surface-container-low px-6 py-8 lg:flex lg:flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }) }),
        /* @__PURE__ */ jsx(PlatformNav, { items: navItems })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
        /* @__PURE__ */ jsxs("header", { className: "platform-shell-header border-b border-outline-variant/25 bg-surface-container px-6 py-4 md:px-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center lg:hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto logo-bezel w-44 rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { src: LOGO_SRC, alt: "Trade In Cars Agent Logo", className: "h-auto w-full object-contain logo-blend" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSidebarOpen(true),
                className: "absolute right-0 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container-high",
                "aria-label": "Open navigation menu",
                "aria-expanded": sidebarOpen,
                "aria-controls": "mobile-sidebar",
                children: /* @__PURE__ */ jsx(HamburgerIcon, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "hidden text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant lg:block", children: "Trade In Cars Agent" })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "platform-shell-main flex-1 overflow-x-clip px-6 py-8 md:px-10", children }),
        /* @__PURE__ */ jsx("footer", { className: "platform-shell-footer border-t border-outline-variant/25 bg-surface-container-low px-6 py-4 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full max-w-container-max flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface", children: "Trade in Cars Agent" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-on-surface-variant", children: "Version 1.0 Beta" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-on-surface-variant", children: [
              "System Status: ",
              /* @__PURE__ */ jsx("span", { className: "text-on-surface", children: "🟢 Operational" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { "aria-label": "Application footer links", className: "flex flex-wrap items-center justify-center gap-y-1 text-xs text-on-surface-variant sm:justify-end", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "whitespace-nowrap px-2 py-1 transition-colors hover:text-primary", children: "Support" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-outline-variant/50", children: "•" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "whitespace-nowrap px-2 py-1 transition-colors hover:text-primary", children: "Privacy" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-outline-variant/50", children: "•" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "whitespace-nowrap px-2 py-1 transition-colors hover:text-primary", children: "Terms" }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "text-outline-variant/50", children: "•" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "whitespace-nowrap px-2 py-1 transition-colors hover:text-primary", children: "Contact" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
const TICA_SHIELD_SRC = "https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f";
function TicaShield() {
  const [open, setOpen] = useState(false);
  const [popupPos, setPopupPos] = useState(null);
  const containerRef = useRef(null);
  const updatePopupPos = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPopupPos({
      top: rect.bottom + 8,
      // right offset from viewport right edge
      right: window.innerWidth - rect.right
    });
  };
  const handleOpen = () => {
    updatePopupPos();
    setOpen(true);
  };
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative -mr-[44px] flex-shrink-0",
      onMouseEnter: handleOpen,
      onMouseLeave: () => setOpen(false),
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-label": "TICA Certified trust mark",
            "aria-expanded": open,
            onClick: () => {
              if (!open) {
                handleOpen();
              } else {
                setOpen(false);
              }
            },
            className: "flex flex-col items-center gap-1.5 rounded-xl p-1 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: TICA_SHIELD_SRC,
                  alt: "TICA Certified shield",
                  className: "h-auto w-14 sm:w-[4.5rem] md:w-24",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-0.5", children: /* @__PURE__ */ jsx("span", { className: "text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/80", children: "TICA Certified™" }) })
            ]
          }
        ),
        popupPos && /* @__PURE__ */ jsx(
          "div",
          {
            role: "tooltip",
            "aria-hidden": !open,
            style: { top: popupPos.top, right: popupPos.right },
            className: [
              "tica-popup",
              "fixed z-[9999] w-96",
              "rounded-3xl border border-white/10",
              "bg-zinc-900/90 backdrop-blur-xl",
              "shadow-[0_20px_64px_rgba(0,0,0,0.75)]",
              "p-8",
              open ? "tica-popup--visible" : "tica-popup--hidden"
            ].join(" "),
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6 text-center", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: TICA_SHIELD_SRC,
                  alt: "TICA Certified shield",
                  className: "h-auto w-44",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-base font-bold tracking-wide text-white", children: "🛡 TICA Certified™" }),
                /* @__PURE__ */ jsx("p", { className: "text-[12px] text-zinc-400 leading-snug", children: "Powered by the TICA Decision Engine" }),
                /* @__PURE__ */ jsx("p", { className: "text-[12px] font-semibold text-primary/90 tracking-wide", children: "Recommends. You Decide." })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-zinc-400 leading-relaxed", children: "Every TICA Certified recommendation has been analysed using the TICA Opportunity Intelligence Engine and TICA Decision Engine to help dealers make informed buying decisions." }),
              /* @__PURE__ */ jsx("div", { className: "w-full rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80", children: "Official Trust Mark · Trade in Cars Agent" }) })
            ] })
          }
        )
      ]
    }
  );
}
export {
  PlatformShell as P,
  TicaShield as T
};
