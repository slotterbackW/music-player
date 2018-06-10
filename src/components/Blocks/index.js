import React, { Component } from 'react';
import Block from '../Block';
import { notesToBlocks } from '../../models/Song';
import styles from './index.css';

class Blocks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { instrument, notes } = this.props;
    const blocks = notesToBlocks(notes);

    return (
      <div className="blocks">
        <h4>{instrument}</h4>
        {Object.keys(blocks).map(blockIndex => (
          <Block
            key={blockIndex}
            index={blockIndex}
            notes={blocks[blockIndex]}
          />
        ))}
      </div>
    );
  }
}

export default Blocks;
