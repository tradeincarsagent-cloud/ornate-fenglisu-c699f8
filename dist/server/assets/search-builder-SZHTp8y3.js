import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { P as PlatformShell, T as TicaShield } from "./TicaShield-3vM7jPjM.js";
import { v as validateMissionInput, c as createMission, s as saveMission } from "./mission-BlUhdbKx.js";
import "react-dom";
const AVAILABLE_VEHICLE_TYPES = ["Cars", "Classic Cars", "Pickups", "Vans & Light Commercials"];
const COMING_SOON_VEHICLE_TYPES = ["Motorcycles"];
const VEHICLE_TYPES = [...AVAILABLE_VEHICLE_TYPES, ...COMING_SOON_VEHICLE_TYPES];
const AVAILABLE_VEHICLE_TYPE_SET = new Set(AVAILABLE_VEHICLE_TYPES);
const VEHICLE_TYPE_EMOJI = {
  "Cars": "🚗",
  "Classic Cars": "🏎️",
  "Pickups": "🛻",
  "Vans & Light Commercials": "🚐",
  "Motorcycles": "🏍️"
};
const CAR_MAKES = ["Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Citroen", "Dacia", "DS", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Maserati", "Mazda", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nissan", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Seat", "Skoda", "Subaru", "Suzuki", "Tesla", "Toyota", "Vauxhall", "Volkswagen", "Volvo"];
const CAR_MODELS_BY_MAKE = {
  "Alfa Romeo": ["Giulia", "Stelvio", "Giulietta", "147", "156", "159", "Spider", "4C"],
  "Aston Martin": ["DB11", "DB12", "Vantage", "DBS", "DBX"],
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "e-tron", "e-tron GT"],
  "Bentley": ["Continental GT", "Bentayga", "Flying Spur", "Continental GTC", "Mulsanne"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "iX", "i4", "i5", "i7"],
  "Citroen": ["C1", "C3", "C4", "C5 X", "Berlingo", "Grand C4", "Picasso", "C3 Aircross", "C5 Aircross"],
  "Dacia": ["Sandero", "Duster", "Logan", "Jogger", "Spring"],
  "DS": ["DS 3", "DS 4", "DS 7", "DS 9", "DS 3 Crossback"],
  "Ferrari": ["488", "F8", "SF90", "Roma", "296", "Portofino", "California", "GTC4Lusso"],
  "Fiat": ["500", "500X", "500L", "Panda", "Tipo", "Punto", "Bravo"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Kuga", "Puma", "Mustang", "Mustang Mach-E", "Explorer", "Galaxy", "S-Max", "EcoSport", "Edge", "Ranger", "Transit"],
  "Honda": ["Civic", "Jazz", "CR-V", "HR-V", "e", "ZR-V", "Accord", "Legend", "FR-V"],
  "Hyundai": ["i10", "i20", "i30", "IONIQ", "IONIQ 5", "IONIQ 6", "Tucson", "Santa Fe", "Kona"],
  "Jaguar": ["XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  "Jeep": ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Avenger"],
  "Kia": ["Picanto", "Rio", "Ceed", "Sportage", "Niro", "Stinger", "EV6", "EV9", "Sorento"],
  "Lamborghini": ["Huracán", "Aventador", "Urus", "Gallardo", "Revuelto"],
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
const PICKUP_MAKES = ["Ford", "Isuzu", "Maxus", "Mercedes-Benz", "Mitsubishi", "Nissan", "Toyota", "Volkswagen"];
const PICKUP_MODELS_BY_MAKE = {
  "Ford": ["Ranger", "Ranger Raptor"],
  "Isuzu": ["D-Max", "D-Max AT35"],
  "Maxus": ["T90EV"],
  "Mercedes-Benz": ["X-Class"],
  "Mitsubishi": ["L200", "L200 Barbarian"],
  "Nissan": ["Navara", "Navara N-Guard"],
  "Toyota": ["Hilux", "Hilux Invincible"],
  "Volkswagen": ["Amarok", "Amarok Aventura"]
};
const VAN_LIGHT_COMMERCIAL_MAKES = ["Citroen", "Fiat", "Ford", "Iveco", "MAN", "Maxus", "Mercedes-Benz", "Nissan", "Peugeot", "Renault", "Toyota", "Vauxhall", "Volkswagen"];
const VAN_LIGHT_COMMERCIAL_MODELS_BY_MAKE = {
  "Citroen": ["Berlingo Van", "Dispatch", "Relay"],
  "Fiat": ["Doblo", "Scudo", "Ducato"],
  "Ford": ["Transit Courier", "Transit Connect", "Transit Custom", "Transit"],
  "Iveco": ["Daily"],
  "MAN": ["TGE"],
  "Maxus": ["eDeliver 3", "eDeliver 7", "eDeliver 9", "Deliver 9"],
  "Mercedes-Benz": ["Citan", "Vito", "Sprinter"],
  "Nissan": ["Townstar", "Primastar", "Interstar"],
  "Peugeot": ["Partner", "Expert", "Boxer"],
  "Renault": ["Kangoo", "Trafic", "Master"],
  "Toyota": ["Proace City", "Proace", "Proace Max"],
  "Vauxhall": ["Combo Cargo", "Vivaro", "Movano"],
  "Volkswagen": ["Caddy Cargo", "Transporter", "Crafter"]
};
const CLASSIC_MAKES = ["Alfa Romeo", "Aston Martin", "Austin", "Bentley", "Chevrolet", "Ferrari", "Ford", "Jaguar", "Mercedes-Benz", "MG", "Morris", "Porsche", "Rolls-Royce", "Triumph", "Volkswagen"];
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
const MOTORCYCLE_MAKES = ["Aprilia", "BMW Motorrad", "Ducati", "Harley-Davidson", "Honda", "Kawasaki", "KTM", "Suzuki", "Triumph", "Yamaha"];
const MOTORCYCLE_MODELS_BY_MAKE = {
  "Aprilia": ["RS 660", "Tuono 660", "Tuareg 660", "RSV4"],
  "BMW Motorrad": ["R 1250 GS", "F 900 R", "S 1000 RR", "CE 04"],
  "Ducati": ["Monster", "Panigale V4", "Multistrada V4", "Scrambler Icon"],
  "Harley-Davidson": ["Sportster S", "Nightster", "Street Bob 114", "Pan America 1250"],
  "Honda": ["CB650R", "CBR650R", "Africa Twin", "Forza 125", "PCX 125"],
  "Kawasaki": ["Ninja 650", "Ninja ZX-6R", "Z900", "Versys 650"],
  "KTM": ["390 Duke", "790 Duke", "890 Adventure", "1290 Super Duke R"],
  "Suzuki": ["GSX-R750", "GSX-8S", "V-Strom 650", "Hayabusa"],
  "Triumph": ["Street Triple", "Tiger 900", "Bonneville T120", "Trident 660"],
  "Yamaha": ["MT-07", "MT-09", "Tracer 9", "YZF-R1", "NMAX 125"]
};
const MAKES_BY_VEHICLE_TYPE = {
  "Cars": CAR_MAKES,
  "Classic Cars": CLASSIC_MAKES,
  "Pickups": PICKUP_MAKES,
  "Vans & Light Commercials": VAN_LIGHT_COMMERCIAL_MAKES,
  "Motorcycles": MOTORCYCLE_MAKES
};
const MODELS_BY_VEHICLE_TYPE = {
  "Cars": CAR_MODELS_BY_MAKE,
  "Classic Cars": CLASSIC_MODELS_BY_MAKE,
  "Pickups": PICKUP_MODELS_BY_MAKE,
  "Vans & Light Commercials": VAN_LIGHT_COMMERCIAL_MODELS_BY_MAKE,
  "Motorcycles": MOTORCYCLE_MODELS_BY_MAKE
};
const SEARCH_PRIORITIES = [{
  label: "Profit",
  value: "profit",
  icon: "💰",
  description: "Focus on the highest expected margin."
}, {
  label: "Fast Selling",
  value: "fast-selling",
  icon: "⚡",
  description: "Prioritise vehicles that sell quickly."
}, {
  label: "Rare Vehicles",
  value: "rare-vehicles",
  icon: "💎",
  description: "Surface harder-to-find stock with standout demand."
}, {
  label: "Best Condition",
  value: "best-condition",
  icon: "✅",
  description: "Only surface the cleanest examples available."
}, {
  label: "Low Mileage",
  value: "low-mileage",
  icon: "🔢",
  description: "Prioritise lowest mileage vehicles first."
}, {
  label: "Highest Margin",
  value: "highest-margin",
  icon: "📈",
  description: "Maximum retail margin vs purchase price."
}];
const SEARCH_AREA_OPTIONS = [{
  label: "Nationwide",
  value: "nationwide",
  icon: "🇬🇧",
  description: "Search across the entire UK."
}, {
  label: "Within Radius",
  value: "within-radius",
  icon: "📍",
  description: "Set a distance radius from your dealership."
}, {
  label: "Specific Counties",
  value: "specific-counties",
  icon: "🗺️",
  description: "Target specific counties or regions."
}, {
  label: "Auction Houses",
  value: "auction-houses",
  icon: "🏛️",
  description: "Monitor UK auction houses only."
}, {
  label: "Dealer Websites",
  value: "dealer-websites",
  icon: "🏢",
  description: "Search dealer networks and trade listings."
}, {
  label: "Marketplace Sources",
  value: "marketplace-sources",
  icon: "🛒",
  description: "UK marketplace platforms and classifieds."
}];
const AI_INTELLIGENCE_OPTIONS = [{
  label: "Estimated Profit",
  value: "estimated-profit",
  icon: "💰",
  description: "AI-estimated profit for each opportunity."
}, {
  label: "Risk Assessment",
  value: "risk-assessment",
  icon: "🛡️",
  description: "Flags vehicles with potential purchase risk."
}, {
  label: "Market Demand",
  value: "market-demand",
  icon: "📊",
  description: "Current demand signals for this vehicle type."
}, {
  label: "Price Validation",
  value: "price-validation",
  icon: "✅",
  description: "Confirms the asking price is fair or better."
}, {
  label: "Recommended Offer",
  value: "recommended-offer",
  icon: "🎯",
  description: "AI-suggested offer based on market data."
}, {
  label: "Dealer Questions",
  value: "dealer-questions",
  icon: "💬",
  description: "Pre-generated questions to ask the seller."
}, {
  label: "Vehicle Intelligence",
  value: "vehicle-intelligence",
  icon: "🧠",
  description: "Deep insight: history, recalls, value trends."
}];
const MISSION_NAME_EXAMPLES = ["Performance Hatchbacks", "Classic Mercedes", "Pickup Trucks", "Dealer Stock Replenishment"];
const MAX_MILEAGE_STEPS = [1e4, 2e4, 3e4, 4e4, 5e4, 6e4, 75e3, 1e5, 125e3, 15e4, 2e5];
const MAX_PRICE_STEPS = [5e3, 1e4, 15e3, 2e4, 25e3, 3e4, 4e4, 5e4, 75e3, 1e5, 15e4, 2e5];
function MetricRow({
  label,
  value,
  active,
  valueClass
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
    /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: label }),
    /* @__PURE__ */ jsx("p", { className: `text-body-sm font-body-sm font-bold tabular-nums ${active ? valueClass ?? "text-on-surface" : "text-on-surface-variant/40"}`, children: value })
  ] });
}
function SectionLabel({
  children
}) {
  return /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-primary", children });
}
function MultiSelectChips({
  options,
  selected,
  onToggle,
  searchable
}) {
  const [query, setQuery] = useState("");
  const filtered = query.trim() === "" ? options : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  return /* @__PURE__ */ jsxs("div", { children: [
    searchable && options.length > 8 && /* @__PURE__ */ jsx("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Type to filter…", className: "mb-3 min-h-10 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: filtered.map((opt) => {
      const isSelected = selected.has(opt);
      return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => onToggle(opt), "aria-pressed": isSelected, className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-body-sm font-body-sm transition-all duration-150 ${isSelected ? "border-primary bg-primary/15 text-primary" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface"}`, children: [
        isSelected && /* @__PURE__ */ jsx("span", { className: "flex h-3.5 w-3.5 shrink-0 items-center justify-center", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
        opt
      ] }, opt);
    }) }),
    selected.size > 0 && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-body-sm font-body-sm text-on-surface-variant", children: [
      selected.size,
      " selected",
      " · ",
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => selected.forEach((v) => onToggle(v)), className: "text-primary underline underline-offset-2 hover:no-underline", children: "Clear all" })
    ] })
  ] });
}
function SliderWithInput({
  id,
  steps,
  value,
  onChange,
  formatValue,
  label
}) {
  const numericValue = value ? Number(value) : 0;
  const stepIndex = steps.findIndex((s) => s >= numericValue);
  const sliderValue = value === "" ? -1 : stepIndex >= 0 ? stepIndex : steps.length - 1;
  function handleSliderChange(idx) {
    if (idx < 0) {
      onChange("");
      return;
    }
    onChange(String(steps[idx]));
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("input", { id: `${id}-manual`, type: "number", placeholder: "Any", min: 0, value, onChange: (e) => onChange(e.target.value), "aria-label": `${label} manual entry`, className: "min-h-10 w-32 rounded-lg border border-outline-variant/40 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" }),
      value && /* @__PURE__ */ jsx("span", { className: "text-body-sm font-body-sm font-semibold text-primary", children: formatValue(numericValue) })
    ] }),
    /* @__PURE__ */ jsx("input", { id, type: "range", min: -1, max: steps.length - 1, step: 1, value: sliderValue, onChange: (e) => handleSliderChange(Number(e.target.value)), "aria-label": label, className: "w-full accent-primary" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-label-caps font-label-caps text-on-surface-variant/60", children: [
      /* @__PURE__ */ jsx("span", { children: "Any" }),
      /* @__PURE__ */ jsx("span", { children: formatValue(steps[steps.length - 1]) })
    ] })
  ] });
}
function SearchBuilderPage() {
  const [missionName, setMissionName] = useState("");
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState(/* @__PURE__ */ new Set());
  const [selectedMakes, setSelectedMakes] = useState(/* @__PURE__ */ new Set());
  const [selectedModels, setSelectedModels] = useState(/* @__PURE__ */ new Set());
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [searchAreas, setSearchAreas] = useState(/* @__PURE__ */ new Set());
  const [searchPriority, setSearchPriority] = useState(null);
  const [aiIntelligence, setAiIntelligence] = useState(new Set(AI_INTELLIGENCE_OPTIONS.map((o) => o.value)));
  const [validationErrors, setValidationErrors] = useState([]);
  const [deployedMission, setDeployedMission] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const deployButtonRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  selectedVehicleTypes.size > 0 ? [...selectedVehicleTypes][0] : "Cars";
  const hasSelectedVehicleCategory = selectedVehicleTypes.size > 0;
  const availableMakes = Array.from(new Set(selectedVehicleTypes.size > 0 ? [...selectedVehicleTypes].flatMap((vt) => MAKES_BY_VEHICLE_TYPE[vt] ?? []) : MAKES_BY_VEHICLE_TYPE["Cars"])).sort();
  const availableModels = Array.from(new Set([...selectedMakes].flatMap((make) => [...selectedVehicleTypes.size > 0 ? selectedVehicleTypes : /* @__PURE__ */ new Set(["Cars"])].flatMap((vt) => MODELS_BY_VEHICLE_TYPE[vt]?.[make] ?? [])))).sort();
  function handleVehicleTypeToggle(type) {
    setSelectedVehicleTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
    setSelectedMakes(/* @__PURE__ */ new Set());
    setSelectedModels(/* @__PURE__ */ new Set());
    if (validationErrors.length > 0) {
      setValidationErrors((prev) => prev.filter((e) => e.field !== "vehicleType"));
    }
  }
  function handleMakeToggle(make) {
    setSelectedMakes((prev) => {
      const next = new Set(prev);
      if (next.has(make)) {
        next.delete(make);
        setSelectedModels((prevModels) => {
          const nextModels = new Set(prevModels);
          [...selectedVehicleTypes].forEach((vt) => {
            (MODELS_BY_VEHICLE_TYPE[vt]?.[make] ?? []).forEach((m) => nextModels.delete(m));
          });
          return nextModels;
        });
      } else {
        next.add(make);
      }
      return next;
    });
  }
  function handleModelToggle(model) {
    setSelectedModels((prev) => {
      const next = new Set(prev);
      if (next.has(model)) next.delete(model);
      else next.add(model);
      return next;
    });
  }
  function handleSearchAreaToggle(area) {
    setSearchAreas((prev) => {
      const next = new Set(prev);
      if (next.has(area)) next.delete(area);
      else next.add(area);
      return next;
    });
  }
  function handleAiToggle(feature) {
    setAiIntelligence((prev) => {
      const next = new Set(prev);
      if (next.has(feature)) next.delete(feature);
      else next.add(feature);
      return next;
    });
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  function hasError(field) {
    return validationErrors.some((e) => e.field === field);
  }
  function handleDeploy() {
    const primaryMake = [...selectedMakes][0] ?? "";
    const primaryModel = [...selectedModels][0] ?? "";
    const primaryVehicleType = [...selectedVehicleTypes][0] ?? "";
    const buyingPriorityLabel = SEARCH_PRIORITIES.find((p) => p.value === searchPriority)?.label ?? "";
    const input = {
      vehicleType: primaryVehicleType,
      make: primaryMake,
      model: primaryModel,
      yearFrom,
      yearTo,
      maxMileage,
      fuelType: "",
      transmission: "",
      serviceHistory: "",
      budget: maxBudget,
      targetProfit: "",
      buyingPriority: buyingPriorityLabel,
      notificationPreferences: [],
      selectedMarketplaces: [...searchAreas]
    };
    const errors = validateMissionInput(input).filter((error) => error.field !== "vehicleType");
    if (!hasSelectedVehicleCategory) {
      errors.unshift({
        field: "vehicleType",
        message: "Select at least one vehicle type to continue."
      });
    }
    setValidationErrors(errors);
    if (errors.length > 0) {
      deployButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    const mission = createMission(input);
    saveMission(mission);
    setDeployedMission(mission);
  }
  const formatPounds = (value) => `£${Number(value).toLocaleString("en-GB")}`;
  const vehicleSummary = [[...selectedVehicleTypes].join(", "), [...selectedMakes].join(", "), [...selectedModels].join(", ")].filter(Boolean).join(" / ") || "Not yet selected";
  const missionReadiness = (() => {
    const fields = [missionName.trim() !== "", hasSelectedVehicleCategory, selectedMakes.size > 0, maxBudget !== "", searchAreas.size > 0, searchPriority !== null];
    return Math.round(fields.filter(Boolean).length / fields.length * 100);
  })();
  const opportunityScore = (() => {
    let score = 0;
    if (hasSelectedVehicleCategory) score += 20;
    if (selectedMakes.size > 0) score += 15;
    if (maxBudget) score += 20;
    if (searchAreas.size > 0) score += 20;
    if (searchPriority) score += 15;
    if (missionName.trim()) score += 10;
    return score;
  })();
  const competitionLevel = (() => {
    if (!hasSelectedVehicleCategory) return null;
    const areaCount = searchAreas.size;
    if (areaCount === 0) return null;
    if (areaCount >= 3) return {
      label: "HIGH",
      color: "text-error"
    };
    if (areaCount === 2) return {
      label: "MEDIUM",
      color: "text-warning"
    };
    return {
      label: "LOW",
      color: "text-success"
    };
  })();
  const missionStrength = (() => {
    if (opportunityScore >= 80) return {
      label: "STRONG",
      color: "text-success"
    };
    if (opportunityScore >= 50) return {
      label: "BUILDING",
      color: "text-warning"
    };
    if (opportunityScore >= 20) return {
      label: "WEAK",
      color: "text-error"
    };
    return null;
  })();
  const estimatedDailyOpps = (() => {
    if (!hasSelectedVehicleCategory || !maxBudget || searchAreas.size === 0) return null;
    const base = searchAreas.size * 3;
    const makeBonus = selectedMakes.size > 0 ? 0 : 5;
    return base + makeBonus;
  })();
  const expectedProfit = (() => {
    if (!maxBudget) return null;
    const budget = Number(maxBudget);
    if (budget <= 1e4) return "£800–£1,400";
    if (budget <= 25e3) return "£1,500–£2,800";
    if (budget <= 5e4) return "£2,500–£5,000";
    return "£4,000–£9,000+";
  })();
  const aiConfidence = (() => {
    if (aiIntelligence.size === 0) return 0;
    return Math.round(aiIntelligence.size / AI_INTELLIGENCE_OPTIONS.length * 100);
  })();
  return /* @__PURE__ */ jsxs(PlatformShell, { navItems: [{
    label: "Dealer Command Centre",
    href: "/dashboard"
  }, {
    label: "AI Search Missions",
    href: "/search-builder",
    active: true
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
    href: "/owner"
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
  }], children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-container-max", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Mission Builder" }),
          /* @__PURE__ */ jsx("h1", { className: "mt-0.5 text-headline-lg font-headline-lg text-on-surface", children: "AI Search Missions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "hidden text-body-sm font-body-sm text-on-surface-variant sm:block", children: "Brief your AI employee" }),
          /* @__PURE__ */ jsx(TicaShield, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 lg:grid lg:grid-cols-[1fr_296px] lg:gap-5 lg:space-y-0 xl:grid-cols-[1fr_316px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 lg:col-start-1 lg:row-start-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx(SectionLabel, { children: "Mission Name" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("input", { id: "mission-name", type: "text", value: missionName, onChange: (e) => setMissionName(e.target.value), placeholder: "e.g. Performance Hatchbacks", className: "min-h-9 min-w-[220px] flex-1 rounded-lg border border-outline-variant/40 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: MISSION_NAME_EXAMPLES.map((ex) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMissionName(ex), className: "rounded-full border border-outline-variant/30 bg-surface-container-high px-2.5 py-1 text-label-caps font-label-caps text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary", children: ex }, ex)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `rounded-xl border bg-surface-container-low px-4 py-3 ${hasError("vehicleType") ? "border-error/60" : "border-outline-variant/30"}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "Vehicle Type" }),
              hasError("vehicleType") && /* @__PURE__ */ jsx("span", { className: "text-body-sm font-body-sm text-error", children: validationErrors.find((e) => e.field === "vehicleType")?.message })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-5", children: VEHICLE_TYPES.map((type) => {
              const selected = selectedVehicleTypes.has(type);
              const comingSoon = !AVAILABLE_VEHICLE_TYPE_SET.has(type);
              return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
                if (!comingSoon) handleVehicleTypeToggle(type);
              }, disabled: comingSoon, "aria-disabled": comingSoon, "aria-pressed": comingSoon ? void 0 : selected, className: `group relative flex flex-col items-center justify-center gap-2 rounded-lg border py-3 text-center transition-all duration-150 ${comingSoon ? "cursor-not-allowed border-outline-variant/20 bg-surface-container text-on-surface-variant opacity-50" : selected ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface"}`, children: [
                selected && /* @__PURE__ */ jsx("span", { className: "absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx("svg", { width: "9", height: "9", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
                comingSoon && /* @__PURE__ */ jsx("span", { className: "absolute right-1.5 top-1.5 rounded-full border border-outline-variant/40 bg-surface-container-high px-1.5 py-0.5 text-label-caps font-label-caps text-on-surface-variant", style: {
                  fontSize: "0.55rem"
                }, children: "Soon" }),
                /* @__PURE__ */ jsx("span", { className: "text-xl", children: VEHICLE_TYPE_EMOJI[type] }),
                /* @__PURE__ */ jsx("span", { className: "px-1 text-label-caps font-label-caps leading-tight", children: type })
              ] }, type);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: `rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 ${!hasSelectedVehicleCategory ? "opacity-60" : ""}`, children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "Make" }),
              !hasSelectedVehicleCategory ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-outline-variant/30 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface-variant", children: "Select a vehicle type first." }) : /* @__PURE__ */ jsx(MultiSelectChips, { options: availableMakes, selected: selectedMakes, onToggle: handleMakeToggle, searchable: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 ${selectedMakes.size === 0 ? "opacity-60" : ""}`, children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "Model" }),
              selectedMakes.size === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-outline-variant/30 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface-variant", children: "Select a make first." }) : availableModels.length === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-outline-variant/30 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface-variant", children: "No model list — AI searches all models." }) : /* @__PURE__ */ jsx(MultiSelectChips, { options: availableModels, selected: selectedModels, onToggle: handleModelToggle, searchable: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx(SectionLabel, { children: "Criteria" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Year Range" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("input", { id: "year-from", type: "number", placeholder: "From", min: "1960", max: "2030", value: yearFrom, onChange: (e) => setYearFrom(e.target.value), className: "min-h-9 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" }),
                  /* @__PURE__ */ jsx("span", { className: "shrink-0 text-on-surface-variant", children: "–" }),
                  /* @__PURE__ */ jsx("input", { id: "year-to", type: "number", placeholder: "To", min: "1960", max: "2030", value: yearTo, onChange: (e) => setYearTo(e.target.value), className: "min-h-9 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Max Mileage" }),
                /* @__PURE__ */ jsx(SliderWithInput, { id: "max-mileage", steps: MAX_MILEAGE_STEPS, value: maxMileage, onChange: setMaxMileage, label: "Maximum mileage", formatValue: (n) => `${n.toLocaleString("en-GB")} mi` })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: `mb-1.5 text-label-caps font-label-caps uppercase tracking-widest ${hasError("budget") ? "text-error" : "text-on-surface-variant"}`, children: "Max Budget" }),
                hasError("budget") && /* @__PURE__ */ jsx("p", { className: "mb-1 text-body-sm font-body-sm text-error", children: validationErrors.find((e) => e.field === "budget")?.message }),
                /* @__PURE__ */ jsx(SliderWithInput, { id: "max-price", steps: MAX_PRICE_STEPS, value: maxBudget, onChange: (val) => {
                  setMaxBudget(val);
                  if (validationErrors.length > 0) setValidationErrors((prev) => prev.filter((e) => e.field !== "budget"));
                }, label: "Maximum purchase price", formatValue: (n) => formatPounds(n) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "Search Area" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: SEARCH_AREA_OPTIONS.map((area) => {
                const selected = searchAreas.has(area.value);
                return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => handleSearchAreaToggle(area.value), "aria-pressed": selected, className: `flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-all duration-150 ${selected ? "border-primary bg-primary/10 shadow-sm shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high hover:border-primary/40"}`, children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base", "aria-hidden": "true", children: area.icon }),
                  /* @__PURE__ */ jsx("span", { className: `text-body-sm font-body-sm font-semibold leading-tight ${selected ? "text-primary" : "text-on-surface"}`, children: area.label }),
                  selected && /* @__PURE__ */ jsx("span", { className: "ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx("svg", { width: "8", height: "8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) })
                ] }, area.value);
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `rounded-xl border bg-surface-container-low px-4 py-3 ${hasError("buyingPriority") ? "border-error/60" : "border-outline-variant/30"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx(SectionLabel, { children: "Priority" }),
                hasError("buyingPriority") && /* @__PURE__ */ jsx("span", { className: "text-body-sm font-body-sm text-error", children: validationErrors.find((e) => e.field === "buyingPriority")?.message })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: SEARCH_PRIORITIES.map(({
                label,
                value,
                icon
              }) => {
                const selected = searchPriority === value;
                return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSearchPriority(value), "aria-pressed": selected, className: `relative flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-all duration-150 ${selected ? "border-primary bg-primary/10 shadow-sm shadow-primary/10" : "border-outline-variant/40 bg-surface-container-high hover:border-primary/40"}`, children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base", "aria-hidden": "true", children: icon }),
                  /* @__PURE__ */ jsx("span", { className: `text-body-sm font-body-sm font-semibold leading-tight ${selected ? "text-primary" : "text-on-surface"}`, children: label }),
                  selected && /* @__PURE__ */ jsx("span", { className: "ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary", children: /* @__PURE__ */ jsx("svg", { width: "8", height: "8", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) })
                ] }, value);
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/25 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high px-4 py-3 shadow-md shadow-primary/8", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx(SectionLabel, { children: "AI Intelligence" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setAiIntelligence(new Set(AI_INTELLIGENCE_OPTIONS.map((o) => o.value))), className: "rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-label-caps font-label-caps text-primary transition-colors hover:bg-primary/20", children: "All" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setAiIntelligence(/* @__PURE__ */ new Set()), className: "rounded-full border border-outline-variant/40 bg-surface-container-high px-2.5 py-0.5 text-label-caps font-label-caps text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-surface", children: "None" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2", children: AI_INTELLIGENCE_OPTIONS.map((opt) => {
              const enabled = aiIntelligence.has(opt.value);
              return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => handleAiToggle(opt.value), "aria-pressed": enabled, className: `flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all duration-150 ${enabled ? "border-primary/30 bg-surface-container-high shadow-sm shadow-primary/5" : "border-outline-variant/20 bg-surface-container opacity-60"}`, children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg", "aria-hidden": "true", children: opt.icon }),
                /* @__PURE__ */ jsx("span", { className: "flex flex-1 flex-col gap-0.5", children: /* @__PURE__ */ jsx("span", { className: `text-body-sm font-body-sm font-semibold ${enabled ? "text-on-surface" : "text-on-surface-variant"}`, children: opt.label }) }),
                /* @__PURE__ */ jsx("span", { className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 transition-colors duration-200 ${enabled ? "border-primary bg-primary" : "border-outline-variant/40 bg-surface-container"}`, "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: `inline-block h-3 w-3 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? "translate-x-4" : "translate-x-0.5"}` }) })
              ] }, opt.value);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            validationErrors.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-3 rounded-lg border border-error/40 bg-error/8 px-3 py-2.5", role: "alert", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 text-label-caps font-label-caps uppercase tracking-widest text-error", children: "Please complete the following:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-0.5", children: validationErrors.map((err) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-1.5 text-body-sm font-body-sm text-error", children: [
                /* @__PURE__ */ jsx("span", { className: "mt-px shrink-0", "aria-hidden": "true", children: "•" }),
                err.message
              ] }, err.field)) })
            ] }),
            /* @__PURE__ */ jsxs("button", { ref: deployButtonRef, type: "button", onClick: handleDeploy, className: "flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-3 text-body-lg font-body-lg font-semibold text-on-primary shadow-xl shadow-primary/25 transition-all duration-200 hover:brightness-110 active:scale-[0.98]", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "⚡" }),
              "Launch AI Search Mission"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-body-sm font-body-sm text-on-surface-variant", children: "Your AI agent begins monitoring the market immediately." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "mt-3 lg:col-start-2 lg:row-start-1 lg:mt-0", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 lg:sticky lg:top-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Mission Readiness" }),
              /* @__PURE__ */ jsxs("span", { className: "text-body-md font-body-md font-bold text-on-surface", children: [
                missionReadiness,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high", children: /* @__PURE__ */ jsx("div", { className: "h-1.5 rounded-full bg-primary transition-all duration-500", style: {
              width: `${missionReadiness}%`
            }, role: "progressbar", "aria-valuenow": missionReadiness, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": `Mission readiness: ${missionReadiness}% complete` }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-body-sm font-body-sm text-on-surface-variant", children: missionReadiness === 100 ? "✅ Ready to launch." : "Complete the mission brief to launch." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Live Intelligence" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(MetricRow, { label: "Daily Opportunities", value: estimatedDailyOpps !== null ? `~${estimatedDailyOpps} vehicles` : "—", active: estimatedDailyOpps !== null }),
              /* @__PURE__ */ jsx(MetricRow, { label: "Mission Strength", value: missionStrength ? missionStrength.label : "—", valueClass: missionStrength ? missionStrength.color : void 0, active: missionStrength !== null }),
              /* @__PURE__ */ jsx(MetricRow, { label: "Expected Avg. Profit", value: expectedProfit ?? "—", active: expectedProfit !== null }),
              /* @__PURE__ */ jsx(MetricRow, { label: "Competition Level", value: competitionLevel ? competitionLevel.label : "—", valueClass: competitionLevel ? competitionLevel.color : void 0, active: competitionLevel !== null }),
              /* @__PURE__ */ jsx(MetricRow, { label: "AI Confidence", value: aiConfidence > 0 ? `${aiConfidence}%` : "—", active: aiConfidence > 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "Mission Summary" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: [{
              label: "Vehicle",
              value: vehicleSummary
            }, {
              label: "Budget",
              value: maxBudget ? `Up to ${formatPounds(maxBudget)}` : "Not set"
            }, {
              label: "Max Mileage",
              value: maxMileage ? `${Number(maxMileage).toLocaleString("en-GB")} mi` : "Any"
            }, {
              label: "Year",
              value: yearFrom || yearTo ? `${yearFrom || "Any"} – ${yearTo || "Any"}` : "Any"
            }, {
              label: "Search Area",
              value: searchAreas.size > 0 ? [...searchAreas].map((v) => SEARCH_AREA_OPTIONS.find((o) => o.value === v)?.label ?? v).join(", ") : "Not set"
            }, {
              label: "Priority",
              value: SEARCH_PRIORITIES.find((p) => p.value === searchPriority)?.label ?? "Not set"
            }, {
              label: "AI Features",
              value: `${aiIntelligence.size}/${AI_INTELLIGENCE_OPTIONS.length} enabled`
            }].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "shrink-0 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: item.label }),
              /* @__PURE__ */ jsx("p", { className: "break-words text-right text-body-sm font-body-sm font-semibold text-on-surface", children: item.value })
            ] }, item.label)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-primary/25 bg-primary/8 px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-primary", children: "What happens next?" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: ["Mission created and confirmed.", "AI validates your criteria.", "AI connects to market sources.", "Opportunities ranked by priority.", "Best vehicles in your buying report."].map((step) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-1.5 text-body-sm font-body-sm text-on-surface-variant", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-px shrink-0 text-primary", "aria-hidden": "true", children: "•" }),
              step
            ] }, step)) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("button", { "aria-label": "Back to top", className: "back-to-top-btn", onClick: scrollToTop, style: {
        opacity: showBackToTop ? 1 : 0,
        pointerEvents: showBackToTop ? "auto" : "none"
      }, type: "button", children: /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", fill: "none", height: "26", viewBox: "0 0 24 24", width: "26", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M5 15l7-7 7 7", stroke: "white", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5" }) }) })
    ] }),
    deployedMission && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[200] flex items-center justify-center p-4", role: "dialog", "aria-modal": "true", "aria-labelledby": "mission-success-title", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-lg rounded-2xl border border-primary/30 bg-surface-container p-6 shadow-2xl shadow-primary/15 sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10", children: /* @__PURE__ */ jsx("span", { className: "text-3xl", "aria-hidden": "true", children: "⚡" }) }),
          /* @__PURE__ */ jsx("h2", { id: "mission-success-title", className: "text-headline-lg font-headline-lg text-on-surface", children: "Mission Created Successfully" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-body-md font-body-md text-on-surface-variant", children: "Your AI agent is now monitoring the market." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Mission ID" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-body-md font-semibold text-primary", children: deployedMission.missionId })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-body-md font-semibold text-on-surface", children: deployedMission.status })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Vehicle" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-body-md font-semibold text-on-surface", children: vehicleSummary })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant", children: "Budget" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-body-md font-body-md font-semibold text-on-surface", children: deployedMission.budget ? `Up to ${formatPounds(deployedMission.budget)}` : "Not specified" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:brightness-110", children: "Return to Dealer Command Centre" }),
          /* @__PURE__ */ jsx(Link, { to: "/opportunity", className: "flex min-h-11 w-full items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary", children: "View AI Buying Report" })
        ] })
      ] })
    ] })
  ] });
}
export {
  SearchBuilderPage as component
};
