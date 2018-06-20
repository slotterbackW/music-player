import React, { Component } from 'react';
import WebMidi from 'webmidi';

class SetupMIDIModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };

    this.setupMidiDevice = this.setupMidiDevice.bind(this);
  }

  setupMidiDevice(midiDevice) {
    const { noteOn, noteOff, setMIDIinput } = this.props;
    console.log('MIDI Device chosen', midiDevice);

    midiDevice.addListener('noteon', 'all', e => {
      noteOn(e);
    });

    midiDevice.addListener('noteoff', 'all', e => {
      noteOff(e);
    });

    setMIDIinput(midiDevice);
  }

  render() {
    const { error, loading } = this.state;
    const midiInputs = WebMidi.inputs;
    const { onClose } = this.props;

    const errorMessage = error ? <p className="red">{error}</p> : null;

    const inputs =
      midiInputs && midiInputs.length > 0 ? (
        <ul className="list">
          {midiInputs.map((midiInput, index) => (
            <li
              onClick={() => {
                this.setupMidiDevice(midiInput);
                onClose();
              }}
              key={index}
              className="list-item"
            >
              {midiInput.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No MIDI devices detected.</p>
      );

    return (
      <div className="modal dialog">
        <button onClick={onClose}>Close</button>
        {errorMessage}
        <h2>Set up MIDI Device</h2>
        {inputs}
      </div>
    );
  }
}

export default SetupMIDIModal;
