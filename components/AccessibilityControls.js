import { Button, Typography, Box, Select, MenuItem, Slider, Switch } from "@mui/material"
import {
  Contrast,
  ZoomIn,
  ZoomOut,
  MotionPhotosOff,
  FontDownload,
  Visibility,
  ColorLens,
  Keyboard,
  RecordVoiceOver,
  LineWeight,
  FormatLineSpacing,
  VolumeUp,
  ZoomOutMap,
  Info,
  Mic,
  MenuBook,
} from "@mui/icons-material"
import { useAccessibility } from "./AccessibilityContext"

const AccessibilityControls = () => {
  const {
    highContrast,
    fontSize,
    reduceMotion,
    dyslexiaFont,
    screenReader,
    colorBlindMode,
    keyboardNavigation,
    textToSpeech,
    lineHeight,
    letterSpacing,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleReduceMotion,
    toggleDyslexiaFont,
    toggleScreenReader,
    setColorBlindModeType,
    toggleKeyboardNavigation,
    toggleTextToSpeech,
    increaseLineHeight,
    decreaseLineHeight,
    increaseLetterSpacing,
    decreaseLetterSpacing,
    setLineHeight,
    setLetterSpacing,
    audioFeedback,
    imageZoomEnabled,
    tooltipsEnabled,
    toggleAudioFeedback,
    toggleImageZoom,
    toggleTooltips,
    voiceNavigationEnabled,
    simpleReadModeEnabled,
    toggleVoiceNavigation,
    toggleSimpleReadMode,
  } = useAccessibility()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Accessibility Controls
      </Typography>
      <Button startIcon={<Contrast />} onClick={toggleHighContrast} variant={highContrast ? "contained" : "outlined"}>
        High Contrast
      </Button>
      <Button startIcon={<ZoomIn />} onClick={increaseFontSize}>
        Increase Font Size
      </Button>
      <Button startIcon={<ZoomOut />} onClick={decreaseFontSize}>
        Decrease Font Size
      </Button>
      <Button
        startIcon={<MotionPhotosOff />}
        onClick={toggleReduceMotion}
        variant={reduceMotion ? "contained" : "outlined"}
      >
        Reduce Motion
      </Button>
      <Button
        startIcon={<FontDownload />}
        onClick={toggleDyslexiaFont}
        variant={dyslexiaFont ? "contained" : "outlined"}
      >
        Dyslexia-friendly Font
      </Button>
      <Button startIcon={<Visibility />} onClick={toggleScreenReader} variant={screenReader ? "contained" : "outlined"}>
        Screen Reader Mode
      </Button>
      <Button
        startIcon={<Keyboard />}
        onClick={toggleKeyboardNavigation}
        variant={keyboardNavigation ? "contained" : "outlined"}
      >
        Keyboard Navigation
      </Button>
      <Button
        startIcon={<RecordVoiceOver />}
        onClick={toggleTextToSpeech}
        variant={textToSpeech ? "contained" : "outlined"}
      >
        Text-to-Speech
      </Button>
      <Box mt={2}>
        <Typography variant="subtitle1">Color Blind Mode</Typography>
        <Select
          value={colorBlindMode}
          onChange={(e) => setColorBlindModeType(e.target.value)}
          startAdornment={<ColorLens />}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="protanopia">Protanopia</MenuItem>
          <MenuItem value="deuteranopia">Deuteranopia</MenuItem>
          <MenuItem value="tritanopia">Tritanopia</MenuItem>
        </Select>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Line Height</Typography>
        <Slider
          value={lineHeight}
          min={1}
          max={2}
          step={0.1}
          onChange={(_, newValue) => setLineHeight(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value.toFixed(1)}`}
        />
        <Button startIcon={<LineWeight />} onClick={increaseLineHeight}>
          Increase
        </Button>
        <Button startIcon={<LineWeight />} onClick={decreaseLineHeight}>
          Decrease
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Letter Spacing</Typography>
        <Slider
          value={letterSpacing}
          min={0}
          max={3}
          step={0.5}
          onChange={(_, newValue) => setLetterSpacing(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value.toFixed(1)}px`}
        />
        <Button startIcon={<FormatLineSpacing />} onClick={increaseLetterSpacing}>
          Increase
        </Button>
        <Button startIcon={<FormatLineSpacing />} onClick={decreaseLetterSpacing}>
          Decrease
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Audio Feedback</Typography>
        <Switch checked={audioFeedback} onChange={toggleAudioFeedback} icon={<VolumeUp />} checkedIcon={<VolumeUp />} />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Image Zoom</Typography>
        <Switch
          checked={imageZoomEnabled}
          onChange={toggleImageZoom}
          icon={<ZoomOutMap />}
          checkedIcon={<ZoomOutMap />}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Tooltips</Typography>
        <Switch checked={tooltipsEnabled} onChange={toggleTooltips} icon={<Info />} checkedIcon={<Info />} />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Voice Navigation</Typography>
        <Switch
          checked={voiceNavigationEnabled}
          onChange={toggleVoiceNavigation}
          icon={<Mic />}
          checkedIcon={<Mic />}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1">Simple Read Mode</Typography>
        <Switch
          checked={simpleReadModeEnabled}
          onChange={toggleSimpleReadMode}
          icon={<MenuBook />}
          checkedIcon={<MenuBook />}
        />
      </Box>
      <Typography variant="body2">Current Font Size: {fontSize}px</Typography>
    </Box>
  )
}

export default AccessibilityControls

