import React from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { parsedChordsSymbols } from '../ProgressionLogic/progressionConfig.js';

export default function Degree({ degree, checkChord, disabled, isWrong }) {
  function handleClick() {
    checkChord(degree);
  }

  return (
    <Card sx={{ bgcolor: isWrong ? 'primary.wrongAnswer' : 'primary.container', border: 1, borderRadius: 5, width: 70 }}>
      <CardActionArea onClick={handleClick} disabled={disabled || isWrong}>
        <CardContent sx={{ p: 0.5 }}>
          <Typography sx={{ fontSize: 16 }}>
            {parsedChordsSymbols[degree] || degree}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}