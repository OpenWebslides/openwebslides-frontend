// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { push } from 'connected-react-router';

import { HOME_ROUTE } from 'config/routes';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

import ConfirmEmailPage, { PureConfirmEmailPage } from '.';

describe(`ConfirmEmailPage`, (): void => {

  let dummyConfirmationToken: string;
  let dummyConfirmEmail: any;

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
    dummyConfirmEmail = jest.fn();

    dummyDispatch = jest.fn();
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
        confirmEmailAndRedirect={dummyConfirmEmail}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`dispatches a confirmEmail() action with the passed confirmationToken and redirects to the home page`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?confirmationToken=${dummyConfirmationToken}`,
      },
    };

    mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ConfirmEmailPage {...fixedDummyRouterProps} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(platform.actions.confirmEmail(dummyConfirmationToken));
    expect(dummyDispatch).toHaveBeenCalledWith(push(HOME_ROUTE));
  });

  it(`throws an InvalidArgumentError, when no confirmationToken is passed`, (): void => {
    expect((): void => {
      shallow(
        <PureConfirmEmailPage
          {...dummyProviderProps.translatorProps}
          {...dummyProviderProps.routerProps}
          confirmEmailAndRedirect={dummyConfirmEmail}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

});
