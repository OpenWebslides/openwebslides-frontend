// @flow
/* eslint-disable flowtype/no-weak-types */

import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, type LocationShape } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';

type PassedProps = {|
  children: React.Node,
  dummyState?: Object,
  dummyDispatch?: Dispatch<{}>,
  dummyRouterEntries?: Array<LocationShape | string>,
|};

type Props = {| ...PassedProps |};

const DummyProviders = (props: Props): React.Node => {
  const {
    children,
    dummyState,
    dummyDispatch,
    dummyRouterEntries,
  } = props;

  const dummyReducer = (state: any = {}, action: any): any => state;
  const dummyStore = createStore(dummyReducer, dummyState);
  dummyStore.dispatch = dummyDispatch;

  return (
    <Provider store={dummyStore}>
      <I18nextProvider i18n={i18nextConfig}>
        <MemoryRouter initialEntries={dummyRouterEntries}>
          {children}
        </MemoryRouter>
      </I18nextProvider>
    </Provider>
  );
};

DummyProviders.defaultProps = {
  dummyState: {},
  dummyDispatch: jest.fn(),
  dummyRouterEntries: [''],
};

export default DummyProviders;
