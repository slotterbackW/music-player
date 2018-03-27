import React, { Component } from 'react'
import { render } from 'react-dom'
import WebMidi from 'webmidi'
import Soundfont from 'soundfont-player'

import SetupModal from './components/SetupModal'

import Instruments from './models/Instruments'

const ac = new AudioContext()

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showSetupModal: false,
            initializeError: null,
            midiInputs: null,
            player: null,
            instrument: null,
            currentSong: null,
            savedSongs: []
        }

        this.setupPlayer = this.setupPlayer.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onSetupSuccess = this.onSetupSuccess.bind(this)
        this.changeInstrument = this.changeInstrument.bind(this)
        this.noteOn = this.noteOn.bind(this)
        this.noteOff = this.noteOff.bind(this)
    }

    setupPlayer() {
        WebMidi.enable(err => {
            if(err) {
                console.log("WebMidi could not be started", err)
                this.setState({
                    initializeError: err,
                    showSetupModal: true
                })
            } else {
                console.log("WebMidi successfully started", WebMidi)
                this.setState({
                    midiInputs: WebMidi.inputs,
                    showSetupModal: true,
                })
                this.changeInstrument('acoustic_grand_piano')
            }
        })
        console.log('If nothing shows up Midi has already been enabled. Just refresh the page')
    }

    onCloseModal() {
        this.setState({
            showSetupModal: false
        })
    }

    changeInstrument(instrumentName) {
        if (instrumentName in Instruments) {
            Soundfont.instrument(ac, instrumentName).then(instrument =>
                this.setState({
                    instrument: instrument
                })
            )
        } else {
            throw `Instrument ${instrumentName} not recognized.`
        }
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
        
        // TODO send note on message
        const { instrument } = this.state

        instrument.play(note.number)
        // Add to current song state
    }

    noteOff(note) {
        console.log('Received note OFF message', note)
        // TODO send note off message
        // Add to current song state
    }

    onSetupSuccess(midiInput) {
        console.log('onSetupSuccess', midiInput)
        
        const player = midiInput
        
        // TODO attach event listeners to midiInput
        player.addListener('noteon', 'all', e => {
            console.log('Received note ON message', e)
            this.noteOn(e.note)
        })

        player.addListener('noteoff', 'all', e => {
            console.log('Received note OFF message', e)
            this.noteOff(e.note)
        })

        this.setState({
            player: player
        })
    }

    render() {
        const { initializeError, midiInputs, showSetupModal } = this.state

        return(
            <div>
                <button onClick={this.setupPlayer}>Setup MIDI Device</button>
                {showSetupModal &&
                    <SetupModal
                        error={initializeError}
                        midiInputs={midiInputs}
                        onSetupSuccess={this.onSetupSuccess}
                        onClose={this.onCloseModal}
                    />
                }
            </div>
        )
    }
}

render(
    <App />,
    document.getElementById('root')
)
   