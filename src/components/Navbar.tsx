import { Link } from 'react-router-dom'

interface Props {
  games: number
  query: string
  onQuery: (q: string) => void
  genre: string
  onGenre: (g: string) => void
  genres: string[]
  counts: Record<string, number>
}

export default function Navbar({ games, query, onQuery, genre, onGenre, genres, counts }: Props) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">PC</span>
          <span className="brand-name">Vault</span>
        </Link>
        <div className="nav-search">
          <input
            type="search"
            placeholder="Search games..."
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
        <div className="nav-genres">
          {['All', ...genres].map((g) => (
            <button
              key={g}
              type="button"
              className={g === genre ? 'genre-btn active' : 'genre-btn'}
              onClick={() => onGenre(g)}
            >
              {g}
              <span className="genre-count"> {counts[g] ?? 0}</span>
            </button>
          ))}
        </div>
        <span className="nav-count">{games} games</span>
      </div>
    </nav>
  )
}