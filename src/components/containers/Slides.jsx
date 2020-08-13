import React from 'react';

function Slides(props) {
  return props.slides.map((pdf) => {
    const id = props.slides.indexOf(pdf);
    return (
      <div key={id} className="menuItem">
        <a href={pdf.url} target="_blank" rel='noreferrer' >{pdf.name}</a>
      </div>
    );
  });
}

export default Slides;
