import { useEffect, useState } from 'react'

export function useJson<T>(url: string, base = import.meta.env.BASE_URL): T | null {
  const [data, setData] = useState<T | null>(null)
  const resolved = url.startsWith('/') ? base.replace(/\/$/, '') + url : url

  useEffect(() => {
    let on = true
    fetch(resolved)
      .then((r) => r.json())
      .then((d: T) => {
        if (on) setData(d)
      })
      .catch(() => {
        /* ignore */
      })
    return () => {
      on = false
    }
  }, [resolved])

  return data
}