import React from "react"
import { Typography, Button, Container } from "@mui/material"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" paragraph>
            We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem
            persists.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          {this.state.error && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: "20px", textAlign: "left" }}>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

