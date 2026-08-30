import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { games } from '../data/games'
import TrailerEmbed from '../components/TrailerEmbed'
import ScreenshotGallery from '../components/ScreenshotGallery'
import GameCover from '../components/GameCover'
import { useFavorites } from '../hooks/useFavorites'

function applyMeta(title: string, desc: string, img?: string) {
  document.title = `${title} - PCVault`
  const setMeta = (name: string, content: string) => {
    const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
    if (el) el.setAttribute('content', content)
  }
  setMeta('og:title', title)
  setMeta('og:description', desc)
  if (img) setMeta('og:image', img)
}

export default function GamePage() {
  const { id } = useParams()
  const game = useMemo(() => games.find((g) => g.id === id), [id])
  const { favs, toggle } = useFavorites()
  const [copied, setCopied] = useState<'link' | 'all' | null>(null)

  useEffect(() => {
    if (game) applyMeta(game.title, game.desc.slice(0, 160), game.cover)
    else applyMeta('Not found - PCVault', '')
  }, [game])

  if (!game) {
    return (
      <main className="page">
        <Link className="back-link" to="/">&larr; Back to games</Link>
        <p className="empty">Game not found.</p>
      </main>
    )
  }

  const copy = async (text: string, which: 'link' | 'all') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* ignore */
    }
  }

  const allLinks = [game.download, ...game.mirrors.map((m) => m.url)].filter(Boolean)

  const groups = useMemo(() => {
    const map = new Map<string, Array<{ label: string; url: string }>>()
    for (const m of game.mirrors) {
      const key = m.label || m.url.split('/')[2]
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    return Array.from(map.entries())
  }, [game])

  return (
    <main className="page">
      <Link className="back-link" to="/">&larr; All games</Link>

      <section className="game-head">
        <div className="game-head-cover">
          <GameCover game={game} />
        </div>
        <div className="game-head-info">
          <div className="head-row">
            <h1 className="game-page-title">{game.title}</h1>
            <button
              type="button"
              className={`fav-btn big${favs.includes(game.id) ? ' active' : ''}`}
              aria-label="Toggle favorite"
              onClick={() => toggle(game.id)}
            >
              &#9825;
            </button>
          </div>
          <div className="modal-tags">
            {game.genres.map((g) => (
              <span key={g} className="tag">{g}</span>
            ))}
            {game.languages && <span className="tag tag-dlc">{game.languages}</span>}
          </div>
          <div className="modal-stats">
            <div className="stat"><span className="stat-label">Year</span><span className="stat-value">{game.year || '—'}</span></div>
            {game.size && <div className="stat"><span className="stat-label">Size</span><span className="stat-value">{game.size}</span></div>}
            <div className="stat"><span className="stat-label">Language</span><span className="stat-value">{game.languages || '—'}</span></div>
            <div className="stat"><span className="stat-label">Repack date</span><span className="stat-value">{game.date.slice(0, 10)}</span></div>
          </div>
          {game.desc && <p className="game-desc">{game.desc}</p>}

          <div className="modal-links">
            <div className="dl-primary">
              {game.download ? (
                <a className="btn-dl-main" href={game.download} target="_blank" rel="noreferrer">
                  <span className="btn-dl-ic">&#11015;</span>
                  <span className="btn-dl-txt">Download</span>
                  {game.size && <span className="btn-dl-size">{game.size}</span>}
                </a>
              ) : (
                <span className="btn-dl-main disabled">No live links</span>
              )}
            </div>
            <div className="dl-actions">
              <button type="button" className={`btn-copy${copied === 'link' ? ' copied' : ''}`} onClick={() => copy(game.download, 'link')} disabled={!game.download}>
                {copied === 'link' ? 'Copied!' : 'Copy link'}
              </button>
              <button type="button" className={`btn-copy${copied === 'all' ? ' copied' : ''}`} onClick={() => copy(allLinks.join('\n'), 'all')} disabled={!allLinks.length}>
                {copied === 'all' ? 'Copied!' : 'Copy all links'}
              </button>
            </div>

            {game.password && (
              <p className="dl-note">
                Password: <code>{game.password}</code>
                <button type="button" className="mini-copy" onClick={() => copy(game.password ?? '', 'all')}>
                  copy
                </button>
              </p>
            )}
            {game.repack && <p className="dl-note">Repack: <code>{game.repack}</code></p>}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mirror-head">
          <h2 className="section-title">Mirror Links</h2>
          <span className="mirror-head-count">
            {game.mirrors.length} live mirror{game.mirrors.length === 1 ? '' : 's'} &#183; {groups.length} host{groups.length === 1 ? '' : 's'}
          </span>
        </div>
        {groups.map(([host, list]) => (
          <div className="mirror-group" key={host}>
            <div className="mirror-group-label">
              <span className="mirror-host">{host}</span>
              <span className="mirror-host-n">{list.length}</span>
            </div>
            <div className="mirror-list">
              {list.map((m, i) => (
                <a
                  key={`${m.label}-${m.url}`}
                  className="mirror-row"
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ['--i']: i } as CSSProperties}
                >
                  <span className="mirror-row-ic">&#11015;</span>
                  <span className="mirror-row-host">{m.label || host}</span>
                  <span className="mirror-row-url" title={m.url}>{m.url}</span>
                  <span className="mirror-row-open">Open &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        ))}
        <p className="dl-note">
          Source: <a href={game.link} target="_blank" rel="noreferrer">{game.link}</a>
        </p>
      </section>

      {(game.history?.length ?? 0) > 0 && (
        <section className="page-section">
          <h2 className="section-title">Repack History</h2>
          <table className="history">
            <thead><tr><th>Version</th><th>Since</th></tr></thead>
            <tbody>
              {game.history?.map((h) => (
                <tr key={`${h.version}-${h.date}`}><td>{h.version}</td><td>{h.date.slice(0, 10)}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <TrailerEmbed game={game} />
      <ScreenshotGallery shots={game.screenshots ?? []} title={game.title} />
    </main>
  )
}