import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { P as PlatformShell } from "./PlatformShell-skJDeqy2.js";
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
function ToggleSwitch({
  checked,
  onChange,
  id,
  disabled
}) {
  return /* @__PURE__ */ jsx("button", { type: "button", role: "switch", id, "aria-checked": checked, disabled, onClick: () => onChange(!checked), className: `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${disabled ? "cursor-not-allowed opacity-40" : checked ? "bg-primary" : "bg-surface-container-high"}`, children: /* @__PURE__ */ jsx("span", { className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"}` }) });
}
function SettingsPage() {
  const [channelPrefs, setChannelPrefs] = useState({
    email: true,
    push: false,
    sms: false
  });
  const [eventPrefs, setEventPrefs] = useState({
    bestBuy: true,
    opportunityScore: true,
    estimatedProfit: false,
    priceReduction: true,
    vehicleHistory: true
  });
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
    label: "Notification Preferences",
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
  }], children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-8 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Settings" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-on-surface", children: "Notification Preferences" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Control how and when Trade In Cars Agent alerts you to new opportunities. All notifications are currently in placeholder mode — no messages will be sent until connected." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4", children: [
      /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-lg", "aria-hidden": "true", children: "🔔" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-on-surface", children: "Preparing for Intelligent Notifications" }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-on-surface-variant", children: "Your preferences will be saved and applied when notification services are connected. Push and SMS channels are coming in a future release." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-title-md font-title-md text-on-surface", children: "Notification Channels" }),
      /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm text-on-surface-variant", children: "Choose how you want to receive alerts." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: CHANNELS.map((channel) => {
        const isDisabled = channel.id !== "email";
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `channel-${channel.id}`, className: `text-sm font-semibold ${isDisabled ? "text-on-surface-variant/60" : "text-on-surface"} cursor-pointer`, children: channel.label }),
              channel.badge && /* @__PURE__ */ jsx("span", { className: "rounded-full border border-outline-variant/30 bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant/50", children: channel.badge })
            ] }),
            /* @__PURE__ */ jsx("p", { className: `mt-0.5 text-xs ${isDisabled ? "text-on-surface-variant/40" : "text-on-surface-variant"}`, children: channel.description })
          ] }),
          /* @__PURE__ */ jsx(ToggleSwitch, { id: `channel-${channel.id}`, checked: channelPrefs[channel.id], onChange: (v) => handleChannelChange(channel.id, v), disabled: isDisabled })
        ] }, channel.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-title-md font-title-md text-on-surface", children: "Notify Me When…" }),
      /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm text-on-surface-variant", children: "Select the events that should trigger a notification." }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: EVENTS.map((event) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `event-${event.id}`, className: "text-sm font-semibold text-on-surface cursor-pointer", children: event.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-on-surface-variant", children: event.description })
        ] }),
        /* @__PURE__ */ jsx(ToggleSwitch, { id: `event-${event.id}`, checked: eventPrefs[event.id], onChange: (v) => handleEventChange(event.id, v) })
      ] }, event.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 pb-4", children: [
      saved ? /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm text-on-surface-variant", children: [
        /* @__PURE__ */ jsx("span", { className: "text-base", "aria-hidden": "true", children: "✅" }),
        "Preferences saved (placeholder — no messages will be sent yet)."
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant/50", children: "Unsaved changes" }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleSave, className: "rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", children: "Save Preferences" })
    ] })
  ] }) });
}
export {
  SettingsPage as component
};
