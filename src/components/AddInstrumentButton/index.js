import React, { Component } from 'react';
import styles from './index.css';

const AddInstrumentButton = ({ onClick }) => (
  <div className="children-centered">
    <button className="add-instrument-button" onClick={onClick}>
      Click to add new Instrument
    </button>
  </div>
);

export default AddInstrumentButton;
