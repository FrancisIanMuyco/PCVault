import { useMemo, useState } from 'react'
import { games, allGenres } from '../data/games'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import GameGrid from '../components/GameGrid'
import LatestFeed from '../components/LatestFeed'
import CheckedBadge from '../components/CheckedBadge'
import CategoryBrowse from '../components/CategoryBrowse'
import { useFavorites } from '../hooks/useFavorites'

export default function Home() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [sort, setSort] = useState('default')
  const [favOnly, setFavOnly] = useState(false)
  const { favs, toggle } = useFavorites()

  const genres = useMemo(() => allGenres(games), [])

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const g of games) for (const x of new Set(g.genres)) map[x] = (map[x] || 0) + 1
    return map
  }, [])

  const featured = useMemo(() => games.find((g) => g.cover) ?? games[0], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return games.filter((g) => {
      const matchQ = !q || g.title.toLowerCase().includes(q) || g.genres.some((x) => x.toLowerCase().includes(q))
      const matchG = genre === 'All' || g.genres.includes(genre)
      const matchFav = !favOnly || favs.includes(g.id)
      return matchQ && matchG && matchFav
    })
  }, [query, genre, favOnly, favs])

  return (
    <>
      <Navbar
        games={filtered.length}
        query={query}
        onQuery={setQuery}
        genre={genre}
        onGenre={setGenre}
        genres={genres}
        counts={counts}
      />
      <main>
        <div className="badge-row">
          <CheckedBadge />
        </div>
        {!query && genre === 'All' && !favOnly && <Hero game={featured} />}
        {!query && !favOnly && (
          <CategoryBrowse genres={genres} counts={counts} total={games.length} active={genre} onSelect={setGenre} />
        )}
        <GameGrid
          games={filtered}
          title={genre === 'All' ? 'All Games' : genre}
          favs={favs}
          onToggleFav={toggle}
          sort={sort}
          onSort={setSort}
          favOnly={favOnly}
          onFavOnly={setFavOnly}
        />
        {!query && genre === 'All' && !favOnly && <LatestFeed />}
        <footer className="footer">
          PCVault &#183; Scraped with Hunter Toolbox from gamepciso.com &#183; Direct + mirror links &#183; Links auto-verified every scan
        </footer>
      </main>
    </>
  )
}