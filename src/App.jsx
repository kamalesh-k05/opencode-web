import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import FoldText from './components/FoldText'
import LightTunnel from './components/LightTunnel'
import Orb from './components/Orb'
import SpecularButton from './components/SpecularButton'
import Threads from './components/Threads'
import Topography from './components/Topography'
import Ferrofluid from './components/Ferrofluid'
import Lightfall from './components/Lightfall'
import MobileMenu from './components/MobileMenu'
import PillNav from './components/PillNav'
import LiquidFilterPill from './components/LiquidFilterPill'
import './App.css'

const Scene = lazy(() => import('./components/Scene'))

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

const MARQUEE = [
  'Artificial Intelligence',
  'Cybersecurity',
  'Data Science',
  'Software Engineering',
  'Networks &amp; Distributed Systems',
  'Human–Computer Interaction',
  'Algorithms &amp; Complexity',
  'Graphics &amp; Game Development',
  'Quantum Computing',
  'Cloud &amp; DevOps',
]

const PROGRAM_CATEGORIES = ['All', 'AI & ML', 'Systems & Security', 'Data & Analytics', 'Graphics & Media']

const PROGRAMS = [
  {
    index: '01',
    title: 'Artificial Intelligence',
    category: 'AI & ML',
    blurb: 'Neural networks, reinforcement learning, and the ethics of intelligent machines.',
    tags: ['Machine Learning', 'NLP', 'Computer Vision'],
    accent: '#ff5ce1',
  },
  {
    index: '02',
    title: 'Cybersecurity',
    category: 'Systems & Security',
    blurb: 'Defend modern infrastructure — from secure cryptography to offensive red-teaming.',
    tags: ['Cryptography', 'Networks', 'Forensics'],
    accent: '#22d3ee',
  },
  {
    index: '03',
    title: 'Data Science',
    category: 'Data & Analytics',
    blurb: 'Turn raw streams of data into decisions, models, and stories that matter.',
    tags: ['Statistics', 'Databases', 'Visualization'],
    accent: '#4ade80',
  },
  {
    index: '04',
    title: 'Software Engineering',
    category: 'Systems & Security',
    blurb: 'Design and ship reliable systems at scale — architecture, testing, and team craft.',
    tags: ['Systems Design', 'DevOps', 'Open Source'],
    accent: '#60a5fa',
  },
  {
    index: '05',
    title: 'Systems &amp; Networks',
    category: 'Systems & Security',
    blurb: 'The invisible backbone: operating systems, distributed computing, and the internet.',
    tags: ['OS', 'Compilers', 'Distributed Systems'],
    accent: '#8b7bff',
  },
  {
    index: '06',
    title: 'Graphics &amp; Games',
    category: 'Graphics & Media',
    blurb: 'Real-time rendering, simulation, and the math that makes pixels move.',
    tags: ['Rendering', 'GPU', 'Simulation'],
    accent: '#fbbf24',
  },
]

const FLUID_COLORS = ['#22d3ee', '#8b7bff', '#ff5ce1']

const FEATURES = [
  'Project-based capstone with industry partners every semester',
  '2:1 student-to-advising ratio with faculty mentors',
  'Freshman-friendly intro track — no prior coding required',
  'Internships at 300+ partner companies worldwide',
]

const CODE_LINES = [
  { tokens: [{ t: 'k', v: 'class' }, { t: ' ', v: ' ' }, { t: 'f', v: 'NeuralCore' }, { t: ' ', v: ' ' }, { t: 'p', v: ':' }] },
  { tokens: [{ t: ' ', v: '    ' }, { t: 'k', v: 'def' }, { t: ' ', v: ' ' }, { t: 'f', v: 'train' }, { t: 'p', v: '(' }, { t: ' ', v: 'self' }, { t: 'p', v: ', ' }, { t: ' ', v: 'data' }, { t: 'p', v: ')' }, { t: 'p', v: ':' }] },
  { tokens: [{ t: ' ', v: '        ' }, { t: 's', v: '"learning rate" ' }, { t: 'p', v: '= ' }, { t: 'c', v: '1e-3' }] },
  { tokens: [{ t: ' ', v: '        ' }, { t: 'k', v: 'for' }, { t: ' ', v: ' ' }, { t: ' ', v: 'epoch' }, { t: ' ', v: ' ' }, { t: 'k', v: 'in' }, { t: ' ', v: ' ' }, { t: ' ', v: 'range' }, { t: 'p', v: '(' }, { t: 'c', v: '100' }, { t: 'p', v: ')' }, { t: 'p', v: ':' }] },
  { tokens: [{ t: ' ', v: '            ' }, { t: ' ', v: 'self' }, { t: 'p', v: '.' }, { t: ' ', v: 'backward' }, { t: 'p', v: '(' }, { t: ' ', v: 'data' }, { t: 'p', v: ')' }] },
  { tokens: [{ t: ' ', v: '            ' }, { t: 'k', v: 'if' }, { t: ' ', v: ' ' }, { t: ' ', v: 'epoch' }, { t: 'p', v: ' % ' }, { t: 'c', v: '10' }, { t: ' ', v: ' ' }, { t: ' ', v: '==' }, { t: ' ', v: ' ' }, { t: 'c', v: '0' }, { t: 'p', v: ':' }] },
  { tokens: [{ t: ' ', v: '                ' }, { t: ' ', v: 'log_loss' }, { t: 'p', v: '(' }, { t: ' ', v: 'self' }, { t: 'p', v: ')' }] },
]

const RESEARCH = [
  { area: 'AI Safety &amp; Alignment', group: 'Safeguards Lab' },
  { area: 'Distributed Ledgers', group: 'Protocols Group' },
  { area: 'Human–Computer Interaction', group: 'Interaction Studio' },
  { area: 'Quantum Algorithms', group: 'Q-Lab' },
  { area: 'Robotics &amp; Perception', group: 'Embodied Systems' },
  { area: 'Programming Languages', group: 'Type Systems Lab' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function usePointerEffects() {
  useEffect(() => {
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      document.querySelectorAll('[data-depth]').forEach((el) => {
        const d = Number(el.dataset.depth) || 0
        el.style.transform = `translate3d(${nx * d}px, ${ny * d}px, 0)`
      })
      const card = e.target.closest('[data-tilt]')
      document.querySelectorAll('[data-tilt]').forEach((c) => {
        c.style.setProperty('--rx', '0deg')
        c.style.setProperty('--ry', '0deg')
      })
      if (card) {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        card.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`)
        card.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`)
        card.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`)
        card.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
}

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return
    setEnabled(true)

    let tx = -100
    let ty = -100
    let rx = -100
    let ry = -100
    let raf

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 2.5}px, ${ty - 2.5}px, 0)`
      }
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [data-tilt], .chip, .program, .terminal')
      if (ringRef.current) ringRef.current.classList.toggle('is-active', Boolean(interactive))
    }

    const loop = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 8}px, ${ry - 8}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div className="cursor cursor--dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor cursor--ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__scene" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__chips" aria-hidden="true">
        <div className="chip" data-depth="22">
          <span className="chip__float">
            <span className="chip__dot chip__dot--cyan" />
            <span className="mono">acc 99.1%</span>
          </span>
        </div>
        <div className="chip chip--slow" data-depth="34">
          <span className="chip__float">
            <span className="chip__dot chip__dot--pink" />
            <span className="mono">inference 4.2ms</span>
          </span>
        </div>
        <div className="chip chip--lazy" data-depth="14">
          <span className="chip__float">
            <span className="chip__dot chip__dot--green" />
            <span className="mono">24,312 students online</span>
          </span>
        </div>
      </div>

      <div className="hero__status" data-depth="46" aria-hidden="true">
        <div className="hero__status-head mono">SYSTEM.STATUS</div>
        <div className="hero__status-row mono">
          <span className="pulse-dot pulse-dot--cyan" /> core online
        </div>
        <div className="hero__status-row mono">
          <span className="pulse-dot pulse-dot--green" /> 12/12 nodes
        </div>
        <div className="hero__status-row mono">uptime 99.98%</div>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow mono">
          <span className="hero__prompt">&gt;</span> school of computer science
          <span className="hero__eyebrow-ver">v4.2</span>
        </p>
        <h1 className="hero__title">
          <span className="hero__title-line">Computer</span>
          <span className="hero__title-line hero__title-line--stroke">Science</span>
        </h1>
        <p className="hero__sub">
          We turn ideas into systems. Theory, craft, and the courage to build the next layer of
          the digital world — one commit at a time.
        </p>
        <div className="hero__actions">
          <a className="btn btn--solid" href="#programs">
            Explore programs <span className="btn__arrow">→</span>
          </a>
          <a className="btn btn--ghost" href="#about">
            How we teach
          </a>
        </div>
        <ul className="hero__facts">
          <li>
            <span className="mono">#5</span> ranked program
          </li>
          <li>
            <span className="mono">92%</span> job placement
          </li>
          <li>
            <span className="mono">40+</span> research labs
          </li>
        </ul>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to content">
        <span className="hero__scroll-label mono">scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span className="marquee__item mono" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function About() {
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [logs, setLogs] = useState([])

  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    const now = new Date().toLocaleTimeString([], { hour12: false })
    setLogs([{ time: now, text: '▶ Init NeuralCore training pipeline...' }])

    setTimeout(() => {
      setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString([], { hour12: false }), text: '⚡ Allocated CUDA memory (16GB VRAM)' }])
    }, 600)

    setTimeout(() => {
      setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString([], { hour12: false }), text: 'Epoch 25/100 | Loss: 0.412 | Acc: 88.4%' }])
    }, 1300)

    setTimeout(() => {
      setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString([], { hour12: false }), text: 'Epoch 100/100 | Loss: 0.008 | Acc: 99.4%' }])
    }, 2000)

    setTimeout(() => {
      setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString([], { hour12: false }), text: '✓ Model optimization complete & exported!' }])
      setIsRunning(false)
    }, 2600)
  }

  const handleCopy = () => {
    const rawCode = `class NeuralCore:\n    def train(self, data):\n        "learning rate" = 1e-3\n        for epoch in range(100):\n            self.backward(data)\n            if epoch % 10 == 0:\n                log_loss(self)`
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="section section--about" id="about">
      <div className="about__backdrop" aria-hidden="true">
        <Topography
          lowColor="#0b0f2e"
          midColor="#22d3ee"
          highColor="#8b7bff"
          speed={0.3}
          morphAmount={2.6}
          morphSpeed={0.04}
          bands={3}
          thickness={0.015}
          scale={0.9}
          glow={0.35}
          colorMode="elevation"
          contrast={2.6}
          brightness={0.9}
          fillBands={false}
          opacity={0.75}
          grain
          grainIntensity={0.04}
          mouseInteraction={false}
        />
      </div>
      <div className="section__inner">
        <div className="section__head" data-reveal>
          <p className="section__eyebrow mono">
            <span className="section__eyebrow-num">01</span> about
          </p>
          <h2 className="section__title">
            A field built on questions,
            <br />
            powered by <span className="section__title-accent">curiosity.</span>
          </h2>
        </div>
        <div className="about">
          <div className="about__text" data-reveal style={{ '--rd': '0.1s' }}>
            <p>
              Computer science is not about screens — it&apos;s about abstraction, logic, and
              the joy of making machines think. For more than three decades we&apos;ve taught
              students to reason rigorously about computation and to build software that
              outlives the hype cycle.
            </p>
            <p>
              Our classrooms run on the same principles we teach: hands-on, iterative, and
              unafraid of the blank page. Whether you arrive fluent in a dozen languages or have
              never written a line of code, there is a path here for you.
            </p>
            <ul className="about__features">
              {FEATURES.map((feature, i) => (
                <li key={feature} data-reveal style={{ '--rd': `${0.05 + i * 0.07}s` }}>
                  <span className="about__feature-num mono">0{i + 1}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="terminal__wrap" data-reveal style={{ '--rd': '0.2s' }}>
            <div className="terminal" data-tilt aria-label="Example of the kind of code students write">
              <div className="terminal__bar">
                <span className="terminal__dot terminal__dot--red" />
                <span className="terminal__dot terminal__dot--yellow" />
                <span className="terminal__dot terminal__dot--green" />
                <span className="terminal__title mono">cslab — evolve.py</span>
              </div>
              <pre className="terminal__body">
                <code>
                  {CODE_LINES.map((line, i) => (
                    <div key={i}>
                      {line.tokens.map((tok, j) => (
                        <span className={`tok tok--${tok.t}`} key={j}>
                          {tok.v}
                        </span>
                      ))}
                    </div>
                  ))}
                </code>
              </pre>

              {logs.length > 0 && (
                <div className="terminal__logs">
                  {logs.map((log, index) => (
                    <div className="terminal__log-line" key={index}>
                      <span className="terminal__log-time">[{log.time}]</span>
                      <span>{log.text}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="terminal__status mono">
                <div>
                  <span className="terminal__blink">▍</span> {isRunning ? 'training active...' : '12 cores · idle'}
                </div>
                <div className="terminal__actions">
                  <button className="terminal__btn" onClick={handleCopy}>
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                  <button
                    className="terminal__btn terminal__btn--run"
                    onClick={handleRun}
                    disabled={isRunning}
                  >
                    {isRunning ? 'Running...' : '▶ Run Code'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Programs() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPrograms = activeCategory === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === activeCategory)

  return (
    <section className="section section--alt section--programs" id="programs">
      <div className="programs__backdrop" aria-hidden="true">
        <Ferrofluid
          colors={FLUID_COLORS}
          speed={0.4}
          scale={1.6}
          turbulence={1}
          fluidity={0.14}
          rimWidth={0.24}
          sharpness={1.5}
          shimmer={0.7}
          glow={3}
          flowDirection="down"
          opacity={0.9}
          mouseInteraction
          mouseStrength={1.2}
          mouseRadius={0.28}
          mouseDampening={0.12}
        />
      </div>
      <div className="section__inner">
        <div className="section__head" data-reveal>
          <p className="section__eyebrow mono">
            <span className="section__eyebrow-num">02</span> programs
          </p>
          <h2 className="section__title">
            Six tracks. <span className="section__title-outline">One obsession.</span>
          </h2>
          <p className="section__lede">
            Every specialization shares a common core — algorithms, systems, and software craft —
            then branches into the frontier you care about most.
          </p>
        </div>

        <div className="programs__filters" data-reveal>
          {PROGRAM_CATEGORIES.map((cat) => (
            <LiquidFilterPill
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        <div className="programs">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="program__wrap"
                key={program.index}
              >
                <article
                  className="program"
                  data-tilt
                  style={{ '--accent': program.accent }}
                >
                  <div className="program__top">
                    <span className="program__index mono">[{program.index}]</span>
                    <span className="program__glyph" aria-hidden="true">
                      {program.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="program__title">{program.title}</h3>
                  <p className="program__blurb">{program.blurb}</p>
                  <ul className="program__tags">
                    {program.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a className="program__link mono" href="#contact">
                    view track <span>↗</span>
                  </a>
                </article>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section className="section section--research" id="research">
      <div className="research__backdrop" aria-hidden="true">
        <Lightfall
          colors={['#22d3ee', '#8b7bff', '#ff5ce1']}
          backgroundColor="#0A29FF"
          speed={1}
          streakCount={12}
          streakWidth={1.2}
          streakLength={1}
          glow={1.2}
          density={1.2}
          twinkle={1}
          zoom={2}
          backgroundGlow={1.1}
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.6}
          mouseDampening={0.15}
        />
      </div>
      <div className="section__inner">
        <div className="section__head" data-reveal>
          <p className="section__eyebrow mono">
            <span className="section__eyebrow-num">03</span> research
          </p>
          <h2 className="section__title">
            Questions that won&apos;t
            <br />
            answer <span className="section__title-accent">themselves.</span>
          </h2>
        </div>
        <div className="research">
          <div className="research__text" data-reveal style={{ '--rd': '0.1s' }}>
            <p>
              Undergraduates work shoulder-to-shoulder with PhD students and faculty across six
              flagship labs. Nearly half of our students publish before they graduate.
            </p>
            <p>
              From hardening the protocols the internet runs on, to making machine learning
              auditable, to asking what a computer <em>should</em> be allowed to do — our labs
              are where the next decade of computing gets sketched out.
            </p>
            <a className="research__cta mono" href="#contact">
              join a lab <span>→</span>
            </a>
          </div>
          <ul className="research__list">
            {RESEARCH.map((item, i) => (
              <li key={item.area} data-reveal style={{ '--rd': `${i * 0.05}s` }}>
                <span className="research__index mono">0{i + 1}</span>
                <span className="research__area" dangerouslySetInnerHTML={{ __html: item.area }} />
                <span className="research__group mono">{item.group}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section section--cta" id="contact">
      <div className="contact__bg" aria-hidden="true">
        <Threads color={[0.72, 0.62, 1]} amplitude={1} distance={0} enableMouseInteraction />
      </div>
      <div className="section__words" aria-hidden="true">
        <span>BUILD</span>
        <span>BREAK</span>
        <span>REPEAT</span>
      </div>
      <div className="section__inner">
        <p className="section__eyebrow mono" data-reveal>
          <span className="section__eyebrow-num">04</span> contact
        </p>
        <h2 className="section__title" data-reveal style={{ '--rd': '0.08s' }}>
          <FoldText
            text={"Let's build the\nnext layer."}
            splitBy="line"
            hinge="top"
            trigger="scroll"
            duration={0.65}
            stagger={0.16}
            ease="power3.out"
            perspective={900}
            creaseShading={0.55}
            fontSize="clamp(2.6rem, 6.5vw, 5.2rem)"
            fontWeight={800}
            color="var(--text-h)"
          />
        </h2>
        <p className="section__lede" data-reveal style={{ '--rd': '0.16s' }}>
          Questions, partnerships, or a tour of our labs — the department is always
          <span className="mono"> open to a conversation.</span>
        </p>
        <div className="section__actions" data-reveal style={{ '--rd': '0.24s' }}>
          <SpecularButton
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0}
            blur={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#8b7bff"
            intensity={1}
            shineSize={10}
            shineFade={40}
            thickness={1}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate={false}
            onClick={() => window.open('https://github.com/kamalesh-k05', '_blank', 'noreferrer')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ marginRight: '0.55rem', verticalAlign: '-3px' }}
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </SpecularButton>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__tunnel" aria-hidden="true">
        <LightTunnel
          cableColor="#8b7bff"
          pulseColor="#22d3ee"
          tunnelColor="#5227FF"
          tunnelOpacity={0}
          speed={0.1}
          flowDirection="outward"
          pulseSpeed={2}
          pulseLength={0.28}
          pulseBlend={1}
          pulseWidth={1}
          cableCount={20}
          thickness={0.35}
          rimWidth={0.15}
          waviness={0.3}
          sway={0.5}
          size={1.0}
          centerX={0.0}
          centerY={0.0}
          glow={1.0}
          fadeNear={0.5}
          fadeFar={2}
          brightness={0.7}
          colorVariance
          grain
          grainIntensity={0.05}
          opacity={0.35}
          mouseInteraction
          mouseStrength={0.08}
        />
      </div>
      <div className="footer__orb" aria-hidden="true">
        <Orb hue={0} hoverIntensity={0.4} rotateOnHover backgroundColor="#0a0c18" />
      </div>
      <div className="footer__grid">
        <div className="footer__brand">
          <a className="nav__brand" href="#top">
            cs<span className="nav__brand-accent">:</span>
            <span className="nav__brand-slash">//</span>department
          </a>
          <p>School of Computer Science — invent the next layer.</p>
          <div className="footer__clock mono">
            <span className="pulse-dot pulse-dot--green" /> all systems operational
          </div>
        </div>
        <div className="footer__col">
          <h4 className="mono">Explore</h4>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="footer__col">
          <h4 className="mono">Connect</h4>
          <a href="https://github.com/kamalesh-k05" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#top">LinkedIn</a>
        </div>
      </div>
      <div className="footer__bar mono">
        <span>&copy; {new Date().getFullYear()} CS Department. All rights reserved.</span>
        <span>
          built with react · three.js · <span className="footer__angle">&lt;curiosity /&gt;</span>
        </span>
      </div>
      <div className="footer__credit mono">built by kamalesh k</div>
    </footer>
  )
}

function App() {
  useReveal()
  usePointerEffects()

  const [navHidden, setNavHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const el = href === '#top' ? 0 : document.querySelector(href)
        if (el !== null) {
          lenis.scrollTo(el, { offset: -70, duration: 1.4 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80 || y <= lastY) setNavHidden(false)
      else setNavHidden(true)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <PillNav
        items={NAV_LINKS}
        hidden={navHidden}
        baseColor="rgba(5, 6, 13, 0.75)"
        pillColor="rgba(255, 255, 255, 0.05)"
        pillTextColor="#f3f5ff"
        hoveredPillTextColor="#04060f"
        ease="power3.easeOut"
        onMobileMenuClick={() => setMobileMenuOpen(true)}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Programs />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
