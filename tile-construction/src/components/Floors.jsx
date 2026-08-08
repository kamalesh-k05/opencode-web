import { Reveal } from '../lib'
import { IMG } from '../data'

function FloorsPlan() {
  return (
    <section className="floors" id="projects">
      <div className="floors__media">
        <img
          src={IMG.plan}
          alt="Tile Construction portfolio map"
          className="floors__img"
          loading="lazy"
        />
        <img
          src={IMG.planMobile}
          alt="Tile Construction portfolio map"
          className="floors__img floors__img--mobile"
          loading="lazy"
        />

        <a className="marker marker--navy" href="#legacy">
          <span className="marker__pill">New Builds</span>
          <span className="marker__square" />
        </a>

        <a className="marker marker--terra" href="#portfolio">
          <span className="marker__pill">Renovations</span>
          <span className="marker__square" />
        </a>

        <Reveal className="cardf cardf--terra" delay={100}>
          <h3>One Accountable Team</h3>
          <p>From site walk to walkthrough, a single crew answers for the entire build.</p>
        </Reveal>

        <Reveal className="cardf cardf--navy" delay={200}>
          <h3>Fixed Quotes, Honest Timelines</h3>
          <p>Estimates that hold and schedules that stick — in writing, up front.</p>
        </Reveal>

        <Reveal className="cardf cardf--cream" delay={300}>
          <h3>More Than Concrete &amp; Steel</h3>
          <p>Interiors, fit-outs and finish work under one roof. Move-in ready.</p>
        </Reveal>

        <Reveal className="cardf cardf--num" delay={0}>
          <span>01</span>
        </Reveal>
      </div>
    </section>
  )
}

function StickyGallery({
  id,
  numeral,
  eyebrow,
  title,
  copy,
  images,
  tone
}) {
  return (
    <div className="trigger">
      <section className={`sticky sticky--${tone}`} id={id}>
        <div className="sticky__body">
          <span className="sticky__eyebrow">{eyebrow}</span>
          <div className="sticky__huge">
            <span className="sticky__numeral">{numeral}</span>
            <span className="sticky__unit">{title}</span>
          </div>
          <p className="sticky__copy">{copy}</p>
          <a className="sticky__plan" href="#contact">
            Plan a Build &#8594;
          </a>
        </div>
        <div className="sticky__imgs">
          {images.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" />
          ))}
        </div>
      </section>
    </div>
  )
}

export default function Floors() {
  return (
    <>
      <FloorsPlan />
      <StickyGallery
        id="legacy"
        numeral="62"
        eyebrow="Since 1962"
        title="The Legacy Collection"
        copy="Six decades of landmark builds. From pre-war restoration to ground-up headquarters, the legacy collection is where the firm's craft is on full display."
        images={[IMG.floor2a, IMG.floor2b, IMG.floor2c, IMG.floor2d, IMG.floor2e]}
        tone="mist"
      />
      <StickyGallery
        id="portfolio"
        numeral="250"
        eyebrow="Projects delivered"
        title="The Portfolio"
        copy="More than 250 commercial and residential projects across the region — each one delivered on time, on budget, and backed by a full warranty on every trade."
        images={[IMG.floor3a, IMG.floor3b, IMG.floor3c]}
        tone="cream"
      />
    </>
  )
}
