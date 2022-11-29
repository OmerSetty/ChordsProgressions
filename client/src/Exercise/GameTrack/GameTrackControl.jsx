import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function GameTrackControl({ handleProgression, playProgression, gameTrackStatus }) {

  return (
    <>
      <Grid item container xs={6} sm={3}>
        <Grid item container justifyContent="center" alignItems="center" sx={{ mb: { xs: 1, sm: 3 }, py: 2, border: 2, borderRadius: 4, borderColor: '#757575' }}>
          <Grid item xs={6} sx={{ px: 2, textAlign: 'center' }}>
            <IconButton sx={{ border: 2, borderRadius: '50%' }} disabled={gameTrackStatus['duringProgression']} onClick={handleProgression}>
              <PlayArrowIcon sx={{ fontSize: { xs: 'h3.fontSize', sm: 'h2.fontSize' } }} />
            </IconButton>
          </Grid>
          <Grid item xs={6} sx={{ px: 2, textAlign: 'center' }}>
            <IconButton sx={{ border: 2, borderRadius: '50%' }} disabled={gameTrackStatus['mount']} onClick={playProgression}>
              <ReplayOutlinedIcon sx={{ fontSize: { xs: 'h3.fontSize', sm: 'h2.fontSize' } }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default GameTrackControl;