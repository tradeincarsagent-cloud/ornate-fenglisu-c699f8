import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PlatformShell } from '../components/PlatformShell'
import { TicaShield } from '../components/TicaShield'
import {
  type TicaMission,
  type ValidationError,
  validateMissionInput,
  createMission,
  saveMission,
} from '../lib/mission'

export const Route = createFileRoute('/search-builder')({
  component: SearchBuilderPage,
})

const AVAILABLE_VEHICLE_TYPES = ['Cars', 'Classic Cars', 'Pickups', 'Vans & Light Commercials'] as const
const COMING_SOON_VEHICLE_TYPES = ['Motorcycles'] as const
const VEHICLE_TYPES = [...AVAILABLE_VEHICLE_TYPES, ...COMING_SOON_VEHICLE_TYPES] as const
type VehicleType = (typeof VEHICLE_TYPES)[number]
type AvailableVehicleType = (typeof AVAILABLE_VEHICLE_TYPES)[number]

const AVAILABLE_VEHICLE_TYPE_SET = new Set<VehicleType>(AVAILABLE_VEHICLE_TYPES)

const VEHICLE_TYPE_EMOJI: Record<VehicleType, string> = {
  'Cars': '🚗',
  'Classic Cars': '🏎️',
  'Pickups': '🛻',
  'Vans & Light Commercials': '🚐',
  'Motorcycles': '🏍️',
}

const CAR_MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Citroen', 'Dacia',
  'DS', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep',
  'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Maserati', 'Mazda',
  'Mercedes-Benz', 'MG', 'Mini', 'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche',
  'Renault', 'Rolls-Royce', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Tesla',
  'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo',
]

const CAR_MODELS_BY_MAKE: Record<string, string[]> = {
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

const PICKUP_MAKES = ['Ford', 'Isuzu', 'Maxus', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Toyota', 'Volkswagen']

const PICKUP_MODELS_BY_MAKE: Record<string, string[]> = {
  'Ford': ['Ranger', 'Ranger Raptor'],
  'Isuzu': ['D-Max', 'D-Max AT35'],
  'Maxus': ['T90EV'],
  'Mercedes-Benz': ['X-Class'],
  'Mitsubishi': ['L200', 'L200 Barbarian'],
  'Nissan': ['Navara', 'Navara N-Guard'],
  'Toyota': ['Hilux', 'Hilux Invincible'],
  'Volkswagen': ['Amarok', 'Amarok Aventura'],
}

const VAN_LIGHT_COMMERCIAL_MAKES = ['Citroen', 'Fiat', 'Ford', 'Iveco', 'MAN', 'Maxus', 'Mercedes-Benz', 'Nissan', 'Peugeot', 'Renault', 'Toyota', 'Vauxhall', 'Volkswagen']

const VAN_LIGHT_COMMERCIAL_MODELS_BY_MAKE: Record<string, string[]> = {
  'Citroen': ['Berlingo Van', 'Dispatch', 'Relay'],
  'Fiat': ['Doblo', 'Scudo', 'Ducato'],
  'Ford': ['Transit Courier', 'Transit Connect', 'Transit Custom', 'Transit'],
  'Iveco': ['Daily'],
  'MAN': ['TGE'],
  'Maxus': ['eDeliver 3', 'eDeliver 7', 'eDeliver 9', 'Deliver 9'],
  'Mercedes-Benz': ['Citan', 'Vito', 'Sprinter'],
  'Nissan': ['Townstar', 'Primastar', 'Interstar'],
  'Peugeot': ['Partner', 'Expert', 'Boxer'],
  'Renault': ['Kangoo', 'Trafic', 'Master'],
  'Toyota': ['Proace City', 'Proace', 'Proace Max'],
  'Vauxhall': ['Combo Cargo', 'Vivaro', 'Movano'],
  'Volkswagen': ['Caddy Cargo', 'Transporter', 'Crafter'],
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

const MOTORCYCLE_MAKES = ['Aprilia', 'BMW Motorrad', 'Ducati', 'Harley-Davidson', 'Honda', 'Kawasaki', 'KTM', 'Suzuki', 'Triumph', 'Yamaha']

const MOTORCYCLE_MODELS_BY_MAKE: Record<string, string[]> = {
  'Aprilia': ['RS 660', 'Tuono 660', 'Tuareg 660', 'RSV4'],
  'BMW Motorrad': ['R 1250 GS', 'F 900 R', 'S 1000 RR', 'CE 04'],
  'Ducati': ['Monster', 'Panigale V4', 'Multistrada V4', 'Scrambler Icon'],
  'Harley-Davidson': ['Sportster S', 'Nightster', 'Street Bob 114', 'Pan America 1250'],
  'Honda': ['CB650R', 'CBR650R', 'Africa Twin', 'Forza 125', 'PCX 125'],
  'Kawasaki': ['Ninja 650', 'Ninja ZX-6R', 'Z900', 'Versys 650'],
  'KTM': ['390 Duke', '790 Duke', '890 Adventure', '1290 Super Duke R'],
  'Suzuki': ['GSX-R750', 'GSX-8S', 'V-Strom 650', 'Hayabusa'],
  'Triumph': ['Street Triple', 'Tiger 900', 'Bonneville T120', 'Trident 660'],
  'Yamaha': ['MT-07', 'MT-09', 'Tracer 9', 'YZF-R1', 'NMAX 125'],
}

const MAKES_BY_VEHICLE_TYPE: Record<VehicleType, string[]> = {
  'Cars': CAR_MAKES,
  'Classic Cars': CLASSIC_MAKES,
  'Pickups': PICKUP_MAKES,
  'Vans & Light Commercials': VAN_LIGHT_COMMERCIAL_MAKES,
  'Motorcycles': MOTORCYCLE_MAKES,
}

const MODELS_BY_VEHICLE_TYPE: Record<VehicleType, Record<string, string[]>> = {
  'Cars': CAR_MODELS_BY_MAKE,
  'Classic Cars': CLASSIC_MODELS_BY_MAKE,
  'Pickups': PICKUP_MODELS_BY_MAKE,
  'Vans & Light Commercials': VAN_LIGHT_COMMERCIAL_MODELS_BY_MAKE,
  'Motorcycles': MOTORCYCLE_MODELS_BY_MAKE,
}

const SEARCH_PRIORITIES = [
  { label: 'Profit', value: 'profit', icon: '💰', description: 'Focus on the highest expected margin.' },
  { label: 'Fast Selling', value: 'fast-selling', icon: '⚡', description: 'Prioritise vehicles that sell quickly.' },
  { label: 'Rare Vehicles', value: 'rare-vehicles', icon: '💎', description: 'Surface harder-to-find stock with standout demand.' },
  { label: 'Best Condition', value: 'best-condition', icon: '✅', description: 'Only surface the cleanest examples available.' },
  { label: 'Low Mileage', value: 'low-mileage', icon: '🔢', description: 'Prioritise lowest mileage vehicles first.' },
  { label: 'Highest Margin', value: 'highest-margin', icon: '📈', description: 'Maximum retail margin vs purchase price.' },
] as const

const SEARCH_AREA_OPTIONS = [
  { label: 'Nationwide', value: 'nationwide', icon: '🇬🇧', description: 'Search across the entire UK.' },
  { label: 'Within Radius', value: 'within-radius', icon: '📍', description: 'Set a distance radius from your dealership.' },
  { label: 'Specific Counties', value: 'specific-counties', icon: '🗺️', description: 'Target specific counties or regions.' },
  { label: 'Auction Houses', value: 'auction-houses', icon: '🏛️', description: 'Monitor UK auction houses only.' },
  { label: 'Dealer Websites', value: 'dealer-websites', icon: '🏢', description: 'Search dealer networks and trade listings.' },
  { label: 'Marketplace Sources', value: 'marketplace-sources', icon: '🛒', description: 'UK marketplace platforms and classifieds.' },
] as const

const AI_INTELLIGENCE_OPTIONS = [
  { label: 'Estimated Profit', value: 'estimated-profit', icon: '💰', description: 'AI-estimated profit for each opportunity.' },
  { label: 'Risk Assessment', value: 'risk-assessment', icon: '🛡️', description: 'Flags vehicles with potential purchase risk.' },
  { label: 'Market Demand', value: 'market-demand', icon: '📊', description: 'Current demand signals for this vehicle type.' },
  { label: 'Price Validation', value: 'price-validation', icon: '✅', description: 'Confirms the asking price is fair or better.' },
  { label: 'Recommended Offer', value: 'recommended-offer', icon: '🎯', description: 'AI-suggested offer based on market data.' },
  { label: 'Dealer Questions', value: 'dealer-questions', icon: '💬', description: 'Pre-generated questions to ask the seller.' },
  { label: 'Vehicle Intelligence', value: 'vehicle-intelligence', icon: '🧠', description: 'Deep insight: history, recalls, value trends.' },
] as const

const MISSION_NAME_EXAMPLES = ['Performance Hatchbacks', 'Classic Mercedes', 'Pickup Trucks', 'Dealer Stock Replenishment']

const MAX_MILEAGE_STEPS = [10000, 20000, 30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000]
const MAX_PRICE_STEPS = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000, 150000, 200000]

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

function MultiSelectChips({
  options,
  selected,
  onToggle,
  searchable,
}: {
  options: string[]
  selected: Set<string>
  onToggle: (val: string) => void
  searchable?: boolean
}) {
  const [query, setQuery] = useState('')
  const filtered = query.trim() === '' ? options : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      {searchable && options.length > 8 && (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to filter…"
          className="mb-3 min-h-10 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-2.5 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      )}
      <div className="flex flex-wrap gap-2">
        {filtered.map((opt) => {
          const isSelected = selected.has(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-body-sm font-body-sm transition-all duration-150 ${
                isSelected
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
              }`}
            >
              {isSelected && (
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
              )}
              {opt}
            </button>
          )
        })}
      </div>
      {selected.size > 0 && (
        <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
          {selected.size} selected
          {' · '}
          <button type="button" onClick={() => selected.forEach((v) => onToggle(v))} className="text-primary underline underline-offset-2 hover:no-underline">
            Clear all
          </button>
        </p>
      )}
    </div>
  )
}

function SliderWithInput({
  id,
  steps,
  value,
  onChange,
  formatValue,
  label,
}: {
  id: string
  steps: number[]
  value: string
  onChange: (val: string) => void
  formatValue: (n: number) => string
  label: string
}) {
  const numericValue = value ? Number(value) : 0
  const stepIndex = steps.findIndex((s) => s >= numericValue)
  const sliderValue = value === '' ? -1 : stepIndex >= 0 ? stepIndex : steps.length - 1

  function handleSliderChange(idx: number) {
    if (idx < 0) { onChange(''); return }
    onChange(String(steps[idx]))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          id={`${id}-manual`}
          type="number"
          placeholder="Any"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} manual entry`}
          className="min-h-10 w-32 rounded-lg border border-outline-variant/40 bg-surface-container-high px-3 py-2 text-body-sm font-body-sm text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
        {value && <span className="text-body-sm font-body-sm font-semibold text-primary">{formatValue(numericValue)}</span>}
      </div>
      <input
        id={id}
        type="range"
        min={-1}
        max={steps.length - 1}
        step={1}
        value={sliderValue}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
        aria-label={label}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-label-caps font-label-caps text-on-surface-variant/60">
        <span>Any</span>
        <span>{formatValue(steps[steps.length - 1])}</span>
      </div>
    </div>
  )
}

function SearchBuilderPage() {
  // Section 1: Mission Name
  const [missionName, setMissionName] = useState('')
  // Section 2: Vehicle Type (multi-select)
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<Set<AvailableVehicleType>>(new Set())
  // Section 3: Makes (multi-select)
  const [selectedMakes, setSelectedMakes] = useState<Set<string>>(new Set())
  // Section 4: Models (multi-select)
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set())
  // Section 5: Year Range
  const [yearFrom, setYearFrom] = useState('')
  const [yearTo, setYearTo] = useState('')
  // Section 6: Max Mileage
  const [maxMileage, setMaxMileage] = useState('')
  // Section 7: Max Price
  const [maxBudget, setMaxBudget] = useState('')
  // Section 8: Search Area
  const [searchAreas, setSearchAreas] = useState<Set<string>>(new Set())
  // Section 9: Priority
  const [searchPriority, setSearchPriority] = useState<string | null>(null)
  // Section 10: AI Intelligence
  const [aiIntelligence, setAiIntelligence] = useState<Set<string>>(
    new Set(AI_INTELLIGENCE_OPTIONS.map((o) => o.value))
  )

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [deployedMission, setDeployedMission] = useState<TicaMission | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const deployButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Derive the active vehicle type for make/model lookups
  // Use first selected type, fallback to Cars for lookup purposes
  const activeVehicleType: AvailableVehicleType =
    selectedVehicleTypes.size > 0
      ? ([...selectedVehicleTypes][0] as AvailableVehicleType)
      : 'Cars'

  const hasSelectedVehicleCategory = selectedVehicleTypes.size > 0

  // Aggregate available makes from all selected vehicle types
  const availableMakes = Array.from(
    new Set(
      selectedVehicleTypes.size > 0
        ? [...selectedVehicleTypes].flatMap((vt) => MAKES_BY_VEHICLE_TYPE[vt] ?? [])
        : MAKES_BY_VEHICLE_TYPE['Cars']
    )
  ).sort()

  // Aggregate available models from all selected makes across all selected vehicle types
  const availableModels = Array.from(
    new Set(
      [...selectedMakes].flatMap((make) =>
        [...(selectedVehicleTypes.size > 0 ? selectedVehicleTypes : new Set(['Cars' as VehicleType]))]
          .flatMap((vt) => MODELS_BY_VEHICLE_TYPE[vt]?.[make] ?? [])
      )
    )
  ).sort()

  function handleVehicleTypeToggle(type: AvailableVehicleType) {
    setSelectedVehicleTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
    setSelectedMakes(new Set())
    setSelectedModels(new Set())
    if (validationErrors.length > 0) {
      setValidationErrors((prev) => prev.filter((e) => e.field !== 'vehicleType'))
    }
  }

  function handleMakeToggle(make: string) {
    setSelectedMakes((prev) => {
      const next = new Set(prev)
      if (next.has(make)) {
        next.delete(make)
        // Remove models belonging to this make
        setSelectedModels((prevModels) => {
          const nextModels = new Set(prevModels)
          ;[...selectedVehicleTypes].forEach((vt) => {
            (MODELS_BY_VEHICLE_TYPE[vt]?.[make] ?? []).forEach((m) => nextModels.delete(m))
          })
          return nextModels
        })
      } else {
        next.add(make)
      }
      return next
    })
  }

  function handleModelToggle(model: string) {
    setSelectedModels((prev) => {
      const next = new Set(prev)
      if (next.has(model)) next.delete(model)
      else next.add(model)
      return next
    })
  }

  function toggleAll<T extends string>(set: Set<T>, setFn: React.Dispatch<React.SetStateAction<Set<T>>>, items: T[]) {
    setFn(set.size === items.length ? new Set() : new Set(items))
  }

  function handleSearchAreaToggle(area: string) {
    setSearchAreas((prev) => {
      const next = new Set(prev)
      if (next.has(area)) next.delete(area)
      else next.add(area)
      return next
    })
  }

  function handleAiToggle(feature: string) {
    setAiIntelligence((prev) => {
      const next = new Set(prev)
      if (next.has(feature)) next.delete(feature)
      else next.add(feature)
      return next
    })
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function hasError(field: ValidationError['field']) {
    return validationErrors.some((e) => e.field === field)
  }

  function handleDeploy() {
    const primaryMake = [...selectedMakes][0] ?? ''
    const primaryModel = [...selectedModels][0] ?? ''
    const primaryVehicleType = [...selectedVehicleTypes][0] ?? ''
    const buyingPriorityLabel = SEARCH_PRIORITIES.find((p) => p.value === searchPriority)?.label ?? ''

    const input = {
      vehicleType: primaryVehicleType,
      make: primaryMake,
      model: primaryModel,
      yearFrom,
      yearTo,
      maxMileage,
      fuelType: '',
      transmission: '',
      serviceHistory: '',
      budget: maxBudget,
      targetProfit: '',
      buyingPriority: buyingPriorityLabel,
      notificationPreferences: [],
      selectedMarketplaces: [...searchAreas],
    }

    const errors = validateMissionInput(input).filter((error) => error.field !== 'vehicleType')

    if (!hasSelectedVehicleCategory) {
      errors.unshift({
        field: 'vehicleType',
        message: 'Select at least one vehicle type to continue.',
      })
    }

    setValidationErrors(errors)

    if (errors.length > 0) {
      deployButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const mission = createMission(input)
    saveMission(mission)
    setDeployedMission(mission)
  }

  const formatPounds = (value: string | number) =>
    `£${Number(value).toLocaleString('en-GB')}`

  const vehicleSummary =
    [[...selectedVehicleTypes].join(', '), [...selectedMakes].join(', '), [...selectedModels].join(', ')]
      .filter(Boolean)
      .join(' / ') || 'Not yet selected'

  const missionReadiness = (() => {
    const fields = [
      missionName.trim() !== '',
      hasSelectedVehicleCategory,
      selectedMakes.size > 0,
      maxBudget !== '',
      searchAreas.size > 0,
      searchPriority !== null,
    ]
    return Math.round((fields.filter(Boolean).length / fields.length) * 100)
  })()

  return (
    <PlatformShell
      navItems={[
        { label: 'Dealer Command Centre', href: '/dashboard' },
        { label: 'AI Search Missions', href: '/search-builder', active: true },
        { label: 'AI Buying Report', href: '/opportunity' },
        { label: 'Settings', isSectionLabel: true },
        { label: 'TICA Preferences', href: '/settings' },
        { label: 'Owner', isSectionLabel: true },
        { label: 'TICA Operations Centre', href: '/owner' },
        { label: '🧠 TICA Intelligence', href: '/owner/intelligence' },
        { label: 'Future Features', isSectionLabel: true },
        { label: 'Vehicle History & MOT', disabled: true },
        { label: 'Watchlist', disabled: true },
        { label: 'Subscription', disabled: true },
      ]}
    >
      <div className="mx-auto w-full max-w-container-max">
        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="mb-5 md:mb-8">
          <div className="mb-3 flex items-start justify-between gap-4">
            <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Mission Builder</p>
            <div className="shrink-0">
              <TicaShield />
            </div>
          </div>
          <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">AI Search Missions</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Give your AI employee a mission. It will monitor the market continuously and surface the best buying opportunities for your dealership.
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-8 lg:space-y-0 xl:grid-cols-[1fr_320px]">
          {/* ── Main column ─────────────────────────────────────────────── */}
          <div className="space-y-5 sm:space-y-6 lg:col-start-1 lg:row-start-1">

            {/* ── Section 1: Mission Name ──────────────────────────────── */}
            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
              <StepMarker step="01" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Mission Name</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">Give your mission a name so you can identify it quickly.</p>
              <input
                id="mission-name"
                type="text"
                value={missionName}
                onChange={(e) => setMissionName(e.target.value)}
                placeholder="e.g. Performance Hatchbacks"
                className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {MISSION_NAME_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setMissionName(ex)}
                    className="rounded-full border border-outline-variant/30 bg-surface-container-high px-3 py-1 text-body-sm font-body-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </section>

            {/* ── Section 2: Vehicle Type ──────────────────────────────── */}
            <section className={`rounded-2xl border bg-surface-container-low p-4 sm:p-6 md:p-8 ${hasError('vehicleType') ? 'border-error/60' : 'border-outline-variant/30'}`}>
              <StepMarker step="02" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Vehicle Type</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">Select one or more vehicle types. Multiple selection allowed.</p>
              {hasError('vehicleType') && (
                <p className="mb-4 text-body-sm font-body-sm text-error">
                  {validationErrors.find((e) => e.field === 'vehicleType')?.message}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {VEHICLE_TYPES.map((type) => {
                  const selected = selectedVehicleTypes.has(type as AvailableVehicleType)
                  const comingSoon = !AVAILABLE_VEHICLE_TYPE_SET.has(type)
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => { if (!comingSoon) handleVehicleTypeToggle(type as AvailableVehicleType) }}
                      disabled={comingSoon}
                      aria-disabled={comingSoon}
                      aria-pressed={comingSoon ? undefined : selected}
                      className={`group relative flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border p-4 text-center transition-all duration-200 sm:min-h-32 sm:p-5 ${
                        comingSoon
                          ? 'cursor-not-allowed border-outline-variant/20 bg-surface-container text-on-surface-variant opacity-50'
                          : selected
                          ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10'
                          : 'border-outline-variant/40 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
                      }`}
                    >
                      {selected && (
                        <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary">
                          <CheckIcon />
                        </span>
                      )}
                      {comingSoon && (
                        <span className="absolute right-2 top-2 rounded-full border border-outline-variant/40 bg-surface-container-high px-2 py-0.5 text-label-caps font-label-caps text-on-surface-variant" style={{ fontSize: '0.6rem' }}>
                          Soon
                        </span>
                      )}
                      <span className="text-2xl">{VEHICLE_TYPE_EMOJI[type]}</span>
                      <span className="text-body-sm font-body-sm font-semibold leading-tight">{type}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* ── Section 3: Make ──────────────────────────────────────── */}
            <section className={`rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8 ${!hasSelectedVehicleCategory ? 'opacity-60' : ''}`}>
              <StepMarker step="03" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Make</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                Select one or more makes. Leave blank to search all makes.
              </p>
              {!hasSelectedVehicleCategory ? (
                <p className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-body-sm font-body-sm text-on-surface-variant">
                  Select a vehicle type above to see available makes.
                </p>
              ) : (
                <MultiSelectChips
                  options={availableMakes}
                  selected={selectedMakes}
                  onToggle={handleMakeToggle}
                  searchable
                />
              )}
            </section>

            {/* ── Section 4: Model ─────────────────────────────────────── */}
            <section className={`rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8 ${selectedMakes.size === 0 ? 'opacity-60' : ''}`}>
              <StepMarker step="04" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Model</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                Select specific models. Leave blank to include all models.
              </p>
              {selectedMakes.size === 0 ? (
                <p className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-body-sm font-body-sm text-on-surface-variant">
                  Select a make above to see available models.
                </p>
              ) : availableModels.length === 0 ? (
                <p className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-body-sm font-body-sm text-on-surface-variant">
                  No model list available for selected make(s). Your AI will search all models.
                </p>
              ) : (
                <MultiSelectChips
                  options={availableModels}
                  selected={selectedModels}
                  onToggle={handleModelToggle}
                  searchable
                />
              )}
            </section>

            {/* ── Section 5: Year Range ────────────────────────────────── */}
            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
              <StepMarker step="05" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Year Range</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                Set the registration year window. Leave blank for any year.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="year-from">From</label>
                  <input
                    id="year-from"
                    type="number"
                    placeholder="e.g. 2018"
                    min="1960"
                    max="2030"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant" htmlFor="year-to">To</label>
                  <input
                    id="year-to"
                    type="number"
                    placeholder="e.g. 2024"
                    min="1960"
                    max="2030"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    className="min-h-11 w-full rounded-lg border border-outline-variant/40 bg-surface-container-high px-4 py-3 text-body-md font-body-md text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
            </section>

            {/* ── Section 6: Maximum Mileage ───────────────────────────── */}
            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
              <StepMarker step="06" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Maximum Mileage</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                Set the maximum mileage your AI should consider. Leave blank for any mileage.
              </p>
              <SliderWithInput
                id="max-mileage"
                steps={MAX_MILEAGE_STEPS}
                value={maxMileage}
                onChange={setMaxMileage}
                label="Maximum mileage"
                formatValue={(n) => `${n.toLocaleString('en-GB')} miles`}
              />
            </section>

            {/* ── Section 7: Maximum Purchase Price ───────────────────── */}
            <section className={`rounded-2xl border bg-surface-container-low p-4 sm:p-6 md:p-8 ${hasError('budget') ? 'border-error/60' : 'border-outline-variant/30'}`}>
              <StepMarker step="07" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Maximum Purchase Price</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                Your AI will only surface opportunities within this budget.
              </p>
              {hasError('budget') && (
                <p className="mb-3 text-body-sm font-body-sm text-error">
                  {validationErrors.find((e) => e.field === 'budget')?.message}
                </p>
              )}
              <SliderWithInput
                id="max-price"
                steps={MAX_PRICE_STEPS}
                value={maxBudget}
                onChange={(val) => {
                  setMaxBudget(val)
                  if (validationErrors.length > 0) setValidationErrors((prev) => prev.filter((e) => e.field !== 'budget'))
                }}
                label="Maximum purchase price"
                formatValue={(n) => formatPounds(n)}
              />
            </section>

            {/* ── Section 8: Search Area ───────────────────────────────── */}
            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
              <StepMarker step="08" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Search Area</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                Choose where your AI should search. Multiple selection allowed.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SEARCH_AREA_OPTIONS.map((area) => {
                  const selected = searchAreas.has(area.value)
                  return (
                    <button
                      key={area.value}
                      type="button"
                      onClick={() => handleSearchAreaToggle(area.value)}
                      aria-pressed={selected}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 ${
                        selected
                          ? 'border-primary bg-primary/10 shadow-sm shadow-primary/10'
                          : 'border-outline-variant/40 bg-surface-container-high hover:border-primary/40'
                      }`}
                    >
                      <span className="mt-0.5 text-xl" aria-hidden="true">{area.icon}</span>
                      <span className="flex flex-col gap-0.5">
                        <span className={`text-body-md font-body-md font-semibold leading-snug ${selected ? 'text-primary' : 'text-on-surface'}`}>{area.label}</span>
                        <span className={`text-body-sm font-body-sm leading-snug ${selected ? 'text-primary/75' : 'text-on-surface-variant'}`}>{area.description}</span>
                      </span>
                      {selected && (
                        <span className="ml-auto mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                          <CheckIcon />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* ── Section 9: Priority ──────────────────────────────────── */}
            <section className={`rounded-2xl border bg-surface-container-low p-4 sm:p-6 md:p-8 ${hasError('buyingPriority') ? 'border-error/60' : 'border-outline-variant/30'}`}>
              <StepMarker step="09" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">Priority</h2>
              <p className="mb-5 text-body-md font-body-md text-on-surface-variant">
                How should your AI rank and prioritise opportunities?
              </p>
              {hasError('buyingPriority') && (
                <p className="mb-3 text-body-sm font-body-sm text-error">
                  {validationErrors.find((e) => e.field === 'buyingPriority')?.message}
                </p>
              )}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SEARCH_PRIORITIES.map(({ label, value, icon, description }) => {
                  const selected = searchPriority === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSearchPriority(value)}
                      aria-pressed={selected}
                      className={`relative flex flex-col gap-2 rounded-xl border p-4 text-left transition-all duration-150 ${
                        selected
                          ? 'border-primary bg-primary/10 shadow-md shadow-primary/10'
                          : 'border-outline-variant/40 bg-surface-container-high hover:border-primary/40'
                      }`}
                    >
                      {selected && (
                        <span className="absolute right-2.5 top-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-on-primary">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                      )}
                      <span className="text-xl" aria-hidden="true">{icon}</span>
                      <span className={`text-body-md font-body-md font-semibold leading-tight ${selected ? 'text-primary' : 'text-on-surface'}`}>{label}</span>
                      <span className={`text-body-sm font-body-sm leading-snug ${selected ? 'text-primary/75' : 'text-on-surface-variant'}`}>{description}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* ── Section 10: AI Intelligence ──────────────────────────── */}
            <section className="rounded-2xl border border-primary/25 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high p-4 shadow-lg shadow-primary/10 sm:p-6 md:p-8">
              <StepMarker step="10" />
              <h2 className="mb-1 text-headline-md font-headline-md text-on-surface">AI Intelligence</h2>
              <p className="mb-2 text-body-md font-body-md text-on-surface-variant">
                Choose which AI-powered insights to include in your buying reports.
              </p>
              <div className="mb-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAiIntelligence(new Set(AI_INTELLIGENCE_OPTIONS.map((o) => o.value)))}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-body-sm font-body-sm text-primary transition-colors hover:bg-primary/20"
                >
                  Enable All
                </button>
                <button
                  type="button"
                  onClick={() => setAiIntelligence(new Set())}
                  className="rounded-full border border-outline-variant/40 bg-surface-container-high px-3 py-1 text-body-sm font-body-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-surface"
                >
                  Disable All
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {AI_INTELLIGENCE_OPTIONS.map((opt) => {
                  const enabled = aiIntelligence.has(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleAiToggle(opt.value)}
                      aria-pressed={enabled}
                      className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 ${
                        enabled
                          ? 'border-primary/30 bg-surface-container-high shadow-sm shadow-primary/5'
                          : 'border-outline-variant/20 bg-surface-container opacity-60'
                      }`}
                    >
                      <span className="text-xl" aria-hidden="true">{opt.icon}</span>
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className={`text-body-md font-body-md font-semibold ${enabled ? 'text-on-surface' : 'text-on-surface-variant'}`}>{opt.label}</span>
                        <span className="text-body-sm font-body-sm text-on-surface-variant">{opt.description}</span>
                      </span>
                      {/* Toggle pill */}
                      <span
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors duration-200 ${
                          enabled ? 'border-primary bg-primary' : 'border-outline-variant/40 bg-surface-container'
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                            enabled ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* ── Launch ──────────────────────────────────────────────── */}
            <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-6 md:p-8">
              {/* Brief summary */}
              <div className="mb-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-high p-4 sm:p-5">
                <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary">Mission Brief</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Mission Name', value: missionName || 'Not named' },
                    { label: 'Vehicle Type', value: [...selectedVehicleTypes].join(', ') || 'Not selected' },
                    { label: 'Make', value: [...selectedMakes].join(', ') || 'Any' },
                    { label: 'Model', value: [...selectedModels].join(', ') || 'Any' },
                    { label: 'Budget', value: maxBudget ? `Up to ${formatPounds(maxBudget)}` : 'Not set' },
                    { label: 'Priority', value: SEARCH_PRIORITIES.find((p) => p.value === searchPriority)?.label ?? 'Not set' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-outline-variant/30 bg-surface-container-low px-3 py-2.5">
                      <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">{item.label}</p>
                      <p className="mt-1 truncate text-body-sm font-body-sm font-semibold text-on-surface">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {validationErrors.length > 0 && (
                <div className="mb-5 rounded-xl border border-error/40 bg-error/8 px-4 py-3" role="alert">
                  <p className="mb-1.5 text-label-caps font-label-caps uppercase tracking-widest text-error">Please complete the following:</p>
                  <ul className="space-y-1">
                    {validationErrors.map((err) => (
                      <li key={err.field} className="flex items-start gap-2 text-body-sm font-body-sm text-error">
                        <span className="mt-px shrink-0" aria-hidden="true">•</span>
                        {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                ref={deployButtonRef}
                type="button"
                onClick={handleDeploy}
                className="mx-auto flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-headline-md font-headline-md text-on-primary shadow-xl shadow-primary/25 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                <span aria-hidden="true">⚡</span>
                Launch AI Search Mission
              </button>
              <p className="mt-3 text-center text-body-sm font-body-sm text-on-surface-variant">
                Your AI agent will begin monitoring the market immediately.
              </p>
            </section>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside className="mt-5 sm:mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0">
            <div className="lg:sticky lg:top-6 space-y-4">
              {/* Mission Readiness */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-label-caps font-label-caps uppercase tracking-widest text-primary">Mission Readiness</p>
                  <span className="text-body-md font-body-md font-semibold text-on-surface">{missionReadiness}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${missionReadiness}%` }}
                    role="progressbar"
                    aria-valuenow={missionReadiness}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Mission readiness: ${missionReadiness}% complete`}
                  />
                </div>
                <p className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
                  {missionReadiness === 100 ? 'Ready to launch.' : 'Complete the mission brief to launch.'}
                </p>
              </div>

              {/* Mission Summary */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4 sm:p-5">
                <p className="mb-3 text-label-caps font-label-caps uppercase tracking-widest text-primary">Mission Summary</p>
                <div className="space-y-3">
                  {[
                    { label: 'Vehicle', value: vehicleSummary },
                    { label: 'Budget', value: maxBudget ? `Up to ${formatPounds(maxBudget)}` : 'Not set' },
                    { label: 'Max Mileage', value: maxMileage ? `${Number(maxMileage).toLocaleString('en-GB')} miles` : 'Any' },
                    { label: 'Year Range', value: yearFrom || yearTo ? `${yearFrom || 'Any'} – ${yearTo || 'Any'}` : 'Any' },
                    { label: 'Search Area', value: searchAreas.size > 0 ? [...searchAreas].map((v) => SEARCH_AREA_OPTIONS.find((o) => o.value === v)?.label ?? v).join(', ') : 'Not set' },
                    { label: 'Priority', value: SEARCH_PRIORITIES.find((p) => p.value === searchPriority)?.label ?? 'Not set' },
                    { label: 'AI Features', value: `${aiIntelligence.size} of ${AI_INTELLIGENCE_OPTIONS.length} enabled` },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">{item.label}</p>
                      <p className="break-words text-body-sm font-body-sm font-semibold text-on-surface">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What happens next */}
              <div className="rounded-2xl border border-primary/25 bg-primary/8 p-4 sm:p-5">
                <p className="mb-2 text-label-caps font-label-caps uppercase tracking-widest text-primary">What happens next?</p>
                <ul className="space-y-1.5">
                  {[
                    'Mission created and confirmed.',
                    'AI validates your criteria.',
                    'AI connects to market sources.',
                    'Opportunities are ranked by priority.',
                    'Best vehicles appear in your buying report.',
                  ].map((step) => (
                    <li key={step} className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface-variant">
                      <span className="mt-px shrink-0 text-primary" aria-hidden="true">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Back to Top */}
        <button
          aria-label="Back to top"
          className="back-to-top-btn"
          onClick={scrollToTop}
          style={{ opacity: showBackToTop ? 1 : 0, pointerEvents: showBackToTop ? 'auto' : 'none' }}
          type="button"
        >
          <svg aria-hidden="true" fill="none" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15l7-7 7 7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </svg>
        </button>
      </div>

      {/* ── Mission Created Successfully Modal ─────────────────────────────── */}
      {deployedMission && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mission-success-title"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-primary/30 bg-surface-container p-6 shadow-2xl shadow-primary/15 sm:p-8">
            {/* Success header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                <span className="text-3xl" aria-hidden="true">⚡</span>
              </div>
              <h2 id="mission-success-title" className="text-headline-lg font-headline-lg text-on-surface">
                Mission Created Successfully
              </h2>
              <p className="mt-2 text-body-md font-body-md text-on-surface-variant">
                Your AI agent is now monitoring the market.
              </p>
            </div>

            {/* Mission details */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Mission ID</p>
                <p className="mt-1 text-body-md font-body-md font-semibold text-primary">{deployedMission.missionId}</p>
              </div>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Status</p>
                <p className="mt-1 text-body-md font-body-md font-semibold text-on-surface">{deployedMission.status}</p>
              </div>
              <div className="col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Vehicle</p>
                <p className="mt-1 text-body-md font-body-md font-semibold text-on-surface">{vehicleSummary}</p>
              </div>
              <div className="col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-3">
                <p className="text-label-caps font-label-caps uppercase tracking-widest text-on-surface-variant">Budget</p>
                <p className="mt-1 text-body-md font-body-md font-semibold text-on-surface">
                  {deployedMission.budget ? `Up to ${formatPounds(deployedMission.budget)}` : 'Not specified'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard"
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-body-md font-body-md text-on-primary shadow-lg shadow-primary/20 transition-all hover:brightness-110"
              >
                Return to Dealer Command Centre
              </Link>
              <Link
                to="/opportunity"
                className="flex min-h-11 w-full items-center justify-center rounded-xl border border-outline-variant/40 bg-surface-container-high px-6 py-3 text-body-md font-body-md text-on-surface transition-all hover:border-primary/50 hover:text-primary"
              >
                View AI Buying Report
              </Link>
            </div>
          </div>
        </div>
      )}
    </PlatformShell>
  )
}
