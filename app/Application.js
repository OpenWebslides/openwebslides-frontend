// @flow
/**
 * Sets up the application.
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import configureStore from 'store/configureStore';
import i18nextConfig from 'config/i18next';
import pageRoutes from 'pages/routes';

const store = configureStore();

const Application = (): React.Node => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nextConfig}>
        <BrowserRouter>
          {pageRoutes}
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
};

export default Application;
