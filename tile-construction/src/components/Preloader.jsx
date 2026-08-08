import { useEffect, useRef, useState } from 'react'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [timer, setTimer] = useState('00:00')
  const doneRef = useRef(false)

  useEffect(() => {
    if (paused) return undefined
    const t0 = Date.now()
    const tick = setInterval(() => {
      const ms = Date.now() - t0
      const sec = Math.floor(ms / 1000)
      setTimer(`00:0${sec}`)
      const pct = Math.min(100, Math.round((ms / 3000) * 100))
      setCount(pct)
      if (pct >= 100 && !doneRef.current) {
        doneRef.current = true
        clearInterval(tick)
        setLeaving(true)
        setTimeout(onDone, 900)
      }
    }, 32)
    return () => clearInterval(tick)
  }, [paused, onDone])

  return (
    <div className={`preloader ${leaving ? 'preloader--leave' : ''}`}>
      <span className="preloader__tag preloader__tag--l">01</span>
      <span className="preloader__tag preloader__tag--r">]</span>

      <span className="preloader__since">{COMPANY_MARK}</span>
      <span className="preloader__pill">New York · USA</span>

      <span className="preloader__digits">{String(count).padStart(3, '0')}</span>

      <span className="preloader__timer">{timer}</span>

      <div className="preloader__track">
        <div className="preloader__line" style={{ transform: `scaleX(${count / 100})` }} />
      </div>

      <button className="preloader__pause" onClick={() => setPaused((p) => !p)} type="button">
        {paused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}

const COMPANY_MARK = 'TILE · CONSTRUCTION'
