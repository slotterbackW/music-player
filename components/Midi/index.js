import React, { Component } from 'react'

import Soundfont from 'soundfont-player'

export default class Midi extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instrument: null
        }

        this.play = this.play.bind(this)
    }

    play(note) {
        const { instrument } = this.state

        console.log('PLAY', note)

        instrument.play(note.number)
    }

    componentDidMount() {
        const { input } = this.props

        Soundfont.instrument(new AudioContext(), 'clavinet').then(instrument => {
            console.log('Instrument loaded')
            this.setState({
                instrument
            })
        })

        input.addListener('noteon', 'all', e => {
            console.log('Received note on message. Note: ', e.note)
            this.play(e.note)
        })
    }

    componentWillUnmount() {
        const { input } = this.props
        input.removeListener('noteon')
    }

    render() {
        return <h1>Midi</h1>
    }
}