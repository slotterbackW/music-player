import React, { Component } from "react";
import Notes from "../Notes";

class Song extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { song } = this.props;

    return (
      <div className="song-container">
        <h1>{song.name}</h1>
        <ul>
          {Object.keys(song.notes).map(instrument => (
            <Notes
              key={instrument}
              instrument={instrument}
              notes={song.notes[instrument]}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Song;
