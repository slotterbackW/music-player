import React, { Component } from 'react';
import { BLOCK_LENGTH } from '../../models/Song';
import styles from './index.css';

const SPREAD = 11;
const HEIGHT = 30;
const SIZE = 5;

const DisplayNote = ({ blockIndex, note }) => {
  const nStyle = {
    top: `${note.number * HEIGHT - 1530}px`,
    left: `${(note.onTimestamp - blockIndex * BLOCK_LENGTH) / SPREAD}px`,
    height: `${HEIGHT}px`,
    width: `${(note.offTimestamp - note.onTimestamp) / SIZE}px`
  };

  return <div className="display-note" style={nStyle} />;
};

export default DisplayNote;
