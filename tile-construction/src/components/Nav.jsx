import { COMPANY } from '../data'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' }
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__pill">
        <a className="nav__logo" href="#top">
          {COMPANY.name}
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav__cta" href="#contact">
          Get a Quote
        </a>
      </div>
    </header>
  )
}
