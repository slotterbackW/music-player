/* Note pipeline:
    on noteOn: add note to hash using "note.number" + "-" + "note.octave" as a key
    on noteOff: find note in hash using same key, and combine the two notes,
    invalidate the key, and then add the completed note to `currentSong`
  */

const tmpNotes = {};

export const addToTmp = note => {
  tmpNotes[`${note.number}-${note.octave}`] = note;
};

export const completeNote = noteOff => {
  const noteOn = tmpNotes[`${note.number}-${note.octave}`];
  console.log("Note on retrieved from tmpNotes", noteOn);

  const newNote = {
    name: note.name,
    number: note.number,
    octave: note.octave,
    onTimestamp: noteOn.timestamp, // TODO is this the correct reference?
    offTimestamp: note.timestamp // TODO ^
  };
  console.log("New complete note generated", newNote);

  delete tmpNotes[`${note.number}-${note.octave}`];

  return newNote;
};
