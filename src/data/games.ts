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

export const games = rawGames as Game[]

export function allGenres(gamesList: Game[]): string[] {
  const set = new Set<string>()
  for (const g of gamesList) for (const genre of g.genres) set.add(genre)
  return Array.from(set).sort()
}