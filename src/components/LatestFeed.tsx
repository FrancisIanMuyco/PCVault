import { useJson } from '../hooks/useJson'
import type { LatestEntry } from '../data/meta'

export default function LatestFeed() {
  const latest = useJson<LatestEntry[]>('/latest.json')
  if (!latest || !latest.length) return null
  return (
    <section className="page-section">
      <h2 className="section-title">New Repacks</h2>
      <ul className="latest">
        {latest.slice(0, 6).map((e) => (
          <li key={e.link}>
            <a href={e.link} target="_blank" rel="noreferrer">
              <span className="latest-date">{e.date}</span>
              <span className="latest-title">{e.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}