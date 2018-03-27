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
            player: null
        }

        this.setupPlayer = this.setupPlayer.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onSetupSuccess = this.onSetupSuccess.bind(this)
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

    onSetupSuccess(midiInput) {

        console.log('onSetupSuccess', midiInput)
        // TODO attach event listeners to midiInput
        const player = midiInput
        
        player.addListener('noteon', 'all', e => {
            console.log('Received note ON message', e.note)
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
   