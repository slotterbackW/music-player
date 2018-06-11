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

export const BLOCK_LENGTH = 6000;
/* Turns an array of notes into an array of blocks split based on timestamps */
export const notesToBlocks = notes => {
  if (notes && notes.length > 0) {
    let blocks = {};
    notes.map(note => {
      const blockIndex = Math.floor(note.offTimestamp / BLOCK_LENGTH);
      if (!blocks[blockIndex]) {
        blocks[`${blockIndex}`] = [note];
      } else {
        blocks[`${blockIndex}`].push(note);
      }
    });
    return blocks;
  }
  return {};
};
