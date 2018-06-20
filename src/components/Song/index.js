import React, { Component } from 'react';
import InstrumentBlocks from '../InstrumentBlocks';
import SongControls from '../SongControls';
import styles from './index.css';

class Song extends Component {
  render() {
    const {
      activeBlock,
      onBlockClick,
      song,
      playNotes,
      playSong,
      stopSong,
      toggleRecording,
      deleteInstrument
    } = this.props;

    return (
      <div className="song">
        <SongControls
          title={song.name}
          playSong={playSong}
          stopSong={stopSong}
          toggleRecording={toggleRecording}
        />
        {Object.keys(song.notes).map(instrument => {
          const changeBlockWithInstrument = blockIndex =>
            onBlockClick(instrument, blockIndex);

          const playNotesWithInstrument = notes => playNotes(instrument, notes);

          return (
            <InstrumentBlocks
              key={instrument}
              instrument={instrument}
              notes={song.notes[instrument]}
              activeBlock={activeBlock}
              playNotes={playNotesWithInstrument}
              stopNotes={stopSong}
              onBlockClick={changeBlockWithInstrument.bind(this)}
              deleteInstrument={deleteInstrument}
            />
          );
        })}
      </div>
    );
  }
}

export default Song;
