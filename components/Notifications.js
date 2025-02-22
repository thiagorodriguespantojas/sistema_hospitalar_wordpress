"use client"

import { useState, useEffect } from "react"
import { List, ListItem, ListItemText, Typography, Badge } from "@mui/material"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket("ws://localhost:8080")

    ws.onopen = () => {
      console.log("Connected to WebSocket server")
    }

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data)
      setNotifications((prevNotifications) => [...prevNotifications, notification])
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server")
    }

    setSocket(ws)

    // Clean up function
    return () => {
      ws.close()
    }
  }, [])

  const sendNotification = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }))
    }
  }

  return (
    <div>
      <Typography variant="h6">
        Notifications
        <Badge badgeContent={notifications.length} color="secondary">
          🔔
        </Badge>
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={notification.message}
              secondary={new Date(notification.timestamp).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Notifications

