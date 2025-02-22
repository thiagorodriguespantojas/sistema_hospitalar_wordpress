"use client"

import { useState, useEffect } from "react"
import { Button, TextField, Typography, Paper, Grid } from "@mui/material"
import QRCode from "qrcode.react"

const TwoFactorAuth = ({ userId }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [secretKey, setSecretKey] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTwoFactorStatus()
  }, []) // Removed userId from dependencies

  const fetchTwoFactorStatus = async () => {
    try {
      const response = await fetch(`/api/two-factor-auth/status?userId=${userId}`)
      const data = await response.json()
      setIsEnabled(data.isEnabled)
      if (data.isEnabled) {
        setSecretKey(data.secretKey)
        setQrCodeUrl(data.qrCodeUrl)
      }
    } catch (error) {
      console.error("Error fetching 2FA status:", error)
    }
  }

  const handleEnable2FA = async () => {
    try {
      const response = await fetch("/api/two-factor-auth/enable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
      const data = await response.json()
      setSecretKey(data.secretKey)
      setQrCodeUrl(data.qrCodeUrl)
    } catch (error) {
      console.error("Error enabling 2FA:", error)
    }
  }

  const handleVerify2FA = async () => {
    try {
      const response = await fetch("/api/two-factor-auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, verificationCode }),
      })
      const data = await response.json()
      if (data.success) {
        setIsEnabled(true)
        setError("")
      } else {
        setError("Invalid verification code. Please try again.")
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error)
      setError("An error occurred. Please try again.")
    }
  }

  const handleDisable2FA = async () => {
    try {
      await fetch("/api/two-factor-auth/disable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
      setIsEnabled(false)
      setSecretKey("")
      setQrCodeUrl("")
    } catch (error) {
      console.error("Error disabling 2FA:", error)
    }
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        Two-Factor Authentication
      </Typography>
      {isEnabled ? (
        <div>
          <Typography>Two-factor authentication is enabled for your account.</Typography>
          <Button variant="contained" color="secondary" onClick={handleDisable2FA} style={{ marginTop: "10px" }}>
            Disable 2FA
          </Button>
        </div>
      ) : (
        <div>
          {secretKey ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Scan this QR code with your authenticator app:</Typography>
                <QRCode value={qrCodeUrl} size={200} />
              </Grid>
              <Grid item xs={12}>
                <Typography>Or enter this secret key manually: {secretKey}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Verification Code"
                  variant="outlined"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleVerify2FA}>
                  Verify and Enable 2FA
                </Button>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
            </Grid>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEnable2FA}>
              Enable Two-Factor Authentication
            </Button>
          )}
        </div>
      )}
    </Paper>
  )
}

export default TwoFactorAuth

