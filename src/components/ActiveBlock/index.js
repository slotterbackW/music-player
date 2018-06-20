import React, { Component } from 'react';
import Note from '../Note';
import styles from './index.css';

class ActiveBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { notes, index, playNotes, stopNotes } = this.props;
    return (
      <div>
        <button onClick={() => playNotes(notes)}>Play Notes</button>
        <button onClick={() => stopNotes()}>Stop Notes</button>
        <div className="block active-block">
          {notes.map(note => (
            <Note
              key={`${note.number}-${note.octave}-${note.onTimestamp}`}
              note={note}
              blockIndex={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ActiveBlock;
