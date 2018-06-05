/*
    Note Pipeline:

    on noteOn:
      add note + sound to hash using "note.number" + "-" + "note.octave" as key.

    on noteOff:
      Find note in hash using same key, stop the sound, and combine both the
      noteOff, and noteOn event into one note. Then invalidate the key, and add
      the completed note to the `currentSong`
*/

const TEMP_NOTES = {};

export const startNote = (noteEvent, sound) => {
  const noteWithSound = Object.assign({}, noteEvent, { sound });
  TEMP_NOTES[
    `${noteEvent.note.number}-${noteEvent.note.octave}`
  ] = noteWithSound;
};

export const completeNote = noteEvent => {
  const storedNote =
    TEMP_NOTES[`${noteEvent.note.number}-${noteEvent.note.octave}`];

  if (storedNote === undefined) {
    console.log("No noteOn event found", noteEvent);
    return;
  }

  storedNote.sound.stop();

  const newNote = {
    name: storedNote.note.name,
    number: storedNote.note.number,
    octave: storedNote.note.octave,
    onTimestamp: storedNote.timestamp,
    offTimestamp: storedNote.timestamp
  };

  delete TEMP_NOTES[`${noteEvent.note.number}-${noteEvent.note.octave}`];

  return newNote;
};
