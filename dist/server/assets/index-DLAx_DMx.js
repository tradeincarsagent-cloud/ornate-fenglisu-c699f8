import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef(null);
  function openModal() {
    setModalOpen(true);
    setSubmitted(false);
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
  async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("https://formspree.io/f/mdarndrp", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() { gl_Position = aVertexPosition; }
    `;
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.y, uResolution.x);
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);
        float sweep = mod(angle + uTime * 2.0, 6.28318) / 6.28318;
        sweep = pow(sweep, 4.0);
        float rings = step(0.98, mod(dist * 5.0, 1.0)) * 0.2;
        vec3 color = vec3(0.078, 0.576, 1.0) * (sweep + rings);
        float alpha = (sweep + rings) * (1.0 - smoothstep(0.9, 1.0, dist));
        gl_FragColor = vec4(color, alpha * 0.6);
      }
    `;
    function loadShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }
    const program = gl.createProgram();
    gl.attachShader(program, loadShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, loadShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "aVertexPosition");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const resLoc = gl.getUniformLocation(program, "uResolution");
    let rafId;
    function render(time) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, time * 1e-3);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);
  useEffect(() => {
    const cards = document.querySelectorAll(".glass-card");
    const handlers = [];
    cards.forEach((card) => {
      const move = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rX = (y - cy) / 25;
        const rY = (cx - x) / 25;
        card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(-5px)`;
      };
      const leave = () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push({
        el: card,
        move,
        leave
      });
    });
    return () => {
      handlers.forEach(({
        el,
        move,
        leave
      }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    modalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay overflow-y-auto", onClick: (e) => {
      if (e.target === e.currentTarget) closeModal();
    }, children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl glass-card rounded-2xl p-8 md:p-10 glow-border modal-enter mx-auto my-8", children: [
      /* @__PURE__ */ jsx("button", { className: "absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors", onClick: closeModal, children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-3xl", children: "close" }) }),
      !submitted ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-2 uppercase", children: "Beta Access" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-white", children: "Start Your Free 3-Day Trial" }),
          /* @__PURE__ */ jsxs("p", { className: "text-on-surface-variant mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            "Join early users exploring AI-assisted vehicle sourcing."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleFormSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Full Name *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "fullName", placeholder: "John Smith", required: true, type: "text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Company Name *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "companyName", placeholder: "Elite Motors Ltd", required: true, type: "text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Email Address *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "email", placeholder: "john@company.co.uk", required: true, type: "email" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Phone Number *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "phone", pattern: "[+]?[0-9\\s\\-]{10,}", placeholder: "+44 7000 000000", required: true, type: "tel" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "What vehicles do you mainly buy? *" }),
            /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "vehicleTypes", placeholder: "e.g. 2018+ Prestige SUVs, BMW/Audi Performance", required: true, type: "text" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Vehicles per month? *" }),
              /* @__PURE__ */ jsxs("select", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm appearance-none", name: "monthlyPurchases", required: true, children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select volume" }),
                /* @__PURE__ */ jsx("option", { value: "1-10", children: "1-10 vehicles" }),
                /* @__PURE__ */ jsx("option", { value: "11-30", children: "11-30 vehicles" }),
                /* @__PURE__ */ jsx("option", { value: "31-50", children: "31-50 vehicles" }),
                /* @__PURE__ */ jsx("option", { value: "50+", children: "50+ vehicles" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Preferred search area/location *" }),
              /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "searchArea", placeholder: "e.g. Nationwide or 50 miles from London", required: true, type: "text" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
            /* @__PURE__ */ jsxs("button", { className: "w-full engine-start-btn text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3", type: "submit", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" }),
              "Engine Start: Free Trial"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-[11px] text-on-surface-variant mt-4 px-4 leading-relaxed", children: "Card required. No charge today. Cancel anytime before your trial ends. We will only use your details to contact you about your Trade in Cars Agent trial." })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-5xl", children: "check_circle" }) }),
        /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-white mb-4", children: "Application Received!" }),
        /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-lg", children: "Thank you. Your Trade in Cars Agent trial request has been received." }),
        /* @__PURE__ */ jsx("button", { className: "mt-10 border border-outline text-on-surface px-8 py-3 rounded-full hover:bg-surface-variant transition-all", onClick: closeModal, children: "Close" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: "relative w-full bg-background/80 border-b border-outline-variant/30 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-20", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center flex-shrink-0 gap-4", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { alt: "Trade In Cars Agent Logo", className: "h-12 lg:h-16 w-auto max-w-[140px] sm:max-w-none object-contain logo-blend", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-8 mx-6", children: [
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#how-it-works", children: "How It Works" }),
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#features", children: "Features" }),
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#pricing", children: "Pricing" }),
        /* @__PURE__ */ jsx("a", { className: "font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300", href: "#version-2", children: "Version 2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center ml-auto", children: /* @__PURE__ */ jsxs("button", { className: "engine-start-btn text-white px-4 sm:px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm active:scale-95 transition-all flex items-center gap-2 uppercase tracking-tighter", onClick: () => scrollToSection("pricing"), children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full" }),
        /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Start Free Trial" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] flex items-center hero-gradient overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 z-20 md:top-10 md:right-margin-desktop", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/50 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(163,201,255,0.3)] animate-pulse", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#a3c9ff]" }),
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-[10px] md:text-xs text-primary tracking-[0.2em] uppercase font-bold", children: "Latest Update: Version 2 Live" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full border border-outline-variant/30", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest", children: "LIVE INVENTORY AGENT v1.0" })
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "font-display-lg text-display-lg leading-tight text-on-surface", children: [
              "Find More Stock.",
              " ",
              /* @__PURE__ */ jsx("svg", { className: "inline-block w-10 h-10 text-primary-container align-middle ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M13 10V3L4 14h7v7l9-11h-7z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-primary-container", children: "Buy Better Cars." }),
              /* @__PURE__ */ jsx("br", {}),
              "Save Hours Every Week."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-xl", children: "Trade In Cars Agent is your AI vehicle finder working 24/7, helping you discover vehicle opportunities that match your exact buying criteria before the competition." }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-4", children: [
                /* @__PURE__ */ jsxs("button", { className: "engine-start-btn text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] uppercase tracking-wider", onClick: () => scrollToSection("pricing"), children: [
                  /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-white rounded-full animate-pulse" }),
                  "Start Free 3-Day Trial"
                ] }),
                /* @__PURE__ */ jsx("a", { className: "border border-outline text-on-surface px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-variant transition-all", href: "#how-it-works", children: "See How It Works" })
              ] }),
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
          /* @__PURE__ */ jsxs("div", { className: "relative lg:flex items-center justify-center animate-float flex mt-10 overflow-visible", children: [
            /* @__PURE__ */ jsxs("div", { className: "radar-container glass-card rounded-full p-2 glow-border", children: [
              /* @__PURE__ */ jsx("canvas", { className: "absolute inset-0 w-full h-full rounded-full z-0", ref: canvasRef, width: "438", height: "438" }),
              /* @__PURE__ */ jsx("div", { className: "radar-frame" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-4 z-20 pointer-events-none opacity-40", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping", style: {
                  animationDelay: "1s"
                } }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full animate-ping", style: {
                  animationDelay: "2.5s"
                } })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute right-2 sm:-right-8 top-3 sm:top-1/4 z-30 w-36 sm:w-56 glass-card p-2 sm:p-4 rounded-xl border-l-4 border-primary sm:translate-x-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-label-caps text-primary uppercase", children: "New Alert" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-on-surface-variant", children: "2m ago" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white mb-1", children: "Audi RS6 Avant" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-primary", children: "£84,900 • Under Market" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute left-2 sm:-left-12 bottom-3 sm:bottom-1/4 z-30 w-32 sm:w-52 glass-card p-2 sm:p-4 rounded-xl border-l-4 border-secondary sm:-translate-x-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-label-caps text-secondary uppercase", children: "Scanning..." }),
                  /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[12px] text-secondary", children: "sync" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white", children: "Private Listing Detected" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-on-surface-variant", children: 'Matches "2018+ Prestige SUV"' })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" })
          ] })
        ] })
      ] }),
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
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Live Opportunity Feed (Demo)" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-6", children: "Real-Time Market Scanning" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto", children: "This is a live demonstration of how our AI identifies under-market opportunities across private and trade platforms in real-time." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-gutter", children: [{
          name: "BMW M3 2020",
          price: "£31,995"
        }, {
          name: "Ford Ranger Wildtrak 2021",
          price: "£22,995"
        }, {
          name: "Mercedes E220 2019",
          price: "£18,495"
        }].map((car) => /* @__PURE__ */ jsxs("div", { className: "glass-card rounded-2xl p-6 border-l-4 border-primary transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-primary/10 text-primary text-[10px] font-label-caps px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wider", children: "Detected" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-on-surface-variant flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xs", children: "schedule" }),
              " Found 2 hours ago"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-xl text-white mb-2", children: car.name }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-extrabold text-primary mb-4", children: car.price }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-on-surface-variant text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: "trending_down" }),
            /* @__PURE__ */ jsx("span", { children: "Potential Opportunity" })
          ] })
        ] }, car.name)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container-low border-y border-outline-variant/10", id: "dashboard-preview", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-on-surface mb-4", children: "Dealer Dashboard Preview" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto", children: "See how Trade in Cars Agent helps dealers track opportunities and manage vehicle sourcing." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12", children: [{
          label: "Active Searches",
          value: "12"
        }, {
          label: "New Opportunities Today",
          value: "7"
        }, {
          label: "Saved Vehicles",
          value: "23"
        }].map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-surface-bright/10 border border-outline-variant/20 rounded-xl p-6 text-center backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("p", { className: "text-label-caps text-on-surface-variant uppercase tracking-widest mb-2", children: stat.label }),
          /* @__PURE__ */ jsx("p", { className: "text-4xl font-extrabold text-primary", children: stat.value })
        ] }, stat.label)) }),
        /* @__PURE__ */ jsx("div", { className: "glass-card rounded-2xl overflow-hidden border border-outline-variant/20 mb-12", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left font-body-md", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-surface-variant/50 border-b border-outline-variant/20", children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Vehicle" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Year" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Price" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-label-caps text-primary", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-outline-variant/10", children: [{
            name: "BMW M3",
            year: "2020",
            price: "£31,995",
            status: "Detected 2 hours ago"
          }, {
            name: "Ford Ranger Wildtrak",
            year: "2021",
            price: "£22,995",
            status: "Detected 4 hours ago"
          }, {
            name: "Mercedes E220",
            year: "2019",
            price: "£18,495",
            status: "Detected 6 hours ago"
          }].map((row) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/5 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-white font-medium", children: row.name }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-on-surface-variant", children: row.year }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-primary font-bold", children: row.price }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-on-surface-variant text-sm", children: row.status })
          ] }, row.name)) })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { onClick: () => scrollToSection("dashboard-preview"), className: "border border-primary/50 text-primary px-10 py-4 rounded-full font-bold hover:bg-primary/10 transition-all uppercase tracking-widest text-sm active:scale-95", children: "View Full Dashboard" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-24 bg-surface-container-lowest", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "The Problem" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-6", children: "Dealers Waste Hours Searching For Stock" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto", children: "The manual grind of scouring marketplaces, refreshing tabs, and missing prime stock to faster buyers is costing you thousands in lost margin every month." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter", children: [{
          icon: "timer_off",
          title: "Wasted Man-Hours",
          desc: "Stop paying skilled staff to manually scroll through lists. Let AI do the heavy lifting in seconds."
        }, {
          icon: "notification_important",
          title: "Missed Opportunities",
          desc: "Top-tier stock sells in minutes. If you aren't the first to see it, you've already lost the profit."
        }, {
          icon: "psychology_alt",
          title: "Decision Fatigue",
          desc: "Processing thousands of listings daily leads to errors. Our AI filters for quality automatically."
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
            /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg", children: "Effortless Stock Acquisition" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-surface-variant p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/20 rounded flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: "filter_list" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-label-caps text-on-surface-variant", children: "EXAMPLE CRITERIA" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-on-surface", children: "BMW M3 • 2018–2023 • < £55k" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" }),
          [{
            icon: "rule",
            step: "1",
            title: "Define Criteria",
            desc: "Set your exact requirements: make, model, age, mileage, and price ceiling across all major platforms."
          }, {
            icon: "travel_explore",
            step: "2",
            title: "AI-Assisted Vehicle Search",
            desc: "Designed to search connected vehicle marketplaces and trusted sources as the platform develops."
          }, {
            icon: "notifications_active",
            step: "3",
            title: "Instant Reports",
            desc: "Receive curated reports or instant mobile alerts the second a matching vehicle goes live. Be the first caller."
          }].map((item) => /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 glow-border", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-on-primary-container text-3xl", style: {
              fontVariationSettings: "'FILL' 1"
            }, children: item.icon }) }),
            /* @__PURE__ */ jsxs("h4", { className: "font-headline-md text-headline-md mb-4", children: [
              item.step,
              ". ",
              item.title
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant", children: item.desc })
          ] }, item.step))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-24 bg-surface-container", id: "features", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Technology" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg", children: "Engineered for Automotive Pro's" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-6 h-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-8 glass-card rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden group min-h-[300px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-5xl mb-6 block", children: "hub" }),
              /* @__PURE__ */ jsx("h3", { className: "font-display-lg text-headline-md mb-4", children: "AI Vehicle Finder" }),
              /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-lg max-w-lg", children: "Advanced neural networks that understand vehicle specifications and condition reports better than basic keyword search." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-[120px] md:text-[240px]", style: {
              fontVariationSettings: "'FILL' 1"
            }, children: "memory" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 bg-primary-container rounded-2xl p-10 flex flex-col justify-end text-on-primary-container min-h-[300px]", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl mb-6 block", children: "assessment" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md mb-2", children: "Daily Opportunity Reports" }),
            /* @__PURE__ */ jsx("p", { className: "opacity-80", children: "A consolidated morning briefing of the best deals found overnight, ready for your morning stand-up." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 glass-card rounded-2xl p-10 min-h-[250px]", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-4xl mb-6 block", children: "dashboard" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md mb-2", children: "Dealer Dashboard" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant", children: "Track your search history, ROI, and saved watchlists in one centralized high-tech hub." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 glass-card rounded-2xl p-10 min-h-[250px]", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-4xl mb-6 block", children: "notifications_active" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md mb-2", children: "Email & SMS Alerts" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant", children: "Real-time push notifications so you're never tethered to your desk searching." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 glass-card rounded-2xl p-10 border-t-4 border-primary min-h-[250px]", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-4xl mb-6 block", children: "groups" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md mb-2", children: "Group Management" }),
            /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant", children: "Manage multiple sites and different buyer criteria across your entire dealer group." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-24 relative", id: "pricing", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop text-center mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase", children: "Pricing" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-4", children: "Invest in Better Stock" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-on-surface-variant mb-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            /* @__PURE__ */ jsx("span", { children: "3-Day Free Trial. Cancel Anytime. All plans include full AI search." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-on-surface-variant/70 uppercase tracking-widest", children: "Card required. No charge today. Cancel anytime before your trial ends." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-8 glass-card rounded-2xl flex flex-col h-full dashboard-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-headline-md text-headline-md mb-2", children: "Starter" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-white", children: "£49" }),
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: "/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-10 flex-1", children: ["3 Active Watchlists", "Daily Email Reports", "Basic Dashboard"].map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: "check_circle" }),
              /* @__PURE__ */ jsx("span", { children: f })
            ] }, f)) }),
            /* @__PURE__ */ jsx("button", { className: "w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95", onClick: openModal, children: "Start Free Trial" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 glass-card rounded-2xl flex flex-col h-full glow-border relative transform md:-translate-y-4 shadow-2xl", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider", children: "Recommended" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-headline-md text-headline-md mb-2", children: "Professional" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold text-primary", children: "£99" }),
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: "/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-10 flex-1", children: [{
              icon: "stars",
              text: "Unlimited Watchlists",
              bold: true
            }, {
              icon: "stars",
              text: "Instant SMS/Push Alerts",
              bold: true
            }, {
              icon: "check_circle",
              text: "Advanced Search Filters",
              bold: false
            }, {
              icon: "check_circle",
              text: "AI Description Analysis",
              bold: false
            }].map((f) => /* @__PURE__ */ jsxs("li", { className: `flex items-center gap-3 ${f.bold ? "font-bold" : ""}`, children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: f.icon }),
              /* @__PURE__ */ jsx("span", { children: f.text })
            ] }, f.text)) }),
            /* @__PURE__ */ jsx("button", { className: "w-full engine-start-btn text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95", onClick: openModal, children: "Start Free Trial" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 glass-card rounded-2xl flex flex-col h-full dashboard-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-headline-md text-headline-md mb-2 text-secondary", children: "Dealer Group" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-white", children: "£299" }),
                /* @__PURE__ */ jsx("span", { className: "text-on-surface-variant", children: "/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-10 flex-1", children: ["Up to 10 Site Profiles", "Buyer Accountability Logs", "Dedicated Account Manager", "API Access (White-label)"].map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-sm", children: "check_circle" }),
              /* @__PURE__ */ jsx("span", { children: f })
            ] }, f)) }),
            /* @__PURE__ */ jsx("button", { className: "w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95", onClick: openModal, children: "Start Free Trial" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container-lowest border-y border-outline-variant/10", id: "version-2", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block uppercase mb-4", children: "Product Roadmap" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg mb-6", children: "Built To Keep Getting Better" }),
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant text-lg", children: "From live AI sourcing today to negotiation and price-prediction tomorrow, here is where Trade In Cars Agent is heading across three releases." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start", children: [{
          version: "Version 1",
          status: "Available Now",
          statusClass: "bg-primary/20 text-primary",
          icon: "check_circle",
          items: ["AI-assisted vehicle sourcing", "Dealer dashboard", "Saved searches", "Email alerts", "3-day free trial", "Subscription plans"]
        }, {
          version: "Version 2",
          status: "Coming Soon",
          statusClass: "bg-tertiary/20 text-tertiary",
          icon: "schedule",
          items: ["Live AI search engine", "Mobile app (iOS & Android)", "Instant push notifications", "Saved favourites", "Dealer analytics", "Multiple countries", "Motorcycle support", "Vans & commercial vehicles", "Vehicle watchlists"]
        }, {
          version: "Version 3",
          status: "Future Development",
          statusClass: "bg-surface-bright text-on-surface-variant",
          icon: "rocket_launch",
          items: ["AI negotiation assistant", "Price prediction AI", "Profit estimator", "Vehicle history integration (HPI and similar services)", "Auction integrations", "Multi-language support", "Multi-user dealer accounts", "API integrations"]
        }].map((phase) => /* @__PURE__ */ jsxs("div", { className: "bg-surface-container p-8 rounded-2xl border border-outline-variant/20 flex flex-col h-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md", children: phase.version }),
            /* @__PURE__ */ jsx("span", { className: `text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${phase.statusClass}`, children: phase.status })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: phase.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-on-surface-variant", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary-container text-xl flex-shrink-0", children: phase.icon }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] }, phase.version)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 glass-card rounded-2xl p-8 border border-outline-variant/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: "auto_awesome" }),
            /* @__PURE__ */ jsx("h3", { className: "font-headline-md text-headline-md", children: "Coming Soon" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [{
            icon: "search",
            text: "AI Search Engine"
          }, {
            icon: "smartphone",
            text: "Mobile App"
          }, {
            icon: "two_wheeler",
            text: "Motorcycle Search"
          }, {
            icon: "fact_check",
            text: "Vehicle History Checks"
          }, {
            icon: "gavel",
            text: "Auction Integration"
          }, {
            icon: "public",
            text: "International Search"
          }].map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-surface-container p-4 rounded-xl flex items-center gap-3 border border-outline-variant/20", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary-container", children: item.icon }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: item.text })
          ] }, item.text)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-primary text-on-primary text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-margin-desktop", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-display-lg mb-8", children: "Ready To Find Better Stock While You Sleep?" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("button", { className: "engine-start-btn text-white px-12 py-6 rounded-full font-bold text-2xl active:scale-95 transition-all shadow-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] uppercase tracking-widest", onClick: () => scrollToSection("pricing"), children: "Start Free Trial Now" }),
          /* @__PURE__ */ jsxs("p", { className: "text-on-primary/80 flex items-center justify-center gap-2 font-medium", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }),
            "Card required. No charge today. Cancel anytime before your trial ends."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-surface-container border-t border-outline-variant/20", children: /* @__PURE__ */ jsx("div", { className: "max-w-container-max mx-auto px-margin-desktop", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary tracking-widest block uppercase", children: "Get Started Today" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display-lg text-headline-lg text-white", children: "Ready To Find Better Stock While You Sleep?" }),
          /* @__PURE__ */ jsx("p", { className: "font-body-lg text-body-lg text-on-surface-variant max-w-lg", children: "Start your 3-day trial and let our AI vehicle finder find your next high-margin vehicles. Join early users exploring AI-assisted vehicle sourcing." }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 pt-4", children: ["Card required. No charge today. Cancel anytime before your trial ends.", "Full access to all AI features", "Cancel anytime during the 3 days"].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-on-surface-variant", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary", children: "check_circle" }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-card p-8 rounded-2xl glow-border", children: [
          /* @__PURE__ */ jsx("p", { className: "text-on-surface-variant font-body-md mb-6 opacity-80 italic", children: "Having trouble with the popup? Use this secure form below to request your free trial." }),
          /* @__PURE__ */ jsx(FooterForm, {})
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-surface-container-lowest w-full py-20 border-t border-outline-variant/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "logo-bezel rounded-lg p-1", children: /* @__PURE__ */ jsx("img", { alt: "Trade In Cars Agent Logo", className: "h-16 md:h-20 lg:h-24 w-auto object-contain logo-blend", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKabmcvwQji3POw6DCSvZmOlFghhxBc4xSqvnkr647RPhuwklQMj0qzeFAToJIwomZJ_vSqpJW-nFPicV6qwiERTB5gIicgsv858anTVXqtchn1gMvh_dyWm1Wvc7fEF3NQhc_WF3zkfzaB76Awi-HDvQvgxUkHQXX42Rei9TPDQU5c2GXIrC7Szkpm32QDSGvg8ix3zOZ635ai7fd7NGDqKODHr0HGWrWxgUo7hH_0BD9-CO2cITGXq8W7O_fFnhhCyFwBCHWmVHG" }) }) }),
        /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant max-w-sm", children: "An AI-assisted vehicle sourcing platform for dealers, traders and sourcing professionals." }),
        /* @__PURE__ */ jsx("p", { className: "font-body-md text-body-md text-on-surface-variant", children: "© 2024 Trade In Cars Agent. Your AI Vehicle Finder Working 24/7." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "font-label-caps text-label-caps text-primary", children: "PLATFORM" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#how-it-works", children: "How It Works" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all", href: "#pricing", children: "Pricing" }),
          /* @__PURE__ */ jsx("a", { className: "font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm", href: "/dashboard", children: "Developer Preview" }),
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
function FooterForm() {
  function scrollToPricing() {
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
  return /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => e.preventDefault(), children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Full Name" }),
        /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "fullName", placeholder: "John Smith", required: true, type: "text" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Company Name" }),
        /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "companyName", placeholder: "Elite Motors Ltd", required: true, type: "text" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Email Address" }),
        /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "email", placeholder: "john@company.co.uk", required: true, type: "email" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Phone Number" }),
        /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "phone", placeholder: "+44 7000 000000", required: true, type: "tel" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Vehicle Types" }),
      /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "vehicleTypes", placeholder: "e.g. SUV, Hatchback", required: true, type: "text" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Monthly Purchases" }),
        /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "monthlyPurchases", placeholder: "e.g. 5-10", required: true, type: "text" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "font-label-caps text-[10px] text-on-surface-variant uppercase", children: "Search Area" }),
        /* @__PURE__ */ jsx("input", { className: "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm", name: "searchArea", placeholder: "e.g. London", required: true, type: "text" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs("button", { className: "w-full engine-start-btn text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3", type: "button", onClick: scrollToPricing, children: [
      /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" }),
      "Start My Free Trial"
    ] }) })
  ] });
}
export {
  LandingPage as component
};
