import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const pricingCheckoutLinks = {
  starter: "https://buy.stripe.com/28EbIU9OB8yucva3Jp2cg0h",
  professional: "https://buy.stripe.com/7sY9AMaSF7uqcvabbR2cg0f",
  enterprise: "https://buy.stripe.com/28E3coe4R4ie9iYeo32cg0g"
};
const trialPlanLabels = {
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise"
};
const exampleCriteria = [{
  label: "BMW 320d M Sport",
  lines: ["2019–2022", "Under £17,000"]
}, {
  label: "Audi A4 Black Edition",
  lines: ["2020+", "Under £18,500"]
}, {
  label: "Ford Ranger Wildtrak",
  lines: ["Double Cab", "Under £22,000"]
}, {
  label: "Mercedes C220d AMG Line",
  lines: ["2019+", "Under £20,000"]
}, {
  label: "Toyota Hilux Invincible X",
  lines: ["2018+", "Under £24,000"]
}, {
  label: "Land Rover Discovery Sport HSE",
  lines: ["2017–2021", "Under £22,000"]
}];
const opportunityExamples = [{
  name: "BMW M3 2020",
  askingPrice: "£31,995",
  confidence: "97%",
  estimatedProfit: "+£3,200",
  ticaCertified: true,
  detectedAt: "2 hours ago"
}, {
  name: "VW Golf GTI 2021",
  askingPrice: "£18,450",
  confidence: "94%",
  estimatedProfit: "+£1,450",
  ticaCertified: true,
  detectedAt: "1 hour ago"
}, {
  name: "Ford Ranger Wildtrak 2021",
  askingPrice: "£22,995",
  confidence: "93%",
  estimatedProfit: "+£2,100",
  ticaCertified: false,
  detectedAt: "4 hours ago"
}, {
  name: "Toyota Hilux Invincible X 2020",
  askingPrice: "£24,750",
  confidence: "95%",
  estimatedProfit: "+£2,300",
  ticaCertified: true,
  detectedAt: "53 minutes ago"
}, {
  name: "Mercedes E220 2019",
  askingPrice: "£18,495",
  confidence: "92%",
  estimatedProfit: "+£1,850",
  ticaCertified: false,
  detectedAt: "3 hours ago"
}, {
  name: "Mercedes G-Class 2018",
  askingPrice: "£69,950",
  confidence: "91%",
  estimatedProfit: "+£4,400",
  ticaCertified: false,
  detectedAt: "5 hours ago"
}, {
  name: "Harley-Davidson Fat Boy 2019",
  askingPrice: "£13,995",
  confidence: "90%",
  estimatedProfit: "+£1,200",
  ticaCertified: false,
  detectedAt: "2 hours ago"
}, {
  name: "Ford Transit Custom 2022",
  askingPrice: "£19,995",
  confidence: "96%",
  estimatedProfit: "+£2,450",
  ticaCertified: true,
  detectedAt: "35 minutes ago"
}, {
  name: "Porsche Cayman 2019",
  askingPrice: "£41,250",
  confidence: "94%",
  estimatedProfit: "+£3,100",
  ticaCertified: true,
  detectedAt: "27 minutes ago"
}];
const radarContacts = [{
  id: "bmw-m3",
  x: 31,
  y: 27,
  label: "BMW M3",
  heading: "318°",
  source: "Motorway feed",
  type: "car"
}, {
  id: "transit-custom",
  x: 72,
  y: 34,
  label: "Transit Custom",
  heading: "058°",
  source: "Fleet source",
  type: "van"
}, {
  id: "ranger",
  x: 65,
  y: 65,
  label: "Ford Ranger",
  heading: "132°",
  source: "Dealer trade",
  type: "pickup"
}, {
  id: "golf-gti",
  x: 41,
  y: 73,
  label: "Golf GTI",
  heading: "214°",
  source: "Retail listing",
  type: "car"
}, {
  id: "tracer",
  x: 23,
  y: 59,
  label: "Tracer 9",
  heading: "254°",
  source: "Bike network",
  type: "motorcycle"
}];
const radarNotifications = [{
  id: "bmw",
  title: "Opportunity Found",
  vehicle: "BMW M3 Competition 2020",
  margin: "£3,200",
  confidence: "97%",
  stamp: "LIVE • 12s",
  tone: "primary",
  position: "upper-right"
}, {
  id: "ranger",
  title: "Opportunity Found",
  vehicle: "Ford Ranger Wildtrak 2021",
  margin: "£2,350",
  confidence: "93%",
  stamp: "SYNC • 31s",
  tone: "secondary",
  position: "lower-left"
}, {
  id: "transit",
  title: "Opportunity Found",
  vehicle: "Ford Transit Custom 2022",
  margin: "£2,450",
  confidence: "96%",
  stamp: "UK • 44s",
  tone: "accent",
  position: "upper-left"
}, {
  id: "golf",
  title: "Opportunity Found",
  vehicle: "VW Golf GTI 2021",
  margin: "£1,450",
  confidence: "94%",
  stamp: "AI • 18s",
  tone: "primary",
  position: "lower-right"
}];
const radarRingInsets = [6, 14, 22, 30, 38, 46];
const radarGridAngles = Array.from({
  length: 24
}, (_, index) => index * 15);
const degreeMarks = Array.from({
  length: 12
}, (_, index) => index * 30);
function getContactBearing(x, y) {
  const radians = Math.atan2(x - 50, 50 - y);
  return (radians * 180 / Math.PI + 360) % 360;
}
function getSweepIntensity(sweepAngle, contact) {
  const bearing = getContactBearing(contact.x, contact.y);
  const circularDifference = Math.abs((sweepAngle - bearing + 540) % 360 - 180);
  const trailingDifference = (sweepAngle - bearing + 360) % 360;
  const primaryGlow = Math.max(0, 1 - circularDifference / 24);
  const trailingGlow = trailingDifference <= 72 ? 1 - trailingDifference / 72 : 0;
  return Math.min(1, 0.24 + primaryGlow * 0.64 + trailingGlow * 0.36);
}
function VehicleGlyph({
  type
}) {
  if (type === "van") {
    return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", className: "radar-vehicle-icon", viewBox: "0 0 32 32", children: [
      /* @__PURE__ */ jsx("path", { d: "M5 18.5h3.1l2.7-6.1c.5-1.1 1.5-1.9 2.7-1.9H21c1.2 0 2.2.6 2.8 1.5l2.9 4.5H29a1 1 0 0 1 1 1v4h-2.2a2.8 2.8 0 0 1-5.5 0h-9.8a2.8 2.8 0 0 1-5.5 0H5v-3Z" }),
      /* @__PURE__ */ jsx("path", { d: "M14.5 13h5.4c.8 0 1.5.4 1.9 1l1.7 2.8H12.4l1-2.2c.2-.4.6-.6 1.1-.6Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "9.5", cy: "21.5", r: "1.8" }),
      /* @__PURE__ */ jsx("circle", { cx: "24.8", cy: "21.5", r: "1.8" })
    ] });
  }
  if (type === "pickup") {
    return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", className: "radar-vehicle-icon", viewBox: "0 0 32 32", children: [
      /* @__PURE__ */ jsx("path", { d: "M4.5 18.4h3.4l2.1-4.3c.6-1.1 1.6-1.8 2.8-1.8h5.4c1.1 0 2.1.5 2.8 1.4l1.6 2.2h2.6c.9 0 1.6.7 1.6 1.6v4h-2.2a2.8 2.8 0 0 1-5.5 0H12a2.8 2.8 0 0 1-5.5 0H4.5v-3.1Z" }),
      /* @__PURE__ */ jsx("path", { d: "M13 14.8h6.3l1.4 1.9H12l.4-.8c.2-.7.9-1.1 1.6-1.1Z" }),
      /* @__PURE__ */ jsx("circle", { cx: "9.2", cy: "21.6", r: "1.8" }),
      /* @__PURE__ */ jsx("circle", { cx: "23.7", cy: "21.6", r: "1.8" })
    ] });
  }
  if (type === "motorcycle") {
    return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", className: "radar-vehicle-icon", viewBox: "0 0 32 32", children: [
      /* @__PURE__ */ jsx("circle", { cx: "9.3", cy: "22", r: "3.2", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "23", cy: "22", r: "3.2", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("path", { d: "m11.5 22 5.2-7.8h4.1l2.4 3.8H18l-2.5 4Z", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("path", { d: "m15.2 14.2 2.3 3.8", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "2" })
    ] });
  }
  return /* @__PURE__ */ jsxs("svg", { "aria-hidden": "true", className: "radar-vehicle-icon", viewBox: "0 0 32 32", children: [
    /* @__PURE__ */ jsx("path", { d: "M5 18.5h2.6l2.4-4.7c.7-1.4 2.2-2.3 3.8-2.3h5.8c1.5 0 2.9.7 3.8 1.9l2 3H27c1.1 0 2 .9 2 2v3.1h-2.2a3 3 0 0 1-5.8 0h-10a3 3 0 0 1-5.8 0H5v-3Z" }),
    /* @__PURE__ */ jsx("path", { d: "M13.6 14h5.9c.7 0 1.4.3 1.8.9l1.2 1.6H11.8l.9-1.8c.2-.4.6-.7.9-.7Z" }),
    /* @__PURE__ */ jsx("circle", { cx: "8.8", cy: "21.5", r: "1.9" }),
    /* @__PURE__ */ jsx("circle", { cx: "23.6", cy: "21.5", r: "1.9" })
  ] });
}
function UnitedKingdomFlag() {
  return /* @__PURE__ */ jsxs("svg", { "aria-label": "United Kingdom marker", className: "uk-flag-icon", viewBox: "0 0 36 24", children: [
    /* @__PURE__ */ jsx("rect", { width: "36", height: "24", rx: "3", fill: "#0A2B6B" }),
    /* @__PURE__ */ jsx("path", { d: "M0 0 36 24M36 0 0 24", stroke: "#fff", strokeWidth: "5" }),
    /* @__PURE__ */ jsx("path", { d: "M0 0 36 24M36 0 0 24", stroke: "#E2434B", strokeWidth: "2.4" }),
    /* @__PURE__ */ jsx("path", { d: "M18 0v24M0 12h36", stroke: "#fff", strokeWidth: "7" }),
    /* @__PURE__ */ jsx("path", { d: "M18 0v24M0 12h36", stroke: "#E2434B", strokeWidth: "3.8" })
  ] });
}
const HeroCountryFlag = UnitedKingdomFlag;
function HeroRadar() {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [activeNotifications, setActiveNotifications] = useState([]);
  useEffect(() => {
    const sweepDurationMs = 5400;
    const startedAt = performance.now();
    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setSweepAngle(elapsed / sweepDurationMs * 360 % 360);
    }, 80);
    return () => window.clearInterval(intervalId);
  }, []);
  useEffect(() => {
    let notificationUid = 0;
    const removalTimers = [];
    const spawnNotification = () => {
      setNotificationIndex((index) => {
        const nextNotification = radarNotifications[index];
        const liveNotification = {
          ...nextNotification,
          uid: notificationUid++
        };
        setActiveNotifications((current) => [...current.slice(-1), liveNotification]);
        const removalTimer = window.setTimeout(() => {
          setActiveNotifications((current) => current.filter((item) => item.uid !== liveNotification.uid));
        }, 4600);
        removalTimers.push(removalTimer);
        return (index + 1) % radarNotifications.length;
      });
    };
    spawnNotification();
    const intervalId = window.setInterval(spawnNotification, 2600);
    return () => {
      window.clearInterval(intervalId);
      removalTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "radar-container glass-card rounded-full p-2 glow-border premium-radar-shell", children: [
    /* @__PURE__ */ jsx("div", { className: "radar-frame" }),
    degreeMarks.map((degree) => {
      const labelStyle = {
        transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(calc(var(--radar-bearing-radius) * -1)) rotate(${-degree}deg)`
      };
      const tickStyle = {
        transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(calc(var(--radar-tick-radius) * -1))`
      };
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "radar-bearing-label", style: labelStyle, children: [
          degree,
          "°"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "radar-bearing-tick", style: tickStyle })
      ] }, degree);
    }),
    /* @__PURE__ */ jsxs("div", { className: "radar-scope premium-radar-scope", children: [
      /* @__PURE__ */ jsx("div", { className: "radar-map-overlay", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 320 320", children: [
        /* @__PURE__ */ jsx("path", { className: "radar-map-path", d: "M50 114c16-17 36-28 60-29 13-1 24 3 36 1 18-3 28-18 43-22 19-5 45 6 60 24-7 9-12 17-13 27-1 11 9 18 18 24 9 7 15 16 17 29-22 6-48 2-66 14-17 11-24 33-43 40-17 6-35-4-52-10-21-8-46-10-58-29-10-14-8-33-1-49 7-18 20-32 33-44 6-5 12-10 16-16-19 1-37 16-50 40-9-9-9-20 0-30Z" }),
        /* @__PURE__ */ jsx("path", { className: "radar-map-path", d: "M214 90c8-10 20-16 33-16 10 0 18 4 24 11-5 10-16 17-26 23-10 5-22 7-31 2 1-8-2-14 0-20Z" }),
        /* @__PURE__ */ jsx("path", { className: "radar-map-path", d: "M116 193c14-5 29-5 40 1 9 4 17 12 19 22-13 3-25 10-31 21-16 0-30-11-37-24-5-8-4-15 9-20Z" }),
        /* @__PURE__ */ jsxs("g", { className: "radar-road-network", children: [
          /* @__PURE__ */ jsx("line", { x1: "157", y1: "222", x2: "140", y2: "182", strokeWidth: "0.9" }),
          /* @__PURE__ */ jsx("line", { x1: "140", y1: "182", x2: "138", y2: "152", strokeWidth: "0.9" }),
          /* @__PURE__ */ jsx("line", { x1: "138", y1: "152", x2: "130", y2: "94", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("line", { x1: "157", y1: "222", x2: "112", y2: "210", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("line", { x1: "157", y1: "222", x2: "153", y2: "155", strokeWidth: "0.8" }),
          /* @__PURE__ */ jsx("line", { x1: "140", y1: "182", x2: "153", y2: "155", strokeWidth: "0.7" }),
          /* @__PURE__ */ jsx("line", { x1: "138", y1: "152", x2: "153", y2: "155", strokeWidth: "0.7" })
        ] }),
        /* @__PURE__ */ jsxs("g", { className: "radar-data-points", children: [
          /* @__PURE__ */ jsx("circle", { cx: "157", cy: "222", r: "3" }),
          /* @__PURE__ */ jsx("circle", { cx: "140", cy: "182", r: "2.2" }),
          /* @__PURE__ */ jsx("circle", { cx: "138", cy: "152", r: "2.2" }),
          /* @__PURE__ */ jsx("circle", { cx: "130", cy: "94", r: "2" }),
          /* @__PURE__ */ jsx("circle", { cx: "112", cy: "210", r: "2" }),
          /* @__PURE__ */ jsx("circle", { cx: "153", cy: "155", r: "2" })
        ] })
      ] }) }),
      radarGridAngles.map((angle) => /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "radar-grid-line", style: {
        transform: `translate(-50%, -50%) rotate(${angle}deg)`
      } }, angle)),
      radarRingInsets.map((inset, index) => /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: `radar-ring ${index % 2 === 0 ? "radar-ring-major" : "radar-ring-minor"}`, style: {
        inset: `${inset}%`
      } }, inset)),
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "radar-crosshair radar-crosshair-horizontal" }),
      /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "radar-crosshair radar-crosshair-vertical" }),
      /* @__PURE__ */ jsxs("div", { className: "radar-flag-marker", children: [
        /* @__PURE__ */ jsx("span", { className: "radar-flag-pole" }),
        /* @__PURE__ */ jsx(HeroCountryFlag, {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "radar-sweep", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("div", { className: "radar-sweep-glow", "aria-hidden": "true" }),
      radarContacts.map((contact) => {
        const intensity = getSweepIntensity(sweepAngle, contact);
        const contactStyle = {
          left: `${contact.x}%`,
          top: `${contact.y}%`,
          "--radar-contact-intensity": intensity.toFixed(3)
        };
        return /* @__PURE__ */ jsxs("div", { className: `radar-contact ${intensity > 0.84 ? "radar-contact-priority" : ""}`, style: contactStyle, children: [
          /* @__PURE__ */ jsx("span", { className: "radar-contact-halo" }),
          /* @__PURE__ */ jsx(VehicleGlyph, { type: contact.type }),
          /* @__PURE__ */ jsxs("span", { className: "radar-contact-caption", children: [
            /* @__PURE__ */ jsx("span", { className: "radar-contact-title", children: contact.label }),
            /* @__PURE__ */ jsxs("span", { className: "radar-contact-meta", children: [
              contact.heading,
              " • ",
              contact.source
            ] })
          ] })
        ] }, contact.id);
      }),
      /* @__PURE__ */ jsx("div", { className: "radar-centre-point", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "radar-status-chip", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("span", { className: "radar-status-dot" }),
        "🇬🇧 UK MARKET • LIVE SCAN"
      ] })
    ] }),
    activeNotifications.map((notification) => /* @__PURE__ */ jsxs("div", { className: `radar-notification radar-notification-${notification.position} radar-notification-${notification.tone}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "radar-notification-header", children: [
        /* @__PURE__ */ jsx("span", { className: "radar-notification-label", children: notification.title }),
        /* @__PURE__ */ jsx("span", { className: "radar-notification-stamp", children: notification.stamp })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "radar-notification-vehicle", children: notification.vehicle }),
      /* @__PURE__ */ jsxs("div", { className: "radar-notification-metrics", children: [
        /* @__PURE__ */ jsxs("div", { className: "radar-notification-metric", children: [
          /* @__PURE__ */ jsx("span", { className: "radar-notification-metric-label", children: "Estimated Margin" }),
          /* @__PURE__ */ jsx("span", { className: "radar-notification-metric-value", children: notification.margin })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "radar-notification-metric", children: [
          /* @__PURE__ */ jsx("span", { className: "radar-notification-metric-label", children: "Confidence" }),
          /* @__PURE__ */ jsx("span", { className: "radar-notification-metric-value", children: notification.confidence })
        ] })
      ] })
    ] }, notification.uid))
  ] });
}
function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [submissionError, setSubmissionError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: ""
  });
  const [criteriaIndex, setCriteriaIndex] = useState(0);
  const [criteriaVisible, setCriteriaVisible] = useState(true);
  const [opportunityIndex, setOpportunityIndex] = useState(0);
  const [opportunitiesVisible, setOpportunitiesVisible] = useState(true);
  const [trialOverlayVisible, setTrialOverlayVisible] = useState(false);
  const [trialOverlayShowing, setTrialOverlayShowing] = useState(false);
  function openModal(plan) {
    setSelectedPlan(plan);
    setSubmissionError("");
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "";
  }
  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
  function handleStartFreeTrial() {
    startTrialOverlay();
    setTimeout(() => {
      hideTrialOverlay();
      scrollToSection("pricing");
    }, 1e3);
  }
  function handleHeroStartFreeTrial() {
    handleStartFreeTrial();
  }
  function startTrialOverlay() {
    setTrialOverlayShowing(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTrialOverlayVisible(true));
    });
  }
  function hideTrialOverlay() {
    setTrialOverlayVisible(false);
    setTimeout(() => setTrialOverlayShowing(false), 400);
  }
  function handleFormValueChange(e) {
    const {
      name,
      value
    } = e.currentTarget;
    setFormValues((current) => ({
      ...current,
      [name]: value
    }));
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    const data = new FormData();
    data.append("fullName", formValues.fullName);
    data.append("companyName", formValues.companyName);
    data.append("email", formValues.email);
    data.append("phone", formValues.phone);
    data.append("plan", trialPlanLabels[selectedPlan]);
    setSubmissionError("");
    setSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mdarndrp", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Unable to submit your details right now.");
      }
      startTrialOverlay();
      setModalOpen(false);
      document.body.style.overflow = "";
      const destination = pricingCheckoutLinks[selectedPlan];
      setTimeout(() => {
        hideTrialOverlay();
        window.location.assign(destination);
      }, 950);
    } catch {
      setSubmissionError("Something went wrong submitting your details. Please check your information and try again.");
      setSubmitting(false);
    }
  }
  useEffect(() => {
    const id = setInterval(() => {
      setCriteriaVisible(false);
      setTimeout(() => {
        setCriteriaIndex((i) => (i + 1) % exampleCriteria.length);
        setCriteriaVisible(true);
      }, 450);
    }, 4800);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    let fadeTimeout;
    const id = setInterval(() => {
      setOpportunitiesVisible(false);
      fadeTimeout = setTimeout(() => {
        setOpportunityIndex((i) => (i + 1) % opportunityExamples.length);
        setOpportunitiesVisible(true);
      }, 450);
    }, 6200);
    return () => {
      clearInterval(id);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, []);
  const visibleOpportunities = Array.from({
    length: 3
  }, (_, offset) => {
    return opportunityExamples[(opportunityIndex + offset) % opportunityExamples.length];
  });
  const processSteps = [{
    icon: "rule",
    step: "1",
    title: "Tell TICA What You're Looking For",
    desc: "Choose your preferred makes, models, budget, mileage, location and buying criteria in just a few minutes."
  }, {
    icon: "travel_explore",
    step: "2",
    title: "Your AI Buying Employee Searches 24/7",
    desc: "TICA continuously monitors connected vehicle marketplaces and trusted sources, learning your preferences over time."
  }, {
    icon: "notifications_active",
    step: "3",
    title: "Receive High-Confidence Buying Opportunities",
    desc: "Receive instant alerts and daily intelligence briefings when high-confidence vehicles matching your criteria become available."
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    trialOverlayShowing && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-none", style: {
      background: "rgba(3,7,18,0.92)",
      backdropFilter: "blur(8px)",
      transition: "opacity 0.35s ease",
      opacity: trialOverlayVisible ? 1 : 0
    }, children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 px-6", children: [
      /* @__PURE__ */ jsx("p", { className: "font-display-lg text-display-lg text-white font-bold tracking-tight", children: "🤖 Preparing Your AI Buying Employee..." }),
      /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto", children: "Connecting you to your subscription options..." })
    ] }) }),
    modalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-start justify-center p-4 pt-4 md:pt-8 modal-overlay overflow-y-auto", onClick: (e) => {
      if (e.target === e.currentTarget) closeModal();
    }, children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl glass-card rounded-2xl p-6 md:p-10 glow-border modal-enter mx-auto my-2 md:my-4 max-h-[calc(100vh-2rem)] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("button", { className: "absolute top-6 left-6 text-on-surface-variant hover:text-white transition-colors flex items-center gap-1", onClick: closeModal, type: "button", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl", children: "arrow_back" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest font-bold", children: "Back" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors", onClick: closeModal, type: "button", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-3xl", children: "close" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 pt-10", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-2 uppercase", children: "Beta Access" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-white", children: "Start Your Free 14-Day Trial" }),
          /* @__PURE__ */ jsxs("p", { className: "text-on-surface-variant mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            "Join early users exploring AI-assisted vehicle sourcing."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs uppercase tracking-widest font-bold", children: [
            "Selected Plan: ",
            trialPlanLabels[selectedPlan]
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleFormSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Full Name *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "fullName", onChange: handleFormValueChange, placeholder: "John Smith", required: true, type: "text", value: formValues.fullName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Company Name *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "companyName", onChange: handleFormValueChange, placeholder: "Elite Motors Ltd", required: true, type: "text", value: formValues.companyName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Email Address *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "email", onChange: handleFormValueChange, placeholder: "john@company.co.uk", required: true, type: "email", value: formValues.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Mobile Number *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "phone", onChange: handleFormValueChange, pattern: "[+]?[0-9\\s\\-]{10,}", placeholder: "+44 7000 000000", required: true, type: "tel", value: formValues.phone })
            ] })
          ] }),
          submissionError && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-300 bg-red-900/20 border border-red-500/40 rounded-lg px-4 py-3", children: submissionError }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
            /* @__PURE__ */ jsxs("button", { className: "w-full engine-start-btn text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed", disabled: submitting, type: "submit", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" }),
              submitting ? "Submitting..." : `Continue with ${trialPlanLabels[selectedPlan]}`
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-[11px] text-on-surface-variant mt-4 px-4 leading-relaxed", children: "Card required. No charge today. Cancel anytime before your trial ends. We will only use your details to contact you about your Trade in Cars Agent trial." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: "relative w-full bg-background/80 border-b border-outline-variant/30 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-20 lg:h-36", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center flex-shrink-0 gap-4", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { alt: "Trade In Cars Agent Logo", className: "h-12 lg:h-32 w-auto max-w-[140px] sm:max-w-none object-contain logo-blend", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-8 mx-6", children: [
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#how-it-works", children: "How It Works" }),
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#ai-technology", children: "AI Technology" }),
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#pricing", children: "Pricing" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center ml-auto", children: /* @__PURE__ */ jsxs("button", { className: "engine-start-btn text-white px-3 sm:px-5 md:px-7 py-1.5 md:py-2 rounded-full font-bold text-xs active:scale-95 transition-all flex items-center gap-2 uppercase tracking-tighter", onClick: handleStartFreeTrial, children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
        /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Start Free Trial" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "relative min-h-[90vh] flex items-center hero-gradient overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-display-lg text-display-lg leading-tight text-on-surface", children: [
            "Find Better Stock.",
            " ",
            /* @__PURE__ */ jsx("svg", { className: "inline-block w-10 h-10 text-primary-container align-middle ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M13 10V3L4 14h7v7l9-11h-7z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-primary-container", children: "Buy Better Cars." }),
            /* @__PURE__ */ jsx("br", {}),
            "Save Hours Every Week."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-xl", children: "Trade In Cars Agent is your AI Buying Employee, working 24/7 to monitor the market, identify high-confidence buying opportunities and help you buy better vehicles before the competition." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-4", children: [
              /* @__PURE__ */ jsxs("button", { className: "engine-start-btn text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] uppercase tracking-wider", onClick: handleHeroStartFreeTrial, children: [
                /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-white rounded-full animate-pulse" }),
                "Start Free 14-Day Trial"
              ] }),
              /* @__PURE__ */ jsx("a", { className: "border border-outline text-on-surface px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-variant transition-all", href: "#how-it-works", children: "See How It Works" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-on-surface-variant", children: "Built specifically for independent dealers, professional buyers and used vehicle specialists." }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-on-surface-variant flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
              "Card required. No charge today. Cancel anytime before your trial ends."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 pt-8 border-t border-outline-variant/20", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex -space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background bg-surface-bright flex items-center justify-center text-[10px] font-bold", children: "JD" }),
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center text-[10px] font-bold", children: "SL" }),
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-background bg-primary-container flex items-center justify-center text-[10px] font-bold", children: "EM" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "Built for UK dealers, traders and sourcing professionals" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative lg:flex items-center justify-center flex mt-10 overflow-visible", children: [
          /* @__PURE__ */ jsx(HeroRadar, {}),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container-low border-y border-outline-variant/10", id: "ai-technology", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-4 text-on-surface", children: "Meet Your AI Buying Employee" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto", children: "Four intelligent technologies working together to help you buy smarter, faster and more profitably." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8", children: [{
          title: "🧠 TICA Smart Learning™",
          desc: "Learns how your dealership buys vehicles, remembers your preferences and continuously improves every future search."
        }, {
          title: "📊 Opportunity Intelligence™",
          desc: "Analyses pricing, market demand and potential profit to highlight the strongest buying opportunities."
        }, {
          title: "⚡ TICA Decision Engine™",
          desc: "Explains why a vehicle deserves your attention, helping you make faster and more confident buying decisions."
        }, {
          title: "🛡️ TICA Certified™",
          desc: "Only the highest-confidence opportunities receive TICA Certified™, giving you greater confidence before making contact with the seller."
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-8 md:p-10 border border-outline-variant/20 transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md mb-4 text-on-surface", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant leading-relaxed", children: item.desc })
        ] }, item.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 bg-surface-container-lowest border-y border-outline-variant/10", children: /* @__PURE__ */ jsx("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [{
        icon: "verified_user",
        title: "Built for Independent Car Dealers",
        sub: "Tailored for UK market dynamics"
      }, {
        icon: "bolt",
        title: "Find Vehicle Opportunities Faster",
        sub: "AI-assisted vehicle sourcing workflow"
      }, {
        icon: "schedule",
        title: "Save Time and Focus on Selling",
        sub: "Automate the manual search grind"
      }].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: item.icon }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-headline-md text-sm text-white uppercase tracking-wider", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-xs mt-1", children: item.sub })
        ] })
      ] }, item.icon)) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface", id: "live-demo", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Live Opportunity Feed" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-4", children: "Today's AI Buying Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto", children: "Illustrative examples showing how your AI Buying Employee identifies high-confidence buying opportunities." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto mb-8 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-300/30 text-emerald-200 text-xs uppercase tracking-widest font-label-caps mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "animate-pulse", "aria-hidden": "true", children: "🟢" }),
            /* @__PURE__ */ jsx("span", { children: "Live Market Monitoring" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-on-surface-variant", children: "Scanning connected marketplaces and trusted sources 24/7." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `grid grid-cols-1 md:grid-cols-3 gap-gutter transition-all duration-500 ${opportunitiesVisible ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"}`, children: visibleOpportunities.map((car) => /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6 border-l-4 border-primary transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-primary/10 text-primary text-[10px] font-label-caps px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wider", children: "Detected" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-on-surface-variant flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xs", children: "schedule" }),
              " ",
              car.detectedAt
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-xl text-white mb-2", children: car.name }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold text-primary mb-5", children: car.askingPrice }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-widest text-on-surface-variant font-label-caps", children: "AI Confidence Score" }),
              /* @__PURE__ */ jsx("p", { className: "text-white font-bold", children: car.confidence })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-widest text-on-surface-variant font-label-caps", children: "Estimated Profit" }),
              /* @__PURE__ */ jsx("p", { className: "text-primary font-bold", children: car.estimatedProfit })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: car.ticaCertified ? "✅ TICA Certified™" : "TICA Review Queue" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-on-surface-variant", children: [
              "Detected ",
              car.detectedAt
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "text-xs text-primary/90 hover:text-primary transition-colors font-semibold", children: "View AI Analysis →" })
          ] })
        ] }, `${car.name}-${car.askingPrice}`)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container-low border-y border-outline-variant/10", id: "dashboard-preview", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-on-surface mb-4", children: "Your AI Buying Command Centre" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto", children: "See how Trade in Cars Agent helps dealers track opportunities and manage vehicle sourcing." }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-300/30 text-emerald-200 text-xs uppercase tracking-widest font-label-caps", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "🟢" }),
            /* @__PURE__ */ jsx("span", { children: "Live Market Monitoring" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12", children: [{
          label: "AI Buying Missions",
          value: "12 Active"
        }, {
          label: "High-Confidence Opportunities",
          value: "7 Found Today"
        }, {
          label: "Potential Monthly Profit",
          value: "£18,750"
        }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-surface-bright/10 border border-outline-variant/20 rounded-xl p-6 text-center backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps text-on-surface-variant uppercase tracking-widest mb-2", children: stat.label }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-extrabold text-primary", children: stat.value })
        ] }, stat.label)) }),
        /* @__PURE__ */ jsx("div", { className: "glass-card rounded-2xl overflow-hidden border border-outline-variant/20 mb-12", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left font-body-md", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-surface-variant/50 border-b border-outline-variant/20", children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Vehicle" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "AI Score" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Estimated Profit" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-outline-variant/10", children: [{
            name: "BMW M3",
            score: "97%",
            profit: "+£3,200",
            status: "TICA Certified™"
          }, {
            name: "Ford Ranger",
            score: "94%",
            profit: "+£2,100",
            status: "Watching"
          }, {
            name: "Mercedes E220",
            score: "92%",
            profit: "+£1,850",
            status: "New Opportunity"
          }].map((row) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-white font-medium", children: row.name }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-on-surface-variant font-semibold", children: row.score }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-primary font-bold", children: row.profit }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-on-surface-variant text-sm", children: row.status })
          ] }, row.name)) })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl border border-outline-variant/20 p-6 md:p-7 h-full", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps text-primary uppercase tracking-widest mb-3", children: "AI Recommendation" }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-headline-md text-xl mb-3", children: "BMW M3" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-on-surface-variant text-sm", children: [
              /* @__PURE__ */ jsx("li", { children: "High demand." }),
              /* @__PURE__ */ jsx("li", { children: "Low market supply." }),
              /* @__PURE__ */ jsx("li", { children: "Estimated profit £3,200." })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-white", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: "Recommended action:" }),
              " Contact seller immediately."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl border border-outline-variant/20 p-6 md:p-7 h-full", children: [
            /* @__PURE__ */ jsx("p", { className: "text-label-caps text-primary uppercase tracking-widest mb-4", children: "Live AI Activity" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-baseline justify-between gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant text-sm", children: "Market Scans Today" }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-semibold text-lg", children: "1,287" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-baseline justify-between gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant text-sm", children: "Vehicles Analysed" }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-semibold text-lg", children: "8,492" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-baseline justify-between gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant text-sm", children: "High-Confidence Opportunities" }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-semibold text-lg", children: "73" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "pt-1 border-t border-outline-variant/20 flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant text-sm", children: "AI Status" }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-semibold", children: "🟢 Monitoring Live" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { onClick: () => scrollToSection("dashboard-preview"), className: "border border-primary/50 text-primary px-10 py-4 rounded-full font-bold hover:bg-primary/10 transition-all uppercase tracking-widest text-sm active:scale-95", children: "Enter My AI Command Centre" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-24 bg-surface-container-lowest", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Why Dealers Need an AI Buying Employee" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-6", children: "The most profitable dealers don't search harder—they search smarter. Let TICA monitor the market while your team focuses on buying and selling vehicles." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter", children: [{
          icon: "timer_off",
          title: "Save Hours Every Week",
          desc: "Stop spending hours refreshing marketplaces and scrolling through listings. Your AI Buying Employee searches continuously so your team doesn't have to."
        }, {
          icon: "notification_important",
          title: "Never Miss Profitable Vehicles",
          desc: "The best opportunities often disappear within minutes. TICA alerts you the moment high-confidence vehicles become available."
        }, {
          icon: "psychology_alt",
          title: "Buy With Greater Confidence",
          desc: "Opportunity Intelligence™ helps prioritise stronger buying opportunities, giving you more confidence before contacting the seller."
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "p-8 glass-card rounded-2xl border-l-4 border-error/50", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-error text-4xl mb-6 block", children: item.icon }),
          /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md mb-4", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant leading-relaxed", children: item.desc })
        ] }, item.icon)) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 relative overflow-hidden", id: "how-it-works", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
            /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Our Process" }),
            /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg", children: "How Your AI Buying Employee Works" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant mt-4 leading-relaxed", children: "Getting started takes just a few minutes. Your AI Buying Employee then searches continuously for vehicles that match your buying strategy." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-surface-variant p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4 min-w-[220px]", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/20 rounded flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: "filter_list" }) }),
            /* @__PURE__ */ jsxs("div", { style: {
              minHeight: "3.5rem"
            }, className: "flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-label-caps text-on-surface-variant", children: "EXAMPLE CRITERIA" }),
              /* @__PURE__ */ jsxs("div", { style: {
                transition: "opacity 0.45s ease, transform 0.45s ease",
                opacity: criteriaVisible ? 1 : 0,
                transform: criteriaVisible ? "translateY(0)" : "translateY(4px)"
              }, children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-on-surface leading-snug", children: exampleCriteria[criteriaIndex].label }),
                exampleCriteria[criteriaIndex].lines.map((line, i) => /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant leading-snug", children: line }, i))
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex pointer-events-none absolute inset-x-0 top-7 z-20 justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl px-20 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined how-it-works-arrow", children: "east" }),
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined how-it-works-arrow how-it-works-arrow-delay", children: "east" })
          ] }) }),
          processSteps.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: `w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 glow-border ${item.step === "2" ? "how-it-works-scan-icon" : ""}`, children: /* @__PURE__ */ jsx("span", { className: `material-symbols-outlined text-on-primary-container text-3xl ${item.step === "3" ? "how-it-works-bell" : ""}`, style: {
              fontVariationSettings: "'FILL' 1"
            }, children: item.icon }) }),
            /* @__PURE__ */ jsxs("h4", { className: "font-headline-md text-headline-md mb-4", children: [
              item.step,
              ". ",
              item.title
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant", children: item.desc }),
            index < processSteps.length - 1 && /* @__PURE__ */ jsx("div", { className: "md:hidden mt-8 flex justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined how-it-works-arrow-mobile", children: "south" }) })
          ] }, item.step))
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-sm text-on-surface-variant/85 max-w-2xl mx-auto", children: "Your AI Buying Employee never stops searching. Update your buying criteria anytime." })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-24 relative", id: "pricing", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Pricing" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-4", children: "Hire Your AI Buying Employee" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-center gap-2 text-on-surface-variant mb-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "block", children: "Start with a full-featured 14-Day Professional Trial." }),
              /* @__PURE__ */ jsx("span", { className: "block mt-2", children: "After your trial, choose the subscription that's right for your dealership." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "glass-card rounded-2xl border border-outline-variant/20 bg-surface-container/60 px-4 py-3 mx-auto mb-4 max-w-3xl", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant", children: "✅ Every new customer begins with a full Professional Trial, giving you complete access to TICA before choosing your subscription." }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-on-surface-variant/70 uppercase tracking-widest", children: "Card required. No charge today. Cancel anytime before your trial ends." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 glass-card rounded-2xl flex flex-col h-full dashboard-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-9 space-y-3", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-headline-md text-headline-md leading-tight", children: "AI Buying Employee – Starter" }),
              /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-sm leading-relaxed", children: "Perfect for independent dealers and traders hiring their first AI Buying Employee." }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-white", children: "£49" }),
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: "/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-10 flex-1 text-[15px] leading-relaxed", children: ["Keeps up to 3 buying briefs actively searching for margin-ready stock", "Delivers a daily shortlist so you can make faster buying calls", "Gives you one command centre to track opportunities and next actions"].map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: "check_circle" }),
              /* @__PURE__ */ jsx("span", { children: f })
            ] }, f)) }),
            /* @__PURE__ */ jsx("button", { className: "w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95 text-center", onClick: () => openModal("starter"), type: "button", children: "Start My Starter Trial" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 glass-card rounded-2xl flex flex-col h-full glow-border relative transform md:-translate-y-4 shadow-2xl", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider", children: "⭐ MOST POPULAR" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-9 space-y-3", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-headline-md text-headline-md leading-tight", children: "AI Buying Employee – Professional" }),
              /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-sm leading-relaxed", children: "Built for active dealers who source and sell every week and need an AI employee that keeps opportunities flowing in real time." }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-primary", children: "£99" }),
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: "/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-10 flex-1 text-[15px] leading-relaxed", children: [{
              icon: "stars",
              text: "Keeps unlimited buying briefs running so no profitable lead is missed",
              bold: true
            }, {
              icon: "stars",
              text: "Sends instant opportunity alerts so your team can act before competitors",
              bold: true
            }, {
              icon: "check_circle",
              text: "Prioritises the best-fit stock using advanced AI buying intelligence",
              bold: false
            }, {
              icon: "check_circle",
              text: "Highlights margin potential with Opportunity Intelligence™ insights",
              bold: false
            }].map((f) => /* @__PURE__ */ jsxs("li", { className: `flex items-center gap-3 ${f.bold ? "font-bold" : ""}`, children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: f.icon }),
              /* @__PURE__ */ jsx("span", { children: f.text })
            ] }, f.text)) }),
            /* @__PURE__ */ jsx("button", { className: "w-full engine-start-btn text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95 text-center", onClick: () => openModal("professional"), type: "button", children: "Start My Professional Trial" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 glass-card rounded-2xl flex flex-col h-full dashboard-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-9 space-y-3", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-headline-md text-headline-md leading-tight text-secondary", children: "AI Buying Employee – Enterprise" }),
              /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-sm leading-relaxed", children: "Designed for larger dealerships, buying teams and specialist vehicle sourcing companies." }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-white", children: "£299" }),
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: "/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-10 flex-1 text-[15px] leading-relaxed", children: ["Coordinates up to 10 dealership locations from one shared buying operation", "Gives full team visibility so managers can improve buying performance", "Includes a dedicated account manager to optimise results as you scale", "Supports white-label API access for enterprise workflows and integrations"].map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: "check_circle" }),
              /* @__PURE__ */ jsx("span", { children: f })
            ] }, f)) }),
            /* @__PURE__ */ jsx("button", { className: "w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95 text-center", onClick: () => openModal("enterprise"), type: "button", children: "Start My Enterprise Trial" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-w-container-max mx-auto px-margin-desktop mt-8", children: /* @__PURE__ */ jsx("div", { className: "glass-card rounded-2xl p-5 border border-outline-variant/20", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold text-on-surface-variant", children: ["✔ Secure Stripe Checkout", "✔ Cancel Anytime", "✔ No Hidden Fees", "✔ Upgrade Anytime"].map((item) => /* @__PURE__ */ jsx("li", { className: "flex items-center justify-center text-center", children: item }, item)) }) }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container-lowest border-y border-outline-variant/10", id: "version-2", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block uppercase mb-4", children: "Product Roadmap" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-6", children: "Built for Today. Designed for Tomorrow." }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-lg", children: "TICA is continuously evolving. Here's what you receive today, what's currently being developed, and where the platform is heading in the future." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start", children: [{
          version: "Available Today",
          description: "Everything you need to start using your AI Buying Employee today.",
          status: "Available Now",
          statusClass: "bg-emerald-500/15 text-emerald-400",
          iconClass: "text-emerald-400",
          icon: "check_circle",
          items: ["AI Search Finder", "Dealer Command Centre", "Opportunity Intelligence", "TICA Smart Learning™", "TICA Decision Engine™", "TICA Certified™", "Saved Searches", "Email Notifications", "14-Day Free Trial"]
        }, {
          version: "Coming Next",
          description: "Features already planned and actively being developed.",
          status: "In Development",
          statusClass: "bg-primary/20 text-primary",
          iconClass: "text-primary",
          icon: "schedule",
          items: ["Mobile App", "Push Notifications", "Motorcycle Support", "Vans & Commercial Vehicles", "International Search", "Dealer Insights", "Vehicle Watchlists"]
        }, {
          version: "Future Vision",
          description: "Our long-term vision for the future of intelligent vehicle sourcing.",
          status: "Future Vision",
          statusClass: "bg-purple-500/15 text-purple-400",
          iconClass: "text-purple-400",
          icon: "rocket_launch",
          items: ["AI Negotiation Assistant", "Price Prediction AI", "Profit Estimator", "Vehicle History Integration", "Auction Integrations", "API Integrations", "Multi-language Support", "Multi-user Dealer Accounts"]
        }].map((phase) => /* @__PURE__ */ jsxs("div", { className: "bg-surface-container p-8 rounded-2xl border border-outline-variant/20 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md", children: phase.version }),
            /* @__PURE__ */ jsx("span", { className: `text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${phase.statusClass}`, children: phase.status })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-sm mb-6", children: phase.description }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: phase.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-on-surface-variant", children: [
            /* @__PURE__ */ jsx("span", { className: `material-symbols-outlined text-xl flex-shrink-0 ${phase.iconClass}`, children: phase.icon }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] }, phase.version)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 glass-card rounded-2xl p-8 border border-outline-variant/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: "auto_awesome" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md", children: "🚀 Future Roadmap" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [{
            icon: "search",
            text: "AI Intelligence Engine"
          }, {
            icon: "fact_check",
            text: "Vehicle History Checks"
          }, {
            icon: "gavel",
            text: "Auction Integration"
          }, {
            icon: "public",
            text: "International Search"
          }, {
            icon: "query_stats",
            text: "Dealer Insights"
          }, {
            icon: "notifications_active",
            text: "TICA Smart Alerts™"
          }].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-surface-container p-4 rounded-xl flex items-center gap-3 border border-outline-variant/20", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary-container", children: item.icon }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: item.text })
          ] }, item.text)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-primary text-on-primary text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-display-lg mb-4", children: "Ready to Hire Your AI Buying Employee?" }),
        /* @__PURE__ */ jsx("p", { className: "text-on-primary/80 text-lg mb-8", children: "Join dealers using AI to discover better buying opportunities 24/7." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("button", { className: "engine-start-btn text-white px-12 py-6 rounded-full font-bold text-2xl active:scale-95 transition-all shadow-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] uppercase tracking-widest", onClick: handleStartFreeTrial, children: "Start My 14-Day Trial" }),
          /* @__PURE__ */ jsxs("p", { className: "text-on-primary/80 flex items-center justify-center gap-2 font-medium", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            "Secure Stripe checkout • No charge today • Cancel anytime during your 14-day trial."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container border-t border-outline-variant/20", children: /* @__PURE__ */ jsx("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto text-center space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block uppercase", children: "Get Started Today" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-white", children: "Ready to Hire Your AI Buying Employee?" }),
        /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto", children: "Start with a full-featured 14-Day Professional Trial and discover how TICA can help you find better buying opportunities around the clock." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 pt-2 max-w-2xl mx-auto text-left", children: ["Card required. No charge today.", "Full access to Professional features during the trial.", "Cancel anytime during the 14 days."].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-on-surface-variant", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: "check_circle" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 mb-10 max-w-2xl mx-auto border-t border-outline-variant/15" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsx("img", { src: "https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f", alt: "TICA Certified shield", className: "tica-certified-shield h-auto w-32", decoding: "async" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-xl text-white tracking-wide", children: "Professional AI Buying Confidence" }),
              /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-medium", children: "Only opportunities that pass TICA's AI confidence analysis receive the TICA Certified™ badge before being recommended." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid w-full max-w-4xl grid-cols-1 gap-4 pt-2 sm:grid-cols-2", children: [{
            icon: "🔒",
            label: "Secure Stripe Checkout",
            desc: "Your subscription is processed securely through Stripe."
          }, {
            icon: "📅",
            label: "14-Day Professional Trial",
            desc: "Full access to every Professional feature from day one."
          }, {
            icon: "🧠",
            label: "AI Confidence Analysis",
            desc: "Every opportunity is analysed before being recommended."
          }, {
            icon: "🚗",
            label: "Built for Professional Dealers",
            desc: "Designed specifically for independent dealers, traders and buying teams."
          }].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 rounded-xl border border-outline-variant/25 bg-surface-container-high/50 px-5 py-4 text-left", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl leading-none", children: item.icon }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-white sm:text-base", children: item.label })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-on-surface-variant leading-relaxed", children: item.desc })
          ] }, item.label)) }),
          /* @__PURE__ */ jsx("p", { className: "pt-4 text-on-surface-variant font-medium max-w-xl", children: "Join professional dealers already using AI to buy better vehicles before the competition." })
        ] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-surface-container-lowest w-full py-20 border-t border-outline-variant/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { alt: "Trade In Cars Agent Logo", className: "h-16 md:h-20 lg:h-24 w-auto object-contain logo-blend", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKabmcvwQji3POw6DCSvZmOlFghhxBc4xSqvnkr647RPhuwklQMj0qzeFAToJIwomZJ_vSqpJW-nFPicV6qwiERTB5gIicgsv858anTVXqtchn1gMvh_dyWm1Wvc7fEF3NQhc_WF3zkfzaB76Awi-HDvQvgxUkHQXX42Rei9TPDQU5c2GXIrC7Szkpm32QDSGvg8ix3zOZ635ai7fd7NGDqKODHr0HGWrWxgUo7hH_0BD9-CO2cITGXq8W7O_fFnhhCyFwBCHWmVHG" }) }) }),
        /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant max-w-sm", children: "An AI-assisted vehicle sourcing platform for dealers, traders and sourcing professionals." }),
        /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "© 2026 Trade in Cars Agent. All rights reserved." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary", children: "PLATFORM" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#how-it-works", children: "How It Works" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#pricing", children: "Pricing" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm", href: "/dashboard", children: "Dealer Command Centre Preview" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm", href: "/opportunity", children: "AI Buying Report Preview" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm", href: "/search-builder", children: "AI Search Builder Preview" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#", children: "API Docs" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary", children: "LEGAL & SUPPORT" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#", children: "Privacy Policy" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#", children: "Terms of Service" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#", children: "Contact Support" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LandingPage as component
};
