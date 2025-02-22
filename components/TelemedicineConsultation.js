"use client"

import { useState } from "react"
import { Button, Grid, Paper, Typography } from "@mui/material"
import { VideoCall, ScreenShare, Edit } from "@mui/icons-material"

const TelemedicineConsultation = () => {
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [notes, setNotes] = useState("")

  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleScreenSharing = () => setIsScreenSharing(!isScreenSharing)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper
          style={{
            height: "400px",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isVideoOn ? (
            <Typography variant="h6" style={{ color: "#fff" }}>
              Video Call Active
            </Typography>
          ) : (
            <Typography variant="h6" style={{ color: "#fff" }}>
              Video Off
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ height: "400px", padding: "16px" }}>
          <Typography variant="h6">Consultation Notes</Typography>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", height: "300px", marginTop: "16px" }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button startIcon={<VideoCall />} onClick={toggleVideo} variant={isVideoOn ? "contained" : "outlined"}>
          {isVideoOn ? "End Video Call" : "Start Video Call"}
        </Button>
        <Button
          startIcon={<ScreenShare />}
          onClick={toggleScreenSharing}
          variant={isScreenSharing ? "contained" : "outlined"}
        >
          {isScreenSharing ? "Stop Screen Sharing" : "Share Screen"}
        </Button>
        <Button startIcon={<Edit />} onClick={() => alert("Collaborative annotation feature")}>
          Collaborative Annotation
        </Button>
      </Grid>
    </Grid>
  )
}

export default TelemedicineConsultation

