import { BlurHeadline } from '../lib'
import { IMG } from '../data'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__tags">
        <span>Every Build</span>
        <span>Has a Story.</span>
      </div>

      <div className="about__copy">
        <p className="about__p">
          Located in the heart of the building trade, Tile Construction has spent six decades
          turning drawings into landmark workplaces. We pair exceptional project management with
          a hands-on crew that answers to one accountable team — from first excavation to final
          finish.
        </p>
        <p className="about__p">
          A 2021 modernization of our studio introduced transparent estimating, destination-scheduled
          crews, and upgraded building systems, so every client knows exactly what is on site and
          what comes next — before we pick up a hammer.
        </p>
      </div>

      <BlurHeadline className="about__head" text="A reputation that works." step={24} />

      <div className="about__media">
        <img src={IMG.about} alt="Tile Construction site" loading="lazy" />
      </div>
    </section>
  )
}
