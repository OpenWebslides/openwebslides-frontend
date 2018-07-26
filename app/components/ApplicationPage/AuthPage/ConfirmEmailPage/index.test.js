// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

import ConfirmEmailPage, { PureConfirmEmailPage } from '.';

describe(`ConfirmEmailPage`, (): void => {

  let dummyConfirmationToken: string;
  let dummyConfirmEmail: *;

  let dummyDispatch: *;
  let dummyState: any;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
    dummyConfirmEmail = jest.fn();

    dummyDispatch = jest.fn();
    dummyState = {
      modules: {
        apiRequestsStatus: {},
        platform: { userAuth: null },
      },
    };
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

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ConfirmEmailPage {...fixedDummyRouterProps} />
      </DummyProviders>,
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
