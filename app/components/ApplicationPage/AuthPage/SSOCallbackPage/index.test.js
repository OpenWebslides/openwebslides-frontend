// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

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
