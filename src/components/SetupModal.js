import React from 'react'

const SetupModal = ({ error, midiInputs, onSetupSuccess, onClose }) => {
    const errorMessage = error ? <p className="red">{error}</p> : null
    
    const inputs = midiInputs && midiInputs.length > 0 ?
        <ul>
            {midiInputs.map((midiInput, index) => (
                <li onClick={() => onSetupSuccess(midiInput)} key={index} className="input">
                    {midiInput.name}
                </li>    
            ))}
        </ul> :
        <p>No MIDI input detected.</p>
    
    return (
        <div className="setup-modal flex w-center">
            <button onClick={onClose}>Close</button>
            {errorMessage}
            <h2>Set up MIDI Device</h2>
            <div className="midi-inputs">
                {inputs}
            </div>
        </div>
    )
}

export default SetupModal