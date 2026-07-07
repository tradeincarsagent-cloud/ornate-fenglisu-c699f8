export type OpportunityScoreCategory =
  | 'marketPriceScore'
  | 'estimatedProfitScore'
  | 'dealerDemandScore'
  | 'timeOnMarketScore'
  | 'mileageScore'
  | 'vehicleHistoryScore'
  | 'motScore'
  | 'sellerReputationScore'
  | 'distanceScore'
  | 'overallOpportunityScore'

export type OpportunityScoreTone = 'positive' | 'warning' | 'neutral'

export type OpportunityScore = {
  label: string
  score: number
  displayValue: string
  status: string
  tone: OpportunityScoreTone
  summary: string
}

export type OpportunityBuyingVerdict = 'BUY' | 'REVIEW' | 'PASS'

export type OpportunityChecklistItem = {
  label: string
  icon: string
  statusLabel: string
  tone: 'positive' | 'warning' | 'info'
}

export type OpportunityVehicleInfoItem = {
  label: string
  value: string
}

export type DashboardOpportunity = {
  vehicle: string
  source: string
  priceDisplay: string
  estimatedProfitDisplay: string
  priority: string
  confidenceDisplay: string
}

export type FeaturedOpportunity = {
  id: string
  vehicle: string
  year: string
  source: string
  listPriceDisplay: string
  estimatedRetailValueDisplay: string
  estimatedGrossProfitDisplay: string
  riskLevel: string
  daysToSellDisplay: string
  confidenceDisplay: string
  demandRatingDisplay: string
  verdict: OpportunityBuyingVerdict
  verdictDisplay: string
  heroImageSrc: string
  heroImageAlt: string
  dashboardEstimatedProfitDisplay: string
  dashboardReasonLines: string[]
  verdictNarrative: string
  analysisSummary: string
  buyingSummary: string
  negotiation: {
    openingOfferDisplay: string
    likelyAcceptanceRangeDisplay: string
    confidenceDisplay: string
    advice: string
  }
  checklist: OpportunityChecklistItem[]
  vehicleInfo: OpportunityVehicleInfoItem[]
  scoring: Record<OpportunityScoreCategory, OpportunityScore>
}

/**
 * Hidden frontend-only placeholder for the future Opportunity Intelligence Engine.
 * “This is the placeholder foundation for the future TICA Opportunity Intelligence Engine.”
 *
 * The current dashboard and AI Buying Report must read opportunity scoring placeholders
 * from this central structure so future AI/data integrations replace one engine rather
 * than scattered page-level constants. This file should stay internal and must not drive
 * any new visible UI until the real scoring engine is connected.
 */
const bmwM3CompetitionScoring: Record<OpportunityScoreCategory, OpportunityScore> = {
  // Market Price Score: placeholder signal for how far the asking price sits below modeled retail market value.
  marketPriceScore: {
    label: 'Market Price Score',
    score: 98,
    displayValue: '98 / 100',
    status: 'Excellent Value',
    tone: 'positive',
    summary: 'Asking price remains comfortably below projected forecourt value.',
  },
  // Estimated Profit Score: placeholder projection for gross margin after acquisition and prep assumptions.
  estimatedProfitScore: {
    label: 'Estimated Profit Score',
    score: 96,
    displayValue: '96 / 100',
    status: 'High Profit Potential',
    tone: 'positive',
    summary: 'Projected resale margin stays above the current target threshold.',
  },
  // Dealer Demand Score: placeholder demand model for likely buyer interest across dealer inventory channels.
  dealerDemandScore: {
    label: 'Dealer Demand Score',
    score: 95,
    displayValue: '95 / 100',
    status: 'Strong Dealer Demand',
    tone: 'positive',
    summary: 'Comparable performance stock continues to show strong retail pull-through.',
  },
  // Time on Market Score: placeholder velocity signal for how quickly the vehicle is expected to sell.
  timeOnMarketScore: {
    label: 'Time on Market Score',
    score: 91,
    displayValue: '91 / 100',
    status: 'Fast Retail Velocity',
    tone: 'positive',
    summary: 'Modeled stock-turn timing remains comfortably inside the current target window.',
  },
  // Mileage Score: placeholder fit check for whether mileage aligns with age, segment, and retail expectations.
  mileageScore: {
    label: 'Mileage Score',
    score: 88,
    displayValue: '88 / 100',
    status: 'Mileage Looks Healthy',
    tone: 'positive',
    summary: 'Mileage appears aligned with age and premium performance segment expectations.',
  },
  // Vehicle History Score: placeholder risk signal for future provider-backed history and verification checks.
  vehicleHistoryScore: {
    label: 'Vehicle History Score',
    score: 71,
    displayValue: '71 / 100',
    status: 'Verification Recommended',
    tone: 'warning',
    summary: 'History is provisionally acceptable but still awaits provider-backed validation.',
  },
  // MOT Score: placeholder compliance and test-history signal until live MOT integrations are connected.
  motScore: {
    label: 'MOT Score',
    score: 74,
    displayValue: '74 / 100',
    status: 'MOT Review Recommended',
    tone: 'warning',
    summary: 'Recent MOT timeline appears usable, but advisory trends still need provider verification.',
  },
  // Seller Reputation Score: placeholder trust signal for source quality, listing consistency, and seller behavior.
  sellerReputationScore: {
    label: 'Seller Reputation Score',
    score: 86,
    displayValue: '86 / 100',
    status: 'Trusted Listing',
    tone: 'positive',
    summary: 'Seller profile currently matches the stronger end of internal trust heuristics.',
  },
  // Distance Score: placeholder logistics signal for collection effort and operational convenience.
  distanceScore: {
    label: 'Distance Score',
    score: 84,
    displayValue: '84 / 100',
    status: 'Operationally Convenient',
    tone: 'positive',
    summary: 'Vehicle is close enough to support efficient inspection and collection planning.',
  },
  // Overall Opportunity Score: placeholder roll-up that future AI integrations should own centrally.
  overallOpportunityScore: {
    label: 'Overall Opportunity Score',
    score: 97,
    displayValue: '97 / 100',
    status: 'Top Priority Opportunity',
    tone: 'positive',
    summary: 'Central weighted opportunity score keeps this vehicle at the top of the queue.',
  },
}

export const opportunityIntelligencePlaceholder: {
  featuredOpportunity: FeaturedOpportunity
  dashboardRecentOpportunities: DashboardOpportunity[]
} = {
  featuredOpportunity: {
    id: 'TCA-2026-00421',
    vehicle: 'BMW M3 Competition',
    year: '2022',
    source: 'Auto Trader',
    listPriceDisplay: '£31,995',
    estimatedRetailValueDisplay: '£36,250',
    estimatedGrossProfitDisplay: '£4,255',
    riskLevel: 'LOW',
    daysToSellDisplay: '9 Days',
    confidenceDisplay: '97%',
    demandRatingDisplay: '★★★★★',
    verdict: 'BUY',
    verdictDisplay: 'BUY NOW',
    heroImageSrc: '/placeholder.png',
    heroImageAlt: 'BMW M3 Competition opportunity vehicle',
    dashboardEstimatedProfitDisplay: '£4,200',
    dashboardReasonLines: [
      'Recently reduced in price.',
      'Strong resale potential.',
      'Located only 42 miles away.',
    ],
    verdictNarrative:
      "\"This vehicle currently represents one of today's strongest buying opportunities based on market pricing, dealer demand and estimated resale margin. We recommend reviewing vehicle history and service records before proceeding.\"",
    analysisSummary:
      'This M3 Competition presents a strong margin profile with high market demand, stable retail velocity, and a purchase price positioned well below projected forecourt value. The pricing spread and demand indicators support a confident stock turn opportunity for premium performance inventory.',
    buyingSummary:
      'This opportunity has been ranked as a BUY because the asking price is below current market value, dealer demand is strong, and estimated resale margins are above average. Before purchasing, we recommend confirming MOT history, service records and vehicle history.',
    negotiation: {
      openingOfferDisplay: '£30,750',
      likelyAcceptanceRangeDisplay: '£31,250–£31,750',
      confidenceDisplay: '84%',
      advice:
        '"This vehicle has been advertised for 18 days. Similar vehicles have recently sold below asking price. There may be room to negotiate."',
    },
    checklist: [
      { label: 'Market Price', icon: '✅', statusLabel: 'Excellent Value', tone: 'positive' },
      { label: 'Estimated Profit', icon: '✅', statusLabel: 'High Profit Potential', tone: 'positive' },
      { label: 'Vehicle History', icon: '🟡', statusLabel: bmwM3CompetitionScoring.vehicleHistoryScore.status, tone: 'warning' },
      { label: 'MOT History', icon: '🟡', statusLabel: bmwM3CompetitionScoring.motScore.status, tone: 'warning' },
      { label: 'Service History', icon: '🟡', statusLabel: 'Verify Records', tone: 'warning' },
      { label: 'Mileage', icon: '🟢', statusLabel: 'Appears Consistent', tone: 'positive' },
      { label: 'Seller Profile', icon: '🟢', statusLabel: 'Trusted Listing', tone: 'positive' },
      { label: 'Estimated Days to Sell', icon: '🔵', statusLabel: '9 Days', tone: 'info' },
    ],
    vehicleInfo: [
      { label: 'Mileage', value: '47,820 miles' },
      { label: 'Transmission', value: 'Automatic' },
      { label: 'Fuel', value: 'Petrol' },
      { label: 'Colour', value: 'Black Sapphire' },
      { label: 'Owners', value: '2 previous owners' },
      { label: 'Location', value: 'Manchester' },
      { label: 'Seller Type', value: 'Independent dealer' },
    ],
    scoring: bmwM3CompetitionScoring,
  },
  dashboardRecentOpportunities: [
    {
      vehicle: 'Audi RS5 Sportback',
      source: 'Auto Trader',
      priceDisplay: '£37,500',
      estimatedProfitDisplay: '£3,850',
      priority: 'High',
      confidenceDisplay: '94%',
    },
    {
      vehicle: 'Range Rover Velar',
      source: 'PistonHeads',
      priceDisplay: '£29,950',
      estimatedProfitDisplay: '£2,400',
      priority: 'Medium',
      confidenceDisplay: '78%',
    },
    {
      vehicle: 'Mercedes A45 AMG',
      source: 'Motorway',
      priceDisplay: '£34,750',
      estimatedProfitDisplay: '£3,120',
      priority: 'High',
      confidenceDisplay: '91%',
    },
    {
      vehicle: 'Volkswagen Golf R',
      source: 'eBay Motors',
      priceDisplay: '£24,200',
      estimatedProfitDisplay: '£1,980',
      priority: 'Low',
      confidenceDisplay: '65%',
    },
    {
      vehicle: 'Porsche Macan S',
      source: 'Auto Trader',
      priceDisplay: '£42,000',
      estimatedProfitDisplay: '£4,450',
      priority: 'High',
      confidenceDisplay: '97%',
    },
  ],
}
