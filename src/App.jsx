import ScrollExpand from './components/ScrollExpand'
import './App.css'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2400&auto=format&fit=crop'

const PROJECTS = [
  {
    title: 'Aurora Analytics',
    description:
      'A real-time dashboard that turns thousands of events per second into charts people actually understand.',
    tags: ['React', 'TypeScript', 'D3', 'WebSocket'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Northstar Commerce',
    description:
      'Headless storefront with sub-second product search and a checkout flow that ships 38% more carts.',
    tags: ['Next.js', 'GraphQL', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Drift Editor',
    description:
      'A collaborative markdown editor with live cursors, offline sync, and a plugin system.',
    tags: ['React', 'CRDTs', 'IndexedDB'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
  },
]

const SKILLS = [
  'JavaScript / TypeScript',
  'React & Next.js',
  'Node.js',
  'CSS / Animations',
  'GraphQL',
  'PostgreSQL',
  'Testing',
  'UI Engineering',
]

function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top">
        alex<span className="nav__brand-accent">.</span>rivera
      </a>
      <nav className="nav__links" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <ScrollExpand
        src={HERO_IMAGE}
        alt="Vibrant code editor on a screen"
        title="Alex Rivera"
        scrollHint="Scroll to explore"
        scrollDistance={1}
        holdDistance={0.25}
        mediaZoom={1.35}
        useWindowScroll
      >
        <h2 className="hero__headline">Every pixel, everywhere.</h2>
        <p className="hero__sub">
          I build fast, delightful interfaces for the web — from first idea to final frame.
        </p>
        <a className="hero__cta" href="#projects">
          See the work
        </a>
      </ScrollExpand>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="section__inner">
        <div className="section__label">About</div>
        <div className="about">
          <div className="about__text">
            <h2>
              Design-minded engineer, detail-obsessed builder.
            </h2>
            <p>
              I’m a full-stack developer with a soft spot for the front of the stack. For the
              last six years I’ve shipped products used by millions — dashboards, storefronts,
              and everything between.
            </p>
            <p>
              When I’m not shipping, I’m tinkering with scroll-driven motion, contributing to
              open source, or writing about what I learn along the way.
            </p>
          </div>
          <ul className="skills" aria-label="Skills">
            {SKILLS.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section__inner">
        <div className="section__label">Selected work</div>
        <h2 className="section__title">Projects</h2>
        <div className="projects">
          {PROJECTS.map((project) => (
            <article className="project" key={project.title}>
              <a className="project__media" href="#top">
                <img src={project.image} alt="" loading="lazy" />
              </a>
              <div className="project__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section section--contact" id="contact">
      <div className="section__inner">
        <div className="section__label">Contact</div>
        <h2 className="section__title">Let&apos;s build something great.</h2>
        <p className="contact__blurb">
          I&apos;m currently open to new freelance projects and full-time roles. Tell me what
          you&apos;re making.
        </p>
        <div className="contact__actions">
          <a className="contact__button" href="mailto:hello@alexrivera.dev">
            hello@alexrivera.dev
          </a>
          <a className="contact__button contact__button--ghost" href="#top">
            GitHub
          </a>
          <a className="contact__button contact__button--ghost" href="#top">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Alex Rivera. Built with care.</span>
      </footer>
    </div>
  )
}

export default App
