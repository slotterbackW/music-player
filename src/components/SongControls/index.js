import React, { Component } from 'react';
import Button from '../Button';
import styles from './index.css';

const SongControls = ({ title, playSong, stopSong, toggleRecording }) => (
  <div className="song-controls">
    <h1>{title}</h1>
    <Button title={'Play Current Song'} onClick={playSong} />
    <Button title={'Stop Song'} onClick={stopSong} />
    <Button title={'Toggle Recording'} onClick={toggleRecording} />
  </div>
);

export default SongControls;
