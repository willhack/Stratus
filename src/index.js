import './styles.css';
import Monogram from './monogram.png';

function component() {
  const main = document.createElement('div');
  const myMonogram = new Image();

  main.innerHTML = 'Hello world';
  main.classList.add('hello');

  myMonogram.src = Monogram;
  main.appendChild(myMonogram);
  return main;
}

document.body.appendChild(component());
