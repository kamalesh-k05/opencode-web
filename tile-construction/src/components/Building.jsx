import { useState } from 'react'
import { BlurHeadline } from '../lib'
import { IMG } from '../data'

const VIEWS = [
  { label: 'Morning Light', src: IMG.hero1 },
  { label: 'The Site', src: IMG.about },
  { label: 'The Skyline', src: IMG.skyline }
]

export default function Building() {
  const [active, setActive] = useState(0)

  return (
    <section className="building" id="work">
      <span className="building__watermark" aria-hidden="true">
        TILE CONSTRUCTION
      </span>

      <div className="building__inner">
        <div className="building__head">
          <div className="building__tabs" role="tablist" aria-label="Views">
            {VIEWS.map((view, i) => (
              <button
                key={view.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`building__tab ${active === i ? 'building__tab--on' : ''}`}
                onClick={() => setActive(i)}
              >
                {view.label}
              </button>
            ))}
          </div>

          <BlurHeadline
            as="h1"
            className="building__title"
            text="From first dig to final finish."
            step={22}
          />
        </div>

        <div className="building__viewer">
          {VIEWS.map((view, i) => (
            <img
              key={view.label}
              src={view.src}
              alt=""
              loading="lazy"
              className={`building__img ${active === i ? 'building__img--on' : ''}`}
            />
          ))}
        </div>

        <a className="building__card" href="#projects">
          <span className="building__card-title">The Yard</span>
          <span className="building__card-arrow">&#8594;</span>
        </a>
      </div>
    </section>
  )
}
