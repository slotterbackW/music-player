import React, { Component } from 'react';
import InstrumentBlocks from '../InstrumentBlocks';
import SongControls from '../SongControls';
import styles from './index.css';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBlock: {
        instrument: 'acoustic_grand_piano',
        index: 0
      }
    };

    this.changeActiveBlock = this.changeActiveBlock.bind(this);
  }

  changeActiveBlock(instrument, index) {
    console.log('Change active block called', instrument, parseInt(index));
    this.setState({
      activeBlock: {
        instrument,
        index: parseInt(index)
      }
    });
  }

  render() {
    const {
      song,
      playNotes,
      playSong,
      toggleRecording,
      deleteInstrument
    } = this.props;
    const { activeBlock } = this.state;

    return (
      <div className="song">
        <SongControls
          title={song.name}
          playSong={playSong}
          toggleRecording={toggleRecording}
        />
        {Object.keys(song.notes).map(instrument => {
          const changeBlockWithInstrument = blockIndex =>
            this.changeActiveBlock(instrument, blockIndex);

          const playNotesWithInstrument = notes => playNotes(instrument, notes);

          return (
            <InstrumentBlocks
              key={instrument}
              instrument={instrument}
              notes={song.notes[instrument]}
              activeBlock={activeBlock}
              playNotes={playNotesWithInstrument}
              changeActiveBlock={changeBlockWithInstrument.bind(this)}
              deleteInstrument={deleteInstrument}
            />
          );
        })}
      </div>
    );
  }
}

export default Song;
