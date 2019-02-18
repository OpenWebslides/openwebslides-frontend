// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureSendResetPasswordEmailPage } from '.';

describe(`ResetPasswordPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSendResetPasswordEmailPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
