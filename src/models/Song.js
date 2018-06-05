/*
  Song structure:
  {
    name: 'Track 1',
    notes: {
      piano: [
        Note,
        Note,
        ...
      ],
      drum: [
        ...
      ]
    }
  }
*/

/* Turns an array of notes into a schedule for use with Soundfont player */
export const notesToSchedule = notes => {
  if (notes && notes.length > 0) {
    const startTime = notes[0].onTimestamp;
    return notes.map(note => ({
      note: note.number,
      time: (note.onTimestamp - startTime) / 1000,
      duration: (note.offTimestamp - note.onTimestamp) / 1000
    }));
  }
  return [];
};
