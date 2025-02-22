"use client"

import { useState } from "react"
import { useAccessibility } from "./AccessibilityContext"

const ImageZoom = ({ src, alt }) => {
  const [zoomed, setZoomed] = useState(false)
  const { imageZoomEnabled } = useAccessibility()

  const handleZoomToggle = () => {
    if (imageZoomEnabled) {
      setZoomed(!zoomed)
    }
  }

  return (
    <div className={`image-container ${zoomed ? "zoomed" : ""}`}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        onClick={handleZoomToggle}
        style={{ cursor: imageZoomEnabled ? "zoom-in" : "default" }}
      />
    </div>
  )
}

export default ImageZoom

