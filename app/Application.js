// @flow
/**
 * Sets up the application.
 */

import { hot } from 'react-hot-loader';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'connected-react-router';
import { type BrowserHistory } from 'history';

import i18nextConfig from 'config/i18next';
import ApplicationPage from 'components/ApplicationPage';

type PassedProps = {|
  history: BrowserHistory,
|};

type Props = {| ...PassedProps |};

const PureApplication = (props: Props): React.Node => {
  const { history } = props;

  return (
    <I18nextProvider i18n={i18nextConfig}>
      <ConnectedRouter history={history}>
        <ApplicationPage />
      </ConnectedRouter>
    </I18nextProvider>
  );
};

const Application = hot(module)(PureApplication);

export { PureApplication };
export default Application;
