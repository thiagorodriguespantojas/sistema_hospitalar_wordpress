"use client"

import { useState } from "react"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material"

const AccessibilityGuide = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>Guia de Acessibilidade</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Guia de Acessibilidade</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Bem-vindo ao nosso Guia de Acessibilidade. Este sistema foi projetado para ser acessível a todos os
            usuários.
          </Typography>
          <Typography paragraph>
            Você pode personalizar sua experiência usando o painel de controle de acessibilidade, que inclui opções
            como:
          </Typography>
          <ul>
            <li>Ajuste de tamanho de fonte</li>
            <li>Modo de alto contraste</li>
            <li>Navegação por teclado</li>
            <li>Leitor de tela</li>
            <li>E muito mais!</li>
          </ul>
          <Typography>
            Se você precisar de assistência adicional, por favor, entre em contato com nossa equipe de suporte.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AccessibilityGuide

