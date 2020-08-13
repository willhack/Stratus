import React from 'react';
import logo from '../../cs.png';

function Header() {
  return (
    <div className='header'>
      <img src={logo} />
      <h1>Slides, foo!</h1>
    </div>
  );
}

export default Header;
