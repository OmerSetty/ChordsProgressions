import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default React.memo(function Score({ totalHits, successes }) {
  return (
    <>
      <Grid item container columns={12} direction="row" sx={{ mt: { xs: 1, sm: 3 }, mb: 0, mx: 'auto', width: { xs: '70%', sm: '35%' }, p: {xs: 1, sm: 2}, borderRadius: 3, color: 'primary.main', bgcolor: 'primary.container' }}>
        <Grid item container xs={5} direction="column" spacing={1} sx={{ p: 0 }}>
          <Grid item align="center" sx={{ p: 0 }}>
            <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, fontWeight: 500, color: '#011f4b' }}>
              hits
            </Typography>
          </Grid>
          <Grid item align="center">
            <Typography sx={{ fontSize: { xs: '12px', sm: '16px' } }}>
              {successes}/{totalHits}
            </Typography>
          </Grid>
        </Grid>
        {/* <Divider sx={{ width: '0%', position: 'absolute', height: '80%', left: '130px' }} orientation="vertical" /> */}
        <Grid item align="center" xs={2} sx={{}}>
          <Divider sx={{ width: '0%', mx: 'auto' }} orientation="vertical" />
        </Grid>
        <Grid item container xs={5} direction="column" spacing={1} sx={{ p: 0 }}>
          <Grid item align="center" sx={{ p: 0 }}>
            <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, fontWeight: 500, color: '#011f4b' }}>
              success rate
            </Typography>
          </Grid>
          <Grid item align="center">
            <Typography sx={{ fontSize: { xs: '12px', sm: '16px' } }}>
              {Math.trunc((successes / totalHits) * 100) || 0}%
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

