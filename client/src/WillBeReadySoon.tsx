import React from 'react';
import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    willBeReadySoon: true;
  }
}

function WillBeReadySoon() {
  return (
    <Box sx={{ m: '20px auto' }}>
      <Typography variant='willBeReadySoon'>
        This page will be ready soon...
      </Typography>
      <ConstructionIcon sx={{ fontSize: 'h2.fontSize', color: 'text.secondary', display: 'block', m: '0px auto' }}/>
    </Box>
  );
}

export default WillBeReadySoon;