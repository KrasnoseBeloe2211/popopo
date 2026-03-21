import { Paper } from '@mui/material';
import { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',

        background: 'linear-gradient(145deg, #121212, #0d0d0d)',

        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(120deg, rgba(19,167,73,0.15), transparent)',
          opacity: 0,
          transition: '0.3s',
        },

        '&:hover::before': {
          opacity: 1,
        },

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        },

        transition: '0.25s',
      }}
    >
      {children}
    </Paper>
  );
};