import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-CotHvtbv.js";
import "@tanstack/react-router";
const CHANNELS = [{
  id: "email",
  label: "Email Notifications",
  description: "Receive alerts to your registered email address."
}, {
  id: "push",
  label: "Push Notifications",
  description: "Browser and mobile push alerts.",
  badge: "Placeholder"
}, {
  id: "sms",
  label: "SMS Notifications",
  description: "Text message alerts to your phone.",
  badge: "Placeholder"
}];
const EVENTS = [{
  id: "bestBuy",
  label: "New Today's Best Buy is found",
  description: "Get notified when TICA identifies a new Best Buy opportunity."
}, {
  id: "opportunityScore",
  label: "Opportunity Score exceeds chosen threshold",
  description: "Alert when any vehicle opportunity score surpasses your set threshold."
}, {
  id: "estimatedProfit",
  label: "Estimated Profit exceeds chosen threshold",
  description: "Alert when estimated gross profit on a vehicle exceeds your set threshold."
}, {
  id: "priceReduction",
  label: "Price reduction detected",
  description: "Notify when a price drop is detected on a tracked or matching vehicle."
}, {
  id: "vehicleHistory",
  label: "Vehicle History issue detected",
  description: "Alert when a vehicle history check surfaces a flag or concern."
}];
const PRIORITY_OPTIONS = [{
  id: "highPriority",
  label: "🟢 High Priority"
}, {
  id: "dailySummary",
  label: "🟡 Daily Summary"
}, {
  id: "off",
  label: "🔴 Off"
}];
const DEALER_PROFILE_FIELDS = [{
  key: "businessName",
  label: "Business Name",
  placeholder: "e.g. Trade Motors UK"
}, {
  key: "country",
  label: "Country",
  placeholder: "e.g. United Kingdom"
}, {
  key: "preferredCurrency",
  label: "Preferred Currency",
  placeholder: "e.g. GBP"
}, {
  key: "buyingExperience",
  label: "Buying Experience",
  placeholder: "e.g. 12 years in used vehicles"
}, {
  key: "currentStockCapacity",
  label: "Current Stock Capacity",
  placeholder: "e.g. 85",
  type: "number"
}];
const BUYING_STYLE_OPTIONS = [{
  id: "aggressiveBuyer",
  label: "Aggressive Buyer",
  description: "Moves quickly on high-potential stock to win more buying opportunities."
}, {
  id: "balancedBuyer",
  label: "Balanced Buyer",
  description: "Balances speed, margin, and risk for steady buying decisions.",
  badge: "Recommended"
}, {
  id: "conservativeBuyer",
  label: "Conservative Buyer",
  description: "Focuses on lower-risk vehicles with stronger margin protection."
}];
const LEARNING_ITEMS = ["Buying Style", "Preferred Vehicle Types", "Average Buying Budget", "Preferred Profit Margin", "Buying Locations", "Seasonal Buying Trends"];
const LEARNING_PROGRESS = 82;
function BottomSheet({
  value,
  onChange,
  onClose
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);
  function dismiss() {
    setVisible(false);
    setTimeout(onClose, 270);
  }
  function handleSelect(v) {
    onChange(v);
    setVisible(false);
    setTimeout(onClose, 270);
  }
  return /* @__PURE__ */ jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": "Select notification level", className: `settings-sheet-overlay sm:hidden ${visible ? "settings-sheet-overlay--visible" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/45 backdrop-blur-[2px]", onClick: dismiss, "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: `settings-sheet-panel ${visible ? "settings-sheet-panel--visible" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-3 h-1 w-9 rounded-full bg-outline-variant/40", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("p", { className: "px-6 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/70", children: "Notification Level" }),
      /* @__PURE__ */ jsx("div", { className: "settings-sheet-scroll", role: "listbox", "aria-label": "Notification level options", children: PRIORITY_OPTIONS.map((option) => /* @__PURE__ */ jsxs("button", { type: "button", role: "option", "aria-selected": value === option.id, onClick: () => handleSelect(option.id), className: `flex min-h-[60px] w-full items-center gap-3 px-6 py-4 text-left text-[15px] transition-colors active:bg-white/5 ${value === option.id ? "font-semibold text-primary" : "font-normal text-on-surface"}`, children: [
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: option.label }),
        value === option.id && /* @__PURE__ */ jsx("span", { className: "text-[18px] text-primary", "aria-hidden": "true", children: "✓" })
      ] }, option.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mx-6 my-3 h-px bg-outline-variant/30", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: dismiss, className: "flex min-h-[56px] w-full items-center justify-center text-[15px] font-semibold text-on-surface-variant active:bg-white/5", children: "Cancel" })
    ] })
  ] });
}
function PrioritySelector({
  value,
  onChange,
  id,
  disabled
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const currentOption = PRIORITY_OPTIONS.find((o) => o.id === value);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { id, type: "button", disabled, onClick: () => !disabled && setSheetOpen(true), "aria-haspopup": "dialog", "aria-expanded": sheetOpen, className: `flex min-h-[44px] w-full items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-2.5 text-sm font-medium text-on-surface transition-colors active:bg-surface-container-high focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`, children: [
      /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: currentOption.label }),
      /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", className: "h-4 w-4 shrink-0 text-on-surface-variant", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { role: "radiogroup", "aria-disabled": disabled, className: `hidden w-full max-w-[18rem] grid-cols-3 gap-1 rounded-xl border border-outline-variant/30 bg-surface-container p-1 sm:grid ${disabled ? "opacity-50" : ""}`, children: PRIORITY_OPTIONS.map((option) => {
      const selected = value === option.id;
      return /* @__PURE__ */ jsx("button", { type: "button", role: "radio", "aria-checked": selected, disabled, onClick: () => onChange(option.id), className: `min-h-10 rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${option.id === "off" ? selected ? "bg-red-500/15 text-red-700" : "text-red-600 hover:bg-red-500/10 hover:text-red-700" : selected ? "bg-primary/15 text-on-surface" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`, children: option.label }, option.id);
    }) }),
    sheetOpen && /* @__PURE__ */ jsx(BottomSheet, { value, onChange, onClose: () => setSheetOpen(false) })
  ] });
}
function SettingsPage() {
  const [channelPrefs, setChannelPrefs] = useState({
    email: "highPriority",
    push: "dailySummary",
    sms: "off"
  });
  const [eventPrefs, setEventPrefs] = useState({
    bestBuy: "highPriority",
    opportunityScore: "dailySummary",
    estimatedProfit: "dailySummary",
    priceReduction: "highPriority",
    vehicleHistory: "off"
  });
  const [dealerProfile, setDealerProfile] = useState({
    businessName: "",
    country: "",
    preferredCurrency: "",
    buyingExperience: "",
    currentStockCapacity: ""
  });
  const [buyingStyle, setBuyingStyle] = useState("balancedBuyer");
  const [profileReviewRequested, setProfileReviewRequested] = useState(false);
  const [saved, setSaved] = useState(false);
  function handleChannelChange(id, value) {
    setChannelPrefs((prev) => ({
      ...prev,
      [id]: value
    }));
    setSaved(false);
  }
  function handleEventChange(id, value) {
    setEventPrefs((prev) => ({
      ...prev,
      [id]: value
    }));
    setSaved(false);
  }
  function handleDealerProfileChange(id, value) {
    setDealerProfile((prev) => ({
      ...prev,
      [id]: value
    }));
    setSaved(false);
  }
  function handleBuyingStyleChange(value) {
    setBuyingStyle(value);
    setSaved(false);
  }
  function handleSave() {
    setSaved(true);
  }
  return /* @__PURE__ */ jsx(PlatformShell, { navItems: [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Builder",
    href: "/search-builder"
  }, {
    label: "AI Buying Report",
    href: "/opportunity"
  }, {
    label: "Settings",
    isSectionLabel: true
  }, {
    label: "TICA Preferences",
    href: "/settings",
    active: true
  }, {
    label: "Future Features",
    isSectionLabel: true
  }, {
    label: "Vehicle History & MOT",
    disabled: true
  }, {
    label: "Watchlist",
    disabled: true
  }, {
    label: "Subscription",
    disabled: true
  }], children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Settings" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "min-w-0 flex-1 text-headline-lg font-headline-lg text-on-surface", children: "TICA Preferences" }),
        /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx(TicaShield, {}) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Teach TICA how you like to buy vehicles." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4", children: [
      /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-lg", "aria-hidden": "true", children: "🧠" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-on-surface", children: "Teach mode is active" }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-on-surface-variant", children: "These controls are placeholders for now. Use them to define how TICA should prioritize opportunities and where to focus your buying strategy." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-title-md font-title-md text-on-surface", children: "Notification Channels" }),
      /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm text-on-surface-variant", children: "Tell TICA the urgency level for each channel." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: CHANNELS.map((channel) => {
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `channel-${channel.id}`, className: "cursor-pointer text-sm font-semibold text-on-surface [text-wrap:balance]", children: channel.label }),
              channel.badge && /* @__PURE__ */ jsx("span", { className: "rounded-full border border-outline-variant/30 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant/50", children: channel.badge })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-on-surface-variant", children: channel.description })
          ] }),
          /* @__PURE__ */ jsx(PrioritySelector, { id: `channel-${channel.id}`, value: channelPrefs[channel.id], onChange: (v) => handleChannelChange(channel.id, v) })
        ] }, channel.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-title-md font-title-md text-on-surface", children: "Opportunity Notification Rules" }),
      /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm text-on-surface-variant", children: "Set how urgently TICA should surface each signal." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: EVENTS.map((event) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `event-${event.id}`, className: "text-sm font-semibold text-on-surface cursor-pointer [text-wrap:balance]", children: event.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-on-surface-variant", children: event.description })
        ] }),
        /* @__PURE__ */ jsx(PrioritySelector, { id: `event-${event.id}`, value: eventPrefs[event.id], onChange: (v) => handleEventChange(event.id, v) })
      ] }, event.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "rounded-2xl border border-dashed border-primary/30 bg-surface-container-low p-5 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 rounded-2xl border border-outline-variant/25 bg-surface-container-high/40 p-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-title-md font-title-md text-on-surface", children: "Future Email Notifications" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-on-surface-variant", children: "Placeholder only — reserve this header space for notification emails." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-sm rounded-2xl border border-outline-variant/25 bg-surface-container px-4 py-5", children: [
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-primary/35 bg-primary/5 px-4 py-4 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary", children: "TICA shield reserved here" }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-label-caps font-label-caps uppercase tracking-[0.18em] text-on-surface-variant", children: "Today's Best Buy" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-title-md font-title-md text-on-surface", children: "Dealer Profile" }),
      /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm text-on-surface-variant", children: "Placeholder fields to begin teaching TICA how your dealership buys vehicles." }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: DEALER_PROFILE_FIELDS.map((field) => /* @__PURE__ */ jsxs("label", { className: "space-y-2 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-on-surface", children: field.label }),
        /* @__PURE__ */ jsx("input", { type: field.type ?? "text", value: dealerProfile[field.key], placeholder: field.placeholder, onChange: (event) => handleDealerProfileChange(field.key, event.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary/60 focus:outline-none" })
      ] }, field.key)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-title-md font-title-md text-on-surface", children: "Buying Style" }),
      /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm text-on-surface-variant", children: "Choose one premium placeholder profile so TICA can learn your preferred buying posture." }),
      /* @__PURE__ */ jsx("div", { role: "radiogroup", "aria-label": "Buying Style", className: "grid gap-4 md:grid-cols-3", children: BUYING_STYLE_OPTIONS.map((option) => {
        const selected = buyingStyle === option.id;
        return /* @__PURE__ */ jsxs("button", { type: "button", role: "radio", "aria-checked": selected, onClick: () => handleBuyingStyleChange(option.id), className: `min-h-40 rounded-2xl border p-5 text-left shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? "border-primary/50 bg-linear-to-br from-primary/10 via-surface-container-high to-surface-container shadow-[0_12px_32px_rgba(0,0,0,0.08)]" : "border-outline-variant/25 bg-linear-to-br from-surface-container-high/80 to-surface-container hover:border-outline-variant/40 hover:bg-surface-container-high"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-on-surface", children: option.label }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-5 text-on-surface-variant", children: option.description })
            ] }),
            option.badge && /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary", children: option.badge })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: selected ? "Selected buying posture" : "Tap to select" }),
            /* @__PURE__ */ jsx("span", { className: `font-semibold ${selected ? "text-primary" : "text-on-surface-variant"}`, children: selected ? "Active" : "Inactive" })
          ] })
        ] }, option.id);
      }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-primary/15 bg-linear-to-br from-primary/5 via-surface-container-high/60 to-surface-container p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-title-md font-title-md text-on-surface", children: "TICA Learning" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-on-surface-variant", children: "Learning Progress" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/15 bg-surface-container px-4 py-3 text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-[0.18em] text-on-surface-variant", children: "Progress" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-semibold text-on-surface", children: [
            LEARNING_PROGRESS,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 h-2.5 w-full overflow-hidden rounded-full bg-surface-container", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary transition-[width]", style: {
        width: `${LEARNING_PROGRESS}%`
      }, "aria-label": "Learning Progress", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": LEARNING_PROGRESS }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 space-y-3", children: LEARNING_ITEMS.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-outline-variant/25 bg-surface-container-high/50 px-4 py-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary", children: "✓" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-on-surface", children: item })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-on-surface-variant", children: "Placeholder" })
      ] }, item)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setProfileReviewRequested(true), className: "min-h-11 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", children: "Review My Buying Profile" }),
        profileReviewRequested && /* @__PURE__ */ jsx("p", { className: "text-xs text-on-surface-variant", children: "Placeholder only — no backend actions yet." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-stretch justify-between gap-3 pb-2 sm:flex-row sm:items-center sm:gap-4 sm:pb-4", children: [
      saved ? /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm text-on-surface-variant", children: [
        /* @__PURE__ */ jsx("span", { className: "text-base", "aria-hidden": "true", children: "✅" }),
        "Preferences captured (placeholder only — no backend actions yet)."
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant/50", children: "Unsaved changes" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleSave, className: "min-h-11 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", children: "Save Preferences" })
    ] })
  ] }) });
}
export {
  SettingsPage as component
};
