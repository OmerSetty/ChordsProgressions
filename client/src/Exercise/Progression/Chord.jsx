import React from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { parsedChordsSymbols } from '../ProgressionLogic/progressionConfig.js';

export default function Chord({tonic, degree, index, currentBar, changeCurrentBar, guessed, disabled}) {
  function setBackgroundColor() {
    if (guessed) return 'primary.rightAnswer';
    return (index !== currentBar || index === undefined) ? 'primary.container' : 'primary.focusedAnswer';
  };

  return (
    <>
      <Card sx={{ bgcolor: setBackgroundColor()}}>
        <CardActionArea onClick={() => changeCurrentBar(index)} disabled={disabled}>
          <CardContent>
            <Typography sx={{ fontSize: {xs: 22,sm: 64} }} color='ActiveBorder'>
              {guessed ? parsedChordsSymbols[degree] || degree : '?'}
            </Typography>
            {<Typography sx={{ fontSize: {xs: 14,sm: 27} }} color='text.secondary'>
              {guessed ? tonic : '?'}
            </Typography>}
          </CardContent>
        </CardActionArea>
      </Card>
    </>    
  );
}