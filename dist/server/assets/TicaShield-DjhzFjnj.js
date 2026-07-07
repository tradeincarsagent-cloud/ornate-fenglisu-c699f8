import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
const TICA_SHIELD_SRC = "https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f";
function TicaShield() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
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
      className: "relative flex-shrink-0",
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-label": "TICA Trusted Buying AI trust mark",
            "aria-expanded": open,
            onClick: () => setOpen((v) => !v),
            className: "flex flex-col items-center gap-1.5 rounded-xl p-1 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: TICA_SHIELD_SRC,
                  alt: "TICA Trusted Buying AI shield",
                  className: "h-auto w-12 sm:w-16 md:w-20",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-center text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant/70", children: "Trusted AI" })
            ]
          }
        ),
        open ? /* @__PURE__ */ jsx(
          "div",
          {
            role: "tooltip",
            className: "absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-zinc-900/90 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md",
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: TICA_SHIELD_SRC,
                  alt: "TICA Trusted Buying AI shield",
                  className: "h-auto w-28",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold tracking-wide text-white", children: "TICA Trusted Buying AI" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-xs text-zinc-400", children: "Recommends. You Decide." })
              ] })
            ] })
          }
        ) : null
      ]
    }
  );
}
export {
  TicaShield as T
};
