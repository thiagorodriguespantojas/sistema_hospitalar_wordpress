import { useAccessibility } from "./AccessibilityContext"

const getContrastColor = (bgColor) => {
  const rgb = Number.parseInt(bgColor.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma < 128 ? "#ffffff" : "#000000"
}

const DynamicColorContrast = ({ backgroundColor, children }) => {
  const { highContrast } = useAccessibility()
  const textColor = highContrast ? "#ffffff" : getContrastColor(backgroundColor)

  return <div style={{ backgroundColor, color: textColor }}>{children}</div>
}

export default DynamicColorContrast

