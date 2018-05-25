import ReactDOM from 'react-dom';
import meiosis from './meiosis';
import createApp from './app';

const $root = document.getElementById("root");

const render = view => ReactDOM.render(view, $root);

meiosis(createApp, render);