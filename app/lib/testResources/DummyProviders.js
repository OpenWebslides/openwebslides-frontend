// @flow

/* eslint-disable flowtype/no-weak-types */

import * as React from 'react';
import { createStore, type Dispatch } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, type LocationShape } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { wrapInTestContext } from 'react-dnd-test-utils';

import i18nextConfig from 'config/i18next';

import dummyInitialState from './dummyInitialState';

type PassedProps = {|
  children: React.Node,
  dummyState?: Object,
  dummyDispatch?: Dispatch<any>,
  // eslint-disable-next-line flowtype/no-mutable-array
  dummyRouterEntries?: Array<LocationShape | string>,
|};

type Props = {| ...PassedProps |};

const DummyDecoratedProviders = (props: Props): React.Node => {
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

DummyDecoratedProviders.defaultProps = {
  dummyState: dummyInitialState,
  dummyDispatch: jest.fn(),
  dummyRouterEntries: [''],
};

const DummyProviders = wrapInTestContext(DummyDecoratedProviders);

export default DummyProviders;
