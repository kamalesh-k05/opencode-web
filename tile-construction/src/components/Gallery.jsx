import { BlurHeadline } from '../lib'
import { GALLERY } from '../data'

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <BlurHeadline className="gallery__head" text="Gallery (2026)" step={26} />
      <div className="gallery__grid">
        {GALLERY.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            className={`gallery__img gallery__img--${(i % 5) + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
