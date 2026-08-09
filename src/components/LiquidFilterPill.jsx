import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './LiquidFilterPill.css'

export default function LiquidFilterPill({
  label,
  isActive,
  onClick,
  ease = 'power3.easeOut'
}) {
  const circleRef = useRef(null)
  const pillRef = useRef(null)
  const tlRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const circle = circleRef.current
    const pill = pillRef.current
    if (!circle || !pill) return

    const rect = pill.getBoundingClientRect()
    const { width: w, height: h } = rect
    if (w === 0 || h === 0) return

    const R = ((w * w) / 4 + h * h) / (2 * h)
    const D = Math.ceil(2 * R) + 2
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
    const originY = D - delta

    circle.style.width = `${D}px`
    circle.style.height = `${D}px`
    circle.style.bottom = `-${delta}px`

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`
    })

    const labelEl = pill.querySelector('.pill-label')
    const hoverEl = pill.querySelector('.pill-label-hover')

    if (labelEl) gsap.set(labelEl, { y: 0 })
    if (hoverEl) gsap.set(hoverEl, { y: h + 12, opacity: 0 })

    tlRef.current?.kill()
    const tl = gsap.timeline({ paused: true })

    tl.to(circle, { scale: 1.25, xPercent: -50, duration: 0.4, ease, overwrite: 'auto' }, 0)

    if (labelEl) {
      tl.to(labelEl, { y: -(h + 8), duration: 0.4, ease, overwrite: 'auto' }, 0)
    }

    if (hoverEl) {
      gsap.set(hoverEl, { y: Math.ceil(h + 20), opacity: 0 })
      tl.to(hoverEl, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: 'auto' }, 0)
    }

    tlRef.current = tl
  }, [label, ease])

  const handleMouseEnter = () => {
    const tl = tlRef.current
    if (!tl) return
    tweenRef.current?.kill()
    tweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    })
  }

  const handleMouseLeave = () => {
    const tl = tlRef.current
    if (!tl) return
    tweenRef.current?.kill()
    tweenRef.current = tl.tweenTo(0, {
      duration: 0.22,
      ease,
      overwrite: 'auto'
    })
  }

  return (
    <button
      ref={pillRef}
      className={`liquid-filter-pill${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <span className="hover-circle" ref={circleRef} aria-hidden="true" />
      <span className="label-stack">
        <span className="pill-label">{label}</span>
        <span className="pill-label-hover" aria-hidden="true">
          {label}
        </span>
      </span>
    </button>
  )
}
