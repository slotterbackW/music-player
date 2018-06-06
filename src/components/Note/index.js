import React, { Component } from 'react';
import styles from './index.css';

const SPREAD = 20;
const HEIGHT = 30;
const SIZE = 5;

class Note extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { note } = this.props;

    const nStyle = {
      top: `${note.number * HEIGHT - 1530}px`,
      left: `${note.onTimestamp / SPREAD}px`,
      height: `${HEIGHT}px`,
      width: `${(note.offTimestamp - note.onTimestamp) / SIZE}px`
    };

    return (
      <div className="note" style={nStyle}>
        {`${note.name}${note.number} `}
      </div>
    );
  }
}

export default Note;
