"use client"

import { useState } from "react"
import { Button, CircularProgress, Typography, Grid } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"

const MedicalImageUploader = ({ patientId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    setError("")
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.")
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append("image", selectedFile)
    formData.append("patientId", patientId)

    try {
      const response = await fetch("/api/medical-images/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        onUploadSuccess(result.imageUrl)
        setSelectedFile(null)
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" startIcon={<CloudUpload />}>
            Select Image
          </Button>
        </label>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFile || uploading}>
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Grid>
      <Grid item>
        {selectedFile && <Typography variant="body2">Selected file: {selectedFile.name}</Typography>}
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default MedicalImageUploader

