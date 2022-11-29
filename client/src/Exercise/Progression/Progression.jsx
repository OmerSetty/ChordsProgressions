import React from 'react';
import Grid from '@mui/material/Grid';
import Chord from './Chord';

export default function Progression({ chordsData, guessedBars, bar, changeCurrentBar, gameTrackStatus }) {
  return (
    <>
      <Grid item container spacing={2} sx={{ mb: 4 }}>
        {chordsData.length > 0 ?
          chordsData.map((chord, index) => {
            return (
              <Grid key={index} item align="center" xs={12} xstosm={3}>
                <Chord tonic={chord.root.slice(0, -1) + chord.alias} degree={chord.degree} index={index} currentBar={bar}
                  changeCurrentBar={changeCurrentBar} guessed={guessedBars[index]} disabled={gameTrackStatus['endOfProgression']}></Chord>
              </Grid>
            )
          })
          :
          Array(guessedBars.length).fill(0).map((_, index) => {
            return (
              <Grid key={index} item align="center" xs={12} xstosm={3}>
                <Chord guessed={false} disabled={true}></Chord>
              </Grid>
            )
          })
        }
      </Grid>
    </>
  );
};
