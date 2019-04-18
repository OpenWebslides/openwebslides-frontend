// @flow

import * as React from 'react';
import { flashErrorMessage } from 'redux-flash';
import { shallow, mount } from 'enzyme';
import { push } from 'connected-react-router';

import { AUTH_SIGNIN_ROUTE, HOME_ROUTE } from 'config/routes';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

import SSOCallbackPage, { PureSSOCallbackPage } from '.';

describe(`SSOCallbackPage`, (): void => {

  let dummyRefreshToken: string;
  let dummyId: any;
  let dummySetUserAuth: any;

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyRefreshToken = 'dummyRefreshToken';
    dummyId = 'dummyId';
    dummySetUserAuth = jest.fn();

    dummyDispatch = jest.fn();
  });

  it(`dispatches a SSO_SIGNIN action with the passed refreshToken and userId and redirects to the home page`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?refreshToken=${dummyRefreshToken}&userId=${dummyId}`,
      },
    };

    mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SSOCallbackPage {...fixedDummyRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(platform.actions.ssoSignin(dummyId, dummyRefreshToken));
    expect(dummyDispatch).toHaveBeenCalledWith(push(HOME_ROUTE));
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
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SSOCallbackPage {...fixedDummyRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(flashErrorMessage('MyCustomErrorMessage'));
    expect(dummyDispatch).toHaveBeenCalledWith(push(AUTH_SIGNIN_ROUTE));
  });

  it(`throws an InvalidArgumentError, when no refreshToken is passed`, (): void => {
    const noRefreshTokenDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?userId=foobarId`,
      },
    };

    expect((): void => {
      shallow(
        <PureSSOCallbackPage
          {...noRefreshTokenDummyRouterProps}
          setUserAuth={dummySetUserAuth}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when no userId is passed`, (): void => {
    const noUserIdDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?refreshToken=foobarToken`,
      },
    };

    expect((): void => {
      shallow(
        <PureSSOCallbackPage
          {...noUserIdDummyRouterProps}
          setUserAuth={dummySetUserAuth}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

});
