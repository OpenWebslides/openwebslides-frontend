// @flow

/**
 * Sets up the application.
 */

import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'connected-react-router';
import { type BrowserHistory } from 'history/createBrowserHistory';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import i18nextConfig from 'config/i18next';
import ApplicationPage from 'components/ApplicationPage';
import errors from 'modules/errors';

type PassedProps = {|
  history: BrowserHistory,
|};

type Props = {| ...PassedProps |};

const { ErrorBoundary } = errors.components;

const PureApplication = (props: Props): React.Node => {
  const { history } = props;

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18nextConfig}>
        <ConnectedRouter history={history}>
          <DragDropContextProvider backend={HTML5Backend}>
            <ApplicationPage />
          </DragDropContextProvider>
        </ConnectedRouter>
      </I18nextProvider>
    </ErrorBoundary>
  );
};

const Application = hot(PureApplication);

export { PureApplication };
export default Application;
