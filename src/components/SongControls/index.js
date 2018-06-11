import React, { Component } from 'react';
import Button from '../Button';
import styles from './index.css';

const SongControls = ({ title, playSong, toggleRecording }) => (
  <div className="track-controls">
    <h1>{title}</h1>
    <Button title={'Play Current Song'} onClick={playSong} />
    <Button title={'Toggle Recording'} onClick={toggleRecording} />
  </div>
);

export default SongControls;
