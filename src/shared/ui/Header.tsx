'use client'

import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'


export const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ background: 'transparent', padding: '16px 40px' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontWeight={600}>TITANIT</Typography>

        

        <Button
        variant="outlined"
        sx={{
          borderRadius: '999px',
          background: '#fff',
          color: '#000',
          textTransform: 'none',
          border: '1px solid transparent',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'transparent',
            color: '#ffffff',
            border: '1px solid #ffffff'
          }
        }}
      >
        Sign up
      </Button>
      </Toolbar>
    </AppBar>
  )
}
