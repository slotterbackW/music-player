import React, { Component } from 'react';
import DisplayNote from '../DisplayNote';
import styles from './index.css';

const Block = ({ notes, index, onClick }) => (
  <div className="block" onClick={onClick}>
    {notes.map(note => (
      <DisplayNote
        key={`${note.number}-${note.octave}-${note.onTimestamp}`}
        note={note}
        blockIndex={index}
      />
    ))}
  </div>
);

export default Block;
