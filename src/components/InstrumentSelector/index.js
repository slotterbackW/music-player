import React, { Component } from "react";
import InstrumentList from "../../models/Instruments";
import "./styles.css";

class InstrumentSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    });
  }

  render() {
    const { onClose, onChange } = this.props;
    const { query } = this.state;

    return (
      <div className="modal dialog">
        <div>
          <div className="title-container">
            <h2>Change Instrument</h2>
            <button onClick={onClose}>X</button>
          </div>
          <form>
            <input
              className="search-input"
              ref={input => (this.search = input)}
              onChange={this.handleInputChange}
              placeholder="Search..."
            />
          </form>
        </div>
        <div className="dialog-body">
          <ul className="list">
            {Object.entries(InstrumentList)
              .filter(instrument => instrument[0].includes(query))
              .map((instrument, index) => (
                <li
                  onClick={() => {
                    onChange(instrument[0]);
                    onClose();
                  }}
                  key={instrument[1]}
                  className="list-item"
                >
                  {instrument[0]}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default InstrumentSelector;
