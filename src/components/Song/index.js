import React, { Component } from 'react';
import Notes from '../Notes';
import styles from './index.css';

class Song extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props;

    return (
      <div className="song">
        <h1>{song.name}</h1>
        {Object.keys(song.notes).map(instrument => (
          <Notes
            key={instrument}
            instrument={instrument}
            notes={song.notes[instrument]}
          />
        ))}
      </div>
    );
  }
}

export default Song;
