import rawGames from './games.json'

export interface MirrorLink {
  label: string
  url: string
}

export interface RepackHistory {
  version: string
  date: string
}

export interface Game {
  id: string
  title: string
  appid?: number
  trailer?: string
  repack?: string
  history?: RepackHistory[]
  year: number
  genres: string[]
  languages: string
  size?: string
  password?: string
  desc: string
  cover?: string
  wallpaper?: string
  colors?: [string, string]
  screenshots?: string[]
  link: string
  date: string
  download: string
  mirrors: MirrorLink[]
}

const base = import.meta.env.BASE_URL

function asset(p?: string): string | undefined {
  if (!p) return undefined
  return p.startsWith('/') ? base + p.slice(1) : p
}

export const games: Game[] = (rawGames as Game[]).map((g) => ({
  ...g,
  cover: asset(g.cover),
  wallpaper: asset(g.wallpaper),
  screenshots: g.screenshots?.map((s) => asset(s) ?? ''),
}))

export function allGenres(gamesList: Game[]): string[] {
  const set = new Set<string>()
  for (const g of gamesList) for (const genre of g.genres) set.add(genre)
  return Array.from(set).sort()
}