import React from 'react';
import Slides from './Slides';

function Folder(props) {
  return (
    <div>
      <button
        onClick={() => props.handleChange(props.folder.id)}
      >{props.folder.name}
      </button>
      <div className="slides">
        {<Slides slides={props.folder.slides} />}
      </div>
    </div>
  );
}

export default Folder;
