let nextNoteId = 0

export const addNoteOn = { number, timestamp } => {
    return {
        type: 'ADD_NOTE_ON',
        id: nextNoteId++,
        number,
        timestamp
    }
}

export const addNoteOn = { number, timestamp } => {
    return {
        type: 'ADD_NOTE_OFF',
        id: nextNoteId++,
        number,
        timestamp
    }
}