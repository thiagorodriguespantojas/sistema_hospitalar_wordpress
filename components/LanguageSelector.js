import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useTranslation } from "react-i18next"

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select labelId="language-select-label" value={i18n.language} onChange={changeLanguage}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="de">Deutsch</MenuItem>
      </Select>
    </FormControl>
  )
}

export default LanguageSelector

