import React, { Component } from 'react'
import { render } from 'react-dom'
import WebMidi from 'webmidi'

import SetupModal from './components/SetupModal'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showSetupModal: false,
            initializeError: null,
            midiInputs: null,
            player: null,
            currentSong: null,
            savedSongs: []
        }

        this.setupPlayer = this.setupPlayer.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onSetupSuccess = this.onSetupSuccess.bind(this)
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
            }
        })
        console.log('If nothing shows up Midi has already been enabled. Just refresh the page')
    }

    onCloseModal() {
        this.setState({
            showSetupModal: false
        })
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
        console.log('Received note ON message', note)
        // TODO send note on message
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
            this.noteOn(e.note)
        })

        player.addListener('noteoff', 'all', e => {
            console.log('Received note OFF message', e.note)
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
   