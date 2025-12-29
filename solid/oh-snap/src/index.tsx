/* @refresh reload */
import 'bootstrap/scss/bootstrap.scss';

import { render } from 'solid-js/web';
import 'solid-devtools';

/**
 * This file was taken from the cheatsheet example of bootstrap.
 * You will most likely remove it if using this template.
 */
import './cheatsheet.scss';

import App from './App';

const root = document.getElementById('root');


render(() => <App />, root!);
