import GradualBlur from './GradualBlur'
import { BlurHeadline } from '../lib'

const CAPABILITIES = [
  { num: '01', title: 'General Contracting', note: 'One contract, one crew, total accountability.' },
  { num: '02', title: 'Ground-Up Construction', note: 'From excavation and foundations to the final nail.' },
  { num: '03', title: 'Renovation & Remodel', note: 'Structural change, new layouts, upgraded systems.' },
  { num: '04', title: 'Commercial Builds', note: 'Offices, retail and mixed-use — on schedule.' },
  { num: '05', title: 'Residential Homes', note: 'Custom houses and extensions built to last.' },
  { num: '06', title: 'Interior Fit-Outs', note: 'Finish work, millwork and move-in-ready interiors.' },
  { num: '07', title: 'Structural & Concrete', note: 'Foundations, cores, steel and poured finishes.' },
  { num: '08', title: 'Design & Build', note: 'Architecture, engineering and construction, one team.' },
  { num: '09', title: 'Project Management', note: 'Schedules that stick, budgets that hold.' },
  { num: '10', title: 'Warranty & Service', note: 'The crew that builds it backs it, for years after.' },
  { num: '11', title: 'Historic Restoration', note: 'Pre-war craftsmanship preserved and modernized.' },
  { num: '12', title: 'Site & Safety', note: 'Clean sites, trained crews, zero-corner cutting.' }
]

export default function Capabilities() {
  return (
    <section className="caps" id="capabilities">
      <div className="caps__head">
        <BlurHeadline className="caps__title" text="Everything under one roof." step={22} />
        <p className="caps__intro">
          Twelve trades, one accountable crew. Scroll the list — and every line is a promise we
          keep in writing.
        </p>
      </div>

      <div className="caps__panel" style={{ position: 'relative', height: 460, overflow: 'hidden' }}>
        <div className="caps__scroll" style={{ height: '100%', overflowY: 'auto', padding: '2rem 2rem 0.75rem' }}>
          <ul className="caps__list">
            {CAPABILITIES.map(({ num, title, note }) => (
              <li className="caps__item" key={num}>
                <span className="caps__num">{num}</span>
                <span className="caps__item-body">
                  <strong>{title}</strong>
                  <span>{note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <GradualBlur
          target="parent"
          position="bottom"
          height="8rem"
          strength={3}
          divCount={6}
          curve="ease-out"
          exponential={true}
          opacity={1}
          animated="scroll"
          duration="0.8s"
          easing="ease-out"
        />
      </div>
    </section>
  )
}
