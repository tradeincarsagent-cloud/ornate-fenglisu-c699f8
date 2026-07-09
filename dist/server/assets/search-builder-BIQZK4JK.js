import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-DBXDg_m-.js";
const VEHICLE_TYPES = ["Cars", "Classic Cars", "Pickups", "Vans & Light Commercial", "Motorcycles"];
const VEHICLE_TYPE_EMOJI = {
  "Cars": "🚗",
  "Classic Cars": "🏎️",
  "Pickups": "🛻",
  "Vans & Light Commercial": "🚐",
  "Motorcycles": "🏍️"
};
const UK_MAKES = ["Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Citroen", "Dacia", "DS", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Seat", "Skoda", "Subaru", "Suzuki", "Tesla", "Toyota", "Vauxhall", "Volkswagen", "Volvo"];
const MODELS_BY_MAKE = {
  "Alfa Romeo": ["Giulia", "Stelvio", "Giulietta", "147", "156", "159", "Spider", "4C"],
  "Aston Martin": ["DB11", "DB12", "Vantage", "DBS", "DBX"],
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "e-tron", "e-tron GT"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "iX", "i4", "i5", "i7"],
  "Citroen": ["C1", "C3", "C4", "C5 X", "Berlingo", "Grand C4", "Picasso", "C3 Aircross", "C5 Aircross"],
  "Dacia": ["Sandero", "Duster", "Logan", "Jogger", "Spring"],
  "Ferrari": ["488", "F8", "SF90", "Roma", "296", "Portofino", "California", "GTC4Lusso"],
  "Fiat": ["500", "500X", "500L", "Panda", "Tipo", "Punto", "Bravo"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Kuga", "Puma", "Mustang", "Mustang Mach-E", "Explorer", "Galaxy", "S-Max", "EcoSport", "Edge", "Ranger", "Transit"],
  "Honda": ["Civic", "Jazz", "CR-V", "HR-V", "e", "ZR-V", "Accord", "Legend", "FR-V"],
  "Hyundai": ["i10", "i20", "i30", "IONIQ", "IONIQ 5", "IONIQ 6", "Tucson", "Santa Fe", "Kona"],
  "Jaguar": ["XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  "Jeep": ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Avenger"],
  "Kia": ["Picanto", "Rio", "Ceed", "Sportage", "Niro", "Stinger", "EV6", "EV9", "Sorento"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque", "Freelander"],
  "Lexus": ["CT", "IS", "ES", "GS", "LS", "NX", "RX", "UX", "LX", "RC", "LC"],
  "Maserati": ["Ghibli", "Quattroporte", "Levante", "Grecale", "GranTurismo"],
  "Mazda": ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-5", "CX-30", "CX-60", "MX-5", "MX-30"],
  "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "AMG GT", "EQA", "EQB", "EQC", "EQE", "EQS"],
  "MG": ["MG3", "MG5", "MG ZS", "MG HS", "MG4", "MG ZS EV"],
  "Mini": ["Hatch", "Convertible", "Clubman", "Countryman", "Paceman", "Roadster", "Cooper"],
  "Mitsubishi": ["Outlander", "Eclipse Cross", "L200", "ASX", "Colt"],
  "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "GT-R", "370Z", "Navara"],
  "Peugeot": ["108", "208", "308", "408", "508", "2008", "3008", "5008", "e-208", "e-2008"],
  "Porsche": ["911", "Boxster", "Cayman", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Renault": ["Clio", "Megane", "Captur", "Kadjar", "Koleos", "Zoe", "Scenic", "Laguna"],
  "Rolls-Royce": ["Ghost", "Phantom", "Wraith", "Dawn", "Cullinan", "Spectre"],
  "Seat": ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco", "Mii"],
  "Skoda": ["Fabia", "Octavia", "Superb", "Karoq", "Kodiaq", "Enyaq", "Scala", "Kamiq"],
  "Subaru": ["Impreza", "Outback", "Forester", "XV", "Legacy", "WRX", "BRZ", "Solterra"],
  "Suzuki": ["Swift", "Vitara", "S-Cross", "Ignis", "Jimny", "Baleno"],
  "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
  "Toyota": ["Aygo", "Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Highlander", "GR86", "Supra", "Prius", "Land Cruiser", "Hilux", "Proace"],
  "Vauxhall": ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Vivaro", "Movano"],
  "Volkswagen": ["Polo", "Golf", "Passat", "Arteon", "T-Roc", "T-Cross", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "Touran", "Sharan"],
  "Volvo": ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40", "EX30", "EX90"]
};
const CLASSIC_MAKES = ["Alfa Romeo", "Aston Martin", "Austin", "Bentley", "Chevrolet", "Ferrari", "Ford", "Jaguar", "Mercedes-Benz", "MG", "Morris", "Porsche", "Rolls-Royce", "Triumph", "Volkswagen"];
const CLASSIC_OTHER_OPTION = "Other / Enter model manually";
const CLASSIC_MODELS_BY_MAKE = {
  "Alfa Romeo": ["Giulietta Spider", "Giulia Sprint", "2000 Spider", "1750 GTV", "Spider Series 1"],
  "Aston Martin": ["DB4", "DB5", "DB6", "DB2", "Vantage"],
  "Austin": ["Healey 3000", "Healey Sprite", "A40", "A35", "Cambridge"],
  "Bentley": ["S1", "S2", "S3", "R-Type", "Continental S1"],
  "Chevrolet": ["Corvette C1", "Corvette C2", "Corvette C3", "Camaro", "Bel Air"],
  "Ferrari": ["250 GTE", "250 GT", "275 GTB", "308 GTB", "328"],
  "Ford": ["Mustang", "Capri", "Escort Mk1", "Escort Mk2", "Cortina"],
  "Jaguar": ["E-Type", "XK120", "XK140", "XK150", "XJ6"],
  "Mercedes-Benz": ["300SL", "Pagoda SL", "W108", "W123", "190SL"],
  "MG": ["MGA", "MGB", "Midget", "Magnette", "T-Type"],
  "Morris": ["Minor", "Oxford", "Marina", "1000", "Isis"],
  "Porsche": ["356", "911 Classic", "912", "914", "928"],
  "Rolls-Royce": ["Silver Shadow", "Silver Cloud", "Silver Wraith", "Corniche", "Silver Seraph"],
  "Triumph": ["TR3", "TR4", "TR6", "TR7", "Spitfire"],
  "Volkswagen": ["Beetle", "Karmann Ghia", "Type 3", "Transporter T1", "Transporter T2"]
};
const FUEL_TYPES = ["Any", "Petrol", "Diesel", "Hybrid", "Plug-in Hybrid", "Electric", "Mild Hybrid"];
const TRANSMISSION_TYPES = ["Any", "Automatic", "Manual", "Semi-Automatic"];
const SERVICE_HISTORY_OPTIONS = ["Any", "Full Service History", "Part Service History", "No Service History"];
const SEARCH_FREQUENCIES = [{
  label: "Every 15 Minutes",
  value: "15min"
}, {
  label: "Hourly",
  value: "hourly"
}, {
  label: "Every 6 Hours",
  value: "6h"
}, {
  label: "Daily",
  value: "daily"
}];
const SELECT_MAKE_OPTION = "— Select Make —";
const SELECT_MODEL_OPTION = "— Select Model —";
const PHASE_ONE_SOURCES = ["Auto Trader", "Dealer Network", "UK Public Vehicle Listings", "Dealer Websites", "Classified Vehicle Websites"];
const PLANNED_INTEGRATIONS = ["Facebook Marketplace", "Auctions", "Private Sellers", "Trade Feeds", "Vehicle History Providers"];
function CheckIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) });
}
function StepMarker({
  step
}) {
  return /* @__PURE__ */ jsx("p", { className: "mb-3", children: /* @__PURE__ */ jsx("span", { className: "rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-label-caps font-label-caps text-primary", children: step }) });
}
function SearchableCombobox({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  clearOptionLabel
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedValue = value.trim().toLowerCase();
  const showAllOptions = normalizedQuery === "" || normalizedQuery === normalizedValue;
  const filtered = showAllOptions ? options : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    setQuery(value);
  }, [value]);
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        if (!options.includes(query)) {
          setQuery(value);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, query, options]);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative", children: [
    /* @__PURE__ */ jsx("input", { id, type: "text", value: query, placeholder, disabled, autoComplete: "off", onChange: (e) => {
      setQuery(e.target.value);
      setOpen(true);
      if (e.target.value === "") onChange("");
    }, onFocus: () => {
      if (!disabled) setOpen(true);
    }, className: `min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 pr-10 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 ${disabled ? "cursor-not-allowed opacity-50" : ""}` }),
    /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) }) }),
    open && !disabled && filtered.length > 0 && /* @__PURE__ */ jsxs("ul", { role: "listbox", className: "absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-outline-variant/40 bg-surface-container-high shadow-lg", children: [
      clearOptionLabel && /* @__PURE__ */ jsx("li", { role: "option", "aria-selected": value === "", onMouseDown: () => {
        onChange("");
        setQuery("");
        setOpen(false);
      }, className: `cursor-pointer px-4 py-2.5 text-body-md font-body-md transition-colors hover:bg-primary/10 hover:text-primary ${value === "" ? "bg-primary/10 text-primary" : "text-on-surface"}`, children: clearOptionLabel }),
      filtered.map((option) => /* @__PURE__ */ jsx("li", { role: "option", "aria-selected": value === option, onMouseDown: () => {
        onChange(option);
        setQuery(option);
        setOpen(false);
      }, className: `cursor-pointer px-4 py-2.5 text-body-md font-body-md transition-colors hover:bg-primary/10 hover:text-primary ${value === option ? "bg-primary/10 text-primary" : "text-on-surface"}`, children: option }, option))
    ] })
  ] });
}
function SearchBuilderPage() {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [minProfit, setMinProfit] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [serviceHistory, setServiceHistory] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const [missionCreated, setMissionCreated] = useState(false);
  const [manualModel, setManualModel] = useState("");
  const isClassic = selectedVehicleType === "Classic Cars";
  const makeOptions = isClassic ? CLASSIC_MAKES : UK_MAKES;
  const classicModelBase = isClassic && make && CLASSIC_MODELS_BY_MAKE[make] ? CLASSIC_MODELS_BY_MAKE[make] : [];
  const classicModelOptions = isClassic ? [...classicModelBase, CLASSIC_OTHER_OPTION] : [];
  const modelOptions = isClassic ? make ? classicModelOptions : [] : make && MODELS_BY_MAKE[make] ? MODELS_BY_MAKE[make] : [];
  const isOtherModel = isClassic && model === CLASSIC_OTHER_OPTION;
  const handleVehicleTypeChange = (type) => {
    setSelectedVehicleType(type);
    setMake("");
    setModel("");
    setManualModel("");
  };
  const handleMakeChange = (val) => {
    setMake(val);
    setModel("");
    setManualModel("");
  };
  const handleModelChange = (val) => {
    setModel(val);
    if (val !== CLASSIC_OTHER_OPTION) setManualModel("");
  };
  const selectedFrequency = SEARCH_FREQUENCIES.find((item) => item.value === frequency)?.label ?? "Not selected";
  const effectiveModel = isOtherModel ? manualModel : model;
  const missionNameBase = [make.trim(), effectiveModel.trim()].filter(Boolean).join(" ");
  const missionName = missionNameBase || selectedVehicleType || "Vehicle Search";
  return /* @__PURE__ */ jsx(PlatformShell, { navItems: [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Finder",
    href: "/search-builder",
    active: true
  }, {
    label: "AI Buying Report",
    href: "/opportunity"
  }, {
    label: "Settings",
    isSectionLabel: true
  }, {
    label: "Notification Preferences",
    href: "/settings"
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
  }], children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5 md:mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "AI Search Finder" }),
        /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx(TicaShield, {}) })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-headline-lg font-headline-lg text-on-surface", children: "Create Your AI Search in Under 60 Seconds" }),
      /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Tell TICA exactly what you're looking for and let your AI Search Finder work 24/7 to discover the best buying opportunities before everyone else." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-5 sm:space-y-8", children: [
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsx(StepMarker, { step: "01" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "What would you like me to find?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface-variant", children: "Choose the makes and models you want TICA to monitor." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5", children: VEHICLE_TYPES.map((type) => {
          const selected = selectedVehicleType === type;
          return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => handleVehicleTypeChange(type), className: `group relative flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border p-5 text-center transition-all duration-200 sm:min-h-32 sm:p-6 ${selected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-high hover:text-on-surface"}`, "aria-pressed": selected, children: [
            selected && /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: VEHICLE_TYPE_EMOJI[type] }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md font-semibold", children: type })
          ] }, type);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsx(StepMarker, { step: "02" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Tell me a bit more about it" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface-variant", children: "Set your buying budget and minimum profit target so TICA only finds opportunities that match your goals." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "make", children: "Make" }),
            /* @__PURE__ */ jsx(SearchableCombobox, { id: "make", options: makeOptions, value: make, onChange: handleMakeChange, placeholder: SELECT_MAKE_OPTION, clearOptionLabel: SELECT_MAKE_OPTION })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "model", children: "Model" }),
            /* @__PURE__ */ jsx(SearchableCombobox, { id: "model", options: modelOptions, value: model, onChange: handleModelChange, placeholder: make ? SELECT_MODEL_OPTION : "Select a make first", clearOptionLabel: SELECT_MODEL_OPTION, disabled: !make || modelOptions.length === 0 }),
            isOtherModel && /* @__PURE__ */ jsx("input", { id: "manual-model", type: "text", placeholder: "Enter classic model", value: manualModel, onChange: (e) => setManualModel(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "max-budget", children: "Maximum Budget" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant", children: "£" }),
              /* @__PURE__ */ jsx("input", { id: "max-budget", type: "number", placeholder: "e.g. 30000", min: "0", value: maxBudget, onChange: (e) => setMaxBudget(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:col-span-2 lg:col-span-3 xl:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "min-profit", children: "Minimum Estimated Profit" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant", children: "£" }),
              /* @__PURE__ */ jsx("input", { id: "min-profit", type: "number", placeholder: "e.g. 1500", min: "0", value: minProfit, onChange: (e) => setMinProfit(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-xl border border-outline-variant/30 bg-surface-container-high", children: [
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setAdvancedOpen((o) => !o), className: "flex w-full items-center justify-between px-5 py-4 text-left", "aria-expanded": advancedOpen, children: [
            /* @__PURE__ */ jsx("span", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Advanced Filters" }),
            /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", className: `shrink-0 text-on-surface-variant transition-transform duration-200 ${advancedOpen ? "rotate-180" : ""}`, children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
          ] }),
          advancedOpen && /* @__PURE__ */ jsx("div", { className: "border-t border-outline-variant/30 px-5 pb-5 pt-5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "year-from", children: "Year From" }),
              /* @__PURE__ */ jsx("input", { id: "year-from", type: "number", placeholder: "e.g. 2018", min: "1990", max: "2030", value: yearFrom, onChange: (e) => setYearFrom(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "year-to", children: "Year To" }),
              /* @__PURE__ */ jsx("input", { id: "year-to", type: "number", placeholder: "e.g. 2024", min: "1990", max: "2030", value: yearTo, onChange: (e) => setYearTo(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "max-mileage", children: "Maximum Mileage" }),
              /* @__PURE__ */ jsx("input", { id: "max-mileage", type: "number", placeholder: "e.g. 60000", min: "0", value: maxMileage, onChange: (e) => setMaxMileage(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "fuel-type", children: "Fuel Type" }),
              /* @__PURE__ */ jsx("select", { id: "fuel-type", value: fuelType, onChange: (e) => setFuelType(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30", children: FUEL_TYPES.map((ft) => /* @__PURE__ */ jsx("option", { value: ft === "Any" ? "" : ft, children: ft }, ft)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "transmission", children: "Transmission" }),
              /* @__PURE__ */ jsx("select", { id: "transmission", value: transmission, onChange: (e) => setTransmission(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30", children: TRANSMISSION_TYPES.map((tt) => /* @__PURE__ */ jsx("option", { value: tt === "Any" ? "" : tt, children: tt }, tt)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", htmlFor: "service-history", children: "Service History" }),
              /* @__PURE__ */ jsx("select", { id: "service-history", value: serviceHistory, onChange: (e) => setServiceHistory(e.target.value), className: "min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30", children: SERVICE_HISTORY_OPTIONS.map((sh) => /* @__PURE__ */ jsx("option", { value: sh === "Any" ? "" : sh, children: sh }, sh)) })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsx(StepMarker, { step: "03" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "Where should I search?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface-variant", children: "Select the marketplaces and locations TICA should scan." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Available / Phase 1" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PHASE_ONE_SOURCES.map((source) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-primary/20 bg-surface-container-high px-4 py-3.5 shadow-sm shadow-primary/5", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-primary bg-primary text-on-primary", "aria-hidden": "true", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
              /* @__PURE__ */ jsx("span", { className: "flex-1 text-body-md font-body-md text-on-surface", children: source }),
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps text-primary", children: "Phase 1" })
            ] }, source)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Planned Integrations" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PLANNED_INTEGRATIONS.map((source) => /* @__PURE__ */ jsxs("div", { className: "flex cursor-not-allowed items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container px-4 py-3.5 opacity-60", "aria-disabled": "true", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-outline-variant/40 bg-transparent", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "flex-1 text-body-md font-body-md text-on-surface-variant", children: source }),
              /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 rounded-full border border-outline-variant/40 bg-surface-container-high px-3 py-1 text-label-caps font-label-caps text-on-surface-variant", children: "Coming Soon" })
            ] }, source)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3.5", children: /* @__PURE__ */ jsx("p", { className: "text-body-md font-body-md text-on-surface-variant", children: "Trade in Cars Agent is being designed to search connected marketplaces, dealer sources and trusted public vehicle listings. Some integrations will be released in later platform phases." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsx(StepMarker, { step: "04" }),
          /* @__PURE__ */ jsx("h2", { className: "text-headline-md font-headline-md text-on-surface", children: "How often should I look?" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface-variant", children: "Choose how frequently TICA should run this search." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: SEARCH_FREQUENCIES.map(({
          label,
          value
        }) => {
          const selected = frequency === value;
          return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setFrequency(value), "aria-pressed": selected, className: `relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border px-4 py-4 text-center transition-all duration-200 sm:py-5 ${selected ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface"}`, children: [
            selected && /* @__PURE__ */ jsx("span", { className: "absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: value === "15min" ? "⚡" : value === "hourly" ? "🔄" : value === "6h" ? "⏱️" : "📅" }),
            /* @__PURE__ */ jsx("span", { className: "text-body-md font-body-md font-semibold leading-tight", children: label })
          ] }, value);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 text-center sm:p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high p-6 text-left md:block", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Your AI Search Summary" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface-variant", children: "TICA understands your requirements." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Looking for:" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: "BMW M3 Competition" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Maximum Budget:" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: "£40,000" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Search Area:" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: "United Kingdom" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Minimum Profit:" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: "£3,000" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Scan Frequency:" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: "Every 15 minutes" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Search Sources:" }),
              /* @__PURE__ */ jsxs("ul", { className: "mt-2 space-y-1 text-body-md font-body-md text-on-surface", children: [
                /* @__PURE__ */ jsx("li", { children: "Auto Trader" }),
                /* @__PURE__ */ jsx("li", { children: "Dealer Auctions" }),
                /* @__PURE__ */ jsx("li", { children: "Facebook Marketplace" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mb-5 w-full max-w-md rounded-xl border border-primary/25 bg-primary/8 px-5 py-4", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "What Happens Next?" }),
          /* @__PURE__ */ jsx("p", { className: "text-body-sm font-body-sm text-on-surface-variant", children: "Once you start your AI Search Finder, TICA will continuously monitor your selected marketplaces, analyse new listings, compare market values, and notify you whenever a high-confidence opportunity matches your buying strategy." })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setMissionCreated(true), className: "mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 sm:py-5 text-headline-md font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx("span", { children: "⚡" }),
          "Start AI Search Mission"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-body-md font-body-md text-on-surface-variant", children: "Live AI scanning will be available in a future platform release." })
      ] }),
      missionCreated && /* @__PURE__ */ jsxs("section", { className: "dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-6 md:p-8", "aria-live": "polite", children: [
        /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Mission Created" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 text-headline-lg font-headline-lg text-on-surface", children: "AI Search Mission Created" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Mission Name" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: missionName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-primary", children: "Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Monitoring Frequency" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: selectedFrequency })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-high p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Search Sources" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface", children: PHASE_ONE_SOURCES.join(", ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110", children: "Return to Dealer Command Centre" }),
          /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary", children: "View AI Buying Report" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SearchBuilderPage as component
};
