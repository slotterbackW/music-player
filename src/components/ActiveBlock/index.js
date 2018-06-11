import React, { Component } from 'react';
import Note from '../Note';
import styles from './index.css';

class ActiveBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { notes, index } = this.props;
    return (
      <div className="block active-block">
        {notes.map(note => (
          <Note
            key={`${note.number}-${note.octave}-${note.onTimestamp}`}
            note={note}
            blockIndex={index}
          />
        ))}
      </div>
    );
  }
}

export default ActiveBlock;
