import { Suspense, lazy, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Ferrofluid from './components/Ferrofluid'
import Orb from './components/Orb'
import ScrollExpand from './components/ScrollExpand'
import Masonry from './components/Masonry'
import ImageTrail from './components/ImageTrail'
import OptionWheel from './components/OptionWheel'
import './App.css'

const Kolam = lazy(() => import('./components/Kolam'))

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP = 'https://wa.me/919876543210?text=' + encodeURIComponent('Hi Pavazha Malli! I would like to order home essentials.')

const NAV_LINKS = [
  { label: 'Shop', href: '#categories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Story', href: '#story' },
  { label: 'Visit', href: '#visit' },
]

const STATS = [
  { value: '8,000+', label: 'Products in store' },
  { value: '12', label: 'Aisles under one roof' },
  { value: '1987', label: 'Serving Madurai since' },
  { value: '6 km', label: 'Same-day home delivery' },
]

const TICKER = [
  'அரிசி Rice',
  'பருப்பு Dal',
  'எண்ணெய் Oil',
  'மசாலா Spices',
  'சோப்பு Soap',
  'துணி சவர்க்காரம் Detergent',
  'பாத்திரம் Cookware',
  'தூபி Incense',
  'கொலுசு Kolam',
  'புத்தகம் Stationery',
  'துண்டு Towels',
  'பால் Milk',
  'தேநீர் Tea',
  'காபி Coffee',
]

const IMG = 'https://images.unsplash.com/'

const CATEGORIES = [
  {
    icon: '🍚',
    title: 'Groceries & Staples',
    tamil: 'மளிகைப் பொருட்கள்',
    blurb: 'Rice, dal, oils, atta, pulses and daily provisions from trusted mills.',
    tag: 'Bestseller',
    accent: '#e8502e',
    photo: `${IMG}photo-1586201375761-83865001e31c?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '🍳',
    title: 'Kitchen & Cookware',
    tamil: 'சமையலறை உபகரணங்கள்',
    blurb: 'Pressure cookers, kadai, tiffin boxes, and every vessel a Tamil kitchen needs.',
    tag: 'New stock',
    accent: '#f2a33c',
    photo: `${IMG}photo-1584990347193-6bebebfeaeee?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '🧹',
    title: 'Cleaning & Home',
    tamil: 'வீட்டு தூய்மை',
    blurb: 'Detergents, floor cleaners, brooms, buckets and room fresheners.',
    tag: 'BOGO week',
    accent: '#d9a441',
    photo: `${IMG}photo-1585421514738-01798e348b17?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '🧼',
    title: 'Toiletries & Care',
    tamil: 'தனிநபர் பராமரிப்பு',
    blurb: 'Soaps, shampoos, toothpaste, oils and daily personal care brands.',
    tag: 'Family picks',
    accent: '#7a8b63',
    photo: `${IMG}photo-1685084844860-5d94e6c82939?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '🪔',
    title: 'Pooja & Festive',
    tamil: 'பூஜை பொருட்கள்',
    blurb: 'Diyas, incense, kolam, garlands and everything for Madurai celebrations.',
    tag: 'Festive',
    accent: '#e8502e',
    photo: `${IMG}photo-1776361158597-80bcb25afee2?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '📚',
    title: 'Stationery & School',
    tamil: 'நிலையான பொருட்கள்',
    blurb: 'Notebooks, pens, exam essentials and back-to-school supplies.',
    tag: 'Term ready',
    accent: '#f2a33c',
    photo: `${IMG}photo-1503676260728-1c00da094a0b?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '🧸',
    title: 'Kids & Toys',
    tamil: 'குழந்தைகளுக்கானவை',
    blurb: 'Toys, school bags, art kits and birthday finds little ones love.',
    tag: 'For little ones',
    accent: '#d9a441',
    photo: `${IMG}photo-1568828668638-b1b4014d91a2?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
  {
    icon: '🛏️',
    title: 'Home Textiles',
    tamil: 'வீட்டு துணிகள்',
    blurb: 'Towels, bed linen, mats, curtains and comfortable everyday fabrics.',
    tag: 'Cozy',
    accent: '#7a8b63',
    photo: `${IMG}photo-1728034261564-18930dcb2c8e?fm=jpg&q=80&w=800&auto=format&fit=crop`,
  },
]

const GALLERY = [
  {
    id: 'grains-rice',
    title: 'Grains & rice',
    tamil: 'தானியம்',
    note: 'Sacks of rice, dal and pulses from trusted mills.',
    height: 500,
    img: `${IMG}photo-1644377949116-c4a6b529241c?fm=jpg&q=80&w=1000&auto=format&fit=crop`,
    url: WHATSAPP,
  },
  {
    id: 'spices-masala',
    title: 'Spices & masala',
    tamil: 'மசாலா',
    note: 'Fresh-ground masalas and colourful spice counters.',
    height: 360,
    img: `${IMG}photo-1775433205046-86e060feff06?fm=jpg&q=80&w=800&auto=format&fit=crop`,
    url: WHATSAPP,
  },
  {
    id: 'fresh-produce',
    title: 'Fresh produce',
    tamil: 'பழங்கள் & காய்கறிகள்',
    note: 'Daily vegetables and fruits, picked fresh.',
    height: 480,
    img: `${IMG}photo-1663753489332-626c2786e1a0?fm=jpg&q=80&w=800&auto=format&fit=crop`,
    url: WHATSAPP,
  },
  {
    id: 'sweets-mithai',
    title: 'Sweets & mithai',
    tamil: 'இனிப்புகள்',
    note: 'Jalebis, mithai and festive treats.',
    height: 420,
    img: `${IMG}photo-1760263217153-ef719ca2da19?fm=jpg&q=80&w=800&auto=format&fit=crop`,
    url: WHATSAPP,
  },
  {
    id: 'brass-cookware',
    title: 'Brass & cookware',
    tamil: 'பாத்திரங்கள்',
    note: 'Brass, steel and everyday cookware.',
    height: 340,
    img: `${IMG}photo-1652960018678-1f19799996c5?fm=jpg&q=80&w=800&auto=format&fit=crop`,
    url: WHATSAPP,
  },
  {
    id: 'textiles-fabrics',
    title: 'Textiles & fabrics',
    tamil: 'துணிகள்',
    note: 'Sarees, towels and home linen.',
    height: 460,
    img: `${IMG}photo-1762764214015-d5c22646465b?fm=jpg&q=80&w=800&auto=format&fit=crop`,
    url: WHATSAPP,
  },
  {
    id: 'pooja-festive',
    title: 'Pooja & festive',
    tamil: 'பூஜை & திருவிழா',
    note: 'Puja thalis, diyas and festive offerings.',
    height: 440,
    img: 'https://images.pexels.com/photos/38109564/pexels-photo-38109564.jpeg?auto=compress&cs=tinysrgb&w=1000',
    url: WHATSAPP,
  },
  {
    id: 'masala-box',
    title: 'Masala box',
    tamil: 'மசாலா பெட்டி',
    note: 'Freshly packed masalas for every Tamil kitchen.',
    height: 360,
    img: 'https://images.pexels.com/photos/37911515/pexels-photo-37911515.jpeg?auto=compress&cs=tinysrgb&w=1000',
    url: WHATSAPP,
  },
  {
    id: 'jalebi-sweets',
    title: 'Fresh jalebi',
    tamil: 'ஜிலேபி',
    note: 'Sweets made fresh at the counter.',
    height: 480,
    img: 'https://images.pexels.com/photos/5916371/pexels-photo-5916371.jpeg?auto=compress&cs=tinysrgb&w=1000',
    url: WHATSAPP,
  },
  {
    id: 'veg-market',
    title: 'Vegetable stall',
    tamil: 'காய்கறி கடை',
    note: 'Fresh vegetables straight from the market.',
    height: 420,
    img: 'https://images.pexels.com/photos/16747097/pexels-photo-16747097.jpeg?auto=compress&cs=tinysrgb&w=1000',
    url: WHATSAPP,
  },
  {
    id: 'grains-pulses',
    title: 'Grains & pulses',
    tamil: 'தானியங்கள்',
    note: 'Rice, beans and pulses in bulk sacks.',
    height: 340,
    img: 'https://images.pexels.com/photos/17555574/pexels-photo-17555574.jpeg?auto=compress&cs=tinysrgb&w=1000',
    url: WHATSAPP,
  },
  {
    id: 'handloom-textiles',
    title: 'Handloom & textiles',
    tamil: 'கைத்தறி',
    note: 'Hand-woven textiles from local looms.',
    height: 460,
    img: 'https://images.pexels.com/photos/31508152/pexels-photo-31508152.jpeg?auto=compress&cs=tinysrgb&w=1000',
    url: WHATSAPP,
  },
]

const TRAIL_IMAGES = GALLERY.map((item) => item.img)

const STORY_POINTS = [
  { year: '1987', text: 'Started as a small provisions shop on West Masi Street.' },
  { year: '1999', text: 'Expanded to a full department store with 12 aisles.' },
  { year: '2015', text: 'Brought same-day home delivery across Madurai city.' },
  { year: 'Today', text: 'A family-run store trusted by 10,000+ Madurai homes.' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal], [data-reveal-scale]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Nav({ light, onMenuClick }) {
  return (
    <header className={`nav${light ? ' nav--light' : ''}`}>
      <a className="nav__wordmark" href="#top">
        <span className="nav__wordmark-mark" aria-hidden="true" />
        Pavazha Malli
        <span className="nav__wordmark-tamil" aria-hidden="true">
          பவழ மல்லி
        </span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="nav__cta-wrap">
        <a className="nav__whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">
          Order on WhatsApp
        </a>
        <button className="nav__menu" onClick={onMenuClick} aria-label="Open menu">
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__fluid" aria-hidden="true">
        <Ferrofluid
          colors={['#e8502e', '#f2a33c', '#ffd9a0']}
          flowDirection="up"
          speed={0.42}
          scale={1.7}
          turbulence={1.2}
          fluidity={0.16}
          rimWidth={0.22}
          sharpness={2.6}
          shimmer={1.4}
          glow={2.2}
          opacity={1}
          mouseStrength={1.2}
          mouseRadius={0.4}
          mouseDampening={0.12}
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__kolam" aria-hidden="true">
        <Suspense fallback={null}>
          <Kolam opacity={0.5} size={6.2} speed={0.85} />
        </Suspense>
      </div>
      <div className="container hero__inner">
        <p className="hero__eyebrow" data-reveal>
          <span className="hero__eyebrow-tamil">உங்க வீட்டுக்கு எல்லாம்</span>
          Madurai · Department Store · Est. 1987
        </p>
        <h1 className="hero__title" data-reveal style={{ '--rd': '0.12s' }}>
          Your home,
          <br />
          <em>fully stocked.</em>
        </h1>
        <div className="hero__bottom" data-reveal style={{ '--rd': '0.24s' }}>
          <div className="hero__cta">
            <a className="btn btn--coral" href="#categories">
              Shop categories
            </a>
            <a className="btn btn--line" href="#visit">
              Visit the store
            </a>
          </div>
          <p className="hero__meta">Household essentials · Groceries · Pooja needs · Same-day delivery</p>
        </div>
      </div>
      <div className="hero__stats" data-reveal style={{ '--rd': '0.3s' }}>
        {STATS.map((stat) => (
          <div className="hero__stat" key={stat.label}>
            <span className="hero__stat-value">{stat.value}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
      <a className="hero__scroll" href="#categories" aria-label="Scroll to content">
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}

function Marquee() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Categories() {
  const [active, setActive] = useState(0)
  const [wheelSize, setWheelSize] = useState(2.1)
  const [wheelInset, setWheelInset] = useState(70)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => {
      setWheelSize(mq.matches ? 1.3 : 2.1)
      setWheelInset(mq.matches ? 12 : 70)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="band-head" data-reveal>
          <p className="band-head__eyebrow">What we stock</p>
          <h2 className="band-head__title">
            Twelve aisles. <em>One neighbourhood.</em>
          </h2>
          <p className="band-head__body">
            From morning rice to festive pooja, Pavazha Malli keeps every corner of your home ready.
          </p>
        </div>
        <div className="aisle-switcher">
          <div className="aisle-wheel" data-reveal>
            <OptionWheel
              items={CATEGORIES.map((cat) => cat.title)}
              defaultSelected={0}
              side="right"
              textColor="rgba(26, 15, 8, 0.4)"
              activeColor="#6d1f14"
              fontSize={wheelSize}
              spacing={1.45}
              curve={1}
              tilt={6}
              blur={1.2}
              fade={0.12}
              minOpacity={0.12}
              smoothing={240}
              inset={wheelInset}
              draggable
              onChange={(index) => setActive(index)}
            />
          </div>
          <div className="aisle-stage" data-reveal style={{ '--accent': CATEGORIES[active].accent }}>
            <div className="aisle-stage__stack">
              {CATEGORIES.map((cat, i) => (
                <div
                  className={`aisle-stage__img${active === i ? ' is-active' : ''}`}
                  key={cat.title}
                >
                  <img src={cat.photo} alt={active === i ? cat.title : ''} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="aisle-stage__caption">
              <span className="aisle-stage__tag">{CATEGORIES[active].tag}</span>
              <h3 className="aisle-stage__title">{CATEGORIES[active].title}</h3>
              <p className="aisle-stage__blurb">{CATEGORIES[active].blurb}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery__orb" aria-hidden="true">
        <Orb hue={22} hoverIntensity={0.3} backgroundColor="#1a0f08" />
      </div>
      <div className="container gallery__inner">
        <div className="band-head band-head--dark" data-reveal>
          <p className="band-head__eyebrow">Inside Pavazha Malli</p>
          <h2 className="band-head__title">
            A look around <em>the aisles.</em>
          </h2>
          <p className="band-head__body">
            Grains, spices, fresh produce and every home essential — the shelves are always full.
          </p>
        </div>
        <div className="gallery__masonry">
          <Masonry
            items={GALLERY}
            animateFrom="bottom"
            stagger={0.06}
            scaleOnHover
            hoverScale={0.96}
            blurToFocus
            animateOnView
          />
        </div>
        <div className="gallery__cta" data-reveal>
          <a className="btn btn--coral" href={WHATSAPP} target="_blank" rel="noreferrer">
            Order your essentials on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="story" id="story">
      <div className="story__expand">
        <ScrollExpand
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Meenakshi_Amman_Temple%2C_Madurai.jpg/1920px-Meenakshi_Amman_Temple%2C_Madurai.jpg"
          alt="Meenakshi Amman Temple gopuram, Madurai"
          title="Rooted in Madurai."
          scrollHint="Scroll"
          useWindowScroll
          startWidth={46}
          startHeight={62}
          startRadius={26}
          mediaZoom={1.4}
        >
          <span className="story__overlay-label">Est. 1987 · West Masi Street</span>
        </ScrollExpand>
      </div>
      <div className="container story__body">
        <div className="story__col story__col--text" data-reveal>
          <p className="band-head__eyebrow">Our story</p>
          <h2 className="story__title">
            From a small provisions shop to <em>Madurai&apos;s home.</em>
          </h2>
          <p className="story__lead">
            Pavazha Malli began under a neem tree on West Masi Street with three sacks of rice and a
            promise — that every Madurai home should find what it needs without walking far.
          </p>
          <p className="story__copy">
            Three generations later, we still measure rice by hand, remember every family&apos;s
            favourite brand, and greet customers by name. Big enough to stock it all. Small enough
            to know your name.
          </p>
          <a className="btn btn--dark" href="#visit">
            Come say namaskaram
          </a>
        </div>
        <div className="story__col story__col--timeline">
          {STORY_POINTS.map((point, i) => (
            <div className="timeline" data-reveal style={{ '--rd': `${i * 0.06}s` }} key={point.year}>
              <span className="timeline__year">{point.year}</span>
              <p className="timeline__text">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="container visit__grid">
        <div className="visit__col" data-reveal>
          <p className="band-head__eyebrow">Visit us</p>
          <h2 className="visit__title">
            On Masi Street, <em>every day.</em>
          </h2>
          <address className="visit__address">
            <span className="visit__street">Pavazha Malli</span>
            <span className="visit__street">12 West Masi Street,</span>
            <span className="visit__street">Madurai — 625 001, Tamil Nadu</span>
          </address>
          <div className="visit__meta">
            <div>
              <span className="visit__meta-label">Open every day</span>
              <span className="visit__meta-value">7:30 AM – 9:30 PM</span>
            </div>
            <div>
              <span className="visit__meta-label">Call the store</span>
              <a className="visit__meta-value" href="tel:+914522345678">
                +91 452 234 5678
              </a>
            </div>
            <div>
              <span className="visit__meta-label">WhatsApp orders</span>
              <a className="visit__meta-value" href={WHATSAPP} target="_blank" rel="noreferrer">
                Message us anytime
              </a>
            </div>
          </div>
        </div>
        <div className="visit__col visit__col--card" data-reveal-scale>
          <div className="visit__card">
            <span className="visit__card-chip">📍 5 min from Meenakshi Amman Temple</span>
            <div className="visit__card-rows">
              <div className="visit__card-row">
                <span>Same-day delivery</span>
                <span>Within 6 km</span>
              </div>
              <div className="visit__card-row">
                <span>Monthly credit</span>
                <span>For regulars</span>
              </div>
              <div className="visit__card-row">
                <span>Bulk & festive orders</span>
                <span>Call ahead</span>
              </div>
            </div>
            <a className="btn btn--coral btn--block" href={WHATSAPP} target="_blank" rel="noreferrer">
              Order via WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter__trail" aria-hidden="true">
        <ImageTrail items={TRAIL_IMAGES} variant={2} />
      </div>
      <div className="container newsletter__inner">
        <p className="band-head__eyebrow">Weekly offers</p>
        <h2 className="newsletter__title" data-reveal>
          Friday offers, in your <em>inbox.</em>
        </h2>
        {done ? (
          <p className="newsletter__done" data-reveal>
            Nandri! 🙏 We&apos;ll send this week&apos;s offers every Friday.
          </p>
        ) : (
          <form
            className="newsletter__form"
            data-reveal
            onSubmit={(e) => {
              e.preventDefault()
              if (email.trim()) setDone(true)
            }}
          >
            <input
              className="newsletter__input"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className="btn btn--coral" type="submit">
              Subscribe
            </button>
          </form>
        )}
        <p className="newsletter__hint">Move your cursor — watch the store come alive.</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__brand">
          <a className="nav__wordmark footer__wordmark" href="#top">
            <span className="nav__wordmark-mark" aria-hidden="true" />
            Pavazha Malli
          </a>
          <p className="footer__tagline">
            உங்க வீட்டுக்கு எல்லாம் — everything for your home, under one roof.
          </p>
        </div>
        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__head">Shop</h4>
            {['Groceries', 'Kitchen', 'Cleaning', 'Toiletries', 'Pooja & Festive'].map((label) => (
              <a key={label} href="#categories">
                {label}
              </a>
            ))}
          </div>
          <div className="footer__col">
            <h4 className="footer__head">Store</h4>
            {[
              { label: 'Gallery', href: '#gallery' },
              { label: 'Our story', href: '#story' },
              { label: 'Visit us', href: '#visit' },
              { label: 'Friday offers', href: '#newsletter' },
            ].map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="footer__col">
            <h4 className="footer__head">Reach us</h4>
            <a href="tel:+914522345678">+91 452 234 5678</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="mailto:hello@pavazhamali.in">hello@pavazhamali.in</a>
          </div>
        </div>
        <div className="footer__bar">
          <span>© {new Date().getFullYear()} Pavazha Malli, Madurai. All rights reserved.</span>
          <span>Made with ❤️ in Madurai</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  useReveal()

  const [light, setLight] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

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
    const ctx = gsap.context(() => {
      gsap.to('.hero__fluid canvas, .hero__scrim', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero__title', {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '55% top',
          scrub: true,
        },
      })
      gsap.to('.marquee__track', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.marquee',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      gsap.to('.story__expand', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story__expand',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setLight(window.scrollY > window.innerHeight * 0.72)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">
      <Nav light={light} onMenuClick={() => setMenuOpen(true)} />
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ×
          </button>
          <nav>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a className="mobile-menu__cta" href={WHATSAPP} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Gallery />
        <Story />
        <Visit />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
