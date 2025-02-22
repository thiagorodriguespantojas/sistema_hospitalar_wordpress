"use client"

import { useState, useEffect } from "react"
import { Grid, Card, CardMedia, CardContent, Typography, Dialog, DialogContent } from "@mui/material"

const MedicalImageViewer = ({ patientId }) => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    fetchMedicalImages()
  }, []) // Removed unnecessary patientId dependency

  const fetchMedicalImages = async () => {
    try {
      const response = await fetch(`/api/medical-images/${patientId}`)
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error("Error fetching medical images:", error)
    }
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const handleCloseDialog = () => {
    setSelectedImage(null)
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Medical Images
      </Typography>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={6} sm={4} md={3} key={image.id}>
            <Card onClick={() => handleImageClick(image)}>
              <CardMedia component="img" height="140" image={image.thumbnailUrl} alt={image.description} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {image.description}
                </Typography>
                <Typography variant="caption" display="block">
                  {new Date(image.uploadDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selectedImage} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedImage && (
            <div>
              <img
                src={selectedImage.fullSizeUrl || "/placeholder.svg"}
                alt={selectedImage.description}
                style={{ width: "100%" }}
              />
              <Typography variant="body1">{selectedImage.description}</Typography>
              <Typography variant="body2">
                Uploaded on: {new Date(selectedImage.uploadDate).toLocaleString()}
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MedicalImageViewer

