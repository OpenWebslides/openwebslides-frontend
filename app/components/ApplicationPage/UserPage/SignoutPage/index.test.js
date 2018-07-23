// @flow

import * as React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import platform from 'modules/platform';

import SignoutPage from '.';

describe(`SignoutPage`, (): void => {

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
    dummyStore.dispatch = dummyDispatch;
  });

  it(`dispatches a signout action on load`, (): void => {
    mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SignoutPage />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(platform.actions.signout());
  });

});
