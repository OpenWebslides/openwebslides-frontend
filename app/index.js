// @flow
/**
 * Contains logic concerned with rendering the app in the browser.
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';
// import VoicePlayer from 'lib/react-voice-components/VoicePlayer';

import 'assets/stylesheets/semantic.less';

// The uppermost app container component.
import Application from './Application';

// The HTML element that should contain the app.
const appRootElement: (Element | null) = document.getElementById('react-app');

// The Redux store.
const store = configureStore();

if (appRootElement !== null) {
  // Renders the Application component with React.
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    appRootElement,
  );
/*
  const elems = document.getElementsByClassName('inline-markdown');
  let i:number = 0;
  for (i = 0; i < elems.length; i += 1) {
    alert(`span ${i}`);
  }
  alert(`total ${i}`); */
}
else {
  console.error('React app root element not found.');
}
