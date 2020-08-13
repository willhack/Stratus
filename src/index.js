import React from 'react';
import { render } from 'react-dom';
import './styles';
import App from './components/App';

render(
  <App />,
  document.getElementById('root'),
);

module.hot.accept();