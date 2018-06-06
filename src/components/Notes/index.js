import React, { Component } from 'react';
import Note from '../Note';
import styles from './index.css';

class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { instrument, notes } = this.props;

    return (
      <div>
        <h4>{instrument}</h4>
        <div className="notes">
          {notes.map(note => (
            <Note
              key={`${note.name}${note.number}${note.onTimestamp}`}
              note={note}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Notes;
