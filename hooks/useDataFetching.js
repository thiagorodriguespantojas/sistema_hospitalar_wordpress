"use client"

import { useState, useEffect } from "react"

const cache = new Map()

export const useDataFetching = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (cache.has(url)) {
        setData(cache.get(url))
        setLoading(false)
        return
      }

      try {
        const response = await fetch(url)
        const result = await response.json()
        cache.set(url, result)
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

