import React, { Component } from "react";

class Notes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { instrument, notes } = this.props;

    return (
      <div className="notes">
        <h4>{instrument}</h4>
        <ul>
          {notes.map(note => (
            <span key={`${note.name}${note.number}${note.onTimestamp}`}>{`${
              note.name
            }${note.number} `}</span>
          ))}
        </ul>
      </div>
    );
  }
}

export default Notes;
