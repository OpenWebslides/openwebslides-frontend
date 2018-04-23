// @flow
/**
 * Sets up the application.
 */

import { hot } from 'react-hot-loader';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import i18nextConfig from 'config/i18next';
import pageRoutes from 'pages/routes';

const PureApplication = (): React.Node => {
  return (
    <I18nextProvider i18n={i18nextConfig}>
      <BrowserRouter>
        {pageRoutes}
      </BrowserRouter>
    </I18nextProvider>
  );
};

const Application = hot(module)(PureApplication);

export { PureApplication };
export default Application;
