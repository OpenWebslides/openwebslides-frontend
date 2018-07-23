// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

import ConfirmEmailPage, { PureConfirmEmailPage } from '.';

describe(`ConfirmEmailPage`, (): void => {

  let dummyConfirmationToken: string;
  let dummyConfirmEmail: *;

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyState: any;
  let dummyStore: *;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
    dummyConfirmEmail = jest.fn();

    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyState = {
      modules: {
        apiRequestsStatus: {},
        platform: { userAuth: null },
      },
    };
    dummyStore = createStore(dummyReducer, dummyState);
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      match: {
        ...dummyProviderProps.routerProps.match,
        params: {
          ...dummyProviderProps.routerProps.match.params,
          confirmationToken: dummyConfirmationToken,
        },
      },
    };

    const enzymeWrapper = shallow(
      <PureConfirmEmailPage
        {...dummyProviderProps.translatorProps}
        {...fixedDummyRouterProps}
        confirmEmail={dummyConfirmEmail}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a confirmEmail() action with the passed confirmationToken`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      match: {
        ...dummyProviderProps.routerProps.match,
        params: {
          ...dummyProviderProps.routerProps.match.params,
          confirmationToken: dummyConfirmationToken,
        },
      },
    };

    // eslint-disable-next-line no-unused-vars
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <ConfirmEmailPage {...fixedDummyRouterProps} />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(platform.actions.confirmEmail(dummyConfirmationToken));
  });

  it(`throws an InvalidArgumentError, when no confirmationToken is passed`, (): void => {
    expect((): void => {
      shallow(
        <PureConfirmEmailPage
          {...dummyProviderProps.translatorProps}
          {...dummyProviderProps.routerProps}
          confirmEmail={dummyConfirmEmail}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

});
