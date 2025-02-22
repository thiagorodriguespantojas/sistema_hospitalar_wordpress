"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AccessibilityContext = createContext()

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [colorBlindMode, setColorBlindMode] = useState("none")
  const [keyboardNavigation, setKeyboardNavigation] = useState(false)
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [audioFeedback, setAudioFeedback] = useState(false)
  const [imageZoomEnabled, setImageZoomEnabled] = useState(false)
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true)
  const [voiceNavigationEnabled, setVoiceNavigationEnabled] = useState(false)
  const [simpleReadModeEnabled, setSimpleReadModeEnabled] = useState(false)
  const [keyboardShortcuts, setKeyboardShortcuts] = useState([])
  const [primaryColor, setPrimaryColor] = useState(180)
  const [secondaryColor, setSecondaryColor] = useState(240)
  const [fontFamily, setFontFamily] = useState("Arial")

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`
    document.body.style.lineHeight = lineHeight
    document.body.style.letterSpacing = `${letterSpacing}px`
    document.body.classList.toggle("high-contrast", highContrast)
    document.body.classList.toggle("reduce-motion", reduceMotion)
    document.body.classList.toggle("dyslexia-font", dyslexiaFont)
    document.body.classList.toggle("screen-reader-mode", screenReader)
    document.body.classList.toggle("keyboard-navigation", keyboardNavigation)
    document.body.setAttribute("data-color-blind-mode", colorBlindMode)
    document.body.style.setProperty("--primary-color", `hsl(${primaryColor}, 50%, 50%)`)
    document.body.style.setProperty("--secondary-color", `hsl(${secondaryColor}, 50%, 50%)`)
    document.body.style.fontFamily = fontFamily
  }, [
    fontSize,
    highContrast,
    reduceMotion,
    dyslexiaFont,
    screenReader,
    colorBlindMode,
    keyboardNavigation,
    lineHeight,
    letterSpacing,
    primaryColor,
    secondaryColor,
    fontFamily,
  ])

  const toggleHighContrast = () => setHighContrast((prev) => !prev)
  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24))
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12))
  const toggleReduceMotion = () => setReduceMotion((prev) => !prev)
  const toggleDyslexiaFont = () => setDyslexiaFont((prev) => !prev)
  const toggleScreenReader = () => setScreenReader((prev) => !prev)
  const setColorBlindModeType = (mode) => setColorBlindMode(mode)
  const toggleKeyboardNavigation = () => setKeyboardNavigation((prev) => !prev)
  const toggleTextToSpeech = () => setTextToSpeech((prev) => !prev)
  const increaseLineHeight = () => setLineHeight((prev) => Math.min(prev + 0.1, 2))
  const decreaseLineHeight = () => setLineHeight((prev) => Math.max(prev - 0.1, 1))
  const increaseLetterSpacing = () => setLetterSpacing((prev) => Math.min(prev + 0.5, 3))
  const decreaseLetterSpacing = () => setLetterSpacing((prev) => Math.max(prev - 0.5, 0))
  const toggleAudioFeedback = () => setAudioFeedback((prev) => !prev)
  const toggleImageZoom = () => setImageZoomEnabled((prev) => !prev)
  const toggleTooltips = () => setTooltipsEnabled((prev) => !prev)
  const toggleVoiceNavigation = () => setVoiceNavigationEnabled((prev) => !prev)
  const toggleSimpleReadMode = () => setSimpleReadModeEnabled((prev) => !prev)

  const addKeyboardShortcut = (shortcut) => {
    setKeyboardShortcuts((prev) => [...prev, shortcut])
  }

  const removeKeyboardShortcut = (shortcutKey) => {
    setKeyboardShortcuts((prev) => prev.filter((s) => s.key !== shortcutKey))
  }

  return (
    <AccessibilityContext.Provider
      value={{
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
        audioFeedback,
        imageZoomEnabled,
        tooltipsEnabled,
        voiceNavigationEnabled,
        simpleReadModeEnabled,
        keyboardShortcuts,
        primaryColor,
        secondaryColor,
        fontFamily,
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
        toggleAudioFeedback,
        toggleImageZoom,
        toggleTooltips,
        toggleVoiceNavigation,
        toggleSimpleReadMode,
        addKeyboardShortcut,
        removeKeyboardShortcut,
        setPrimaryColor,
        setSecondaryColor,
        setFontFamily,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)

