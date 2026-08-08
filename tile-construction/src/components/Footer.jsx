import { COMPANY } from '../data'

const PAGES = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' }
]

const LEADS = [
  { name: 'Alex Rivera', role: 'General Contracting', phone: '212.555.0142', email: 'arivera@tileconstruction.com' },
  { name: 'Jordan Ellis', role: 'Residential', phone: '212.555.0143', email: 'jellis@tileconstruction.com' },
  { name: 'Sam Okafor', role: 'Commercial', phone: '212.555.0144', email: 'sokafor@tileconstruction.com' },
  { name: 'Priya Nair', role: 'Renovation', phone: '212.555.0145', email: 'pnair@tileconstruction.com' }
]

export default function Footer() {
  return (
    <footer className="footer" id="foot">
      <div className="footer__col">
        <span className="footer__kicker">Contact us</span>
        <h3 className="footer__head">Let's build something worth keeping.</h3>
        <form
          className="footer__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="text" placeholder="Name" aria-label="Name" />
          <input type="tel" placeholder="Phone Number" aria-label="Phone Number" required />
          <input type="email" placeholder="Email" aria-label="Email" required />
          <button type="submit" className="footer__submit">
            Submit
          </button>
        </form>
      </div>

      <div className="footer__col footer__col--links">
        <div className="footer__group">
          <span className="footer__group-title">Pages</span>
          {PAGES.map(({ label, href }) => (
            <a key={label} href={href} className="footer__link">
              {label}
            </a>
          ))}
        </div>
        <div className="footer__group">
          <span className="footer__group-title">Company</span>
          <span className="footer__link footer__link--muted">Licensing &amp; Insurance</span>
          <span className="footer__link footer__link--muted">Housing information</span>
          <span className="footer__link footer__link--muted">Privacy Policy,</span>
          <span className="footer__link footer__link--muted">Terms of Use</span>
        </div>
      </div>

      <div className="footer__col">
        <span className="footer__kicker">Project leads</span>
        <ul className="footer__leads">
          {LEADS.map((lead) => (
            <li key={lead.name} className="footer__lead">
              <span className="footer__lead-name">{lead.name}</span>
              <span className="footer__lead-role">{lead.role}</span>
              <a className="footer__lead-phone" href={`tel:${lead.phone.replace(/\./g, '')}`}>
                {lead.phone}
              </a>
              <a className="footer__lead-email" href={`mailto:${lead.email}`}>
                {lead.email}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__bar">
        <span className="footer__brand">{COMPANY.name}</span>
        <span>&copy; {new Date().getFullYear()} {COMPANY.name}. Built to last.</span>
      </div>
    </footer>
  )
}
