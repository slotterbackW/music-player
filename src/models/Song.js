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

export const notesToSchedule = notes => {
  if (notes && notes.length > 0) {
    const startTime = notes[0].onTimestamp;
    return notes.map(note => ({
      time: (note.onTimestamp - startTime) / 1000,
      note: note.number
    }));
  }
  return [];
};
