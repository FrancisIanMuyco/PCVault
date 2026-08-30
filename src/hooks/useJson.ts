import { useEffect, useState } from 'react'

export function useJson<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let on = true
    fetch(url)
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
  }, [url])

  return data
}