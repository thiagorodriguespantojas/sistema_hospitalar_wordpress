"use client"

import { useState } from "react"
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, Tabs, Tab } from "@mui/material"

const CollaborationTools = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [notes, setNotes] = useState("")

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "You", time: new Date().toLocaleTimeString() }])
      setNewMessage("")
    }
  }

  const handleSaveNotes = () => {
    // In a real app, you would save the notes to a backend here
    alert("Notes saved successfully!")
  }

  return (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Collaboration Tools
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Team Chat" />
        <Tab label="Shared Notes" />
      </Tabs>
      {activeTab === 0 && (
        <div>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message.text} secondary={`${message.sender} - ${message.time}`} />
              </ListItem>
            ))}
          </List>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      )}
      {activeTab === 1 && (
        <div>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            placeholder="Shared team notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSaveNotes}>
            Save Notes
          </Button>
        </div>
      )}
    </Paper>
  )
}

export default CollaborationTools

