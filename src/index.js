import React, { Component } from "react";
import { render } from "react-dom";
import WebMidi from "webmidi";
import Soundfont from "soundfont-player";

import SetupMIDIModal from "./components/SetupMIDIModal";
import SetupKeyboard from "./components/SetupKeyboard";

import Instruments from "./models/Instruments";
import { notesToSchedule } from "./models/Song";
import { addToTmp, completeNote } from "./models/TempNotes";

const ac = new AudioContext();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMIDISetupModal: false,
      showKeyboardSetup: false,
      midiLoading: true,
      midiError: null,
      midiInput: null,
      instrument: null,
      recording: false,
      currentSong: {
        name: "Track 1",
        notes: {}
      },
      savedSongs: []
    };

    this.toggleMIDISetupModal = this.toggleMIDISetupModal.bind(this);
    this.toggleKeyboardModal = this.toggleKeyboardModal.bind(this);
    this.setMIDIinput = this.setMIDIinput.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.changeInstrument = this.changeInstrument.bind(this);
    this.playSong = this.playSong.bind(this);
    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  componentDidMount() {
    if (WebMidi.enabled === true) {
      console.log("Midi is enabled");
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

  setMIDIinput(midiInput) {
    this.setState({
      midiInput: midiInput
    });

    this.changeInstrument("acoustic_grand_piano");
  }

  toggleRecording() {
    this.setState({
      recording: !this.state.recording
    });
  }

  changeInstrument(instrumentName) {
    if (instrumentName in Instruments) {
      Soundfont.instrument(ac, instrumentName).then(instrument =>
        this.setState({
          instrument: instrument
        })
      );
    } else {
      throw `Instrument ${instrumentName} not recognized.`;
    }
  }

  playSong() {
    const { currentSong, instrument } = this.state;

    const currentTime = ac.currentTime + 0.2;

    Object.keys(currentSong.notes).map(instrument => {
      Soundfont.instrument(ac, `${instrument}`).then(sfInstrument =>
        sfInstrument.schedule(
          currentTime,
          notesToSchedule(currentTime.notes[`${instrument}`])
        )
      );
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

  noteOn(note) {
    const { instrument, recording } = this.state;

    // TODO have note play for correct amount of time
    instrument.play(note.number);

    if (recording) {
      addToTmp(note);
      console.log("Note added to tmpNotes: ", note);
    }
  }

  noteOff(note) {
    const { instrument, recording } = this.state;

    console.log("Received note OFF message", note);
    if (recording) {
      this.setState(
        {
          currentSong: currentSong.notes[instrument].push(completeNote(note))
        },
        () => console.log("Current song updated: ", this.state.currentSong)
      );
    }
  }

  render() {
    const {
      midiLoading,
      midiError,
      showMIDISetupModal,
      showKeyboardSetup
    } = this.state;

    const error = midiError ? <p>{midiError}</p> : null;

    const body = midiLoading ? (
      <h1>Loading</h1>
    ) : (
      <div>
        {error}
        <button onClick={this.toggleMIDISetupModal}>Setup MIDI Device</button>
        <button onClick={this.toggleKeyboardModal}>Setup Keyboard</button>
        {showMIDISetupModal && (
          <SetupMIDIModal
            setMIDIinput={this.setMIDIinput}
            onClose={this.toggleMIDISetupModal}
          />
        )}
        {showKeyboardSetup && (
          <SetupKeyboard onClose={this.toggleKeyboardModal} />
        )}
      </div>
    );

    return body;
  }
}

render(<App />, document.getElementById("root"));
