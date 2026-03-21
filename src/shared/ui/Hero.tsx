'use client'

import { Box, Typography, Button } from '@mui/material'

export const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        
        '@supports (min-height: 100dvh)': {
          minHeight: '100dvh'
        }
      }}
    >
      {/* BACKGROUND LAYER */}
      <Box
        sx={{
          position: 'fixed', // меняем на fixed чтобы фон не ебался
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/assets/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* CONTENT */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          '@supports (min-height: 100dvh)': {
            minHeight: '100dvh'
          },
          display: 'flex',
          alignItems: 'center',
          padding: {
            xs: '0 20px',
            md: '0 80px'
          },
          boxSizing: 'border-box'
        }}
      >
        <Box sx={{ maxWidth: '600px' }}>
          <Typography variant="h1">
            PROFDNA
            <br />
            <span style={{ color: '#FFFFFF' }}>JAGERMAISTER</span>
          </Typography>

          <Typography sx={{ mt: 3 }}>
            Я ЛЮБЛЮ ПИВО
          </Typography>

          <Button
            variant="outlined"
            sx={{
                mt: 4,
                borderRadius: '999px',
                padding: '12px 28px',
                background: '#E5E5E5',
                color: '#000',
                textTransform: 'none',
                border: '1px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                background: 'transparent',
                color: '#ffffff', // белый текст
                border: '1px solid #ffffff' // белая граница
              }
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>

      {/* PLANET */}
      <Box
        component="img"
        src="/assets/planet.png"
        alt="dna"
        sx={{
            position: 'absolute',
            top: '50%',
            right: '-250px',
            transform: 'translateY(-50%)',
            width: 'auto',
            height: '110%', // увеличиваем через высоту
            maxHeight: 'none', // убираем ограничение
            objectPosition: 'right center',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.9
        }}
    />
    </Box>
  )
}