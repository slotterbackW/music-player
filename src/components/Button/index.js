import React, { Component } from 'react';
import styles from './index.css';

const Button = ({ title, onClick, icon }) => (
  <button className="button" onClick={onClick}>
    <span>{title}</span>
    {icon ? <div className="button-icon">{icon}</div> : null}
  </button>
);

export default Button;
