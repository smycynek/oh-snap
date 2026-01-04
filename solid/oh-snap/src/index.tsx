/* @refresh reload */
import 'bootstrap/scss/bootstrap.scss';

import { render } from 'solid-js/web';
import 'solid-devtools';

import './styles.scss';

import App from './App';

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}
