import React from 'react'

const App = () => (
    <h1>App</h1>
)

export default App

/*
import WebMidi from 'webmidi'
import Midi from './components/Midi'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            midiError: null,
            midiInput: null
        }

        this.initializeMidiInput = this.initializeMidiInput.bind(this)
        this.enableWebMidi = this.enableWebMidi.bind(this)

        this.enableWebMidi()
    }

    initializeMidiInput() {
        console.log('WebMidi Inputs', WebMidi.inputs)
        this.setState({
            midiInput: WebMidi.inputs[0]
        })
    }

    enableWebMidi() {
        WebMidi.enable(err => {
            if(err) {
                console.log("WebMidi could not be started", err)
                this.setState({
                    midiError: err
                })
            } else {
                console.log("WebMidi successfully started")
                this.initializeMidiInput()
            }
        })
    }

    render() {
        const {
            midiError,
            midiInput,
            midiOutput
        } = this.state

        if (midiError) {
            return (
                <div>
                    <h2>An error occured</h2>
                    <p>{midiError}</p>
                </div>
            )
        } else if (midiInput === null) {
            return (
                <div>
                    <p>MIDI Input is null</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p><b>MIDI Input: </b>{midiInput.name}</p>
                    <Midi input={midiInput} />
                </div>
            )
        }
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
*/