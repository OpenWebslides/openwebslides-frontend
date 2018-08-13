// @flow

import * as React from 'react';
import { flashErrorMessage } from 'redux-flash';
import { shallow, mount } from 'enzyme';
import { push } from 'connected-react-router';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';
import * as paths from 'config/routes';

import SSOCallbackPage, { PureSSOCallbackPage } from '.';

describe(`SSOCallbackPage`, (): void => {

  let dummyApiToken: string;
  let dummyId: any;
  let dummySigninSSO: any;

  let dummyDispatch: any;
  let dummyState: any;

  beforeEach((): void => {
    dummyApiToken = 'foobarApiToken';
    dummyId = 'foobarId';
    dummySigninSSO = jest.fn();

    dummyDispatch = jest.fn();
    dummyState = {
      modules: {
        apiRequestsStatus: {},
        platform: { userAuth: null },
      },
      flash: {
        messages: [],
      },
    };
  });

  it(`renders without errors`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?apiToken=${dummyApiToken}&userId=${dummyId}`,
      },
    };

    const enzymeWrapper = shallow(
      <PureSSOCallbackPage
        {...dummyProviderProps.translatorProps}
        {...fixedDummyRouterProps}
        signinSSO={dummySigninSSO}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(true);
  });

  it(`dispatches a signinSSO() action with the passed apiToken and id`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?apiToken=${dummyApiToken}&userId=${dummyId}`,
      },
    };

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SSOCallbackPage {...fixedDummyRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(platform.actions.signinSSO(dummyApiToken, dummyId));
  });

  it(`sets a flash message and redirects to signin page when an error URL param is passed`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?error=MyCustomErrorMessage`,
      },
    };

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SSOCallbackPage {...fixedDummyRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(flashErrorMessage('MyCustomErrorMessage'));
    expect(dummyDispatch).toHaveBeenCalledWith(push(paths.AUTH_SIGNIN_ROUTE));
  });

  it(`throws an InvalidArgumentError, when no apiToken is passed`, (): void => {
    expect((): void => {
      shallow(
        <PureSSOCallbackPage
          {...dummyProviderProps.translatorProps}
          {...dummyProviderProps.routerProps}
          signinSSO={dummySigninSSO}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when no id is passed`, (): void => {
    expect((): void => {
      shallow(
        <PureSSOCallbackPage
          {...dummyProviderProps.translatorProps}
          {...dummyProviderProps.routerProps}
          signinSSO={dummySigninSSO}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

});
