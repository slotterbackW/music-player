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

  renderBlocks() {
    const { instrument, notes, activeBlock, changeActiveBlock } = this.props;
    const blocks = notesToBlocks(notes);
    const blocksLength = Object.keys(blocks).length;

    if (blocksLength <= 0) {
      if (activeBlock.index !== 0 || activeBlock.instrument !== instrument) {
        changeActiveBlock(0);
      }
      return <ActiveBlock index={0} notes={[]} />;
    }

    return Object.keys(blocks).map(blockIndex => {
      if (
        instrument === activeBlock.instrument &&
        parseInt(blockIndex) === activeBlock.index
      ) {
        return (
          <ActiveBlock
            key={blockIndex}
            index={blockIndex}
            notes={blocks[blockIndex]}
          />
        );
      }

      const onBlockClick = () => changeActiveBlock(blockIndex);

      return (
        <Block
          key={blockIndex}
          index={blockIndex}
          notes={blocks[blockIndex]}
          onClick={onBlockClick}
        />
      );
    });
  }

  render() {
    return (
      <div className="instrument-blocks">
        <h4>{this.props.instrument}</h4>
        <div className="blocks">{this.renderBlocks()}</div>
      </div>
    );
  }
}

export default InstrumentBlocks;
