import React, { Component } from "react";
import { render } from "react-dom";
import WebMidi from "webmidi";
import Soundfont from "soundfont-player";

import Song from "./components/Song";
import SetupMIDIModal from "./components/SetupMIDIModal";
import SetupKeyboard from "./components/SetupKeyboard";
import InstrumentSelector from "./components/InstrumentSelector";

import InstrumentList from "./models/Instruments";
import { notesToSchedule } from "./models/Song";
import { addToTmp, completeNote } from "./models/TempNotes";

import styles from "./index.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMIDISetupModal: false,
      showKeyboardSetup: false,
      showInstrumentSelector: false,
      midiLoading: true,
      midiError: null,
      midiInput: null,
      instrument: null,
      loadedInstruments: {},
      recording: false,
      currentSong: {
        name: "Track 1",
        notes: {}
      },
      savedSongs: []
    };

    this.enableWebMidi = this.enableWebMidi.bind(this);
    this.toggleMIDISetupModal = this.toggleMIDISetupModal.bind(this);
    this.toggleKeyboardModal = this.toggleKeyboardModal.bind(this);
    this.toggleInstrumentSelector = this.toggleInstrumentSelector.bind(this);
    this.setMIDIinput = this.setMIDIinput.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.changeInstrument = this.changeInstrument.bind(this);
    this.playSong = this.playSong.bind(this);
    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  componentDidMount() {
    this.enableWebMidi();
    this.changeInstrument("acoustic_grand_piano");
  }

  enableWebMidi() {
    if (WebMidi.enabled === true) {
      console.log("Midi already enabled");
      this.setState({
        midiLoading: false
      });
    } else {
      WebMidi.enable(err => {
        if (err) {
          console.log("WebMidi could not be started", err);
          this.setState({
            midiLoading: false,
            midiError: err
          });
        } else {
          console.log("WebMidi successfully started", WebMidi);
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
    this.setState({
      recording: !this.state.recording
    });
  }

  changeInstrument(instrumentName) {
    const { loadedInstruments } = this.state;
    if (instrumentName in InstrumentList) {
      if (instrumentName in loadedInstruments) {
        return this.state.loadedInstruments[instrumentName];
      } else {
        Soundfont.instrument(new AudioContext(), instrumentName).then(
          instrument => {
            this.setState({
              instrument,
              loadedInstruments: {
                ...this.state.loadedInstruments,
                [`${instrumentName}`]: instrument
              }
            });
          }
        );
      }
    } else {
      throw `Instrument ${instrumentName} not recognized.`;
    }
  }

  playSong() {
    const { currentSong, loadedInstruments } = this.state;

    const ac = new AudioContext();

    Object.keys(currentSong.notes).map(instrumentName => {
      const instrument = loadedInstruments[instrumentName];
      const notes = notesToSchedule(currentSong.notes[instrumentName]);
      instrument.schedule(ac.currentTime, notes);
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
    const { instrument, recording } = this.state;

    // TODO have note play for correct amount of time
    instrument.play(noteEvent.note.number);

    if (recording === true) {
      addToTmp(noteEvent);
      console.log("Note Event added to tmpNotes: ", noteEvent);
    }
  }

  noteOff(noteEvent) {
    const { instrument, recording, currentSong } = this.state;

    if (recording === true) {
      const note = completeNote(noteEvent);

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
        () => console.log("Current song updated: ", this.state.currentSong)
      );
    }
  }

  render() {
    const {
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
        <button onClick={this.toggleMIDISetupModal}>Setup MIDI Device</button>
        <button onClick={this.toggleKeyboardModal}>Setup Keyboard</button>
        <button onClick={this.toggleInstrumentSelector}>
          Change Instrument
        </button>
        <button onClick={this.toggleRecording}>Toggle Recording</button>
        <button onClick={this.playSong}>Play Current Song</button>
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
        <Song song={currentSong} />
      </div>
    );

    return body;
  }
}

render(<App />, document.getElementById("root"));
