"use client"

import React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { Menu, Dashboard, CalendarToday, Person, LocalHospital, AttachMoney } from "@mui/icons-material"
import { Link } from "react-router-dom"
import AccessibilityControls from "./AccessibilityControls"
import SkipToMainContent from "./SkipToMainContent"
import TextToSpeech from "./TextToSpeech"
import AudioFeedback from "./AudioFeedback"
import DynamicColorContrast from "./DynamicColorContrast"
import ImageZoom from "./ImageZoom"
import AccessibleTooltip from "./AccessibleTooltip"
import AccessibleNotifications from "./AccessibleNotifications"
import VoiceNavigation from "./VoiceNavigation"
import SimpleReadMode from "./SimpleReadMode"
import KeyboardShortcuts from "./KeyboardShortcuts"
import ContextualHelp from "./ContextualHelp"
import ThemeCustomizer from "./ThemeCustomizer"
import AutoDarkMode from "./AutoDarkMode"
import AccessibilityGuide from "./AccessibilityGuide"
import AccessibilityFeedback from "./AccessibilityFeedback"

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Appointments", icon: <CalendarToday />, path: "/appointments" },
    { text: "Patients", icon: <Person />, path: "/patients" },
    { text: "Doctors", icon: <LocalHospital />, path: "/doctors" },
    { text: "Billing", icon: <AttachMoney />, path: "/billing" },
  ]

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <>
      <SkipToMainContent />
      <AudioFeedback />
      <AccessibleNotifications />
      <KeyboardShortcuts />
      <AutoDarkMode />
      <DynamicColorContrast backgroundColor="#f0f0f0">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Hospital Management System
            </Typography>
            <VoiceNavigation />
            <ContextualHelp content="This is the main navigation bar. You can access different sections of the application from here." />
            <AccessibilityGuide />
            <AccessibilityFeedback />
          </Toolbar>
        </AppBar>
        <nav aria-label="mailbox folders">
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <main id="main-content" style={{ flexGrow: 1, padding: theme.spacing(3) }}>
          <Toolbar />
          <SimpleReadMode>
            <TextToSpeech>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, { ImageZoom, AccessibleTooltip, ContextualHelp })
                }
                return child
              })}
            </TextToSpeech>
          </SimpleReadMode>
        </main>
      </DynamicColorContrast>
      <AccessibilityControls />
      <ThemeCustomizer />
    </>
  )
}

export default Layout

