import React, { Component } from 'react';
import ActiveBlock from '../ActiveBlock';
import Block from '../Block';
import { notesToBlocks } from '../../models/Song';
import styles from './index.css';

class InstrumentBlocks extends Component {
  constructor(props) {
    super(props);

    this.renderBlocks = this.renderBlocks.bind(this);
  }

  isActiveBlock(blockIndex) {
    const { instrument, activeBlock } = this.props;

    return (
      instrument === activeBlock.instrument &&
      parseInt(blockIndex) === activeBlock.index
    );
  }

  renderBlocks() {
    const { changeActiveBlock, notes, playNotes, stopNotes } = this.props;
    const blocks = notesToBlocks(notes);
    const blockIndexes = Object.keys(blocks);

    return blockIndexes.map(blockIndex => {
      const blockNotes = blocks[blockIndex];
      if (this.isActiveBlock(blockIndex)) {
        return (
          <ActiveBlock
            key={blockIndex}
            index={blockIndex}
            notes={blockNotes}
            playNotes={playNotes}
            stopNotes={stopNotes}
          />
        );
      }

      const onBlockClick = () => changeActiveBlock(blockIndex);

      return (
        <Block
          key={blockIndex}
          index={blockIndex}
          notes={blockNotes}
          onClick={onBlockClick}
        />
      );
    });
  }

  render() {
    const { instrument, deleteInstrument } = this.props;
    return (
      <div className="instrument-blocks">
        <div className="header">
          <h4>{this.props.instrument}</h4>
          <button
            onClick={() => deleteInstrument(instrument)}
            className="delete"
          >
            Delete
          </button>
        </div>
        <div className="blocks">{this.renderBlocks()}</div>
      </div>
    );
  }
}

export default InstrumentBlocks;
