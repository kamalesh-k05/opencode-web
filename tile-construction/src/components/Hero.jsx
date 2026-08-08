import { BlurHeadline } from '../lib'
import { IMG } from '../data'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <img src={IMG.hero1} alt="" className="hero__bg-a" />
        <img src={IMG.hero2} alt="" className="hero__bg-b" />
        <div className="hero__gradient" />
      </div>

      <div className="hero__inner">
        <p className="hero__label">General Contracting · Est. 1962</p>
        <BlurHeadline
          as="h2"
          className="hero__head"
          text="Where great projects come together."
        />
        <h1 className="hero__title">
          <BlurHeadline as="span" text="Built to Last." className="hero__title-line" />
        </h1>
      </div>

      <a className="hero__scroll" href="#about">
        Scroll to Explore
      </a>

      <a className="hero__card" href="#projects">
        <span className="hero__card-title">Featured Builds</span>
        <span className="hero__card-thumbs">
          <img src={IMG.floor2a} alt="" />
          <img src={IMG.floor3a} alt="" />
        </span>
        <span className="hero__card-arrow">&#8594;</span>
      </a>
    </section>
  )
}
