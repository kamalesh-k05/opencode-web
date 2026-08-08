import { Reveal } from '../lib'
import { IMG } from '../data'

const SPOTS = [
  { num: '01', label: 'Greater New York', on: true },
  { num: '02', label: 'Tri-State Area', on: false },
  { num: '03', label: 'Northeast Corridor', on: false },
  { num: '04', label: 'Beyond', on: false }
]

export default function ViewMap() {
  return (
    <section className="map" id="the-view">
      <div className="map__bg" aria-hidden="true">
        <img src={IMG.map} alt="" loading="lazy" />
      </div>

      <div className="map__mark" aria-hidden="true">
        <span className="map__mark-diamond" />
        <span className="map__mark-label">Tile Construction</span>
      </div>

      <div className="map__card">
        <span className="map__card-kicker">Coverage</span>
        <ul className="map__list">
          {SPOTS.map(({ num, label, on }) => (
            <li key={num} className={`map__item ${on ? 'map__item--on' : ''}`}>
              <span className="map__num">{num}</span>
              <span className="map__item-label">{label}</span>
            </li>
          ))}
        </ul>
        <a className="map__cta" href="#about">
          Our Standards
        </a>
      </div>

      <Reveal className="map__note">
        <span className="map__note-kicker">Workmanship</span>
        <p className="map__note-text">
          The same crew that builds it, backs it — a full warranty on every trade.
        </p>
      </Reveal>
    </section>
  )
}
