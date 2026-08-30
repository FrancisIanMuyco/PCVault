import { useState } from 'react'

interface Props {
  shots: string[]
  title: string
}

export default function ScreenshotGallery({ shots, title }: Props) {
  const [active, setActive] = useState<number | null>(null)

  if (!shots.length) return null

  const step = (dir: number) => {
    if (active === null) return
    setActive((active + dir + shots.length) % shots.length)
  }

  return (
    <section className="page-section">
      <h2 className="section-title">Screenshots</h2>
      <div className="gallery">
        {shots.map((s, i) => (
          <button key={s} type="button" className="shot" onClick={() => setActive(i)}>
            <img src={s} alt={`${title} screenshot ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <button type="button" className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous">
            &#8249;
          </button>
          <img src={shots[active]} alt={`${title} screenshot ${active + 1}`} />
          <button type="button" className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next">
            &#8250;
          </button>
          <span className="lightbox-count">
            {active + 1} / {shots.length}
          </span>
        </div>
      )}
    </section>
  )
}