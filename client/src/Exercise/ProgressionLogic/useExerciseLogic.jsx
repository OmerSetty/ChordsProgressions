import { useState, useEffect } from 'react';
import progressionGenerator from './progressionGenerator.jsx';
import useLocalStorage from '../LocalStorage/useLocalStorage.jsx';
import { degreesConfig, keysConfig } from '../Settings/SettingsSelectionData.js';


export default function useExerciseLogic() {
  console.log('in useExerciseLogic');
  const [totalHits, setTotalHits] = useLocalStorage('totalHits', 0);
  const [hadMistake, setHadMistake] = useState(false);
  const [successes, setSuccesses] = useLocalStorage('successes', 0);
  // state that created to handle new progression when the 'start' button is clicked
  const [progressionsFromMount, setProgressionsFromMount] = useState(0);

  const [isDuringProgression, setIsDuringProgression] = useState(false);
  const [bar, setBar] = useState(1);

  const [chordsData, setChordsData] = useState([]);
  const [playProgression, setPlayProgression] = useState(() => () => { });
  const [progression, setProgression] = useState([]);

  const [bars, setBars] = useLocalStorage('bars', 4);
  const [stateBars, setStateBars] = useState(bars);
  const [tempo, setTempo] = useLocalStorage('tempo', 1.5);
  const [stateTempo, setStateTempo] = useState(tempo);
  const [degrees, setDegrees] = useLocalStorage('degrees', degreesConfig);
  const [stateDegrees, setStateDegrees] = useState(degrees);
  const [keys, setKeys] = useLocalStorage('keys', keysConfig);
  const [stateKeys, setStateKeys] = useState(keys);
  // first value of array is true, because the first chord is always the I degree
  const [guessedBars, setGuessedBars] = useState([true, ...Array(bars - 1).fill(false)]);
  const [wrongAnswers, setWrongAnswers] = useState({});

  const settingsValues = {
    bars: {
      settingsValue: stateBars,
      settingsAction: setStateBars,
    },
    tempo: {
      settingsValue: stateTempo,
      settingsAction: setStateTempo,
    },
    degrees: {
      settingsValue: stateDegrees,
      settingsAction: setStateDegrees,
    },
    keys: {
      settingsValue: stateKeys,
      settingsAction: setStateKeys,
    },
  }

  const gameTrackStatus = {
    mount: progressionsFromMount === 0,
    duringProgression: isDuringProgression,
    endOfProgression: !isDuringProgression && progressionsFromMount > 0,
  }

  // const isInitialMount = useRef(true);
  useEffect(() => {
    if (progressionsFromMount > 0) {
      const { chordsData, playProgression, progression } = progressionGenerator();
      setChordsData(chordsData);
      setPlayProgression(() => playProgression);
      setProgression(progression);
      playProgression();
    }
  }, [progressionsFromMount]);


  // need this useEffect, otherwise 'guessedBars' won't sync in the progression after the bars configuration changes
  useEffect(() => {
    setGuessedBars([true, ...Array(bars - 1).fill(false)])
  }, [progression, bars])


  function changeCurrentBar(currentBar) {
    if (!guessedBars[currentBar]) setBar(currentBar);
  }

  function handleProgression() {
    setBars(stateBars);
    setTempo(stateTempo);
    setDegrees(stateDegrees);
    setKeys(stateKeys);
    setIsDuringProgression(true);
    if (progressionsFromMount > 0) {
      setHadMistake(false);
      setGuessedBars([true, ...Array(bars - 1).fill(false)]);
      setWrongAnswers({});
      setBar(1);
    }
    setProgressionsFromMount(prev => prev + 1)
    // isGameNotStarted ? handleFirstProgression() : handleNextProgression();
  }

  function nextUnguessedBar(i) {
    if (i === guessedBars.length) i = 0;
    return !guessedBars[i] ? i : nextUnguessedBar(i + 1);
  };

  function checkChord(degree) {
    if (degree !== progression[bar]) {
      new Audio('wrongAnswer.mp3').play();
      setHadMistake(true);
      setWrongAnswers(currentWrongAnswers => ({ ...currentWrongAnswers, [bar]: currentWrongAnswers[bar] !== undefined ? [...currentWrongAnswers[bar], degree] : [degree] }));
      return;
    }
    if (guessedBars.filter(bar => !bar).length === 1) {
      setIsDuringProgression(false);
      setTotalHits(prevTotalHits => prevTotalHits + 1);
      if (!hadMistake) setSuccesses(prevSuccesses => prevSuccesses + 1);
    }
    else {
      setBar(nextUnguessedBar(bar + 1));
    }
    const currentGuessedBars = [...guessedBars];
    currentGuessedBars[bar] = true;
    setGuessedBars(currentGuessedBars);
  }

  return {
    scoreData: { totalHits, successes },
    progressionData: { chordsData, guessedBars, bar, changeCurrentBar, gameTrackStatus },
    gameTrackControlData: { handleProgression, playProgression, gameTrackStatus },
    degreesOptionsData: { checkChord, gameTrackStatus, wrongAnswersForCurrentBar: wrongAnswers[bar] || [] },
    settingsData: { settingsValues }
  };
}
