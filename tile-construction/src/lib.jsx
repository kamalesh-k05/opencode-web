import { useInView } from './useInView'

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export function BlurHeadline({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  step = 18
}) {
  const ref = useInView(0.4)
  return (
    <Tag ref={ref} className={`blur-headline ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={ch === ' ' ? 'bh-space' : undefined}
          style={{ transitionDelay: `${delay + i * step}ms` }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}
