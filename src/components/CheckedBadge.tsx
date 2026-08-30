import type { MetaState } from '../data/meta'
import { useJson } from '../hooks/useJson'

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  if (!then) return ''
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000))
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  return `${days}d ago`
}

export default function CheckedBadge() {
  const meta = useJson<MetaState>('/meta.json')
  if (!meta || !meta.checkedAt) return null
  return (
    <span className="checked-badge" title={`Auto-verified ${meta.checkedAt}`}>
      &#10003; Links verified {timeAgo(meta.checkedAt)}
      {meta.removedLinks > 0 ? ` · ${meta.removedLinks} dead removed` : ''}
    </span>
  )
}