import React from 'react';
import Score from './Score/Score';
import Progression from './Progression/Progression.jsx';
import DegreesOptions from './Degrees/DegreesOptions';
import GameTrackControl from './GameTrack/GameTrackControl';
import Settings from './Settings/Settings';
import useExerciseLogic from './ProgressionLogic/useExerciseLogic.jsx';
import { Grid } from '@mui/material';

export const SettingsContext = React.createContext(null);

export default function Exercise() {
  const {scoreData, progressionData, gameTrackControlData, degreesOptionsData, settingsData} = useExerciseLogic();
  return (
    <>
      <Grid item container><Score {...scoreData}/></Grid>
      
      <Grid item container justifyContent="center"><GameTrackControl {...gameTrackControlData}/></Grid>

      <Grid item container><Progression {...progressionData}/></Grid>
      
      <Grid item container><DegreesOptions {...degreesOptionsData}/></Grid>
      <Grid item container>
        <SettingsContext.Provider value={settingsData.settingsValues}>
          <Settings />
        </SettingsContext.Provider>
      </Grid>
    </>
  );
};