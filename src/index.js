import React, { Component } from 'react';
import { render } from 'react-dom';
import WebMidi from 'webmidi';
import Soundfont from 'soundfont-player';

import Button from './components/Button';
import Song from './components/Song';
import AddInstrumentButton from './components/AddInstrumentButton';
import SetupMIDIModal from './components/SetupMIDIModal';
import SetupKeyboard from './components/SetupKeyboard';
import InstrumentSelector from './components/InstrumentSelector';

import InstrumentList from './models/Instruments';
import { notesToSchedule } from './models/Song';
import { startNote, completeNote } from './models/TempNotes';

import styles from './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBlock: {
        instrument: 'acoustic_grand_piano',
        index: 0
      },
      showMIDISetupModal: true,
      showKeyboardSetup: false,
      showInstrumentSelector: false,
      midiLoading: true,
      midiError: null,
      midiInput: null,
      instrument: null,
      loadedInstruments: {},
      time: null,
      recording: false,
      currentSong: {
        name: 'Track 1',
        notes: {
          acoustic_grand_piano: []
        }
      },
      playingNotes: [],
      savedSongs: []
    };

    this.enableWebMidi = this.enableWebMidi.bind(this);
    this.toggleMIDISetupModal = this.toggleMIDISetupModal.bind(this);
    this.toggleKeyboardModal = this.toggleKeyboardModal.bind(this);
    this.toggleInstrumentSelector = this.toggleInstrumentSelector.bind(this);
    this.setMIDIinput = this.setMIDIinput.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.changeActiveBlock = this.changeActiveBlock.bind(this);
    this.addInstrumentToSong = this.addInstrumentToSong.bind(this);
    this.deleteInstrumentFromSong = this.deleteInstrumentFromSong.bind(this);
    this.songHasInstrument = this.songHasInstrument.bind(this);
    this.changeInstrument = this.changeInstrument.bind(this);
    this.loadAndSetInstrument = this.loadAndSetInstrument.bind(this);
    this.playSong = this.playSong.bind(this);
    this.playOnlyNotes = this.playOnlyNotes.bind(this);
    this.playNotes = this.playNotes.bind(this);
    this.stopPlayingNotes = this.stopPlayingNotes.bind(this);
    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  componentDidMount() {
    this.enableWebMidi();
    this.loadAndSetInstrument('acoustic_grand_piano');
  }

  enableWebMidi() {
    if (WebMidi.enabled === true) {
      console.log('Midi already enabled');
      this.setState({
        midiLoading: false
      });
    } else {
      WebMidi.enable(err => {
        if (err) {
          console.log('WebMidi could not be started', err);
          this.setState({
            midiLoading: false,
            midiError: err
          });
        } else {
          console.log('WebMidi successfully started', WebMidi);
          this.setState({
            midiLoading: false
          });
        }
      });
    }
  }

  toggleMIDISetupModal() {
    this.setState({
      showMIDISetupModal: !this.state.showMIDISetupModal
    });
  }

  toggleKeyboardModal() {
    this.setState({
      showKeyboardSetup: !this.state.showKeyboardSetup
    });
  }

  toggleInstrumentSelector() {
    this.setState({
      showInstrumentSelector: !this.state.showInstrumentSelector
    });
  }

  setMIDIinput(midiInput) {
    this.setState({
      midiInput: midiInput
    });
  }

  toggleRecording() {
    console.log('Recording changed to', !this.state.recording);
    this.setState({
      recording: !this.state.recording,
      time: new Date()
    });
  }

  changeActiveBlock(instrumentName, index) {
    this.setState({
      activeBlock: {
        instrument: instrumentName,
        index: parseInt(index)
      }
    });
    this.changeInstrument(instrumentName);
  }

  songHasInstrument(instrumentName) {
    return Object.keys(this.state.currentSong.notes).includes(instrumentName);
  }

  addInstrumentToSong(instrumentName) {
    const { currentSong } = this.state;
    this.setState(
      {
        currentSong: Object.assign({}, currentSong, {
          notes: {
            ...currentSong.notes,
            [`${instrumentName}`]: []
          }
        })
      },
      () => this.changeActiveBlock(instrumentName, 0)
    );
  }

  deleteInstrumentFromSong(instrumentName) {
    const { currentSong } = this.state;
    const instruments = Object.keys(currentSong.notes);

    if (instruments.length <= 1) {
      console.log("Can't delete last instrument!");
      return;
    }

    const { [instrumentName]: deletedNotes, ...newNotes } = currentSong.notes;
    this.setState({
      currentSong: Object.assign({}, currentSong, { notes: newNotes })
    });
    this.loadAndSetInstrument(instruments[0]);
  }

  setNewInstrument(instrument) {
    this.setState({
      instrument,
      loadedInstruments: {
        ...this.state.loadedInstruments,
        [`${instrument.name}`]: instrument
      }
    });
  }

  loadInstrument(instrumentName) {
    const { loadedInstruments } = this.state;
    if (Object.keys(loadedInstruments).includes(instrumentName)) {
      return Promise.resolve(loadedInstruments[instrumentName]);
    }
    return Soundfont.instrument(new AudioContext(), instrumentName);
  }

  loadAndSetInstrument(instrumentName) {
    this.loadInstrument(instrumentName)
      .then(instrument => {
        console.log('Instrument loaded', instrument.name);
        this.setNewInstrument(instrument);
      })
      .catch(error => console.log('Error loading instrument', instrument));
  }

  changeInstrument(instrumentName) {
    const { loadedInstruments } = this.state;
    if (instrumentName in InstrumentList) {
      if (this.songHasInstrument(instrumentName)) {
        this.setState({
          instrument: this.state.loadedInstruments[instrumentName]
        });
      } else {
        this.loadInstrument(instrumentName).then(instrument => {
          this.setNewInstrument(instrument);
          this.addInstrumentToSong(instrumentName);
        });
      }
    } else {
      throw `Instrument ${instrumentName} not recognized.`;
    }
  }

  playOnlyNotes(instrumentName, notes) {
    this.setState({
      playingNotes: this.playNotes(instrumentName, notes)
    });
  }

  playNotes(instrumentName, notes) {
    const instrument = this.state.loadedInstruments[instrumentName];
    const schedule = notesToSchedule(notes);
    return instrument.schedule(0, schedule);
  }

  playSong() {
    const { currentSong } = this.state;

    this.setState({
      playingNotes: Object.keys(currentSong.notes)
        .map(instrumentName =>
          this.playNotes(instrumentName, currentSong.notes[instrumentName])
        )
        .reduce((acc, item) => acc.concat(item), [])
    });
  }

  stopPlayingNotes() {
    this.state.playingNotes.forEach(note => note.stop());
    this.setState({
      playingNotes: []
    });
  }

  /*
      Note structure:
      {
          name: 'C',
          number: 60,
          octave: 3
      }
  */

  noteOn(noteEvent) {
    const timestamp = new Date() - this.state.time;
    const nEvent = Object.assign({}, noteEvent, { timestamp });
    console.log('Note on event', nEvent);
    const sound = this.state.instrument.play(noteEvent.note.number);
    startNote(nEvent, sound);
  }

  noteOff(noteEvent) {
    const { instrument, recording, currentSong } = this.state;
    const timestamp = new Date() - this.state.time;
    const nEvent = Object.assign({}, noteEvent, { timestamp });
    console.log('Note off event', nEvent);
    const note = completeNote(nEvent);
    if (!note) {
      return;
    }

    if (recording === true) {
      const existingNotes = currentSong.notes[`${instrument.name}`];
      const newNotes = existingNotes ? [...existingNotes, note] : [note];

      this.setState(
        {
          currentSong: Object.assign({}, currentSong, {
            notes: {
              ...currentSong.notes,
              [`${instrument.name}`]: newNotes
            }
          })
        },
        () => console.log('Current song updated: ', this.state.currentSong)
      );
    }
  }

  render() {
    const {
      activeBlock,
      currentSong,
      midiLoading,
      midiError,
      showMIDISetupModal,
      showKeyboardSetup,
      showInstrumentSelector
    } = this.state;

    const error = midiError ? <p>{midiError}</p> : null;

    const body = midiLoading ? (
      <h1>Loading</h1>
    ) : (
      <div>
        {error}
        <Button
          title={'Setup MIDI Device'}
          onClick={this.toggleMIDISetupModal}
        />
        <Button title={'Setup Keyboard'} onClick={this.toggleKeyboardModal} />
        {showMIDISetupModal && (
          <SetupMIDIModal
            setMIDIinput={this.setMIDIinput}
            noteOn={this.noteOn}
            noteOff={this.noteOff}
            onClose={this.toggleMIDISetupModal}
          />
        )}
        {showKeyboardSetup && (
          <SetupKeyboard onClose={this.toggleKeyboardModal} />
        )}
        {showInstrumentSelector && (
          <InstrumentSelector
            onClose={this.toggleInstrumentSelector}
            onChange={this.changeInstrument}
          />
        )}
        <Song
          song={currentSong}
          activeBlock={activeBlock}
          playSong={this.playSong}
          stopSong={this.stopPlayingNotes}
          changeActiveBlock={this.changeActiveBlock}
          toggleRecording={this.toggleRecording}
          deleteInstrument={this.deleteInstrumentFromSong}
          playNotes={this.playOnlyNotes}
        />
        <AddInstrumentButton onClick={this.toggleInstrumentSelector} />
      </div>
    );

    return body;
  }
}

render(<App />, document.getElementById('root'));
