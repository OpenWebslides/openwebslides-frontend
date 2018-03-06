// @flow
/**
 * Contains logic concerned with rendering the app in the browser.
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'semantic-ui-css/semantic.min.css';

// The uppermost app container component.
import Application from './Application';

// The HTML element that should contain the app.
const appRootElement: (Element | null) = document.getElementById('react-app');

if (appRootElement !== null) {
  // Function that renders the supplied Component with React
  const render = (RootComponent: React.ComponentType<*>): void => {
    ReactDOM.render(
      <AppContainer>
        <RootComponent />
      </AppContainer>,
      appRootElement,
    );
  };

  // Render the application
  render(Application);

  // Webpack Hot Module Replacement API
  if (module.hot) {
    // $FlowFixMe
    module.hot.accept(Application, (): void => {
      render(Application);
    });
  }
}
else {
  console.error('React app root element not found.');
}
