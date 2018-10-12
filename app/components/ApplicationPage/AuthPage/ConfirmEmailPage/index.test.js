// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

import ConfirmEmailPage, { PureConfirmEmailPage } from '.';

describe(`ConfirmEmailPage`, (): void => {

  let dummyConfirmationToken: string;
  let dummyConfirmEmail: any;

  let dummyDispatch: any;
  let dummyState: any;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
    dummyConfirmEmail = jest.fn();

    dummyDispatch = jest.fn();
    dummyState = {
      modules: {
        asyncRequests: { byId: {} },
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
        search: `?confirmationToken=${dummyConfirmationToken}`,
      },
    };

    const enzymeWrapper = shallow(
      <PureConfirmEmailPage
        {...dummyProviderProps.translatorProps}
        {...fixedDummyRouterProps}
        confirmEmail={dummyConfirmEmail}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a confirmEmail() action with the passed confirmationToken`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?confirmationToken=${dummyConfirmationToken}`,
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
