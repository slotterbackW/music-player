/* Note pipeline:
    on noteOn: add note to hash using "note.number" + "-" + "note.octave" as a key
    on noteOff: find note in hash using same key, and combine the two notes,
    invalidate the key, and then add the completed note to `currentSong`
  */

const tmpNotes = {};

export const addToTmp = noteEvent => {
  console.log("Add to tmp called");
  tmpNotes[`${noteEvent.note.number}-${noteEvent.note.octave}`] = noteEvent;
};

export const completeNote = noteEvent => {
  const noteOnEvent =
    tmpNotes[`${noteEvent.note.number}-${noteEvent.note.octave}`];

  if (noteOnEvent === undefined) {
    console.log("No noteOn event found", noteEvent);
    return;
  }

  console.log("Note on retrieved from tmpNotes", noteOnEvent);

  const newNote = {
    name: noteEvent.note.name,
    number: noteEvent.note.number,
    octave: noteEvent.note.octave,
    onTimestamp: noteOnEvent.timestamp,
    offTimestamp: noteEvent.timestamp
  };
  console.log("New complete note generated", newNote);

  delete tmpNotes[`${noteEvent.note.number}-${noteEvent.note.octave}`];

  return newNote;
};
