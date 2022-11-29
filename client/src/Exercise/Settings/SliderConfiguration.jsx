import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import SettingsSliderData from './SettingsSliderData.js';
import { SettingsContext } from '../Exercise.jsx';

export default function SliderConfiguration({settingsKey}) {
  const {settingsValue, settingsAction} = useContext(SettingsContext)[settingsKey];

  const ariaLabel = `${settingsKey} values`;
  
  const marks = SettingsSliderData[settingsKey];
  const currentValue = getMarkByValueInKey(settingsKey, settingsValue).value;

  function getMarkByValueInKey(key, value) {
    return marks.find((mark) => mark[key] === value);
  }

  function valueLabelFormat(value) {
    return getMarkByValueInKey('value', value).label;
  }

  function changeLocalStorageValue(_, value) {
    console.log('changed slider value');
    settingsAction(getMarkByValueInKey('value', value)[settingsKey]);
  }
  
  return (
    <Box sx={{ width: {xs: '100%',sm: '70%'}, mx: 'auto' }}>
      <Slider sx={{ markLabel: 14 }}
        key={`slider-${currentValue}`}
        aria-label={ariaLabel}
        defaultValue={currentValue}
        valueLabelFormat={valueLabelFormat}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        onChangeCommitted={changeLocalStorageValue}
      />
    </Box>
  );
};

