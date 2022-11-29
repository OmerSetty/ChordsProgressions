import React, { useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SettingsContext } from '../Exercise.jsx';
import { parsedChordsSymbols } from '../ProgressionLogic/progressionConfig.js';

const SelectionConfiguration = ({settingsKey}) => {
  const {settingsValue, settingsAction} = useContext(SettingsContext)[settingsKey];

  const isAllChecked = Object.values(settingsValue).every(value => value);

  function changeChecked(keyToChange) {
    if (!isTheOnlyChecked(keyToChange)) { 
      settingsAction(settings => ({...settings, [keyToChange]: !settings[keyToChange]}))
    }
  }

  function changeCheckedForAll(event) {
    const checked = event.target.checked;
    settingsAction(settings => Object.keys(settings).reduce((total, current) => {
      total[current] = (current === 'I' || current === 'C') || checked;
      return total;
    }, {}));
  }

  function isTheOnlyChecked(keyToChange) {
    return Object.keys(settingsValue).filter(key => keyToChange !== key).every(key => !settingsValue[key]);
  }

  return (
    <>
      <FormGroup sx={{ mx: 'auto'}} row>
        <FormControlLabel sx={{ borderRadius: '20px', bgcolor: 'primary.lightblue', pr: 2.5, mb: 1 }}
          control={(<Checkbox sx={{ mx: 'auto' }} icon={<RadioButtonUncheckedIcon/>} checkedIcon={<CheckCircleOutlineIcon/>} checked={isAllChecked}></Checkbox>)}
          onChange={(event) => changeCheckedForAll(event)} label='All'/>
        {Object.keys(settingsValue).map((key, index) => (
          <FormControlLabel sx={{ borderRadius: '20px', bgcolor: 'primary.white', pr: 2.5, mb: 1 }}
          control={<Checkbox sx={{ mx: 'auto' }} icon={<RadioButtonUncheckedIcon/>} checkedIcon={<CheckCircleOutlineIcon/>} checked={settingsValue[key]}></Checkbox>}
          onChange={() => changeChecked(key)} label={parsedChordsSymbols[key] || key} key={index}/>
        ))}
      </FormGroup>
    </>
  );
};

export default SelectionConfiguration;