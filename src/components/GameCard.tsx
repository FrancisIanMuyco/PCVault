import { useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Game } from '../data/games'
import GameCover from './GameCover'

interface Props {
  game: Game
  fav: boolean
  onToggleFav: (id: string) => void
  i?: number
}

export default function GameCard({ game, fav, onToggleFav, i }: Props) {
  const navigate = useNavigate()
  return (
    <article
      className="game-card"
      style={{ ['--i']: i ?? 0 } as CSSProperties}
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <button
        type="button"
        className={`fav-btn${fav ? ' active' : ''}`}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        onClick={(e) => {
          e.stopPropagation()
          onToggleFav(game.id)
        }}
      >
        &#9825;
      </button>
      <div className="card-cover">
        <GameCover game={game} />
        <div className="card-hover">
          <button
            type="button"
            className="btn-download"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/game/${game.id}`)
            }}
          >
            Get {game.title}
          </button>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title" title={game.title}>
          {game.title}
        </h3>
        <div className="card-tags">
          {game.genres.slice(0, 2).map((g) => (
            <span key={g} className="tag">
              {g}
            </span>
          ))}
          {game.languages && <span className="tag tag-dlc">{game.languages}</span>}
        </div>
        <div className="card-meta">
          <span className="year-badge">{game.year}</span>
          <span className="card-sub">
            {game.mirrors[0] ? `via ${game.mirrors[0].label}` : 'direct download'}
          </span>
        </div>
        <div className="card-footer">
          {game.size && <span className="size">{game.size}</span>}
          <span className="downloads">{game.mirrors.length + 1} links</span>
        </div>
      </div>
    </article>
  )
}