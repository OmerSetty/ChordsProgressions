import React from 'react';
import localStorageHandler from '../LocalStorage/localStorageHandler.js';
import Grid from '@mui/material/Grid';
import Degree from './Degree';
import { degreesConfig } from '../Settings/SettingsSelectionData.js';
import Typography from '@mui/material/Typography';

export default React.memo(function DegreesOptions({checkChord, gameTrackStatus, wrongAnswersForCurrentBar}) {
  console.log({wrongAnswersForCurrentBar});
  const [degrees] = localStorageHandler('degrees', degreesConfig);

  return (
    <>
      <Grid item container rowSpacing={2} columns={20} sx={{ pb: 2, border: 2, borderRadius: 4, borderColor: '#757575' }}>
        <Grid item align="center" xs={20}>
          <Typography variant='scoreHeadline'>
            Degrees Options
          </Typography>
        </Grid>
        {Object.keys(degrees).filter(degree => degrees[degree]).map(degree => {
          return (
            <Grid key={degree} item align="center" xs={4} sm={2}>
              <Degree degree={degree} checkChord={checkChord} disabled={gameTrackStatus['mount'] || gameTrackStatus['endOfProgression']} isWrong={wrongAnswersForCurrentBar.includes(degree)}></Degree>
            </Grid>
          )
        })}
      </Grid>  
    </>
  );
});