import { useCallback, useEffect, useState } from 'react'

interface Props {
  shots: string[]
  title: string
}

export default function ScreenshotGallery({ shots, title }: Props) {
  const [active, setActive] = useState<number | null>(null)

  const step = useCallback(
    (dir: number) => {
      setActive((a) => (a === null ? a : (a + dir + shots.length) % shots.length))
    },
    [shots.length],
  )

  useEffect(() => {
    if (active === null) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, step])

  useEffect(() => {
    if (active !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  if (!shots.length) return null

  return (
    <section className="page-section">
      <h2 className="section-title">Screenshots</h2>
      <div className="gallery">
        {shots.map((s, i) => (
          <button key={s} type="button" className="shot" onClick={() => setActive(i)} aria-label={`Open ${title} screenshot ${i + 1}`}>
            <img src={s} alt={`${title} screenshot ${i + 1}`} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true" aria-label="Screenshot viewer">
          <button
            type="button"
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation()
              setActive(null)
            }}
            aria-label="Close"
            autoFocus
          >
            &#10005;
          </button>
          <button
            type="button"
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous screenshot"
          >
            &#8249;
          </button>
          <img src={shots[active]} alt={`${title} screenshot ${active + 1}`} />
          <button
            type="button"
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next screenshot"
          >
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