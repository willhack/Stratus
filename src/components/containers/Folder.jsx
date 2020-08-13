import React from 'react';
import Slides from './Slides';

function Folder(props) {
  return (
    <div>
      <button
        onClick={() => props.handleChange(props.folder.id)}
      >{props.folder.name}
      </button>
     {<Slides />}
    </div>
  );
};

export default Folder;
