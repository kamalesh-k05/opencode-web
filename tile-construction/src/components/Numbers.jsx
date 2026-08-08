const NUMBERS = [
  { value: '250+', label: 'Projects delivered' },
  { value: '62', label: 'Years in business' },
  { value: '98%', label: 'On-time delivery' },
  { value: '60', label: 'Skilled craftsmen' }
]

export default function Numbers() {
  return (
    <section className="numbers">
      {NUMBERS.map(({ value, label }) => (
        <div className="numbers__col" key={label}>
          <span className="numbers__label">{label}</span>
          <strong className="numbers__value">{value}</strong>
          <span className="numbers__divider" aria-hidden="true" />
        </div>
      ))}
    </section>
  )
}
