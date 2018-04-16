import React, { Component } from "react";
import WebMidi from "webmidi";

class SetupMIDIModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.setupMidiDevice = this.setupMidiDevice.bind(this);
  }

  setupMidiDevice(midiDevice) {
    console.log("setup MIDI Device", midiDevice);

    // TODO attach event listeners to midiInput
    midiDevice.addListener("noteon", "all", e => {
      console.log("Received note ON message", e);
      this.noteOn(e.note);
    });

    midiDevice.addListener("noteoff", "all", e => {
      console.log("Received note OFF message", e);
      this.noteOff(e.note);
    });

    this.props.setMIDIinput(midiDevice);
  }

  render() {
    const { error, loading } = this.state;
    const midiInputs = WebMidi.inputs;
    const { onClose } = this.props;

    const errorMessage = error ? <p className="red">{error}</p> : null;

    const inputs =
      midiInputs && midiInputs.length > 0 ? (
        <ul>
          {midiInputs.map((midiInput, index) => (
            <li
              onClick={() => {
                this.setupMidiDevice(midiInput);
                onClose();
              }}
              key={index}
              className="input"
            >
              {midiInput.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No MIDI input detected.</p>
      );

    return (
      <div className="setup-modal flex w-center">
        <button onClick={onClose}>Close</button>
        {errorMessage}
        <h2>Set up MIDI Device</h2>
        <div className="midi-inputs">{inputs}</div>
      </div>
    );
  }
}

export default SetupMIDIModal;
