import { Link } from 'react-router-dom'
import type { Game } from '../data/games'

interface Props {
  game: Game | null
}

export default function Hero({ game }: Props) {
  if (!game) return null
  const bg = game.wallpaper || game.cover
  return (
    <Link className="hero" to={`/game/${game.id}`}>
      {bg && <img className="hero-bg" src={bg} alt="" aria-hidden="true" />}
      <div className="hero-shade" />
      <div className="hero-info">
        <span className="hero-eyebrow">Featured Game</span>
        <h1 className="hero-title">{game.title}</h1>
        <div className="hero-meta">
          <span className="year-badge year-badge-lg">{game.year}</span>
          <span className="rating-label">{game.mirrors.length + 1} mirror links</span>
          {game.size && <span className="rating-label">{game.size}</span>}
        </div>
        {game.desc && <p className="hero-desc">{game.desc}</p>}
        <div className="hero-actions">
          <span className="btn-dl-main">Get {game.title}</span>
        </div>
      </div>
    </Link>
  )
}