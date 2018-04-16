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

export const notesToSchedule = notes =>
  notes.map(note => ({
    time: note.onTimestamp,
    note: note.number
  }));
