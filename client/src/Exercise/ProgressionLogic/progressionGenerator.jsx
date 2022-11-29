import union from 'lodash/union';
import localStorageHandler from '../LocalStorage/localStorageHandler.js';
import * as Tone from 'tone';
import { Chord as tonalChord, Progression as tonalProgression } from "@tonaljs/tonal";
import {enharmonicNotes, height, heightDistances} from './progressionConfig';
import { degreesConfig, keysConfig } from '../Settings/SettingsSelectionData.js';

export default function progressionGenerator() {
  const [msLeap] = localStorageHandler('tempo', 1.5);
  const [progressionLength] = localStorageHandler('bars', 4);
  const [degrees] = localStorageHandler('degrees', degreesConfig);
  const degreesKeys = Object.keys(degrees).filter(degree => degrees[degree]);
  const [keys] = localStorageHandler('keys', keysConfig);
  const keysKeys = Object.keys(keys).filter(key => keys[key]);
  
  const {key, progression} = generateProgression();
  const chords = tonalProgression.fromRomanNumerals(key, progression);
  const chordsData = getChordsData(chords);
  const chordsNotes = getChordsNotes(chordsData);
  const reducedChordsNotes = union(...chordsNotes);
  const reducedChordsNotesAudioObj = getAudioObj(reducedChordsNotes);

  function generateProgression() {
    const progression = Array(progressionLength).fill(0).map(() => degreesKeys[Math.floor(Math.random() * degreesKeys.length)]);
    progression[0] = 'I';
    const key = keysKeys[Math.floor(Math.random() * keysKeys.length)];
    return { key, progression };
  };

  function getChordsData(chords) {
    return chords.map((chord, index) => {
      const chordData = tonalChord.get(chord);
      const fixedHeight = height + heightDistances[Math.floor(Math.random() * heightDistances.length)];
      const fullChordData = tonalChord.getChord(chordData.type, chordData.tonic + fixedHeight, chordData.tonic + fixedHeight);
      fullChordData.degree = progression[index];
      return fullChordData;
    });
  }

  function getChordsNotes(chordsData) {
    return chordsData.map(chord => {
      chord.alias = chordSymbolParser(chord);
      return chord.notes.map(note => parseEnharmonicNote(note))
    });
  }
  
  function chordSymbolParser(chord) {
    switch (chord.type) {
      case 'major':
        return chord.aliases[2];
      default:
        return chord.aliases[0];
    }
  };

  function parseEnharmonicNote(note) {
    if (enharmonicNotes[note.slice(0, -1)]) return enharmonicNotes[note.slice(0, -1)] + note[note.length - 1];
    return note;
  };

  function getAudioObj(reducedChordsNotes) {
    return reducedChordsNotes.reduce((total, current) => {
      total[current] = `piano-mp3/${current}.mp3`;
      return total;
    }, {});
  }
  

  function playChord(chordPlayer, notes, ms) {
    notes.forEach(note => {
      chordPlayer.player(note).start(ms, null, msLeap);
    });
  };
  
  function playProgression() {
    const chordPlayer = new Tone.Players(reducedChordsNotesAudioObj).toDestination();
    Tone.loaded().then(() => {
      let ms = Tone.now();

      chordsNotes.forEach((chord, index) => {
        playChord(chordPlayer, chord, ms);
        ms += msLeap;
      });
    });
  };

  // function pauseProgression() {}

  return {chordsData, playProgression, progression};
};



