import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
const Route$e = createRootRoute({
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
const $$splitComponentImporter$d = () => import("./terms-of-service-BOjsxisq.js");
const Route$d = createFileRoute("/terms-of-service")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./support-D1VGkr-d.js");
const Route$c = createFileRoute("/support")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./settings-Cd2XaHER.js");
const Route$b = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./search-builder-CLTA5qLQ.js");
const Route$a = createFileRoute("/search-builder")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./privacy-policy-BBXE8Yn5.js");
const Route$9 = createFileRoute("/privacy-policy")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./owner-BRaRwun4.js");
const Route$8 = createFileRoute("/owner")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./opportunity-CGOzT-2H.js");
const Route$7 = createFileRoute("/opportunity")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard-BqLKlqUq.js");
const Route$6 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./cookie-policy-DobXpgpH.js");
const Route$5 = createFileRoute("/cookie-policy")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-BepFHwnJ.js");
const Route$4 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-C3nk08eS.js");
const Route$3 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-xs09mAor.js");
const Route$2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./owner.index-B7dpfOc-.js");
const Route$1 = createFileRoute("/owner/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./owner.intelligence-CqEcnE5a.js");
const Route = createFileRoute("/owner/intelligence")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsOfServiceRoute = Route$d.update({
  id: "/terms-of-service",
  path: "/terms-of-service",
  getParentRoute: () => Route$e
});
const SupportRoute = Route$c.update({
  id: "/support",
  path: "/support",
  getParentRoute: () => Route$e
});
const SettingsRoute = Route$b.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$e
});
const SearchBuilderRoute = Route$a.update({
  id: "/search-builder",
  path: "/search-builder",
  getParentRoute: () => Route$e
});
const PrivacyPolicyRoute = Route$9.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$e
});
const OwnerRoute = Route$8.update({
  id: "/owner",
  path: "/owner",
  getParentRoute: () => Route$e
});
const OpportunityRoute = Route$7.update({
  id: "/opportunity",
  path: "/opportunity",
  getParentRoute: () => Route$e
});
const DashboardRoute = Route$6.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$e
});
const CookiePolicyRoute = Route$5.update({
  id: "/cookie-policy",
  path: "/cookie-policy",
  getParentRoute: () => Route$e
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$e
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const OwnerIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => OwnerRoute
});
const OwnerIntelligenceRoute = Route.update({
  id: "/intelligence",
  path: "/intelligence",
  getParentRoute: () => OwnerRoute
});
const OwnerRouteChildren = {
  OwnerIntelligenceRoute,
  OwnerIndexRoute
};
const OwnerRouteWithChildren = OwnerRoute._addFileChildren(OwnerRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  CookiePolicyRoute,
  DashboardRoute,
  OpportunityRoute,
  OwnerRoute: OwnerRouteWithChildren,
  PrivacyPolicyRoute,
  SearchBuilderRoute,
  SettingsRoute,
  SupportRoute,
  TermsOfServiceRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
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
