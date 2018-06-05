import React, { Component } from "react";

class SetupKeyboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClose } = this.props;

    return (
      <div className="modal dialog">
        <button onClick={onClose}>Close</button>
        <h2>Set up Keyboard</h2>
        <p>in progress...</p>
      </div>
    );
  }
}

export default SetupKeyboard;
