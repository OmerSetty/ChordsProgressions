import React from 'react';
import Grid from '@mui/material/Grid';
import Exercise from './Exercise';

export default function ExerciseLayout() {

  return (
    <>
      <Grid item container justifyContent="center">
        <Grid item container sx={{width: {xs: '100%', md: '960px'}}} rowSpacing={2}>
          <Exercise/>
        </Grid>
      </Grid>  
    </>
  );
}; 