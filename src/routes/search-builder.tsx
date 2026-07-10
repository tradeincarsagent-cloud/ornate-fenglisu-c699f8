import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'

export const Route = createFileRoute('/search-builder')({
  component: SearchBuilderPage,
})

const VEHICLE_TYPES = ['Cars', 'Classic Cars', 'Pickups', 'Vans & Light Commercial', 'Motorcycles'] as const
type VehicleType = (typeof VEHICLE_TYPES)[number]

const VEHICLE_TYPE_EMOJI: Record<VehicleType, string> = {
  'Cars': '🚗',
  'Classic Cars': '🏎️',
  'Pickups': '🛻',
  'Vans & Light Commercial': '🚐',
  'Motorcycles': '🏍️',
}

const UK_MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Citroen', 'Dacia',
  'DS', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep',
  'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Maserati', 'Mazda',
  'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche',
  'Renault', 'Rolls-Royce', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Tesla',
  'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo',
]

const MODELS_BY_MAKE: Record<string, string[]> = {
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Giulietta', '147', '156', '159', 'Spider', '4C'],
  'Aston Martin': ['DB11', 'DB12', 'Vantage', 'DBS', 'DBX'],
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'e-tron', 'e-tron GT'],
  'Bentley': ['Continental GT', 'Bentayga', 'Flying Spur', 'Continental GTC', 'Mulsanne'],
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'iX', 'i4', 'i5', 'i7'],
  'Citroen': ['C1', 'C3', 'C4', 'C5 X', 'Berlingo', 'Grand C4', 'Picasso', 'C3 Aircross', 'C5 Aircross'],
  'Dacia': ['Sandero', 'Duster', 'Logan', 'Jogger', 'Spring'],
  'DS': ['DS 3', 'DS 4', 'DS 7', 'DS 9', 'DS 3 Crossback'],
  'Ferrari': ['488', 'F8', 'SF90', 'Roma', '296', 'Portofino', 'California', 'GTC4Lusso'],
  'Fiat': ['500', '500X', '500L', 'Panda', 'Tipo', 'Punto', 'Bravo'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Puma', 'Mustang', 'Mustang Mach-E', 'Explorer', 'Galaxy', 'S-Max', 'EcoSport', 'Edge', 'Ranger', 'Transit'],
  'Honda': ['Civic', 'Jazz', 'CR-V', 'HR-V', 'e', 'ZR-V', 'Accord', 'Legend', 'FR-V'],
  'Hyundai': ['i10', 'i20', 'i30', 'IONIQ', 'IONIQ 5', 'IONIQ 6', 'Tucson', 'Santa Fe', 'Kona'],
  'Jaguar': ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'],
  'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Avenger'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Niro', 'Stinger', 'EV6', 'EV9', 'Sorento'],
  'Lamborghini': ['Huracán', 'Aventador', 'Urus', 'Gallardo', 'Revuelto'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Freelander'],
  'Lexus': ['CT', 'IS', 'ES', 'GS', 'LS', 'NX', 'RX', 'UX', 'LX', 'RC', 'LC'],
  'Maserati': ['Ghibli', 'Quattroporte', 'Levante', 'Grecale', 'GranTurismo'],
  'Mazda': ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-30', 'CX-60', 'MX-5', 'MX-30'],
  'Mercedes-Benz': ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS'],
  'MG': ['MG3', 'MG5', 'MG ZS', 'MG HS', 'MG4', 'MG ZS EV'],
  'Mini': ['Hatch', 'Convertible', 'Clubman', 'Countryman', 'Paceman', 'Roadster', 'Cooper'],
  'Mitsubishi': ['Outlander', 'Eclipse Cross', 'L200', 'ASX', 'Colt'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya', 'GT-R', '370Z', 'Navara'],
  'Peugeot': ['108', '208', '308', '408', '508', '2008', '3008', '5008', 'e-208', 'e-2008'],
  'Porsche': ['911', 'Boxster', 'Cayman', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Koleos', 'Zoe', 'Scenic', 'Laguna'],
  'Rolls-Royce': ['Ghost', 'Phantom', 'Wraith', 'Dawn', 'Cullinan', 'Spectre'],
  'Seat': ['Ibiza', 'Leon', 'Ateca', 'Arona', 'Tarraco', 'Mii'],
  'Skoda': ['Fabia', 'Octavia', 'Superb', 'Karoq', 'Kodiaq', 'Enyaq', 'Scala', 'Kamiq'],
  'Subaru': ['Impreza', 'Outback', 'Forester', 'XV', 'Legacy', 'WRX', 'BRZ', 'Solterra'],
  'Suzuki': ['Swift', 'Vitara', 'S-Cross', 'Ignis', 'Jimny', 'Baleno'],
  'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
  'Toyota': ['Aygo', 'Yaris', 'Corolla', 'Camry', 'RAV4', 'C-HR', 'Highlander', 'GR86', 'Supra', 'Prius', 'Land Cruiser', 'Hilux', 'Proace'],
  'Vauxhall': ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Vivaro', 'Movano'],
  'Volkswagen': ['Polo', 'Golf', 'Passat', 'Arteon', 'T-Roc', 'T-Cross', 'Tiguan', 'Touareg', 'ID.3', 'ID.4', 'ID.5', 'Touran', 'Sharan'],
  'Volvo': ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90', 'C40', 'EX30', 'EX90'],
}

const CLASSIC_MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Austin', 'Bentley', 'Chevrolet', 'Ferrari',
  'Ford', 'Jaguar', 'Mercedes-Benz', 'MG', 'Morris', 'Porsche',
  'Rolls-Royce', 'Triumph', 'Volkswagen',
]

const CLASSIC_MODELS_BY_MAKE: Record<string, string[]> = {
  'Alfa Romeo': ['Giulietta Spider', 'Giulia Sprint', '2000 Spider', '1750 GTV', 'Spider Series 1'],
  'Aston Martin': ['DB4', 'DB5', 'DB6', 'DB2', 'Vantage'],
  'Austin': ['Healey 3000', 'Healey Sprite', 'A40', 'A35', 'Cambridge'],
  'Bentley': ['S1', 'S2', 'S3', 'R-Type', 'Continental S1'],
  'Chevrolet': ['Corvette C1', 'Corvette C2', 'Corvette C3', 'Camaro', 'Bel Air'],
  'Ferrari': ['250 GTE', '250 GT', '275 GTB', '308 GTB', '328'],
  'Ford': ['Mustang', 'Capri', 'Escort Mk1', 'Escort Mk2', 'Cortina'],
  'Jaguar': ['E-Type', 'XK120', 'XK140', 'XK150', 'XJ6'],
  'Mercedes-Benz': ['300SL', 'Pagoda SL', 'W108', 'W123', '190SL'],
  'MG': ['MGA', 'MGB', 'Midget', 'Magnette', 'T-Type'],
  'Morris': ['Minor', 'Oxford', 'Marina', '1000', 'Isis'],
  'Porsche': ['356', '911 Classic', '912', '914', '928'],
  'Rolls-Royce': ['Silver Shadow', 'Silver Cloud', 'Silver Wraith', 'Corniche', 'Silver Seraph'],
  'Triumph': ['TR3', 'TR4', 'TR6', 'TR7', 'Spitfire'],
  'Volkswagen': ['Beetle', 'Karmann Ghia', 'Type 3', 'Transporter T1', 'Transporter T2'],
}

const FUEL_TYPES = ['Any', 'Petrol', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric', 'Mild Hybrid'] as const
const TRANSMISSION_TYPES = ['Any', 'Automatic', 'Manual', 'Semi-Automatic'] as const
const SERVICE_HISTORY_OPTIONS = ['Any', 'Full Service History', 'Part Service History', 'No Service History'] as const

const NOTIFICATION_OPTIONS = [
  {
    value: 'instant',
    emoji: '⚡',
    label: 'Instant Alerts',
    description: 'Notify me immediately when TICA finds a high-confidence buying opportunity.',
  },
  {
    value: 'morning',
    emoji: '🌅',
    label: 'Morning Intelligence Briefing',
    description: 'Receive a summary of overnight opportunities before your working day begins.',
  },
  {
    value: 'evening',
    emoji: '🌆',
    label: 'Evening Market Summary',
    description: "Receive a summary of the day's best opportunities.",
  },
  {
    value: 'weekly',
    emoji: '📊',
    label: 'Weekly Intelligence Report',
    description: 'Receive a weekly overview of opportunities and market trends.',
  },
] as const

const SEARCH_PRIORITIES = [
  { label: 'Maximum Profit', value: 'maximum-profit', description: 'Focus on opportunities with the highest expected margin.' },
  { label: 'Fastest Sale', value: 'fastest-sale', description: 'Prioritise vehicles likely to sell quickly in your market.' },
  { label: 'Best Value', value: 'best-value', description: 'Balance purchase price against strong retail potential.' },
  { label: 'Rare Opportunity', value: 'rare-opportunity', description: 'Surface harder-to-find stock with standout demand.' },
  { label: 'Balanced', value: 'balanced', description: 'Combine margin, speed, and demand for all-round results.' },
] as const

const SELECT_MAKE_OPTION = '— Select Make —'
const SELECT_MODEL_OPTION = '— Select Model —'
const OTHER_MAKE_OPTION = 'Other / Enter Make'
const OTHER_MODEL_OPTION = 'Other / Enter Model'

const PHASE_ONE_SOURCES = [
  'Auto Trader',
  'Dealer Network',
  'UK Public Vehicle Listings',
  'Dealer Websites',
  'Classified Vehicle Websites',
] as const
const PLANNED_INTEGRATIONS = [
  'Facebook Marketplace',
  'Auctions',
  'Private Sellers',
  'Trade Feeds',
  'Vehicle History Providers',
] as const

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function StepMarker({ step }: { step: string }) {
  return (
    <p className="mb-3">
      <span className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-label-caps font-label-caps text-primary">{step}</span>
    </p>
  )
}

function SearchableCombobox({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  clearOptionLabel,
}: {
  id: string
  options: string[]
  value: string
  onChange: (val: string) => void
  placeholder: string
  disabled?: boolean
  clearOptionLabel?: string
}) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const normalizedQuery = query.trim().toLowerCase()
  const normalizedValue = value.trim().toLowerCase()
  const showAllOptions = normalizedQuery === '' || normalizedQuery === normalizedValue

  const filtered = showAllOptions
    ? options
    : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        if (!options.includes(query)) {
          setQuery(value)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value, query, options])

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={query}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          if (e.target.value === '') onChange('')
        }}
        onFocus={() => { if (!disabled) setOpen(true) }}
        className={`min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 pr-10 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </span>
      {open && !disabled && filtered.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-outline-variant/40 bg-surface-container-high shadow-lg"
        >
          {clearOptionLabel && (
            <li
              role="option"
              aria-selected={value === ''}
              onMouseDown={() => {
                onChange('')
                setQuery('')
                setOpen(false)
              }}
              className={`cursor-pointer px-4 py-2.5 text-body-md font-body-md transition-colors hover:bg-primary/10 hover:text-primary ${
                value === '' ? 'bg-primary/10 text-primary' : 'text-on-surface'
              }`}
            >
              {clearOptionLabel}
            </li>
          )}
          {filtered.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onMouseDown={() => {
                onChange(option)
                setQuery(option)
                setOpen(false)
              }}
              className={`cursor-pointer px-4 py-2.5 text-body-md font-body-md transition-colors hover:bg-primary/10 hover:text-primary ${
                value === option ? 'bg-primary/10 text-primary' : 'text-on-surface'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SearchBuilderPage() {
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null)
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  const [maxBudget, setMaxBudget] = useState('')
  const [maxMileage, setMaxMileage] = useState('')
  const [minProfit, setMinProfit] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [serviceHistory, setServiceHistory] = useState('')
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [searchPriority, setSearchPriority] = useState<(typeof SEARCH_PRIORITIES)[number]['value'] | null>(null)
  const [notifications, setNotifications] = useState<Set<string>>(new Set())
  const [missionCreated, setMissionCreated] = useState(false)
  const [manualMake, setManualMake] = useState('')
  const [manualModel, setManualModel] = useState('')

  const isClassic = selectedVehicleType === 'Classic Cars'
  const isOtherMake = make === OTHER_MAKE_OPTION
  const baseClassicModels = isClassic && !isOtherMake && make && CLASSIC_MODELS_BY_MAKE[make] ? CLASSIC_MODELS_BY_MAKE[make] : []
  const baseRegularModels = !isClassic && !isOtherMake && make && MODELS_BY_MAKE[make] ? MODELS_BY_MAKE[make] : []
  const baseModelOptions = isClassic ? baseClassicModels : baseRegularModels
  const makeOptions = [...(isClassic ? CLASSIC_MAKES : UK_MAKES), OTHER_MAKE_OPTION]
  const modelOptions = make ? [...baseModelOptions, OTHER_MODEL_OPTION] : []

  const isOtherModel = model === OTHER_MODEL_OPTION

  const handleVehicleTypeChange = (type: VehicleType) => {
    setSelectedVehicleType(type)
    setMake('')
    setModel('')
    setManualMake('')
    setManualModel('')
  }

  const handleMakeChange = (val: string) => {
    setMake(val)
    setModel('')
    setManualMake('')
    setManualModel('')
  }

  const handleModelChange = (val: string) => {
    setModel(val)
    if (val !== OTHER_MODEL_OPTION) setManualModel('')
  }

  const selectedNotificationLabels = NOTIFICATION_OPTIONS.filter((o) => notifications.has(o.value)).map((o) => o.label)
  const selectedNotificationSummary = selectedNotificationLabels.length > 0 ? selectedNotificationLabels.join(', ') : 'Not selected'
  const effectiveMake = isOtherMake ? manualMake : make
  const effectiveModel = isOtherModel ? manualModel : model
  const missionNameBase = [effectiveMake.trim(), effectiveModel.trim()].filter(Boolean).join(' ')
  const missionName = missionNameBase || selectedVehicleType || 'Vehicle Search'

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Finder', href: '/search-builder', active: true },
        { label: 'AI Buying Report', href: '/opportunity' },
        { label: 'Settings', isSectionLabel: true },
        { label: 'Notification Preferences', href: '/settings' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max">
        {/* ── Page title ──────────────────────────────────────────────── */}
        <div className="mb-5 md:mb-8">
          <div className="mb-3 flex items-start justify-between gap-4">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">AI Search Finder</p>
            <div className="shrink-0">
              <TicaShield />
            </div>
          </div>
          <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">Create Your AI Search in Under 60 Seconds</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Tell TICA exactly what you're looking for and let your AI Search Finder work 24/7 to discover the best buying opportunities before everyone else.</p>
        </div>

        {/* ── Powered by TICA Intelligence ────────────────────────────── */}
        <div className="mb-5 md:mb-8">
          <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary">Powered by TICA Intelligence</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {/* TICA Smart Learning™ */}
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/8 px-4 py-4 sm:px-5">
              <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">🧠</span>
              <div>
                <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">TICA Smart Learning™</p>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Learns your vehicle preferences, budgets, locations and buying priorities so future searches become more relevant.</p>
              </div>
            </div>
            {/* Opportunity Intelligence™ */}
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/8 px-4 py-4 sm:px-5">
              <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">📊</span>
              <div>
                <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">Opportunity Intelligence™</p>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Analyses vehicle pricing, demand, potential margin and market activity to identify stronger buying opportunities.</p>
              </div>
            </div>
            {/* TICA Decision Engine™ */}
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/8 px-4 py-4 sm:px-5">
              <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">⚡</span>
              <div>
                <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">TICA Decision Engine™</p>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Turns market analysis into clear recommendations and explains why an opportunity should be reviewed, watched, bought or passed.</p>
              </div>
            </div>
            {/* TICA Certified™ */}
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/8 px-4 py-4 sm:px-5">
              <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">✅</span>
              <div>
                <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">TICA Certified™</p>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Marks opportunities that have completed TICA's analysis and meet the required confidence and buying criteria.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-8">
          {/* ── Section 1: Vehicle Type ──────────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
            <div className="mb-5">
              <StepMarker step="01" />
              <h2 className="text-headline-md font-headline-md text-on-surface">What would you like me to find?</h2>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">Choose the makes and models you want TICA to monitor.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {VEHICLE_TYPES.map((type) => {
                const selected = selectedVehicleType === type
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleVehicleTypeChange(type)}
                    className={`group relative flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border p-5 text-center transition-all duration-200 sm:min-h-32 sm:p-6 ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                        : 'border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                    aria-pressed={selected}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary">
                        <CheckIcon />
                      </span>
                    )}
                    <span className="text-2xl">
                      {VEHICLE_TYPE_EMOJI[type]}
                    </span>
                    <span className="text-body-md font-body-md font-semibold">{type}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Section 2: Vehicle Details ───────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
            <div className="mb-5">
              <StepMarker step="02" />
              <h2 className="text-headline-md font-headline-md text-on-surface">Tell me a bit more about it</h2>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">
                Set your buying budget and minimum profit target so TICA only finds opportunities that match your goals.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="make">Make</label>
                <SearchableCombobox
                  id="make"
                  options={makeOptions}
                  value={make}
                  onChange={handleMakeChange}
                  placeholder={SELECT_MAKE_OPTION}
                  clearOptionLabel={SELECT_MAKE_OPTION}
                />
                {isOtherMake && (
                  <input
                    id="manual-make"
                    type="text"
                    placeholder="Enter Make"
                    value={manualMake}
                    onChange={(e) => setManualMake(e.target.value)}
                    className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="model">Model</label>
                <SearchableCombobox
                  id="model"
                  options={modelOptions}
                  value={model}
                  onChange={handleModelChange}
                  placeholder={make ? SELECT_MODEL_OPTION : 'Select a make first'}
                  clearOptionLabel={SELECT_MODEL_OPTION}
                  disabled={!make || modelOptions.length === 0}
                />
                {isOtherModel && (
                  <input
                    id="manual-model"
                    type="text"
                    placeholder="Enter Model"
                    value={manualModel}
                    onChange={(e) => setManualModel(e.target.value)}
                    className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="max-budget">Maximum Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant">£</span>
                  <input
                    id="max-budget"
                    type="number"
                    placeholder="e.g. 30000"
                    min="0"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3 xl:col-span-1">
                <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="min-profit">Minimum Estimated Profit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body-md font-body-md text-on-surface-variant">£</span>
                  <input
                    id="min-profit"
                    type="number"
                    placeholder="e.g. 1500"
                    min="0"
                    value={minProfit}
                    onChange={(e) => setMinProfit(e.target.value)}
                    className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high py-3 pl-8 pr-4 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
            </div>

            {/* ── Advanced Filters ─────────────────────────────────────── */}
            <div className="mt-5 rounded-xl border border-outline-variant/30 bg-surface-container-high">
              <button
                type="button"
                onClick={() => setAdvancedOpen((o) => !o)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={advancedOpen}
              >
                <span className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Advanced Filters</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`shrink-0 text-on-surface-variant transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {advancedOpen && (
                <div className="border-t border-outline-variant/30 px-5 pb-5 pt-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="year-from">Year From</label>
                      <input
                        id="year-from"
                        type="number"
                        placeholder="e.g. 2018"
                        min="1990"
                        max="2030"
                        value={yearFrom}
                        onChange={(e) => setYearFrom(e.target.value)}
                        className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="year-to">Year To</label>
                      <input
                        id="year-to"
                        type="number"
                        placeholder="e.g. 2024"
                        min="1990"
                        max="2030"
                        value={yearTo}
                        onChange={(e) => setYearTo(e.target.value)}
                        className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="max-mileage">Maximum Mileage</label>
                      <input
                        id="max-mileage"
                        type="number"
                        placeholder="e.g. 60000"
                        min="0"
                        value={maxMileage}
                        onChange={(e) => setMaxMileage(e.target.value)}
                        className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="fuel-type">Fuel Type</label>
                      <select
                        id="fuel-type"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                      >
                        {FUEL_TYPES.map((ft) => (
                          <option key={ft} value={ft === 'Any' ? '' : ft}>{ft}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="transmission">Transmission</label>
                      <select
                        id="transmission"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                      >
                        {TRANSMISSION_TYPES.map((tt) => (
                          <option key={tt} value={tt === 'Any' ? '' : tt}>{tt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="service-history">Service History</label>
                      <select
                        id="service-history"
                        value={serviceHistory}
                        onChange={(e) => setServiceHistory(e.target.value)}
                        className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-3 text-body-md font-body-md text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                      >
                        {SERVICE_HISTORY_OPTIONS.map((sh) => (
                          <option key={sh} value={sh === 'Any' ? '' : sh}>{sh}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ── Section 3: Search Priority ───────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
            <div className="mb-5">
              <StepMarker step="03" />
              <h2 className="text-headline-md font-headline-md text-on-surface">Search Priority</h2>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">
                Tell TICA how to rank opportunities for this mission.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {SEARCH_PRIORITIES.map(({ label, value, description }) => {
                const selected = searchPriority === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSearchPriority(value)}
                    aria-pressed={selected}
                    className={`relative flex min-h-24 flex-col items-start justify-center rounded-xl border px-4 py-4 text-left transition-all duration-200 ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                        : 'border-outline-variant/40 bg-surface-container-high text-on-surface hover:border-primary/40'
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-on-primary">
                        <CheckIcon />
                      </span>
                    )}
                    <span className="text-body-md font-body-md font-semibold">{label}</span>
                    <span className={`mt-1 text-body-sm font-body-sm ${selected ? 'text-primary/90' : 'text-on-surface-variant'}`}>
                      {description}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Section 4: Search Sources ────────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
            <div className="mb-5">
              <StepMarker step="04" />
              <h2 className="text-headline-md font-headline-md text-on-surface">Where should I search?</h2>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">Select the marketplaces and locations TICA should scan.</p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary">Available / Phase 1</p>
                <div className="space-y-3">
                  {PHASE_ONE_SOURCES.map((source) => (
                    <div
                      key={source}
                      className="flex items-center gap-4 rounded-xl border border-primary/20 bg-surface-container-high px-4 py-3.5 shadow-sm shadow-primary/5"
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-primary bg-primary text-on-primary" aria-hidden="true">
                        <CheckIcon />
                      </span>
                      <span className="flex-1 text-body-md font-body-md text-on-surface">{source}</span>
                      <span className="flex-shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-label-caps font-label-caps text-primary">Phase 1</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Planned Integrations</p>
                <div className="space-y-3">
                  {PLANNED_INTEGRATIONS.map((source) => (
                    <div
                      key={source}
                      className="flex cursor-not-allowed items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container px-4 py-3.5 opacity-60"
                      aria-disabled="true"
                    >
                      <span
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-outline-variant/40 bg-transparent"
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-body-md font-body-md text-on-surface-variant">{source}</span>
                      <span className="flex-shrink-0 rounded-full border border-outline-variant/40 bg-surface-container-high px-3 py-1 text-label-caps font-label-caps text-on-surface-variant">Coming Soon</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3.5">
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Trade in Cars Agent is being designed to search connected marketplaces, dealer sources and trusted public vehicle listings. Some integrations will be released in later platform phases.
                </p>
              </div>
            </div>
          </section>

          {/* ── Section 5: Notification Preferences ──────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
            <div className="mb-5">
              <StepMarker step="05" />
              <h2 className="text-headline-md font-headline-md text-on-surface">🔔 How Would You Like TICA to Keep You Updated?</h2>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">Select one or more notification preferences.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {NOTIFICATION_OPTIONS.map(({ value, emoji, label, description }) => {
                const selected = notifications.has(value)
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setNotifications((prev) => {
                        const next = new Set(prev)
                        if (next.has(value)) next.delete(value)
                        else next.add(value)
                        return next
                      })
                    }}
                    aria-pressed={selected}
                    className={`relative flex flex-col items-start gap-2 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                      selected
                        ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                        : 'border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
                    }`}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary">
                        <CheckIcon />
                      </span>
                    )}
                    <span className="text-2xl">{emoji}</span>
                    <span className="text-body-md font-body-md font-semibold leading-snug">{label}</span>
                    <span className={`text-body-sm font-body-sm leading-snug ${selected ? 'text-primary/80' : 'text-on-surface-variant'}`}>{description}</span>
                  </button>
                )
              })}
            </div>
            {/* Information panel */}
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/6 px-5 py-4">
              <p className="mb-1 text-label-caps font-label-caps uppercase tracking-widest text-primary">About TICA Monitoring</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                TICA works continuously, 24 hours a day, monitoring the market for opportunities.
              </p>
              <p className="mt-1.5 text-body-sm font-body-sm text-on-surface-variant">
                These settings only control how and when you would like your AI employee to keep you informed.
              </p>
            </div>
          </section>

          {/* ── Section 6: Activate ──────────────────────────────────── */}
          <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 text-center sm:p-6 md:p-8">
            <div className="mb-6 hidden rounded-2xl border border-outline-variant/30 bg-surface-container-high p-6 text-left md:block">
              <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Your AI Search Summary</p>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">TICA understands your requirements.</p>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Looking for:</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">BMW M3 Competition</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Maximum Budget:</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">£40,000</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Search Area:</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">United Kingdom</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Minimum Profit:</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">£3,000</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Notifications:</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{selectedNotificationSummary}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-3">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Search Sources:</p>
                  <ul className="mt-2 space-y-1 text-body-md font-body-md text-on-surface">
                    <li>Auto Trader</li>
                    <li>Dealer Auctions</li>
                    <li>Facebook Marketplace</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* ── What Happens Next panel ──────────────────────────────── */}
            <div className="mx-auto mb-5 w-full max-w-md rounded-xl border border-primary/25 bg-primary/8 px-5 py-4">
              <p className="mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-primary">What Happens Next?</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Once you start your AI Search Finder, TICA will continuously monitor your selected marketplaces, analyse new listings, compare market values, and notify you whenever a high-confidence opportunity matches your buying strategy.</p>
            </div>
            <button
              type="button"
              onClick={() => setMissionCreated(true)}
              className="mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 sm:py-5 text-headline-md font-headline-md text-on-primary shadow-lg shadow-primary/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <span>⚡</span>
              Start AI Search Mission
            </button>
            <p className="mt-4 text-body-md font-body-md text-on-surface-variant">
              Live AI scanning will be available in a future platform release.
            </p>
          </section>

          {missionCreated && (
            <section className="dashboard-border rounded-2xl border border-primary/30 bg-surface-container p-4 sm:p-6 md:p-8" aria-live="polite">
              <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Mission Created</p>
              <h2 className="mt-2 text-headline-lg font-headline-lg text-on-surface">AI Search Mission Created</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Mission Name</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{missionName}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Status</p>
                  <p className="mt-2 text-body-md font-body-md text-primary">Active</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Notification Preferences</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{selectedNotificationSummary}</p>
                </div>
                <div className="rounded-xl border border-outline-variant/30 bg-surface-container-high p-4">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Search Sources</p>
                  <p className="mt-2 text-body-md font-body-md text-on-surface">{PHASE_ONE_SOURCES.join(', ')}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary transition-all hover:brightness-110"
                >
                  Return to Dealer Command Centre
                </Link>
                <Link
                  to="/opportunity"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary"
                >
                  View AI Buying Report
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </PlatformShell>
  )
}
