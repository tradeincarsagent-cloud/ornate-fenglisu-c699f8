import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-Dagn24sh.js";
import { b as MISSION_STAGES } from "./mission-C3C9xkMh.js";
import { u as useMissionProgress } from "./useMissionProgress-B2nWtvA6.js";
import "react-dom";
const kpiCards = [{
  label: "Total Dealers",
  value: "142",
  detail: "+8 this month",
  icon: "🏢",
  tone: "default"
}, {
  label: "Active Trials",
  value: "31",
  detail: "12 expire in 7 days",
  icon: "🧪",
  tone: "warning"
}, {
  label: "Active Subscribers",
  value: "94",
  detail: "66% conversion rate",
  icon: "✅",
  tone: "success"
}, {
  label: "Active Search Missions",
  value: "218",
  detail: "Across all dealers",
  icon: "🎯",
  tone: "accent"
}, {
  label: "Opportunities Found Today",
  value: "1,047",
  detail: "↑ 12% vs yesterday",
  icon: "💡",
  tone: "accent"
}, {
  label: "AI Searches Running",
  value: "34",
  detail: "Live right now",
  icon: "⚙️",
  tone: "default"
}, {
  label: "Support Requests",
  value: "7",
  detail: "3 awaiting reply",
  icon: "💬",
  tone: "warning"
}, {
  label: "System Health",
  value: "100%",
  detail: "All systems operational",
  icon: "🟢",
  tone: "success"
}];
const customerRows = [{
  name: "Apex Motors Leeds",
  plan: "Pro",
  status: "Subscriber",
  joined: "14 Jan 2025",
  lastActive: "Today",
  missions: 12
}, {
  name: "Premier Auto Group",
  plan: "Pro",
  status: "Subscriber",
  joined: "02 Feb 2025",
  lastActive: "Today",
  missions: 8
}, {
  name: "Silverstone Prestige",
  plan: "Starter",
  status: "Trial",
  joined: "22 Jul 2025",
  lastActive: "Yesterday",
  missions: 3
}, {
  name: "North Star Cars",
  plan: "Pro",
  status: "Subscriber",
  joined: "09 Mar 2025",
  lastActive: "2 days ago",
  missions: 17
}, {
  name: "City Drive Manchester",
  plan: "Starter",
  status: "Trial",
  joined: "25 Jul 2025",
  lastActive: "Today",
  missions: 2
}, {
  name: "Westgate Motors",
  plan: "Pro",
  status: "Subscriber",
  joined: "18 Apr 2025",
  lastActive: "Today",
  missions: 9
}, {
  name: "Pinnacle Automotive",
  plan: "Starter",
  status: "Churned",
  joined: "11 May 2025",
  lastActive: "14 days ago",
  missions: 0
}];
const missionRows = [{
  id: "MSN-1042",
  dealer: "Apex Motors Leeds",
  make: "BMW M3 / M4",
  budget: "£45,000",
  status: "Running",
  found: 4,
  lastHit: "4 min ago"
}, {
  id: "MSN-1038",
  dealer: "North Star Cars",
  make: "Porsche Macan",
  budget: "£55,000",
  status: "Running",
  found: 2,
  lastHit: "11 min ago"
}, {
  id: "MSN-1031",
  dealer: "Premier Auto Group",
  make: "Audi RS5 / RS6",
  budget: "£60,000",
  status: "Running",
  found: 7,
  lastHit: "23 min ago"
}, {
  id: "MSN-1019",
  dealer: "Westgate Motors",
  make: "Mercedes C63",
  budget: "£40,000",
  status: "Paused",
  found: 1,
  lastHit: "2 hrs ago"
}, {
  id: "MSN-0998",
  dealer: "City Drive Manchester",
  make: "VW Golf R",
  budget: "£28,000",
  status: "Running",
  found: 3,
  lastHit: "1 min ago"
}];
const alertRows = [{
  level: "info",
  title: "AI Batch Scan Completed",
  detail: "Nightly scan of 94 active dealer feeds completed successfully.",
  time: "06:00 today"
}, {
  level: "warning",
  title: "Trial Expiry — 12 Dealers",
  detail: "12 trial accounts expire within 7 days. Consider automated reminder.",
  time: "06:00 today"
}, {
  level: "info",
  title: "New Dealer Onboarded",
  detail: "City Drive Manchester completed onboarding and activated first mission.",
  time: "Yesterday"
}, {
  level: "warning",
  title: "Formspree Quota at 78%",
  detail: "Lead form submissions approaching monthly quota. Monitor usage.",
  time: "2 days ago"
}, {
  level: "critical",
  title: "Mission Failure — MSN-0982",
  detail: "Auto Trader API throttled for dealer Pinnacle Automotive. Mission paused.",
  time: "3 days ago"
}];
const supportRows = [{
  id: "SUP-0091",
  dealer: "Apex Motors Leeds",
  subject: "Cannot find export button for opportunities",
  priority: "Medium",
  status: "In Progress",
  created: "Today"
}, {
  id: "SUP-0090",
  dealer: "Silverstone Prestige",
  subject: "How do I add a second search mission?",
  priority: "Low",
  status: "Open",
  created: "Today"
}, {
  id: "SUP-0088",
  dealer: "North Star Cars",
  subject: "Opportunity score not matching expected range",
  priority: "High",
  status: "Open",
  created: "Yesterday"
}, {
  id: "SUP-0085",
  dealer: "Premier Auto Group",
  subject: "Request to update notification email address",
  priority: "Low",
  status: "Resolved",
  created: "3 days ago"
}];
const toneBorder = {
  default: "border-outline-variant/30",
  accent: "border-primary/30",
  warning: "border-amber-400/30",
  success: "border-emerald-400/30",
  critical: "border-red-400/30"
};
const toneLabel = {
  default: "text-on-surface-variant",
  accent: "text-primary/90",
  warning: "text-amber-400",
  success: "text-emerald-400",
  critical: "text-red-400"
};
const toneValue = {
  default: "text-on-surface",
  accent: "text-primary",
  warning: "text-amber-300",
  success: "text-emerald-300",
  critical: "text-red-300"
};
function KpiCardBlock({
  card
}) {
  return /* @__PURE__ */ jsxs("article", { className: `rounded-2xl border ${toneBorder[card.tone]} bg-surface-container-high/70 p-4 shadow-[0_4px_20px_rgba(2,6,23,0.22)] backdrop-blur-sm transition-shadow hover:shadow-[0_6px_28px_rgba(2,6,23,0.32)]`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsx("p", { className: `text-[11px] font-semibold uppercase tracking-[0.16em] ${toneLabel[card.tone]}`, children: card.label }),
      /* @__PURE__ */ jsx("span", { className: "text-lg", "aria-hidden": "true", children: card.icon })
    ] }),
    /* @__PURE__ */ jsx("p", { className: `mt-2 text-3xl font-bold ${toneValue[card.tone]}`, children: card.value }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-on-surface-variant", children: card.detail })
  ] });
}
const statusBadgeCustomer = {
  Trial: "bg-amber-400/15 text-amber-300 border-amber-400/25",
  Subscriber: "bg-emerald-400/15 text-emerald-300 border-emerald-400/25",
  Churned: "bg-red-400/15 text-red-300 border-red-400/25"
};
const statusBadgeMission = {
  Running: "bg-emerald-400/15 text-emerald-300 border-emerald-400/25",
  Paused: "bg-amber-400/15 text-amber-300 border-amber-400/25",
  Completed: "bg-primary/15 text-primary border-primary/25"
};
const statusBadgeSupport = {
  Open: "bg-red-400/15 text-red-300 border-red-400/25",
  "In Progress": "bg-amber-400/15 text-amber-300 border-amber-400/25",
  Resolved: "bg-emerald-400/15 text-emerald-300 border-emerald-400/25"
};
const alertLevelStyle = {
  info: {
    border: "border-primary/25 bg-primary/5",
    icon: "ℹ️",
    title: "text-primary"
  },
  warning: {
    border: "border-amber-400/30 bg-amber-400/5",
    icon: "⚠️",
    title: "text-amber-300"
  },
  critical: {
    border: "border-red-400/30 bg-red-400/5",
    icon: "🔴",
    title: "text-red-300"
  }
};
function SectionCard({
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-high/80 shadow-[0_8px_32px_rgba(2,6,23,0.22)] backdrop-blur-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b border-outline-variant/20 px-5 py-4 md:px-6", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xl", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsx("h2", { className: "text-body-md font-semibold text-on-surface", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-5 py-4 md:px-6", children })
  ] });
}
function PlaceholderTableRow({
  label
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-outline-variant/15 bg-surface/30 p-3.5", children: [
    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-primary/40" }),
    /* @__PURE__ */ jsx("span", { className: "text-sm text-on-surface-variant", children: label })
  ] });
}
function formatBudget(raw) {
  const n = Number(raw.replace(/[^0-9.]/g, ""));
  if (isNaN(n) || n === 0) return raw;
  return `£${n.toLocaleString("en-GB")}`;
}
function buildVehicleLabel(m) {
  const {
    make,
    model
  } = m.vehicleRequirements;
  const parts = [make, model].filter(Boolean);
  if (parts.length > 0) return parts.join(" ");
  return m.vehicleType || "—";
}
function ActiveMissionPanel({
  mission
}) {
  const [timelineTs, setTimelineTs] = useState("");
  useEffect(() => {
    const d = /* @__PURE__ */ new Date();
    setTimelineTs(d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + " · " + d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    }));
  }, []);
  const fields = [{
    label: "Mission ID",
    value: mission.missionId,
    mono: true
  }, {
    label: "Vehicle",
    value: buildVehicleLabel(mission)
  }, {
    label: "Budget",
    value: formatBudget(mission.budget)
  }, {
    label: "Search Area",
    value: mission.searchArea || "United Kingdom"
  }, {
    label: "Buying Priority",
    value: mission.buyingPriority || "—"
  }, {
    label: "Current Stage",
    value: mission.currentStage || MISSION_STAGES[0]
  }, {
    label: "Status",
    value: mission.status || "Mission Created"
  }, {
    label: "Est. Time Remaining",
    value: mission.estimatedTimeRemaining || "—"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-blue-400/25 bg-blue-400/5 px-4 py-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-400", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300", children: "AI Employee Online" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-on-surface-variant", children: mission.currentAiActivity || "Ready to begin validation." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/60", children: "Active AI Search Mission" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        fields.map((f) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: f.label }),
          /* @__PURE__ */ jsx("p", { className: `mt-1 text-sm font-semibold ${f.mono ? "font-mono text-primary" : "text-on-surface"}`, children: f.value })
        ] }, f.label)),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "Progress" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm font-semibold text-on-surface", children: [
            mission.progress ?? 0,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high", children: /* @__PURE__ */ jsx("div", { className: "h-1.5 rounded-full bg-primary transition-all duration-500", style: {
            width: `${mission.progress ?? 0}%`
          }, role: "progressbar", "aria-valuenow": mission.progress ?? 0, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": `Mission progress: ${mission.progress ?? 0}%` }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/60", children: "AI Activity Timeline" }),
      /* @__PURE__ */ jsx("ol", { className: "space-y-0", children: /* @__PURE__ */ jsxs("li", { className: "relative flex gap-4 pl-6", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-[7px] top-2 h-full w-px bg-outline-variant/20", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "absolute left-0 top-[5px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }) }),
        /* @__PURE__ */ jsxs("div", { className: "pb-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface", children: mission.currentAiActivity || "Mission received from Search Builder." }),
          /* @__PURE__ */ jsx("p", { suppressHydrationWarning: true, className: "mt-0.5 text-xs text-on-surface-variant/60", children: timelineTs || "—" })
        ] })
      ] }) })
    ] })
  ] });
}
function MissionEmptyState() {
  return /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface/30 px-6 py-8 text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "text-3xl", "aria-hidden": "true", children: "🔍" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface-variant", children: "No active AI Search Mission." }),
    /* @__PURE__ */ jsx(Link, { to: "/search-builder", className: "inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-all hover:brightness-110", children: "Create Search Mission" })
  ] });
}
function LiveClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(() => /* @__PURE__ */ new Date());
  const intervalRef = useRef(null);
  useEffect(() => {
    setMounted(true);
    setTime(/* @__PURE__ */ new Date());
    intervalRef.current = window.setInterval(() => {
      setTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx("span", { suppressHydrationWarning: true, className: "tabular-nums text-on-surface text-sm font-medium", children: mounted ? time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : "--:--:--" });
}
function OwnerPage() {
  const [showBackTop, setShowBackTop] = useState(false);
  const {
    mission: activeMission,
    initialized: missionInitialized
  } = useMissionProgress();
  useEffect(() => {
    function onScroll() {
      setShowBackTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  const navItems = [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Missions",
    href: "/search-builder"
  }, {
    label: "AI Buying Report",
    href: "/opportunity"
  }, {
    label: "Settings",
    isSectionLabel: true
  }, {
    label: "TICA Preferences",
    href: "/settings"
  }, {
    label: "Owner",
    isSectionLabel: true
  }, {
    label: "TICA Operations Centre",
    href: "/owner",
    active: true
  }, {
    label: "🧠 TICA Intelligence",
    href: "/owner/intelligence"
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
  }];
  return /* @__PURE__ */ jsx(PlatformShell, { navItems, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] font-medium text-on-surface-variant/50 tracking-wide", children: "Operations Centre" }) }),
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Private" }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary", children: "Owner Only" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-headline-lg font-headline-lg text-primary", children: "TICA Operations Centre" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-on-surface md:text-body-md", children: "Owner Dashboard — Jonathan Huber" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-body-md text-on-surface-variant", children: "Managing the Trade in Cars Agent Platform" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-emerald-400/20 bg-surface-container-high/65 px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "relative flex h-2.5 w-2.5", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-emerald-400/45 animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "relative h-2.5 w-2.5 rounded-full bg-emerald-300" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300", children: "TICA Live" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "hidden h-4 w-px bg-outline-variant/30 sm:block", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-on-surface-variant", children: "All Systems Operational" }),
            /* @__PURE__ */ jsx("span", { className: "hidden h-4 w-px bg-outline-variant/30 md:block", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-on-surface-variant", children: [
              /* @__PURE__ */ jsx("span", { className: "uppercase tracking-[0.14em] text-[11px] font-semibold text-on-surface-variant/80", children: "Local Time" }),
              /* @__PURE__ */ jsx(LiveClock, {})
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-1 gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-high/40 px-4 py-2.5 sm:grid-cols-3 sm:gap-x-6", children: [{
            label: "AI Searches Running",
            value: "34"
          }, {
            label: "Vehicles Scanned Today",
            value: "84,312"
          }, {
            label: "New Opportunities Today",
            value: "1,047"
          }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold tabular-nums text-on-surface", children: stat.value }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-on-surface-variant/60", children: stat.label })
          ] }, stat.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col items-center gap-2 md:items-end", children: [
          /* @__PURE__ */ jsx(TicaShield, {}),
          /* @__PURE__ */ jsxs("div", { className: "text-center md:text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/50", children: "Platform Status" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex items-center justify-center gap-1.5 md:justify-end", children: [
              /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-emerald-300", children: "Production" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[10px] text-on-surface-variant/40", children: "Version 1.0" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg", "aria-hidden": "true", children: "🔐" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "This page is restricted to TICA administrators. It is not linked from the public website or customer navigation." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/60", children: "Business Overview" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4", children: kpiCards.map((card) => /* @__PURE__ */ jsx(KpiCardBlock, { card }, card.label)) })
    ] }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "Customer Management", icon: "👥", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "142 registered dealers — 94 active subscribers · 31 on trial" }),
        /* @__PURE__ */ jsxs("button", { type: "button", disabled: true, className: "inline-flex items-center gap-1.5 rounded-xl border border-outline-variant/30 bg-surface/40 px-3 py-2 text-xs font-medium text-on-surface-variant opacity-60", children: [
          "＋ Invite Dealer ",
          /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: "(coming soon)" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-outline-variant/20", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[560px] text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-outline-variant/20 bg-surface-container/60", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Dealer" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Plan" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Joined" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Last Active" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Missions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: customerRows.map((row, i) => /* @__PURE__ */ jsxs("tr", { className: `border-b border-outline-variant/10 transition-colors hover:bg-surface-container/40 ${i === customerRows.length - 1 ? "border-0" : ""}`, children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-on-surface", children: row.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-on-surface-variant", children: row.plan }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeCustomer[row.status]}`, children: row.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-on-surface-variant", children: row.joined }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-on-surface-variant", children: row.lastActive }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums text-on-surface", children: row.missions })
        ] }, row.name)) })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-on-surface-variant/60", children: "Showing 7 of 142 dealers. Full CRM integration planned." })
    ] }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "Mission Control", icon: "🎯", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "218 active missions across all dealers · 34 running live AI scans" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-3 py-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-pulse rounded-full bg-emerald-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-emerald-300", children: "AI Engine Running" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-outline-variant/20", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[540px] text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-outline-variant/20 bg-surface-container/60", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Mission ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Dealer" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Vehicle" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Budget" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Opps Found" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant", children: "Last Hit" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: missionRows.map((row, i) => /* @__PURE__ */ jsxs("tr", { className: `border-b border-outline-variant/10 transition-colors hover:bg-surface-container/40 ${i === missionRows.length - 1 ? "border-0" : ""}`, children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono text-xs text-primary", children: row.id }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-on-surface", children: row.dealer }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-on-surface-variant", children: row.make }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 tabular-nums text-on-surface-variant", children: row.budget }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeMission[row.status]}`, children: row.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right tabular-nums text-on-surface", children: row.found }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right text-on-surface-variant", children: row.lastHit })
        ] }, row.id)) })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-on-surface-variant/60", children: "Showing top 5 of 218 active missions. Full mission management coming soon." })
    ] }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "AI Operations", icon: "⚙️", children: [
      activeMission ? /* @__PURE__ */ jsx(ActiveMissionPanel, { mission: activeMission }) : missionInitialized ? /* @__PURE__ */ jsx(MissionEmptyState, {}) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant/60", children: "Engine Metrics" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "AI Engine Status" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-emerald-300", children: "Operational" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-on-surface-variant", children: "All scan workers healthy · 34 active threads" })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "Vehicles Scanned Today" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xl font-bold text-on-surface", children: "84,312" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-on-surface-variant", children: "Across Auto Trader, Motorway, dealer feeds" })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "Opportunities Surfaced" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xl font-bold text-primary", children: "1,047" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-on-surface-variant", children: "↑ 12% vs yesterday's 934" })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "Avg Scan Latency" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xl font-bold text-on-surface", children: "1.4s" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-on-surface-variant", children: "Target: <2s · Last 24 hrs avg" })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "AI Model" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xl font-bold text-on-surface", children: "TICA-1" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-on-surface-variant", children: "Scoring v2.3 · Last retrained 14 Jul 2025" })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/25 bg-surface/40 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70", children: "API Health" }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-1.5", children: [{
              name: "Auto Trader",
              ok: true
            }, {
              name: "Motorway",
              ok: true
            }, {
              name: "Formspree",
              ok: true
            }].map((api) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-on-surface-variant", children: api.name }),
              /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${api.ok ? "text-emerald-300" : "text-red-300"}`, children: api.ok ? "🟢 OK" : "🔴 Down" })
            ] }, api.name)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-on-surface-variant/60", children: "Real-time AI metrics integration planned. Values are demo data." })
    ] }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "Opportunity Oversight", icon: "💡", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "Platform-wide view of high-value opportunities across all active dealers." }) }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [{
        vehicle: "BMW M3 Competition 2020",
        dealer: "Apex Motors Leeds",
        margin: "£3,200",
        score: "97%",
        source: "Auto Trader"
      }, {
        vehicle: "Porsche Macan S 2021",
        dealer: "North Star Cars",
        margin: "£4,100",
        score: "93%",
        source: "Motorway"
      }, {
        vehicle: "Audi RS5 Sportback 2021",
        dealer: "Premier Auto Group",
        margin: "£2,850",
        score: "91%",
        source: "Auto Trader"
      }, {
        vehicle: "Mercedes C63 AMG 2022",
        dealer: "Westgate Motors",
        margin: "£3,600",
        score: "89%",
        source: "Dealer trade"
      }, {
        vehicle: "Range Rover Sport 2021",
        dealer: "North Star Cars",
        margin: "£5,200",
        score: "88%",
        source: "Fleet source"
      }, {
        vehicle: "VW Golf R 2023",
        dealer: "City Drive Manchester",
        margin: "£1,420",
        score: "78%",
        source: "Retail listing"
      }].map((opp) => /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-outline-variant/20 bg-surface/35 p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/80", children: opp.source }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-on-surface", children: opp.vehicle }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-on-surface-variant", children: opp.dealer }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-on-surface-variant/60 uppercase tracking-wider", children: "Est. Margin" }),
            /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-primary", children: opp.margin })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-on-surface-variant/60 uppercase tracking-wider", children: "Score" }),
            /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-emerald-300", children: opp.score })
          ] })
        ] })
      ] }, opp.vehicle)) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-on-surface-variant/60", children: "Cross-dealer opportunity aggregation and filtering planned." })
    ] }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "Support Centre", icon: "💬", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "7 open requests · 3 awaiting reply" }),
        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300", children: "⚠️ 3 need attention" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: supportRows.map((row) => /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl border border-outline-variant/15 bg-surface/30 p-4 sm:grid-cols-[auto_1fr_auto_auto]", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-primary", children: row.id }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-on-surface", children: row.subject }),
          /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-on-surface-variant", children: [
            row.dealer,
            " · ",
            row.created
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeSupport[row.status]}`, children: row.status }),
        /* @__PURE__ */ jsx("span", { className: `hidden sm:inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${row.priority === "High" ? "border-red-400/25 bg-red-400/10 text-red-300" : row.priority === "Medium" ? "border-amber-400/25 bg-amber-400/10 text-amber-300" : "border-outline-variant/25 bg-surface/30 text-on-surface-variant"}`, children: row.priority })
      ] }, row.id)) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-on-surface-variant/60", children: "Full helpdesk integration and ticket management planned." })
    ] }),
    /* @__PURE__ */ jsxs(SectionCard, { title: "System Alerts", icon: "🔔", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: alertRows.map((alert, i) => {
        const style = alertLevelStyle[alert.level];
        return /* @__PURE__ */ jsxs("article", { className: `flex items-start gap-3 rounded-xl border ${style.border} p-4`, children: [
          /* @__PURE__ */ jsx("span", { className: "mt-0.5 text-base", "aria-hidden": "true", children: style.icon }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: `text-sm font-semibold ${style.title}`, children: alert.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-on-surface-variant", children: alert.detail })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "shrink-0 text-xs text-on-surface-variant/60", children: alert.time })
        ] }, i);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant/50", children: "Coming Soon" }),
        ["Automated dealer health scoring", "AI failure alerts via webhook", "Daily digest email to owner"].map((item) => /* @__PURE__ */ jsx(PlaceholderTableRow, { label: item }, item))
      ] })
    ] }),
    showBackTop && /* @__PURE__ */ jsx("button", { type: "button", onClick: scrollToTop, className: "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface-container-high shadow-[0_4px_16px_rgba(2,6,23,0.4)] text-primary transition-all hover:bg-primary/10", "aria-label": "Back to top", children: "↑" })
  ] }) });
}
export {
  OwnerPage as component
};
