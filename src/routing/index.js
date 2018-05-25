import ReactDOM from 'react-dom';
import initialize from './meiosis';
import createApp from './app';
import { watch } from './meiosis/middlewares';

// ROOT
let $root = document.getElementById('root');

// RENDER
let render = app => model => ReactDOM.render(app.view(model), $root);

// MEIOSIS
initialize(createApp, render, watch());
