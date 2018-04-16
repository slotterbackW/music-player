import React, { Component } from "react";

class SetupKeyboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClose } = this.props;

    return (
      <div>
        <button onClick={onClose}>Close</button>
        <h4>Keyboard modal in progress</h4>
      </div>
    );
  }
}

export default SetupKeyboard;
