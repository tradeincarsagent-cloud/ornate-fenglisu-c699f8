import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const pricingCheckoutLinks = {
  starter: 'https://buy.stripe.com/28EbIU9OB8yucva3Jp2cg0h',
  professional: 'https://buy.stripe.com/7sY9AMaSF7uqcvabbR2cg0f',
  dealerGroup: 'https://buy.stripe.com/28E3coe4R4ie9iYeo32cg0g',
} as const

function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function openModal() {
    setModalOpen(true)
    setSubmitted(false)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setModalOpen(false)
    document.body.style.overflow = ''
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await fetch('https://formspree.io/f/mdarndrp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
  }

  // WebGL radar animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() { gl_Position = aVertexPosition; }
    `
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
    `

    function loadShader(type: number, source: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, loadShader(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, loadShader(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'aVertexPosition')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'uTime')
    const resLoc = gl.getUniformLocation(program, 'uResolution')

    let rafId: number
    function render(time: number) {
      canvas!.width = canvas!.clientWidth
      canvas!.height = canvas!.clientHeight
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.uniform1f(timeLoc, time * 0.001)
      gl!.uniform2f(resLoc, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      {/* Lead Capture Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay overflow-y-auto"
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="relative w-full max-w-2xl glass-card rounded-2xl p-8 md:p-10 glow-border modal-enter mx-auto my-8">
            <button
              className="absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors"
              onClick={closeModal}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {!submitted ? (
              <div>
                <div className="mb-8">
                  <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-2 uppercase">Beta Access</span>
                  <h2 className="font-display-lg text-headline-lg text-white">Start Your Free 14-Day Trial</h2>
                  <p className="text-on-surface-variant mt-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    Join early users exploring AI-assisted vehicle sourcing.
                  </p>
                </div>
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Full Name *</label>
                      <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="fullName" placeholder="John Smith" required type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Company Name *</label>
                      <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="companyName" placeholder="Elite Motors Ltd" required type="text" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Email Address *</label>
                      <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="email" placeholder="john@company.co.uk" required type="email" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mobile Number *</label>
                      <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="phone" pattern="[+]?[0-9\s\-]{10,}" placeholder="+44 7000 000000" required type="tel" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="w-full engine-start-btn text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3" type="submit">
                      <span className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
                      Engine Start: Free Trial
                    </button>
                    <p className="text-center text-[11px] text-on-surface-variant mt-4 px-4 leading-relaxed">
                      Card required. No charge today. Cancel anytime before your trial ends. We will only use your details to contact you about your Trade in Cars Agent trial.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
                </div>
                <h2 className="font-display-lg text-headline-lg text-white mb-4">Application Received!</h2>
                <p className="text-on-surface-variant text-lg">
                  Thank you. Your Trade in Cars Agent trial request has been received.
                </p>
                <button className="mt-10 border border-outline text-on-surface px-8 py-3 rounded-full hover:bg-surface-variant transition-all" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative w-full bg-background/80 border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-20 lg:h-36">
          <div className="flex items-center flex-shrink-0 gap-4">
            <div className="logo-bezel rounded-lg p-1">
              <img alt="Trade In Cars Agent Logo" className="h-12 lg:h-32 w-auto max-w-[140px] sm:max-w-none object-contain logo-blend" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR0zAqkpc9M5h5mGe9z2WcicARCRnB_Rx3WcLMIjNi7lzzu0j7EvaLIJ168vhnz5N5saDVjnRGO0bTHz9Y_eWfymIxIFuS4ZO5p4KxTSsUVMvghGc2t52js5ghTlZAFj435U74gnBLfe7WxUxz4ReqHBoED4fiC1nPfKjdHwy6BC-0i89fc3l4Rmqtbn5ppQqvOFdLYBvQqxQh0hwaKLrTj4AgmVuWOxRqxGHJn2Pq00Cu-MIdtDYd8oUAb9bHOEqCSs7sbNF1HIPS" />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 mx-6">
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#how-it-works">How It Works</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#features">Features</a>
            <a className="font-body-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center ml-auto">
            <button className="engine-start-btn text-white px-4 sm:px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm active:scale-95 transition-all flex items-center gap-2 uppercase tracking-tighter" onClick={() => scrollToSection('pricing')}>
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="whitespace-nowrap">Start Free Trial</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
          <div className="absolute top-6 right-6 z-20 md:top-10 md:right-margin-desktop">
            <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/50 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(163,201,255,0.3)] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#a3c9ff]"></span>
              <span className="font-label-caps text-[10px] md:text-xs text-primary tracking-[0.2em] uppercase font-bold">Latest Update: Version 2 Live</span>
            </div>
          </div>
          <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest">LIVE INVENTORY AGENT v1.0</span>
              </div>
              <h1 className="font-display-lg text-display-lg leading-tight text-on-surface">
                Find More Stock.{' '}
                <svg className="inline-block w-10 h-10 text-primary-container align-middle ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg><br />
                <span className="text-primary-container">Buy Better Cars.</span><br />
                Save Hours Every Week.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Trade In Cars Agent is your AI vehicle finder working 24/7, helping you discover vehicle opportunities that match your exact buying criteria before the competition.
              </p>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="engine-start-btn text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] uppercase tracking-wider" onClick={() => scrollToSection('pricing')}>
                    <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                    Start Free 14-Day Trial
                  </button>
                  <a className="border border-outline text-on-surface px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-variant transition-all" href="#how-it-works">
                    See How It Works
                  </a>
                </div>
                <p className="text-xs text-on-surface-variant flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  Card required. No charge today. Cancel anytime before your trial ends.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-8 border-t border-outline-variant/20">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-bright flex items-center justify-center text-[10px] font-bold">JD</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center text-[10px] font-bold">SL</div>
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary-container flex items-center justify-center text-[10px] font-bold">EM</div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">Built for UK dealers, traders and sourcing professionals</p>
              </div>
            </div>

            <div className="relative lg:flex items-center justify-center flex mt-10 overflow-visible">
              <div className="radar-container glass-card rounded-full p-2 glow-border">
                <canvas className="absolute inset-0 w-full h-full rounded-full z-0" ref={canvasRef} width="438" height="438" />
                <div className="radar-frame"></div>
                <div className="absolute inset-4 z-20 pointer-events-none opacity-40">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
                </div>
                <div className="absolute right-2 sm:-right-8 top-3 sm:top-1/4 z-30 w-36 sm:w-56 glass-card p-2 sm:p-4 rounded-xl border-l-4 border-primary sm:translate-x-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-label-caps text-primary uppercase">New Alert</span>
                    <span className="text-[10px] text-on-surface-variant">2m ago</span>
                  </div>
                  <p className="text-xs font-bold text-white mb-1">Audi RS6 Avant</p>
                  <p className="text-[10px] text-primary">£84,900 • Under Market</p>
                </div>
                <div className="absolute left-2 sm:-left-12 bottom-3 sm:bottom-1/4 z-30 w-32 sm:w-52 glass-card p-2 sm:p-4 rounded-xl border-l-4 border-secondary sm:-translate-x-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-label-caps text-secondary uppercase">Scanning...</span>
                    <span className="material-symbols-outlined text-[12px] text-secondary">sync</span>
                  </div>
                  <p className="text-xs font-bold text-white">Private Listing Detected</p>
                  <p className="text-[10px] text-on-surface-variant">Matches "2018+ Prestige SUV"</p>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="py-12 bg-surface-container-lowest border-y border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'verified_user', title: 'Built for Independent Car Dealers', sub: 'Tailored for UK market dynamics' },
                { icon: 'bolt', title: 'Find Vehicle Opportunities Faster', sub: 'AI-assisted vehicle sourcing workflow' },
                { icon: 'schedule', title: 'Save Time and Focus on Selling', sub: 'Automate the manual search grind' },
              ].map(item => (
                <div key={item.icon} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-headline-md text-sm text-white uppercase tracking-wider">{item.title}</p>
                    <p className="text-on-surface-variant text-xs mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="py-24 bg-surface" id="live-demo">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Live Opportunity Feed (Demo)</span>
              <h2 className="font-display-lg text-headline-lg mb-6">Market Opportunity Preview</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                This is a product demonstration showing how Trade in Cars Agent will present potential vehicle opportunities from connected marketplaces and trusted sources as the platform develops.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {[
                { name: 'BMW M3 2020', price: '£31,995' },
                { name: 'Ford Ranger Wildtrak 2021', price: '£22,995' },
                { name: 'Mercedes E220 2019', price: '£18,495' },
              ].map(car => (
                <div key={car.name} className="glass-card rounded-2xl p-6 border-l-4 border-primary transition-all hover:shadow-[0_0_30px_rgba(20,147,255,0.2)]">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-primary/10 text-primary text-[10px] font-label-caps px-3 py-1 rounded-full border border-primary/20 uppercase tracking-wider">Detected</span>
                    <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span> Found 2 hours ago
                    </span>
                  </div>
                  <h3 className="font-headline-md text-xl text-white mb-2">{car.name}</h3>
                  <p className="text-2xl font-extrabold text-primary mb-4">{car.price}</p>
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                    <span className="material-symbols-outlined text-primary text-sm">trending_down</span>
                    <span>Potential Opportunity</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-24 bg-surface-container-low border-y border-outline-variant/10" id="dashboard-preview">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display-lg text-headline-lg text-on-surface mb-4">Dealer Dashboard Preview</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">See how Trade in Cars Agent helps dealers track opportunities and manage vehicle sourcing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Active Searches', value: '12' },
                { label: 'New Opportunities Today', value: '7' },
                { label: 'Saved Vehicles', value: '23' },
              ].map(stat => (
                <div key={stat.label} className="bg-surface-bright/10 border border-outline-variant/20 rounded-xl p-6 text-center backdrop-blur-md">
                  <p className="text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className="text-4xl font-extrabold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl overflow-hidden border border-outline-variant/20 mb-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-md">
                  <thead>
                    <tr className="bg-surface-variant/50 border-b border-outline-variant/20">
                      <th className="px-6 py-4 text-label-caps text-primary">Vehicle</th>
                      <th className="px-6 py-4 text-label-caps text-primary">Year</th>
                      <th className="px-6 py-4 text-label-caps text-primary">Price</th>
                      <th className="px-6 py-4 text-label-caps text-primary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { name: 'BMW M3', year: '2020', price: '£31,995', status: 'Detected 2 hours ago' },
                      { name: 'Ford Ranger Wildtrak', year: '2021', price: '£22,995', status: 'Detected 4 hours ago' },
                      { name: 'Mercedes E220', year: '2019', price: '£18,495', status: 'Detected 6 hours ago' },
                    ].map(row => (
                      <tr key={row.name} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white font-medium">{row.name}</td>
                        <td className="px-6 py-4 text-on-surface-variant">{row.year}</td>
                        <td className="px-6 py-4 text-primary font-bold">{row.price}</td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={() => scrollToSection('dashboard-preview')} className="border border-primary/50 text-primary px-10 py-4 rounded-full font-bold hover:bg-primary/10 transition-all uppercase tracking-widest text-sm active:scale-95">View Full Dashboard</button>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center mb-16">
            <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">The Problem</span>
            <h2 className="font-display-lg text-headline-lg mb-6">Dealers Waste Hours Searching For Stock</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              The manual grind of scouring marketplaces, refreshing tabs, and missing prime stock to faster buyers is costing you thousands in lost margin every month.
            </p>
          </div>
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: 'timer_off', title: 'Wasted Man-Hours', desc: 'Stop paying skilled staff to manually scroll through lists. Let AI do the heavy lifting in seconds.' },
              { icon: 'notification_important', title: 'Missed Opportunities', desc: 'Top-tier stock sells in minutes. If you aren\'t the first to see it, you\'ve already lost the profit.' },
              { icon: 'psychology_alt', title: 'Decision Fatigue', desc: 'Processing thousands of listings daily leads to errors. Our AI filters for quality automatically.' },
            ].map(item => (
              <div key={item.icon} className="p-8 glass-card rounded-2xl border-l-4 border-error/50">
                <span className="material-symbols-outlined text-error text-4xl mb-6 block">{item.icon}</span>
                <h3 className="font-headline-md text-headline-md mb-4">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 relative overflow-hidden" id="how-it-works">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Our Process</span>
                <h2 className="font-display-lg text-headline-lg">Effortless Stock Acquisition</h2>
              </div>
              <div className="bg-surface-variant p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">filter_list</span>
                </div>
                <div>
                  <p className="text-xs font-label-caps text-on-surface-variant">EXAMPLE CRITERIA</p>
                  <p className="font-bold text-on-surface">BMW M3 • 2018–2023 • &lt; £55k</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>
              {[
                { icon: 'rule', step: '1', title: 'Define Criteria', desc: 'Set your exact requirements: make, model, age, mileage, and price ceiling across all major platforms.' },
                { icon: 'travel_explore', step: '2', title: 'AI-Assisted Vehicle Search', desc: 'Designed to search connected vehicle marketplaces and trusted sources as the platform develops.' },
                { icon: 'notifications_active', step: '3', title: 'Instant Reports', desc: 'Receive curated reports or instant mobile alerts the second a matching vehicle goes live. Be the first caller.' },
              ].map(item => (
                <div key={item.step} className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-8 glow-border">
                    <span className="material-symbols-outlined text-on-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md mb-4">{item.step}. {item.title}</h4>
                  <p className="text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-surface-container" id="features">
          <div className="max-w-container-max mx-auto px-margin-desktop mb-16">
            <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Technology</span>
            <h2 className="font-display-lg text-headline-lg">Engineered for Automotive Pro's</h2>
          </div>
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
            <div className="md:col-span-8 glass-card rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden group min-h-[300px]">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-5xl mb-6 block">hub</span>
                <h3 className="font-display-lg text-headline-md mb-4">AI Vehicle Finder</h3>
                <p className="text-on-surface-variant text-lg max-w-lg">Advanced neural networks that understand vehicle specifications and condition reports better than basic keyword search.</p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-[120px] md:text-[240px]" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
              </div>
            </div>
            <div className="md:col-span-4 bg-primary-container rounded-2xl p-10 flex flex-col justify-end text-on-primary-container min-h-[300px]">
              <span className="material-symbols-outlined text-4xl mb-6 block">assessment</span>
              <h3 className="font-headline-md text-headline-md mb-2">Daily Opportunity Reports</h3>
              <p className="opacity-80">A consolidated morning briefing of the best deals found overnight, ready for your morning stand-up.</p>
            </div>
            <div className="md:col-span-4 glass-card rounded-2xl p-10 min-h-[250px]">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">dashboard</span>
              <h3 className="font-headline-md text-headline-md mb-2">Dealer Dashboard</h3>
              <p className="text-on-surface-variant">Track your search history, ROI, and saved watchlists in one centralized high-tech hub.</p>
            </div>
            <div className="md:col-span-4 glass-card rounded-2xl p-10 min-h-[250px]">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">notifications_active</span>
              <h3 className="font-headline-md text-headline-md mb-2">Email &amp; SMS Alerts</h3>
              <p className="text-on-surface-variant">Real-time push notifications so you're never tethered to your desk searching.</p>
            </div>
            <div className="md:col-span-4 glass-card rounded-2xl p-10 border-t-4 border-primary min-h-[250px]">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">groups</span>
              <h3 className="font-headline-md text-headline-md mb-2">Group Management</h3>
              <p className="text-on-surface-variant">Manage multiple sites and different buyer criteria across your entire dealer group.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 relative" id="pricing">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center mb-16">
            <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4 uppercase">Pricing</span>
            <h2 className="font-display-lg text-headline-lg mb-4">Invest in Better Stock</h2>
            <div className="flex items-center justify-center gap-2 text-on-surface-variant mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>14-Day Free Trial. Cancel Anytime. All plans include full AI search.</span>
            </div>
            <p className="text-[11px] text-on-surface-variant/70 uppercase tracking-widest">Card required. No charge today. Cancel anytime before your trial ends.</p>
          </div>
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
            {/* Starter */}
            <div className="p-8 glass-card rounded-2xl flex flex-col h-full dashboard-border">
              <div className="mb-8">
                <h4 className="font-headline-md text-headline-md mb-2">Starter</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">£49</span>
                  <span className="text-on-surface-variant">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['3 Active Watchlists', 'Daily Email Reports', 'Basic Dashboard'].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a className="w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95 text-center" href={pricingCheckoutLinks.starter}>Start Free Trial</a>
            </div>
            {/* Professional */}
            <div className="p-8 glass-card rounded-2xl flex flex-col h-full glow-border relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Recommended</div>
              <div className="mb-8">
                <h4 className="font-headline-md text-headline-md mb-2">Professional</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-primary">£99</span>
                  <span className="text-on-surface-variant">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  { icon: 'stars', text: 'Unlimited Watchlists', bold: true },
                  { icon: 'stars', text: 'Instant SMS/Push Alerts', bold: true },
                  { icon: 'check_circle', text: 'Advanced Search Filters', bold: false },
                  { icon: 'check_circle', text: 'AI Description Analysis', bold: false },
                ].map(f => (
                  <li key={f.text} className={`flex items-center gap-3 ${f.bold ? 'font-bold' : ''}`}>
                    <span className="material-symbols-outlined text-primary text-sm">{f.icon}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <a className="w-full engine-start-btn text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95 text-center" href={pricingCheckoutLinks.professional}>Start Free Trial</a>
            </div>
            {/* Dealer Group */}
            <div className="p-8 glass-card rounded-2xl flex flex-col h-full dashboard-border">
              <div className="mb-8">
                <h4 className="font-headline-md text-headline-md mb-2 text-secondary">Dealer Group</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">£299</span>
                  <span className="text-on-surface-variant">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Up to 10 Site Profiles', 'Buyer Accountability Logs', 'Dedicated Account Manager', 'API Access (White-label)'].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a className="w-full border border-outline py-4 rounded-full font-bold hover:bg-surface-variant transition-all uppercase text-sm tracking-widest active:scale-95 text-center" href={pricingCheckoutLinks.dealerGroup}>Start Free Trial</a>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/10" id="version-2">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block uppercase mb-4">Product Roadmap</span>
              <h2 className="font-display-lg text-headline-lg mb-6">Built for Today. Designed for Tomorrow.</h2>
              <p className="text-on-surface-variant text-lg">TICA is continuously evolving. Here's what you receive today, what's currently being developed, and where the platform is heading in the future.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {[
                {
                  version: 'Available Today',
                  status: 'Available Now',
                  statusClass: 'bg-primary/20 text-primary',
                  icon: 'check_circle',
                  items: [
                    'AI Search Finder',
                    'Dealer Command Centre',
                    'Opportunity Intelligence',
                    'TICA Smart Learning™',
                    'TICA Decision Engine™',
                    'TICA Certified™',
                    'Saved Searches',
                    'Email Notifications',
                    '14-Day Free Trial',
                  ],
                },
                {
                  version: 'Coming Next',
                  status: 'In Development',
                  statusClass: 'bg-tertiary/20 text-tertiary',
                  icon: 'schedule',
                  items: [
                    'Mobile App',
                    'Push Notifications',
                    'Motorcycle Support',
                    'Vans & Commercial Vehicles',
                    'International Search',
                    'Dealer Insights',
                    'Vehicle Watchlists',
                  ],
                },
                {
                  version: 'Future Vision',
                  status: 'Future Vision',
                  statusClass: 'bg-surface-bright text-on-surface-variant',
                  icon: 'rocket_launch',
                  items: [
                    'AI Negotiation Assistant',
                    'Price Prediction AI',
                    'Profit Estimator',
                    'Vehicle History Integration',
                    'Auction Integrations',
                    'API Integrations',
                    'Multi-language Support',
                    'Multi-user Dealer Accounts',
                  ],
                },
              ].map(phase => (
                <div key={phase.version} className="bg-surface-container p-8 rounded-2xl border border-outline-variant/20 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-headline-md text-headline-md">{phase.version}</h3>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${phase.statusClass}`}>{phase.status}</span>
                  </div>
                  <ul className="space-y-3">
                    {phase.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary-container text-xl flex-shrink-0">{phase.icon}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Future roadmap highlights */}
            <div className="mt-12 glass-card rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <h3 className="font-headline-md text-headline-md">🚀 Future Roadmap</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: 'search', text: 'AI Intelligence Engine' },
                  { icon: 'fact_check', text: 'Vehicle History Checks' },
                  { icon: 'gavel', text: 'Auction Integration' },
                  { icon: 'public', text: 'International Search' },
                  { icon: 'query_stats', text: 'Dealer Insights' },
                  { icon: 'notifications_active', text: 'TICA Smart Alerts™' },
                ].map(item => (
                  <div key={item.text} className="bg-surface-container p-4 rounded-xl flex items-center gap-3 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary-container">{item.icon}</span>
                    <span className="font-bold text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-on-primary text-center">
          <div className="max-w-3xl mx-auto px-margin-desktop">
            <h2 className="font-display-lg text-display-lg mb-8">Ready To Find Better Stock While You Sleep?</h2>
            <div className="space-y-6">
              <button className="engine-start-btn text-white px-12 py-6 rounded-full font-bold text-2xl active:scale-95 transition-all shadow-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] uppercase tracking-widest" onClick={() => scrollToSection('pricing')}>
                Start Free Trial Now
              </button>
              <p className="text-on-primary/80 flex items-center justify-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Card required. No charge today. Cancel anytime before your trial ends.
              </p>
            </div>
          </div>
        </section>

        {/* Static Lead Capture Footer Section */}
        <section className="py-24 bg-surface-container border-t border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="font-label-caps text-label-caps text-primary tracking-widest block uppercase">Get Started Today</span>
                <h2 className="font-display-lg text-headline-lg text-white">Ready To Find Better Stock While You Sleep?</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                  Start your 14-day trial and let our AI vehicle finder find your next high-margin vehicles. Join early users exploring AI-assisted vehicle sourcing.
                </p>
                <div className="flex flex-col gap-4 pt-4">
                  {['Card required. No charge today. Cancel anytime before your trial ends.', 'Full access to all AI features', 'Cancel anytime during the 14 days'].map(item => (
                    <div key={item} className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-8 rounded-2xl glow-border">
                <p className="text-on-surface-variant font-body-md mb-6 opacity-80 italic">Having trouble with the popup? Use this secure form below to request your free trial.</p>
                <FooterForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest w-full py-20 border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <div className="logo-bezel rounded-lg p-1">
                <img alt="Trade In Cars Agent Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain logo-blend" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKabmcvwQji3POw6DCSvZmOlFghhxBc4xSqvnkr647RPhuwklQMj0qzeFAToJIwomZJ_vSqpJW-nFPicV6qwiERTB5gIicgsv858anTVXqtchn1gMvh_dyWm1Wvc7fEF3NQhc_WF3zkfzaB76Awi-HDvQvgxUkHQXX42Rei9TPDQU5c2GXIrC7Szkpm32QDSGvg8ix3zOZ635ai7fd7NGDqKODHr0HGWrWxgUo7hH_0BD9-CO2cITGXq8W7O_fFnhhCyFwBCHWmVHG" />
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              An AI-assisted vehicle sourcing platform for dealers, traders and sourcing professionals.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">© 2024 Trade In Cars Agent. Your AI Vehicle Finder Working 24/7.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-primary">PLATFORM</span>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#how-it-works">How It Works</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#pricing">Pricing</a>
              {/* TODO: Remove preview links before production launch. */}
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm" href="/dashboard">Dealer Command Centre Preview</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm" href="/opportunity">AI Buying Report Preview</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all text-sm" href="/search-builder">AI Search Builder Preview</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">API Docs</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-label-caps text-primary">LEGAL &amp; SUPPORT</span>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">Privacy Policy</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">Terms of Service</a>
              <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all" href="#">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function FooterForm() {
  function scrollToPricing() {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Full Name *</label>
          <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="fullName" placeholder="John Smith" required type="text" />
        </div>
        <div className="space-y-1">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Company Name *</label>
          <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="companyName" placeholder="Elite Motors Ltd" required type="text" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Email Address *</label>
          <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="email" placeholder="john@company.co.uk" required type="email" />
        </div>
        <div className="space-y-1">
          <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">Mobile Number *</label>
          <input className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface text-sm" name="phone" placeholder="+44 7000 000000" required type="tel" />
        </div>
      </div>
      <div className="pt-4">
        <button className="w-full engine-start-btn text-white py-4 rounded-full font-bold text-lg transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3" type="button" onClick={scrollToPricing}>
          <span className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
          Start My Free Trial
        </button>
      </div>
    </form>
  )
}
