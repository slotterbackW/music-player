import React, { Component } from 'react';
import Blocks from '../Blocks';
import SongControls from '../SongControls';
import styles from './index.css';

class Song extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song, playSong, toggleRecording } = this.props;

    return (
      <div className="song">
        <SongControls
          title={song.name}
          playSong={playSong}
          toggleRecording={toggleRecording}
        />
        {Object.keys(song.notes).map(instrument => (
          <Blocks
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
