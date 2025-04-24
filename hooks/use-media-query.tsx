"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Set initial value
      setMatches(media.matches)

      // Define callback function
      const listener = () => {
        setMatches(media.matches)
      }

      // Add listener
      if (media.addEventListener) {
        media.addEventListener("change", listener)
      } else {
        // Fallback for older browsers
        media.addListener(listener)
      }

      // Clean up
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", listener)
        } else {
          // Fallback for older browsers
          media.removeListener(listener)
        }
      }
    }

    return undefined
  }, [query])

  return matches
}
