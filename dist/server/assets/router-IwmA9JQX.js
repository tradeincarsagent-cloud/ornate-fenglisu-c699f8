import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
const Route$b = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Trade In Cars Agent | AI-Powered Dealer Stock Acquisition" }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      }
    ],
    scripts: [
      {
        src: "https://cdn.tailwindcss.com?plugins=forms,container-queries"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  const tailwindConfig = `
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "secondary-fixed": "#d4e4fa",
            "secondary": "#b9c8de",
            "outline": "#8a919f",
            "on-tertiary": "#283044",
            "secondary-container": "#39485a",
            "inverse-primary": "#0060ab",
            "surface-container-high": "#23293c",
            "tertiary-container": "#8990a8",
            "on-surface-variant": "#c0c7d5",
            "surface-container-lowest": "#070d1f",
            "on-tertiary-container": "#22293d",
            "on-secondary-container": "#a7b6cc",
            "surface-variant": "#2e3447",
            "outline-variant": "#404753",
            "surface-dim": "#0c1324",
            "on-tertiary-fixed": "#131b2e",
            "inverse-surface": "#dce1fb",
            "tertiary": "#bec6e0",
            "surface-bright": "#33394c",
            "on-primary-container": "#002a51",
            "on-error-container": "#ffdad6",
            "on-background": "#dce1fb",
            "error-container": "#93000a",
            "background": "#0c1324",
            "on-secondary-fixed-variant": "#39485a",
            "on-secondary": "#233143",
            "on-primary-fixed-variant": "#004883",
            "secondary-fixed-dim": "#b9c8de",
            "tertiary-fixed-dim": "#bec6e0",
            "on-tertiary-fixed-variant": "#3f465c",
            "on-secondary-fixed": "#0d1c2d",
            "primary-fixed-dim": "#a3c9ff",
            "primary-fixed": "#d3e3ff",
            "inverse-on-surface": "#2a3043",
            "surface-container-low": "#151b2d",
            "tertiary-fixed": "#dae2fd",
            "surface": "#0c1324",
            "surface-container": "#191f31",
            "on-surface": "#dce1fb",
            "on-error": "#690005",
            "on-primary": "#00315d",
            "primary": "#a3c9ff",
            "on-primary-fixed": "#001c39",
            "surface-tint": "#a3c9ff",
            "primary-container": "#1493ff",
            "surface-container-highest": "#2e3447",
            "error": "#ffb4ab"
          },
          borderRadius: {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
          },
          spacing: {
            "unit": "4px",
            "margin-mobile": "16px",
            "gutter": "24px",
            "container-max": "1440px",
            "margin-desktop": "40px"
          },
          fontFamily: {
            "label-caps": ["JetBrains Mono"],
            "body-lg": ["Inter"],
            "headline-lg-mobile": ["Hanken Grotesk"],
            "body-md": ["Inter"],
            "headline-md": ["Hanken Grotesk"],
            "headline-lg": ["Hanken Grotesk"],
            "display-lg": ["Hanken Grotesk"]
          },
          fontSize: {
            "label-caps": ["12px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" }],
            "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
            "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
            "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
            "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
            "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
            "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }]
          }
        }
      }
    }
  `;
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark scroll-smooth", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: tailwindConfig }, id: "tailwind-config" })
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "antialiased", children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("./terms-of-service-BI2AY9DY.js");
const Route$a = createFileRoute("/terms-of-service")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./support-jZiYmrSh.js");
const Route$9 = createFileRoute("/support")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./settings-B6UdRlA-.js");
const Route$8 = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./search-builder-C9apQK4j.js");
const Route$7 = createFileRoute("/search-builder")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./privacy-policy-w00uo2us.js");
const Route$6 = createFileRoute("/privacy-policy")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./opportunity-5TBYfp5s.js");
const Route$5 = createFileRoute("/opportunity")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard-C4xWMbSJ.js");
const Route$4 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./cookie-policy-BheJRTHf.js");
const Route$3 = createFileRoute("/cookie-policy")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-DNzN_cXo.js");
const Route$2 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-yq8Ksgrl.js");
const Route$1 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BKmAZcuG.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsOfServiceRoute = Route$a.update({
  id: "/terms-of-service",
  path: "/terms-of-service",
  getParentRoute: () => Route$b
});
const SupportRoute = Route$9.update({
  id: "/support",
  path: "/support",
  getParentRoute: () => Route$b
});
const SettingsRoute = Route$8.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$b
});
const SearchBuilderRoute = Route$7.update({
  id: "/search-builder",
  path: "/search-builder",
  getParentRoute: () => Route$b
});
const PrivacyPolicyRoute = Route$6.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$b
});
const OpportunityRoute = Route$5.update({
  id: "/opportunity",
  path: "/opportunity",
  getParentRoute: () => Route$b
});
const DashboardRoute = Route$4.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$b
});
const CookiePolicyRoute = Route$3.update({
  id: "/cookie-policy",
  path: "/cookie-policy",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$b
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  CookiePolicyRoute,
  DashboardRoute,
  OpportunityRoute,
  PrivacyPolicyRoute,
  SearchBuilderRoute,
  SettingsRoute,
  SupportRoute,
  TermsOfServiceRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
