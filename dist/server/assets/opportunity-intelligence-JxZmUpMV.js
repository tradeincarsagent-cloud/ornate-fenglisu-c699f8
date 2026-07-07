const bmwM3CompetitionScoring = {
  // Estimated Profit Score: placeholder projection for gross margin after acquisition and prep assumptions.
  estimatedProfitScore: {
    status: "High Profit Potential"
  },
  // Vehicle History Score: placeholder risk signal for future provider-backed history and verification checks.
  vehicleHistoryScore: {
    status: "Verification Recommended"
  },
  // MOT Score: placeholder compliance and test-history signal until live MOT integrations are connected.
  motScore: {
    status: "MOT Review Recommended"
  }
};
const bmwM3DecisionModel = {
  weightedDecisionScore: 89,
  recommendedAction: "BUY",
  recommendedActionDisplay: "BUY NOW",
  factors: {
    overallOpportunityScore: {
      displayValue: "97 / 100",
      summary: "Highest-weight roll-up opportunity score remains very strong."
    },
    estimatedProfit: {
      summary: "Projected margin is comfortably above internal targets."
    },
    vehicleHistory: {
      summary: "Usable profile with advisory flags that still require verification."
    },
    dealerDemand: {
      summary: "Demand signals remain strong for this segment and specification."
    },
    timeOnMarket: {
      summary: "Stock-turn expectations support rapid resale."
    }
  }
};
const opportunityIntelligencePlaceholder = {
  featuredOpportunity: {
    id: "TCA-2026-00421",
    vehicle: "BMW M3 Competition",
    year: "2022",
    listPriceDisplay: "£31,995",
    estimatedRetailValueDisplay: "£36,250",
    estimatedGrossProfitDisplay: "£4,255",
    riskLevel: "LOW",
    daysToSellDisplay: "9 Days",
    confidenceDisplay: "97%",
    demandRatingDisplay: "★★★★★",
    decisionModel: bmwM3DecisionModel,
    heroImageSrc: "/placeholder.png",
    heroImageAlt: "BMW M3 Competition opportunity vehicle",
    dashboardEstimatedProfitDisplay: "£4,200",
    dashboardReasonLines: [
      "Recently reduced in price.",
      "Strong resale potential.",
      "Located only 42 miles away."
    ],
    verdictNarrative: `"This vehicle currently represents one of today's strongest buying opportunities based on market pricing, dealer demand and estimated resale margin. We recommend reviewing vehicle history and service records before proceeding."`,
    analysisSummary: "This M3 Competition presents a strong margin profile with high market demand, stable retail velocity, and a purchase price positioned well below projected forecourt value. The pricing spread and demand indicators support a confident stock turn opportunity for premium performance inventory.",
    buyingSummary: "This opportunity has been ranked as a BUY because the asking price is below current market value, dealer demand is strong, and estimated resale margins are above average. Before purchasing, we recommend confirming MOT history, service records and vehicle history.",
    negotiation: {
      openingOfferDisplay: "£30,750",
      likelyAcceptanceRangeDisplay: "£31,250–£31,750",
      confidenceDisplay: "84%",
      advice: '"This vehicle has been advertised for 18 days. Similar vehicles have recently sold below asking price. There may be room to negotiate."'
    },
    checklist: [
      { label: "Market Price", icon: "✅", statusLabel: "Excellent Value", tone: "positive" },
      { label: "Estimated Profit", icon: "✅", statusLabel: "High Profit Potential", tone: "positive" },
      { label: "Vehicle History", icon: "🟡", statusLabel: bmwM3CompetitionScoring.vehicleHistoryScore.status, tone: "warning" },
      { label: "MOT History", icon: "🟡", statusLabel: bmwM3CompetitionScoring.motScore.status, tone: "warning" },
      { label: "Service History", icon: "🟡", statusLabel: "Verify Records", tone: "warning" },
      { label: "Mileage", icon: "🟢", statusLabel: "Appears Consistent", tone: "positive" },
      { label: "Seller Profile", icon: "🟢", statusLabel: "Trusted Listing", tone: "positive" },
      { label: "Estimated Days to Sell", icon: "🔵", statusLabel: "9 Days", tone: "info" }
    ],
    vehicleInfo: [
      { label: "Mileage", value: "47,820 miles" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel", value: "Petrol" },
      { label: "Colour", value: "Black Sapphire" },
      { label: "Owners", value: "2 previous owners" },
      { label: "Location", value: "Manchester" },
      { label: "Seller Type", value: "Independent dealer" }
    ],
    scoring: bmwM3CompetitionScoring
  },
  dashboardRecentOpportunities: [
    {
      vehicle: "Audi RS5 Sportback",
      source: "Auto Trader",
      priceDisplay: "£37,500",
      estimatedProfitDisplay: "£3,850",
      priority: "High",
      confidenceDisplay: "94%"
    },
    {
      vehicle: "Range Rover Velar",
      source: "PistonHeads",
      priceDisplay: "£29,950",
      estimatedProfitDisplay: "£2,400",
      priority: "Medium",
      confidenceDisplay: "78%"
    },
    {
      vehicle: "Mercedes A45 AMG",
      source: "Motorway",
      priceDisplay: "£34,750",
      estimatedProfitDisplay: "£3,120",
      priority: "High",
      confidenceDisplay: "91%"
    },
    {
      vehicle: "Volkswagen Golf R",
      source: "eBay Motors",
      priceDisplay: "£24,200",
      estimatedProfitDisplay: "£1,980",
      priority: "Low",
      confidenceDisplay: "65%"
    },
    {
      vehicle: "Porsche Macan S",
      source: "Auto Trader",
      priceDisplay: "£42,000",
      estimatedProfitDisplay: "£4,450",
      priority: "High",
      confidenceDisplay: "97%"
    }
  ]
};
export {
  opportunityIntelligencePlaceholder as o
};
