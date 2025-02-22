import { Box, Typography, Slider, Select, MenuItem } from "@mui/material"
import { useAccessibility } from "./AccessibilityContext"

const ThemeCustomizer = () => {
  const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, fontFamily, setFontFamily } =
    useAccessibility()

  const handlePrimaryColorChange = (event, newValue) => {
    setPrimaryColor(newValue)
  }

  const handleSecondaryColorChange = (event, newValue) => {
    setSecondaryColor(newValue)
  }

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Theme Customization
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1">Primary Color</Typography>
        <Slider value={primaryColor} onChange={handlePrimaryColorChange} min={0} max={360} valueLabelDisplay="auto" />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Secondary Color</Typography>
        <Slider
          value={secondaryColor}
          onChange={handleSecondaryColorChange}
          min={0}
          max={360}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Font Family</Typography>
        <Select value={fontFamily} onChange={handleFontFamilyChange} fullWidth>
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Roboto">Roboto</MenuItem>
          <MenuItem value="Open Sans">Open Sans</MenuItem>
          <MenuItem value="Lato">Lato</MenuItem>
        </Select>
      </Box>
    </Box>
  )
}

export default ThemeCustomizer

