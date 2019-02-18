// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureResendConfirmationEmailPage } from '.';

describe(`ResendConfirmationEmailPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureResendConfirmationEmailPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
