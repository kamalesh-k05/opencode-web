import { useEffect, useRef } from 'react'
import { BlurHeadline } from '../lib'
import { IMG } from '../data'

export default function FooterCTA() {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current
        const img = imgRef.current
        if (!wrap || !img) return
        const rect = wrap.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = Math.min(1, Math.max(0, 1 - rect.top / vh))
        img.style.transform = `translateY(${1080 * (1 - progress)}px)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="cta" id="contact">
      <div className="cta__img-wrap" ref={wrapRef}>
        <img ref={imgRef} src={IMG.parallax} alt="" className="cta__img" loading="lazy" />
        <span className="cta__fit" aria-hidden="true">
          TILE CONSTRUCTION
        </span>
      </div>

      <div className="cta__content">
        <span className="cta__kicker">Contact Us</span>
        <BlurHeadline
          as="h2"
          className="cta__head"
          text="Let's talk about your next build."
          step={24}
        />
        <div className="cta__cards">
          <a className="cta__card" href="#legacy">
            <span>New Builds</span>
            <span>&#8594;</span>
          </a>
          <a className="cta__card" href="#portfolio">
            <span>Renovations</span>
            <span>&#8594;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
