// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';
import { InvalidArgumentError } from 'errors';

import { PureResetPasswordPage } from '.';

describe(`ResetPasswordPage`, (): void => {

  let dummyResetPasswordToken: string;

  beforeEach((): void => {
    dummyResetPasswordToken = 'foobarToken';
  });

  it(`renders without errors`, (): void => {
    const fixedDummyRouterProps = {
      ...dummyProviderProps.routerProps,
      location: {
        ...dummyProviderProps.routerProps.location,
        search: `?resetPasswordToken=${dummyResetPasswordToken}`,
      },
    };

    const enzymeWrapper = shallow(
      <PureResetPasswordPage
        {...dummyProviderProps.translatorProps}
        {...fixedDummyRouterProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`throws an InvalidArgumentError, when no resetPasswordToken is passed`, (): void => {
    expect((): void => {
      shallow(
        <PureResetPasswordPage
          {...dummyProviderProps.translatorProps}
          {...dummyProviderProps.routerProps}
        />,
      );
    }).toThrow(InvalidArgumentError);
  });

});
